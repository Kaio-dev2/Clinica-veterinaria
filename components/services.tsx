import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, Pill, Syringe, ClipboardList } from "lucide-react"

const services = [
  {
    icon: Stethoscope,
    title: "Consultas Gerais",
    description: "Exames completos e diagnósticos precisos para aves de todas as espécies.",
  },
  {
    icon: Syringe,
    title: "Vacinação",
    description: "Programa completo de imunização para proteger a saúde das suas aves.",
  },
  {
    icon: Pill,
    title: "Tratamentos",
    description: "Terapias e medicamentos específicos para diferentes condições aviárias.",
  },
  {
    icon: ClipboardList,
    title: "Exames Laboratoriais",
    description: "Análises clínicas especializadas com equipamentos de última geração.",
  },
]

export function Services() {
  return (
    <section id="servicos" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Nossos Serviços
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Oferecemos atendimento completo e especializado para todas as necessidades das suas aves
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="border-border transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
