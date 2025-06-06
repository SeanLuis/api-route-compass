import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";

interface EndpointExampleProps {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" | "TRACE";
  path: string;
  description: string;
  requestExample?: string;
  responseExample: string;
  className?: string;
}

export function EndpointExample({
  method,
  path,
  description,
  requestExample,
  responseExample,
  className,
}: EndpointExampleProps) {
  const methodColors = {
    get: "bg-blue-500/20 text-blue-700 dark:bg-blue-500/30 dark:text-blue-300",
    post: "bg-green-500/20 text-green-700 dark:bg-green-500/30 dark:text-green-300",
    put: "bg-amber-500/20 text-amber-700 dark:bg-amber-500/30 dark:text-amber-300",
    patch: "bg-cyan-500/20 text-cyan-700 dark:bg-cyan-500/30 dark:text-cyan-300",
    delete: "bg-red-500/20 text-red-700 dark:bg-red-500/30 dark:text-red-300",
    head: "bg-purple-500/20 text-purple-700 dark:bg-purple-500/30 dark:text-purple-300",
    options: "bg-indigo-500/20 text-indigo-700 dark:bg-indigo-500/30 dark:text-indigo-300",
    trace: "bg-teal-500/20 text-teal-700 dark:bg-teal-500/30 dark:text-teal-300"
  };

  const methodColor = methodColors[method.toLowerCase() as keyof typeof methodColors];

  return (
    <div className={cn("border border-border rounded-lg overflow-hidden shadow-sm", className)}>
      <div className="border-b border-border bg-muted/50 p-5">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide ${methodColor}`}>{method}</span>
          <code className="font-mono text-sm text-foreground">{path}</code>
        </div>
        <p className="mt-2.5 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="divide-y divide-border">
        {requestExample && (
          <div className="p-5 space-y-2">
            <h4 className="text-sm font-medium text-foreground flex items-center">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
              Ejemplo de petición
            </h4>
            <CodeBlock code={requestExample} />
          </div>
        )}
        <div className="p-5 space-y-2">
          <h4 className="text-sm font-medium text-foreground flex items-center">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
            Ejemplo de respuesta
          </h4>
          <CodeBlock code={responseExample} />
        </div>
      </div>
    </div>
  );
}
