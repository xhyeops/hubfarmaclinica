"use client"

import { Sidebar } from "@/components/sidebar"
<<<<<<< HEAD
import { ArrowLeft, Pill, Beaker, AlertCircle, CheckCircle, XCircle, Zap, Clock } from "lucide-react"
import Link from "next/link"
import { use } from "react"

=======
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit3, Save, X, Pill, Beaker, AlertCircle, CheckCircle, XCircle, Zap, Clock } from "lucide-react"
import Link from "next/link"
import { useState, use } from "react"

// Edite este objeto para adicionar informações sobre fármacos
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
const conteudos: Record<string, { 
  nome: string
  classe: string
  categoria: string
  mecanismo: string
  indicacoes: string[]
  contraindicacoes: string[]
  efeitosAdversos: string[]
  interacoes: string[]
  posologia: string
}> = {
  "losartana": {
    nome: "Losartana",
    classe: "Bloqueador do Receptor de Angiotensina II (BRA)",
    categoria: "Cardiovascular",
    mecanismo: "Bloqueia seletivamente os receptores AT1 da angiotensina II no músculo liso vascular, causando vasodilatação e redução da pressão arterial. Não inibe a ECA, portanto não causa acúmulo de bradicinina.",
    indicacoes: [
      "Hipertensão arterial sistêmica",
      "Insuficiência cardíaca (quando há intolerância a IECA)",
      "Nefropatia diabética em DM tipo 2",
      "Redução do risco de AVC em hipertensos com HVE",
    ],
    contraindicacoes: [
      "Gestação (categoria D)",
      "Estenose bilateral de artérias renais",
      "Hipercalemia (K+ > 5,5 mEq/L)",
      "Uso concomitante com alisquireno em diabéticos",
    ],
    efeitosAdversos: [
      "Hipotensão (especialmente na primeira dose)",
      "Hipercalemia",
      "Tontura",
      "Elevação de creatinina (transitória)",
<<<<<<< HEAD
      "Angioedema (raro)",
=======
      "Angioedema (raro, mas possível)",
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
    ],
    interacoes: [
      "AINEs: podem reduzir efeito anti-hipertensivo",
      "Diuréticos poupadores de K+: risco de hipercalemia",
      "Lítio: aumento dos níveis séricos",
<<<<<<< HEAD
      "IECA: não associar",
    ],
    posologia: "50-100mg/dia, dose única ou dividida.",
=======
      "IECA: não associar (sem benefício adicional)",
    ],
    posologia: "50-100mg/dia, dose única ou dividida em 2 tomadas. Iniciar com 25mg em pacientes com depleção de volume.",
  },
  "metformina": {
    nome: "Metformina",
    classe: "Biguanida",
    categoria: "Antidiabético",
    mecanismo: "Reduz a produção hepática de glicose (inibição da gliconeogênese) e aumenta a sensibilidade periférica à insulina. Não estimula secreção de insulina.",
    indicacoes: [
      "Diabetes mellitus tipo 2 (primeira linha)",
      "Pré-diabetes com alto risco",
      "Síndrome dos ovários policísticos",
    ],
    contraindicacoes: [
      "TFG < 30 mL/min/1,73m²",
      "Acidose metabólica",
      "Insuficiência hepática grave",
      "Uso de contraste iodado (suspender 48h)",
    ],
    efeitosAdversos: [
      "Náusea, vômito, diarreia",
      "Gosto metálico",
      "Deficiência de vitamina B12 (uso prolongado)",
      "Acidose láctica (raro)",
    ],
    interacoes: [
      "Álcool: aumenta risco de acidose láctica",
      "Contraste iodado: nefrotoxicidade",
      "Cimetidina: aumenta níveis de metformina",
    ],
    posologia: "500-2000mg/dia, divididos em 2-3 tomadas às refeições. Titular gradualmente.",
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
  },
}

export default function FarmacoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const data = conteudos[slug] || null
<<<<<<< HEAD
=======
  
  const [isEditing, setIsEditing] = useState(false)
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="lg:pl-64 pt-14 lg:pt-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
            <Link href="/farmacos" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Voltar
            </Link>
            <div className="text-center py-16">
              <Pill className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">Fármaco não encontrado</h2>
