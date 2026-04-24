"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Edit3,
  Save,
  X,
  ImagePlus,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useState, use } from "react"

// Example content - in production this would come from a database
const getInitialContent = (slug: string) => {
  const contents: Record<string, { title: string; category: string; content: string }> = {
    "farmacocinetica": {
      title: "Farmacocinética: Absorção, Distribuição, Metabolismo e Excreção",
      category: "Farmacocinética",
      content: `# Farmacocinética

A farmacocinética estuda o caminho do fármaco no organismo, incluindo os processos de **Absorção**, **Distribuição**, **Metabolismo** e **Excreção** (ADME).

## Absorção

A absorção é o processo pelo qual o fármaco passa do local de administração para a circulação sistêmica.

### Fatores que influenciam a absorção:
- Lipossolubilidade do fármaco
- pH do meio e pKa do fármaco
- Área de superfície de absorção
- Fluxo sanguíneo local
- Forma farmacêutica

## Distribuição

Após a absorção, o fármaco se distribui pelos tecidos através da circulação sanguínea.

### Volume de Distribuição (Vd)
O Vd relaciona a quantidade total de fármaco no corpo com sua concentração plasmática.

**Fórmula:** Vd = Dose / Concentração plasmática

## Metabolismo

O metabolismo (biotransformação) ocorre principalmente no fígado através de reações de:
- **Fase I:** Oxidação, redução, hidrólise (CYP450)
- **Fase II:** Conjugação (glucuronidação, sulfatação)

## Excreção

A excreção elimina o fármaco e seus metabólitos do organismo.

### Principais vias:
- Renal (principal)
- Biliar
- Pulmonar
- Outras (suor, leite materno)

### Clearance (Cl)
Taxa de depuração do fármaco do plasma por unidade de tempo.

**Fórmula:** Cl = (0.693 × Vd) / t½`,
    },
    "default": {
      title: "Conteúdo do Resumo",
      category: "Geral",
      content: `# Título do Resumo

Este é um exemplo de conteúdo editável. Clique em "Editar" para modificar este texto.

## Seção 1

Adicione seu conteúdo aqui...

## Seção 2

Continue adicionando informações relevantes...

### Pontos importantes:
- Item 1
- Item 2
- Item 3`,
    },
  }
  
  return contents[slug] || contents["default"]
}

export default function ResumoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const initialContent = getInitialContent(slug)
  
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialContent.title)
  const [content, setContent] = useState(initialContent.content)
  const [category, setCategory] = useState(initialContent.category)

  const handleSave = () => {
    // In production, save to database
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTitle(initialContent.title)
    setContent(initialContent.content)
    setCategory(initialContent.category)
    setIsEditing(false)
  }

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold mt-6 mb-4 text-foreground">{line.slice(2)}</h1>
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold mt-5 mb-3 text-foreground">{line.slice(3)}</h2>
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-medium mt-4 mb-2 text-foreground">{line.slice(4)}</h3>
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-4 text-muted-foreground">{line.slice(2)}</li>
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-semibold text-foreground my-2">{line.slice(2, -2)}</p>
      }
      if (line.trim() === '') {
        return <br key={index} />
      }
      // Handle inline bold
      const parts = line.split(/(\*\*.*?\*\*)/g)
      return (
        <p key={index} className="text-muted-foreground my-2">
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="text-foreground">{part.slice(2, -2)}</strong>
            }
            return part
          })}
        </p>
      )
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-72">
        <div className="px-4 py-6 lg:px-8 lg:py-8">
          {/* Back button */}
          <Link href="/resumos" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Resumos
          </Link>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-xl font-bold"
                        placeholder="Título do resumo"
                      />
                      <Input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-48"
                        placeholder="Categoria"
                      />
                    </div>
                  ) : (
                    <>
                      <Badge variant="secondary" className="mb-2">{category}</Badge>
                      <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleCancel} variant="ghost" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                      <Button onClick={handleSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} variant="secondary" size="sm">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[500px] font-mono text-sm"
                    placeholder="Conteúdo em formato markdown..."
                  />
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      <ImagePlus className="h-4 w-4 mr-2" />
                      Adicionar Imagem
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {renderContent(content)}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
