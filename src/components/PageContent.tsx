
import { ReactNode } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { CodeBlock } from "@/components/CodeBlock";
import { Link } from "react-router-dom";

interface PageContentProps {
  title: string;
  description?: string;
  path: string[];
  children: ReactNode;
}

export function PageContent({ title, description, path, children }: PageContentProps) {
  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {path.map((item, index) => (
            index === path.length - 1 ? (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage>{item}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href="#">{item}</BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
            )
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
        {description && <p className="text-lg text-muted-foreground">{description}</p>}
      </div>
      
      <div className="prose max-w-none dark:prose-invert">
        {children}
      </div>
    </div>
  );
}
