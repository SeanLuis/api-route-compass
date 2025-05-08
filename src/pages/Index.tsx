
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
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="py-12 border-b border-slate-200">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">API Route Compass</h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl">
              Guía definitiva para el diseño de APIs REST escalables y mantenibles que siguen las mejores prácticas de la industria.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/principles" 
                className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
              >
                Comenzar <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                to="/examples" 
                className="inline-flex items-center px-5 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-700"
              >
                Ver ejemplos
              </Link>
            </div>
          </div>
        </section>
        
        {/* Main Documentation Sections */}
        <section className="pt-4">
          <h2 className="text-3xl font-semibold tracking-tight mb-3 text-slate-800">Documentación principal</h2>
          <p className="text-slate-600 mb-8 max-w-3xl">Explora nuestra guía completa para diseñar APIs REST profesionales, organizadas por temas clave.</p>
          
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
        <section className="py-8 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl px-6 my-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-2 text-slate-800">Ejemplos Rápidos</h2>
          <p className="text-slate-600 mb-6">Consulta estos ejemplos prácticos para implementar patrones comunes de API REST.</p>
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="mb-6 bg-white/70 p-1 border border-slate-200">
              <TabsTrigger value="basic" className="text-sm">Rutas Básicas</TabsTrigger>
              <TabsTrigger value="filters" className="text-sm">Filtros</TabsTrigger>
              <TabsTrigger value="relations" className="text-sm">Relaciones</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-8 mt-2">
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
            
            <TabsContent value="filters" className="space-y-8 mt-2">
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
            
            <TabsContent value="relations" className="space-y-8 mt-2">
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

        {/* Features section */}
        <section className="pt-4">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-3">
                Diseño Profesional
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">APIs consistentes y profesionales</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Sigue las mejores prácticas de la industria para crear APIs que sean intuitivas, 
                predecibles y fáciles de mantener a largo plazo.
              </p>
              <ul className="space-y-2">
                {[
                  "Convenciones de nomenclatura",
                  "Estructura de recursos jerárquica",
                  "Uso correcto de métodos HTTP",
                  "Códigos de estado adecuados"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-2 mt-1 rounded-full p-1 bg-indigo-100">
                      <svg className="h-3 w-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-3">
                Documentación Clara
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Ejemplos prácticos y casos de uso reales</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Nuestra documentación ofrece ejemplos concretos que puedes implementar inmediatamente 
                en tus proyectos, con explicaciones detalladas de cada decisión de diseño.
              </p>
              <Link 
                to="/examples" 
                className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-800"
              >
                Explorar ejemplos <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      {/* CTA Footer */}
      <div className="mt-16 mb-8 py-10 px-8 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl text-white text-center">
        <h2 className="text-2xl font-bold mb-4">¿Listo para mejorar tus APIs?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Comienza ahora a aplicar estas prácticas en tus proyectos y crea APIs que los desarrolladores amarán usar.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/principles" 
            className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-slate-100 transition-colors"
          >
            Comenzar el aprendizaje
          </Link>
          <a 
            rel="noopener noreferrer"
            href="https://github.com/username/api-route-compass" 
            target="_blank"
            className="px-6 py-3 bg-indigo-700 text-white font-medium rounded-lg hover:bg-indigo-800 transition-colors"
          >
            <span className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </span>
          </a>
        </div>
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
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 border border-slate-200">
      <CardHeader className="pb-3 bg-slate-50/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-indigo-100">
            <Icon className="h-4 w-4 text-indigo-600" />
          </div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </div>
        <CardDescription className="text-slate-600 mt-1">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 pb-5">
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <Link 
                to={link.href}
                className="flex items-center text-sm text-slate-700 hover:text-indigo-600 hover:underline py-1"
              >
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span> 
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to={links[0].href}
          className="mt-4 text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center pt-2"
        >
          Ver documentación <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default Index;
