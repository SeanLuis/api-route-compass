
import { PageLayout } from "@/components/PageLayout";
import { EndpointExample } from "@/components/EndpointExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { RouteExample } from "@/components/RouteExample";

const PutMethodPage = () => {
  return (
    <PageLayout>
      <div className="space-y-10 max-w-3xl mx-auto">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-md text-sm font-medium">PUT</div>
            <Link to="/methods" className="text-sm text-slate-500 hover:text-slate-700">Métodos HTTP</Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mt-3 mb-4 text-slate-900">Método PUT</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            El método PUT se utiliza para actualizar un recurso existente o crear uno nuevo cuando conocemos 
            su identificador. A diferencia de PATCH, PUT actualiza el recurso completo, sustituyendo la 
            versión anterior por la nueva representación proporcionada.
          </p>
        </div>

        {/* Main content */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="flex items-center text-base font-medium mb-2 text-slate-900">
                <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                Es idempotente
              </h3>
              <p className="text-slate-600">
                Múltiples solicitudes idénticas tienen el mismo efecto que una sola.
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="flex items-center text-base font-medium mb-2 text-slate-900">
                <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                Actualización completa
              </h3>
              <p className="text-slate-600">
                Reemplaza todo el recurso con la nueva representación proporcionada.
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="flex items-center text-base font-medium mb-2 text-slate-900">
                <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                Creación condicional
              </h3>
              <p className="text-slate-600">
                Puede crear un recurso si no existe (si el servidor lo permite).
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="flex items-center text-base font-medium mb-2 text-slate-900">
                <X className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
                No es seguro
              </h3>
              <p className="text-slate-600">
                Modifica el estado en el servidor al actualizar recursos.
              </p>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Casos de uso comunes</h2>
          
          <div className="space-y-6">
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Actualizar un recurso existente</h3>
              </div>
              <div className="p-0">
                <EndpointExample 
                  method="PUT"
                  path="/api/v1/products/prod_123"
                  description="Actualiza completamente un producto existente"
                  requestExample={`{
  "name": "Smartphone Pro Max",
  "description": "Versión actualizada con mejor cámara y batería",
  "price": 899.99,
  "category": "electronics",
  "stock": 75,
  "specifications": {
    "screen": "6.7 inches",
    "processor": "Octa-core 3.0GHz",
    "ram": "12GB",
    "storage": "256GB",
    "camera": "108MP"
  },
  "status": "active"
}`}
                  responseExample={`{
  "id": "prod_123",
  "name": "Smartphone Pro Max",
  "description": "Versión actualizada con mejor cámara y batería",
  "price": 899.99,
  "category": "electronics",
  "stock": 75,
  "specifications": {
    "screen": "6.7 inches",
    "processor": "Octa-core 3.0GHz",
    "ram": "12GB",
    "storage": "256GB",
    "camera": "108MP"
  },
  "status": "active",
  "created_at": "2023-01-15T10:30:00Z",
  "updated_at": "2023-06-10T15:45:00Z"
}`}
                />
              </div>
            </div>
            
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Crear un recurso con ID conocido</h3>
              </div>
              <div className="p-0">
                <EndpointExample 
                  method="PUT"
                  path="/api/v1/configurations/email-settings"
                  description="Crea o actualiza una configuración específica"
                  requestExample={`{
  "smtp_server": "smtp.example.com",
  "port": 587,
  "use_ssl": true,
  "username": "notifications@example.com",
  "password": "securePassword123",
  "from_email": "support@example.com",
  "from_name": "Soporte Técnico",
  "retry_attempts": 3
}`}
                  responseExample={`{
  "id": "email-settings",
  "smtp_server": "smtp.example.com",
  "port": 587,
  "use_ssl": true,
  "username": "notifications@example.com",
  "password": "********",
  "from_email": "support@example.com",
  "from_name": "Soporte Técnico",
  "retry_attempts": 3,
  "updated_at": "2023-06-10T16:00:00Z"
}`}
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">PUT vs PATCH</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 bg-slate-50 border-b">
                <h3 className="text-base font-medium text-slate-900">PUT</h3>
              </div>
              <div className="p-5">
                <ul className="space-y-2.5 text-slate-600 mb-5">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span> 
                    Reemplaza el recurso completo
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span> 
                    Los campos no incluidos se establecen a sus valores predeterminados o nulos
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span> 
                    Es idempotente
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span> 
                    Requiere enviar todos los atributos del recurso
                  </li>
                </ul>
                <div className="bg-slate-50 rounded-lg p-4 border">
                  <CodeBlock
                    code={`PUT /api/v1/products/prod_123
{
  "name": "Nuevo Nombre",
  "price": 199.99,
  "description": "Nueva descripción",
  "category": "electronics",
  "stock": 50,
  "status": "active"
  // Todos los campos requeridos
}`}
                    language="http"
                  />
                </div>
              </div>
            </div>
            
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 bg-slate-50 border-b">
                <h3 className="text-base font-medium text-slate-900">PATCH</h3>
              </div>
              <div className="p-5">
                <ul className="space-y-2.5 text-slate-600 mb-5">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span> 
                    Actualiza solo los campos especificados
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span> 
                    Los campos no incluidos mantienen sus valores actuales
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span> 
                    Puede ser idempotente dependiendo de la implementación
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span> 
                    Permite enviar solo los atributos que cambian
                  </li>
                </ul>
                <div className="bg-slate-50 rounded-lg p-4 border">
                  <CodeBlock
                    code={`PATCH /api/v1/products/prod_123
{
  "price": 199.99,
  "stock": 50
  // Solo los campos que cambian
}`}
                    language="http"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Buenas prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100 rounded-xl shadow-sm">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-800 font-medium">Manejo de recursos inexistentes</AlertTitle>
            <AlertDescription className="text-blue-700">
              Decide una política clara para cuando se hace PUT a un recurso que no existe: crear el recurso o rechazar la operación.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-6 mt-6">
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Opción 1: Crear el recurso (201 Created)</h3>
              </div>
              <div className="p-5">
                <CodeBlock
                  code={`PUT /api/v1/products/custom-id-123
{
  "name": "Producto Personalizado",
  "price": 99.99,
  "category": "custom"
}

HTTP/1.1 201 Created
Location: /api/v1/products/custom-id-123`}
                  language="http"
                />
              </div>
            </div>
            
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Opción 2: Rechazar la creación (404 Not Found)</h3>
              </div>
              <div className="p-5">
                <CodeBlock
                  code={`PUT /api/v1/products/nonexistent-id
{
  "name": "Producto Nuevo",
  "price": 99.99
}

HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "El recurso solicitado no existe",
  "message": "No se puede actualizar un producto inexistente"
}`}
                  language="http"
                />
              </div>
            </div>
          </div>
          
          <Alert variant="default" className="bg-amber-50 border-amber-100 rounded-xl shadow-sm mt-6">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertTitle className="text-amber-800 font-medium">Validación completa</AlertTitle>
            <AlertDescription className="text-amber-700">
              Como PUT reemplaza el recurso completo, es crucial validar que todos los campos requeridos estén presentes.
            </AlertDescription>
          </Alert>
          
          <div className="border rounded-xl overflow-hidden shadow-sm mt-6">
            <div className="p-5 border-b bg-slate-50">
              <h3 className="text-base font-medium text-slate-900">Ejemplo de respuesta de error de validación</h3>
            </div>
            <div className="p-5">
              <CodeBlock
                code={`HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{
  "errors": {
    "category": ["La categoría es obligatoria"],
    "name": ["El nombre es obligatorio"],
    "price": ["El precio debe ser positivo"]
  },
  "message": "Faltan campos obligatorios o contienen valores inválidos"
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
                  <td className="p-4 text-slate-600">El recurso se actualizó correctamente y se devuelve en la respuesta.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">201 Created</td>
                  <td className="p-4 text-slate-600">Se creó un nuevo recurso cuando no existía previamente.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">204 No Content</td>
                  <td className="p-4 text-slate-600">La actualización fue exitosa, pero no se devuelve contenido.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">400 Bad Request</td>
                  <td className="p-4 text-slate-600">La solicitud tiene un formato incorrecto.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">404 Not Found</td>
                  <td className="p-4 text-slate-600">El recurso no existe (si el servidor no permite la creación).</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">422 Unprocessable</td>
                  <td className="p-4 text-slate-600">Los datos son sintácticamente correctos pero semánticamente inválidos.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Actualizaciones condicionales</h2>
          
          <div className="border rounded-xl overflow-hidden shadow-sm">
            <div className="p-5 border-b bg-slate-50">
              <h3 className="text-base font-medium text-slate-900">Uso de encabezados condicionales</h3>
            </div>
            <div className="p-5">
              <CodeBlock
                code={`# Solicitud con precondición
PUT /api/v1/products/prod_123
If-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Content-Type: application/json

{
  "name": "Smartphone Ultra Pro",
  "price": 999.99,
  ...
}

# Respuesta si la precondición falla
HTTP/1.1 412 Precondition Failed
Content-Type: application/json

{
  "error": "Conflicto de versión",
  "message": "El recurso ha sido modificado desde la última recuperación"
}`}
                language="http"
              />
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Consideraciones de seguridad</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="font-medium mb-2 text-slate-900">Control de acceso estricto</h3>
              <p className="text-slate-600">
                Implementa controles de autorización estrictos para operaciones PUT, ya que pueden
                reemplazar completamente un recurso y potencialmente eliminar datos existentes.
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="font-medium mb-2 text-slate-900">Campos sensibles</h3>
              <p className="text-slate-600">
                Considera ocultar campos sensibles en las respuestas (como contraseñas o tokens),
                incluso si fueron proporcionados en la solicitud.
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="font-medium mb-2 text-slate-900">Auditoría y registro</h3>
              <p className="text-slate-600">
                Registra todos los cambios realizados con PUT para fines de auditoría y para facilitar
                la reversión de cambios no deseados si es necesario.
              </p>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/methods/patch" className="block p-5 border rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <h3 className="font-medium mb-1 text-slate-900">Método PATCH</h3>
              <p className="text-slate-600 text-sm">Actualizar parcialmente recursos</p>
            </Link>
            <Link to="/methods/post" className="block p-5 border rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <h3 className="font-medium mb-1 text-slate-900">Método POST</h3>
              <p className="text-slate-600 text-sm">Crear nuevos recursos</p>
            </Link>
            <Link to="/status-codes" className="block p-5 border rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <h3 className="font-medium mb-1 text-slate-900">Códigos de estado</h3>
              <p className="text-slate-600 text-sm">Significado de los códigos HTTP</p>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default PutMethodPage;
