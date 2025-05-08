
import { PageLayout } from "@/components/PageLayout";
import { EndpointExample } from "@/components/EndpointExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { RouteExample } from "@/components/RouteExample";

const GetMethodPage = () => {
  return (
    <PageLayout>
      <div className="space-y-10 max-w-3xl mx-auto">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium">GET</div>
            <Link to="/methods" className="text-sm text-slate-500 hover:text-slate-700">Métodos HTTP</Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mt-3 mb-4 text-slate-900">Método GET</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            El método GET solicita una representación del recurso especificado. Es el método HTTP más común y se utiliza para la lectura de datos.
          </p>
        </div>

        {/* Main content */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="flex items-center text-base font-medium mb-2 text-slate-900">
                <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                Es seguro
              </h3>
              <p className="text-slate-600">
                Las peticiones GET no modifican el estado del servidor y son idempotentes.
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="flex items-center text-base font-medium mb-2 text-slate-900">
                <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                Es cacheable
              </h3>
              <p className="text-slate-600">
                Las respuestas a peticiones GET pueden ser almacenadas en caché para mejorar el rendimiento.
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="flex items-center text-base font-medium mb-2 text-slate-900">
                <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                Se puede compartir
              </h3>
              <p className="text-slate-600">
                Las URLs de peticiones GET pueden ser compartidas y marcadas como favoritas.
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="flex items-center text-base font-medium mb-2 text-slate-900">
                <X className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
                No para datos sensibles
              </h3>
              <p className="text-slate-600">
                Los parámetros se exponen en la URL, no debe usarse para datos confidenciales.
              </p>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Casos de uso comunes</h2>
          
          <div className="space-y-6">
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Obtener una colección de recursos</h3>
              </div>
              <div className="p-0">
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
            
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Obtener un recurso específico</h3>
              </div>
              <div className="p-0">
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
            
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Filtrado de recursos</h3>
              </div>
              <div className="p-0">
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
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Mejores prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100 rounded-xl shadow-sm">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-800 font-medium">Idempotencia</AlertTitle>
            <AlertDescription className="text-blue-700">
              Las solicitudes GET deben ser idempotentes, lo que significa que realizar la misma solicitud 
              múltiples veces debe tener el mismo efecto que hacerlo una sola vez.
            </AlertDescription>
          </Alert>
          
          <div className="mt-6 space-y-6">
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Utiliza parámetros de consulta para filtrar</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 p-5">
                <div>
                  <h4 className="font-medium text-sm mb-3 text-green-600">Correcto ✓</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border">
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
                  <div className="bg-slate-50 rounded-lg p-4 border">
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
            
            <Alert variant="default" className="bg-amber-50 border-amber-100 rounded-xl shadow-sm">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <AlertTitle className="text-amber-800 font-medium">Cuidado con la longitud de la URL</AlertTitle>
              <AlertDescription className="text-amber-700">
                Las URLs tienen limitaciones de longitud dependiendo del navegador y servidor.
                Si necesitas enviar muchos parámetros, considera usar paginación o endpoints más específicos.
              </AlertDescription>
            </Alert>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Códigos de estado comunes</h2>
          
          <div className="overflow-hidden border rounded-xl shadow-sm">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-slate-900 w-[140px]">Código</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-900">Descripción</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4 font-medium text-slate-700">200 OK</td>
                  <td className="p-4 text-slate-600">La solicitud se completó exitosamente y se devolvió el recurso solicitado.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">304 Not Modified</td>
                  <td className="p-4 text-slate-600">El recurso no ha cambiado desde la última solicitud (usado con caché).</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">400 Bad Request</td>
                  <td className="p-4 text-slate-600">La solicitud contiene parámetros de consulta inválidos o malformados.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">404 Not Found</td>
                  <td className="p-4 text-slate-600">El recurso solicitado no existe.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">403 Forbidden</td>
                  <td className="p-4 text-slate-600">El cliente no tiene permisos para acceder al recurso.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/methods/post" className="block p-5 border rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <h3 className="font-medium mb-1 text-slate-900">Método POST</h3>
              <p className="text-slate-600 text-sm">Crear nuevos recursos en el servidor</p>
            </Link>
            <Link to="/filtering" className="block p-5 border rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <h3 className="font-medium mb-1 text-slate-900">Filtrado</h3>
              <p className="text-slate-600 text-sm">Técnicas avanzadas de filtrado con GET</p>
            </Link>
            <Link to="/pagination" className="block p-5 border rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <h3 className="font-medium mb-1 text-slate-900">Paginación</h3>
              <p className="text-slate-600 text-sm">Estrategias para paginar colecciones grandes</p>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default GetMethodPage;
