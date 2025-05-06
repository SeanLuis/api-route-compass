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
    get: "bg-blue-100 text-blue-800 border-blue-200",
    post: "bg-green-100 text-green-800 border-green-200",
    put: "bg-amber-100 text-amber-800 border-amber-200",
    patch: "bg-purple-100 text-purple-800 border-purple-200",
    delete: "bg-red-100 text-red-800 border-red-200",
  };

  const methodColor = methodColors[method.toLowerCase() as keyof typeof methodColors];

  return (
    <div className={cn("flex items-center gap-2 p-2 rounded-md border border-gray-200", className)}>
      <span className={cn("px-2 py-1 text-xs font-bold rounded uppercase", methodColor)}>
        {method}
      </span>
      <code className="font-mono text-sm flex-1">{path}</code>
      {description && (
        <span className="text-sm text-muted-foreground">{description}</span>
      )}
    </div>
  );
}
