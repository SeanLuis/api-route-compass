
import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";

const Delete = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Método DELETE" 
        description="Uso correcto del método DELETE para eliminar recursos."
        path={["Métodos HTTP", "DELETE"]}
      >
        <p>
          El método DELETE se utiliza para eliminar un recurso identificado por una URI específica. Es uno de los
          métodos fundamentales en REST y permite a los clientes solicitar la eliminación de recursos del servidor.
        </p>
        
        <h2>Principios del Método DELETE</h2>
        
        <ul>
          <li><strong>Idempotente:</strong> Múltiples solicitudes DELETE idénticas tienen el mismo efecto que una sola</li>
          <li><strong>No seguro:</strong> Modifica el estado en el servidor</li>
          <li><strong>Recurso identificado:</strong> Siempre opera sobre un recurso específico identificado por su URI</li>
          <li><strong>Sin cuerpo en la solicitud:</strong> Típicamente no requiere payload (aunque puede aceptarlo)</li>
        </ul>
        
        <h2>Casos de Uso</h2>
        
        <h3>1. Eliminación Simple de un Recurso</h3>
        
        <EndpointExample
          method="DELETE"
          path="/api/v1/products/prod_123"
          description="Elimina un producto específico."
          responseExample={`{
  "id": "prod_123",
  "deleted": true,
  "message": "El producto ha sido eliminado correctamente"
}`}
        />
        
        <h3>2. Eliminación con Respuesta Vacía</h3>
        
        <EndpointExample
          method="DELETE"
          path="/api/v1/sessions/session_789"
          description="Cierra una sesión del usuario (logout)."
          responseExample={``}
        />
        
        <h3>3. Eliminación con Parámetros</h3>
        
        <EndpointExample
          method="DELETE"
          path="/api/v1/users/user_456/devices/dev_789?notify=true"
          description="Elimina un dispositivo asociado a un usuario y envía notificación."
          responseExample={`{
  "device_id": "dev_789",
  "deleted_at": "2023-06-11T10:30:00Z",
  "notification_sent": true,
  "user_id": "user_456"
}`}
        />
        
        <h2>Buenas Prácticas</h2>
        
        <h3>Códigos de Estado Apropiados</h3>
        <p>
          Utiliza los códigos de estado correctos para las respuestas DELETE:
        </p>
        
        <ul>
          <li><strong>200 OK:</strong> Eliminación exitosa con información sobre el recurso eliminado en la respuesta</li>
          <li><strong>202 Accepted:</strong> La solicitud ha sido aceptada pero la eliminación se realizará más tarde</li>
          <li><strong>204 No Content:</strong> Eliminación exitosa sin contenido en la respuesta</li>
          <li><strong>404 Not Found:</strong> El recurso a eliminar no existe</li>
          <li><strong>409 Conflict:</strong> No se puede eliminar debido a un conflicto (ej. tiene dependencias)</li>
          <li><strong>412 Precondition Failed:</strong> No se cumplieron las precondiciones para la eliminación</li>
          <li><strong>423 Locked:</strong> El recurso está bloqueado y no puede eliminarse temporalmente</li>
        </ul>
        
        <h3>Eliminación Condicional</h3>
        <p>
          Usa encabezados condicionales para evitar eliminar versiones más recientes de un recurso:
        </p>
        
        <CodeBlock
          code={`DELETE /api/v1/documents/doc_456
If-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"`}
          language="http"
        />
        
        <h3>Eliminación Segura vs. Eliminación Suave</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
          <div className="border rounded-md p-4">
            <h4 className="font-semibold mb-2">Eliminación Permanente</h4>
            <p className="text-sm">Elimina completamente el recurso del sistema.</p>
            <CodeBlock
              code={`DELETE /api/v1/temp-files/file_123

HTTP/1.1 204 No Content`}
              language="http"
              className="mt-4"
            />
          </div>
          <div className="border rounded-md p-4">
            <h4 className="font-semibold mb-2">Eliminación Suave</h4>
            <p className="text-sm">Marca el recurso como eliminado, pero lo mantiene en el sistema.</p>
            <CodeBlock
              code={`DELETE /api/v1/users/user_456

HTTP/1.1 200 OK
{
  "id": "user_456",
  "status": "deleted",
  "deleted_at": "2023-06-11T10:45:00Z",
  "purge_scheduled": "2023-07-11T10:45:00Z"
}`}
              language="http"
              className="mt-4"
            />
          </div>
        </div>
        
        <h3>Manejo de Recursos con Dependencias</h3>
        <p>
          Cuando un recurso tiene dependencias, considera estas opciones:
        </p>
        
        <ul>
          <li><strong>Rechazar la eliminación:</strong> Devuelve un error si hay dependencias activas</li>
          <li><strong>Eliminación en cascada:</strong> Elimina el recurso y todas sus dependencias</li>
          <li><strong>Parámetros de control:</strong> Usa parámetros para controlar el comportamiento</li>
        </ul>
        
        <CodeBlock
          code={`# Rechazar eliminación
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
        
        <h3>Cuerpo en Solicitudes DELETE</h3>
        <p>
          Aunque no es común, a veces es útil incluir un cuerpo en las solicitudes DELETE:
        </p>
        
        <CodeBlock
          code={`DELETE /api/v1/emails
Content-Type: application/json

{
  "filter": {
    "folder": "spam",
    "older_than": "30d",
    "read": true
  },
  "permanently": true
}`}
          language="http"
        />
        
        <p>
          Sin embargo, ten en cuenta que algunos proxies y clientes antiguos pueden no manejar correctamente cuerpos en solicitudes DELETE.
        </p>
        
        <h2>Consideraciones de Seguridad</h2>
        
        <h3>Auditoría y Registro</h3>
        <p>
          Siempre registra las operaciones DELETE para fines de auditoría y recuperación:
        </p>
        <ul>
          <li>Quién realizó la eliminación</li>
          <li>Cuándo se realizó</li>
          <li>Qué se eliminó exactamente</li>
          <li>Desde qué IP/dispositivo</li>
        </ul>
        
        <h3>Autorización Estricta</h3>
        <p>
          Implementa controles de autorización especialmente estrictos para operaciones DELETE:
        </p>
        <ul>
          <li>Verifica permisos de eliminación específicos</li>
          <li>Considera requerir autenticación de dos factores para eliminaciones sensibles</li>
          <li>Implementa confirmaciones adicionales para eliminaciones masivas</li>
        </ul>
        
        <h3>Recuperación y Papelera</h3>
        <p>
          Para recursos importantes, considera implementar un sistema de papelera:
        </p>
        
        <EndpointExample
          method="POST"
          path="/api/v1/trash/user_456/restore"
          description="Restaura un usuario eliminado previamente."
          responseExample={`{
  "id": "user_456",
  "status": "active",
  "restored_at": "2023-06-11T11:30:00Z",
  "restored_items": ["profile", "settings", "connections"]
}`}
        />
        
        <blockquote>
          "El método DELETE, aunque conceptualmente simple, requiere una implementación cuidadosa para 
          equilibrar la usabilidad con la protección contra eliminaciones accidentales. Una API bien diseñada 
          ofrece opciones flexibles para la eliminación de recursos, considerando siempre las implicaciones 
          de seguridad y recuperación."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default Delete;
