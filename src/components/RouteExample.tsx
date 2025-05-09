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
    get: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900/50",
    post: "bg-green-100 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-300 dark:border-green-900/50",
    put: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900/50",
    patch: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-900/50",
    delete: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-900/50",
  };

  const methodColor = methodColors[method.toLowerCase() as keyof typeof methodColors];

  return (
    <div className={cn("flex items-center gap-3 p-4 rounded-lg border border-border bg-muted/50 hover:bg-muted transition-colors", className)}>
      <span className={cn("px-3 py-1.5 text-xs font-bold rounded-md uppercase tracking-wide", methodColor)}>
        {method}
      </span>
      <code className="font-mono text-sm text-foreground flex-1">{path}</code>
      {description && (
        <span className="text-sm text-muted-foreground hidden md:block">{description}</span>
      )}
    </div>
  );
}
