import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AlertTriangle, Info, XCircle, CheckCircle, Code, Terminal, Bug, Shield } from "lucide-react";

const ErrorHandling = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/response-formats" className="text-sm text-slate-500 hover:text-slate-700">Respuestas</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Manejo de Errores</h1>
          <p className="text-lg text-slate-700">
            Patrones para gestionar y comunicar errores de forma efectiva en APIs REST.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <p>
            Un manejo de errores eficaz proporciona información clara y útil cuando algo sale mal.
            Las mejores APIs utilizan códigos de estado HTTP consistentes y mensajes de error estructurados
            que ayudan a los desarrolladores a entender y solucionar problemas rápidamente.
          </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Code className="h-5 w-5 text-slate-700" />
            Estructura de errores
          </h2>

          <p>
            Una respuesta de error estándar debe incluir:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Un código de estado HTTP apropiado</li>
            <li>Un objeto con un formato consistente en el cuerpo de la respuesta</li>
          </ul>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <EndpointExample
                  method="POST"
                  path="/api/v1/users"
                  description="Ejemplo de respuesta de error con múltiples campos inválidos"
                  responseExample={`{
  "error": {
    "code": "validation_error",
    "message": "Los datos proporcionados no son válidos",
    "details": [
      {
        "field": "email",
        "message": "Formato de email inválido"
      },
      {
        "field": "password",
        "message": "Debe tener al menos 8 caracteres"
      }
    ]
  }
}`}
                />
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 mt-8">
            <Info className="h-5 w-5 text-slate-700" />
            Códigos de estado HTTP comunes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">400 Bad Request</CardTitle>
                <CardDescription>Sintaxis incorrecta o parámetros inválidos</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`{
  "error": {
    "code": "invalid_request",
    "message": "Parámetros incorrectos"
  }
}`}
                  language="javascript"
                />
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">401 Unauthorized</CardTitle>
                <CardDescription>Se requiere autenticación</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`{
  "error": {
    "code": "authentication_required",
    "message": "Debe autenticarse para acceder"
  }
}`}
                  language="javascript"
                />
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">403 Forbidden</CardTitle>
                <CardDescription>Sin permisos para el recurso</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`{
  "error": {
    "code": "permission_denied",
    "message": "No tiene permisos suficientes"
  }
}`}
                  language="javascript"
                />
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">404 Not Found</CardTitle>
                <CardDescription>El recurso no existe</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`{
  "error": {
    "code": "resource_not_found",
    "message": "El recurso no fue encontrado"
  }
}`}
                  language="javascript"
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">422 Unprocessable Entity</CardTitle>
                <CardDescription>Error de validación de datos</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`{
  "error": {
    "code": "validation_failed",
    "message": "Error de validación",
    "details": [...]
  }
}`}
                  language="javascript"
                />
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">429 Too Many Requests</CardTitle>
                <CardDescription>Límite de solicitudes excedido</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Demasiadas solicitudes"
  }
}`}
                  language="javascript"
                />
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 mt-8">
            <Terminal className="h-5 w-5 text-slate-700" />
            Patrones comunes de error
          </h2>

          <h3 className="text-lg font-semibold tracking-tight mt-6">
            Errores de validación
          </h3>

          <p>
            Para problemas de validación de entrada, proporcione detalles específicos sobre cada campo:
          </p>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <EndpointExample
                  method="POST"
                  path="/api/v1/payments"
                  description="Error de validación con múltiples campos problemáticos"
                  responseExample={`{
  "error": {
    "code": "validation_failed",
    "message": "La solicitud contiene campos inválidos",
    "details": [
      {
        "field": "amount",
        "message": "Debe ser mayor que cero"
      },
      {
        "field": "currency",
        "message": "Divisa no soportada",
        "allowed_values": ["USD", "EUR", "GBP"]
      }
    ]
  }
}`}
                />
              </div>
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold tracking-tight mt-6">
            Errores de negocio
          </h3>
          
          <p>
            Para errores relacionados con la lógica de la aplicación:
          </p>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <EndpointExample
                  method="POST"
                  path="/api/v1/transfers"
                  description="Error de negocio por fondos insuficientes"
                  responseExample={`{
  "error": {
    "code": "insufficient_funds",
    "message": "Fondos insuficientes para completar la transferencia",
    "details": {
      "available_amount": 250.00,
      "required_amount": 500.00
    }
  }
}`}
                />
              </div>
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold tracking-tight mt-6">
            Errores con referencia de seguimiento
          </h3>
          
          <p>
            Para errores internos, incluya un identificador que facilite la depuración:
          </p>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <EndpointExample
                  method="GET"
                  path="/api/v1/reports/complex"
                  description="Error interno con identificador de seguimiento"
                  responseExample={`{
  "error": {
    "code": "internal_error",
    "message": "Se produjo un error al procesar su solicitud",
    "request_id": "req_5fb0b911ec",
    "help": "Contacte con soporte proporcionando este request_id"
  }
}`}
                />
              </div>
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold tracking-tight mt-6">
            Múltiples errores en una respuesta
          </h3>

          <p>
            En algunos casos, es útil devolver múltiples errores en una sola respuesta:
          </p>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <CodeBlock
                code={`{
  "errors": [
    {
      "code": "invalid_parameter",
      "message": "El parámetro 'start_date' tiene un formato inválido",
      "details": {
        "parameter": "start_date",
        "value": "2023-13-45",
        "expected_format": "YYYY-MM-DD"
      }
    },
    {
      "code": "invalid_parameter",
      "message": "El parámetro 'end_date' debe ser posterior a 'start_date'",
      "details": {
        "parameter": "end_date",
        "value": "2023-01-01",
        "conflicting_parameter": "start_date",
        "conflicting_value": "2023-02-01"
      }
    }
  ]
}`}
                language="javascript"
              />
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 mt-8">
            <CheckCircle className="h-5 w-5 text-slate-700" />
            Mejores Prácticas
          </h2>

          <div className="space-y-4 mt-6">
            <div className="border border-slate-200 rounded-md p-4">
              <h3 className="font-medium">Mensajes de Error Claros y Accionables</h3>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Específicos:</strong> Indicar exactamente qué falló</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Accionables:</strong> Sugerir qué hacer para resolver el problema</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Concisos:</strong> Breves pero informativos</span>
                </li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-md p-4">
              <h3 className="font-medium">Códigos de Error Coherentes</h3>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  <span>Usar formatos predecibles (ej. snake_case para todos los códigos)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  <span>Agrupar códigos por categoría (ej. auth_*, validation_*)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  <span>Incluir identificadores únicos para errores del servidor</span>
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 mt-8">
            <Terminal className="h-5 w-5 text-slate-700" />
            Implementación Técnica
          </h2>

          <Card className="border border-slate-200 shadow-sm mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Middleware Centralizado para Errores</CardTitle>
              <CardDescription>Implementación en Express.js</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`// Ejemplo en Express.js
