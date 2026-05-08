"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import {
  FileText,
  FlaskConical,
  HelpCircle,
  Pill,
  ArrowRight,
  Sparkles,
  Users,
  Layers,
  Clock,
  Play,
} from "lucide-react"
import { supabase } from "@/lib/supabase"

type FeedItem = {
  id: string
  tipo: "Resumo" | "Flashcard" | "Questão" | "Caso Clínico" | "Fármaco"
  titulo: string
  categoria: string | null
  criado_em: string
  href: string
  icon: any
}

export default function HomePage() {
  const [counts, setCounts] = useState({
    resumos: 0,
    flashcards: 0,
    questoes: 0,
    casos: 0,
    farmacos: 0,
  })

  const [feed, setFeed] = useState<FeedItem[]>([])

  useEffect(() => {
    async function fetchData() {
      const [resumosCount, flashcardsCount, questoesCount, casosCount, farmacosCount] =
        await Promise.all([
          supabase.from("resumos").select("*", { count: "exact", head: true }),
          supabase.from("flashcards").select("*", { count: "exact", head: true }),
          supabase.from("questoes").select("*", { count: "exact", head: true }),
          supabase.from("casos_clinicos").select("*", { count: "exact", head: true }),
          supabase.from("farmacos").select("*", { count: "exact", head: true }),
        ])

      setCounts({
        resumos: resumosCount.count || 0,
        flashcards: flashcardsCount.count || 0,
        questoes: questoesCount.count || 0,
        casos: casosCount.count || 0,
        farmacos: farmacosCount.count || 0,
      })

      const [resumos, flashcards, questoes, casos, farmacos] = await Promise.all([
        supabase
          .from("resumos")
          .select("id, titulo, slug, categoria, criado_em")
          .order("criado_em", { ascending: false })
          .limit(5),

        supabase
          .from("flashcards")
          .select("id, titulo, slug, categoria, criado_em")
          .order("criado_em", { ascending: false })
          .limit(5),

        supabase
          .from("questoes")
          .select("id, pergunta, categoria, criado_em")
          .order("criado_em", { ascending: false })
          .limit(5),

        supabase
          .from("casos_clinicos")
          .select("id, titulo, slug, categoria, criado_em")
          .order("criado_em", { ascending: false })
          .limit(5),

        supabase
          .from("farmacos")
          .select("id, nome, slug, classe, criado_em")
          .order("criado_em", { ascending: false })
          .limit(5),
      ])

      const feedItems: FeedItem[] = [
        ...(resumos.data || []).map((item: any) => ({
          id: item.id,
          tipo: "Resumo" as const,
          titulo: item.titulo,
          categoria: item.categoria,
          criado_em: item.criado_em,
          href: item.slug ? `/resumos/${item.slug}` : "/resumos",
          icon: FileText,
        })),

        ...(flashcards.data || []).map((item: any) => ({
          id: item.id,
          tipo: "Flashcard" as const,
          titulo: item.titulo,
          categoria: item.categoria,
          criado_em: item.criado_em,
          href: item.slug ? `/flashcards/${item.slug}` : "/flashcards",
          icon: Layers,
        })),

        ...(questoes.data || []).map((item: any) => ({
          id: item.id,
          tipo: "Questão" as const,
          titulo: item.pergunta || "Questão cadastrada",
          categoria: item.categoria,
          criado_em: item.criado_em,
          href: "/questoes",
          icon: HelpCircle,
        })),

        ...(casos.data || []).map((item: any) => ({
          id: item.id,
          tipo: "Caso Clínico" as const,
          titulo: item.titulo,
          categoria: item.categoria,
          criado_em: item.criado_em,
          href: item.slug ? `/casos-clinicos/${item.slug}` : "/casos-clinicos",
          icon: FlaskConical,
        })),

        ...(farmacos.data || []).map((item: any) => ({
          id: item.id,
          tipo: "Fármaco" as const,
          titulo: item.nome,
          categoria: item.classe,
          criado_em: item.criado_em,
          href: item.slug ? `/farmacos/${item.slug}` : "/farmacos",
          icon: Pill,
        })),
      ]

      feedItems.sort(
        (a, b) =>
          new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime()
      )

      setFeed(feedItems.slice(0, 8))
    }

    fetchData()
  }, [])

  function formatarData(data: string) {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 sm:py-8 lg:py-16">
          <section className="mb-7 sm:mb-10 rounded-[1.5rem] sm:rounded-[2rem] border border-rose-900/20 bg-gradient-to-br from-rose-100 via-white to-red-100 p-5 sm:p-8 shadow-xl shadow-rose-900/10 dark:border-rose-900/30 dark:from-rose-950/70 dark:via-card dark:to-red-950/30 dark:shadow-rose-950/20">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 sm:mb-5 rounded-full bg-rose-900 text-white text-xs sm:text-sm font-medium shadow-md shadow-rose-900/20 dark:bg-rose-950/60 dark:border dark:border-rose-800/30 dark:text-rose-200">
              <Sparkles className="h-3.5 w-3.5" />
              Hub de Estudos
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 dark:text-foreground mb-3 sm:mb-4 leading-tight">
              Monitoria de{" "}
              <span className="bg-gradient-to-r from-rose-800 via-red-700 to-rose-600 bg-clip-text text-transparent dark:from-rose-200 dark:via-rose-300 dark:to-red-300">
                Farmacologia Clínica
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-slate-700 dark:text-muted-foreground max-w-2xl leading-relaxed">
              Acompanhe as novidades da monitoria e acesse os materiais pelo
              menu lateral.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-5 sm:mt-6">
              <Link
                href="/flashcards"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-900 to-red-900 px-4 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-950/30"
              >
                <Play className="h-4 w-4" />
                Começar pelos flashcards
              </Link>

              <Link
                href="/resumos"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-900/30 bg-white/70 px-4 py-2.5 text-sm font-medium text-rose-950 transition hover:-translate-y-0.5 hover:border-rose-900/50 hover:bg-rose-50 dark:bg-rose-950/20 dark:text-rose-100 dark:hover:text-rose-200"
              >
                Ver resumos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <section className="mb-7 sm:mb-10">
            <div className="flex items-end justify-between mb-3 sm:mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  Novas adições
                </h2>

                <p className="text-xs sm:text-sm text-muted-foreground">
                  Últimos conteúdos adicionados ao hub
                </p>
              </div>

              <span className="hidden sm:inline-flex rounded-full bg-rose-100 border border-rose-900/20 px-3 py-1 text-xs font-medium text-rose-900 dark:bg-rose-950/40 dark:border-rose-800/30 dark:text-rose-200">
                Atualizações recentes
              </span>
            </div>

            {feed.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Nenhuma atualização cadastrada ainda.
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {feed.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <Link
                      key={`${item.tipo}-${item.id}`}
                      href={item.href}
                      className="group relative flex items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-rose-900/30 hover:shadow-xl hover:shadow-rose-900/10 dark:hover:border-rose-800/40 dark:hover:shadow-rose-950/20"
                    >
                      <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full bg-rose-800/0 transition group-hover:bg-rose-800" />

                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-rose-100 border border-rose-900/20 text-rose-900 transition group-hover:scale-110 group-hover:bg-rose-200 dark:bg-rose-950/50 dark:border-rose-800/30 dark:text-rose-200 dark:group-hover:bg-rose-900/40">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            {index === 0 && (
                              <span className="rounded-full bg-red-100 border border-red-900/20 px-2 py-0.5 text-[11px] sm:text-xs font-medium text-red-900 dark:bg-red-950/50 dark:border-red-800/30 dark:text-red-200">
                                Novo
                              </span>
                            )}

                            <span className="rounded-full bg-rose-100 border border-rose-900/20 px-2 py-0.5 text-[11px] sm:text-xs font-medium text-rose-900 dark:bg-rose-950/50 dark:border-rose-800/30 dark:text-rose-200">
                              {item.tipo}
                            </span>

                            {item.categoria && (
                              <span className="text-[11px] sm:text-xs text-muted-foreground">
                                {item.categoria}
                              </span>
                            )}
                          </div>

                          <h3 className="text-sm sm:text-base font-semibold text-foreground line-clamp-2 group-hover:text-rose-900 transition dark:group-hover:text-rose-200">
                            {item.titulo}
                          </h3>

                          <div className="mt-2 flex items-center gap-1 text-[11px] sm:text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {formatarData(item.criado_em)}
                          </div>
                        </div>
                      </div>

                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-rose-900 dark:group-hover:text-rose-200" />
                    </Link>
                  )
                })}
              </div>
            )}
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-7 sm:mb-10">
            {[
              { label: "Resumos", value: counts.resumos, href: "/resumos", icon: FileText },
              { label: "Flashcards", value: counts.flashcards, href: "/flashcards", icon: Layers },
              { label: "Questões", value: counts.questoes, href: "/questoes", icon: HelpCircle },
              { label: "Casos", value: counts.casos, href: "/casos-clinicos", icon: FlaskConical },
              { label: "Fármacos", value: counts.farmacos, href: "/farmacos", icon: Pill },
            ].map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group rounded-2xl bg-card border border-border p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-rose-900/30 hover:shadow-lg hover:shadow-rose-900/10 dark:hover:border-rose-800/40 dark:hover:shadow-rose-950/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-rose-900 dark:text-rose-200">
                        {item.value}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {item.label}
                      </div>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 border border-rose-900/20 text-rose-900 transition group-hover:scale-110 group-hover:bg-rose-200 dark:bg-rose-950/50 dark:border-rose-800/30 dark:text-rose-200 dark:group-hover:bg-rose-900/40">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </section>

          <section className="rounded-2xl bg-card border border-border p-4 sm:p-5 transition hover:border-rose-900/30 dark:hover:border-rose-800/30">
            <div className="flex items-center gap-2 mb-3 text-rose-900 dark:text-rose-200">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Equipe da monitoria</span>
            </div>

            <p className="text-sm text-muted-foreground">
              Monitores:{" "}
              <span className="text-rose-900 dark:text-rose-200 font-semibold">
                André Araújo
              </span>{" "}
              e{" "}
              <span className="text-rose-900 dark:text-rose-200 font-semibold">
                Camille Alves
              </span>
            </p>

            <p className="text-sm text-muted-foreground mt-1">
              Professor:{" "}
              <span className="text-foreground font-medium">
                Paulo Yuri Firmino
              </span>
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
