import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Cuidado Especializado para Suas Aves
              </h1>
              <p className="text-pretty text-lg text-muted-foreground md:text-xl">
                Veterinários especialistas em medicina aviária. Agende sua consulta online de forma rápida e prática.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Calendar className="mr-2 h-5 w-5" />
                Agendar Agora
              </Button>
              <Button size="lg" variant="outline">
                Saiba Mais
              </Button>
            </div>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:gap-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>Horários Flexíveis</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Atendimento Presencial</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 shadow-2xl">
              <img
                src="/colorful-tropical-bird-at-veterinary-clinic.jpg"
                alt="Ave em consulta veterinária"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-card p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Aves Atendidas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
