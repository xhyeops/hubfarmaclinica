"use client"

import ReactMarkdown from "react-markdown"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { ArrowLeft, FileText, BookOpen } from "lucide-react"

export default function ResumoDetailPage() {
  const { slug } = useParams()
  const [resumo, setResumo] = useState<any>(null)

  useEffect(() => {
    async function carregarResumo() {
      const { data, error } = await supabase
        .from("resumos")
        .select("*")
        .eq("slug", slug)
        .single()

      if (error) {
        console.error("Erro ao carregar resumo:", error)
        return
      }

      setResumo(data)
    }

    if (slug) carregarResumo()
  }, [slug])

  if (!resumo) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

          {/* Botão voltar */}
          <Link
            href="/resumos"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Resumos
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">

              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <FileText className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {resumo.title}
                </h1>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <BookOpen className="h-3 w-3" />
              {resumo.categoria}
            </span>
          </div>

          {/* Conteúdo com Markdown estilizado */}
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">

            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mb-4 text-foreground">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold mt-6 mb-3 text-foreground">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-5 mb-2 text-foreground">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-3 leading-relaxed text-foreground">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="text-foreground">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-blue-400">
                    {children}
                  </strong>
                ),
              }}
            >
              {resumo.conteudo || ""}
            </ReactMarkdown>

          </div>

        </div>
      </main>
    </div>
  )
}