app.use((err, req, res, next) => {
  // Determinar tipo de error y código HTTP
  let statusCode = 500;
  let errorCode = 'internal_error';
  let errorMessage = 'Ha ocurrido un error inesperado';
  let errorDetails = null;
  
  // Manejar diferentes tipos de errores
  if (err instanceof ValidationError) {
    statusCode = 422;
    errorCode = 'validation_error';
    errorMessage = 'Los datos proporcionados no son válidos';
    errorDetails = err.errors.map(e => ({
      field: e.field,
      message: e.message
    }));
  } else if (err instanceof AuthenticationError) {
    statusCode = 401;
    errorCode = 'authentication_failed';
    errorMessage = 'Autenticación fallida';
  }
  
  // Generar ID de solicitud para seguimiento
  const requestId = req.id || generateRequestId();
  
  // Log del error (nivel depende del tipo)
  if (statusCode >= 500) {
    logger.error({
      message: 'Error interno del servidor',
      error: err.stack,
      request_id: requestId,
      user_id: req.user?.id
    });
  } else {
    logger.info({
      message: errorMessage,
      error_code: errorCode,
      request_id: requestId,
      user_id: req.user?.id
    });
  }
  
  // Enviar respuesta al cliente
  res.status(statusCode).json({
    error: {
      code: errorCode,
      message: errorMessage,
      request_id: requestId,
      details: errorDetails
    }
  });
});`}
                language="javascript"
              />
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 mt-8">
            <Info className="h-5 w-5 text-slate-700" />
            Ejemplos de APIs Populares
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-base">Stripe API</CardTitle>
                <CardDescription>Errores detallados con tipos y códigos</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`{
  "error": {
    "type": "card_error",
    "code": "card_declined",
    "decline_code": "insufficient_funds",
    "message": "Your card has insufficient funds.",
    "param": "payment_method",
    "charge": "ch_3N2BnFJ3KpYgHl7X0xBPeC4j"
  }
}`}
                  language="javascript"
                />
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-base">GitHub API</CardTitle>
                <CardDescription>Formato simple con documentación</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`{
  "message": "Validation Failed",
  "errors": [
    {
      "resource": "Issue",
      "field": "title",
      "code": "missing_field"
    }
  ],
  "documentation_url": "https://docs.github.com/rest"
}`}
                  language="javascript"
                />
              </CardContent>
            </Card>
          </div>

          <div className="border border-slate-200 rounded-md p-6 mt-8 bg-slate-50">
            <p className="text-slate-700">
              "Un buen sistema de manejo de errores es como un buen sistema de navegación: 
              no solo te dice que estás perdido, sino que te ayuda a encontrar el camino correcto.
              Las APIs con errores claros y accionables crean una experiencia de desarrollador
              superior y reducen significativamente el tiempo de depuración e integración."
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ErrorHandling;
