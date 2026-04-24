"use client"

import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { FileText, FlaskConical, HelpCircle, Pill, ArrowRight } from "lucide-react"

const sections = [
  {
    title: "Resumos",
    description: "Conteúdos resumidos",
    href: "/resumos",
    icon: FileText,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Casos Clínicos",
    description: "Casos práticos",
    href: "/casos-clinicos",
    icon: FlaskConical,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Questões",
    description: "Banco de questões",
    href: "/questoes",
    icon: HelpCircle,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    title: "Fármacos",
    description: "Consulta rápida",
    href: "/farmacos",
    icon: Pill,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-56 pt-14 lg:pt-0">
        <div className="max-w-3xl mx-auto px-4 py-8 lg:py-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-foreground mb-2">
              Monitoria de Farmacologia Clínica
            </h1>
            <p className="text-muted-foreground">
              Seu hub de estudos.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/40 transition-all"
              >
                <div className={`w-10 h-10 rounded-lg ${section.color} flex items-center justify-center shrink-0`}>
                  <section.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>

          {/* Welcome Box */}
          <div className="mt-8 p-5 bg-card rounded-xl border border-border">
            <h3 className="font-medium text-foreground mb-1">Bem-vindo</h3>
            <p className="text-sm text-muted-foreground">
              Navegue pelas seções para acessar os conteúdos.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
