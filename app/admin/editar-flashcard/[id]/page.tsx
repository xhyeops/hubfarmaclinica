"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { AdminOnly } from "@/components/AdminOnly"
import { supabase } from "@/lib/supabase"

export default function EditarFlashcardPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [flashcardId, setFlashcardId] = useState("")
  const [titulo, setTitulo] = useState("")
  const [categoria, setCategoria] = useState("")
  const [pergunta, setPergunta] = useState("")
  const [resposta, setResposta] = useState("")
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    async function carregarFlashcard() {
      const { data, error } = await supabase
        .from("flashcard_itens")
        .select(`
          id,
          flashcard_id,
          pergunta,
          resposta,
          flashcards (
            titulo,
            categoria
          )
        `)
        .eq("id", id)
        .single()

      if (error || !data) {
        alert("Flashcard não encontrado.")
        router.push("/flashcards")
        return
      }

      setFlashcardId(data.flashcard_id)
      setPergunta(data.pergunta)
      setResposta(data.resposta)
      setTitulo((data.flashcards as any)?.titulo || "")
      setCategoria((data.flashcards as any)?.categoria || "")
      setCarregando(false)
    }

    carregarFlashcard()
  }, [id, router])

  async function salvarAlteracoes(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)

    const { error: itemError } = await supabase
      .from("flashcard_itens")
      .update({
        pergunta,
        resposta,
      })
      .eq("id", id)

    if (itemError) {
      setSalvando(false)
      alert("Erro ao salvar pergunta e resposta.")
      console.error(itemError)
      return
    }

    const { error: conjuntoError } = await supabase
      .from("flashcards")
      .update({
        titulo,
        categoria: categoria || null,
      })
      .eq("id", flashcardId)

    setSalvando(false)

    if (conjuntoError) {
      alert("Erro ao salvar título/categoria.")
      console.error(conjuntoError)
      return
    }

    router.push("/flashcards")
  }

  async function excluirFlashcard() {
    const confirmar = confirm("Tem certeza que deseja excluir este flashcard?")
    if (!confirmar) return

    const { error } = await supabase
      .from("flashcard_itens")
      .delete()
      .eq("id", id)

    if (error) {
      alert("Erro ao excluir flashcard.")
      console.error(error)
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
                Flashcards
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">
                Editar flashcard
              </h1>

              <p className="text-muted-foreground">
                Atualize a pergunta, resposta, título e categoria.
              </p>
            </div>

            {carregando ? (
              <div className="rounded-2xl border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">Carregando...</p>
              </div>
            ) : (
              <form
                onSubmit={salvarAlteracoes}
                className="rounded-3xl border border-border bg-card p-5 sm:p-6 space-y-5"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Título do conjunto
                  </label>

                  <input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Título do conjunto"
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
                    placeholder="Categoria"
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
                    {salvando ? "Salvando..." : "Salvar alterações"}
                  </button>

                  <Link
                    href="/flashcards"
                    className="rounded-xl border border-rose-800/30 bg-rose-950/20 px-5 py-3 text-sm font-medium text-rose-200 transition hover:bg-rose-900/30"
                  >
                    Cancelar
                  </Link>

                  <button
                    type="button"
                    onClick={excluirFlashcard}
                    className="rounded-xl border border-red-800/40 bg-red-950/20 px-5 py-3 text-sm font-medium text-red-300 transition hover:bg-red-900/30"
                  >
                    Excluir
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </AdminOnly>
  )
}
