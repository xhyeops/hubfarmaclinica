"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Pill } from "lucide-react"

import { Sidebar } from "@/components/sidebar"
import { AdminOnly } from "@/components/AdminOnly"
import { supabase } from "@/lib/supabase"

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

export default function NovoFarmacoPage() {
  return (
    <AdminOnly>
      <NovoFarmacoForm />
    </AdminOnly>
  )
}

function NovoFarmacoForm() {
  const router = useRouter()
  const [salvando, setSalvando] = useState(false)

  const [form, setForm] = useState({
    nome: "",
    classe: "",
    categoria: "",
    mecanismo: "",
    indicacao: "",
    contraindicacoes: "",
    efeitos_adversos: "",
    interacoes: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.nome) {
      alert("Preencha o nome do fármaco.")
      return
    }

    setSalvando(true)

    const slug = `${gerarSlug(form.nome)}-${Date.now()}`

    const { error } = await supabase.from("farmacos").insert([
      {
        ...form,
        slug,
      },
    ])

    setSalvando(false)

    if (error) {
      alert("Erro ao salvar fármaco.")
      console.error(error)
      return
    }

    router.push(`/farmacos/${slug}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          <Link
            href="/farmacos"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-rose-200 mb-8 group transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para Fármacos
          </Link>

          <section className="mb-8 rounded-[1.5rem] border border-rose-900/30 bg-gradient-to-br from-rose-950/60 via-card to-red-950/20 p-5 sm:p-6 shadow-xl shadow-rose-950/20">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-950/60 border border-rose-800/30 text-rose-200 shadow-lg shadow-rose-950/30">
                <Pill className="h-7 w-7" />
              </div>

              <div>
                <div className="mb-3 inline-flex items-center rounded-full bg-rose-950/50 border border-rose-800/30 px-3 py-1 text-xs font-medium text-rose-200">
                  Novo fármaco
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
                  Novo Fármaco
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground">
                  Cadastre mecanismo, indicações, efeitos adversos e interações.
                </p>
              </div>
            </div>
          </section>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-card p-5 sm:p-6 space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Nome
                </label>

                <input
                  name="nome"
                  placeholder="Ex: Losartana"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Classe
                </label>

                <input
                  name="classe"
                  placeholder="Ex: Bloqueador do receptor de angiotensina II"
                  value={form.classe}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Categoria
              </label>

              <input
                name="categoria"
                placeholder="Ex: Cardiovascular"
                value={form.categoria}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-rose-800"
              />
            </div>

            {[
              ["mecanismo", "Mecanismo de ação"],
              ["indicacao", "Indicações"],
              ["contraindicacoes", "Contraindicações"],
              ["efeitos_adversos", "Efeitos adversos"],
              ["interacoes", "Interações"],
            ].map(([name, label]) => (
              <div key={name}>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  {label}
                </label>

                <textarea
                  name={name}
                  placeholder={`${label}. Use uma linha para cada item quando for lista.`}
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
                {salvando ? "Salvando..." : "Salvar fármaco"}
              </button>

              <Link
                href="/farmacos"
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
