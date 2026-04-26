"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { FileText, ArrowRight, BookOpen } from "lucide-react"
import { supabase } from "@/lib/supabase"

type Resumo = {
  id: string
  slug: string
  title: string
  description: string
  categoria: string
}

export default function ResumosPage() {
  const [resumos, setResumos] = useState<Resumo[]>([])

  useEffect(() => {
    async function carregarResumos() {
      const { data, error } = await supabase
        .from("resumos")
        .select("*")

      if (error) {
        console.error("Erro ao carregar resumos:", error)
        return
      }

      setResumos(data || [])
    }

    carregarResumos()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium">
              <FileText className="h-3.5 w-3.5" />
              <span>Conteúdo de Estudo</span>
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-2">
              Resumos
            </h1>

            <p className="text-muted-foreground">
              Conteúdos resumidos e organizados para facilitar seu estudo.
            </p>
          </div>

          <div className="grid gap-4">
            {resumos.map((resumo, index) => (
              <Link
                key={resumo.id}
                href={`/resumos/${resumo.slug}`}
                className="group rounded-2xl bg-card border p-6 hover:shadow-lg transition"
              >
                <div className="flex gap-4">

                  <div className="hidden sm:flex w-12 h-12 items-center justify-center rounded-xl bg-blue-500 text-white font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1">
                    <span className="text-xs bg-secondary px-2 py-1 rounded">
                      {resumo.categoria}
                    </span>

                    <h2 className="text-lg font-semibold mt-2">
                      {resumo.title}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      {resumo.description}
                    </p>
                  </div>

                  <ArrowRight className="opacity-50 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div>

          {resumos.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="mx-auto mb-4" />
              <p>Nenhum resumo encontrado</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}