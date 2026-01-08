"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, UserIcon } from "lucide-react"
import Link from "next/link"
import { getCurrentUser, logout, isAdmin } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null)
  const router = useRouter()

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M16 7h.01" />
                <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground">AviVet</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="/#servicos"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Serviços
            </a>
            <a
              href="/#agendar"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Agendar
            </a>
            <a
              href="/#sobre"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Sobre
            </a>
            <a
              href="/#contato"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Contato
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                {isAdmin() && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin">Admin</Link>
                  </Button>
                )}
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">
                    <UserIcon className="mr-2 h-4 w-4" />
                    {user.name}
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href="/register">Cadastrar</Link>
                </Button>
              </>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <a href="/#servicos" className="text-sm font-medium text-foreground/80">
                Serviços
              </a>
              <a href="/#agendar" className="text-sm font-medium text-foreground/80">
                Agendar
              </a>
              <a href="/#sobre" className="text-sm font-medium text-foreground/80">
                Sobre
              </a>
              <a href="/#contato" className="text-sm font-medium text-foreground/80">
                Contato
              </a>
              <div className="flex flex-col gap-2 pt-2">
                {user ? (
                  <>
                    {isAdmin() && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/admin">Admin</Link>
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/dashboard">Meus Agendamentos</Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/register">Cadastrar</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
