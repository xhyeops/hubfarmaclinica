"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { AdminOnly } from "@/components/AdminOnly"
import { Sidebar } from "@/components/sidebar"
import { supabase } from "@/lib/supabase"
import {
  FlaskConical,
  ArrowRight,
  Stethoscope,
  AlertCircle,
  Plus,
} from "lucide-react"

export default function CasosClinicosPage() {
  const [casos, setCasos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCasos() {
      const { data, error } = await supabase
        .from("casos_clinicos")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Erro ao buscar casos:", error)
        setLoading(false)
        return
      }

      setCasos(data || [])
      setLoading(false)
    }

    fetchCasos()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-rose-950/50 border border-rose-800/30 text-rose-200 text-sm font-medium">
              <FlaskConical className="h-3.5 w-3.5" />
              Aprendizado Prático
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
                  Casos Clínicos
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                  Desenvolva seu raciocínio clínico com casos práticos e
                  discussões farmacológicas.
                </p>

                {!loading && (
                  <p className="mt-3 text-sm text-rose-200">
                    {casos.length}{" "}
                    {casos.length === 1
                      ? "caso cadastrado"
                      : "casos cadastrados"}
                  </p>
                )}
              </div>

              <AdminOnly>
                <Link
                  href="/casos-clinicos/novo"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-900 to-red-900 px-5 text-sm font-semibold text-white shadow-lg shadow-rose-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-rose-800 hover:to-red-800 hover:shadow-xl hover:shadow-rose-950/40"
                >
                  <Plus className="h-4 w-4" />
                  Novo Caso
                </Link>
              </AdminOnly>
            </div>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">Carregando casos...</p>
            </div>
          ) : casos.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-950/50 border border-rose-800/30 text-rose-200">
                <AlertCircle className="h-8 w-8" />
              </div>

              <h3 className="text-lg font-medium text-foreground mb-1">
                Nenhum caso ainda
              </h3>

              <p className="text-sm text-muted-foreground">
                Os casos clínicos aparecerão aqui quando forem adicionados.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {casos.map((caso) => (
                <Link
                  key={caso.id}
                  href={`/casos-clinicos/${caso.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-rose-800/40 hover:shadow-xl hover:shadow-rose-950/20"
                >
                  <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full bg-rose-800/0 transition group-hover:bg-rose-700" />

                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-950/50 border border-rose-800/30 text-rose-200 shadow-lg shadow-rose-950/20 transition group-hover:scale-110 group-hover:bg-rose-900/40">
                      <Stethoscope className="h-6 w-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {caso.sistema && (
                          <span className="inline-flex items-center rounded-full bg-rose-950/40 border border-rose-800/30 px-2.5 py-0.5 text-xs font-medium text-rose-200">
                            {caso.sistema}
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-rose-200 transition-colors mb-1">
                        {caso.titulo}
                      </h2>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {caso.queixa || "Sem descrição disponível"}
                      </p>
                    </div>

                    <ArrowRight className="h-5 w-5 shrink-0 mt-1 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-rose-200" />
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
