"use client"

import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { FileText, ArrowRight, Clock, BookOpen } from "lucide-react"

// Edite esta lista para adicionar seus resumos
const resumos = [
  {
    id: "anti-hipertensivos",
    title: "Anti-hipertensivos",
    description: "Classes de medicamentos, mecanismos de ação e indicações clínicas.",
    categoria: "Cardiovascular",
    tempo: "15 min",
  },
  {
    id: "antibioticos",
    title: "Antibióticos",
    description: "Principais classes, espectro de ação e resistência bacteriana.",
    categoria: "Infectologia",
    tempo: "20 min",
  },
  {
    id: "analgesicos",
    title: "Analgésicos e Anti-inflamatórios",
    description: "AINEs, opioides e adjuvantes no controle da dor.",
    categoria: "Dor",
    tempo: "12 min",
  },
]

export default function ResumosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium">
              <FileText className="h-3.5 w-3.5" />
              <span>Conteúdo de Estudo</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Resumos
            </h1>
            <p className="text-muted-foreground">
              Conteúdos resumidos e organizados para facilitar seu estudo.
            </p>
          </div>

          {/* Grid de resumos */}
          <div className="grid gap-4">
            {resumos.map((resumo, index) => (
              <Link
                key={resumo.id}
                href={`/resumos/${resumo.id}`}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5 hover:border-blue-500/30"
              >
                <div className="flex items-start gap-4">
                  {/* Number indicator */}
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg shadow-lg">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                        {resumo.categoria}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {resumo.tempo}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                      {resumo.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {resumo.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {resumos.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-4">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">Nenhum resumo ainda</h3>
              <p className="text-sm text-muted-foreground">Os resumos aparecerão aqui quando forem adicionados.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
