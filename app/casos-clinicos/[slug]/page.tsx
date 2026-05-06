"use client"

import { Sidebar } from "@/components/sidebar"
import { AdminOnly } from "@/components/AdminOnly"
import {
  ArrowLeft,
  Stethoscope,
  User,
  Activity,
  AlertTriangle,
  Pencil,
  ClipboardList,
} from "lucide-react"
import Link from "next/link"
import { use, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const dificuldadeColors: Record<string, string> = {
  Básico:
    "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400",
  Intermediário:
    "bg-amber-500/10 border border-amber-500/20 text-amber-400",
  Avançado:
    "bg-rose-950/50 border border-rose-800/30 text-rose-200",
}

export default function CasoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCaso() {
      const { data, error } = await supabase
        .from("casos_clinicos")
        .select("*")
        .eq("slug", slug)
        .single()

      if (error) {
        console.error("Erro ao buscar caso:", error)
        setLoading(false)
        return
      }

      setData(data)
      setLoading(false)
    }

    fetchCaso()
  }, [slug])

  const sections = [
    { key: "paciente", label: "Paciente", icon: User },
    { key: "queixa", label: "Queixa Principal", icon: AlertTriangle },
    { key: "historia", label: "História Clínica", icon: Activity },
    { key: "exame", label: "Exame Físico", icon: Stethoscope },
    { key: "conduta", label: "Conduta", icon: ClipboardList },
    { key: "discussao", label: "Discussão Farmacológica", icon: Stethoscope },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />

        <main className="lg:pl-64 pt-14 lg:pt-0">
          <div className="min-h-screen flex items-center justify-center px-4">
            <p className="text-sm text-muted-foreground">
              Carregando caso clínico...
            </p>
          </div>
        </main>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />

        <main className="lg:pl-64 pt-14 lg:pt-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
            <Link
              href="/casos-clinicos"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-rose-200 mb-8 transition"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Casos Clínicos
            </Link>

            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                Caso clínico não encontrado.
              </p>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          <div className="mb-7 flex items-center justify-between gap-4">
            <Link
              href="/casos-clinicos"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-rose-200 transition group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Voltar para Casos Clínicos
            </Link>

            <AdminOnly>
              <Link
                href={`/casos-clinicos/${slug}/editar`}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-900 to-red-900 px-4 py-2 text-sm font-medium text-white transition hover:from-rose-800 hover:to-red-800"
              >
                <Pencil className="h-4 w-4" />
                Editar
              </Link>
            </AdminOnly>
          </div>

          <section className="mb-8 rounded-[1.5rem] border border-rose-900/30 bg-gradient-to-br from-rose-950/60 via-card to-red-950/20 p-5 sm:p-6 shadow-xl shadow-rose-950/20">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="inline-flex h-13 w-13 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-950/60 border border-rose-800/30 text-rose-200 shadow-lg shadow-rose-950/30">
                <Stethoscope className="h-7 w-7" />
              </div>

              <div className="flex-1">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-rose-950/50 border border-rose-800/30 px-3 py-1 text-xs font-medium text-rose-200">
                  Caso Clínico
                </div>

                <h1 className="text-2xl sm:text-4xl font-bold leading-tight text-foreground">
                  {data.titulo}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      dificuldadeColors[data.dificuldade] ||
                      "bg-rose-950/50 border border-rose-800/30 text-rose-200"
                    }`}
                  >
                    {data.dificuldade || "Sem dificuldade"}
                  </span>

                  <span className="inline-flex items-center rounded-full bg-rose-950/40 border border-rose-800/30 px-3 py-1 text-xs font-medium text-rose-200">
                    {data.sistema || "Geral"}
                  </span>
                </div>

                {data.queixa && (
                  <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {data.queixa}
                  </p>
                )}
              </div>
            </div>
          </section>

          <div className="space-y-4">
            {sections.map(({ key, label, icon: Icon }) => (
              <section
                key={key}
                className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-rose-800/40 hover:shadow-lg hover:shadow-rose-950/20"
              >
                <div className="flex items-center gap-3 border-b border-border bg-rose-950/20 px-5 sm:px-6 py-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-950/50 border border-rose-800/30 text-rose-200">
                    <Icon className="h-4.5 w-4.5" />
                  </div>

                  <h3 className="font-semibold text-foreground">{label}</h3>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-sm sm:text-base leading-7 text-foreground/90 whitespace-pre-wrap">
                    {data[key as keyof typeof data] || "Não informado"}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
