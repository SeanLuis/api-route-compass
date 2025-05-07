import { PageLayout } from "@/components/PageLayout";
import { EndpointExample } from "@/components/EndpointExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const GetMethodPage = () => {
  return (
    <PageLayout>
      <div className="space-y-10 max-w-3xl">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm font-semibold">GET</div>
            <Link to="/methods" className="text-sm text-slate-500 hover:text-slate-700">Métodos HTTP</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Método GET</h1>
          <p className="text-lg text-slate-700">
            El método GET solicita una representación del recurso especificado. Es el método HTTP más común y se utiliza para la lectura de datos.
          </p>
        </div>

        {/* Main content */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="flex items-center text-base font-medium mb-1">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Es seguro
              </h3>
              <p className="text-sm text-slate-700">
                Las peticiones GET no modifican el estado del servidor y son idempotentes.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="flex items-center text-base font-medium mb-1">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Es cacheable
              </h3>
              <p className="text-sm text-slate-700">
                Las respuestas a peticiones GET pueden ser almacenadas en caché para mejorar el rendimiento.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="flex items-center text-base font-medium mb-1">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Se puede compartir
              </h3>
              <p className="text-sm text-slate-700">
                Las URLs de peticiones GET pueden ser compartidas y marcadas como favoritas.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="flex items-center text-base font-medium mb-1">
                <X className="h-4 w-4 text-red-600 mr-2" />
                No para datos sensibles
              </h3>
              <p className="text-sm text-slate-700">
                Los parámetros se exponen en la URL, no debe usarse para datos confidenciales.
              </p>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Casos de uso comunes</h2>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Obtener una colección de recursos</h3>
              <EndpointExample 
                method="GET"
                path="/api/v1/products"
                description="Lista todos los productos con paginación por defecto"
                responseExample={`{
  "data": [
    {
      "id": "prod_123",
      "name": "Producto A",
      "price": 29.99
    },
    {
      "id": "prod_124",
      "name": "Producto B",
      "price": 19.99
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "per_page": 10
  }
}`}
              />
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Obtener un recurso específico</h3>
              <EndpointExample 
                method="GET"
                path="/api/v1/products/{id}"
                description="Obtiene un producto específico por su ID"
                responseExample={`{
  "id": "prod_123",
  "name": "Producto Premium",
  "description": "Un producto de alta calidad",
  "price": 29.99,
  "category": "premium",
  "in_stock": true,
  "created_at": "2023-06-10T08:45:00Z"
}`}
              />
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Filtrado de recursos</h3>
              <EndpointExample 
                method="GET"
                path="/api/v1/products?category=premium&in_stock=true"
                description="Filtra productos por categoría y disponibilidad"
                responseExample={`{
  "data": [
    {
      "id": "prod_123",
      "name": "Producto Premium",
      "price": 29.99,
      "category": "premium",
      "in_stock": true
    },
    {
      "id": "prod_125",
      "name": "Producto Premium Plus",
      "price": 49.99,
      "category": "premium",
      "in_stock": true
    }
  ],
  "pagination": {
    "total": 8,
    "page": 1,
    "per_page": 10
  }
}`}
              />
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Mejores prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Idempotencia</AlertTitle>
            <AlertDescription className="text-blue-700">
              Las solicitudes GET deben ser idempotentes, lo que significa que realizar la misma solicitud 
              múltiples veces debe tener el mismo efecto que hacerlo una sola vez.
            </AlertDescription>
          </Alert>
          
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-base font-medium mb-2">Utiliza parámetros de consulta para filtrar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm mb-2 text-green-500">Correcto ✓</h4>
                  <CodeBlock
                    code={`GET /api/v1/products?category=premium
GET /api/v1/products?min_price=10&max_price=50
GET /api/v1/products?sort=price:desc`}
                    language="http"
                    className="h-[120px]"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2 text-red-500">Incorrecto ❌</h4>
                  <CodeBlock
                    code={`GET /api/v1/products/findByCategory/premium
GET /api/v1/products/filter (con cuerpo de solicitud)
GET /api/v1/getProductsByPrice/10/50`}
                    language="http"
                    className="h-[120px]"
                  />
                </div>
              </div>
            </div>
            
            <Alert variant="default" className="bg-amber-50 border-amber-100">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">Cuidado con la longitud de la URL</AlertTitle>
              <AlertDescription className="text-amber-700">
                Las URLs tienen limitaciones de longitud dependiendo del navegador y servidor.
                Si necesitas enviar muchos parámetros, considera usar paginación o endpoints más específicos.
              </AlertDescription>
            </Alert>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Códigos de estado comunes</h2>
          
          <div className="space-y-2">
            <div className="grid grid-cols-[100px_1fr] border-b pb-2">
              <div className="font-medium">200 OK</div>
              <div className="text-sm">La solicitud se completó exitosamente y se devolvió el recurso solicitado.</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] border-b pb-2">
              <div className="font-medium">304 Not Modified</div>
              <div className="text-sm">El recurso no ha cambiado desde la última solicitud (usado con caché).</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] border-b pb-2">
              <div className="font-medium">400 Bad Request</div>
              <div className="text-sm">La solicitud contiene parámetros de consulta inválidos o malformados.</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] border-b pb-2">
              <div className="font-medium">404 Not Found</div>
              <div className="text-sm">El recurso solicitado no existe.</div>
            </div>
            <div className="grid grid-cols-[100px_1fr]">
              <div className="font-medium">403 Forbidden</div>
              <div className="text-sm">El cliente no tiene permisos para acceder al recurso.</div>
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/methods/post" className="block p-4 border rounded-lg hover:bg-slate-50">
              <h3 className="font-medium mb-1">Método POST</h3>
              <p className="text-sm text-slate-600">Crear nuevos recursos en el servidor</p>
            </Link>
            <Link to="/filtering" className="block p-4 border rounded-lg hover:bg-slate-50">
              <h3 className="font-medium mb-1">Filtrado</h3>
              <p className="text-sm text-slate-600">Técnicas avanzadas de filtrado con GET</p>
            </Link>
            <Link to="/pagination" className="block p-4 border rounded-lg hover:bg-slate-50">
              <h3 className="font-medium mb-1">Paginación</h3>
              <p className="text-sm text-slate-600">Estrategias para paginar colecciones grandes</p>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default GetMethodPage;
