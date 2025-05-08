
import { PageLayout } from "@/components/PageLayout";
import { EndpointExample } from "@/components/EndpointExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { RouteExample } from "@/components/RouteExample";

const DeleteMethodPage = () => {
  return (
    <PageLayout>
      <div className="space-y-10 max-w-3xl mx-auto">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm font-medium">DELETE</div>
            <Link to="/methods" className="text-sm text-slate-500 hover:text-slate-700">Métodos HTTP</Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mt-3 mb-4 text-slate-900">Método DELETE</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            El método DELETE se utiliza para eliminar un recurso identificado por una URI específica. Es uno de los
            métodos fundamentales en REST y permite a los clientes solicitar la eliminación de recursos del servidor.
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
                Múltiples solicitudes DELETE idénticas tienen el mismo efecto que una sola.
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="flex items-center text-base font-medium mb-2 text-slate-900">
                <X className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
                No es seguro
              </h3>
              <p className="text-slate-600">
                Modifica el estado en el servidor al eliminar recursos.
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="flex items-center text-base font-medium mb-2 text-slate-900">
                <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                URI específica
              </h3>
              <p className="text-slate-600">
                Siempre opera sobre un recurso específico identificado por su URI.
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="flex items-center text-base font-medium mb-2 text-slate-900">
                <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                Sin cuerpo en la solicitud
              </h3>
              <p className="text-slate-600">
                Típicamente no requiere payload, aunque puede aceptarlo en casos especiales.
              </p>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Casos de uso comunes</h2>
          
          <div className="space-y-6">
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Eliminación simple de un recurso</h3>
              </div>
              <div className="p-0">
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
            </div>
        
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Eliminación con respuesta vacía</h3>
              </div>
              <div className="p-0">
                <EndpointExample
                  method="DELETE"
                  path="/api/v1/sessions/session_789"
                  description="Cierra una sesión del usuario (logout)"
                  responseExample=""
                />
              </div>
            </div>
        
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Eliminación con parámetros</h3>
              </div>
              <div className="p-0">
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
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Códigos de estado apropiados</h2>
          
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
                  <td className="p-4 text-slate-600">Eliminación exitosa con información sobre el recurso eliminado en la respuesta.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">202 Accepted</td>
                  <td className="p-4 text-slate-600">La solicitud ha sido aceptada pero la eliminación se realizará más tarde.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">204 No Content</td>
                  <td className="p-4 text-slate-600">Eliminación exitosa sin contenido en la respuesta.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">404 Not Found</td>
                  <td className="p-4 text-slate-600">El recurso a eliminar no existe.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">409 Conflict</td>
                  <td className="p-4 text-slate-600">No se puede eliminar debido a un conflicto (ej. tiene dependencias).</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">423 Locked</td>
                  <td className="p-4 text-slate-600">El recurso está bloqueado y no puede eliminarse temporalmente.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Mejores prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100 rounded-xl shadow-sm">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-800 font-medium">Eliminación condicional</AlertTitle>
            <AlertDescription className="text-blue-700">
              Usa encabezados condicionales para evitar eliminar versiones más recientes de un recurso.
            </AlertDescription>
          </Alert>
          
          <div className="p-0 border rounded-xl overflow-hidden shadow-sm mt-6">
            <div className="p-5 border-b bg-slate-50">
              <h3 className="text-base font-medium text-slate-900">Uso de encabezados condicionales</h3>
            </div>
            <div className="p-5 bg-white">
              <CodeBlock
                code={`DELETE /api/v1/documents/doc_456
If-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"`}
                language="http"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Eliminación permanente</h3>
              </div>
              <div className="p-5 bg-white">
                <p className="text-slate-600 mb-4">Elimina completamente el recurso del sistema.</p>
                <CodeBlock
                  code={`DELETE /api/v1/temp-files/file_123

HTTP/1.1 204 No Content`}
                  language="http"
                />
              </div>
            </div>
            
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-base font-medium text-slate-900">Eliminación suave</h3>
              </div>
              <div className="p-5 bg-white">
                <p className="text-slate-600 mb-4">Marca el recurso como eliminado, pero lo mantiene en el sistema.</p>
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
          </div>
        
          <Alert variant="default" className="bg-amber-50 border-amber-100 rounded-xl shadow-sm mt-6">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertTitle className="text-amber-800 font-medium">Manejo de recursos con dependencias</AlertTitle>
            <AlertDescription className="text-amber-700">
              Ten cuidado al eliminar recursos que puedan tener dependencias. Considera
              rechazar la eliminación o implementar eliminación en cascada con opciones de control.
            </AlertDescription>
          </Alert>
          
          <div className="border rounded-xl overflow-hidden shadow-sm mt-6">
            <div className="p-5 border-b bg-slate-50">
              <h3 className="text-base font-medium text-slate-900">Manejo de errores para dependencias</h3>
            </div>
            <div className="p-5 bg-white">
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
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Consideraciones de seguridad</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="font-medium mb-2 text-slate-900">Auditoría y registro</h3>
              <p className="text-slate-600">
                Registra siempre las operaciones DELETE para fines de auditoría y recuperación:
                quién realizó la eliminación, cuándo se realizó, qué se eliminó exactamente y
                desde qué IP/dispositivo.
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="font-medium mb-2 text-slate-900">Autorización estricta</h3>
              <p className="text-slate-600">
                Implementa controles de autorización especialmente estrictos para operaciones DELETE,
                verifica permisos específicos y considera solicitar confirmaciones adicionales para
                eliminaciones sensibles.
              </p>
            </div>
            
            <div className="p-5 border rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
              <h3 className="font-medium mb-2 text-slate-900">Sistema de papelera</h3>
              <p className="text-slate-600">
                Para recursos importantes, considera implementar un sistema de papelera que permita
                recuperar elementos eliminados durante un período de tiempo determinado.
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
            <Link to="/methods/put" className="block p-5 border rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <h3 className="font-medium mb-1 text-slate-900">Método PUT</h3>
              <p className="text-slate-600 text-sm">Reemplazar recursos completamente</p>
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

export default DeleteMethodPage;
