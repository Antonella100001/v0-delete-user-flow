import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Here you would typically delete from your database
    console.log(`Deleting user with ID: ${userId}`)

    return NextResponse.json({
      success: true,
      message: `Usuario ${userId} eliminado exitosamente`,
    })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
