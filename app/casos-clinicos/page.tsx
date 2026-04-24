"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Stethoscope, Search, AlertTriangle, Clock, User } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const casos = [
  {
    id: "intoxicacao-paracetamol",
    title: "Intoxicação por Paracetamol",
    difficulty: "Intermediário",
    duration: "20 min",
    description: "Paciente jovem com ingestão de alta dose de paracetamol. Avalie o tratamento com N-acetilcisteína.",
    tags: ["Toxicologia", "Hepatologia", "Emergência"],
  },
  {
    id: "crise-hipertensiva",
    title: "Crise Hipertensiva",
    difficulty: "Avançado",
    duration: "25 min",
    description: "Emergência hipertensiva com lesão de órgão-alvo. Escolha o anti-hipertensivo adequado.",
    tags: ["Cardiovascular", "Emergência"],
  },
  {
    id: "pneumonia-comunitaria",
    title: "Pneumonia Adquirida na Comunidade",
    difficulty: "Básico",
    duration: "15 min",
    description: "Escolha do esquema antibiótico empirico baseado em fatores de risco e gravidade.",
    tags: ["Infectologia", "Antimicrobianos"],
  },
  {
    id: "diabetes-descompensado",
    title: "Diabetes Descompensado",
    difficulty: "Intermediário",
    duration: "20 min",
    description: "Ajuste de terapia em paciente com HbA1c elevada em uso de metformina.",
    tags: ["Endocrinologia", "Antidiabéticos"],
  },
  {
    id: "dor-oncologica",
    title: "Manejo da Dor Oncológica",
    difficulty: "Avançado",
    duration: "30 min",
    description: "Escalonamento analgésico em paciente com câncer avançado e dor mal controlada.",
    tags: ["Oncologia", "Analgesia", "Opioides"],
  },
  {
    id: "anticoagulacao-fa",
    title: "Anticoagulação em Fibrilação Atrial",
    difficulty: "Intermediário",
    duration: "20 min",
    description: "Escolha entre varfarina e DOACs em paciente idoso com FA não valvar.",
    tags: ["Cardiovascular", "Anticoagulantes"],
  },
]

const difficultyColors: Record<string, string> = {
  "Básico": "bg-green-500/10 text-green-600 dark:text-green-400",
  "Intermediário": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  "Avançado": "bg-red-500/10 text-red-600 dark:text-red-400",
}

export default function CasosClinicosPage() {
  const [search, setSearch] = useState("")

  const filteredCasos = casos.filter((caso) =>
    caso.title.toLowerCase().includes(search.toLowerCase()) ||
    caso.description.toLowerCase().includes(search.toLowerCase()) ||
    caso.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-72">
        <div className="px-4 py-6 lg:px-8 lg:py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
              Casos Clínicos
            </h1>
            <p className="mt-2 text-muted-foreground">
              Pratique com casos clínicos interativos baseados em situações reais
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar casos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Cases Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCasos.map((caso) => (
              <Link key={caso.id} href={`/casos-clinicos/${caso.id}`}>
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        <Stethoscope className="h-5 w-5" />
                      </div>
                      <Badge className={difficultyColors[caso.difficulty]}>
                        {caso.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold mt-3">
                      {caso.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {caso.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {caso.duration}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {caso.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredCasos.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nenhum caso encontrado.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
