"use client"

export interface User {
  id: string
  name: string
  email: string
  password: string
  phone: string
  role: "user" | "admin"
  createdAt: string
}

export interface Appointment {
  id: string
  userId: string
  userName: string
  userEmail: string
  userPhone: string
  birdType: string
  service: string
  date: string
  time: string
  notes: string
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

// Inicializar dados de exemplo
const initializeData = () => {
  if (typeof window === "undefined") return

  // Criar usuário admin padrão se não existir
  const users = JSON.parse(localStorage.getItem("users") || "[]")
  if (users.length === 0) {
    const adminUser: User = {
      id: "admin-1",
      name: "Admin AviVet",
      email: "admin@avivet.com",
      password: "admin123",
      phone: "(11) 98765-4321",
      role: "admin",
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem("users", JSON.stringify([adminUser]))
  }

  // Inicializar agendamentos se não existir
  if (!localStorage.getItem("appointments")) {
    localStorage.setItem("appointments", JSON.stringify([]))
  }
}

// Auth functions
export const register = (name: string, email: string, password: string, phone: string): User | null => {
  if (typeof window === "undefined") return null

  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")

  // Verificar se email já existe
  if (users.find((u) => u.email === email)) {
    throw new Error("Email já cadastrado")
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    password,
    phone,
    role: "user",
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  localStorage.setItem("users", JSON.stringify(users))

  return newUser
}

export const login = (email: string, password: string): User | null => {
  if (typeof window === "undefined") return null

  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    // Salvar sessão
    const { password: _, ...userWithoutPassword } = user
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
    return user
  }

  return null
}

export const logout = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem("currentUser")
}

export const getCurrentUser = (): Omit<User, "password"> | null => {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("currentUser")
  return user ? JSON.parse(user) : null
}

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null
}

export const isAdmin = (): boolean => {
  const user = getCurrentUser()
  return user?.role === "admin"
}

// Appointment functions
export const createAppointment = (appointmentData: Omit<Appointment, "id" | "createdAt" | "status">): Appointment => {
  if (typeof window === "undefined") throw new Error("Not in browser")

  const appointments: Appointment[] = JSON.parse(localStorage.getItem("appointments") || "[]")

  const newAppointment: Appointment = {
    ...appointmentData,
    id: `apt-${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  appointments.push(newAppointment)
  localStorage.setItem("appointments", JSON.stringify(appointments))

  return newAppointment
}

export const getUserAppointments = (userId: string): Appointment[] => {
  if (typeof window === "undefined") return []
  const appointments: Appointment[] = JSON.parse(localStorage.getItem("appointments") || "[]")
  return appointments.filter((apt) => apt.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export const getAllAppointments = (): Appointment[] => {
  if (typeof window === "undefined") return []
  const appointments: Appointment[] = JSON.parse(localStorage.getItem("appointments") || "[]")
  return appointments.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export const updateAppointmentStatus = (appointmentId: string, status: Appointment["status"]): void => {
  if (typeof window === "undefined") return

  const appointments: Appointment[] = JSON.parse(localStorage.getItem("appointments") || "[]")
  const index = appointments.findIndex((apt) => apt.id === appointmentId)

  if (index !== -1) {
    appointments[index].status = status
    localStorage.setItem("appointments", JSON.stringify(appointments))
  }
}

export const deleteAppointment = (appointmentId: string): void => {
  if (typeof window === "undefined") return

  const appointments: Appointment[] = JSON.parse(localStorage.getItem("appointments") || "[]")
  const filtered = appointments.filter((apt) => apt.id !== appointmentId)
  localStorage.setItem("appointments", JSON.stringify(filtered))
}

// Inicializar ao carregar
if (typeof window !== "undefined") {
  initializeData()
}
