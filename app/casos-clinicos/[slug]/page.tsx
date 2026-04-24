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
  Stethoscope,
  Clock,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { useState, use } from "react"

const getInitialCase = (slug: string) => {
  const cases: Record<string, {
    title: string
    difficulty: string
    duration: string
    tags: string[]
    presentation: string
    questions: { question: string; options: string[]; correct: number; explanation: string }[]
  }> = {
    "intoxicacao-paracetamol": {
      title: "Intoxicação por Paracetamol",
      difficulty: "Intermediário",
      duration: "20 min",
      tags: ["Toxicologia", "Hepatologia", "Emergência"],
      presentation: `## Apresentação do Caso

Paciente feminina, 22 anos, é trazida ao pronto-socorro pela família 4 horas após ingestão intencional de aproximadamente 30 comprimidos de paracetamol 750mg (total estimado: 22,5g).

### Dados Clínicos:
- **Peso:** 60 kg
- **PA:** 120/80 mmHg
- **FC:** 88 bpm
- **Temperatura:** 36,5°C
- **SpO2:** 98% em ar ambiente

### Exame Físico:
- Paciente consciente, orientada, pouco colaborativa
- Abdome sem alterações significativas
- Sem sinais de insuficiência hepática aguda

### Exames Laboratoriais Iniciais:
- AST: 45 U/L (VR: até 32)
- ALT: 52 U/L (VR: até 31)
- INR: 1,0
- Bilirrubinas normais
- Creatinina: 0,9 mg/dL`,
      questions: [
        {
          question: "Qual a dose de paracetamol considerada potencialmente hepatotóxica?",
          options: [
            "≥ 75 mg/kg ou 4g em dose única",
            "≥ 150 mg/kg ou 7,5g em dose única",
            "≥ 100 mg/kg ou 6g em dose única",
            "≥ 200 mg/kg ou 10g em dose única",
          ],
          correct: 1,
          explanation: "A dose potencialmente hepatotóxica é ≥ 150 mg/kg ou 7,5g em dose única. Nesta paciente (22,5g / 60kg = 375 mg/kg), a dose ingerida é significativamente hepatotóxica.",
        },
        {
          question: "Qual é o antídoto indicado para intoxicação por paracetamol?",
          options: [
            "Flumazenil",
            "Naloxona",
            "N-acetilcisteína (NAC)",
            "Atropina",
          ],
          correct: 2,
          explanation: "A N-acetilcisteína (NAC) é o antídoto específico para intoxicação por paracetamol. Ela age como precursora da glutationa, ajudando a neutralizar o metabólito tóxico NAPQI.",
        },
        {
          question: "Qual o mecanismo de hepatotoxicidade do paracetamol?",
          options: [
            "Inibição da síntese proteica hepática",
            "Acúmulo de NAPQI e depleção de glutationa",
            "Colestase intra-hepática",
            "Esteatose hepática aguda",
          ],
          correct: 1,
          explanation: "O paracetamol é metabolizado pelo CYP2E1 em NAPQI (N-acetil-p-benzoquinona imina), um metabólito altamente reativo. Em doses terapêuticas, o NAPQI é conjugado com glutationa. Em overdose, a glutationa se esgota e o NAPQI causa necrose hepatocelular.",
        },
      ],
    },
    "default": {
      title: "Caso Clínico",
      difficulty: "Intermediário",
      duration: "15 min",
      tags: ["Clínica Médica"],
      presentation: `## Apresentação do Caso

Descreva a apresentação clínica do paciente aqui...

### Dados Clínicos:
- Informações relevantes

### Exame Físico:
- Achados do exame

### Exames Laboratoriais:
- Resultados`,
      questions: [
        {
          question: "Pergunta de exemplo?",
          options: ["Opção A", "Opção B", "Opção C", "Opção D"],
          correct: 0,
          explanation: "Explicação da resposta correta.",
        },
      ],
    },
  }
  
  return cases[slug] || cases["default"]
}

