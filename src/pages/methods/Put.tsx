import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { EndpointExample } from "@/components/EndpointExample";
import { RouteExample } from "@/components/RouteExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const PutMethodPage = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Método PUT" 
        description="El método PUT se utiliza para reemplazar todas las representaciones actuales del recurso de destino con la carga útil de la petición. A diferencia de PATCH, que permite actualizaciones parciales, PUT exige una representación completa del recurso."
        path={["Inicio", "Métodos HTTP", "PUT"]}
      >
        {/* Características principales */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Reemplaza completamente
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Sustituye la totalidad del recurso, no solo partes específicas.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Es idempotente
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Múltiples solicitudes idénticas tienen el mismo efecto que una sola.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <X className="h-4 w-4 text-red-600 dark:text-red-500 mr-2" />
                No es seguro
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Modifica el estado del servidor (no es de solo lectura).
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Requiere URI específica
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Se aplica directamente al recurso que se actualizará o creará.
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
                <h3 className="text-lg font-medium mb-2">Actualización completa de un recurso</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Reemplaza todas las propiedades de un producto</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="PUT"
                  path="/api/v1/products/prod_123"
                  description="Actualiza completamente un producto existente"
                  requestExample={`{
  "name": "Smartphone Pro Max",
  "description": "Versión actualizada del smartphone de alta gama con mayor capacidad",
  "price": 799.99,
  "category": "electronics",
  "stock": 25,
  "specifications": {
    "screen": "6.7 inches",
    "processor": "Octa-core 2.8GHz",
    "ram": "12GB",
    "storage": "256GB",
    "camera": "108MP ultra-wide"
  }
}`}
                  responseExample={`{
  "id": "prod_123",
  "name": "Smartphone Pro Max",
  "description": "Versión actualizada del smartphone de alta gama con mayor capacidad",
  "price": 799.99,
  "category": "electronics",
  "stock": 25,
  "specifications": {
    "screen": "6.7 inches",
    "processor": "Octa-core 2.8GHz",
    "ram": "12GB",
    "storage": "256GB",
    "camera": "108MP ultra-wide"
  },
  "updated_at": "2023-06-11T09:15:00Z"
}`}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium mb-2">Creación de un recurso con un identificador conocido</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Crea un recurso donde el cliente define el identificador</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="PUT"
                  path="/api/v1/configurations/app_theme"
                  description="Crea o actualiza una configuración específica"
                  requestExample={`{
  "value": {
    "primary_color": "#3366FF",
    "secondary_color": "#FF6633",
    "dark_mode": true,
    "font_size": "medium"
  },
  "description": "Configuración del tema de la aplicación",
  "scope": "global"
}`}
                  responseExample={`{
  "key": "app_theme",
  "value": {
    "primary_color": "#3366FF",
    "secondary_color": "#FF6633",
    "dark_mode": true,
    "font_size": "medium"
  },
  "description": "Configuración del tema de la aplicación",
  "scope": "global",
  "created_at": "2023-06-11T09:20:00Z",
  "updated_at": "2023-06-11T09:20:00Z"
}`}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium mb-2">Reemplazo completo de una colección</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Reemplaza todos los elementos de una colección</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="PUT"
                  path="/api/v1/users/user_123/preferences"
                  description="Reemplaza todas las preferencias del usuario"
                  requestExample={`{
  "notifications": {
    "email": false,
    "push": true,
    "sms": false
  },
  "privacy": {
    "profile_visibility": "friends",
    "show_online_status": true
  },
  "ui": {
    "theme": "dark",
    "compact_view": true
  }
}`}
                  responseExample={`{
  "user_id": "user_123",
  "notifications": {
    "email": false,
    "push": true,
    "sms": false
  },
  "privacy": {
    "profile_visibility": "friends",
    "show_online_status": true
  },
  "ui": {
    "theme": "dark",
    "compact_view": true
  },
  "updated_at": "2023-06-11T09:25:00Z"
}`}
                />
              </div>
            </div>
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
                  <td className="p-4 text-sm">La actualización fue exitosa y se devuelve el recurso actualizado.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">201 Created</td>
                  <td className="p-4 text-sm">Se creó un nuevo recurso como resultado de la solicitud PUT.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">204 No Content</td>
                  <td className="p-4 text-sm">La actualización fue exitosa pero no se devuelve contenido.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">400 Bad Request</td>
                  <td className="p-4 text-sm">Formato de solicitud inválido o faltan campos obligatorios.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">404 Not Found</td>
                  <td className="p-4 text-sm">El recurso que se intenta actualizar no existe.</td>
                </tr>
                <tr>
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">409 Conflict</td>
                  <td className="p-4 text-sm">La solicitud no pudo completarse debido a un conflicto con el estado actual del recurso.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Mejores prácticas */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Mejores prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100 dark:bg-blue-950/50 dark:border-blue-900/50">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-300 text-base">Validación completa</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              Valida que todos los campos obligatorios estén presentes y sean válidos en la solicitud PUT. 
              Dado que PUT reemplaza completamente el recurso, la falta de campos obligatorios debería resultar en un error.
            </AlertDescription>
          </Alert>
          
          <div className="mt-6 space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium">Ejemplos de códigos de estado apropiados</h3>
              </div>
              <div className="p-5">
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li><strong>200 OK</strong>: El recurso se actualizó correctamente (incluye la representación actualizada).</li>
                  <li><strong>201 Created</strong>: El recurso se creó correctamente (cuando PUT se usa para crear).</li>
                  <li><strong>204 No Content</strong>: El recurso se actualizó correctamente (sin cuerpo de respuesta).</li>
                  <li><strong>400 Bad Request</strong>: La solicitud tiene un formato inválido o faltan campos obligatorios.</li>
                  <li><strong>404 Not Found</strong>: El recurso que se intenta actualizar no existe.</li>
                  <li><strong>409 Conflict</strong>: La solicitud no puede completarse debido a un conflicto con el estado actual.</li>
                  <li><strong>412 Precondition Failed</strong>: No se cumplieron las precondiciones (encabezados If-Match, etc.).</li>
                  <li><strong>415 Unsupported Media Type</strong>: El formato de contenido proporcionado no es soportado.</li>
                </ul>
              </div>
            </div>
            
            <Alert variant="default" className="bg-amber-50 border-amber-100 dark:bg-amber-950/50 dark:border-amber-900/50">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <AlertTitle className="text-amber-800 dark:text-amber-300 text-base">Actualizaciones concurrentes</AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-400">
                Para prevenir actualizaciones concurrentes problemáticas, utiliza encabezados condicionales:
                <ul className="list-disc ml-6 mt-2">
                  <li>If-Match: Permite la actualización solo si el ETag coincide con el valor proporcionado</li>
                  <li>If-Unmodified-Since: Permite la actualización solo si el recurso no ha cambiado desde la fecha especificada</li>
                </ul>
                <div className="mt-4">
                  <CodeBlock
                    code={`PUT /api/v1/products/prod_123 HTTP/1.1
Host: api.ejemplo.com
If-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Content-Type: application/json

{
  "name": "Smartphone Pro Max",
  "price": 799.99,
  ...
}`}
                    language="http"
                  />
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </section>
        
        {/* Creación vs. actualización con PUT */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Creación vs. actualización con PUT</h2>
          
          <p className="text-slate-700 dark:text-slate-300">
            PUT puede utilizarse tanto para crear como para actualizar recursos, dependiendo de si el recurso ya existe:
          </p>
          
          <div className="mt-4 border rounded-lg overflow-hidden shadow-sm">
            <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
              <h3 className="text-lg font-medium">Comportamiento en APIs RESTful</h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-base mb-3">Si el recurso no existe:</h4>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                    <li>Se crea el recurso con los datos proporcionados</li>
                    <li>Se devuelve el código 201 Created</li>
                    <li>Se incluye la cabecera Location con la URI del recurso</li>
                    <li>Opcionalmente se devuelve la representación del recurso creado</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-base mb-3">Si el recurso ya existe:</h4>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                    <li>Se reemplaza completamente el recurso existente</li>
                    <li>Se devuelve el código 200 OK o 204 No Content</li>
                    <li>Opcionalmente se devuelve la representación actualizada</li>
                    <li>Los campos no incluidos en la solicitud se eliminan o reciben valores por defecto</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <Alert className="bg-slate-50 border-slate-100 dark:bg-slate-900/50 dark:border-slate-800">
            <Info className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <AlertTitle className="text-slate-800 dark:text-slate-200 text-base">Cuándo elegir PUT para crear recursos</AlertTitle>
            <AlertDescription className="text-slate-700 dark:text-slate-300">
              PUT es la mejor opción para crear recursos cuando:
              <ul className="list-disc ml-6 mt-2">
                <li>El cliente determina el identificador del recurso (por ejemplo, una configuración con clave conocida)</li>
                <li>Quieres comportamiento idempotente incluso en la creación</li>
                <li>Deseas un comportamiento unificado para crear o actualizar (upsert)</li>
              </ul>
            </AlertDescription>
          </Alert>
        </section>
        
        {/* PUT vs. POST */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">PUT vs. POST</h2>
          
          <div className="overflow-hidden border rounded-lg shadow-sm">
            <table className="w-full border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Característica</th>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">PUT</th>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">POST</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4 font-medium text-slate-700 dark:text-slate-300">URI del recurso</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">El cliente especifica la URI exacta</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">El servidor determina la URI</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700 dark:text-slate-300">Idempotencia</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">Siempre idempotente</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">No idempotente</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700 dark:text-slate-300">Creación de recursos</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-1 flex-shrink-0" />
                      <span>Cuando el cliente conoce la URI</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-1 flex-shrink-0" />
                      <span>Cuando el servidor asigna la URI</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700 dark:text-slate-300">Semántica principal</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">Reemplazar un recurso existente</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">Crear un nuevo recurso</td>
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
              <p className="text-sm text-slate-600 dark:text-slate-400">Crear nuevos recursos</p>
            </Link>
            <Link to="/methods/patch" className="block p-5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Método PATCH</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Actualizar parcialmente recursos</p>
            </Link>
            <Link to="/status-codes" className="block p-5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Códigos de estado</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Significado de los códigos HTTP</p>
            </Link>
          </div>
        </section>
      </PageContent>
    </PageLayout>
  );
};

export default PutMethodPage;
