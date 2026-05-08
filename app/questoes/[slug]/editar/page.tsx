"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Plus,
  Save,
  Trash2,
  Target,
  ImageIcon,
} from "lucide-react"

import { Sidebar } from "@/components/sidebar"
import { AdminOnly } from "@/components/AdminOnly"
import { supabase } from "@/lib/supabase"

type Questao = {
  id?: string
  tipo: "fechada" | "aberta"
  pergunta: string
  imagem_url: string
  alternativa_a: string
  alternativa_b: string
  alternativa_c: string
  alternativa_d: string
  alternativa_e: string
  correta: string
  resposta_aberta: string
  comentario: string
  ordem: number
}

const questaoVazia: Questao = {
  tipo: "fechada",
  pergunta: "",
  imagem_url: "",
  alternativa_a: "",
  alternativa_b: "",
  alternativa_c: "",
  alternativa_d: "",
  alternativa_e: "",
  correta: "A",
  resposta_aberta: "",
  comentario: "",
  ordem: 1,
}

export default function EditarQuestoesPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <AdminOnly>
      <EditarQuestoesForm params={params} />
    </AdminOnly>
  )
}

function EditarQuestoesForm({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [tema, setTema] = useState<any>(null)

  const [formTema, setFormTema] = useState({
    titulo: "",
    descricao: "",
  })

  const [questoes, setQuestoes] = useState<Questao[]>([])

  useEffect(() => {
    async function fetchData() {
      const { data: temaData, error: temaError } = await supabase
        .from("temas_questoes")
        .select("*")
        .eq("slug", slug)
        .single()

      if (temaError) {
        console.error("Erro ao buscar tema:", temaError)
        setLoading(false)
        return
      }

      const { data: questoesData, error: questoesError } = await supabase
        .from("questoes")
        .select("*")
        .eq("tema_id", temaData.id)
        .order("ordem", { ascending: true })

      if (questoesError) {
        console.error("Erro ao buscar questões:", questoesError)
        setLoading(false)
        return
      }

      setTema(temaData)

      setFormTema({
        titulo: temaData.titulo || "",
        descricao: temaData.descricao || "",
      })

      setQuestoes(
        (questoesData || []).map((q: any) => ({
          ...q,
          tipo: q.tipo || "fechada",
          imagem_url: q.imagem_url || "",
          alternativa_e: q.alternativa_e || "",
          resposta_aberta: q.resposta_aberta || "",
        }))
      )

      setLoading(false)
    }

    fetchData()
  }, [slug])

  function handleTemaChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormTema({
      ...formTema,
      [e.target.name]: e.target.value,
    })
  }

  function handleQuestaoChange(
    index: number,
    campo: keyof Questao,
    valor: string
  ) {
    const novas = [...questoes]

    novas[index] = {
      ...novas[index],
      [campo]: campo === "ordem" ? Number(valor) : valor,
    }

    setQuestoes(novas)
  }

  function adicionarQuestao() {
    setQuestoes([
      ...questoes,
      {
        ...questaoVazia,
        ordem: questoes.length + 1,
      },
    ])
  }

  async function removerQuestao(index: number) {
    const questao = questoes[index]

    if (!confirm("Tem certeza que deseja remover esta questão?")) {
      return
    }

    if (questao.id) {
      const { error } = await supabase
        .from("questoes")
        .delete()
        .eq("id", questao.id)

      if (error) {
        alert("Erro ao remover questão.")
        console.error(error)
        return
      }
    }

    setQuestoes(questoes.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!tema) return

    setSalvando(true)

    const { error: temaError } = await supabase
      .from("temas_questoes")
      .update({
        titulo: formTema.titulo,
        descricao: formTema.descricao,
      })
      .eq("id", tema.id)

    if (temaError) {
      setSalvando(false)
      alert("Erro ao salvar tema.")
      return
    }

    for (const q of questoes) {
      const payload = {
        pergunta: q.pergunta,
        tipo: q.tipo,
        imagem_url: q.imagem_url || null,

        alternativa_a:
          q.tipo === "fechada"
            ? q.alternativa_a
            : null,

        alternativa_b:
          q.tipo === "fechada"
            ? q.alternativa_b
            : null,

        alternativa_c:
          q.tipo === "fechada"
            ? q.alternativa_c
            : null,

        alternativa_d:
          q.tipo === "fechada"
            ? q.alternativa_d
            : null,

        alternativa_e:
          q.tipo === "fechada"
            ? q.alternativa_e || null
            : null,

        correta:
          q.tipo === "fechada"
            ? q.correta
            : null,

        resposta_aberta:
          q.tipo === "aberta"
            ? q.resposta_aberta
            : null,

        comentario: q.comentario,
        ordem: q.ordem,
      }

      if (q.id) {
        const { error } = await supabase
          .from("questoes")
          .update(payload)
          .eq("id", q.id)

        if (error) {
          setSalvando(false)
          alert("Erro ao atualizar questão.")
          console.error(error)
          return
        }
      } else {
        const { error } = await supabase
          .from("questoes")
          .insert([
            {
              ...payload,
              tema_id: tema.id,
            },
          ])

        if (error) {
          setSalvando(false)
          alert("Erro ao criar questão.")
          console.error(error)
          return
        }
      }
    }

    setSalvando(false)

    router.push(`/questoes/${slug}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />

        <main className="lg:pl-64 pt-14 lg:pt-0">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
            <p className="text-muted-foreground">
              Carregando edição...
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          <Link
            href={`/questoes/${slug}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-rose-200 mb-8 group transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para o quiz
          </Link>

          <section className="mb-8 rounded-[1.5rem] border border-rose-900/30 bg-gradient-to-br from-rose-950/60 via-card to-red-950/20 p-5 sm:p-6 shadow-xl shadow-rose-950/20">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-950/60 border border-rose-800/30 text-rose-200 shadow-lg shadow-rose-950/30">
                <Target className="h-7 w-7" />
              </div>

              <div>
                <div className="mb-3 inline-flex items-center rounded-full bg-rose-950/50 border border-rose-800/30 px-3 py-1 text-xs font-medium text-rose-200">
                  Editar questões
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
                  Editar Questões
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground">
                  Edite questões abertas, fechadas e imagens.
                </p>
              </div>
            </div>
          </section>

          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="rounded-3xl border border-border bg-card p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Tema
              </h2>

              <input
                name="titulo"
                placeholder="Título do tema"
                value={formTema.titulo}
                onChange={handleTemaChange}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
              />

              <textarea
                name="descricao"
                placeholder="Descrição"
                value={formTema.descricao}
                onChange={handleTemaChange}
                className="w-full min-h-24 rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
              />
            </section>

            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-foreground">
                Questões
              </h2>

              <button
                type="button"
                onClick={adicionarQuestao}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-900 to-red-900 px-4 py-2 text-sm font-medium text-white transition hover:from-rose-800 hover:to-red-800"
              >
                <Plus className="h-4 w-4" />
                Adicionar Questão
              </button>
            </div>

            <div className="space-y-6">
              {questoes.map((q, index) => (
                <section
                  key={q.id || index}
                  className="rounded-3xl border border-border bg-card p-5 sm:p-6 space-y-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Questão {index + 1}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        Configure a questão.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removerQuestao(index)}
                      className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-400 transition hover:bg-rose-500/20"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remover
                    </button>
                  </div>

                  <input
                    type="number"
                    min={1}
                    placeholder="Ordem"
                    value={q.ordem}
                    onChange={(e) =>
                      handleQuestaoChange(
                        index,
                        "ordem",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                  />

                  <select
                    value={q.tipo}
                    onChange={(e) =>
                      handleQuestaoChange(
                        index,
                        "tipo",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                  >
                    <option value="fechada">
                      Questão fechada
                    </option>

                    <option value="aberta">
                      Questão aberta
                    </option>
                  </select>

                  <textarea
                    placeholder="Pergunta"
                    value={q.pergunta}
                    onChange={(e) =>
                      handleQuestaoChange(
                        index,
                        "pergunta",
                        e.target.value
                      )
                    }
                    className="w-full min-h-28 rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                  />

                  <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                      <ImageIcon className="h-4 w-4 text-rose-300" />
                      Imagem da questão
                    </div>

                    <input
                      placeholder="Cole a URL da imagem"
                      value={q.imagem_url}
                      onChange={(e) =>
                        handleQuestaoChange(
                          index,
                          "imagem_url",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                    />

                    {q.imagem_url && (
                      <img
                        src={q.imagem_url}
                        alt="Prévia"
                        className="mt-4 max-h-72 rounded-xl border border-border object-contain"
                      />
                    )}
                  </div>

                  {q.tipo === "fechada" ? (
                    <>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input
                          placeholder="Alternativa A"
                          value={q.alternativa_a}
                          onChange={(e) =>
                            handleQuestaoChange(
                              index,
                              "alternativa_a",
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                        />

                        <input
                          placeholder="Alternativa B"
                          value={q.alternativa_b}
                          onChange={(e) =>
                            handleQuestaoChange(
                              index,
                              "alternativa_b",
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                        />

                        <input
                          placeholder="Alternativa C"
                          value={q.alternativa_c}
                          onChange={(e) =>
                            handleQuestaoChange(
                              index,
                              "alternativa_c",
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                        />

                        <input
                          placeholder="Alternativa D"
                          value={q.alternativa_d}
                          onChange={(e) =>
                            handleQuestaoChange(
                              index,
                              "alternativa_d",
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                        />

                        <input
                          placeholder="Alternativa E opcional"
                          value={q.alternativa_e}
                          onChange={(e) =>
                            handleQuestaoChange(
                              index,
                              "alternativa_e",
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800 sm:col-span-2"
                        />
                      </div>

                      <select
                        value={q.correta}
                        onChange={(e) =>
                          handleQuestaoChange(
                            index,
                            "correta",
                            e.target.value
                          )
                        }
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                      >
                        <option value="A">Correta: A</option>
                        <option value="B">Correta: B</option>
                        <option value="C">Correta: C</option>
                        <option value="D">Correta: D</option>
                        <option value="E">Correta: E</option>
                      </select>
                    </>
                  ) : (
                    <textarea
                      placeholder="Resposta esperada"
                      value={q.resposta_aberta}
                      onChange={(e) =>
                        handleQuestaoChange(
                          index,
                          "resposta_aberta",
                          e.target.value
                        )
                      }
                      className="w-full min-h-32 rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                    />
                  )}

                  <textarea
                    placeholder="Comentário da questão"
                    value={q.comentario}
                    onChange={(e) =>
                      handleQuestaoChange(
                        index,
                        "comentario",
                        e.target.value
                      )
                    }
                    className="w-full min-h-32 rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                  />
                </section>
              ))}
            </div>

            <button
              type="submit"
              disabled={salvando}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-900 to-red-900 px-4 py-3 font-medium text-white transition hover:from-rose-800 hover:to-red-800 disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {salvando ? "Salvando..." : "Salvar Alterações"}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
