"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { AdminOnly } from "@/components/AdminOnly"
import { supabase } from "@/lib/supabase"

function gerarSlug(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export default function NovoFlashcardPage() {
  const router = useRouter()

  const [titulo, setTitulo] = useState("")
  const [categoria, setCategoria] = useState("")
  const [pergunta, setPergunta] = useState("")
  const [resposta, setResposta] = useState("")
  const [salvando, setSalvando] = useState(false)

  async function salvarFlashcard(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)

    const slugBase = gerarSlug(titulo)
    const slug = `${slugBase}-${Date.now()}`

    const { data: flashcard, error: flashcardError } = await supabase
      .from("flashcards")
      .insert({
        titulo,
        slug,
        categoria: categoria || null,
      })
      .select("id")
      .single()

    if (flashcardError || !flashcard) {
      setSalvando(false)
      alert("Erro ao criar conjunto de flashcards.")
      console.error(flashcardError)
      return
    }

    const { error: itemError } = await supabase.from("flashcard_itens").insert({
      flashcard_id: flashcard.id,
      pergunta,
      resposta,
      ordem: 1,
    })

    setSalvando(false)

    if (itemError) {
      alert("Erro ao salvar pergunta e resposta.")
      console.error(itemError)
      return
    }

    router.push("/flashcards")
  }

  return (
    <AdminOnly>
      <div className="min-h-screen bg-background">
        <Sidebar />

        <main className="lg:pl-64 pt-14 lg:pt-0">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 lg:py-16">
            <Link
              href="/flashcards"
              className="inline-flex items-center gap-2 mb-6 text-sm text-muted-foreground hover:text-rose-400 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para flashcards
            </Link>

            <h1 className="text-3xl font-bold mb-2">Novo flashcard</h1>
            <p className="text-muted-foreground mb-8">
              Cadastre um conjunto com pergunta, resposta e categoria.
            </p>

            <form onSubmit={salvarFlashcard} className="space-y-5">
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título do conjunto, ex: Anti-hipertensivos"
                required
                className="w-full rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-rose-500"
              />

              <input
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                placeholder="Categoria, ex: Sistema cardiovascular"
                className="w-full rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-rose-500"
              />

              <textarea
                value={pergunta}
                onChange={(e) => setPergunta(e.target.value)}
                placeholder="Pergunta"
                required
                className="min-h-32 w-full rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-rose-500"
              />

              <textarea
                value={resposta}
                onChange={(e) => setResposta(e.target.value)}
                placeholder="Resposta"
                required
                className="min-h-40 w-full rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-rose-500"
              />

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={salvando}
                  className="rounded-xl bg-rose-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-600 disabled:opacity-60"
                >
                  {salvando ? "Salvando..." : "Salvar flashcard"}
                </button>

                <Link
                  href="/flashcards"
                  className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition hover:border-rose-500/40 hover:text-rose-400"
                >
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </AdminOnly>
  )
}
