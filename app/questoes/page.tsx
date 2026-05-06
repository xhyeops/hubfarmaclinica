"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AdminOnly } from "@/components/AdminOnly"
import {
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Target,
  Plus,
  AlertCircle,
} from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function QuestoesPage() {
  const [quizzes, setQuizzes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQuizzes() {
      const { data: temas, error: temasError } = await supabase
        .from("temas_questoes")
        .select("*")
        .order("created_at", { ascending: false })

      if (temasError) {
        console.error("Erro ao buscar temas:", temasError.message)
        setLoading(false)
        return
      }

      const temasComContagem = await Promise.all(
        (temas || []).map(async (tema) => {
          const { count, error: countError } = await supabase
            .from("questoes")
            .select("*", { count: "exact", head: true })
            .eq("tema_id", tema.id)

          if (countError) {
            console.error("Erro ao contar questões:", countError.message)
          }

          return {
            ...tema,
            total_questoes: count || 0,
          }
        })
      )

      setQuizzes(temasComContagem)
      setLoading(false)
    }

    fetchQuizzes()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-rose-950/50 border border-rose-800/30 text-rose-200 text-sm font-medium">
              <HelpCircle className="h-3.5 w-3.5" />
              Teste seu conhecimento
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
                  Questões
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                  Pratique com questões comentadas e fixe o conteúdo estudado.
                </p>

                {!loading && (
                  <p className="mt-3 text-sm text-rose-200">
                    {quizzes.length}{" "}
                    {quizzes.length === 1
                      ? "tema cadastrado"
                      : "temas cadastrados"}
                  </p>
                )}
              </div>

              <AdminOnly>
                <Link
                  href="/questoes/novo"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-900 to-red-900 px-5 text-sm font-semibold text-white shadow-lg shadow-rose-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-rose-800 hover:to-red-800 hover:shadow-xl hover:shadow-rose-950/40"
                >
                  <Plus className="h-4 w-4" />
                  Novo Tema
                </Link>
              </AdminOnly>
            </div>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">Carregando questões...</p>
            </div>
          ) : quizzes.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-950/50 border border-rose-800/30 text-rose-200">
                <AlertCircle className="h-8 w-8" />
              </div>

              <h3 className="text-lg font-medium text-foreground mb-1">
                Nenhuma questão ainda
              </h3>

              <p className="text-sm text-muted-foreground">
                As questões aparecerão aqui quando forem adicionadas.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {quizzes.map((quiz) => (
                <Link
                  key={quiz.id}
                  href={`/questoes/${quiz.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-rose-800/40 hover:shadow-xl hover:shadow-rose-950/20"
                >
                  <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full bg-rose-800/0 transition group-hover:bg-rose-700" />

                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-950/50 border border-rose-800/30 text-rose-200 shadow-lg shadow-rose-950/20 transition group-hover:scale-110 group-hover:bg-rose-900/40 mb-4">
                    <Target className="h-6 w-6" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-rose-200 transition-colors">
                      {quiz.titulo}
                    </h2>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {quiz.descricao || "Sem descrição disponível."}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                        {quiz.total_questoes}{" "}
                        {quiz.total_questoes === 1 ? "questão" : "questões"}
                      </span>

                      <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-rose-200" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
