"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Pill, Search, AlertTriangle, ArrowRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const interacoes = [
  {
    id: "varfarina",
    drug: "Varfarina",
    interactions: [
      { drug: "AINEs", severity: "alta", effect: "Aumento do risco de sangramento" },
      { drug: "Amiodarona", severity: "alta", effect: "Aumento do INR" },
      { drug: "Vitamina K", severity: "média", effect: "Redução do efeito anticoagulante" },
    ],
  },
  {
    id: "metformina",
    drug: "Metformina",
    interactions: [
      { drug: "Contraste iodado", severity: "alta", effect: "Risco de acidose lática" },
      { drug: "Álcool", severity: "média", effect: "Risco de hipoglicemia" },
      { drug: "Cimetidina", severity: "baixa", effect: "Aumento dos níveis de metformina" },
    ],
  },
  {
    id: "fluoxetina",
    drug: "Fluoxetina",
    interactions: [
      { drug: "IMAOs", severity: "alta", effect: "Síndrome serotoninérgica" },
      { drug: "Tramadol", severity: "alta", effect: "Aumento do risco de convulsões" },
      { drug: "Varfarina", severity: "média", effect: "Aumento do efeito anticoagulante" },
    ],
  },
  {
    id: "omeprazol",
    drug: "Omeprazol",
    interactions: [
      { drug: "Clopidogrel", severity: "alta", effect: "Redução da eficácia antiagregante" },
      { drug: "Metotrexato", severity: "média", effect: "Aumento da toxicidade" },
      { drug: "Ferro", severity: "baixa", effect: "Redução da absorção" },
    ],
  },
  {
    id: "sinvastatina",
    drug: "Sinvastatina",
    interactions: [
      { drug: "Ciclosporina", severity: "alta", effect: "Risco de rabdomiólise" },
      { drug: "Amiodarona", severity: "alta", effect: "Aumento da toxicidade muscular" },
      { drug: "Suco de grapefruit", severity: "média", effect: "Aumento dos níveis séricos" },
    ],
  },
  {
    id: "ciprofloxacino",
    drug: "Ciprofloxacino",
    interactions: [
      { drug: "Teofilina", severity: "alta", effect: "Toxicidade da teofilina" },
      { drug: "Antiácidos", severity: "média", effect: "Redução da absorção" },
      { drug: "Cafeína", severity: "baixa", effect: "Aumento dos efeitos da cafeína" },
    ],
  },
]

const severityColors: Record<string, string> = {
  alta: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  média: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  baixa: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
}

export default function InteracoesPage() {
  const [search, setSearch] = useState("")

  const filteredInteracoes = interacoes.filter((item) =>
    item.drug.toLowerCase().includes(search.toLowerCase()) ||
    item.interactions.some((i) => i.drug.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-72">
        <div className="px-4 py-6 lg:px-8 lg:py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
              Interações Medicamentosas
            </h1>
            <p className="mt-2 text-muted-foreground">
              Consulte as principais interações medicamentosas por fármaco
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar fármaco..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Severity Legend */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-muted-foreground">Gravidade Alta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-sm text-muted-foreground">Gravidade Média</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Gravidade Baixa</span>
            </div>
          </div>

          {/* Interactions Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredInteracoes.map((item) => (
              <Link key={item.id} href={`/interacoes/${item.id}`}>
                <Card className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Pill className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl font-semibold">
                        {item.drug}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {item.interactions.map((interaction, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                        >
                          <Badge className={severityColors[interaction.severity]}>
                            {interaction.severity}
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <span>{item.drug}</span>
                              <ArrowRight className="h-3 w-3 text-muted-foreground" />
                              <span>{interaction.drug}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {interaction.effect}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredInteracoes.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nenhuma interação encontrada.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
