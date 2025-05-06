
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Book,
  Code,
  FileText,
  Info,
  Link as LinkIcon,
  Search,
  Shield,
  User,
  Users,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface SidebarSection {
  title: string;
  icon: React.ElementType;
  links: { title: string; href: string }[];
}

const sections: SidebarSection[] = [
  {
    title: "Introducción",
    icon: Info,
    links: [
      { title: "Principios REST", href: "/principles" },
      { title: "Estructura de la Guía", href: "/structure" },
    ],
  },
  {
    title: "Rutas y Recursos",
    icon: FileText,
    links: [
      { title: "Nomenclatura", href: "/naming" },
      { title: "Estructura de Rutas", href: "/route-structure" },
      { title: "Jerarquía de Recursos", href: "/resource-hierarchy" },
    ],
  },
  {
    title: "Métodos HTTP",
    icon: Code,
    links: [
      { title: "GET", href: "/methods/get" },
      { title: "POST", href: "/methods/post" },
      { title: "PUT", href: "/methods/put" },
      { title: "PATCH", href: "/methods/patch" },
      { title: "DELETE", href: "/methods/delete" },
    ],
  },
  {
    title: "Funcionalidades",
    icon: LinkIcon,
    links: [
      { title: "Versionado", href: "/versioning" },
      { title: "Paginación", href: "/pagination" },
      { title: "Filtrado", href: "/filtering" },
      { title: "Ordenamiento", href: "/sorting" },
    ],
  },
  {
    title: "Relaciones",
    icon: Users,
    links: [
      { title: "Recursos Anidados", href: "/nested-resources" },
      { title: "Expansión de Campos", href: "/field-expansion" },
    ],
  },
  {
    title: "Respuestas",
    icon: Book,
    links: [
      { title: "Códigos de Estado", href: "/status-codes" },
      { title: "Formatos de Respuesta", href: "/response-formats" },
      { title: "Manejo de Errores", href: "/error-handling" },
    ],
  },
  {
    title: "Seguridad",
    icon: Shield,
    links: [
      { title: "Autenticación", href: "/authentication" },
      { title: "Autorización", href: "/authorization" },
      { title: "Mejores Prácticas", href: "/security-practices" },
    ],
  },
  {
    title: "Documentación",
    icon: Search,
    links: [
      { title: "OpenAPI/Swagger", href: "/openapi" },
      { title: "Ejemplos Prácticos", href: "/examples" },
    ],
  },
  {
    title: "API Avanzada",
    icon: User,
    links: [
      { title: "Limitaciones REST", href: "/rest-limitations" },
      { title: "Alternativas", href: "/alternatives" },
      { title: "Patrones Escalables", href: "/scalable-patterns" },
    ],
  },
];

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-full max-w-[300px] border-r bg-sidebar p-6 shadow-lg transition-transform duration-300 lg:translate-x-0 lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <Code className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">API Route Compass</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-120px)] pr-2 -mr-2">
          {sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <section.icon className="h-4 w-4" />
                {section.title}
              </div>
              <div className="grid gap-1">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-sm px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
