"use client"

import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Target, CheckCircle2, XCircle, ChevronRight, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useState, use } from "react"
import { cn } from "@/lib/utils"

// Edite este objeto para adicionar suas questões
const quizzes: Record<string, { 
  title: string
  categoria: string
  questoes: Array<{
    enunciado: string
    alternativas: string[]
    correta: number
    comentario: string
  }>
}> = {
  "farmacocinetica": {
    title: "Farmacocinética",
    categoria: "Básico",
    questoes: [
      {
        enunciado: "Qual processo farmacocinético é mais afetado pela ligação a proteínas plasmáticas?",
        alternativas: [
          "Absorção",
          "Distribuição",
          "Metabolismo",
          "Excreção",
        ],
        correta: 1,
        comentario: "A ligação a proteínas plasmáticas afeta principalmente a distribuição do fármaco. Apenas a fração livre do fármaco pode atravessar membranas e atingir os tecidos-alvo. Fármacos muito ligados a proteínas têm menor volume de distribuição."
      },
      {
        enunciado: "A biodisponibilidade de um fármaco administrado por via intravenosa é:",
        alternativas: [
          "Variável dependendo do fármaco",
          "Sempre 50%",
          "Sempre 100%",
          "Determinada pelo metabolismo de primeira passagem",
        ],
        correta: 2,
        comentario: "Por definição, a biodisponibilidade de um fármaco administrado por via intravenosa é 100%, pois todo o fármaco chega à circulação sistêmica sem sofrer absorção ou metabolismo de primeira passagem."
      },
      {
        enunciado: "O efeito de primeira passagem ocorre principalmente em qual órgão?",
        alternativas: [
          "Rins",
          "Pulmões",
          "Fígado",
          "Intestino delgado",
        ],
        correta: 2,
        comentario: "O efeito de primeira passagem ocorre principalmente no fígado. Fármacos absorvidos pelo trato gastrointestinal passam pelo sistema porta hepático antes de atingir a circulação sistêmica, podendo ser metabolizados significativamente."
      },
    ],
  },
  "anti-hipertensivos": {
    title: "Anti-hipertensivos",
    categoria: "Cardiovascular",
    questoes: [
      {
        enunciado: "Qual efeito adverso é característico dos Inibidores da ECA (IECA) e NÃO ocorre com os BRAs?",
        alternativas: [
          "Hipercalemia",
          "Tosse seca",
          "Hipotensão",
          "Angioedema",
        ],
        correta: 1,
        comentario: "A tosse seca é um efeito adverso característico dos IECA causado pelo acúmulo de bradicinina. Os BRAs não inibem a ECA, portanto não causam esse efeito. Hipercalemia, hipotensão e angioedema podem ocorrer com ambas as classes."
      },
    ],
  },
}

export default function QuestaoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const data = quizzes[slug]
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="lg:pl-64 pt-14 lg:pt-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
            <Link href="/questoes" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Voltar
            </Link>
            <div className="text-center py-16">
              <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">Quiz não encontrado</h2>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const question = data.questoes[currentQuestion]
  const totalQuestions = data.questoes.length

  const handleSelect = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  const handleConfirm = () => {
    if (selectedAnswer === null) return
    setShowResult(true)
    if (selectedAnswer === question.correta) {
      setScore(s => s + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(c => c + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const percentage = Math.round((score / totalQuestions) * 100)
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="lg:pl-64 pt-14 lg:pt-0">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
            <div className="bg-card rounded-2xl border border-border p-8 text-center">
              <div className={cn(
                "inline-flex items-center justify-center w-20 h-20 rounded-full mb-6",
                percentage >= 70 ? "bg-emerald-500/10" : "bg-amber-500/10"
              )}>
                <span className={cn(
                  "text-3xl font-bold",
                  percentage >= 70 ? "text-emerald-600" : "text-amber-600"
                )}>
                  {percentage}%
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Quiz Finalizado!</h2>
              <p className="text-muted-foreground mb-6">
                Você acertou {score} de {totalQuestions} questões
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={handleRestart}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Refazer
                </Button>
                <Link href="/questoes">
                  <Button>Voltar para Questões</Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          {/* Back button */}
          <Link 
            href="/questoes" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para Questões
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{data.title}</h1>
                <p className="text-sm text-muted-foreground">{data.categoria}</p>
              </div>
            </div>
            
            {/* Progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Questão {currentQuestion + 1} de {totalQuestions}</span>
                <span className="font-medium text-foreground">{score} acertos</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-6 sm:p-8">
              <p className="text-lg font-medium text-foreground mb-6 leading-relaxed">
                {question.enunciado}
              </p>

              {/* Alternatives */}
              <div className="space-y-3">
                {question.alternativas.map((alt, index) => {
                  const isSelected = selectedAnswer === index
                  const isCorrect = index === question.correta
                  const showCorrect = showResult && isCorrect
                  const showWrong = showResult && isSelected && !isCorrect

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(index)}
                      disabled={showResult}
                      className={cn(
                        "w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                        !showResult && isSelected && "border-amber-500 bg-amber-500/5",
                        !showResult && !isSelected && "border-border hover:border-amber-500/50 hover:bg-muted/50",
                        showCorrect && "border-emerald-500 bg-emerald-500/10",
                        showWrong && "border-rose-500 bg-rose-500/10",
                        showResult && !showCorrect && !showWrong && "opacity-50"
                      )}
                    >
                      <span className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium shrink-0",
                        !showResult && isSelected && "bg-amber-500 text-white",
                        !showResult && !isSelected && "bg-secondary text-secondary-foreground",
                        showCorrect && "bg-emerald-500 text-white",
                        showWrong && "bg-rose-500 text-white",
                      )}>
                        {showCorrect ? <CheckCircle2 className="h-5 w-5" /> : 
                         showWrong ? <XCircle className="h-5 w-5" /> : 
                         String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1 text-foreground">{alt}</span>
                    </button>
                  )
                })}
              </div>

              {/* Comment */}
              {showResult && (
                <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
                  <p className="text-sm font-medium text-foreground mb-1">Comentário:</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{question.comentario}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-border bg-muted/30 flex justify-end gap-3">
              {!showResult ? (
                <Button 
                  onClick={handleConfirm} 
                  disabled={selectedAnswer === null}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                >
                  Confirmar
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  {currentQuestion < totalQuestions - 1 ? (
                    <>
                      Próxima
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    "Ver Resultado"
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
