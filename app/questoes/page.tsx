"use client"

import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { HelpCircle, ArrowRight, CheckCircle2, Target } from "lucide-react"

// Edite esta lista para adicionar seus conjuntos de questões
const quizzes = [
  {
    id: "farmacocinetica",
    title: "Farmacocinética",
    description: "Absorção, distribuição, metabolismo e excreção de fármacos.",
    questoes: 15,
    categoria: "Básico",
  },
  {
    id: "anti-hipertensivos",
    title: "Anti-hipertensivos",
    description: "Questões sobre classes de medicamentos para hipertensão.",
    questoes: 20,
    categoria: "Cardiovascular",
  },
  {
    id: "antibioticos",
    title: "Antibioticoterapia",
    description: "Mecanismos de ação, espectro e resistência bacteriana.",
    questoes: 25,
    categoria: "Infectologia",
  },
]

export default function QuestoesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-medium">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Teste seu Conhecimento</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Questões
            </h1>
            <p className="text-muted-foreground">
              Pratique com questões comentadas e fixe o conteúdo estudado.
            </p>
          </div>

          {/* Grid de quizzes */}
          <div className="grid sm:grid-cols-2 gap-4">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                href={`/questoes/${quiz.id}`}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-0.5 hover:border-amber-500/30"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg mb-4">
                  <Target className="h-6 w-6" />
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                    {quiz.categoria}
                  </span>
                  
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {quiz.title}
                  </h2>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {quiz.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4" />
                      {quiz.questoes} questões
                    </span>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {quizzes.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-4">
                <HelpCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">Nenhuma questão ainda</h3>
              <p className="text-sm text-muted-foreground">As questões aparecerão aqui quando forem adicionadas.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
