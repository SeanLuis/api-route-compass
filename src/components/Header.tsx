import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export function Header({ setIsSidebarOpen }: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:container">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden lg:flex">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">API Route Compass</span>
            </Link>
          </div>
        </div>
        
        <div className="relative max-w-md w-full md:w-96 mx-4 hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Buscar en la documentación..."
            className="h-9 w-full rounded-md border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        
        <nav className="flex items-center gap-2 md:gap-3">
          <NavLink to="/examples" active={location.pathname === "/examples"}>
            Ejemplos
          </NavLink>
          <NavLink to="/tutorials" active={location.pathname === "/tutorials"}>
            Tutoriales
          </NavLink>
          <NavLink to="/api-reference" active={location.pathname === "/api-reference"}>
            API Reference
          </NavLink>
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
      className={`text-sm py-1.5 px-2 md:px-3 rounded-md ${
        active 
          ? "font-medium text-blue-600" 
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}
