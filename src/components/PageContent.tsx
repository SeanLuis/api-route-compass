
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
    <div className="space-y-8">
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
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">{title}</h1>
        {description && <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>}
      </div>
      
      <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-lead:text-slate-500 dark:prose-lead:text-slate-400 prose-p:leading-7 prose-p:mb-6 prose-li:leading-7">
        {children}
      </div>
    </div>
  );
}
