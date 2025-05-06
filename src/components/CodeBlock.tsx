
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

  return (
    <div className={cn("relative group rounded-md overflow-hidden border border-slate-800", className)}>
      <div className="absolute right-4 top-3 z-10">
        <button
          onClick={handleCopy}
          className="bg-slate-800 hover:bg-slate-700 rounded p-1.5 text-xs text-slate-300 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <div className="absolute top-0 left-0 right-0 h-8 flex items-center px-4 text-xs font-medium bg-slate-900 text-slate-400 border-b border-slate-800">
        {language.toUpperCase()}
      </div>
      <div className="pt-8 overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{ margin: 0, padding: '1rem', background: 'rgb(15, 23, 42)' }}
          wrapLongLines={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
