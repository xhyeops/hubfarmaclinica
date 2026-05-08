"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { isAdminEmail } from "@/lib/admin"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import {
  Save,
  ArrowLeft,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Image,
  List,
  ListOrdered,
  Quote,
  LinkIcon,
  Minus,
  Code,
} from "lucide-react"

function gerarSlug(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export default function NovoResumoPage() {
  const router = useRouter()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const [checking, setChecking] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const [titulo, setTitulo] = useState("")
  const [slug, setSlug] = useState("")
  const [conteudo, setConteudo] = useState("")
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState("")

  useEffect(() => {
    async function verificarAdmin() {
      const { data } = await supabase.auth.getUser()
      const email = data.user?.email

      if (!data.user) {
        router.push("/login")
        return
      }

      if (!isAdminEmail(email)) {
        setIsAdmin(false)
        setChecking(false)
        return
      }

      setIsAdmin(true)
      setChecking(false)
    }

    verificarAdmin()
  }, [router])

  function handleTituloChange(value: string) {
    setTitulo(value)
    setSlug(gerarSlug(value))
  }

  function inserirMarkdown(antes: string, depois = "", placeholder = "") {
    const textarea = textareaRef.current
    if (!textarea) return

    const inicio = textarea.selectionStart
    const fim = textarea.selectionEnd
    const selecionado = conteudo.substring(inicio, fim)
    const texto = selecionado || placeholder

    const novoConteudo =
      conteudo.substring(0, inicio) +
      antes +
      texto +
      depois +
      conteudo.substring(fim)

    setConteudo(novoConteudo)

    setTimeout(() => {
      textarea.focus()
      const novaPosicaoInicio = inicio + antes.length
      const novaPosicaoFim = novaPosicaoInicio + texto.length
      textarea.setSelectionRange(novaPosicaoInicio, novaPosicaoFim)
    }, 0)
  }

  async function salvarResumo(e: React.FormEvent) {
    e.preventDefault()
    setErro("")
    setLoading(true)

    const { error } = await supabase.from("resumos").insert({
      titulo,
      slug,
      conteudo,
    })

    setLoading(false)

    if (error) {
      setErro(error.message)
      return
    }

    router.push(`/resumos/${slug}`)
  }

  if (checking) {
    return (
      <main className="min-h-screen bg-slate-950 p-6 text-white">
        Verificando acesso...
      </main>
    )
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-slate-950 p-6 text-white">
        <p>Acesso negado.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-rose-300"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Novo resumo</h1>
            <p className="text-sm text-slate-400">
              Crie o conteúdo com ferramentas Markdown e veja a prévia em tempo real.
            </p>
          </div>

          <button
            form="form-novo-resumo"
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-900 to-red-900 px-5 py-3 text-sm font-medium text-white transition hover:from-rose-800 hover:to-red-800 disabled:opacity-60"
          >
            <Save size={18} />
            {loading ? "Salvando..." : "Salvar resumo"}
          </button>
        </div>

        {erro && (
          <p className="mb-4 rounded-xl border border-red-900/40 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {erro}
          </p>
        )}

        <form
          id="form-novo-resumo"
          onSubmit={salvarResumo}
          className="grid gap-6 lg:grid-cols-2 lg:items-start"
        >
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Título
            </label>

            <input
              value={titulo}
              onChange={(e) => handleTituloChange(e.target.value)}
              required
              placeholder="Ex: Introdução à farmacocinética"
              className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-rose-700"
            />

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Slug
            </label>

            <input
              value={slug}
              onChange={(e) => setSlug(gerarSlug(e.target.value))}
              required
              placeholder="introducao-a-farmacocinetica"
              className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-rose-700"
            />

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Conteúdo em Markdown
            </label>

            <div className="mb-3 flex flex-wrap gap-2 rounded-2xl border border-slate-700 bg-slate-950/70 p-2">
              <ToolbarButton title="Negrito" onClick={() => inserirMarkdown("**", "**", "texto em negrito")}>
                <Bold size={16} />
              </ToolbarButton>

              <ToolbarButton title="Itálico" onClick={() => inserirMarkdown("*", "*", "texto em itálico")}>
                <Italic size={16} />
              </ToolbarButton>

              <ToolbarButton title="Título 2" onClick={() => inserirMarkdown("## ", "", "Título")}>
                <Heading2 size={16} />
              </ToolbarButton>

              <ToolbarButton title="Título 3" onClick={() => inserirMarkdown("### ", "", "Subtítulo")}>
                <Heading3 size={16} />
              </ToolbarButton>

              <ToolbarButton title="Link" onClick={() => inserirMarkdown("[", "](https://link.com)", "texto do link")}>
                <LinkIcon size={16} />
              </ToolbarButton>

              <ToolbarButton title="Imagem" onClick={() => inserirMarkdown("![", "](https://link-da-imagem.com/imagem.jpg)", "descrição da imagem")}>
                <Image size={16} />
              </ToolbarButton>

              <ToolbarButton title="Lista" onClick={() => inserirMarkdown("- ", "", "item da lista")}>
                <List size={16} />
              </ToolbarButton>

              <ToolbarButton title="Lista numerada" onClick={() => inserirMarkdown("1. ", "", "item da lista")}>
                <ListOrdered size={16} />
              </ToolbarButton>

              <ToolbarButton title="Citação" onClick={() => inserirMarkdown("> ", "", "citação")}>
                <Quote size={16} />
              </ToolbarButton>

              <ToolbarButton title="Código" onClick={() => inserirMarkdown("`", "`", "código")}>
                <Code size={16} />
              </ToolbarButton>

              <ToolbarButton title="Separador" onClick={() => inserirMarkdown("\n\n---\n\n")}>
                <Minus size={16} />
              </ToolbarButton>
            </div>

            <textarea
              ref={textareaRef}
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              required
              placeholder={`# Introdução\n\nDigite seu conteúdo aqui...\n\n## Tópico\n\n- Item 1\n- Item 2`}
              className="min-h-[760px] w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm leading-relaxed outline-none focus:border-rose-700"
            />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:sticky lg:top-6">
            <p className="mb-4 text-sm font-medium text-slate-300">Prévia</p>

            <div className="min-h-[760px] max-h-[900px] overflow-y-auto rounded-xl border border-slate-700 bg-slate-950 p-5 sm:p-6">
              <div className="mb-5">
                <h1 className="text-2xl font-bold text-white">
                  {titulo || "Título do resumo"}
                </h1>
              </div>

              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="mb-4 text-3xl font-bold text-white">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mb-3 mt-6 border-l-4 border-rose-800 pl-3 text-2xl font-semibold text-white">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-2 mt-5 text-xl font-semibold text-white">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-3 leading-relaxed text-slate-200">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 list-disc space-y-1 pl-6 text-slate-200">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-4 list-decimal space-y-1 pl-6 text-slate-200">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-slate-200">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-rose-300">
                      {children}
                    </strong>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-4 border-l-4 border-rose-800 pl-4 italic text-slate-300">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="rounded-md bg-rose-950/40 px-1.5 py-0.5 text-sm text-rose-300">
                      {children}
                    </code>
                  ),
                  hr: () => <hr className="my-6 border-slate-700" />,
                  img: ({ src, alt }) => (
                    <img
                      src={src || ""}
                      alt={alt || ""}
                      className="my-6 max-w-full rounded-xl border border-slate-700 shadow-lg"
                    />
                  ),
                }}
              >
                {conteudo || "Digite o conteúdo do resumo para ver a prévia."}
              </ReactMarkdown>
            </div>
          </section>
        </form>
      </div>
    </main>
  )
}

function ToolbarButton({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode
  title: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-rose-950/40 hover:text-rose-300"
    >
      {children}
    </button>
  )
}
