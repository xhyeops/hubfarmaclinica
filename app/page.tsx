"use client"

import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { FileText, FlaskConical, HelpCircle, Pill, ArrowRight, Sparkles } from "lucide-react"

const sections = [
  {
    title: "Resumos",
    description: "Conteúdos resumidos e organizados para facilitar seu estudo",
    href: "/resumos",
    icon: FileText,
    gradient: "from-blue-500 to-indigo-600",
    bgGlow: "bg-blue-500/20",
    count: "12 tópicos",
  },
  {
    title: "Casos Clínicos",
    description: "Aprenda com situações reais e desenvolva raciocínio clínico",
    href: "/casos-clinicos",
    icon: FlaskConical,
    gradient: "from-emerald-500 to-teal-600",
    bgGlow: "bg-emerald-500/20",
    count: "8 casos",
  },
  {
    title: "Questões",
    description: "Teste seus conhecimentos com questões comentadas",
    href: "/questoes",
    icon: HelpCircle,
    gradient: "from-amber-500 to-orange-600",
    bgGlow: "bg-amber-500/20",
    count: "50+ questões",
  },
  {
    title: "Fármacos",
    description: "Consulta rápida de mecanismos, indicações e efeitos",
    href: "/farmacos",
    icon: Pill,
    gradient: "from-rose-500 to-pink-600",
    bgGlow: "bg-rose-500/20",
    count: "30+ fármacos",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-16">
          {/* Hero Section */}
          <div className="relative mb-12 lg:mb-16">
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Hub de Estudos</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
                Monitoria de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Farmacologia Clínica
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
                Tudo o que você precisa para dominar a farmacologia clínica em um só lugar. 
                Resumos, casos clínicos, questões e muito mais.
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-12">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30"
              >
                {/* Background glow on hover */}
                <div className={`absolute inset-0 ${section.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`} />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${section.gradient} text-white mb-4 shadow-lg`}>
                    <section.icon className="h-6 w-6" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {section.title}
                      </h2>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {section.description}
                    </p>
                    
                    <div className="pt-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                        {section.count}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Resumos", value: "12" },
              { label: "Casos", value: "8" },
              { label: "Questões", value: "50+" },
              { label: "Fármacos", value: "30+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-card border border-border">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
