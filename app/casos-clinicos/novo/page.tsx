"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Eye,
  Save,
  Stethoscope,
  User,
  Activity,
  AlertTriangle,
  ClipboardList,
} from "lucide-react"

import { Sidebar } from "@/components/sidebar"
import { AdminOnly } from "@/components/AdminOnly"
import { supabase } from "@/lib/supabase"

export default function NovoCasoPage() {
  return (
    <AdminOnly>
      <FormNovoCaso />
    </AdminOnly>
  )
}

function FormNovoCaso() {
  const router = useRouter()
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function gerarSlug(texto: string) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.titulo || !form.sistema) {
      alert("Preencha título e sistema.")
      return
    }

    setSalvando(true)

    const slug = `${gerarSlug(form.titulo)}-${Date.now()}`

    const { error } = await supabase.from("casos_clinicos").insert([
      {
        ...form,
        slug,
      },
    ])

    setSalvando(false)

    if (error) {
      alert("Erro ao salvar o caso clínico.")
      console.error(error)
      return
    }

    router.push(`/casos-clinicos/${slug}`)
  }

  const sections = [
    { key: "paciente", label: "Paciente", icon: User },
    { key: "queixa", label: "Queixa Principal", icon: AlertTriangle },
    { key: "historia", label: "História Clínica", icon: Activity },
    { key: "exame", label: "Exame Físico", icon: Stethoscope },
    { key: "conduta", label: "Conduta", icon: ClipboardList },
    { key: "discussao", label: "Discussão Farmacológica", icon: Stethoscope },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          <Link
            href="/casos-clinicos"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-rose-200 mb-8 group transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para Casos Clínicos
          </Link>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-rose-950/50 border border-rose-800/30 text-rose-200 text-sm font-medium">
              Novo caso
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
              Novo Caso Clínico
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground">
              Cadastre um novo caso clínico e veja a prévia antes de salvar.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
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
                  placeholder="Ex: Hipertensão arterial resistente"
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
                  placeholder="Ex: Cardiovascular, Endócrino..."
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
                    className="w-full min-h-28 rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
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
                  {salvando ? "Salvando..." : "Salvar caso"}
                </button>

                <Link
                  href="/casos-clinicos"
                  className="rounded-xl border border-rose-800/30 bg-rose-950/20 px-5 py-3 text-sm font-medium text-rose-200 transition hover:bg-rose-900/30"
                >
                  Cancelar
                </Link>
              </div>
            </form>

            <div className="lg:sticky lg:top-8 h-fit">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-950/50 border border-rose-800/30 px-3 py-1.5 text-sm font-medium text-rose-200">
                <Eye className="h-4 w-4" />
                Prévia
              </div>

              <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
                <div className="mb-6 flex items-start gap-3">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-950/50 border border-rose-800/30 text-rose-200">
                    <Stethoscope className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex rounded-full bg-rose-950/50 border border-rose-800/30 px-2.5 py-0.5 text-xs font-medium text-rose-200">
                        Caso Clínico
                      </span>

                      <span className="inline-flex rounded-full bg-rose-950/30 border border-rose-800/20 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        {form.sistema || "Sistema"}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-foreground">
                      {form.titulo || "Título do caso clínico"}
                    </h2>

                    {form.queixa && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {form.queixa}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {sections.map(({ key, label, icon: Icon }) => (
                    <div
                      key={key}
                      className="overflow-hidden rounded-2xl border border-border bg-background"
                    >
                      <div className="flex items-center gap-3 border-b border-border bg-rose-950/20 px-4 py-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-950/50 border border-rose-800/30 text-rose-200">
                          <Icon className="h-4 w-4" />
                        </div>

                        <h3 className="font-semibold text-foreground">
                          {label}
                        </h3>
                      </div>

                      <div className="p-4">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                          {(form as any)[key] || "Ainda não informado."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
