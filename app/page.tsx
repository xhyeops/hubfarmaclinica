"use client"

import { Sidebar } from "@/components/sidebar"
import { StatsCard } from "@/components/stats-card"
import { ContentCard } from "@/components/content-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Stethoscope,
  HelpCircle,
  BookOpen,
  TrendingUp,
  Clock,
  Pill,
  FlaskConical,
} from "lucide-react"

const recentContent = [
  {
    title: "Farmacocinética: Absorção e Distribuição",
    category: "Resumo",
    href: "/resumos/farmacocinetica-absorcao",
    color: "primary" as const,
  },
  {
    title: "Caso: Intoxicação por Paracetamol",
    category: "Caso Clínico",
    href: "/casos-clinicos/intoxicacao-paracetamol",
    color: "accent" as const,
  },
  {
    title: "Anti-hipertensivos: Mecanismos de Ação",
    category: "Resumo",
    href: "/resumos/anti-hipertensivos",
    color: "primary" as const,
  },
  {
    title: "Interações com Varfarina",
    category: "Interações",
    href: "/interacoes/varfarina",
    color: "secondary" as const,
  },
]

const upcomingTopics = [
  "Antibióticos Beta-lactâmicos",
  "Farmacologia do SNC",
  "Analgésicos Opioides",
  "Antidiabéticos Orais",
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-72">
        <div className="px-4 py-6 lg:px-8 lg:py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
              Bem-vindo à Monitoria de Farmacologia Clínica
            </h1>
            <p className="mt-2 text-muted-foreground">
              Seu hub de estudos completo para dominar farmacologia clínica
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Resumos"
              value="24"
              icon={<FileText className="h-6 w-6" />}
              trend="+3 esta semana"
            />
            <StatsCard
              title="Casos Clínicos"
              value="12"
              icon={<Stethoscope className="h-6 w-6" />}
              trend="+2 esta semana"
            />
            <StatsCard
              title="Questões"
              value="150"
              icon={<HelpCircle className="h-6 w-6" />}
              trend="+15 esta semana"
            />
            <StatsCard
              title="Materiais"
              value="8"
              icon={<BookOpen className="h-6 w-6" />}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Content */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Conteúdo Recente
                  </CardTitle>
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {recentContent.map((item) => (
                      <ContentCard
                        key={item.href}
                        title={item.title}
                        category={item.category}
                        href={item.href}
                        color={item.color}
                        icon={
                          item.category === "Resumo" ? (
                            <FileText className="h-12 w-12" />
                          ) : item.category === "Caso Clínico" ? (
                            <Stethoscope className="h-12 w-12" />
                          ) : (
                            <Pill className="h-12 w-12" />
                          )
                        }
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Upcoming Topics */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Próximos Temas
                  </CardTitle>
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {upcomingTopics.map((topic, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {index + 1}
                        </span>
                        <span className="text-foreground">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Quick Access */}
              <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/10 to-accent/10">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-primary" />
                    Dica de Estudo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Comece pelos mecanismos de ação dos fármacos antes de
                    estudar as indicações clínicas. Isso facilita a compreensão
                    das interações e efeitos adversos.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">Farmacodinâmica</Badge>
                    <Badge variant="secondary">Receptores</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
