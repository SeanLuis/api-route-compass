import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { SearchButton } from "./SearchDialog";

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export function Header({ setIsSidebarOpen }: HeaderProps) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="flex items-center gap-2 md:gap-3">
          <SearchButton />
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
