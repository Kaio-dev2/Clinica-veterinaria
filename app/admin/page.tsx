"use client"

import { useEffect, useState } from "react"
import { getAllAppointments, updateAppointmentStatus, isAdmin, type Appointment } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Mail, Phone, User } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    if (!isAdmin()) {
      router.push("/")
      return
    }
    setAppointments(getAllAppointments())
  }, [router])

  const handleStatusChange = (appointmentId: string, newStatus: Appointment["status"]) => {
    updateAppointmentStatus(appointmentId, newStatus)
    setAppointments(appointments.map((apt) => (apt.id === appointmentId ? { ...apt, status: newStatus } : apt)))
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

  const pendingCount = appointments.filter((apt) => apt.status === "pending").length
  const confirmedCount = appointments.filter((apt) => apt.status === "confirmed").length

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Painel Administrativo</h1>
          <p className="text-muted-foreground">Gerencie todos os agendamentos da clínica</p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total de Agendamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{appointments.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{confirmedCount}</p>
            </CardContent>
          </Card>
        </div>

        {appointments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="mb-4 h-16 w-16 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">Nenhum agendamento registrado ainda</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {appointment.service.charAt(0).toUpperCase() + appointment.service.slice(1)}
                      </CardTitle>
                      <CardDescription className="capitalize">{appointment.birdType}</CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(appointment.status)}>{getStatusText(appointment.status)}</Badge>
                      <Select
                        value={appointment.status}
                        onValueChange={(value: Appointment["status"]) => handleStatusChange(appointment.id, value)}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="confirmed">Confirmar</SelectItem>
                          <SelectItem value="cancelled">Cancelar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{appointment.userName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.userEmail}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.userPhone}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
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
                    </div>
                  </div>
                  {appointment.notes && (
                    <div className="mt-4 rounded-lg bg-muted p-3">
                      <p className="text-sm">
                        <strong>Observações:</strong> {appointment.notes}
                      </p>
                    </div>
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
