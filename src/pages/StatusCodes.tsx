import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, AlertTriangle, XCircle, ArrowRight, Info } from "lucide-react";

const StatusCodes = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/response-formats" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">Respuestas</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Códigos de Estado HTTP</h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Uso correcto de los códigos de estado en APIs REST.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <p className="dark:text-slate-300">
            Los códigos de estado HTTP son una parte esencial de las APIs REST ya que proporcionan 
            información inmediata sobre el resultado de una solicitud HTTP. Usar los códigos de estado
            correctamente mejora la experiencia del desarrollador y facilita la depuración de problemas.
          </p>
          
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <Info className="h-5 w-5 text-indigo-500" />
            Categorías de Códigos de Estado
          </h2>
          
          <div className="space-y-4 my-6">
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <CheckCircle className="h-5 w-5 text-indigo-500" />
                  2xx: Éxito
                </CardTitle>
                <CardDescription className="dark:text-slate-400">La solicitud se procesó correctamente</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <ArrowRight className="h-5 w-5 text-indigo-500" />
                  3xx: Redirección
                </CardTitle>
                <CardDescription className="dark:text-slate-400">Se requiere acción adicional</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <AlertTriangle className="h-5 w-5 text-indigo-500" />
                  4xx: Error del Cliente
                </CardTitle>
                <CardDescription className="dark:text-slate-400">Problema con la solicitud</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <XCircle className="h-5 w-5 text-indigo-500" />
                  5xx: Error del Servidor
                </CardTitle>
                <CardDescription className="dark:text-slate-400">Problema en el servidor</CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <CheckCircle className="h-5 w-5 text-indigo-500" />
            Códigos de Éxito (2xx)
          </h2>
          
          <div className="space-y-6 my-6">
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2 border-b dark:border-slate-700">
                <CardTitle className="dark:text-white">200 OK</CardTitle>
                <CardDescription className="dark:text-slate-400">La solicitud se completó exitosamente</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm mb-4 dark:text-slate-300">Usado para operaciones GET exitosas y otras operaciones que fueron procesadas correctamente.</p>
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
            
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2 border-b dark:border-slate-700">
                <CardTitle className="dark:text-white">201 Created</CardTitle>
                <CardDescription className="dark:text-slate-400">El recurso se creó correctamente</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm mb-4 dark:text-slate-300">Utilizado después de operaciones POST exitosas que crean nuevos recursos.</p>
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
            
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2 border-b dark:border-slate-700">
                <CardTitle className="dark:text-white">204 No Content</CardTitle>
                <CardDescription className="dark:text-slate-400">Operación exitosa sin contenido para devolver</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm mb-4 dark:text-slate-300">Comúnmente utilizado para operaciones DELETE o actualizaciones parciales donde no es necesario devolver datos.</p>
                <CodeBlock
                  code={`HTTP/1.1 204 No Content`}
                  language="http"
                />
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <AlertTriangle className="h-5 w-5 text-indigo-500" />
            Códigos de Error del Cliente (4xx)
          </h2>
          
          <div className="space-y-6 my-6">
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2 border-b dark:border-slate-700">
                <CardTitle className="dark:text-white">400 Bad Request</CardTitle>
                <CardDescription className="dark:text-slate-400">La solicitud es inválida o malformada</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm mb-4 dark:text-slate-300">Use este código cuando la solicitud no pueda ser procesada debido a sintaxis errónea o parámetros inválidos.</p>
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
            
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2 border-b dark:border-slate-700">
                <CardTitle className="dark:text-white">401 Unauthorized</CardTitle>
                <CardDescription className="dark:text-slate-400">Se requiere autenticación</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm mb-4 dark:text-slate-300">El cliente debe autenticarse para obtener el recurso solicitado.</p>
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
            
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2 border-b dark:border-slate-700">
                <CardTitle className="dark:text-white">403 Forbidden</CardTitle>
                <CardDescription className="dark:text-slate-400">El servidor entiende la solicitud pero rechaza la autorización</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm mb-4 dark:text-slate-300">El cliente no tiene los permisos necesarios para el contenido.</p>
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
            
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2 border-b dark:border-slate-700">
                <CardTitle className="dark:text-white">404 Not Found</CardTitle>
                <CardDescription className="dark:text-slate-400">El recurso solicitado no existe</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm mb-4 dark:text-slate-300">Usado cuando el recurso solicitado no puede ser encontrado en el servidor.</p>
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
            
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2 border-b dark:border-slate-700">
                <CardTitle className="dark:text-white">422 Unprocessable Entity</CardTitle>
                <CardDescription className="dark:text-slate-400">La solicitud está bien formada pero tiene errores semánticos</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm mb-4 dark:text-slate-300">Ideal para errores de validación de datos.</p>
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
          
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <XCircle className="h-5 w-5 text-indigo-500" />
            Códigos de Error del Servidor (5xx)
          </h2>
          
          <div className="space-y-6 my-6">
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2 border-b dark:border-slate-700">
                <CardTitle className="dark:text-white">500 Internal Server Error</CardTitle>
                <CardDescription className="dark:text-slate-400">Error genérico del servidor</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm mb-4 dark:text-slate-300">Indica que algo inesperado ocurrió en el servidor.</p>
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
            
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2 border-b dark:border-slate-700">
                <CardTitle className="dark:text-white">503 Service Unavailable</CardTitle>
                <CardDescription className="dark:text-slate-400">El servicio no está disponible temporalmente</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm mb-4 dark:text-slate-300">Útil durante mantenimientos programados o cuando el servidor está sobrecargado.</p>
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
          
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <Info className="h-5 w-5 text-indigo-500" />
            Mejores Prácticas
          </h2>
          
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 p-6 rounded-lg border border-indigo-100 dark:border-indigo-800">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="dark:text-slate-300"><strong>Usa los códigos adecuados:</strong> Elige el código más específico que describa la situación</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="dark:text-slate-300"><strong>Mantén la consistencia:</strong> Usa los mismos formatos para todos los errores</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="dark:text-slate-300"><strong>Proporciona detalles útiles:</strong> Los mensajes de error deben guiar hacia la solución</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="dark:text-slate-300"><strong>Incluye identificadores únicos:</strong> Facilita la correlación entre logs y errores reportados</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="dark:text-slate-300"><strong>Evita filtrar información sensible:</strong> No incluyas datos internos o sensibles en los mensajes de error</span>
              </li>
            </ul>
          </div>
          
          <blockquote className="border-l-4 border-indigo-300 dark:border-indigo-700 pl-6 py-2 pr-4 mt-8 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 rounded-r-lg">
            <p className="italic text-indigo-900 dark:text-indigo-300 font-medium">
              "El uso correcto de los códigos de estado HTTP es una parte fundamental de una API REST bien diseñada.
              Estos códigos proporcionan información inmediata sobre el resultado de una operación y son esenciales
              para una buena experiencia de integración."
            </p>
          </blockquote>
        </div>
      </div>
    </PageLayout>
  );
};

export default StatusCodes;
