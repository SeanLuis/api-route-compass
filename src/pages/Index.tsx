import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EndpointExample } from "@/components/EndpointExample";
import { Link } from "react-router-dom";
import { CodeBlock } from "@/components/CodeBlock";
import { 
  BookOpen, 
  Code, 
  FileText, 
  Info, 
  BarChart, 
  Users, 
  Shield, 
  ExternalLink, 
  RefreshCw,
  ArrowRight
} from "lucide-react";

const Index = () => {
  return (
    <PageLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="py-8 border-b border-slate-200">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">API Route Compass</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Guía definitiva para el diseño de APIs REST escalables y mantenibles.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                to="/principles" 
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Comenzar <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                to="/examples" 
                className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
              >
                Ver ejemplos
              </Link>
            </div>
          </div>
        </section>
        
        {/* Main Documentation Sections */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Documentación principal</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SectionCard 
              title="Introducción" 
              description="Fundamentos y estructura de la guía"
              icon={Info}
              links={[
                { title: "Principios REST", href: "/principles" },
                { title: "Estructura de la Guía", href: "/structure" },
              ]}
            />
            
            <SectionCard 
              title="Rutas y Recursos" 
              description="Nomenclatura y estructura de endpoints"
              icon={FileText}
              links={[
                { title: "Nomenclatura", href: "/naming" },
                { title: "Estructura de Rutas", href: "/route-structure" },
                { title: "Jerarquía de Recursos", href: "/resource-hierarchy" },
              ]}
            />
            
            <SectionCard 
              title="Métodos HTTP" 
              description="Uso correcto de verbos y acciones"
              icon={Code}
              links={[
                { title: "GET", href: "/methods/get" },
                { title: "POST", href: "/methods/post" },
                { title: "PUT", href: "/methods/put" },
                { title: "PATCH", href: "/methods/patch" },
                { title: "DELETE", href: "/methods/delete" },
              ]}
            />
            
            <SectionCard 
              title="Funcionalidades" 
              description="Capacidades avanzadas para APIs"
              icon={BarChart}
              links={[
                { title: "Versionado", href: "/versioning" },
                { title: "Paginación", href: "/pagination" },
                { title: "Filtrado", href: "/filtering" },
                { title: "Ordenamiento", href: "/sorting" },
              ]}
            />
            
            <SectionCard 
              title="Relaciones" 
              description="Manejo de entidades relacionadas"
              icon={Users}
              links={[
                { title: "Recursos Anidados", href: "/nested-resources" },
                { title: "Expansión de Campos", href: "/field-expansion" },
              ]}
            />
            
            <SectionCard 
              title="Respuestas" 
              description="Estructura y formatos de respuesta"
              icon={BookOpen}
              links={[
                { title: "Códigos de Estado", href: "/status-codes" },
                { title: "Formatos de Respuesta", href: "/response-formats" },
                { title: "Manejo de Errores", href: "/error-handling" },
              ]}
            />
            
            <SectionCard 
              title="Seguridad" 
              description="Protección y control de acceso"
              icon={Shield}
              links={[
                { title: "Autenticación", href: "/authentication" },
                { title: "Autorización", href: "/authorization" },
                { title: "Mejores Prácticas", href: "/security-practices" },
              ]}
            />
            
            <SectionCard 
              title="Documentación" 
              description="Herramientas para documentar APIs"
              icon={ExternalLink}
              links={[
                { title: "OpenAPI/Swagger", href: "/openapi" },
                { title: "Ejemplos Prácticos", href: "/examples" },
              ]}
            />
            
            <SectionCard 
              title="API Avanzada" 
              description="Conceptos avanzados y alternativas"
              icon={RefreshCw}
              links={[
                { title: "Limitaciones REST", href: "/rest-limitations" },
                { title: "Alternativas", href: "/alternatives" },
                { title: "Patrones Escalables", href: "/scalable-patterns" },
              ]}
            />
          </div>
        </section>
        
        {/* Examples Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Ejemplos Rápidos</h2>
          
          <Tabs defaultValue="basic">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Rutas Básicas</TabsTrigger>
              <TabsTrigger value="filters">Filtros</TabsTrigger>
              <TabsTrigger value="relations">Relaciones</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-6">
              <EndpointExample 
                method="GET"
                path="/api/v1/products"
                description="Obtiene una lista paginada de todos los productos disponibles."
                responseExample={`{
  "data": [
    {
      "id": "prod_123",
      "name": "Producto Premium",
      "price": 29.99,
      "stock": 150,
      "created_at": "2023-05-15T14:30:00Z"
    },
    {
      "id": "prod_124",
      "name": "Producto Básico",
      "price": 9.99,
      "stock": 300,
      "created_at": "2023-05-10T09:15:00Z"
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "per_page": 10,
    "pages": 5,
    "next": "/api/v1/products?page=2"
  }
}`}
              />
              
              <EndpointExample 
                method="GET"
                path="/api/v1/products/{id}"
                description="Obtiene los detalles de un producto específico por su ID."
                responseExample={`{
  "id": "prod_123",
  "name": "Producto Premium",
  "description": "Este es un producto de alta calidad con características exclusivas.",
  "price": 29.99,
  "category": "premium",
  "tags": ["destacado", "popular", "nuevo"],
  "stock": 150,
  "created_at": "2023-05-15T14:30:00Z",
  "updated_at": "2023-06-01T10:45:00Z"
}`}
              />
              
              <EndpointExample 
                method="POST"
                path="/api/v1/products"
                description="Crea un nuevo producto con los datos proporcionados."
                requestExample={`{
  "name": "Nuevo Producto",
  "description": "Descripción del nuevo producto",
  "price": 19.99,
  "category": "standard",
  "tags": ["nuevo", "oferta"]
}`}
                responseExample={`{
  "id": "prod_125",
  "name": "Nuevo Producto",
  "description": "Descripción del nuevo producto",
  "price": 19.99,
  "category": "standard",
  "tags": ["nuevo", "oferta"],
  "stock": 0,
  "created_at": "2023-06-10T08:45:00Z",
  "updated_at": "2023-06-10T08:45:00Z"
}`}
              />
            </TabsContent>
            
            <TabsContent value="filters" className="space-y-4">
              <EndpointExample 
                method="GET"
                path="/api/v1/products?price_min=10&price_max=50&category=premium"
                description="Filtrado por rango de precios y categoría."
                responseExample={`{
  "data": [
    {
      "id": "prod_123",
      "name": "Producto Premium",
      "price": 29.99,
      "category": "premium",
      "stock": 150
    },
    {
      "id": "prod_127",
      "name": "Producto Premium Plus",
      "price": 49.99,
      "category": "premium",
      "stock": 75
    }
  ],
  "pagination": {
    "total": 8,
    "page": 1,
    "per_page": 10,
    "pages": 1
  }
}`}
              />
              
              <EndpointExample 
                method="GET"
                path="/api/v1/products?sort=price:desc&limit=5"
                description="Ordenamiento por precio descendente con límite de resultados."
                responseExample={`{
  "data": [
    {
      "id": "prod_130",
      "name": "Producto Exclusivo",
      "price": 299.99,
      "category": "luxury",
      "stock": 10
    },
    {
      "id": "prod_129",
      "name": "Producto Premium Gold",
      "price": 99.99,
      "category": "premium",
      "stock": 25
    },
    // ... más productos ordenados por precio descendente
  ],
  "pagination": {
    "total": 42,
    "limit": 5,
    "next": "/api/v1/products?sort=price:desc&limit=5&offset=5"
  }
}`}
              />
            </TabsContent>
            
            <TabsContent value="relations" className="space-y-4">
              <EndpointExample 
                method="GET"
                path="/api/v1/users/{id}/orders"
                description="Obtener todas las órdenes de un usuario (relación anidada)."
                responseExample={`{
  "data": [
    {
      "id": "order_845",
      "user_id": "user_123",
      "total": 59.98,
      "status": "completed",
      "created_at": "2023-06-05T14:30:00Z"
    },
    {
      "id": "order_921",
      "user_id": "user_123",
      "total": 29.99,
      "status": "processing",
      "created_at": "2023-06-10T11:45:00Z"
    }
  ],
  "pagination": {
    "total": 2,
    "page": 1,
    "per_page": 10,
    "pages": 1
  }
}`}
              />
              
              <EndpointExample 
                method="GET"
                path="/api/v1/orders/{id}?expand=user,items"
                description="Obtener una orden con expansión de relaciones (usuario y productos)."
                responseExample={`{
  "id": "order_845",
  "total": 59.98,
  "status": "completed",
  "created_at": "2023-06-05T14:30:00Z",
  "user": {
    "id": "user_123",
    "name": "Juan Pérez",
    "email": "juan@example.com"
  },
  "items": [
    {
      "id": "item_431",
      "product_id": "prod_123",
      "name": "Producto Premium",
      "quantity": 1,
      "price": 29.99
    },
    {
      "id": "item_432",
      "product_id": "prod_124",
      "name": "Producto Básico",
      "quantity": 3,
      "price": 9.99
    }
  ]
}`}
              />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </PageLayout>
  );
};

// Section Card Component
const SectionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  links 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType;
  links: { title: string; href: string }[];
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3 bg-slate-50">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-indigo-600" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="space-y-1">
          {links.map((link, index) => (
            <li key={index}>
              <Link 
                to={link.href}
                className="flex items-center text-sm text-slate-800 hover:text-indigo-600 hover:underline py-1"
              >
                <span className="mr-2">•</span> {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to={links[0].href}
          className="mt-3 text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center pt-2"
        >
          Ver documentación <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default Index;
