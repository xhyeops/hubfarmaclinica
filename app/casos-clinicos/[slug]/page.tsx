"use client"

import { Sidebar } from "@/components/sidebar"
<<<<<<< HEAD
import { ArrowLeft, Stethoscope, User, Activity, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { use } from "react"

const conteudos: Record<string, {
=======
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit3, Save, X, Stethoscope, User, Activity, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useState, use } from "react"

// Edite este objeto para adicionar seus casos clínicos
const conteudos: Record<string, { 
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
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
<<<<<<< HEAD
- Anlodipino 10mg/dia
=======
- Anlodipino 10mg/dia  
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
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
<<<<<<< HEAD
- Antagonismo da aldosterona
=======
- Antagonismo da aldosterona (hiperaldosteronismo primário é causa comum)
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
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
<<<<<<< HEAD

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
=======
  const data = conteudos[slug] || { 
    title: "Novo Caso Clínico", 
    dificuldade: "Básico",
    sistema: "Geral",
    paciente: "Descreva o paciente",
    queixa: "Queixa principal",
    historia: "História clínica",
    exame: "Exame físico",
    conduta: "Conduta proposta",
    discussao: "Discussão farmacológica",
  }
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(data)

  const handleSave = () => {
    setIsEditing(false)
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
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
<<<<<<< HEAD

      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          <Link
            href="/casos-clinicos"
=======
      
      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          {/* Back button */}
          <Link 
            href="/casos-clinicos" 
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para Casos Clínicos
          </Link>

<<<<<<< HEAD
=======
          {/* Header */}
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                <Stethoscope className="h-6 w-6" />
              </div>
<<<<<<< HEAD

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

=======
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full text-2xl font-bold bg-transparent border-b-2 border-primary outline-none pb-1"
                    placeholder="Título do caso"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-foreground">{formData.title}</h1>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${dificuldadeColors[data.dificuldade] || "bg-secondary text-secondary-foreground"}`}>
                {data.dificuldade}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                {data.sistema}
              </span>
              
              <div className="ml-auto flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4 mr-1.5" />
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={handleSave} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                      <Save className="h-4 w-4 mr-1.5" />
                      Salvar
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit3 className="h-4 w-4 mr-1.5" />
                    Editar
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Content Sections */}
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
          <div className="space-y-4">
            {sections.map(({ key, label, icon: Icon }) => (
              <div key={key} className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/30">
                  <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-semibold text-foreground">{label}</h3>
                </div>
<<<<<<< HEAD

                <div className="p-6">
                  <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {data[key as keyof typeof data]}
                  </div>
=======
                <div className="p-6">
                  {isEditing ? (
                    <textarea
                      value={formData[key as keyof typeof formData]}
                      onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                      className="w-full min-h-[120px] bg-transparent text-sm leading-relaxed resize-none outline-none"
                      placeholder={`Digite ${label.toLowerCase()}...`}
                    />
                  ) : (
                    <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                      {formData[key as keyof typeof formData] || "Clique em Editar para adicionar."}
                    </div>
                  )}
>>>>>>> ac622d52a70bda35f3ae349e2fb5924f53058dc0
                </div>
              </div>
            ))}
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
