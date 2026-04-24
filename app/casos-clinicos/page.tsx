"use client"

import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { FlaskConical, ArrowRight, Stethoscope, AlertCircle } from "lucide-react"

// Edite esta lista para adicionar seus casos clínicos
const casos = [
  {
    id: "hipertensao-resistente",
    title: "Hipertensão Arterial Resistente",
    description: "Paciente de 58 anos com PA não controlada apesar de 3 anti-hipertensivos.",
    dificuldade: "Intermediário",
    sistema: "Cardiovascular",
  },
  {
    id: "infeccao-urinaria",
    title: "Infecção Urinária Complicada",
    description: "Mulher de 32 anos com ITU recorrente e histórico de alergia a penicilinas.",
    dificuldade: "Básico",
    sistema: "Urogenital",
  },
  {
    id: "diabetes-descompensado",
    title: "Diabetes Mellitus Descompensado",
    description: "Homem de 45 anos com glicemia de jejum 280 mg/dL em uso de metformina.",
    dificuldade: "Avançado",
    sistema: "Endócrino",
  },
]

const dificuldadeColors: Record<string, string> = {
  "Básico": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Intermediário": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Avançado": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
}

export default function CasosClinicosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              <FlaskConical className="h-3.5 w-3.5" />
              <span>Aprendizado Prático</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Casos Clínicos
            </h1>
            <p className="text-muted-foreground">
              Desenvolva seu raciocínio clínico com casos práticos e discussões farmacológicas.
            </p>
          </div>

          {/* Grid de casos */}
          <div className="grid gap-4">
            {casos.map((caso) => (
              <Link
                key={caso.id}
                href={`/casos-clinicos/${caso.id}`}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-0.5 hover:border-emerald-500/30"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shrink-0">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dificuldadeColors[caso.dificuldade] || "bg-secondary text-secondary-foreground"}`}>
                        {caso.dificuldade}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                        {caso.sistema}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1">
                      {caso.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {caso.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {casos.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-4">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">Nenhum caso ainda</h3>
              <p className="text-sm text-muted-foreground">Os casos clínicos aparecerão aqui quando forem adicionados.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
