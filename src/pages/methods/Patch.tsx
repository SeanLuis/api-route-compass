
import { PageLayout } from "@/components/PageLayout";
import { EndpointExample } from "@/components/EndpointExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { RouteExample } from "@/components/RouteExample";

const PatchMethodPage = () => {
  return (
    <PageLayout>
      <div className="space-y-10 max-w-3xl mx-auto">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-md text-sm font-medium">PATCH</div>
            <Link to="/methods" className="text-sm text-slate-500 hover:text-slate-700">Métodos HTTP</Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mt-3 mb-4 text-slate-900">Método PATCH</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            El método PATCH se utiliza para aplicar modificaciones parciales a un recurso. A diferencia de PUT, 
            que reemplaza el recurso completo, PATCH permite actualizar solo los campos específicos que necesitan 
            cambios, lo que lo hace más eficiente para actualizaciones pequeñas o frecuentes.
          </p>
        </div>

        {/* Main content */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="flex items-center text-base font-medium mb-2 text-slate-900">
                <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                Actualización parcial
              </h3>
              <p className="text-slate-600">
                Modifica solo los campos especificados en la solicitud.
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="flex items-center text-base font-medium mb-2 text-slate-900">
                <X className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
                No idempotente por defecto
              </h3>
              <p className="text-slate-600">
                Múltiples solicitudes idénticas pueden producir resultados diferentes.
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="flex items-center text-base font-medium mb-2 text-slate-900">
                <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                Puede ser idempotente
              </h3>
              <p className="text-slate-600">
                Si se implementa con formatos como JSON Patch o JSON Merge Patch.
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="flex items-center text-base font-medium mb-2 text-slate-900">
                <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                Preserva valores
              </h3>
              <p className="text-slate-600">
                Los campos no incluidos en la solicitud mantienen sus valores existentes.
              </p>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Casos de uso comunes</h2>
          
          <div className="space-y-6">
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Actualización parcial con formato simple</h3>
              </div>
              <div className="p-0">
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
            
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Actualización con JSON Patch</h3>
                <p className="text-sm text-slate-600 mt-1">
                  JSON Patch (RFC 6902) proporciona un formato estandarizado para describir cambios en un documento JSON.
                </p>
              </div>
              <div className="p-0">
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
            
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Actualización con JSON Merge Patch</h3>
                <p className="text-sm text-slate-600 mt-1">
                  JSON Merge Patch (RFC 7396) es otra forma estandarizada, más simple que JSON Patch.
                </p>
              </div>
              <div className="p-0">
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
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Formatos para PATCH</h2>
          
          <div className="space-y-6">
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">1. Formato simple (Ad Hoc)</h3>
                <p className="text-sm text-slate-600 mt-1">
                  El formato más común pero menos estandarizado, donde simplemente se envían los campos a actualizar.
                </p>
              </div>
              <div className="p-5">
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
            
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">2. JSON Patch (RFC 6902)</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Un formato basado en operaciones que permite actualizaciones complejas, secuenciales y atómicas.
                </p>
              </div>
              <div className="p-5">
                <CodeBlock
                  code={`PATCH /api/v1/documents/doc_123
Content-Type: application/json-patch+json

[
  { "op": "test", "path": "/version", "value": 2 },
  { "op": "replace", "path": "/title", "value": "Nuevo título" },
  { "op": "add", "path": "/sections/-", "value": { "id": "sec_5", "content": "Nueva sección" } },
  { "op": "move", "from": "/sections/1", "path": "/sections/0" },
  { "op": "copy", "from": "/metadata/author", "path": "/contributors/0" },
  { "op": "remove", "path": "/temporary_data" }
]`}
                  language="http"
                />
                
                <div className="mt-6 p-5 bg-slate-50 rounded-lg border">
                  <h4 className="text-sm font-medium mb-3 text-slate-900">Operaciones disponibles en JSON Patch:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600">
                    <li className="flex items-center"><span className="font-medium text-indigo-600 mr-2 inline-block w-16">add:</span> Añade un valor a un objeto o array</li>
                    <li className="flex items-center"><span className="font-medium text-indigo-600 mr-2 inline-block w-16">remove:</span> Elimina un valor</li>
                    <li className="flex items-center"><span className="font-medium text-indigo-600 mr-2 inline-block w-16">replace:</span> Reemplaza un valor</li>
                    <li className="flex items-center"><span className="font-medium text-indigo-600 mr-2 inline-block w-16">move:</span> Mueve un valor de una ubicación a otra</li>
                    <li className="flex items-center"><span className="font-medium text-indigo-600 mr-2 inline-block w-16">copy:</span> Copia un valor de una ubicación a otra</li>
                    <li className="flex items-center"><span className="font-medium text-indigo-600 mr-2 inline-block w-16">test:</span> Verifica valores antes de aplicar cambios</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">3. JSON Merge Patch (RFC 7396)</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Un formato más simple que JSON Patch, pero que permite manejar correctamente valores nulos.
                </p>
              </div>
              <div className="p-5">
                <CodeBlock
                  code={`PATCH /api/v1/settings/app_123
Content-Type: application/merge-patch+json

{
  "display_name": "Mi Aplicación Pro",
  "theme": {
    "primary_color": "#3498db",
    "dark_mode": true
  },
  "notifications": {
    "email": null,
    "push": true
  }
}`}
                  language="http"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Buenas prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100 rounded-xl shadow-sm">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-800 font-medium">Idempotencia en PATCH</AlertTitle>
            <AlertDescription className="text-blue-700">
              Aunque PATCH no es inherentemente idempotente, puedes hacerlo idempotente usando identificadores de solicitud únicos, operaciones condicionales o JSON Patch con operaciones test.
            </AlertDescription>
          </Alert>
          
          <div className="border rounded-xl overflow-hidden shadow-sm mt-6">
            <div className="p-5 border-b bg-slate-50">
              <h3 className="text-base font-medium text-slate-900">Validación de campos</h3>
              <p className="text-sm text-slate-600 mt-1">
                Valida tanto los campos individuales como el estado final del recurso después de aplicar el parche:
              </p>
            </div>
            <div className="p-5">
              <CodeBlock
                code={`HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{
  "errors": {
    "price": ["El precio no puede ser negativo"],
    "state": ["Un producto no puede estar activo con stock cero"]
  },
  "message": "La actualización produciría un estado inválido del recurso"
}`}
                language="http"
              />
            </div>
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
                  <td className="p-4 text-slate-600">Actualización exitosa con el recurso actualizado en la respuesta.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">204 No Content</td>
                  <td className="p-4 text-slate-600">Actualización exitosa sin contenido en la respuesta.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">400 Bad Request</td>
                  <td className="p-4 text-slate-600">Formato de parche inválido.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">409 Conflict</td>
                  <td className="p-4 text-slate-600">Conflicto con el estado actual del recurso.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">415 Unsupported</td>
                  <td className="p-4 text-slate-600">Formato de parche no soportado.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">422 Unprocessable</td>
                  <td className="p-4 text-slate-600">El parche es válido pero no se puede aplicar.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Errores en JSON Patch</h2>
          
          <div className="border rounded-xl overflow-hidden shadow-sm">
            <div className="p-5 border-b bg-slate-50">
              <h3 className="text-base font-medium text-slate-900">Información detallada de errores</h3>
              <p className="text-sm text-slate-600 mt-1">
                Para JSON Patch, proporciona información detallada sobre qué operación falló:
              </p>
            </div>
            <div className="p-5">
              <CodeBlock
                code={`HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{
  "error": "Error al aplicar JSON Patch",
  "operation_index": 3,
  "operation": { "op": "replace", "path": "/stock", "value": -10 },
  "reason": "El stock no puede ser un valor negativo"
}`}
                language="http"
              />
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/methods/put" className="block p-5 border rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <h3 className="font-medium mb-1 text-slate-900">Método PUT</h3>
              <p className="text-slate-600 text-sm">Reemplazar recursos completamente</p>
            </Link>
            <Link to="/methods/post" className="block p-5 border rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <h3 className="font-medium mb-1 text-slate-900">Método POST</h3>
              <p className="text-slate-600 text-sm">Crear nuevos recursos</p>
            </Link>
            <Link to="/json-formats" className="block p-5 border rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <h3 className="font-medium mb-1 text-slate-900">Formatos JSON</h3>
              <p className="text-slate-600 text-sm">Tipos de formato para APIs REST</p>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default PatchMethodPage;
