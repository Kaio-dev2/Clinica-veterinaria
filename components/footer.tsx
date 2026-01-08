import { Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer id="contato" className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
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
            </div>
            <p className="text-sm text-muted-foreground">
              Clínica veterinária especializada em aves, oferecendo cuidado profissional e dedicado.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#servicos" className="hover:text-foreground">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#agendar" className="hover:text-foreground">
                  Agendar Consulta
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-foreground">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-foreground">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Horário de Atendimento</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Segunda a Sexta: 8h às 18h</li>
              <li>Sábado: 8h às 12h</li>
              <li>Domingo: Fechado</li>
              <li className="pt-2 font-medium text-primary">Emergências 24h</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Contato</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-primary" />
                <span>(11) 98765-4321</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                <span>contato@avivet.com.br</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  Rua das Aves, 123
                  <br />
                  São Paulo - SP
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2026 AviVet. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
