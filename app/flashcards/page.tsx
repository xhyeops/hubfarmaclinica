"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AdminOnly } from "@/components/AdminOnly"
import { supabase } from "@/lib/supabase"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Pencil,
  Plus,
  RotateCcw,
} from "lucide-react"

type FlashcardItem = {
  id: string
  pergunta: string
  resposta: string
  ordem: number
}

type FlashcardDeck = {
  id: string
  titulo: string
  slug: string
  categoria: string | null
  flashcard_itens: FlashcardItem[]
}

export default function FlashcardsPage() {
  const [decks, setDecks] = useState<FlashcardDeck[]>([])
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    async function carregarFlashcards() {
      const { data, error } = await supabase
        .from("flashcards")
        .select(`
          id,
          titulo,
          slug,
          categoria,
          flashcard_itens (
            id,
            pergunta,
            resposta,
            ordem
          )
        `)
        .order("titulo", { ascending: true })

      if (error) {
        console.error("Erro ao carregar flashcards:", error)
        return
      }

      const decksFormatados =
        data?.map((deck: any) => ({
          ...deck,
          flashcard_itens:
            deck.flashcard_itens?.sort(
              (a: FlashcardItem, b: FlashcardItem) => a.ordem - b.ordem
            ) || [],
        })) || []

      setDecks(decksFormatados)
    }

    carregarFlashcards()
  }, [])

  const selectedDeck = useMemo(() => {
    return decks.find((deck) => deck.id === selectedDeckId) || null
  }, [decks, selectedDeckId])

  const flashcards = selectedDeck?.flashcard_itens || []
  const currentCard = flashcards[currentIndex]

  function abrirDeck(deckId: string) {
    setSelectedDeckId(deckId)
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  function voltarParaDecks() {
    setSelectedDeckId(null)
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  function proximoCard() {
    setIsFlipped(false)
    setCurrentIndex((prev) =>
      prev === flashcards.length - 1 ? 0 : prev + 1
    )
  }

  function cardAnterior() {
    setIsFlipped(false)
    setCurrentIndex((prev) =>
      prev === 0 ? flashcards.length - 1 : prev - 1
    )
  }

  function virarCard() {
    setIsFlipped((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-16">
          <section className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-rose-950/50 border border-rose-800/30 text-rose-200 text-sm font-medium">
              <Layers className="h-3.5 w-3.5" />
              Flashcards
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                  Flashcards de{" "}
                  <span className="bg-gradient-to-r from-rose-200 via-rose-300 to-red-300 bg-clip-text text-transparent">
                    Farmacologia Clínica
                  </span>
                </h1>

                <p className="text-muted-foreground">
                  Revise os cards como um baralho de estudo.
                </p>
              </div>

              <AdminOnly>
                <Link
                  href="/admin/novo-flashcard"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-900 to-red-900 px-4 py-2 text-sm font-medium text-white transition hover:from-rose-800 hover:to-red-800"
                >
                  <Plus className="h-4 w-4" />
                  Novo flashcard
                </Link>
              </AdminOnly>
            </div>
          </section>

          {!selectedDeck ? (
            <>
              <p className="mb-6 text-sm font-medium text-rose-200">
                {decks.length} tema{decks.length === 1 ? "" : "s"} cadastrado
                {decks.length === 1 ? "" : "s"}
              </p>

              {decks.length === 0 ? (
                <div className="rounded-3xl border border-border bg-card p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    Nenhum flashcard cadastrado ainda.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {decks.map((deck) => (
                    <button
                      key={deck.id}
                      onClick={() => abrirDeck(deck.id)}
                      className="group text-left rounded-3xl border border-border bg-card p-6 transition hover:border-rose-800/50 hover:bg-rose-950/10"
                    >
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-800/30 bg-rose-950/40 text-rose-200">
                        <Layers className="h-5 w-5" />
                      </div>

                      <h2 className="mb-2 text-xl font-bold">
                        {deck.titulo}
                      </h2>

                      <p className="mb-5 text-sm text-muted-foreground">
                        Categoria: {deck.categoria || "Geral"}
                      </p>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{deck.flashcard_itens.length} cards</span>
                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1 group-hover:text-rose-200" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <section className="flex flex-col items-center">
              <div className="mb-5 flex w-full max-w-xl items-center justify-between rounded-2xl border border-rose-800/30 bg-rose-950/30 px-5 py-3">
                <div>
                  <p className="text-xs text-muted-foreground">Categoria</p>

                  <p className="text-sm font-medium text-rose-200">
                    {selectedDeck.categoria || "Geral"}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Card</p>

                  <p className="text-sm font-semibold">
                    {currentIndex + 1} / {flashcards.length}
                  </p>
                </div>

                <AdminOnly>
                  {currentCard && (
                    <Link
                      href={`/admin/editar-flashcard/${currentCard.id}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-rose-800/30 bg-rose-950/40 px-2.5 py-1.5 text-xs font-medium text-rose-200 transition hover:bg-rose-900/40"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Editar
                    </Link>
                  )}
                </AdminOnly>
              </div>

              <button
                onClick={voltarParaDecks}
                className="mb-5 text-sm text-muted-foreground transition hover:text-rose-200"
              >
                ← Voltar para temas
              </button>

              {currentCard ? (
                <>
                  <button
                    onClick={virarCard}
                    className="w-full max-w-xl cursor-pointer perspective"
                  >
                    <div
                      className={`relative w-full h-[330px] sm:h-[380px] transition-transform duration-500 preserve-3d ${
                        isFlipped ? "rotate-y-180" : ""
                      }`}
                    >
                      <div className="absolute inset-0 backface-hidden rounded-[2rem] border border-rose-800/30 bg-gradient-to-br from-zinc-900 to-black p-8 shadow-2xl shadow-rose-950/20 flex items-center justify-center text-center">
                        <div>
                          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-rose-200/70">
                            Pergunta
                          </p>

                          <h2 className="text-2xl sm:text-3xl font-semibold leading-relaxed text-foreground">
                            {currentCard.pergunta}
                          </h2>
                        </div>
                      </div>

                      <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[2rem] border border-rose-800/30 bg-gradient-to-br from-rose-950 to-red-950 p-8 shadow-2xl shadow-rose-950/30 flex items-center justify-center text-center">
                        <div>
                          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-rose-200">
                            Resposta
                          </p>

                          <h2 className="text-xl sm:text-2xl font-medium leading-relaxed text-foreground">
                            {currentCard.resposta}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </button>

                  <div className="mt-6 flex w-full max-w-md items-center justify-between rounded-3xl border border-rose-800/30 bg-rose-950/20 px-5 py-4">
                    <button
                      onClick={cardAnterior}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-950/50 border border-rose-800/30 text-rose-200 transition hover:bg-rose-900/40"
                      aria-label="Card anterior"
                    >
                      <ChevronLeft className="h-7 w-7" />
                    </button>

                    <button
                      onClick={virarCard}
                      className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-rose-200"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Virar
                    </button>

                    <button
                      onClick={proximoCard}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-950/50 border border-rose-800/30 text-rose-200 transition hover:bg-rose-900/40"
                      aria-label="Próximo card"
                    >
                      <ChevronRight className="h-7 w-7" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="rounded-3xl border border-border bg-card p-8 text-center">
                  <p className="text-muted-foreground">
                    Nenhum card cadastrado neste tema.
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
