
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";

interface EndpointExampleProps {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
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
  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      <div className="border-b bg-muted/50 p-4">
        <div className="flex items-center">
          <span className={`method-tag method-${method.toLowerCase()}`}>{method}</span>
          <code className="font-mono text-sm ml-2">{path}</code>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="p-4 space-y-4">
        {requestExample && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Ejemplo de petición</h4>
            <CodeBlock code={requestExample} />
          </div>
        )}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Ejemplo de respuesta</h4>
          <CodeBlock code={responseExample} />
        </div>
      </div>
    </div>
  );
}
