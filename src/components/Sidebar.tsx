import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  X,
  ChevronRight
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
  const location = useLocation();
  
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-background/80 z-40 lg:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-full max-w-[280px] border-r bg-sidebar shadow-lg lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-indigo-500 to-blue-500">
                <Code className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-slate-800">API Route Compass</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-500"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="overflow-y-auto flex-1 py-4 px-3">
            <nav className="space-y-6">
              {sections.map((section) => (
                <div key={section.title} className="space-y-1">
                  <div className="px-3 mb-2 flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <section.icon className="h-3.5 w-3.5" />
                    <span>{section.title}</span>
                  </div>
                  <div className="space-y-1">
                    {section.links.map((link) => {
                      const isActive = location.pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          to={link.href}
                          className={cn(
                            "flex items-center text-sm px-3 py-2 rounded-md",
                            isActive
                              ? "bg-slate-100 text-indigo-600 font-medium"
                              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          {isActive && (
                            <ChevronRight className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />
                          )}
                          <span className={cn(isActive ? "ml-0" : "ml-5")}>{link.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-slate-200 mt-auto">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>API Route Compass</span>
              <span>v1.0</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
