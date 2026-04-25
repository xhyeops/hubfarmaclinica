"use client"

import { Sidebar } from "@/components/sidebar"
import { ArrowLeft, FileText, Clock, BookOpen } from "lucide-react"
import Link from "next/link"
import { use } from "react"

const conteudos: Record<string, { title: string; categoria: string; tempo: string; content: string }> = {
  "anti-hipertensivos": {
    title: "Anti-hipertensivos",
    categoria: "Cardiovascular",
    tempo: "15 min",
    content: `## Classes de Anti-hipertensivos

### 1. Inibidores da ECA (IECA)
- Exemplos: Captopril, Enalapril, Lisinopril
- Mecanismo: Inibem a conversão de angiotensina I em angiotensina II
- Indicações: HAS, IC, pós-IAM, nefropatia diabética
- Efeitos adversos: Tosse seca, angioedema, hipercalemia

### 2. Bloqueadores do Receptor de Angiotensina II (BRA)
- Exemplos: Losartana, Valsartana, Candesartana
- Mecanismo: Bloqueiam receptores AT1 da angiotensina II
- Indicações: HAS, IC, alternativa aos IECA
- Vantagem: Não causam tosse

### 3. Bloqueadores dos Canais de Cálcio
- Di-hidropiridínicos: Anlodipino, Nifedipino
- Não di-hidropiridínicos: Verapamil, Diltiazem
- Mecanismo: Bloqueiam canais de cálcio tipo L

### 4. Diuréticos
- Tiazídicos: Hidroclorotiazida (primeira linha)
- De alça: Furosemida
- Poupadores de potássio: Espironolactona

### 5. Beta-bloqueadores
- Exemplos: Atenolol, Metoprolol, Carvedilol
- Indicações: HAS + IC, arritmias, pós-IAM`,
  },
  "antibioticos": {
    title: "Antibióticos",
    categoria: "Infectologia",
    tempo: "20 min",
    content: `## Principais Classes de Antibióticos

### Beta-lactâmicos
- Penicilinas, Cefalosporinas, Carbapenêmicos
- Mecanismo: Inibição da síntese da parede celular

### Macrolídeos
- Azitromicina, Claritromicina, Eritromicina
- Mecanismo: Inibição da síntese proteica (50S)

### Fluoroquinolonas
- Ciprofloxacino, Levofloxacino
- Mecanismo: Inibição da DNA girase`,
  },
  "analgesicos": {
    title: "Analgésicos e Anti-inflamatórios",
    categoria: "Dor",
    tempo: "12 min",
    content: `## Analgésicos e Anti-inflamatórios

### AINEs
- Inibidores não seletivos da COX
- Exemplos: Ibuprofeno, Naproxeno, Diclofenaco

### Inibidores seletivos da COX-2
- Celecoxibe, Etoricoxibe
- Menor risco gastrointestinal

### Opioides
- Fracos: Tramadol, Codeína
- Fortes: Morfina, Fentanil, Oxicodona`,
  },
}

export default function ResumoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  const data = conteudos[slug] || {
    title: "Novo Resumo",
    categoria: "Geral",
    tempo: "5 min",
    content: "Conteúdo ainda não cadastrado.",
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          <Link
            href="/resumos"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para Resumos
          </Link>

          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <FileText className="h-6 w-6" />
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">{data.title}</h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <BookOpen className="h-3 w-3" />
                {data.categoria}
              </span>

              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {data.tempo} de leitura
              </span>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-6 sm:p-8 prose prose-sm dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {data.content}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}