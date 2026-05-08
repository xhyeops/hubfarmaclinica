"use client"

import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { AdminOnly } from "@/components/AdminOnly"
import {
  ArrowLeft,
  Target,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Pencil,
  AlertCircle,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { useState, use, useEffect } from "react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

export default function QuestaoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)

  const [tema, setTema] = useState<any>(null)
  const [questoes, setQuestoes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [openAnswer, setOpenAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    async function fetchQuiz() {
      const { data: temaData, error: temaError } = await supabase
        .from("temas_questoes")
        .select("*")
        .eq("slug", slug)
        .single()

      if (temaError) {
        console.error("Erro ao buscar tema:", temaError)
        setLoading(false)
        return
      }

      const { data: questoesData, error: questoesError } = await supabase
        .from("questoes")
        .select("*")
        .eq("tema_id", temaData.id)

      if (questoesError) {
        console.error("Erro ao buscar questões:", questoesError)
        setLoading(false)
        return
      }

      const questoesOrdenadas = (questoesData || []).sort((a, b) => {
        return (a.ordem || 0) - (b.ordem || 0)
      })

      setTema(temaData)
      setQuestoes(questoesOrdenadas)
      setLoading(false)
    }

    fetchQuiz()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="lg:pl-64 pt-14 lg:pt-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">Carregando questões...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!tema || questoes.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="lg:pl-64 pt-14 lg:pt-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
            <Link
              href="/questoes"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-rose-200 mb-8 group transition"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Voltar
            </Link>

            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-950/50 border border-rose-800/30 text-rose-200">
                <AlertCircle className="h-8 w-8" />
              </div>

              <h2 className="text-xl font-semibold text-foreground mb-1">
                Quiz não encontrado
              </h2>

              <p className="text-muted-foreground">
                Este tema ainda não possui questões cadastradas.
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const question = questoes[currentQuestion]
  const totalQuestions = questoes.length

  const tipoQuestao = question.tipo || "fechada"
  const alternativas = [
    question.alternativa_a,
    question.alternativa_b,
    question.alternativa_c,
    question.alternativa_d,
    question.alternativa_e,
  ].filter((alt) => alt && String(alt).trim())

  const corretaIndex = ["A", "B", "C", "D", "E"].indexOf(
    String(question.correta || "A").toUpperCase()
  )

  function handleSelect(index: number) {
    if (showResult) return
    setSelectedAnswer(index)
  }

  function handleConfirm() {
    if (tipoQuestao === "fechada" && selectedAnswer === null) return
    if (tipoQuestao === "aberta" && !openAnswer.trim()) return

    setShowResult(true)

    if (tipoQuestao === "fechada" && selectedAnswer === corretaIndex) {
      setScore((s) => s + 1)
    }
  }

  function handleNext() {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((c) => c + 1)
      setSelectedAnswer(null)
      setOpenAnswer("")
      setShowResult(false)
    } else {
      setFinished(true)
    }
  }

  function handleRestart() {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setOpenAnswer("")
    setShowResult(false)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const fechadas = questoes.filter((q) => (q.tipo || "fechada") === "fechada")
    const percentage =
      fechadas.length > 0 ? Math.round((score / fechadas.length) * 100) : 0

    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="lg:pl-64 pt-14 lg:pt-0">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
            <div className="rounded-3xl border border-border bg-card p-8 text-center">
              <div
                className={cn(
                  "inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 border",
                  percentage >= 70
                    ? "bg-rose-950/50 border-rose-800/30"
                    : "bg-amber-500/10 border-amber-500/20"
                )}
              >
                <span
                  className={cn(
                    "text-3xl font-bold",
                    percentage >= 70 ? "text-rose-200" : "text-amber-400"
                  )}
                >
                  {percentage}%
                </span>
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-2">
                Quiz Finalizado
              </h2>

              <p className="text-muted-foreground mb-6">
                Você acertou {score} de {fechadas.length} questões fechadas.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={handleRestart}
                  className="border-rose-800/30 bg-rose-950/20 hover:bg-rose-900/30"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Refazer
                </Button>

                <Link href="/questoes">
                  <Button className="bg-gradient-to-r from-rose-900 to-red-900 hover:from-rose-800 hover:to-red-800">
                    Voltar para Questões
                  </Button>
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
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link
              href="/questoes"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-rose-200 group transition"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Voltar para Questões
            </Link>

            <AdminOnly>
              <Link
                href={`/questoes/${slug}/editar`}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-900 to-red-900 px-4 py-2 text-sm font-medium text-white transition hover:from-rose-800 hover:to-red-800"
              >
                <Pencil className="h-4 w-4" />
                Editar
              </Link>
            </AdminOnly>
          </div>

          <section className="mb-8">
            <div className="flex items-start gap-3">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-950/50 border border-rose-800/30 text-rose-200">
                <Target className="h-5 w-5" />
              </div>

              <div>
                <div className="mb-2 inline-flex rounded-full bg-rose-950/50 border border-rose-800/30 px-2.5 py-0.5 text-xs font-medium text-rose-200">
                  {tipoQuestao === "aberta" ? "Questão aberta" : "Questão fechada"}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {tema.titulo}
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                  {tema.descricao || "Questões comentadas"}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">
                  Questão {currentQuestion + 1} de {totalQuestions}
                </span>

                <span className="font-medium text-rose-200">{score} acertos</span>
              </div>

              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-900 to-red-900 transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
                  }}
                />
              </div>
            </div>
          </section>

          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="p-6 sm:p-8">
              <p className="text-lg font-medium text-foreground mb-6 leading-relaxed">
                {question.pergunta}
              </p>

              {question.imagem_url && (
                <img
                  src={question.imagem_url}
                  alt="Imagem da questão"
                  className="mb-6 max-h-[420px] w-full rounded-2xl border border-border object-contain"
                />
              )}

              {tipoQuestao === "fechada" ? (
                <div className="space-y-3">
                  {alternativas.map((alt, index) => {
                    const isSelected = selectedAnswer === index
                    const isCorrect = index === corretaIndex
                    const showCorrect = showResult && isCorrect
                    const showWrong = showResult && isSelected && !isCorrect

                    return (
                      <button
                        key={index}
                        onClick={() => handleSelect(index)}
                        disabled={showResult}
                        className={cn(
                          "w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200",
                          !showResult &&
                            isSelected &&
                            "border-rose-800 bg-rose-950/20",
                          !showResult &&
                            !isSelected &&
                            "border-border hover:border-rose-800/40 hover:bg-muted/50",
                          showCorrect && "border-emerald-500 bg-emerald-500/10",
                          showWrong && "border-rose-500 bg-rose-500/10",
                          showResult && !showCorrect && !showWrong && "opacity-50"
                        )}
                      >
                        <span
                          className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center text-sm font-medium shrink-0",
                            !showResult &&
                              isSelected &&
                              "bg-gradient-to-r from-rose-900 to-red-900 text-white",
                            !showResult &&
                              !isSelected &&
                              "bg-secondary text-secondary-foreground",
                            showCorrect && "bg-emerald-500 text-white",
                            showWrong && "bg-rose-500 text-white"
                          )}
                        >
                          {showCorrect ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : showWrong ? (
                            <XCircle className="h-5 w-5" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </span>

                        <span className="flex-1 text-foreground">{alt}</span>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  <textarea
                    value={openAnswer}
                    onChange={(e) => setOpenAnswer(e.target.value)}
                    disabled={showResult}
                    placeholder="Digite sua resposta aqui..."
                    className="min-h-36 w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-rose-700 disabled:opacity-70"
                  />
                </div>
              )}

              {showResult && (
                <div className="mt-6 space-y-4">
                  {tipoQuestao === "aberta" && (
                    <>
                      <div className="rounded-2xl border border-border bg-muted/40 p-4">
                        <p className="mb-1 text-sm font-medium text-foreground">
                          Sua resposta:
                        </p>

                        <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                          {openAnswer}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-rose-800/20 bg-rose-950/20 p-5">
                        <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-rose-200">
                          <Eye className="h-4 w-4" />
                          Resposta esperada:
                        </p>

                        <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
                          {question.resposta_aberta ||
                            "Sem resposta esperada cadastrada."}
                        </p>
                      </div>
                    </>
                  )}

                  <div className="rounded-2xl border border-rose-800/20 bg-rose-950/20 p-5">
                    <p className="text-sm font-semibold text-foreground mb-2">
                      Comentário
                    </p>

                    <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                      {question.comentario || "Sem comentário cadastrado."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border bg-muted/20 px-6 sm:px-8 py-4 flex justify-end gap-3">
              {!showResult ? (
                <Button
                  onClick={handleConfirm}
                  disabled={
                    tipoQuestao === "fechada"
                      ? selectedAnswer === null
                      : !openAnswer.trim()
                  }
                  className="bg-gradient-to-r from-rose-900 to-red-900 hover:from-rose-800 hover:to-red-800"
                >
                  Confirmar
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-rose-900 to-red-900 hover:from-rose-800 hover:to-red-800"
                >
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
