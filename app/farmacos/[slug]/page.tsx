"use client"

import { Sidebar } from "@/components/sidebar"
import {
  ArrowLeft,
  Pill,
  Beaker,
  AlertCircle,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { use, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Farmaco = {
  id: string
  slug: string
  nome: string
  classe: string | null
  categoria: string | null
  mecanismo: string | null
  indicacao: string | null
  contraindicacoes?: string | null
  efeitos_adversos?: string | null
  interacoes?: string | null
}

export default function FarmacoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const [data, setData] = useState<Farmaco | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregarFarmaco() {
      const { data, error } = await supabase
        .from("farmacos")
        .select("*")
        .eq("slug", slug)
        .single()

      if (error) {
        console.error("Erro ao carregar fármaco:", error)
        setData(null)
      } else {
        setData(data)
      }

      setLoading(false)
    }

    carregarFarmaco()
  }, [slug])

  function lista(texto?: string | null) {
    if (!texto) return []
    return texto
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
  }

  function InfoCard({
    title,
    icon: Icon,
    children,
  }: {
    title: string
    icon: any
    children: React.ReactNode
  }) {
    return (
      <section className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-rose-800/40 hover:shadow-lg hover:shadow-rose-950/20">
        <div className="flex items-center gap-3 border-b border-border bg-rose-950/20 px-5 sm:px-6 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-950/50 border border-rose-800/30 text-rose-200">
            <Icon className="h-4 w-4" />
          </div>

          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>

        <div className="p-5 sm:p-6">{children}</div>
      </section>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />

        <main className="lg:pl-64 pt-14 lg:pt-0">
          <div className="min-h-screen flex items-center justify-center px-4">
            <p className="text-sm text-muted-foreground">
              Carregando fármaco...
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
              href="/farmacos"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-rose-200 mb-8 group transition"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Voltar
            </Link>

            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-950/50 border border-rose-800/30 text-rose-200">
                <Pill className="h-8 w-8" />
              </div>

              <h2 className="text-xl font-semibold text-foreground">
                Fármaco não encontrado
              </h2>
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
          <Link
            href="/farmacos"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-rose-200 mb-8 group transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para Fármacos
          </Link>

          <section className="mb-8">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-950/50 border border-rose-800/30 text-rose-200 shadow-lg shadow-rose-950/20">
                <Pill className="h-6 w-6" />
              </div>

              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-full bg-rose-950/50 border border-rose-800/30 px-2.5 py-0.5 text-xs font-medium text-rose-200">
                    Consulta rápida
                  </span>

                  {data.categoria && (
                    <span className="inline-flex rounded-full bg-rose-950/30 border border-rose-800/20 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {data.categoria}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-foreground">
                  {data.nome}
                </h1>

                {data.classe && (
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {data.classe}
                  </p>
                )}
              </div>
            </div>
          </section>

          <div className="grid gap-4">
            <InfoCard title="Mecanismo de Ação" icon={Beaker}>
              <p className="text-sm sm:text-base leading-7 text-foreground/90 whitespace-pre-wrap">
                {data.mecanismo || "Não informado"}
              </p>
            </InfoCard>

            <div className="grid md:grid-cols-2 gap-4">
              <InfoCard title="Indicações" icon={CheckCircle}>
                {lista(data.indicacao).length > 0 ? (
                  <ul className="space-y-2">
                    {lista(data.indicacao).map((item, i) => (
                      <li
                        key={i}
                        className="text-sm sm:text-base leading-7 text-foreground/90"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Não informado
                  </p>
                )}
              </InfoCard>

              <InfoCard title="Contraindicações" icon={XCircle}>
                {lista(data.contraindicacoes).length > 0 ? (
                  <ul className="space-y-2">
                    {lista(data.contraindicacoes).map((item, i) => (
                      <li
                        key={i}
                        className="text-sm sm:text-base leading-7 text-foreground/90"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Não informado
                  </p>
                )}
              </InfoCard>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InfoCard title="Efeitos Adversos" icon={AlertCircle}>
                {lista(data.efeitos_adversos).length > 0 ? (
                  <ul className="space-y-2">
                    {lista(data.efeitos_adversos).map((item, i) => (
                      <li
                        key={i}
                        className="text-sm sm:text-base leading-7 text-foreground/90"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Não informado
                  </p>
                )}
              </InfoCard>

              <InfoCard title="Interações" icon={Zap}>
                {lista(data.interacoes).length > 0 ? (
                  <ul className="space-y-2">
                    {lista(data.interacoes).map((item, i) => (
                      <li
                        key={i}
                        className="text-sm sm:text-base leading-7 text-foreground/90"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Não informado
                  </p>
                )}
              </InfoCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
