import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";
import { Card, CardContent } from "@/components/ui/card";

const ErrorHandling = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Manejo de Errores" 
        description="Patrones para gestionar y comunicar errores de forma efectiva en APIs REST."
        path={["Respuestas", "Manejo de Errores"]}
      >
        <p>
          Un manejo de errores eficaz proporciona información clara y útil cuando algo sale mal.
          Las mejores APIs utilizan códigos de estado HTTP consistentes y mensajes de error estructurados
          que ayudan a los desarrolladores a entender y solucionar problemas rápidamente.
        </p>

        <h2>Estructura de errores</h2>

        <p>
          Una respuesta de error estándar debe incluir:
        </p>

        <ul>
          <li>Un código de estado HTTP apropiado</li>
          <li>Un objeto con un formato consistente en el cuerpo de la respuesta</li>
        </ul>

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

        <h2>Códigos de estado HTTP comunes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">400 Bad Request</h3>
              <p>La solicitud tiene una sintaxis incorrecta o no puede ser procesada.</p>
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

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">401 Unauthorized</h3>
              <p>Se requiere autenticación para acceder al recurso.</p>
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

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">403 Forbidden</h3>
              <p>El cliente no tiene permisos para acceder al recurso.</p>
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

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">404 Not Found</h3>
              <p>El recurso solicitado no existe.</p>
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

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">422 Unprocessable Entity</h3>
              <p>La validación falló aunque la sintaxis es correcta.</p>
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

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">429 Too Many Requests</h3>
              <p>El cliente ha excedido el límite de solicitudes permitidas.</p>
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

        <h2>Patrones comunes de error</h2>

        <h3>1. Errores de validación</h3>

        <p>
          Para problemas de validación de entrada, proporcione detalles específicos sobre cada campo:
        </p>

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

        <h3>2. Errores de negocio</h3>
        
        <p>
          Para errores relacionados con la lógica de la aplicación:
        </p>

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

        <h3>3. Errores con referencia de seguimiento</h3>
        
        <p>
          Para errores internos, incluya un identificador que facilite la depuración:
        </p>

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

        <h3>2. Múltiples Errores en una Respuesta</h3>

        <p>
          En algunos casos, es útil devolver múltiples errores en una sola respuesta:
        </p>

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

        <h3>3. Errores con Sugerencias de Solución</h3>

        <p>
          Mejorar la experiencia del desarrollador incluyendo sugerencias para resolver el error:
        </p>

        <CodeBlock
          code={`{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Has excedido el límite de solicitudes permitidas",
    "details": {
      "limit": 100,
      "period": "1 hora",
      "remaining": 0,
      "reset_at": "2023-06-20T15:30:00Z"
    },
    "suggestion": "Considera actualizar tu plan de suscripción o implementar caché para reducir el número de llamadas a la API",
    "documentation_url": "https://api.example.com/docs/rate-limits"
  }
}`}
          language="javascript"
        />

        <h2>Mejores Prácticas</h2>

        <h3>Mensajes de Error Claros y Accionables</h3>
        
        <p>
          Los mensajes de error deben ser:
        </p>

        <ul>
          <li><strong>Específicos:</strong> Indicar exactamente qué falló</li>
          <li><strong>Accionables:</strong> Sugerir qué hacer para resolver el problema</li>
          <li><strong>Concisos:</strong> Breves pero informativos</li>
          <li><strong>Orientados al usuario:</strong> Escritos en lenguaje claro, no en jerga técnica</li>
        </ul>

        <CodeBlock
          code={`// Ejemplo de mensaje poco útil
{
  "error": {
    "message": "Error en el sistema"
  }
}

// Mensaje mejorado
{
  "error": {
    "message": "No se pudo procesar el pago porque la tarjeta ha expirado. Por favor actualiza los detalles de tu tarjeta e intenta nuevamente."
  }
}`}
          language="javascript"
        />

        <h3>Códigos de Error Coherentes</h3>

        <p>
          Define y documenta un conjunto de códigos de error consistentes para toda la API:
        </p>

        <ul>
          <li>Usa formatos predecibles (ej. snake_case para todos los códigos)</li>
          <li>Agrupa códigos por categoría (ej. auth_*, validation_*, resource_*)</li>
          <li>Considera incluir códigos numéricos además de identificadores de texto</li>
        </ul>

        <CodeBlock
          code={`// Sistema de códigos coherente
{
  "error": {
    "code": "auth_invalid_token",     // Categoría auth
    "numeric_code": 40101,            // 401 + subcódigo
    "message": "Token de autenticación inválido"
  }
}

{
  "error": {
    "code": "validation_required_field",  // Categoría validation
    "numeric_code": 42201,                // 422 + subcódigo
    "message": "Campo obligatorio no proporcionado"
  }
}`}
          language="javascript"
        />

        <h3>Manejo de Excepciones Inesperadas</h3>

        <p>
          Para errores 500 (errores del servidor), equilibra la información proporcionada:
        </p>

        <CodeBlock
          code={`// Respuesta pública para error 500
{
  "error": {
    "code": "internal_error",
    "message": "Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado.",
    "request_id": "req_7ab25bc1a"
  }
}

// Log interno (no expuesto al cliente)
{
  "error": "Database connection timeout",
  "stack_trace": "...",
  "request_id": "req_7ab25bc1a",
  "user_id": 12345,
  "timestamp": "2023-06-20T15:30:00Z",
  "request_details": {
    "method": "POST",
    "path": "/api/v1/orders",
    "body": {"items": [...]}
  }
}`}
          language="javascript"
        />

        <p>
          Los identificadores de solicitud (request_id) son útiles para correlacionar los errores 
          reportados por los usuarios con las entradas de log internas.
        </p>

        <h3>Localización de Mensajes de Error</h3>

        <p>
          Para APIs que necesitan soportar múltiples idiomas:
        </p>

        <CodeBlock
          code={`// Enfoque con códigos de error y mensajes localizados
{
  "error": {
    "code": "validation_required_field",
    "message": "Se requiere el campo email",
    "localized_messages": {
      "en": "The email field is required",
      "es": "Se requiere el campo email",
      "fr": "Le champ email est requis"
    },
    "details": {
      "field": "email"
    }
  }
}

// Alternativa: Respuesta basada en cabecera Accept-Language
// Request: Accept-Language: fr
// Response:
{
  "error": {
    "code": "validation_required_field",
    "message": "Le champ email est requis",
    "details": {
      "field": "email"
    }
  }
}`}
          language="javascript"
        />

        <h2>Implementación Técnica</h2>

        <h3>Middleware Centralizado para Errores</h3>

        <p>
          Es recomendable implementar un manejador centralizado de errores:
        </p>

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

        <h3>Clase Base de Error</h3>

        <p>
          Crear clases de error consistentes facilita el manejo uniforme:
        </p>

        <CodeBlock
          code={`// Ejemplo en TypeScript
class APIError extends Error {
  statusCode: number;
  errorCode: string;
  details?: any;
  
  constructor(message: string, statusCode: number, errorCode: string, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
  }
  
  toJSON() {
    return {
      error: {
        code: this.errorCode,
        message: this.message,
        details: this.details
      }
    };
  }
}

// Errores específicos
class ValidationError extends APIError {
  constructor(message: string, errors: Array<{field: string, message: string}>) {
    super(message, 422, 'validation_error', errors);
  }
}

class NotFoundError extends APIError {
  constructor(resource: string, id: string) {
    super(
      \`El recurso \${resource} con ID \${id} no fue encontrado\`, 
      404, 
      'resource_not_found',
      { resource, id }
    );
  }
}

// Uso
app.get('/users/:id', (req, res, next) => {
  try {
    const user = findUser(req.params.id);
    if (!user) {
      throw new NotFoundError('user', req.params.id);
    }
    res.json(user);
  } catch (err) {
    next(err);  // Pasa al middleware de errores
  }
});`}
          language="typescript"
        />

        <h2>Documentación de Errores</h2>

        <p>
          Es esencial documentar los posibles errores que puede devolver cada endpoint:
        </p>

        <CodeBlock
          code={`# Ejemplo de documentación OpenAPI/Swagger

paths:
  /users:
    post:
      summary: Crear un nuevo usuario
      responses:
        201:
          description: Usuario creado exitosamente
        400:
          description: Solicitud inválida
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              example:
                error:
                  code: invalid_request
                  message: La solicitud contiene datos inválidos
        409:
          description: Conflicto - El email ya está en uso
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              example:
                error:
                  code: email_already_exists
                  message: El email proporcionado ya está registrado
                  details:
                    email: "usuario@ejemplo.com"

components:
  schemas:
    Error:
      type: object
      properties:
        error:
          type: object
          properties:
            code:
              type: string
              description: Código de error único para identificación programática
            message:
              type: string
              description: Mensaje descriptivo orientado al usuario
            details:
              type: object
              description: Información adicional específica del error`}
          language="yaml"
        />

        <h2>Ejemplos de APIs Populares</h2>

        <h3>Stripe API</h3>

        <p>
          Stripe proporciona errores detallados con tipos, códigos y mensajes:
        </p>

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

        <h3>GitHub API</h3>

        <p>
          GitHub utiliza un formato más simple con mensaje y errores específicos:
        </p>

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
  "documentation_url": "https://docs.github.com/rest/reference/issues#create-an-issue"
}`}
          language="javascript"
        />

        <blockquote>
          "Un buen sistema de manejo de errores es como un buen sistema de navegación: 
          no solo te dice que estás perdido, sino que te ayuda a encontrar el camino correcto.
          Las APIs con errores claros y accionables crean una experiencia de desarrollador
          superior y reducen significativamente el tiempo de depuración e integración."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default ErrorHandling;
