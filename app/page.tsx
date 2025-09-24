"use client"

import { useState } from "react"
import { DeleteUser } from "@/components/delete-user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for demonstration
const initialUsers = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "Admin" },
  { id: 2, name: "María García", email: "maria@example.com", role: "Usuario" },
  { id: 3, name: "Carlos López", email: "carlos@example.com", role: "Editor" },
]

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)

  const handleUserDeleted = (deletedUserId: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deletedUserId))
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <DeleteUser
                      userId={user.id}
                      userName={user.name}
                      nameObject="usuario"
                      onUserDeleted={() => handleUserDeleted(user.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {users.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No hay usuarios disponibles</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
