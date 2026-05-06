"use client"

import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Pill, ArrowRight, Search, Beaker, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Farmaco = {
  id: string
  nome: string
  classe: string | null
  categoria: string | null
}

export default function FarmacosPage() {
  const [busca, setBusca] = useState("")
  const [farmacos, setFarmacos] = useState<Farmaco[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregarFarmacos() {
      const { data, error } = await supabase
        .from("farmacos")
        .select("id, nome, classe, categoria")
        .order("nome", { ascending: true })

      if (error) {
        console.error("Erro ao carregar fármacos:", error)
        setLoading(false)
        return
      }

      setFarmacos(data || [])
      setLoading(false)
    }

    carregarFarmacos()
  }, [])

  const farmacosFiltrados = farmacos.filter((farmaco) =>
    farmaco.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    farmaco.classe?.toLowerCase().includes(busca.toLowerCase()) ||
    farmaco.categoria?.toLowerCase().includes(busca.toLowerCase())
  )

  function criarSlug(nome: string) {
    return nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-rose-950/50 border border-rose-800/30 text-rose-200 text-sm font-medium">
              <Pill className="h-3.5 w-3.5" />
              Consulta Rápida
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
                  Fármacos
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                  Consulte rapidamente mecanismos de ação, indicações e efeitos
                  adversos.
                </p>

                {!loading && (
                  <p className="mt-3 text-sm text-rose-200">
                    {farmacosFiltrados.length}{" "}
                    {farmacosFiltrados.length === 1
                      ? "fármaco encontrado"
                      : "fármacos encontrados"}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

            <input
              type="text"
              placeholder="Buscar fármaco, classe ou categoria..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none transition focus:border-rose-800 focus:ring-2 focus:ring-rose-950/40"
            />
          </div>

          {loading ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">Carregando fármacos...</p>
            </div>
          ) : farmacosFiltrados.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-950/50 border border-rose-800/30 text-rose-200">
                <AlertCircle className="h-8 w-8" />
              </div>

              <h3 className="text-lg font-medium text-foreground mb-1">
                Nenhum fármaco encontrado
              </h3>

              <p className="text-sm text-muted-foreground">
                Tente buscar por outro termo.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {farmacosFiltrados.map((farmaco) => (
                <Link
                  key={farmaco.id}
                  href={`/farmacos/${criarSlug(farmaco.nome)}`}
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-rose-800/40 hover:shadow-xl hover:shadow-rose-950/20"
                >
                  <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full bg-rose-800/0 transition group-hover:bg-rose-700" />

                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-950/50 border border-rose-800/30 text-rose-200 shadow-lg shadow-rose-950/20 transition group-hover:scale-110 group-hover:bg-rose-900/40 mb-4">
                    <Beaker className="h-6 w-6" />
                  </div>

                  <div className="space-y-2 pr-8">
                    <h2 className="text-lg font-semibold text-foreground group-hover:text-rose-200 transition-colors">
                      {farmaco.nome}
                    </h2>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {farmaco.classe || "Classe não informada"}
                    </p>

                    {farmaco.categoria && (
                      <span className="inline-flex items-center rounded-full bg-rose-950/40 border border-rose-800/30 px-2.5 py-0.5 text-xs font-medium text-rose-200">
                        {farmaco.categoria}
                      </span>
                    )}
                  </div>

                  <ArrowRight className="absolute top-5 right-5 h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-rose-200" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
