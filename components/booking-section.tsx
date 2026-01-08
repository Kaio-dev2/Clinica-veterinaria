"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "lucide-react"
import { getCurrentUser, createAppointment, isAuthenticated } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function BookingSection() {
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null)
  const router = useRouter()

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birdType: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  })

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }))
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated()) {
      alert("Você precisa estar logado para agendar uma consulta!")
      router.push("/login")
      return
    }

    try {
      const appointment = createAppointment({
        userId: user!.id,
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        birdType: formData.birdType,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
      })

      alert("Agendamento realizado com sucesso! Verifique seus agendamentos no painel.")
      router.push("/dashboard")
    } catch (error) {
      alert("Erro ao realizar agendamento. Tente novamente.")
    }
  }

  return (
    <section id="agendar" className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Calendar className="h-8 w-8" />
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Agende Sua Consulta
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            {user
              ? "Preencha os dados abaixo para agendar uma consulta para sua ave"
              : "Faça login ou cadastre-se para agendar uma consulta"}
          </p>
        </div>

        <Card className="mx-auto max-w-2xl border-border shadow-xl">
          <CardHeader>
            <CardTitle>Dados do Agendamento</CardTitle>
            <CardDescription>Informe os dados abaixo para agendar uma consulta para sua ave</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Tutor</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={!!user}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    disabled={!!user}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={!!user}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="birdType">Tipo de Ave</Label>
                  <Select
                    value={formData.birdType}
                    onValueChange={(value) => setFormData({ ...formData, birdType: value })}
                    required
                  >
                    <SelectTrigger id="birdType">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="canario">Canário</SelectItem>
                      <SelectItem value="calopsita">Calopsita</SelectItem>
                      <SelectItem value="papagaio">Papagaio</SelectItem>
                      <SelectItem value="periquito">Periquito</SelectItem>
                      <SelectItem value="agapornis">Agapornis</SelectItem>
                      <SelectItem value="arara">Arara</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Serviço</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                    required
                  >
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulta">Consulta Geral</SelectItem>
                      <SelectItem value="vacinacao">Vacinação</SelectItem>
                      <SelectItem value="exames">Exames</SelectItem>
                      <SelectItem value="emergencia">Emergência</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Data Preferida</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Horário Preferido</Label>
                  <Select
                    value={formData.time}
                    onValueChange={(value) => setFormData({ ...formData, time: value })}
                    required
                  >
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00">08:00</SelectItem>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                      <SelectItem value="17:00">17:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  placeholder="Descreva os sintomas ou motivo da consulta..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Confirmar Agendamento
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
