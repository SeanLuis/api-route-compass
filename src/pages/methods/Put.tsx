import { PageLayout } from "@/components/PageLayout";
import { EndpointExample } from "@/components/EndpointExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const PutMethodPage = () => {
  return (
    <PageLayout>
      <div className="space-y-10 max-w-3xl">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-md text-sm font-semibold">PUT</div>
            <Link to="/methods" className="text-sm text-slate-500 hover:text-slate-700">Métodos HTTP</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Método PUT</h1>
          <p className="text-lg text-slate-700">
            El método PUT se utiliza para actualizar un recurso existente o crear uno nuevo cuando conocemos 
            su identificador. A diferencia de PATCH, PUT actualiza el recurso completo, sustituyendo la 
            versión anterior por la nueva representación proporcionada.
          </p>
        </div>

        {/* Main content */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="flex items-center text-base font-medium mb-1">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Es idempotente
              </h3>
              <p className="text-sm text-slate-700">
                Múltiples solicitudes idénticas tienen el mismo efecto que una sola.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="flex items-center text-base font-medium mb-1">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Actualización completa
              </h3>
              <p className="text-sm text-slate-700">
                Reemplaza todo el recurso con la nueva representación proporcionada.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="flex items-center text-base font-medium mb-1">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Creación condicional
              </h3>
              <p className="text-sm text-slate-700">
                Puede crear un recurso si no existe (si el servidor lo permite).
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="flex items-center text-base font-medium mb-1">
                <X className="h-4 w-4 text-red-600 mr-2" />
                No es seguro
              </h3>
              <p className="text-sm text-slate-700">
                Modifica el estado en el servidor al actualizar recursos.
              </p>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Casos de uso comunes</h2>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Actualizar un recurso existente</h3>
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
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Crear un recurso con ID conocido</h3>
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
        </section>
        
        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">PUT vs PATCH</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="text-base font-medium mb-2">PUT</h3>
              <ul className="space-y-2 text-sm">
                <li>• Reemplaza el recurso completo</li>
                <li>• Los campos no incluidos se establecen a sus valores predeterminados o nulos</li>
                <li>• Es idempotente</li>
                <li>• Requiere enviar todos los atributos del recurso</li>
              </ul>
              <div className="mt-4">
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
            
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="text-base font-medium mb-2">PATCH</h3>
              <ul className="space-y-2 text-sm">
                <li>• Actualiza solo los campos especificados</li>
                <li>• Los campos no incluidos mantienen sus valores actuales</li>
                <li>• Puede ser idempotente dependiendo de la implementación</li>
                <li>• Permite enviar solo los atributos que cambian</li>
              </ul>
              <div className="mt-4">
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
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Buenas prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Manejo de recursos inexistentes</AlertTitle>
            <AlertDescription className="text-blue-700">
              Decide una política clara para cuando se hace PUT a un recurso que no existe: crear el recurso o rechazar la operación.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4 mt-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Opción 1: Crear el recurso (201 Created)</h3>
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
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Opción 2: Rechazar la creación (404 Not Found)</h3>
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
          
          <Alert variant="default" className="bg-amber-50 border-amber-100 mt-4">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Validación completa</AlertTitle>
            <AlertDescription className="text-amber-700">
              Como PUT reemplaza el recurso completo, es crucial validar que todos los campos requeridos estén presentes.
            </AlertDescription>
          </Alert>
          
          <div className="p-4 border rounded-lg mt-4">
            <h3 className="text-base font-medium mb-2">Ejemplo de respuesta de error de validación</h3>
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
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Códigos de estado comunes</h2>
          
          <div className="space-y-2">
            <div className="grid grid-cols-[140px_1fr] border-b pb-2">
              <div className="font-medium">200 OK</div>
              <div className="text-sm">El recurso se actualizó correctamente y se devuelve en la respuesta.</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] border-b pb-2">
              <div className="font-medium">201 Created</div>
              <div className="text-sm">Se creó un nuevo recurso cuando no existía previamente.</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] border-b pb-2">
              <div className="font-medium">204 No Content</div>
              <div className="text-sm">La actualización fue exitosa, pero no se devuelve contenido.</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] border-b pb-2">
              <div className="font-medium">400 Bad Request</div>
              <div className="text-sm">La solicitud tiene un formato incorrecto.</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] border-b pb-2">
              <div className="font-medium">404 Not Found</div>
              <div className="text-sm">El recurso no existe (si el servidor no permite la creación).</div>
            </div>
            <div className="grid grid-cols-[140px_1fr]">
              <div className="font-medium">422 Unprocessable</div>
              <div className="text-sm">Los datos son sintácticamente correctos pero semánticamente inválidos.</div>
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Actualizaciones condicionales</h2>
          
          <div className="p-4 border rounded-lg">
            <h3 className="text-base font-medium mb-2">Uso de encabezados condicionales</h3>
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
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Consideraciones de seguridad</h2>
          
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h3 className="font-medium mb-1">Control de acceso estricto</h3>
              <p className="text-sm text-slate-700">
                Implementa controles de autorización estrictos para operaciones PUT, ya que pueden
                reemplazar completamente un recurso y potencialmente eliminar datos existentes.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <h3 className="font-medium mb-1">Campos sensibles</h3>
              <p className="text-sm text-slate-700">
                Considera ocultar campos sensibles en las respuestas (como contraseñas o tokens),
                incluso si fueron proporcionados en la solicitud.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <h3 className="font-medium mb-1">Auditoría y registro</h3>
              <p className="text-sm text-slate-700">
                Registra todos los cambios realizados con PUT para fines de auditoría y para facilitar
                la reversión de cambios no deseados si es necesario.
              </p>
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/methods/patch" className="block p-4 border rounded-lg hover:bg-slate-50">
              <h3 className="font-medium mb-1">Método PATCH</h3>
              <p className="text-sm text-slate-600">Actualizar parcialmente recursos</p>
            </Link>
            <Link to="/methods/post" className="block p-4 border rounded-lg hover:bg-slate-50">
              <h3 className="font-medium mb-1">Método POST</h3>
              <p className="text-sm text-slate-600">Crear nuevos recursos</p>
            </Link>
            <Link to="/status-codes" className="block p-4 border rounded-lg hover:bg-slate-50">
              <h3 className="font-medium mb-1">Códigos de estado</h3>
              <p className="text-sm text-slate-600">Significado de los códigos HTTP</p>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default PutMethodPage;
