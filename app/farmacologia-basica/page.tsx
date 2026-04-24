"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FlaskConical, Beaker, Atom, Activity, Dna, Zap } from "lucide-react"
import Link from "next/link"

const topics = [
  {
    id: "farmacocinetica",
    title: "Farmacocinética",
    description: "Absorção, distribuição, metabolismo e excreção de fármacos",
    icon: Activity,
    subtopics: ["ADME", "Biodisponibilidade", "Meia-vida", "Clearance"],
  },
  {
    id: "farmacodinamica",
    title: "Farmacodinâmica",
    description: "Mecanismos de ação e interação fármaco-receptor",
    icon: Atom,
    subtopics: ["Receptores", "Agonistas", "Antagonistas", "Transdução de sinal"],
  },
  {
    id: "farmacogenetica",
    title: "Farmacogenética",
    description: "Variabilidade genética na resposta a fármacos",
    icon: Dna,
    subtopics: ["Polimorfismos", "CYP450", "Metabolizadores"],
  },
  {
    id: "toxicologia",
    title: "Toxicologia",
    description: "Efeitos tóxicos e manejo de intoxicações",
    icon: Beaker,
    subtopics: ["Dose-resposta", "Antídotos", "Monitoramento"],
  },
  {
    id: "vias-administracao",
    title: "Vias de Administração",
    description: "Características e escolha da via adequada",
    icon: Zap,
    subtopics: ["Oral", "Parenteral", "Tópica", "Inalatória"],
  },
  {
    id: "formulacoes",
    title: "Formas Farmacêuticas",
    description: "Tipos de formulações e suas características",
    icon: FlaskConical,
    subtopics: ["Comprimidos", "Cápsulas", "Injetáveis", "Liberação modificada"],
  },
]

export default function FarmacologiaBasicaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-72">
        <div className="px-4 py-6 lg:px-8 lg:py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
              Farmacologia Básica
            </h1>
            <p className="mt-2 text-muted-foreground">
              Fundamentos essenciais da farmacologia
            </p>
          </div>

          {/* Topics Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, index) => {
              const Icon = topic.icon
              const colors = [
                "from-primary/20 to-primary/5 hover:from-primary/30",
                "from-accent/20 to-accent/5 hover:from-accent/30",
                "from-secondary to-secondary/50 hover:from-secondary/80",
              ]
              
              return (
                <Link key={topic.id} href={`/farmacologia-basica/${topic.id}`}>
                  <Card className={`h-full border-0 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer bg-gradient-to-br ${colors[index % 3]}`}>
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card text-primary mb-3">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl font-semibold">
                        {topic.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {topic.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {topic.subtopics.map((subtopic) => (
                          <Badge key={subtopic} variant="secondary" className="text-xs">
                            {subtopic}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
