import { useState, useEffect } from "react";
import { Menu, Search, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export function Header({ setIsSidebarOpen }: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-30 w-full transition-all duration-200 ${
      scrolled ? "border-b bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
    }`}>
      <div className="flex h-16 items-center justify-between px-4 lg:container">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden lg:flex">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-indigo-500 to-blue-500">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-slate-800">API Route Compass</span>
            </Link>
          </div>
        </div>
        
        <div className="relative max-w-md w-full md:w-96 mx-4 hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="search"
            placeholder="Buscar en la documentación..."
            className="h-9 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        
        <nav className="flex items-center gap-1 md:gap-3">
          <NavLink to="/examples" active={location.pathname === "/examples"}>
            Ejemplos
          </NavLink>
          <NavLink to="/tutorials" active={location.pathname === "/tutorials"}>
            Tutoriales
          </NavLink>
          <NavLink to="/api-reference" active={location.pathname === "/api-reference"}>
            API Reference
          </NavLink>
          <Button size="sm" className="ml-2 hidden md:flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700">
            <span>GitHub</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </nav>
      </div>
    </header>
  );
}

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

function NavLink({ to, active, children }: NavLinkProps) {
  return (
    <Link 
      to={to} 
      className={`text-sm py-1.5 px-2 md:px-3 rounded-md transition-colors ${
        active 
          ? "font-medium text-indigo-600" 
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      }`}
    >
      {children}
    </Link>
  );
}
