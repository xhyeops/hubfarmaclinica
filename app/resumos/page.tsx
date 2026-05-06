"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import {
  FileText,
  ArrowRight,
  BookOpen,
  Plus,
  ArrowUp,
  ArrowDown,
  ListOrdered,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { AdminOnly } from "@/components/AdminOnly"

type Resumo = {
  id: string
  slug: string
  titulo: string
  description: string | null
  categoria: string | null
  criado_em?: string
  ordem: number | null
}

export default function ResumosPage() {
  const [resumos, setResumos] = useState<Resumo[]>([])
  const [loading, setLoading] = useState(true)
  const [modoReordenar, setModoReordenar] = useState(false)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    carregarResumos()
  }, [])

  async function carregarResumos() {
    setLoading(true)

    const { data, error } = await supabase
      .from("resumos")
      .select("*")
      .order("ordem", { ascending: false })
      .order("criado_em", { ascending: false })

    if (error) {
      console.error("Erro ao carregar resumos:", error)
      setLoading(false)
      return
    }

    setResumos(data || [])
    setLoading(false)
  }

  async function moverResumo(index: number, direcao: "cima" | "baixo") {
    const novoIndex = direcao === "cima" ? index - 1 : index + 1

    if (novoIndex < 0 || novoIndex >= resumos.length) return

    const lista = [...resumos]
    const atual = lista[index]
    const troca = lista[novoIndex]

    lista[index] = troca
    lista[novoIndex] = atual

    setResumos(lista)
    setSalvando(true)

    const total = lista.length

    const atualizacoes = lista.map((resumo, i) =>
      supabase
        .from("resumos")
        .update({
          ordem: total - i,
        })
        .eq("id", resumo.id)
    )

    const resultados = await Promise.all(atualizacoes)
    const erro = resultados.find((resultado) => resultado.error)

    if (erro?.error) {
      console.error("Erro ao reordenar:", erro.error)
      await carregarResumos()
    } else {
      setResumos(
        lista.map((resumo, i) => ({
          ...resumo,
          ordem: total - i,
        }))
      )
    }

    setSalvando(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
          <div className="mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-rose-900/30 text-rose-300 text-sm font-medium border border-rose-800/40">
              <FileText className="h-3.5 w-3.5" />
              Conteúdo de Estudo
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  Resumos
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                  Conteúdos resumidos e organizados para facilitar seu estudo em
                  farmacologia clínica.
                </p>
              </div>

              <AdminOnly>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setModoReordenar(!modoReordenar)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-rose-800/40 bg-rose-950/40 px-5 text-sm font-semibold text-rose-300 shadow-sm shadow-rose-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-700/60 hover:bg-rose-900/40 hover:shadow-lg hover:shadow-rose-950/30"
                  >
                    <ListOrdered size={18} />
                    {modoReordenar ? "Concluir" : "Reordenar"}
                  </button>

                  <Link
                    href="/admin/novo-resumo"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-900 to-red-900 px-5 text-sm font-semibold text-white shadow-lg shadow-rose-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-950/40"
                  >
                    <Plus size={18} />
                    Novo resumo
                  </Link>
                </div>
              </AdminOnly>
            </div>

            {modoReordenar && (
              <p className="mt-4 text-sm text-muted-foreground">
                Use as setas para reorganizar os resumos.
              </p>
            )}

            {salvando && (
              <p className="mt-2 text-sm text-rose-300">
                Salvando nova ordem...
              </p>
            )}
          </div>

          {loading ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">Carregando resumos...</p>
            </div>
          ) : resumos.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <BookOpen className="mx-auto mb-4 h-8 w-8 text-rose-300" />

              <p className="font-medium text-foreground">
                Nenhum resumo encontrado
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Quando novos conteúdos forem adicionados, eles aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {resumos.map((resumo, index) => (
                <div
                  key={resumo.id}
                  className="group rounded-2xl bg-card border border-border p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-rose-800/50 hover:shadow-lg hover:shadow-rose-950/20"
                >
                  <div className="flex gap-4">
                    <div className="hidden sm:flex w-12 h-12 shrink-0 items-center justify-center rounded-xl bg-rose-950/50 text-rose-300 font-bold border border-rose-800/30">
                      {String(resumos.length - index).padStart(2, "0")}
                    </div>

                    <Link
                      href={`/resumos/${resumo.slug}`}
                      className="flex flex-1 min-w-0 gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="inline-flex rounded-full bg-rose-950/50 border border-rose-800/30 px-2.5 py-1 text-xs font-medium text-rose-300">
                          {resumo.categoria || "Geral"}
                        </span>

                        <h2 className="text-lg sm:text-xl font-semibold mt-3 text-foreground group-hover:text-rose-300 transition">
                          {resumo.titulo}
                        </h2>

                        {resumo.description && (
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {resumo.description}
                          </p>
                        )}
                      </div>

                      {!modoReordenar && (
                        <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground opacity-60 transition group-hover:translate-x-1 group-hover:text-rose-300 group-hover:opacity-100" />
                      )}
                    </Link>

                    {modoReordenar && (
                      <AdminOnly>
                        <div className="flex shrink-0 flex-col gap-2">
                          <button
                            type="button"
                            disabled={index === 0 || salvando}
                            onClick={() => moverResumo(index, "cima")}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-800/30 bg-rose-950/40 text-rose-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-700/60 hover:bg-rose-900/40 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
                          >
                            <ArrowUp size={18} />
                          </button>

                          <button
                            type="button"
                            disabled={index === resumos.length - 1 || salvando}
                            onClick={() => moverResumo(index, "baixo")}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-800/30 bg-rose-950/40 text-rose-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-700/60 hover:bg-rose-900/40 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
                          >
                            <ArrowDown size={18} />
                          </button>
                        </div>
                      </AdminOnly>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
