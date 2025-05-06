
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "json", className }: CodeBlockProps) {
  return (
    <div className={cn("relative group rounded-md overflow-hidden", className)}>
      <div className="absolute right-4 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="bg-background/10 hover:bg-background/20 rounded p-1 text-xs text-slate-100"
          aria-label="Copy code"
        >
          Copy
        </button>
      </div>
      <div className="absolute top-0 left-0 right-0 h-8 flex items-center px-4 text-xs font-medium bg-slate-950 text-slate-400">
        {language}
      </div>
      <pre className="code-block mt-8 text-sm">
        {code}
      </pre>
    </div>
  );
}
