"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  FileText,
  HelpCircle,
  FlaskConical,
  Pill,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  Layers,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { supabase } from "@/lib/supabase"

const menuItems = [
  { title: "Início", href: "/", icon: BookOpen },
  { title: "Resumos", href: "/resumos", icon: FileText },
  { title: "Flashcards", href: "/flashcards", icon: Layers },
  { title: "Casos Clínicos", href: "/casos-clinicos", icon: FlaskConical },
  { title: "Questões", href: "/questoes", icon: HelpCircle },
  { title: "Fármacos", href: "/farmacos", icon: Pill },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    setMounted(true)

    async function getUser() {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    getUser()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
    setIsOpen(false)
    router.push("/login")
  }

  function NavLinks() {
    return (
      <ul className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href))

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all duration-300",
                  isActive
                    ? "border border-rose-900/20 bg-rose-100 text-rose-950 shadow-lg shadow-rose-900/10 dark:border-rose-800/40 dark:bg-rose-950/70 dark:text-rose-200 dark:shadow-rose-950/30"
                    : "text-muted-foreground hover:bg-rose-50 hover:text-rose-950 dark:hover:bg-rose-950/30 dark:hover:text-rose-200"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-xl transition",
                    isActive
                      ? "bg-rose-900 text-white dark:bg-rose-900/80"
                      : "bg-transparent group-hover:bg-rose-100 group-hover:text-rose-900 dark:group-hover:bg-rose-950/50 dark:group-hover:text-rose-200"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>

                <span className="font-medium">{item.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  function Brand() {
    return (
      <Link href="/" className="group flex items-center gap-3">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-900 via-red-900 to-rose-700 text-white shadow-xl shadow-rose-900/25 ring-1 ring-rose-900/20 dark:from-rose-950 dark:via-rose-900 dark:to-red-900 dark:shadow-rose-950/40">
          <Pill className="h-5 w-5 rotate-[-35deg]" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-rose-900 shadow-sm dark:bg-rose-200">
            <Activity className="h-2.5 w-2.5" />
          </span>
        </div>

        <div className="min-w-0">
          <h1 className="leading-tight">
            <span className="block text-[15px] font-extrabold tracking-tight text-slate-950 dark:text-foreground">
              Farmacologia
            </span>
            <span className="block text-[15px] font-extrabold tracking-tight text-rose-900 dark:text-rose-200">
              Clínica
            </span>
          </h1>

          <p className="mt-0.5 text-xs font-medium text-muted-foreground">
            Monitoria acadêmica
          </p>
        </div>
      </Link>
    )
  }

  function FooterContent() {
    return (
      <div className="space-y-4">
        {mounted && (
          <Button
            variant="ghost"
            size="sm"
            className="h-11 w-full justify-start gap-3 rounded-2xl hover:bg-rose-50 hover:text-rose-950 dark:hover:bg-rose-950/30 dark:hover:text-rose-200"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4" />
                <span className="text-sm">Modo claro</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                <span className="text-sm">Modo escuro</span>
              </>
            )}
          </Button>
        )}

        {user && (
          <div className="rounded-2xl border border-border bg-background/60 p-3 shadow-sm">
            <p className="mb-1 text-xs text-muted-foreground">Logado como:</p>

            <p className="mb-3 break-all text-sm font-semibold text-foreground">
              {user.email}
            </p>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/10"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-card/85 px-4 backdrop-blur-xl lg:hidden">
        <Brand />

        <div className="flex items-center gap-1">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-background/55 backdrop-blur-sm transition-opacity duration-300 ease-out lg:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      />

      <aside
        className={cn(
          "fixed bottom-0 left-0 top-14 z-50 w-[85vw] max-w-xs border-r border-border bg-card/95 shadow-2xl shadow-rose-950/20 backdrop-blur-2xl transition-all duration-300 ease-out lg:hidden",
          isOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        )}
      >
        <nav className="p-4">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            Menu
          </p>

          <NavLinks />
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-card/80 p-4 backdrop-blur-xl">
          <FooterContent />
        </div>
      </aside>

      <aside className="fixed bottom-0 left-0 top-0 hidden w-64 flex-col border-r border-border bg-card/70 backdrop-blur-xl lg:flex">
        <div className="border-b border-border p-6">
          <Brand />
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            Menu
          </p>

          <NavLinks />
        </nav>

        <div className="border-t border-border p-4">
          <FooterContent />
        </div>
      </aside>
    </>
  )
}
