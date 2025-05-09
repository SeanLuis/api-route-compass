import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "json", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Wait for component to be mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Process newlines in code string to ensure they render properly
  const processedCode = code.replace(/\\n/g, '\n');

  // Determine the background color based on dark/light mode
  const bgColor = mounted && resolvedTheme === 'dark' ? '#0a0e17' : '#0f172a';
  const borderColor = mounted && resolvedTheme === 'dark' ? '#1f2937' : '#0f172a';
  const headerBgColor = mounted && resolvedTheme === 'dark' ? '#111827' : '#1e293b';

  // Optimized style for a consistent dark theme
  const customStyle = {
    backgroundColor: bgColor,
    background: bgColor,
    margin: 0,
    padding: '1.5rem 1.25rem',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    borderRadius: '0.375rem',
    boxShadow: 'none',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap'
  };

  // Enhanced theme with better syntax highlighting colors
  const modifiedStyle = {
    ...vscDarkPlus,
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: bgColor,
      color: '#f1f5f9',
      textShadow: 'none',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      whiteSpace: 'pre-wrap'
    },
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: bgColor,
      color: '#f1f5f9',
      textShadow: 'none',
      whiteSpace: 'pre-wrap'
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
      "relative group rounded-md overflow-hidden border border-slate-800 dark:border-slate-700",
      className
    )}>
      <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-4" style={{ backgroundColor: headerBgColor, borderBottom: `1px solid ${borderColor}` }}>
        <div className="text-xs font-medium text-slate-400 dark:text-slate-300">
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
      <div className="pt-10 overflow-x-auto" style={{ backgroundColor: bgColor }}>
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
          showLineNumbers={false}
        >
          {processedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
