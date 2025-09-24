"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Trash2Icon } from "lucide-react"
import fetchModel from "@/lib/fetch-utils"
import { ProcessingModal } from "@/components/modals/processing-modal"

interface DeleteUserProps {
  userId: number
  userName: string
  nameObject: string
  onUserDeleted: () => void
}

export function DeleteUser({ userId, userName, nameObject, onUserDeleted }: DeleteUserProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Abrir modal de procesamiento al confirmar eliminación
  const handleDeleteClick = () => {
    setIsOpen(false) // cerrar diálogo de confirmación
    setIsProcessing(true) // abrir modal de procesamiento
  }

  return (
    <>
      {/* Botón para abrir diálogo de confirmación */}
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} aria-label={`Eliminar usuario ${userName}`}>
        <Trash2Icon className="h-4 w-4" />
      </Button>

      {/* Diálogo de confirmación */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Está seguro de que desea eliminar este {nameObject}?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el usuario {userName} de la base de datos.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteClick}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de procesamiento */}
      <ProcessingModal
        isOpen={isProcessing}
        onClose={() => setIsProcessing(false)}
        title="Eliminando usuario..."
        process={async () => {
          try {
            await fetchModel(`users/${userId}`, { method: "DELETE" })

            toast({
              title: "Usuario eliminado",
              description: `El usuario ${userName} ha sido eliminado exitosamente.`,
            })

            onUserDeleted()
          } catch (error: any) {
            console.error("Error deleting user:", error)
            toast({
              title: "Error",
              description: error.message || "Hubo un problema al eliminar el usuario. Por favor, inténtelo de nuevo.",
              variant: "destructive",
            })
          }
        }}
      />
    </>
  )
}
