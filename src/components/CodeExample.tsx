import React from "react";
import { AlertTriangle, Check, X, Copy } from "lucide-react";

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
          containerClass: "bg-white border-gray-200",
          headerClass: "bg-green-50 text-green-700 border-b border-gray-200",
          icon: <Check className="h-4 w-4 text-green-500" />
        };
      case "warning":
        return {
          containerClass: "bg-white border-gray-200",
          headerClass: "bg-amber-50 text-amber-700 border-b border-gray-200",
          icon: <AlertTriangle className="h-4 w-4 text-amber-500" />
        };
      case "error":
        return {
          containerClass: "bg-white border-gray-200",
          headerClass: "bg-red-50 text-red-700 border-b border-gray-200",
          icon: <X className="h-4 w-4 text-red-500" />
        };
      default:
        return {
          containerClass: "bg-white border-gray-200",
          headerClass: "bg-slate-50 text-slate-700 border-b border-gray-200",
          icon: null
        };
    }
  };

  const { containerClass, headerClass, icon } = getTypeStyles();

  return (
    <div className={`rounded-md overflow-hidden border ${containerClass}`}>
      <div className={`px-3 py-2 ${headerClass}`}>
        <div className="flex items-center space-x-1.5">
          {icon}
          <span className="font-medium text-sm">{title}</span>
        </div>
      </div>
      <div className="bg-[#0d1117] text-gray-300 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-800 bg-[#161b22]">
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