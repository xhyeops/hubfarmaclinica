"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  FileText,
  HelpCircle,
  FlaskConical,
  Pill,
  Stethoscope,
  GraduationCap,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useTheme } from "next-themes"

const menuItems = [
  {
    title: "Início",
    href: "/",
    icon: GraduationCap,
  },
  {
    title: "Resumos",
    href: "/resumos",
    icon: FileText,
  },
  {
    title: "Casos Clínicos",
    href: "/casos-clinicos",
    icon: Stethoscope,
  },
  {
    title: "Questões",
    href: "/questoes",
    icon: HelpCircle,
  },
  {
    title: "Farmacologia Básica",
    href: "/farmacologia-basica",
    icon: FlaskConical,
  },
  {
    title: "Interações Medicamentosas",
    href: "/interacoes",
    icon: Pill,
  },
  {
    title: "Materiais de Apoio",
    href: "/materiais",
    icon: BookOpen,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-72 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Pill className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Farmacologia</h1>
              <p className="text-xs text-muted-foreground">Monitoria Clínica</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Theme toggle */}
          <div className="border-t border-border px-4 py-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="ml-2">Alternar tema</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
