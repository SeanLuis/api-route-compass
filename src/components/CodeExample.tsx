import React from "react";
import { AlertTriangle, Check, X, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export type CodeExampleType = "success" | "warning" | "error";

interface CodeExampleProps {
  type: CodeExampleType;
  title: string;
  code: string;
  language?: string;
}

export const CodeExample: React.FC<CodeExampleProps> = ({
  type,
  title,
  code,
  language = "http"
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          containerClass: "bg-background border-border",
          headerClass: "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 border-b border-border",
          icon: <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
        };
      case "warning":
        return {
          containerClass: "bg-background border-border",
          headerClass: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-b border-border",
          icon: <AlertTriangle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
        };
      case "error":
        return {
          containerClass: "bg-background border-border",
          headerClass: "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-b border-border",
          icon: <X className="h-4 w-4 text-red-500 dark:text-red-400" />
        };
      default:
        return {
          containerClass: "bg-background border-border",
          headerClass: "bg-muted text-foreground border-b border-border",
          icon: null
        };
    }
  };

  const { containerClass, headerClass, icon } = getTypeStyles();

  return (
    <div className={cn("rounded-md overflow-hidden border", containerClass)}>
      <div className={cn("px-3 py-2", headerClass)}>
        <div className="flex items-center space-x-1.5">
          {icon}
          <span className="font-medium text-sm">{title}</span>
        </div>
      </div>
      <div className="bg-[#0d1117] dark:bg-[#0a0e17] text-gray-300 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-800 dark:border-gray-900 bg-[#161b22] dark:bg-[#111827]">
          <span className="text-xs text-gray-400">HTTP</span>
          <button 
            className="text-gray-400 hover:text-gray-300 focus:outline-none transition-colors"
            aria-label="Copiar código"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="p-3 overflow-x-auto max-h-[300px] overflow-y-auto">
          <pre className="text-sm font-mono whitespace-pre">{code}</pre>
        </div>
      </div>
    </div>
  );
}; 