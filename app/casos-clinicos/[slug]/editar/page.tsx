"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Stethoscope } from "lucide-react"

import { Sidebar } from "@/components/sidebar"
import { AdminOnly } from "@/components/AdminOnly"
import { supabase } from "@/lib/supabase"

export default function EditarCasoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <AdminOnly>
      <EditarCasoForm params={params} />
    </AdminOnly>
  )
}

function EditarCasoForm({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)

  const [form, setForm] = useState({
    titulo: "",
    sistema: "",
    paciente: "",
    queixa: "",
    historia: "",
    exame: "",
    conduta: "",
    discussao: "",
  })

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

      setForm({
        titulo: data.titulo || "",
        sistema: data.sistema || "",
        paciente: data.paciente || "",
        queixa: data.queixa || "",
        historia: data.historia || "",
        exame: data.exame || "",
        conduta: data.conduta || "",
        discussao: data.discussao || "",
      })

      setLoading(false)
    }

    fetchCaso()
  }, [slug])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.titulo || !form.sistema) {
      alert("Preencha título e sistema.")
      return
    }

    setSalvando(true)

    const { error } = await supabase
      .from("casos_clinicos")
      .update(form)
      .eq("slug", slug)

    setSalvando(false)

    if (error) {
      alert("Erro ao salvar alterações.")
      console.error(error)
      return
    }

    router.push(`/casos-clinicos/${slug}`)
  }

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

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          <Link
            href={`/casos-clinicos/${slug}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-rose-200 mb-8 group transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para o caso
          </Link>

          <section className="mb-8 rounded-[1.5rem] border border-rose-900/30 bg-gradient-to-br from-rose-950/60 via-card to-red-950/20 p-5 sm:p-6 shadow-xl shadow-rose-950/20">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-950/60 border border-rose-800/30 text-rose-200 shadow-lg shadow-rose-950/30">
                <Stethoscope className="h-7 w-7" />
              </div>

              <div>
                <div className="mb-3 inline-flex items-center rounded-full bg-rose-950/50 border border-rose-800/30 px-3 py-1 text-xs font-medium text-rose-200">
                  Editar caso clínico
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
                  Editar Caso Clínico
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground">
                  Atualize as informações do caso clínico.
                </p>
              </div>
            </div>
          </section>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-card p-5 sm:p-6 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Título
              </label>

              <input
                name="titulo"
                placeholder="Ex: Hipertensão Arterial Resistente"
                value={form.titulo}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Sistema / área
              </label>

              <input
                name="sistema"
                placeholder="Ex: Cardiovascular"
                value={form.sistema}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
              />
            </div>

            {[
              ["paciente", "Paciente", "Dados principais do paciente"],
              ["queixa", "Queixa principal", "Motivo principal da consulta"],
              ["historia", "História clínica", "História da doença atual e antecedentes"],
              ["exame", "Exame físico", "Achados relevantes do exame físico"],
              ["conduta", "Conduta", "Conduta terapêutica ou plano inicial"],
              ["discussao", "Discussão farmacológica", "Discussão sobre fármacos, mecanismos, interações e justificativas"],
            ].map(([name, label, placeholder]) => (
              <div key={name}>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  {label}
                </label>

                <textarea
                  name={name}
                  placeholder={placeholder}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  className="w-full min-h-32 rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                />
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={salvando}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-900 to-red-900 px-5 py-3 text-sm font-medium text-white transition hover:from-rose-800 hover:to-red-800 disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {salvando ? "Salvando..." : "Salvar alterações"}
              </button>

              <Link
                href={`/casos-clinicos/${slug}`}
                className="rounded-xl border border-rose-800/30 bg-rose-950/20 px-5 py-3 text-sm font-medium text-rose-200 transition hover:bg-rose-900/30"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
