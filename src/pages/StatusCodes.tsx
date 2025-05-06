
import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const StatusCodes = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Códigos de Estado HTTP" 
        description="Uso correcto de los códigos de estado en APIs REST."
        path={["Respuestas", "Códigos de Estado"]}
      >
        <p>
          Los códigos de estado HTTP son una parte esencial de las APIs REST ya que proporcionan 
          información inmediata sobre el resultado de una solicitud HTTP. Usar los códigos de estado
          correctamente mejora la experiencia del desarrollador y facilita la depuración de problemas.
        </p>
        
        <h2>Categorías de Códigos de Estado</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 my-6">
          <Card>
            <CardHeader className="bg-blue-500/10">
              <CardTitle>2xx: Éxito</CardTitle>
              <CardDescription>La solicitud se procesó correctamente</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="bg-yellow-500/10">
              <CardTitle>3xx: Redirección</CardTitle>
              <CardDescription>Se requiere acción adicional</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="bg-orange-500/10">
              <CardTitle>4xx: Error del Cliente</CardTitle>
              <CardDescription>Problema con la solicitud</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="md:col-span-3 lg:col-span-1">
            <CardHeader className="bg-red-500/10">
              <CardTitle>5xx: Error del Servidor</CardTitle>
              <CardDescription>Problema en el servidor</CardDescription>
            </CardHeader>
          </Card>
        </div>
        
        <h2>Códigos de Éxito (2xx)</h2>
        
        <div className="space-y-4 my-6">
          <Card>
            <CardHeader>
              <CardTitle>200 OK</CardTitle>
              <CardDescription>La solicitud se completó exitosamente</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Usado para operaciones GET exitosas y otras operaciones que fueron procesadas correctamente.</p>
              <CodeBlock
                code={`HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "123",
  "name": "Producto Ejemplo"
}`}
                language="http"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>201 Created</CardTitle>
              <CardDescription>El recurso se creó correctamente</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Utilizado después de operaciones POST exitosas que crean nuevos recursos.</p>
              <CodeBlock
                code={`HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/products/456

{
  "id": "456",
  "name": "Nuevo Producto",
  "created_at": "2023-06-15T10:30:00Z"
}`}
                language="http"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>204 No Content</CardTitle>
              <CardDescription>Operación exitosa sin contenido para devolver</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Comúnmente utilizado para operaciones DELETE o actualizaciones parciales donde no es necesario devolver datos.</p>
              <CodeBlock
                code={`HTTP/1.1 204 No Content`}
                language="http"
              />
            </CardContent>
          </Card>
        </div>
        
        <h2>Códigos de Error del Cliente (4xx)</h2>
        
        <div className="space-y-4 my-6">
          <Card>
            <CardHeader>
              <CardTitle>400 Bad Request</CardTitle>
              <CardDescription>La solicitud es inválida o malformada</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Use este código cuando la solicitud no pueda ser procesada debido a sintaxis errónea o parámetros inválidos.</p>
              <CodeBlock
                code={`HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "La solicitud contiene parámetros inválidos",
    "details": [
      {
        "field": "email",
        "message": "Formato de email inválido"
      }
    ]
  }
}`}
                language="http"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>401 Unauthorized</CardTitle>
              <CardDescription>Se requiere autenticación</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">El cliente debe autenticarse para obtener el recurso solicitado.</p>
              <CodeBlock
                code={`HTTP/1.1 401 Unauthorized
Content-Type: application/json
WWW-Authenticate: Bearer

{
  "error": {
    "code": "AUTHENTICATION_REQUIRED",
    "message": "Se requiere autenticación para acceder a este recurso"
  }
}`}
                language="http"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>403 Forbidden</CardTitle>
              <CardDescription>El servidor entiende la solicitud pero rechaza la autorización</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">El cliente no tiene los permisos necesarios para el contenido.</p>
              <CodeBlock
                code={`HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "No tienes permiso para realizar esta acción"
  }
}`}
                language="http"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>404 Not Found</CardTitle>
              <CardDescription>El recurso solicitado no existe</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Usado cuando el recurso solicitado no puede ser encontrado en el servidor.</p>
              <CodeBlock
                code={`HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "El recurso solicitado no existe"
  }
}`}
                language="http"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>422 Unprocessable Entity</CardTitle>
              <CardDescription>La solicitud está bien formada pero tiene errores semánticos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Ideal para errores de validación de datos.</p>
              <CodeBlock
                code={`HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Los datos proporcionados son inválidos",
    "details": [
      {
        "field": "username",
        "message": "El nombre de usuario ya está en uso"
      },
      {
        "field": "age",
        "message": "La edad debe ser mayor de 18"
      }
    ]
  }
}`}
                language="http"
              />
            </CardContent>
          </Card>
        </div>
        
        <h2>Códigos de Error del Servidor (5xx)</h2>
        
        <div className="space-y-4 my-6">
          <Card>
            <CardHeader>
              <CardTitle>500 Internal Server Error</CardTitle>
              <CardDescription>Error genérico del servidor</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Indica que algo inesperado ocurrió en el servidor.</p>
              <CodeBlock
                code={`HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": {
    "code": "SERVER_ERROR",
    "message": "Error interno del servidor",
    "traceId": "abc-123-xyz-456"
  }
}`}
                language="http"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>503 Service Unavailable</CardTitle>
              <CardDescription>El servicio no está disponible temporalmente</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Útil durante mantenimientos programados o cuando el servidor está sobrecargado.</p>
              <CodeBlock
                code={`HTTP/1.1 503 Service Unavailable
Content-Type: application/json
Retry-After: 3600

{
  "error": {
    "code": "SERVICE_UNAVAILABLE",
    "message": "Servicio temporalmente no disponible. Intente nuevamente más tarde."
  }
}`}
                language="http"
              />
            </CardContent>
          </Card>
        </div>
        
        <h2>Mejores Prácticas</h2>
        
        <ul>
          <li><strong>Usa los códigos adecuados:</strong> Elige el código más específico que describa la situación</li>
          <li><strong>Mantén la consistencia:</strong> Usa los mismos formatos para todos los errores</li>
          <li><strong>Proporciona detalles útiles:</strong> Los mensajes de error deben guiar hacia la solución</li>
          <li><strong>Incluye identificadores únicos:</strong> Facilita la correlación entre logs y errores reportados</li>
          <li><strong>Evita filtrar información sensible:</strong> No incluyas datos internos o sensibles en los mensajes de error</li>
        </ul>
        
        <blockquote>
          "El uso correcto de los códigos de estado HTTP es una parte fundamental de una API REST bien diseñada.
          Estos códigos proporcionan información inmediata sobre el resultado de una operación y son esenciales
          para una buena experiencia de integración."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default StatusCodes;
