"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { HelpCircle, Play, Trophy, Target, BarChart3 } from "lucide-react"
import Link from "next/link"

const quizzes = [
  {
    id: "farmacocinetica",
    title: "Farmacocinética Básica",
    questions: 15,
    completed: 12,
    category: "Fundamentos",
  },
  {
    id: "cardiovascular",
    title: "Farmacologia Cardiovascular",
    questions: 20,
    completed: 8,
    category: "Sistemas",
  },
  {
    id: "antimicrobianos",
    title: "Antibióticos e Antifúngicos",
    questions: 25,
    completed: 0,
    category: "Antimicrobianos",
  },
  {
    id: "snc",
    title: "Farmacologia do SNC",
    questions: 18,
    completed: 18,
    category: "Sistemas",
  },
  {
    id: "interacoes",
    title: "Interações Medicamentosas",
    questions: 12,
    completed: 5,
    category: "Clínica",
  },
  {
    id: "endocrino",
    title: "Farmacologia Endócrina",
    questions: 15,
    completed: 0,
    category: "Sistemas",
  },
]

const stats = {
  totalQuestions: 150,
  answered: 78,
  correct: 62,
}

export default function QuestoesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-72">
        <div className="px-4 py-6 lg:px-8 lg:py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
              Questões
            </h1>
            <p className="mt-2 text-muted-foreground">
              Teste seus conhecimentos com questões organizadas por tema
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Respondidas</p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.answered}/{stats.totalQuestions}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm bg-gradient-to-br from-accent/10 to-accent/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Acertos</p>
                    <p className="text-2xl font-bold text-foreground">
                      {Math.round((stats.correct / stats.answered) * 100)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-secondary to-secondary/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/10 text-foreground">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Progresso</p>
                    <p className="text-2xl font-bold text-foreground">
                      {Math.round((stats.answered / stats.totalQuestions) * 100)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quiz Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => {
              const progress = (quiz.completed / quiz.questions) * 100
              const isCompleted = quiz.completed === quiz.questions
              
              return (
                <Card key={quiz.id} className="border-0 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary">{quiz.category}</Badge>
                      {isCompleted && (
                        <Trophy className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <CardTitle className="text-lg font-semibold mt-2">
                      {quiz.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-medium">
                          {quiz.completed}/{quiz.questions}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    <Link href={`/questoes/${quiz.id}`}>
                      <Button className="w-full" variant={isCompleted ? "secondary" : "default"}>
                        <Play className="h-4 w-4 mr-2" />
                        {isCompleted ? "Refazer" : quiz.completed > 0 ? "Continuar" : "Começar"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
