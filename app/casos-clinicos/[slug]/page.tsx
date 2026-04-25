"use client"

import { Sidebar } from "@/components/sidebar"
import { ArrowLeft, Stethoscope, User, Activity, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { use } from "react"

const conteudos: Record<string, {
  title: string
  dificuldade: string
  sistema: string
  paciente: string
  queixa: string
  historia: string
  exame: string
  conduta: string
  discussao: string
}> = {
  "hipertensao-resistente": {
    title: "Hipertensão Arterial Resistente",
    dificuldade: "Intermediário",
    sistema: "Cardiovascular",
    paciente: "Homem, 58 anos, obeso (IMC 32), tabagista, sedentário",
    queixa: "Cefaleia occipital matinal há 3 meses",
    historia: `PA em consultório: 168x102 mmHg (média de 3 aferições)
MAPA 24h: Média 156x98 mmHg, sem descenso noturno

Medicações em uso:
- Losartana 100mg/dia
- Anlodipino 10mg/dia
- Hidroclorotiazida 25mg/dia

Refere adesão adequada às medicações. Nega consumo excessivo de sal.`,
    exame: `Peso: 98kg | Altura: 1,75m | PA: 164x100 mmHg | FC: 78 bpm
Ausculta cardíaca: RCR 2T, B4 presente
Fundoscopia: Cruzamento arteriovenoso patológico (grau II)
Sem sopros abdominais ou em carótidas`,
    conduta: `1. Solicitar exames para causas secundárias
2. Adicionar espironolactona 25mg/dia
3. Orientar redução de peso e atividade física
4. Retorno em 4 semanas com MAPA controle`,
    discussao: `## Discussão Farmacológica

### Por que adicionar Espironolactona?
- Estudos mostram eficácia superior em HAS resistente
- Antagonismo da aldosterona
- Efeito sinérgico com tiazídicos

### Mecanismo de Ação
A espironolactona bloqueia competitivamente os receptores de aldosterona no túbulo coletor, reduzindo reabsorção de sódio e secreção de potássio.

### Monitorização
- Potássio sérico em 1 semana
- Função renal
- Atenção para ginecomastia`,
  },
}

const dificuldadeColors: Record<string, string> = {
  "Básico": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Intermediário": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Avançado": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
}

export default function CasoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  const data = conteudos[slug] || {
    title: "Novo Caso Clínico",
    dificuldade: "Básico",
    sistema: "Geral",
    paciente: "Paciente ainda não cadastrado.",
    queixa: "Queixa principal ainda não cadastrada.",
    historia: "História clínica ainda não cadastrada.",
    exame: "Exame físico ainda não cadastrado.",
    conduta: "Conduta ainda não cadastrada.",
    discussao: "Discussão farmacológica ainda não cadastrada.",
  }

  const sections = [
    { key: "paciente", label: "Paciente", icon: User },
    { key: "queixa", label: "Queixa Principal", icon: AlertTriangle },
    { key: "historia", label: "História Clínica", icon: Activity },
    { key: "exame", label: "Exame Físico", icon: Stethoscope },
    { key: "conduta", label: "Conduta", icon: Activity },
    { key: "discussao", label: "Discussão Farmacológica", icon: Stethoscope },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          <Link
            href="/casos-clinicos"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para Casos Clínicos
          </Link>

          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                <Stethoscope className="h-6 w-6" />
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">{data.title}</h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  dificuldadeColors[data.dificuldade] || "bg-secondary text-secondary-foreground"
                }`}
              >
                {data.dificuldade}
              </span>

              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                {data.sistema}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {sections.map(({ key, label, icon: Icon }) => (
              <div key={key} className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/30">
                  <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-semibold text-foreground">{label}</h3>
                </div>

                <div className="p-6">
                  <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {data[key as keyof typeof data]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}