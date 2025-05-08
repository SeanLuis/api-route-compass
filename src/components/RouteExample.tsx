
import { cn } from "@/lib/utils";

interface RouteExampleProps {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description?: string;
  className?: string;
}

export function RouteExample({
  method,
  path,
  description,
  className,
}: RouteExampleProps) {
  const methodColors = {
    get: "bg-blue-100 text-blue-700 border-blue-200",
    post: "bg-green-100 text-green-700 border-green-200",
    put: "bg-amber-100 text-amber-700 border-amber-200",
    patch: "bg-cyan-100 text-cyan-700 border-cyan-200",
    delete: "bg-red-100 text-red-700 border-red-200",
  };

  const methodColor = methodColors[method.toLowerCase() as keyof typeof methodColors];

  return (
    <div className={cn("flex items-center gap-3 p-4 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors", className)}>
      <span className={cn("px-3 py-1.5 text-xs font-bold rounded-md uppercase tracking-wide", methodColor)}>
        {method}
      </span>
      <code className="font-mono text-sm text-slate-800 flex-1">{path}</code>
      {description && (
        <span className="text-sm text-slate-500 hidden md:block">{description}</span>
      )}
    </div>
  );
}
