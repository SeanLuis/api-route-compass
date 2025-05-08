import { ReactNode, useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

// Use the same constants as in Sidebar.tsx for consistency
const COLLAPSED_WIDTH = "80px";
const EXPANDED_WIDTH = "280px";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  // Initialize state from localStorage if available, otherwise default to false
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  // Save collapsed state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  // Efecto para manejar el escape para cerrar el sidebar en móvil
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Prevenir scroll cuando el sidebar está abierto en móvil
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  // Cerrar sidebar automáticamente en cambio de tamaño
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-1">
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        <main 
          className={cn(
            "flex-1 w-full transition-all duration-300 ease-in-out will-change-transform",
            "lg:transition-[padding-left] lg:duration-300 lg:ease-in-out",
            isSidebarCollapsed ? "lg:pl-[80px]" : "lg:pl-[280px]"
          )}
        >
          <div className="mx-auto w-full px-4 sm:px-6 py-6 lg:py-10 max-w-[1400px]">
            {children}
          </div>
          
          <footer className="mt-16 border-t border-slate-200 py-8 px-4 sm:px-6">
            <div className="mx-auto max-w-[1400px] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
              <div>
                <p className="text-center md:text-left">
                  © 2023 API Route Compass. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
