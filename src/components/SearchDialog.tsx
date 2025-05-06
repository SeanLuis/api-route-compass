import * as React from "react";
import { Command } from "cmdk";
import { Search, File, FolderOpen, Hash, Info } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// Tipos de contenido que se pueden buscar
interface SearchableContent {
  id: string;
  title: string;
  content: string;
  path: string;
  category: string;
  tags?: string[];
}

// Ejemplo de datos para la búsqueda - en una implementación real esto vendría de una API o indexación
const SEARCH_DATA: SearchableContent[] = [
  // Introducción
  {
    id: "principles",
    title: "Principios REST",
    content: "Características fundamentales y principios de la arquitectura REST.",
    path: "/principles",
    category: "Introducción",
    tags: ["REST", "principios", "arquitectura"]
  },
  {
    id: "structure",
    title: "Estructura de la Guía",
    content: "Organización y contenido de la guía de APIs REST.",
    path: "/structure",
    category: "Introducción",
    tags: ["guía", "documentación"]
  },

  // Rutas y Recursos
  {
    id: "naming",
    title: "Nomenclatura",
    content: "Cómo nombrar recursos y rutas en una API REST.",
    path: "/naming",
    category: "Rutas y Recursos",
    tags: ["nomenclatura", "URI", "URL", "recursos"]
  },
  {
    id: "route-structure",
    title: "Estructura de Rutas",
    content: "Patrones y organización de rutas en APIs REST.",
    path: "/route-structure",
    category: "Rutas y Recursos",
    tags: ["rutas", "URI", "organización", "paths"]
  },
  {
    id: "resource-hierarchy",
    title: "Jerarquía de Recursos",
    content: "Organización jerárquica de recursos en REST.",
    path: "/resource-hierarchy",
    category: "Rutas y Recursos",
    tags: ["recursos", "jerarquía", "organización"]
  },

  // Métodos HTTP
  {
    id: "methods-get",
    title: "GET",
    content: "El método GET para recuperar recursos en APIs REST.",
    path: "/methods/get",
    category: "Métodos HTTP",
    tags: ["GET", "consulta", "recuperación", "lectura"]
  },
  {
    id: "methods-post",
    title: "POST",
    content: "El método POST para crear recursos en APIs REST.",
    path: "/methods/post",
    category: "Métodos HTTP",
    tags: ["POST", "creación", "recursos"]
  },
  {
    id: "methods-put",
    title: "PUT",
    content: "El método PUT para actualizar recursos en APIs REST.",
    path: "/methods/put",
    category: "Métodos HTTP",
    tags: ["PUT", "actualización", "recursos"]
  },
  {
    id: "methods-patch",
    title: "PATCH",
    content: "El método PATCH para actualizar parcialmente recursos en APIs REST.",
    path: "/methods/patch",
    category: "Métodos HTTP",
    tags: ["PATCH", "actualización", "parcial", "recursos"]
  },
  {
    id: "methods-delete",
    title: "DELETE",
    content: "El método DELETE para eliminar recursos en APIs REST.",
    path: "/methods/delete",
    category: "Métodos HTTP",
    tags: ["DELETE", "eliminación", "recursos"]
  },

  // API Avanzada
  {
    id: "rest-limitations",
    title: "Limitaciones REST",
    content: "Restricciones y desafíos del modelo REST para APIs complejas.",
    path: "/rest-limitations",
    category: "API Avanzada",
    tags: ["limitaciones", "restricciones", "problemas"]
  },
  {
    id: "alternatives",
    title: "Alternativas a REST",
    content: "Enfoques alternativos para diseñar APIs web.",
    path: "/alternatives",
    category: "API Avanzada",
    tags: ["GraphQL", "gRPC", "WebSockets", "alternativas"]
  }
];

// Componente de resultado de búsqueda
const SearchResult = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Command.Item> & { 
    result: SearchableContent 
  }
