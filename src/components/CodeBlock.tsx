import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "json", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Estilo personalizado para hacer que coincida con la imagen
  const customStyle = {
    backgroundColor: '#111827', // Fondo muy oscuro
    background: '#111827',
    margin: 0,
    padding: '1.25rem',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none'
  };

  // Modificación del tema vscDarkPlus para que coincida con la imagen
  const modifiedStyle = {
    ...vscDarkPlus,
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: '#111827',
      color: '#e2e8f0'
    },
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: '#111827',
      color: '#e2e8f0'
    },
    'property': {
      ...vscDarkPlus['property'],
      color: '#93c5fd' // Color azul claro para las propiedades (como "id", "name", etc.)
    },
    'string': {
      ...vscDarkPlus['string'],
      color: '#fca5a5' // Color rojo claro para strings
    },
    'number': {
      ...vscDarkPlus['number'],
      color: '#a5b4fc' // Color púrpura claro para números
    }
  };

  return (
    <div className={cn(
      "relative group rounded-md overflow-hidden border-none bg-[#111827] my-4",
      className
    )}>
      <div className="absolute right-4 top-3 z-10">
        <button
          onClick={handleCopy}
          className="bg-slate-800 hover:bg-slate-700 rounded p-1.5 text-xs text-slate-300 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <div className="absolute top-0 left-0 right-0 h-8 flex items-center px-4 text-xs font-medium bg-[#0f172a] text-slate-400 border-b border-slate-800">
        {language.toUpperCase()}
      </div>
      <div className="pt-8 overflow-x-auto bg-[#111827]">
        <SyntaxHighlighter
          language={language}
          style={modifiedStyle}
          customStyle={customStyle}
          wrapLongLines={false}
          codeTagProps={{
            style: {
              backgroundColor: '#111827',
              display: 'block'
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
