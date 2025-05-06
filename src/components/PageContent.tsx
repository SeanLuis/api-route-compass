import { ReactNode } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
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
          <BreadcrumbList className="flex items-center text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-gray-600 hover:text-gray-900">Inicio</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-3 w-3 text-gray-400" />
            </BreadcrumbSeparator>
            {path.map((item, index) => (
              index === path.length - 1 ? (
                <BreadcrumbItem key={index}>
                  <BreadcrumbPage className="text-gray-800 font-medium">{item}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink className="text-gray-600 hover:text-gray-900" href="#">{item}</BreadcrumbLink>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-3 w-3 text-gray-400" />
                  </BreadcrumbSeparator>
                </BreadcrumbItem>
              )
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="mb-8 border-b border-gray-200 pb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        {description && (
          <p className="text-lg text-gray-600">
            {description}
          </p>
        )}
      </div>
      
      <div className="content-container">
        {children}
      </div>
    </div>
  );
}
