import { PageLayout } from "@/components/PageLayout";
import { EndpointExample } from "@/components/EndpointExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const DeleteMethodPage = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm font-semibold">DELETE</div>
            <Link to="/methods" className="text-sm text-slate-500 hover:text-slate-700">Métodos HTTP</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Método DELETE</h1>
          <p className="text-lg text-slate-700">
          El método DELETE se utiliza para eliminar un recurso identificado por una URI específica. Es uno de los
          métodos fundamentales en REST y permite a los clientes solicitar la eliminación de recursos del servidor.
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
                Múltiples solicitudes DELETE idénticas tienen el mismo efecto que una sola.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="flex items-center text-base font-medium mb-1">
                <X className="h-4 w-4 text-red-600 mr-2" />
                No es seguro
              </h3>
              <p className="text-sm text-slate-700">
                Modifica el estado en el servidor al eliminar recursos.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="flex items-center text-base font-medium mb-1">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                URI específica
              </h3>
              <p className="text-sm text-slate-700">
                Siempre opera sobre un recurso específico identificado por su URI.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="flex items-center text-base font-medium mb-1">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Sin cuerpo en la solicitud
              </h3>
              <p className="text-sm text-slate-700">
                Típicamente no requiere payload, aunque puede aceptarlo en casos especiales.
              </p>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Casos de uso comunes</h2>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Eliminación simple de un recurso</h3>
        <EndpointExample
          method="DELETE"
          path="/api/v1/products/prod_123"
                description="Elimina un producto específico"
          responseExample={`{
  "id": "prod_123",
  "deleted": true,
  "message": "El producto ha sido eliminado correctamente"
}`}
        />
            </div>
        
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Eliminación con respuesta vacía</h3>
        <EndpointExample
          method="DELETE"
          path="/api/v1/sessions/session_789"
                description="Cierra una sesión del usuario (logout)"
                responseExample=""
        />
            </div>
        
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Eliminación con parámetros</h3>
        <EndpointExample
          method="DELETE"
          path="/api/v1/users/user_456/devices/dev_789?notify=true"
                description="Elimina un dispositivo y envía notificación"
          responseExample={`{
  "device_id": "dev_789",
  "deleted_at": "2023-06-11T10:30:00Z",
  "notification_sent": true,
  "user_id": "user_456"
}`}
        />
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Códigos de estado apropiados</h2>
          
          <div className="space-y-2">
            <div className="grid grid-cols-[140px_1fr] border-b pb-2">
              <div className="font-medium">200 OK</div>
              <div className="text-sm">Eliminación exitosa con información sobre el recurso eliminado en la respuesta.</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] border-b pb-2">
              <div className="font-medium">202 Accepted</div>
              <div className="text-sm">La solicitud ha sido aceptada pero la eliminación se realizará más tarde.</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] border-b pb-2">
              <div className="font-medium">204 No Content</div>
              <div className="text-sm">Eliminación exitosa sin contenido en la respuesta.</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] border-b pb-2">
              <div className="font-medium">404 Not Found</div>
              <div className="text-sm">El recurso a eliminar no existe.</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] border-b pb-2">
              <div className="font-medium">409 Conflict</div>
              <div className="text-sm">No se puede eliminar debido a un conflicto (ej. tiene dependencias).</div>
            </div>
            <div className="grid grid-cols-[140px_1fr]">
              <div className="font-medium">423 Locked</div>
              <div className="text-sm">El recurso está bloqueado y no puede eliminarse temporalmente.</div>
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Mejores prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Eliminación condicional</AlertTitle>
            <AlertDescription className="text-blue-700">
              Usa encabezados condicionales para evitar eliminar versiones más recientes de un recurso.
            </AlertDescription>
          </Alert>
          
          <div className="p-4 border rounded-lg mt-4">
            <h3 className="text-base font-medium mb-2">Uso de encabezados condicionales</h3>
        <CodeBlock
          code={`DELETE /api/v1/documents/doc_456
If-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"`}
          language="http"
        />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Eliminación permanente</h3>
              <p className="text-sm text-slate-700 mb-3">Elimina completamente el recurso del sistema.</p>
            <CodeBlock
              code={`DELETE /api/v1/temp-files/file_123

HTTP/1.1 204 No Content`}
              language="http"
            />
          </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Eliminación suave</h3>
              <p className="text-sm text-slate-700 mb-3">Marca el recurso como eliminado, pero lo mantiene en el sistema.</p>
            <CodeBlock
              code={`DELETE /api/v1/users/user_456

HTTP/1.1 200 OK
{
  "id": "user_456",
  "status": "deleted",
  "deleted_at": "2023-06-11T10:45:00Z"
}`}
              language="http"
            />
          </div>
        </div>
        
          <Alert variant="default" className="bg-amber-50 border-amber-100 mt-4">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Manejo de recursos con dependencias</AlertTitle>
            <AlertDescription className="text-amber-700">
              Ten cuidado al eliminar recursos que puedan tener dependencias. Considera
              rechazar la eliminación o implementar eliminación en cascada con opciones de control.
            </AlertDescription>
          </Alert>
          
          <div className="p-4 border rounded-lg mt-4">
            <h3 className="text-base font-medium mb-2">Manejo de errores para dependencias</h3>
        <CodeBlock
              code={`# Rechazar eliminación con dependencias
DELETE /api/v1/categories/cat_123
HTTP/1.1 409 Conflict
{
  "error": "No se puede eliminar la categoría",
  "reason": "La categoría tiene productos asociados",
  "dependencies": {
    "products": 15
  }
}

# Permitir eliminación en cascada
DELETE /api/v1/categories/cat_123?cascade=true
HTTP/1.1 200 OK
{
  "id": "cat_123",
  "deleted_at": "2023-06-11T11:00:00Z",
  "dependencies_deleted": {
    "products": 15
  }
}`}
          language="http"
        />
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Consideraciones de seguridad</h2>
          
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h3 className="font-medium mb-1">Auditoría y registro</h3>
              <p className="text-sm text-slate-700">
                Registra siempre las operaciones DELETE para fines de auditoría y recuperación:
                quién realizó la eliminación, cuándo se realizó, qué se eliminó exactamente y
                desde qué IP/dispositivo.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <h3 className="font-medium mb-1">Autorización estricta</h3>
              <p className="text-sm text-slate-700">
                Implementa controles de autorización especialmente estrictos para operaciones DELETE,
                verifica permisos específicos y considera solicitar confirmaciones adicionales para
                eliminaciones sensibles.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <h3 className="font-medium mb-1">Sistema de papelera</h3>
              <p className="text-sm text-slate-700">
                Para recursos importantes, considera implementar un sistema de papelera que permita
                recuperar elementos eliminados durante un período de tiempo determinado.
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
            <Link to="/methods/put" className="block p-4 border rounded-lg hover:bg-slate-50">
              <h3 className="font-medium mb-1">Método PUT</h3>
              <p className="text-sm text-slate-600">Reemplazar recursos completamente</p>
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

export default DeleteMethodPage;
