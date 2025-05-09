import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { EndpointExample } from "@/components/EndpointExample";
import { RouteExample } from "@/components/RouteExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const GetMethodPage = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Método GET" 
        description="El método GET solicita una representación del recurso especificado. Es el método HTTP más común y se utiliza para la lectura de datos."
        path={["Inicio", "Métodos HTTP", "GET"]}
      >
        {/* Características principales */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Es seguro
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Las peticiones GET no modifican el estado del servidor y son idempotentes.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Es cacheable
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Las respuestas a peticiones GET pueden ser almacenadas en caché para mejorar el rendimiento.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Se puede compartir
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Las URLs de peticiones GET pueden ser compartidas y marcadas como favoritas.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <X className="h-4 w-4 text-red-600 dark:text-red-500 mr-2" />
                No para datos sensibles
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Los parámetros se exponen en la URL, no debe usarse para datos confidenciales.
              </p>
            </div>
          </div>
        </section>
        
        {/* Casos de uso comunes */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Casos de uso comunes</h2>
          
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium mb-2">Obtener una colección de recursos</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Lista todos los productos con paginación por defecto</p>
              </div>
              <div className="p-5">
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
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium mb-2">Obtener un recurso específico</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Obtiene un producto específico por su ID</p>
              </div>
              <div className="p-5">
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
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium mb-2">Filtrado de recursos</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Filtra productos por categoría y disponibilidad</p>
              </div>
              <div className="p-5">
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
          </div>
        </section>
        
        {/* Mejores prácticas */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Mejores prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100 dark:bg-blue-950/50 dark:border-blue-900/50">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-300 text-base">Idempotencia</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              Las solicitudes GET deben ser idempotentes, lo que significa que realizar la misma solicitud 
              múltiples veces debe tener el mismo efecto que hacerlo una sola vez.
            </AlertDescription>
          </Alert>
          
          <div className="mt-6 space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium">Utiliza parámetros de consulta para filtrar</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 p-5">
                <div>
                  <h4 className="font-medium text-sm mb-3 text-green-600">Correcto ✓</h4>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border">
                    <CodeBlock
                      code={`GET /api/v1/products?category=premium
GET /api/v1/products?min_price=10&max_price=50
GET /api/v1/products?sort=price:desc`}
                      language="http"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-3 text-red-600 mt-4 md:mt-0">Incorrecto ❌</h4>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border">
                    <CodeBlock
                      code={`GET /api/v1/products/findByCategory/premium
GET /api/v1/products/filter (con cuerpo de solicitud)
GET /api/v1/getProductsByPrice/10/50`}
                      language="http"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Alert variant="default" className="bg-amber-50 border-amber-100 dark:bg-amber-950/50 dark:border-amber-900/50">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <AlertTitle className="text-amber-800 dark:text-amber-300 text-base">Cuidado con la longitud de la URL</AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-400">
                Las URLs tienen limitaciones de longitud dependiendo del navegador y servidor.
                Si necesitas enviar muchos parámetros, considera usar paginación o endpoints más específicos.
              </AlertDescription>
            </Alert>
          </div>
        </section>
        
        {/* Códigos de estado comunes */}
        <section className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Códigos de estado comunes</h2>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 w-[140px] font-medium">200 OK</td>
                  <td className="p-4 text-sm">La solicitud se completó exitosamente y se devolvió el recurso solicitado.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">304 Not Modified</td>
                  <td className="p-4 text-sm">El recurso no ha cambiado desde la última solicitud (usado con caché).</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">400 Bad Request</td>
                  <td className="p-4 text-sm">La solicitud contiene parámetros de consulta inválidos o malformados.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">404 Not Found</td>
                  <td className="p-4 text-sm">El recurso solicitado no existe.</td>
                </tr>
                <tr>
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">403 Forbidden</td>
                  <td className="p-4 text-sm">El cliente no tiene permisos para acceder al recurso.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Relacionados */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/methods/post" className="block p-5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Método POST</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Crear nuevos recursos en el servidor</p>
            </Link>
            <Link to="/filtering" className="block p-5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Filtrado</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Técnicas avanzadas de filtrado con GET</p>
            </Link>
            <Link to="/pagination" className="block p-5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Paginación</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Estrategias para paginar colecciones grandes</p>
            </Link>
          </div>
        </section>
      </PageContent>
    </PageLayout>
  );
};

export default GetMethodPage;
