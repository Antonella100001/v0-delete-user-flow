"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

interface ProcessingModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  process: () => Promise<void>
}

export function ProcessingModal({ isOpen, onClose, title = "Procesando...", process }: ProcessingModalProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isOpen) return

    let isCancelled = false
    setProgress(0)

    // Simulación de progreso mientras se ejecuta el proceso
    const maxSimulated = 95
    const intervalStep = 200
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < maxSimulated) {
          const next = prev + Math.random() * 3
          return next > maxSimulated ? maxSimulated : next
        }
        return prev
      })
    }, intervalStep)

    const runProcess = async () => {
      try {
        await process() // ejecutar la función de eliminación u otro proceso

        clearInterval(interval)

        // Animar hasta 100% usando setProgress con callback para estado actualizado
        const animateTo100 = () => {
          if (isCancelled) return
          setProgress((prev) => {
            const next = prev + 2
            if (next >= 100) {
              setTimeout(onClose, 300) // cerrar modal después de mostrar 100%
              return 100
            }
            requestAnimationFrame(animateTo100)
            return next
          })
        }

        requestAnimationFrame(animateTo100)
      } catch (err) {
        console.error("Error en el proceso:", err)
        clearInterval(interval)
        onClose()
      }
    }

    runProcess()

    return () => {
      isCancelled = true
      clearInterval(interval)
    }
  }, [isOpen, process, onClose])

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground text-center">
            {progress < 100 ? "Por favor espera..." : "Completado!"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
