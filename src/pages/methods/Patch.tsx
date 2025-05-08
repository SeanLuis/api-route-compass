
import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { EndpointExample } from "@/components/EndpointExample";
import { RouteExample } from "@/components/RouteExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const PatchMethodPage = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Método PATCH" 
        description="El método PATCH se utiliza para aplicar modificaciones parciales a un recurso. A diferencia de PUT, que reemplaza el recurso completo, PATCH permite actualizar solo los campos específicos que necesitan cambios."
        path={["Inicio", "Métodos HTTP", "PATCH"]}
      >
        {/* Características principales */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Actualización parcial
              </h3>
              <p className="text-sm text-slate-700">
                Modifica solo los campos especificados en la solicitud.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <X className="h-4 w-4 text-red-600 mr-2" />
                No idempotente por defecto
              </h3>
              <p className="text-sm text-slate-700">
                Múltiples solicitudes idénticas pueden producir resultados diferentes.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Puede ser idempotente
              </h3>
              <p className="text-sm text-slate-700">
                Si se implementa con formatos como JSON Patch o JSON Merge Patch.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Preserva valores
              </h3>
              <p className="text-sm text-slate-700">
                Los campos no incluidos en la solicitud mantienen sus valores existentes.
              </p>
            </div>
          </div>
        </section>
        
        {/* Casos de uso comunes */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Casos de uso comunes</h2>
          
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium mb-2">Actualización parcial con formato simple</h3>
                <p className="text-sm text-slate-600">Actualiza solo algunos campos de un producto</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="PATCH"
                  path="/api/v1/products/prod_123"
                  description="Actualiza solo algunos campos de un producto"
                  requestExample={`{
  "price": 549.99,
  "stock": 75,
  "specifications": {
    "camera": "48MP ultra-wide"
  }
}`}
                  responseExample={`{
  "id": "prod_123",
  "name": "Smartphone Pro",
  "description": "Teléfono inteligente de alta gama",
  "price": 549.99,
  "category": "electronics",
  "stock": 75,
  "specifications": {
    "screen": "6.5 inches",
    "processor": "Octa-core 2.5GHz",
    "ram": "8GB",
    "storage": "128GB",
    "camera": "48MP ultra-wide"
  },
  "created_at": "2023-01-15T10:30:00Z",
  "updated_at": "2023-06-11T09:15:00Z"
}`}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium mb-2">Actualización con JSON Patch</h3>
                <p className="text-sm text-slate-600 mt-1">
                  JSON Patch (RFC 6902) proporciona un formato estandarizado para describir cambios.
                </p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="PATCH"
                  path="/api/v1/products/prod_123"
                  description="Actualiza un producto usando JSON Patch"
                  requestExample={`[
  { "op": "replace", "path": "/price", "value": 549.99 },
  { "op": "replace", "path": "/stock", "value": 75 },
  { "op": "add", "path": "/specifications/camera", "value": "48MP ultra-wide" },
  { "op": "remove", "path": "/tags/2" }
]`}
                  responseExample={`{
  "id": "prod_123",
  "name": "Smartphone Pro",
  "price": 549.99,
  "stock": 75,
  "specifications": {
    "screen": "6.5 inches",
    "processor": "Octa-core 2.5GHz",
    "camera": "48MP ultra-wide"
  },
  "tags": ["smartphone", "5g"],
  "updated_at": "2023-06-11T09:20:00Z"
}`}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium mb-2">Actualización con JSON Merge Patch</h3>
                <p className="text-sm text-slate-600 mt-1">
                  JSON Merge Patch (RFC 7396) es otra forma estandarizada, más simple que JSON Patch.
                </p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="PATCH"
                  path="/api/v1/users/user_123"
                  description="Actualiza información de usuario con JSON Merge Patch"
                  requestExample={`{
  "name": "Juan García",
  "contact": {
    "email": "juan.garcia@example.com",
    "phone": null
  }
}`}
                  responseExample={`{
  "id": "user_123",
  "name": "Juan García",
  "username": "juanito",
  "contact": {
    "email": "juan.garcia@example.com"
  },
  "preferences": {
    "notifications": true,
    "theme": "dark"
  },
  "updated_at": "2023-06-11T09:25:00Z"
}`}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Formatos para PATCH */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Formatos para PATCH</h2>
          
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium">1. Formato simple (Ad Hoc)</h3>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-700 mb-4">
                  El formato más común pero menos estandarizado, donde simplemente se envían los campos a actualizar.
                </p>
                <CodeBlock
                  code={`PATCH /api/v1/profiles/profile_123
Content-Type: application/json

{
  "bio": "Desarrollador full-stack con pasión por la UX",
  "website": "https://mipaginaweb.com"
}`}
                  language="http"
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium">2. JSON Patch (RFC 6902)</h3>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-700 mb-4">
                  Un formato estandarizado que describe una secuencia de operaciones para aplicar a un documento JSON.
                </p>
                <CodeBlock
                  code={`PATCH /api/v1/products/prod_123
Content-Type: application/json-patch+json

[
  { "op": "test", "path": "/price", "value": 499.99 },
  { "op": "replace", "path": "/price", "value": 449.99 },
  { "op": "add", "path": "/promotion", "value": "summer_sale" },
  { "op": "remove", "path": "/tags/1" },
  { "op": "copy", "path": "/description_es", "from": "/description" },
  { "op": "move", "path": "/oldPrice", "from": "/regularPrice" }
]`}
                  language="http"
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium">3. JSON Merge Patch (RFC 7396)</h3>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-700 mb-4">
                  Un formato más simple que JSON Patch, donde el documento enviado se fusiona con el recurso original.
                </p>
                <CodeBlock
                  code={`PATCH /api/v1/users/user_123
Content-Type: application/merge-patch+json

{
  "name": "Ana Rodríguez",
  "settings": {
    "notifications": {
      "email": false
    },
    "language": "es"
  },
  "address": null
}`}
                  language="http"
                />
              </div>
            </div>
          </div>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100 mt-6">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-800 text-base">Especificar el formato</AlertTitle>
            <AlertDescription className="text-blue-700">
              Es importante especificar el formato utilizado mediante el encabezado Content-Type:
              <ul className="list-disc ml-6 mt-2">
                <li>application/json - Para formato simple (Ad Hoc)</li>
                <li>application/json-patch+json - Para JSON Patch (RFC 6902)</li>
                <li>application/merge-patch+json - Para JSON Merge Patch (RFC 7396)</li>
              </ul>
            </AlertDescription>
          </Alert>
        </section>
        
        {/* Códigos de estado comunes */}
        <section className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Códigos de estado comunes</h2>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 w-[140px] font-medium">200 OK</td>
                  <td className="p-4 text-sm">La actualización fue exitosa y se devuelve el recurso actualizado.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">204 No Content</td>
                  <td className="p-4 text-sm">La actualización fue exitosa pero no se devuelve contenido.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">400 Bad Request</td>
                  <td className="p-4 text-sm">Formato de solicitud inválido o violación de reglas de negocio.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">404 Not Found</td>
                  <td className="p-4 text-sm">El recurso que se intenta actualizar no existe.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">409 Conflict</td>
                  <td className="p-4 text-sm">La actualización entra en conflicto con el estado actual del recurso.</td>
                </tr>
                <tr>
                  <td className="p-4 bg-slate-50 font-medium">422 Unprocessable Entity</td>
                  <td className="p-4 text-sm">La solicitud es sintácticamente correcta pero semánticamente errónea.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Mejores prácticas */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Mejores prácticas</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="p-5 border-b bg-slate-50">
                  <h3 className="text-lg font-medium">Uso de formatos estandarizados</h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-700 mb-4">
                    Preferiblemente usa JSON Patch o JSON Merge Patch para ser consistente con los estándares web.
                  </p>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="p-5 border-b bg-slate-50">
                  <h3 className="text-lg font-medium">Validación estricta</h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-700 mb-4">
                    Valida tanto la estructura de la operación como los valores proporcionados antes de aplicar cambios.
                  </p>
                </div>
              </div>
            </div>
            
            <Alert variant="default" className="bg-amber-50 border-amber-100">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <AlertTitle className="text-amber-800 text-base">Operaciones condicionales</AlertTitle>
              <AlertDescription className="text-amber-700">
                Utiliza encabezados condicionales como If-Match o If-Unmodified-Since para evitar problemas de concurrencia.
              </CodeBlock>
              <div className="mt-4">
                <CodeBlock
                  code={`PATCH /api/v1/products/prod_123
If-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Content-Type: application/json

{
  "price": 399.99
}`}
                  language="http"
                />
              </div>
            </AlertDescription>
          </Alert>
        </section>
        
        {/* Diferencias entre PATCH y PUT */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">PATCH vs. PUT</h2>
          
          <div className="overflow-hidden border rounded-lg shadow-sm">
            <table className="w-full border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-4 font-medium text-slate-700">Característica</th>
                  <th className="text-left p-4 font-medium text-slate-700">PATCH</th>
                  <th className="text-left p-4 font-medium text-slate-700">PUT</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4 font-medium text-slate-700">Propósito</td>
                  <td className="p-4 text-sm text-slate-600">Actualización parcial de un recurso</td>
                  <td className="p-4 text-sm text-slate-600">Reemplazo completo de un recurso</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">Campos requeridos</td>
                  <td className="p-4 text-sm text-slate-600">Solo los campos a modificar</td>
                  <td className="p-4 text-sm text-slate-600">Todos los campos del recurso</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">Comportamiento con campos ausentes</td>
                  <td className="p-4 text-sm text-slate-600">Se mantienen los valores actuales</td>
                  <td className="p-4 text-sm text-slate-600">Se eliminan o establecen a valores por defecto</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">Idempotencia</td>
                  <td className="p-4 text-sm text-slate-600">No siempre (depende del formato)</td>
                  <td className="p-4 text-sm text-slate-600">Siempre idempotente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Relacionados */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/methods/put" className="block p-5 border rounded-lg hover:bg-slate-50 transition-colors">
              <h3 className="font-medium mb-2">Método PUT</h3>
              <p className="text-sm text-slate-600">Reemplazar recursos completamente</p>
            </Link>
            <Link to="/methods/post" className="block p-5 border rounded-lg hover:bg-slate-50 transition-colors">
              <h3 className="font-medium mb-2">Método POST</h3>
              <p className="text-sm text-slate-600">Crear nuevos recursos</p>
            </Link>
            <Link to="/status-codes" className="block p-5 border rounded-lg hover:bg-slate-50 transition-colors">
              <h3 className="font-medium mb-2">Códigos de estado</h3>
              <p className="text-sm text-slate-600">Significado de los códigos HTTP</p>
            </Link>
          </div>
        </section>
      </PageContent>
    </PageLayout>
  );
};

export default PatchMethodPage;