<<<<<<< HEAD
=======
              <p className="text-muted-foreground mt-2">Adicione este fármaco editando o arquivo de dados.</p>
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
<<<<<<< HEAD

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">

=======
      
      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          {/* Back button */}
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
          <Link 
            href="/farmacos" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para Fármacos
          </Link>

<<<<<<< HEAD
=======
          {/* Header */}
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg">
                <Pill className="h-7 w-7" />
              </div>
<<<<<<< HEAD

=======
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground">{data.nome}</h1>
                <p className="text-muted-foreground">{data.classe}</p>
              </div>
<<<<<<< HEAD
            </div>

=======
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                <Edit3 className="h-4 w-4 mr-1.5" />
                Editar
              </Button>
            </div>
            
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400">
              {data.categoria}
            </span>
          </div>

<<<<<<< HEAD
          <div className="grid gap-4">

            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
                <Beaker className="h-5 w-5 text-rose-500" />
                <h3 className="font-semibold">Mecanismo de Ação</h3>
              </div>
              <div className="p-6 text-sm">{data.mecanismo}</div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <h3>Indicações</h3>
                </div>
                <ul className="p-6 space-y-2">
                  {data.indicacoes.map((item, i) => (
                    <li key={i} className="text-sm">• {item}</li>
=======
          {/* Content Grid */}
          <div className="grid gap-4">
            {/* Mecanismo de Ação */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-gradient-to-r from-rose-500/5 to-transparent">
                <Beaker className="h-5 w-5 text-rose-500" />
                <h3 className="font-semibold text-foreground">Mecanismo de Ação</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-foreground leading-relaxed">{data.mecanismo}</p>
              </div>
            </div>

            {/* Two columns */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Indicações */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-gradient-to-r from-emerald-500/5 to-transparent">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-semibold text-foreground">Indicações</h3>
                </div>
                <ul className="p-6 space-y-2">
                  {data.indicacoes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
                  ))}
                </ul>
              </div>

<<<<<<< HEAD
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b">
                  <XCircle className="h-5 w-5 text-rose-500" />
                  <h3>Contraindicações</h3>
                </div>
                <ul className="p-6 space-y-2">
                  {data.contraindicacoes.map((item, i) => (
                    <li key={i} className="text-sm">• {item}</li>
                  ))}
                </ul>
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <h3>Efeitos Adversos</h3>
                </div>
                <ul className="p-6 space-y-2">
                  {data.efeitosAdversos.map((item, i) => (
                    <li key={i} className="text-sm">• {item}</li>
=======
              {/* Contraindicações */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-gradient-to-r from-rose-500/5 to-transparent">
                  <XCircle className="h-5 w-5 text-rose-500" />
                  <h3 className="font-semibold text-foreground">Contraindicações</h3>
                </div>
                <ul className="p-6 space-y-2">
                  {data.contraindicacoes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Two columns */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Efeitos Adversos */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-gradient-to-r from-amber-500/5 to-transparent">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <h3 className="font-semibold text-foreground">Efeitos Adversos</h3>
                </div>
                <ul className="p-6 space-y-2">
                  {data.efeitosAdversos.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
                  ))}
                </ul>
              </div>

<<<<<<< HEAD
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <h3>Interações</h3>
                </div>
                <ul className="p-6 space-y-2">
                  {data.interacoes.map((item, i) => (
                    <li key={i} className="text-sm">• {item}</li>
                  ))}
                </ul>
              </div>

            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b">
                <Clock className="h-5 w-5 text-primary" />
                <h3>Posologia</h3>
              </div>
              <div className="p-6 text-sm">{data.posologia}</div>
            </div>

=======
              {/* Interações */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-gradient-to-r from-blue-500/5 to-transparent">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold text-foreground">Interações</h3>
                </div>
                <ul className="p-6 space-y-2">
                  {data.interacoes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Posologia */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Posologia</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-foreground leading-relaxed">{data.posologia}</p>
              </div>
            </div>
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
          </div>
        </div>
      </main>
    </div>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
