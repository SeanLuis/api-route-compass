import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface PageContentProps {
  title: string;
  description?: string;
  path: string[];
  children: React.ReactNode;
}

export const PageContent: React.FC<PageContentProps> = ({
  title,
  description,
  path,
  children,
}) => {
  // Convert paths to links (assuming the last one is the current page)
  const pathLinks = path.map((item, index) => {
    const isLast = index === path.length - 1;
    const href = index === 0 ? "/" : `/${path.slice(0, index).join("/").toLowerCase()}`;
    
    return {
      name: item,
      href: isLast ? undefined : href,
      isLast,
    };
  });

  return (
    <div className="space-y-10 max-w-3xl">
      {/* Page header */}
      <div className="border-b pb-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            {pathLinks.map((link, i) => (
              <React.Fragment key={i}>
                {i > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {link.isLast ? (
                    <BreadcrumbLink>{link.name}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={link.href || "/"}>{link.name}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        
        <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">{title}</h1>
        {description && (
          <p className="text-lg text-slate-700">
            {description}
          </p>
        )}
      </div>

      {/* Main content */}
      <div className="space-y-8">{children}</div>
    </div>
  );
};
