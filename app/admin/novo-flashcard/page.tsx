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

    const { error: itemError } = await supabase
      .from("flashcard_itens")
      .insert({
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
              className="inline-flex items-center gap-2 mb-6 text-sm text-muted-foreground hover:text-rose-200 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para flashcards
            </Link>

            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-rose-950/50 border border-rose-800/30 text-rose-200 text-sm font-medium">
                Novo flashcard
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">
                Criar flashcard
              </h1>

              <p className="text-muted-foreground">
                Cadastre um conjunto com pergunta, resposta e categoria.
              </p>
            </div>

            <form
              onSubmit={salvarFlashcard}
              className="rounded-3xl border border-border bg-card p-5 sm:p-6 space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Título do conjunto
                </label>

                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: Anti-hipertensivos"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Categoria
                </label>

                <input
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  placeholder="Ex: Sistema cardiovascular"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Pergunta
                </label>

                <textarea
                  value={pergunta}
                  onChange={(e) => setPergunta(e.target.value)}
                  placeholder="Pergunta"
                  required
                  className="min-h-32 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Resposta
                </label>

                <textarea
                  value={resposta}
                  onChange={(e) => setResposta(e.target.value)}
                  placeholder="Resposta"
                  required
                  className="min-h-40 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={salvando}
                  className="rounded-xl bg-gradient-to-r from-rose-900 to-red-900 px-5 py-3 text-sm font-medium text-white transition hover:from-rose-800 hover:to-red-800 disabled:opacity-60"
                >
                  {salvando ? "Salvando..." : "Salvar flashcard"}
                </button>

                <Link
                  href="/flashcards"
                  className="rounded-xl border border-rose-800/30 bg-rose-950/20 px-5 py-3 text-sm font-medium text-rose-200 transition hover:bg-rose-900/30"
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
