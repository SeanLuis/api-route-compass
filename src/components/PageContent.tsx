import { ReactNode } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { CodeBlock } from "@/components/CodeBlock";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageContentProps {
  title: string;
  description?: string;
  path: string[];
  children: ReactNode;
}

export function PageContent({ title, description, path, children }: PageContentProps) {
  return (
    <div>
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList className="flex items-center text-sm text-slate-500">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors">Inicio</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </BreadcrumbSeparator>
            {path.map((item, index) => (
              index === path.length - 1 ? (
                <BreadcrumbItem key={index}>
                  <BreadcrumbPage className="text-slate-700 font-medium">{item}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink className="text-slate-600 hover:text-slate-900 transition-colors" href="#">{item}</BreadcrumbLink>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  </BreadcrumbSeparator>
                </BreadcrumbItem>
              )
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="mb-12 space-y-4 border-b border-slate-200 pb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">{title}</h1>
        {description && (
          <p className="text-lg text-slate-500 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      
      <div className="content-container prose prose-slate max-w-none prose-headings:scroll-mt-28">
        {children}
      </div>
    </div>
  );
}
