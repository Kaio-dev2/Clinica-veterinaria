"use client"

import { useEffect, useState } from "react"
import { getCurrentUser, getUserAppointments, deleteAppointment, type Appointment } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Trash2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
    setAppointments(getUserAppointments(currentUser.id))
  }, [router])

  const handleDelete = (appointmentId: string) => {
    if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
      deleteAppointment(appointmentId)
      setAppointments(appointments.filter((apt) => apt.id !== appointmentId))
    }
  }

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-yellow-500"
    }
  }

  const getStatusText = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "cancelled":
        return "Cancelado"
      default:
        return "Pendente"
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Olá, {user.name}!</h1>
          <p className="text-muted-foreground">Gerencie seus agendamentos abaixo</p>
        </div>

        {appointments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="mb-4 h-16 w-16 text-muted-foreground" />
              <p className="mb-4 text-lg text-muted-foreground">Você não tem agendamentos ainda</p>
              <Button asChild>
                <a href="/#agendar">Agendar Consulta</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">
                      {appointment.service.charAt(0).toUpperCase() + appointment.service.slice(1)}
                    </CardTitle>
                    <Badge className={getStatusColor(appointment.status)}>{getStatusText(appointment.status)}</Badge>
                  </div>
                  <CardDescription className="capitalize">{appointment.birdType}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(appointment.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{appointment.time}</span>
                  </div>
                  {appointment.notes && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      <strong>Observações:</strong> {appointment.notes}
                    </p>
                  )}
                  {appointment.status !== "cancelled" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-4 w-full"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Cancelar
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
