import * as React from "react";
import { Command } from "cmdk";
import { Search, File, FolderOpen, Hash, Info, BarChart, Shield, Book, Link as LinkIcon, FileText } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { getSearchData, loadSearchIndex } from "@/services/searchIndexer";

// Tipos de contenido que se pueden buscar
export interface SearchableContent {
  id: string;
  title: string;
  content: string;
  summary: string; // Resumen detallado para búsquedas más precisas
  path: string;
  category: string;
  tags?: string[];
  keywords?: string[]; // Palabras clave adicionales para mejorar la búsqueda
  score?: number; // Usado internamente para ordenar resultados
}

// Función de búsqueda avanzada que utiliza múltiples criterios
function searchContent(query: string, data: SearchableContent[]): SearchableContent[] {
  if (!query.trim()) return [];
  
  // Dividir la consulta en términos individuales y normalizar
  const searchTerms = query.toLowerCase()
    .split(/\s+/)
    .filter(term => term.length > 1)
    .map(term => term.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
  
  if (searchTerms.length === 0) return [];

  // Sistema de puntuación para resultados más relevantes
  const scoredResults = data.map(item => {
    let score = 0;
    const normalizedTitle = item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedContent = item.content.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedSummary = item.summary.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Búsqueda en título (mayor peso)
    searchTerms.forEach(term => {
      // Coincidencia exacta en el título
      if (normalizedTitle === term) {
        score += 50;
      }
      // Título comienza con el término
      else if (normalizedTitle.startsWith(term)) {
        score += 30;
      }
      // Término está en el título
      else if (normalizedTitle.includes(term)) {
        score += 20;
      }
      // Término está en el título como palabra separada
      else if (new RegExp(`\\b${term}\\b`).test(normalizedTitle)) {
        score += 25;
      }
    });
    
    // Búsqueda en tags (peso alto)
    if (item.tags && item.tags.length > 0) {
      const normalizedTags = item.tags.map(tag => 
        tag.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      );
      
      searchTerms.forEach(term => {
        // Coincidencia exacta con un tag
        const exactTagMatch = normalizedTags.some(tag => tag === term);
        if (exactTagMatch) {
          score += 15;
        }
        
        // Tag contiene el término
        const partialTagMatch = normalizedTags.some(tag => tag.includes(term));
        if (partialTagMatch) {
          score += 10;
        }
      });
    }
    
    // Búsqueda en keywords (peso alto)
    if (item.keywords && item.keywords.length > 0) {
      const normalizedKeywords = item.keywords.map(keyword => 
        keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      );
      
      searchTerms.forEach(term => {
        // Coincidencia exacta con una keyword
        const exactKeywordMatch = normalizedKeywords.some(keyword => keyword === term);
        if (exactKeywordMatch) {
          score += 12;
        }
        
        // Keyword contiene el término
        const partialKeywordMatch = normalizedKeywords.some(keyword => keyword.includes(term));
        if (partialKeywordMatch) {
          score += 8;
        }
      });
    }
    
    // Búsqueda en categoría (peso medio-alto)
    const normalizedCategory = item.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    searchTerms.forEach(term => {
      if (normalizedCategory.includes(term)) {
        score += 15;
      }
    });
    
    // Búsqueda en resumen (peso medio)
    searchTerms.forEach(term => {
      // Conteo de ocurrencias en el resumen
      const summaryMatches = (normalizedSummary.match(new RegExp(term, 'g')) || []).length;
      
      // Si el resumen tiene múltiples coincidencias, aumentar el puntaje
      if (summaryMatches > 0) {
        score += Math.min(summaryMatches * 3, 15); // Limitar a máximo 15 puntos
      }
      
      // Si el término aparece al inicio del resumen, dar puntos extra
      if (normalizedSummary.startsWith(term)) {
        score += 5;
      }
    });
    
    // Búsqueda en contenido (peso bajo)
    searchTerms.forEach(term => {
      // Conteo de ocurrencias en el contenido
      const contentMatches = (normalizedContent.match(new RegExp(term, 'g')) || []).length;
      
      if (contentMatches > 0) {
        score += Math.min(contentMatches * 2, 10); // Limitar a máximo 10 puntos
      }
    });
    
    // Bonus para consultas de múltiples términos: si todos los términos aparecen en el item
    if (searchTerms.length > 1) {
      const allTermsFound = searchTerms.every(term => 
        normalizedTitle.includes(term) || 
        normalizedContent.includes(term) || 
        normalizedSummary.includes(term) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(term))) ||
        (item.keywords && item.keywords.some(keyword => keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(term)))
      );
      
      if (allTermsFound) {
        score += 10 * searchTerms.length; // Bonus aumenta con más términos encontrados
      }
    }
    
    return { ...item, score };
  });
  
  // Filtrar resultados con puntuación > 0 y ordenar por puntuación
  return scoredResults
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

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
        return <FileText className="h-4 w-4 text-green-500" />;
      case "Métodos HTTP":
        return <File className="h-4 w-4 text-amber-500" />;
      case "Funcionalidades":
        return <BarChart className="h-4 w-4 text-purple-500" />;
      case "Relaciones":
        return <LinkIcon className="h-4 w-4 text-cyan-500" />;
      case "Respuestas":
        return <Book className="h-4 w-4 text-pink-500" />;
      case "Seguridad":
        return <Shield className="h-4 w-4 text-red-500" />;
      case "API Avanzada":
        return <Hash className="h-4 w-4 text-indigo-500" />;
      default:
        return <FolderOpen className="h-4 w-4 text-gray-500" />;
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
        <div className="text-slate-500 text-xs line-clamp-2">{result.summary}</div>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="px-2 py-0.5 rounded bg-slate-100 text-xs text-slate-600">
            {result.category}
          </span>
          {result.tags && result.tags.slice(0, 3).map(tag => (
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
  const [searchData, setSearchData] = React.useState<SearchableContent[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Cargar datos de búsqueda al montar el componente
  React.useEffect(() => {
    // Cargar los datos iniciales sincrónicamente para evitar parpadeo
    setSearchData(getSearchData());
    
    // Luego cargar datos completos de forma asíncrona (podrían venir de una API)
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await loadSearchIndex();
        setSearchData(data);
      } catch (error) {
        console.error("Error cargando datos de búsqueda:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Optimización: debounce de la búsqueda para evitar muchas operaciones
  React.useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setFilteredResults([]);
        return;
      }

      // Utilizar la función de búsqueda avanzada con los datos del indexador
      const results = searchContent(searchQuery, searchData);
      setFilteredResults(results);
    }, 150);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, searchData]);

  // Focus en el input cuando se abre el diálogo
  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      // Limpiar búsqueda al cerrar
      setSearchQuery("");
    }
  }, [open]);

  // Manejar la navegación cuando se selecciona un resultado
  const handleSelect = (resultId: string) => {
    const result = searchData.find(item => item.id === resultId);
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

  // Mostrar sugerencias de búsqueda populares
  const searchSuggestions = [
    "REST", "API", "HTTP", "GET", "POST", "JSON", 
    "Autenticación", "Paginación", "Filtrado", "GraphQL"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 overflow-hidden">
        <Command className="w-full" shouldFilter={false}>
          <div className="flex items-center border-b px-4 h-14">
            <Search className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
            <Command.Input 
              ref={inputRef}
              className="w-full bg-transparent py-3 outline-none placeholder:text-slate-400 text-slate-900"
              placeholder="Buscar en la documentación..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
          </div>
          
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            {isLoading && searchQuery.trim() === "" ? (
              <div className="py-6 text-center text-sm text-slate-500">
                Cargando contenido...
              </div>
            ) : searchQuery.trim() === "" ? (
              <div className="px-4 py-3">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Búsquedas populares
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchSuggestions.map(suggestion => (
                    <button
                      key={suggestion}
                      className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors"
                      onClick={() => setSearchQuery(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
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