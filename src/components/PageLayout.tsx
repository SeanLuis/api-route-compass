import { ReactNode, useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Efecto para manejar la transición inicial
  useEffect(() => {
    setMounted(true);
  }, []);

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

  return (
    <div className={`flex min-h-screen flex-col bg-white ${mounted ? 'transition-opacity duration-500 opacity-100' : 'opacity-0'}`}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 transition-all duration-300 ease-in-out lg:pl-[280px]">
          <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 lg:py-12">
            {children}
          </div>
          
          <footer className="mt-24 border-t border-slate-200 py-10 px-4 lg:pl-[280px]">
            <div className="mx-auto max-w-4xl flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
              <div>
                <p className="text-center md:text-left">
                  © 2023 API Route Compass. Todos los derechos reservados.
                </p>
              </div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-slate-900 transition-colors">
                  Términos
                </a>
                <a href="#" className="hover:text-slate-900 transition-colors">
                  Privacidad
                </a>
                <a href="#" className="hover:text-slate-900 transition-colors">
                  Contacto
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
