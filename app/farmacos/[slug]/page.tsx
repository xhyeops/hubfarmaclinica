"use client"

import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit3, Save, X } from "lucide-react"
import Link from "next/link"
import { useState, use } from "react"

// Edite este objeto para adicionar informações sobre fármacos
const conteudos: Record<string, { title: string; content: string }> = {
  "exemplo-1": {
    title: "Nome do Fármaco",
    content: `Classe: 

Mecanismo de ação:

Indicações:

Contraindicações:

Efeitos adversos:

Interações:

Posologia:`,
  },
}

export default function FarmacoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const data = conteudos[slug] || { title: "Fármaco não encontrado", content: "" }
  
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(data.title)
  const [content, setContent] = useState(data.content)

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-56 pt-14 lg:pt-0">
        <div className="max-w-3xl mx-auto px-4 py-8 lg:py-12">
          <Link 
            href="/farmacos" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Voltar
          </Link>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-start justify-between gap-4 mb-6">
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 text-xl font-semibold bg-transparent border-b border-border focus:border-primary outline-none pb-1"
                />
              ) : (
                <h1 className="text-xl font-semibold text-foreground">{title}</h1>
              )}
              
              <div className="flex gap-2 shrink-0">
                {isEditing ? (
                  <>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-1.5" />
                      Salvar
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit3 className="h-4 w-4 mr-1.5" />
                    Editar
                  </Button>
                )}
              </div>
            </div>

            {isEditing ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[400px] bg-muted/50 rounded-lg p-4 text-sm leading-relaxed resize-none outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Digite informações sobre o fármaco..."
              />
            ) : (
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {content || "Nenhum conteúdo ainda. Clique em Editar para adicionar."}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
