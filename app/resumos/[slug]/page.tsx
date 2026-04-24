"use client"

import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit3, Save, X, FileText, Clock, BookOpen } from "lucide-react"
import Link from "next/link"
import { useState, use } from "react"

// Edite este objeto para adicionar conteúdo aos seus resumos
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
- Mecanismo: Inibição da DNA girase

Adicione mais conteúdo conforme necessário.`,
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
- Fortes: Morfina, Fentanil, Oxicodona

Edite para adicionar mais informações.`,
  },
}

export default function ResumoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const data = conteudos[slug] || { 
    title: "Novo Resumo", 
    categoria: "Geral",
    tempo: "5 min",
    content: "Clique em Editar para adicionar conteúdo a este resumo." 
  }
  
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(data.title)
  const [content, setContent] = useState(data.content)

  const handleSave = () => {
    setIsEditing(false)
    // Aqui você pode integrar com um banco de dados
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          {/* Back button */}
          <Link 
            href="/resumos" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para Resumos
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-2xl font-bold bg-transparent border-b-2 border-primary outline-none pb-1"
                    placeholder="Título do resumo"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                )}
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
              
              <div className="ml-auto flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4 mr-1.5" />
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={handleSave} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
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

          {/* Content */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {isEditing ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[500px] bg-transparent p-6 sm:p-8 text-sm leading-relaxed resize-none outline-none font-mono"
                placeholder="Digite seu conteúdo aqui... Você pode usar Markdown para formatação."
              />
            ) : (
              <div className="p-6 sm:p-8 prose prose-sm dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {content || "Nenhum conteúdo ainda. Clique em Editar para adicionar."}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
