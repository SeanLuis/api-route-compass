import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Book,
  Code,
  FileText,
  Info,
  Link as LinkIcon,
  Shield,
  User,
  Users,
  X,
  ChevronRight,
  BarChart,
  ExternalLink,
  RefreshCw,
  ChevronLeft,
  Menu,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

// Definir constantes para las dimensiones que usaremos en varios lugares
const COLLAPSED_WIDTH = "80px";
const EXPANDED_WIDTH = "280px";

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
      { title: "HEAD", href: "/methods/head" },
      { title: "OPTIONS", href: "/methods/options" },
      { title: "TRACE", href: "/methods/trace" },
    ],
  },
  {
    title: "Funcionalidades",
    icon: BarChart,
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
    icon: ExternalLink,
    links: [
      { title: "OpenAPI/Swagger", href: "/openapi" },
      { title: "Ejemplos Prácticos", href: "/examples" },
    ],
  },
  {
    title: "API Avanzada",
    icon: RefreshCw,
    links: [
      { title: "Limitaciones REST", href: "/rest-limitations" },
      { title: "Alternativas", href: "/alternatives" },
      { title: "Patrones Escalables", href: "/scalable-patterns" },
    ],
  },
];

export function Sidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get active section from localStorage or initialize as null
  const [activeSection, setActiveSection] = useState<string | null>(() => {
    const saved = localStorage.getItem('sidebar-active-section');
    return saved || null;
  });
  
  // Save active section to localStorage when it changes
  useEffect(() => {
    if (activeSection) {
      localStorage.setItem('sidebar-active-section', activeSection);
    } else {
      localStorage.removeItem('sidebar-active-section');
    }
  }, [activeSection]);
  
  // Toggle sidebar collapse state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // Toggle active section when clicking on a section in collapsed mode
  const toggleActiveSection = (sectionTitle: string) => {
    if (isCollapsed) {
      setActiveSection(activeSection === sectionTitle ? null : sectionTitle);
    }
  };
  
  // Handle navigation using the React Router navigate function
  const handleNavigation = (href: string, event: React.MouseEvent) => {
    event.preventDefault();
    navigate(href);
    
    // Only close mobile sidebar, keep desktop sidebar state as is
    setIsOpen(false);
  };
  
  // Helper function to check if a section is active based on current URL
  const isSectionActive = (section: SidebarSection) => {
    // Check if any link in the section matches the current path
    return section.links.some(link => location.pathname === link.href);
  };
  
  // Close active section when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.sidebar-content') || target.closest('a:not(.submenu-link)')) {
        setActiveSection(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <TooltipProvider delayDuration={300}>
      <>
        {/* Overlay para móvil que cierra el sidebar */}
        <div
          className={cn(
            "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden",
            isOpen ? "block" : "hidden"
          )}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Sidebar principal con transición mejorada */}
        <aside
          className={cn(
            "fixed top-0 left-0 z-50 h-full border-r border-slate-200 bg-white shadow-lg lg:shadow-none sidebar-content",
            "transition-all duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full",
            "lg:translate-x-0",
          )}
          style={{
            width: isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
            transition: "transform 300ms ease-in-out, width 300ms ease-in-out"
          }}
        >
          <div className="flex flex-col h-full">
            {/* Cabecera del Sidebar */}
            <div className={cn(
              "border-b border-slate-200",
              isCollapsed ? "py-4" : "p-4",
              "transition-all duration-300 ease-in-out"
            )}>
              <div className={cn(
                "flex items-center",
                isCollapsed ? "flex-col h-auto justify-center" : "h-8 justify-between",
                "transition-all duration-300 ease-in-out"
              )}>
                <a 
                  href="/" 
                  className={cn(
                    "flex items-center", 
                    isCollapsed ? "flex-col h-auto justify-center mb-2" : "h-8 gap-2",
                    "transition-all duration-300 ease-in-out"
                  )} 
                  onClick={(e) => handleNavigation('/', e)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 shrink-0">
                    <Code className="h-4 w-4 text-white" />
                  </div>
                  <div 
                    className={cn(
                      "font-semibold text-slate-800 truncate h-5",
                      isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto",
                      "transition-all duration-300 ease-in-out"
                    )}
                  >
                    API Route Compass
                  </div>
                </a>
                
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden text-slate-500"
                    aria-label="Cerrar menú"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleCollapse}
                    className="text-slate-500 hidden lg:flex"
                    aria-label={isCollapsed ? "Expandir" : "Contraer"}
                  >
                    {isCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-3 sidebar-content">
              {/* 
                Usamos lógica diferente para desktop y móvil:
                - En desktop: seguimos la lógica de isCollapsed
                - En móvil: siempre mostramos el modo expandido cuando está abierto 
              */}
              {isCollapsed && !isOpen ? (
                // Modo colapsado (solo desktop)
                <nav className="space-y-3">
                  {sections.map((section) => {
                    const isActive = activeSection === section.title;
                    const SectionIcon = section.icon;
                    
                    // Check if this section is active based on current URL
                    const sectionIsActive = isSectionActive(section);
                    
                    return (
                      <div key={section.title} className="relative group">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className={cn(
                                "flex justify-center items-center p-3 rounded-md cursor-pointer",
                                "transition-colors duration-200",
                                (sectionIsActive || isActive) ? "bg-slate-100 text-indigo-600" : "text-slate-500 hover:bg-slate-50"
                              )}
                              onClick={() => toggleActiveSection(section.title)}
                            >
                              <SectionIcon className={cn(
                                "h-5 w-5",
                                (sectionIsActive || isActive) ? "text-indigo-500" : ""
                              )} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            {section.title}
                          </TooltipContent>
                        </Tooltip>
                        
                        {/* Menú flotante para el modo colapsado - muestra solo al hacer clic */}
                        {isActive && (
                          <div 
                            className="fixed left-[80px] top-0 mt-3 ml-0 w-56 bg-white py-2 rounded-md shadow-xl border border-slate-200 z-[100]"
                            style={{ 
                              top: `${(sections.indexOf(section) * 44) + 70}px`,
                              maxHeight: 'calc(100vh - 100px)',
                              overflowY: 'auto'
                            }}
                          >
                            <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase border-b border-slate-100 mb-1">
                              {section.title}
                            </div>
                            {section.links.map((link) => {
                              const isLinkActive = location.pathname === link.href;
                              return (
                                <a
                                  key={link.href}
                                  href={link.href} 
                                  className={cn(
                                    "flex items-center text-sm py-2 px-3 hover:bg-slate-100 transition-colors submenu-link",
                                    isLinkActive
                                      ? "text-indigo-600 font-medium"
                                      : "text-slate-700"
                                  )}
                                  onClick={(e) => handleNavigation(link.href, e)}
                                >
                                  {isLinkActive && (
                                    <ChevronRight className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />
                                  )}
                                  <span>{link.title}</span>
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              ) : (
                /* Modo expandido - diseño original, se muestra siempre en móvil */
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
                            <a
                              key={link.href}
                              href={link.href}
                              className={cn(
                                "flex items-center text-sm px-3 py-2 rounded-md",
                                isActive
                                  ? "bg-slate-100 text-indigo-600 font-medium"
                                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                              )}
                              onClick={(e) => handleNavigation(link.href, e)}
                            >
                              {isActive && (
                                <ChevronRight className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />
                              )}
                              <span className={cn(isActive ? "ml-0" : "ml-5")}>{link.title}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </nav>
              )}
            </div>
            
            <div className={cn(
              "border-t border-slate-200 mt-auto",
              isCollapsed && !isOpen ? "text-center py-3" : "p-4",
              "transition-all duration-300 ease-in-out"
            )}>
              <div className={cn(
                "flex items-center justify-between text-sm text-slate-500",
                isCollapsed && !isOpen && "flex-col gap-1",
                "transition-all duration-300 ease-in-out"
              )}>
                <div 
                  className={cn(
                    "transition-all duration-300 ease-in-out",
                    isCollapsed && !isOpen ? "opacity-0 w-0 h-0 overflow-hidden" : "opacity-100 h-auto w-auto"
                  )}
                >
                  API Route Compass
                </div>
                <span>v1.0</span>
              </div>
            </div>
          </div>
        </aside>
      </>
    </TooltipProvider>
  );
}
