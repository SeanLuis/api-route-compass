
import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export function Header({ setIsSidebarOpen }: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 lg:container">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden mr-2"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="mr-4 hidden lg:flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-semibold">API Route Compass</span>
          </Link>
        </div>
        
        <div className="relative flex-1 max-w-md mr-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar en la documentación..."
            className="h-9 w-full rounded-md border border-input bg-background px-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        
        <nav className="flex items-center gap-4 ml-auto">
          <Link to="/examples" className="text-sm font-medium hover:underline">
            Ejemplos
          </Link>
          <Link to="/tutorials" className="text-sm font-medium hover:underline">
            Tutoriales
          </Link>
          <Link to="/api-reference" className="text-sm font-medium hover:underline">
            API Reference
          </Link>
        </nav>
      </div>
    </header>
  );
}
