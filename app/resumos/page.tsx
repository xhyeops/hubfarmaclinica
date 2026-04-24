"use client"

import { Sidebar } from "@/components/sidebar"
import { ContentCard } from "@/components/content-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Search } from "lucide-react"
import { useState } from "react"

const resumos = [
  {
    id: "farmacocinetica",
    title: "Farmacocinética: Absorção, Distribuição, Metabolismo e Excreção",
    category: "Farmacocinética",
    description: "Conceitos fundamentais sobre o caminho do fármaco no organismo.",
  },
  {
    id: "farmacodinamica",
    title: "Farmacodinâmica: Receptores e Mecanismos de Ação",
    category: "Farmacodinâmica",
    description: "Como os fármacos interagem com seus alvos moleculares.",
  },
  {
    id: "anti-hipertensivos",
    title: "Anti-hipertensivos: Classes e Indicações",
    category: "Cardiovascular",
    description: "Revisão completa das classes de anti-hipertensivos e seus usos clínicos.",
  },
  {
    id: "antibioticos-betalactamicos",
    title: "Antibióticos Beta-lactâmicos",
    category: "Antimicrobianos",
    description: "Penicilinas, cefalosporinas e carbapenêmicos em detalhes.",
  },
  {
    id: "analgesicos",
    title: "Analgésicos: Opioides e Não Opioides",
    category: "Analgesia",
    description: "Farmacologia da dor e principais classes de analgésicos.",
  },
  {
    id: "anticoagulantes",
    title: "Anticoagulantes e Antiagregantes",
    category: "Hematologia",
    description: "Mecanismos de ação e indicações dos antitrombóticos.",
  },
]

const categories = ["Todos", "Farmacocinética", "Farmacodinâmica", "Cardiovascular", "Antimicrobianos", "Analgesia", "Hematologia"]

export default function ResumosPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredResumos = resumos.filter((resumo) => {
    const matchesSearch = resumo.title.toLowerCase().includes(search.toLowerCase()) ||
      resumo.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || resumo.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-72">
        <div className="px-4 py-6 lg:px-8 lg:py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
              Resumos
            </h1>
            <p className="mt-2 text-muted-foreground">
              Resumos organizados por temas para facilitar seu estudo
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar resumos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className="cursor-pointer transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResumos.map((resumo, index) => (
              <ContentCard
                key={resumo.id}
                title={resumo.title}
                description={resumo.description}
                category={resumo.category}
                href={`/resumos/${resumo.id}`}
                color={index % 3 === 0 ? "primary" : index % 3 === 1 ? "accent" : "secondary"}
                icon={<FileText className="h-12 w-12" />}
              />
            ))}
          </div>

          {filteredResumos.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nenhum resumo encontrado.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