export default function CasoClinicoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const initialCase = getInitialCase(slug)
  
  const [isEditing, setIsEditing] = useState(false)
  const [caseData, setCaseData] = useState(initialCase)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [showQuestions, setShowQuestions] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index)
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < caseData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const difficultyColors: Record<string, string> = {
    "Básico": "bg-green-500/10 text-green-600 dark:text-green-400",
    "Intermediário": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    "Avançado": "bg-red-500/10 text-red-600 dark:text-red-400",
  }

  const renderContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold mt-5 mb-3 text-foreground">{line.slice(3)}</h2>
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-medium mt-4 mb-2 text-foreground">{line.slice(4)}</h3>
      }
      if (line.startsWith('- ')) {
        const parts = line.slice(2).split(/(\*\*.*?\*\*)/g)
        return (
          <li key={index} className="ml-4 text-muted-foreground">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-foreground">{part.slice(2, -2)}</strong>
              }
              return part
            })}
          </li>
        )
      }
      if (line.trim() === '') return <br key={index} />
      return <p key={index} className="text-muted-foreground my-2">{line}</p>
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-72">
        <div className="px-4 py-6 lg:px-8 lg:py-8">
          <Link href="/casos-clinicos" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Casos Clínicos
          </Link>

          {/* Case Header */}
          <Card className="border-0 shadow-sm mb-6">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <div>
                    {isEditing ? (
                      <Input
                        value={caseData.title}
                        onChange={(e) => setCaseData({ ...caseData, title: e.target.value })}
                        className="text-xl font-bold mb-2"
                      />
                    ) : (
                      <CardTitle className="text-2xl font-bold">{caseData.title}</CardTitle>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge className={difficultyColors[caseData.difficulty]}>
                        {caseData.difficulty}
                      </Badge>
                      <span className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {caseData.duration}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {caseData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={() => setIsEditing(false)} variant="ghost" size="sm">
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
          </Card>

          {/* Case Presentation */}
          <Card className="border-0 shadow-sm mb-6">
            <CardContent className="pt-6">
              {isEditing ? (
                <Textarea
                  value={caseData.presentation}
                  onChange={(e) => setCaseData({ ...caseData, presentation: e.target.value })}
                  className="min-h-[300px] font-mono text-sm"
                />
              ) : (
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {renderContent(caseData.presentation)}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Questions Section */}
          {!showQuestions ? (
            <Button onClick={() => setShowQuestions(true)} className="w-full">
              Iniciar Questões
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Questão {currentQuestion + 1} de {caseData.questions.length}</CardTitle>
                  <Badge variant="secondary">{Math.round(((currentQuestion + 1) / caseData.questions.length) * 100)}%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium mb-6">{caseData.questions[currentQuestion].question}</p>
                
                <div className="space-y-3">
                  {caseData.questions[currentQuestion].options.map((option, index) => {
                    const isCorrect = index === caseData.questions[currentQuestion].correct
                    const isSelected = selectedAnswer === index
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showExplanation}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          showExplanation
                            ? isCorrect
                              ? "border-green-500 bg-green-500/10"
                              : isSelected
                              ? "border-red-500 bg-red-500/10"
                              : "border-border"
                            : isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-medium">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span>{option}</span>
                          {showExplanation && isCorrect && (
                            <CheckCircle2 className="h-5 w-5 text-green-500 ml-auto" />
                          )}
                          {showExplanation && isSelected && !isCorrect && (
                            <AlertTriangle className="h-5 w-5 text-red-500 ml-auto" />
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {showExplanation && (
                  <div className="mt-6 p-4 rounded-lg bg-secondary">
                    <h4 className="font-semibold mb-2">Explicação:</h4>
                    <p className="text-muted-foreground">{caseData.questions[currentQuestion].explanation}</p>
                  </div>
                )}

                {showExplanation && currentQuestion < caseData.questions.length - 1 && (
                  <Button onClick={handleNextQuestion} className="w-full mt-6">
                    Próxima Questão
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}

                {showExplanation && currentQuestion === caseData.questions.length - 1 && (
                  <div className="mt-6 text-center">
                    <p className="text-lg font-semibold text-accent mb-4">Parabéns! Você completou o caso clínico.</p>
                    <Link href="/casos-clinicos">
                      <Button variant="secondary">
                        Ver outros casos
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
