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

  // Optimized style for a consistent dark theme
  const customStyle = {
    backgroundColor: '#0f172a', // Darker background
    background: '#0f172a',
    margin: 0,
    padding: '1.5rem 1.25rem',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    borderRadius: '0.375rem',
    boxShadow: 'none',
    overflowX: 'auto'
  };

  // Enhanced theme with better syntax highlighting colors
  const modifiedStyle = {
    ...vscDarkPlus,
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: '#0f172a',
      color: '#f1f5f9',
      textShadow: 'none',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    },
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: '#0f172a',
      color: '#f1f5f9',
      textShadow: 'none'
    },
    'property': {
      ...vscDarkPlus['property'],
      color: '#93c5fd' // Light blue for properties
    },
    'string': {
      ...vscDarkPlus['string'],
      color: '#fca5a5' // Light red for strings
    },
    'number': {
      ...vscDarkPlus['number'],
      color: '#a5b4fc' // Light purple for numbers
    },
    'comment': {
      ...vscDarkPlus['comment'],
      color: '#64748b' // Slate for comments
    },
    'keyword': {
      ...vscDarkPlus['keyword'],
      color: '#f472b6' // Pink for keywords
    },
    'function': {
      ...vscDarkPlus['function'],
      color: '#38bdf8' // Blue for functions
    }
  };

  return (
    <div className={cn(
      "relative group rounded-md overflow-hidden border border-slate-800 bg-[#0f172a]",
      className
    )}>
      <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-4 bg-[#1e293b] border-b border-slate-700">
        <div className="text-xs font-medium text-slate-400">
          {language.toUpperCase()}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 bg-slate-700/50 hover:bg-slate-700 rounded-md p-1.5 text-xs text-slate-300 transition-colors"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="pt-10 overflow-x-auto bg-[#0f172a]">
        <SyntaxHighlighter
          language={language}
          style={modifiedStyle}
          customStyle={customStyle}
          wrapLongLines={false}
          codeTagProps={{
            style: {
              backgroundColor: 'transparent',
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
