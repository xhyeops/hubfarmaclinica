"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  FileText,
  Video,
  Link2,
  Download,
  ExternalLink,
  Presentation,
  FileImage,
} from "lucide-react"
import Link from "next/link"

const materials = [
  {
    id: "1",
    title: "Tabela de Antibióticos",
    type: "PDF",
    description: "Tabela resumida com classes de antibióticos, espectro e doses",
    icon: FileText,
    category: "Antimicrobianos",
  },
  {
    id: "2",
    title: "Fluxograma de Anti-hipertensivos",
    type: "Imagem",
    description: "Algoritmo de escolha do anti-hipertensivo baseado em comorbidades",
    icon: FileImage,
    category: "Cardiovascular",
  },
  {
    id: "3",
    title: "Videoaula: Farmacocinética",
    type: "Vídeo",
    description: "Explicação detalhada sobre ADME e parâmetros farmacocinéticos",
    icon: Video,
    category: "Fundamentos",
  },
  {
    id: "4",
    title: "Slides: Interações Medicamentosas",
    type: "Apresentação",
    description: "Material da aula sobre principais interações na prática clínica",
    icon: Presentation,
    category: "Clínica",
  },
  {
    id: "5",
    title: "Guia Rápido: Analgésicos",
    type: "PDF",
    description: "Escada analgésica da OMS e posologias comuns",
    icon: FileText,
    category: "Analgesia",
  },
  {
    id: "6",
    title: "Links Úteis",
    type: "Links",
    description: "Sites de referência em farmacologia clínica",
    icon: Link2,
    category: "Referências",
  },
]

const typeIcons: Record<string, React.ElementType> = {
  PDF: FileText,
  Imagem: FileImage,
  Vídeo: Video,
  Apresentação: Presentation,
  Links: Link2,
}

const typeColors: Record<string, string> = {
  PDF: "bg-red-500/10 text-red-600 dark:text-red-400",
  Imagem: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Vídeo: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  Apresentação: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  Links: "bg-green-500/10 text-green-600 dark:text-green-400",
}

export default function MateriaisPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-72">
        <div className="px-4 py-6 lg:px-8 lg:py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
              Materiais de Apoio
            </h1>
            <p className="mt-2 text-muted-foreground">
              PDFs, vídeos, slides e outros materiais complementares
            </p>
          </div>

          {/* Filter by type */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["Todos", "PDF", "Imagem", "Vídeo", "Apresentação", "Links"].map((type) => (
              <Badge key={type} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                {type}
              </Badge>
            ))}
          </div>

          {/* Materials Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((material) => {
              const Icon = material.icon
              
              return (
                <Card key={material.id} className="border-0 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge className={typeColors[material.type]}>
                        {material.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold mt-3">
                      {material.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {material.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{material.category}</Badge>
                      <div className="flex gap-2">
                        {material.type === "Links" ? (
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Upload Section */}
          <Card className="mt-8 border-2 border-dashed border-border">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Adicionar Material</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Arraste arquivos ou clique para fazer upload
              </p>
              <Button variant="secondary">
                Selecionar Arquivo
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
