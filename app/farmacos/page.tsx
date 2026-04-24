"use client"

import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Pill } from "lucide-react"

// Edite esta lista para adicionar seus fármacos
const farmacos = [
  {
    id: "exemplo-1",
    title: "Nome do Fármaco",
    description: "Classe farmacológica.",
  },
]

export default function FarmacosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-56 pt-14 lg:pt-0">
        <div className="max-w-3xl mx-auto px-4 py-8 lg:py-12">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Fármacos
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Consulta rápida de medicamentos.
            </p>
          </div>

          <div className="space-y-3">
            {farmacos.map((item) => (
              <Link
                key={item.id}
                href={`/farmacos/${item.id}`}
                className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/40 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                  <Pill className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-medium text-foreground">{item.title}</h2>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </Link>
            ))}

            {farmacos.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Pill className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p>Nenhum fármaco cadastrado.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
