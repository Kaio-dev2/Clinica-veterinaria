import { CheckCircle, Clock, Heart, Shield } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Especialistas Certificados",
    description: "Equipe com formação específica em medicina aviária",
  },
  {
    icon: Clock,
    title: "Atendimento Rápido",
    description: "Horários flexíveis e confirmação em até 24h",
  },
  {
    icon: Heart,
    title: "Cuidado Dedicado",
    description: "Tratamento individualizado para cada ave",
  },
  {
    icon: CheckCircle,
    title: "Equipamentos Modernos",
    description: "Tecnologia de ponta para diagnósticos precisos",
  },
]

export function Features() {
  return (
    <section id="sobre" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Por Que Escolher a AviVet?
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Somos referência no cuidado especializado de aves, oferecendo o melhor para seu companheiro
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
