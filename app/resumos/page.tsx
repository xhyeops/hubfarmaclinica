"use client"

import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { FileText, Plus } from "lucide-react"

// Edite esta lista para adicionar seus resumos
const resumos = [
  {
    id: "exemplo-1",
    title: "Título do Resumo",
    description: "Descrição breve do conteúdo.",
  },
]

export default function ResumosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-56 pt-14 lg:pt-0">
        <div className="max-w-3xl mx-auto px-4 py-8 lg:py-12">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Resumos
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Conteúdos resumidos de farmacologia.
            </p>
          </div>

          <div className="space-y-3">
            {resumos.map((resumo) => (
              <Link
                key={resumo.id}
                href={`/resumos/${resumo.id}`}
                className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/40 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-medium text-foreground">{resumo.title}</h2>
                  <p className="text-sm text-muted-foreground">{resumo.description}</p>
                </div>
              </Link>
            ))}

            {resumos.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p>Nenhum resumo cadastrado.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