>(({ result, ...props }, ref) => {
  // Determinar ícono según la categoría
  const getIcon = (category: string) => {
    switch (category) {
      case "Introducción":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "Rutas y Recursos":
        return <FolderOpen className="h-4 w-4 text-green-500" />;
      case "Métodos HTTP":
        return <File className="h-4 w-4 text-amber-500" />;
      case "API Avanzada":
        return <Hash className="h-4 w-4 text-purple-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Command.Item
      ref={ref}
      {...props}
      className="px-4 py-3 rounded-md text-sm flex items-start gap-2 aria-selected:bg-slate-100 cursor-pointer"
      value={result.id}
    >
      <div className="mt-0.5">{getIcon(result.category)}</div>
      <div className="flex-1 overflow-hidden">
        <div className="font-medium text-slate-900">{result.title}</div>
        <div className="text-slate-500 truncate text-xs">{result.content}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="px-2 py-0.5 rounded bg-slate-100 text-xs text-slate-600">
            {result.category}
          </span>
          {result.tags && result.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded bg-slate-50 text-xs text-slate-500">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Command.Item>
  );
});
SearchResult.displayName = "SearchResult";

// Componente principal de búsqueda
interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = React.useState<SearchableContent[]>([]);

  // Optimización: debounce de la búsqueda para evitar muchas operaciones
  React.useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setFilteredResults([]);
        return;
      }

      const query = searchQuery.toLowerCase();
      
      // Búsqueda por título, contenido y tags
      const results = SEARCH_DATA.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.content.toLowerCase().includes(query) || 
        item.tags?.some(tag => tag.toLowerCase().includes(query))
      );

      // Ordenar resultados: primero los que coinciden en el título
      results.sort((a, b) => {
        const aInTitle = a.title.toLowerCase().includes(query);
        const bInTitle = b.title.toLowerCase().includes(query);
        if (aInTitle && !bInTitle) return -1;
        if (!aInTitle && bInTitle) return 1;
        return 0;
      });

      setFilteredResults(results);
    }, 150);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Manejar la navegación cuando se selecciona un resultado
  const handleSelect = (resultId: string) => {
    const result = SEARCH_DATA.find(item => item.id === resultId);
    if (result) {
      navigate(result.path);
      onOpenChange(false);
    }
  };

  // Manejar atajos de teclado
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-3xl overflow-hidden">
        <Command className="w-full" shouldFilter={false}>
          <div className="flex items-center border-b px-4 h-14">
            <Search className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
            <Command.Input 
              className="w-full bg-transparent py-3 outline-none placeholder:text-slate-400 text-slate-900"
              placeholder="Buscar en la documentación..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
          </div>
          
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            {searchQuery.trim() === "" ? (
              <div className="py-6 text-center text-sm text-slate-500">
                Ingresa una consulta para buscar en la documentación
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="py-6 text-center text-sm text-slate-500">
                No se encontraron resultados para "{searchQuery}"
              </div>
            ) : (
              <>
                <div className="px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {filteredResults.length} {filteredResults.length === 1 ? "resultado" : "resultados"}
                </div>
                <Command.Group>
                  {filteredResults.map((result) => (
                    <SearchResult
                      key={result.id}
                      result={result}
                      onSelect={() => handleSelect(result.id)}
                    />
                  ))}
                </Command.Group>
              </>
            )}
          </Command.List>
        </Command>
        
        <div className="p-2 border-t">
          <div className="flex justify-between items-center text-xs text-slate-500 px-2 py-1.5">
            <div className="flex items-center">
              <span className="mr-2">Atajos:</span>
              <kbd className="px-1.5 py-0.5 rounded border bg-slate-50 mx-1">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded border bg-slate-50 mx-1">↓</kbd>
              <span className="mx-1">para navegar</span>
              <kbd className="px-1.5 py-0.5 rounded border bg-slate-50 mx-1">↵</kbd>
              <span className="mx-1">para seleccionar</span>
              <kbd className="px-1.5 py-0.5 rounded border bg-slate-50 mx-1">Esc</kbd>
              <span className="mx-1">para cerrar</span>
            </div>
            <div>
              <kbd className="px-1.5 py-0.5 rounded border bg-slate-50">⌘ K</kbd>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Botón de búsqueda para mostrar en el header
export function SearchButton({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center text-sm px-3 py-1.5 rounded-md border border-slate-200 bg-white text-slate-500 hover:text-slate-700 gap-2 transition-colors",
          className
        )}
      >
        <Search className="h-4 w-4" />
        <span>Buscar documentación...</span>
        <kbd className="hidden md:flex items-center text-xs rounded border bg-slate-50 px-1.5 h-5 ml-auto">
          ⌘K
        </kbd>
      </button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
} 