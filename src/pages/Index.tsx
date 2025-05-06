
import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EndpointExample } from "@/components/EndpointExample";
import { Link } from "react-router-dom";
import { CodeBlock } from "@/components/CodeBlock";

const Index = () => {
  return (
    <PageLayout>
      <div className="space-y-12">
        <section className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">API Route Compass</h1>
            <p className="text-xl text-muted-foreground">
              Guía definitiva para el diseño de APIs REST escalables y mantenibles.
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Nomenclatura</CardTitle>
                <CardDescription>Convenciones para nombrar recursos y rutas</CardDescription>
              </CardHeader>
              <CardContent>
                <Link 
                  to="/naming"
                  className="text-sm text-primary hover:underline"
                >
                  Ver guía de nomenclatura →
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Métodos HTTP</CardTitle>
                <CardDescription>Uso correcto de verbos y acciones</CardDescription>
              </CardHeader>
              <CardContent>
                <Link 
                  to="/methods"
                  className="text-sm text-primary hover:underline"
                >
                  Ver guía de métodos →
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Estructura de Rutas</CardTitle>
                <CardDescription>Jerarquía y organización de recursos</CardDescription>
              </CardHeader>
              <CardContent>
                <Link 
                  to="/route-structure"
                  className="text-sm text-primary hover:underline"
                >
                  Ver guía de estructura →
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
        
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
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Convenciones de Nomenclatura</h2>
          <div className="prose max-w-none">
            <p>
              Usar convenciones claras para nombrar los recursos es esencial para una API REST intuitiva y consistente:
            </p>
            
            <ul>
              <li><strong>Usar sustantivos en plural</strong> para colecciones</li>
              <li><strong>Evitar verbos</strong> en las rutas principales</li>
              <li><strong>Usar kebab-case</strong> para múltiples palabras</li>
            </ul>
            
            <div className="not-prose my-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm mb-2 text-red-500">Incorrecto ❌</h4>
                  <CodeBlock
                    code={`/getUsersByRole\n/createNewProduct\n/APIEndpoints\n/products.json`}
                    language="http"
                    className="h-[120px]"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2 text-green-500">Correcto ✓</h4>
                  <CodeBlock
                    code={`/users?role=admin\n/products\n/api/endpoints\n/products`}
                    language="http"
                    className="h-[120px]"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Link to="/naming" className="text-sm font-medium text-primary hover:underline">
              Ver guía completa de nomenclatura →
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Index;
