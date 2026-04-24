"use client"

import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { HelpCircle } from "lucide-react"

// Edite esta lista para adicionar seus conjuntos de questões
const questoes = [
  {
    id: "exemplo-1",
    title: "Título do Quiz",
    description: "Descrição do conjunto de questões.",
  },
]

export default function QuestoesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-56 pt-14 lg:pt-0">
        <div className="max-w-3xl mx-auto px-4 py-8 lg:py-12">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Questões
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Banco de questões para praticar.
            </p>
          </div>

          <div className="space-y-3">
            {questoes.map((item) => (
              <Link
                key={item.id}
                href={`/questoes/${item.id}`}
                className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/40 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-medium text-foreground">{item.title}</h2>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </Link>
            ))}

            {questoes.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <HelpCircle className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p>Nenhuma questão cadastrada.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
