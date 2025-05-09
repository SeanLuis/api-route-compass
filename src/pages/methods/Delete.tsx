import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { EndpointExample } from "@/components/EndpointExample";
import { RouteExample } from "@/components/RouteExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const DeleteMethodPage = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Método DELETE" 
        description="El método DELETE se utiliza para eliminar un recurso identificado por una URI específica. Es uno de los métodos fundamentales en REST y permite a los clientes solicitar la eliminación de recursos del servidor."
        path={["Inicio", "Métodos HTTP", "DELETE"]}
      >
        {/* Características principales */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Es idempotente
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Múltiples solicitudes DELETE idénticas tienen el mismo efecto que una sola.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <X className="h-4 w-4 text-red-600 dark:text-red-500 mr-2" />
                No es seguro
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Modifica el estado en el servidor al eliminar recursos.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                URI específica
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Siempre opera sobre un recurso específico identificado por su URI.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Sin cuerpo en la solicitud
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Típicamente no requiere payload, aunque puede aceptarlo en casos especiales.
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
                <h3 className="text-lg font-medium mb-2">Eliminación simple de un recurso</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Elimina un producto específico</p>
              </div>
              <div className="p-5">
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
        
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium mb-2">Eliminación con respuesta vacía</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Cierra una sesión del usuario (logout)</p>
              </div>
              <div className="p-5">
                <EndpointExample
                  method="DELETE"
                  path="/api/v1/sessions/session_789"
                  description="Cierra una sesión del usuario (logout)"
                  responseExample=""
                />
              </div>
            </div>
        
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium mb-2">Eliminación con parámetros</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Elimina un dispositivo y envía notificación</p>
              </div>
              <div className="p-5">
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
        
        {/* Códigos de estado apropiados */}
        <section className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Códigos de estado apropiados</h2>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 w-[140px] font-medium">200 OK</td>
                  <td className="p-4 text-sm">Eliminación exitosa con información sobre el recurso eliminado en la respuesta.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">202 Accepted</td>
                  <td className="p-4 text-sm">La solicitud ha sido aceptada pero la eliminación se realizará más tarde.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">204 No Content</td>
                  <td className="p-4 text-sm">Eliminación exitosa sin contenido en la respuesta.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">404 Not Found</td>
                  <td className="p-4 text-sm">El recurso a eliminar no existe.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">409 Conflict</td>
                  <td className="p-4 text-sm">No se puede eliminar debido a un conflicto (ej. tiene dependencias).</td>
                </tr>
                <tr>
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">423 Locked</td>
                  <td className="p-4 text-sm">El recurso está bloqueado y no puede eliminarse temporalmente.</td>
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
            <AlertTitle className="text-blue-800 dark:text-blue-300 text-base">Eliminación condicional</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              Usa encabezados condicionales para evitar eliminar versiones más recientes de un recurso.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-6 mt-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium">Uso de encabezados condicionales</h3>
              </div>
              <div className="p-5">
                <CodeBlock
                  code={`DELETE /api/v1/documents/doc_456
If-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"`}
                  language="http"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                  <h3 className="text-lg font-medium">Eliminación permanente</h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">Elimina completamente el recurso del sistema.</p>
                  <CodeBlock
                    code={`DELETE /api/v1/temp-files/file_123

HTTP/1.1 204 No Content`}
                    language="http"
                  />
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                  <h3 className="text-lg font-medium">Eliminación suave</h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">Marca el recurso como eliminado, pero lo mantiene en el sistema.</p>
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
          
            <Alert variant="default" className="bg-amber-50 border-amber-100 dark:bg-amber-950/50 dark:border-amber-900/50">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <AlertTitle className="text-amber-800 dark:text-amber-300 text-base">Manejo de recursos con dependencias</AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-400">
                Ten cuidado al eliminar recursos que puedan tener dependencias. Considera
                rechazar la eliminación o implementar eliminación en cascada con opciones de control.
              </AlertDescription>
            </Alert>
          </div>
        </section>
        
        {/* Consideraciones de seguridad */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Consideraciones de seguridad</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Auditoría y registro</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Registra siempre las operaciones DELETE para fines de auditoría y recuperación.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Autorización estricta</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Implementa controles de autorización especialmente estrictos para operaciones DELETE.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Sistema de papelera</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Para recursos importantes, considera implementar un sistema de papelera que permita
                recuperar elementos eliminados.
              </p>
            </div>
          </div>
        </section>
        
        {/* Relacionados */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/methods/patch" className="block p-5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Método PATCH</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Actualizar parcialmente recursos</p>
            </Link>
            <Link to="/methods/put" className="block p-5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Método PUT</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Reemplazar recursos completamente</p>
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

export default DeleteMethodPage;
