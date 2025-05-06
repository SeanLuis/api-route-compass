
import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";

const Put = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Método PUT" 
        description="Uso correcto del método PUT para actualizar recursos."
        path={["Métodos HTTP", "PUT"]}
      >
        <p>
          El método PUT se utiliza para actualizar un recurso existente o crear uno nuevo cuando conocemos 
          su identificador. A diferencia de PATCH, PUT actualiza el recurso completo, sustituyendo la 
          versión anterior por la nueva representación proporcionada.
        </p>
        
        <h2>Principios del Método PUT</h2>
        
        <ul>
          <li><strong>Idempotente:</strong> Múltiples solicitudes idénticas tienen el mismo efecto que una sola</li>
          <li><strong>Actualización completa:</strong> Reemplaza todo el recurso con la nueva representación</li>
          <li><strong>Creación condicional:</strong> Puede crear un recurso si no existe (si el servidor lo permite)</li>
          <li><strong>URI específica:</strong> Siempre opera sobre un recurso específico identificado por su URI</li>
        </ul>
        
        <h2>Casos de Uso</h2>
        
        <h3>1. Actualizar un Recurso Existente</h3>
        
        <EndpointExample
          method="PUT"
          path="/api/v1/products/prod_123"
          description="Actualiza completamente un producto existente."
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
        
        <h3>2. Crear un Recurso con ID Conocido</h3>
        
        <EndpointExample
          method="PUT"
          path="/api/v1/configurations/email-settings"
          description="Crea o actualiza una configuración específica."
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
        
        <h2>PUT vs PATCH</h2>
        <p>
          La principal diferencia entre PUT y PATCH está en cómo manejan las actualizaciones parciales:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
          <div className="border rounded-md p-4">
            <h4 className="font-semibold mb-2">PUT</h4>
            <ul className="space-y-2 text-sm">
              <li>Reemplaza el recurso completo</li>
              <li>Los campos no incluidos se establecen a sus valores predeterminados o nulos</li>
              <li>Es idempotente</li>
              <li>Requiere enviar todos los atributos del recurso</li>
            </ul>
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
              className="mt-4"
            />
          </div>
          <div className="border rounded-md p-4">
            <h4 className="font-semibold mb-2">PATCH</h4>
            <ul className="space-y-2 text-sm">
              <li>Actualiza solo los campos especificados</li>
              <li>Los campos no incluidos mantienen sus valores actuales</li>
              <li>Puede ser idempotente dependiendo de la implementación</li>
              <li>Permite enviar solo los atributos que cambian</li>
            </ul>
            <CodeBlock
              code={`PATCH /api/v1/products/prod_123
{
  "price": 199.99,
  "stock": 50
  // Solo los campos que cambian
}`}
              language="http"
              className="mt-4"
            />
          </div>
        </div>
        
        <h2>Buenas Prácticas</h2>
        
        <h3>Manejo de Recursos Inexistentes</h3>
        <p>
          Decide una política clara para cuando se hace PUT a un recurso que no existe:
        </p>
        
        <div className="grid grid-cols-1 gap-4 my-6">
          <div>
            <h4 className="font-medium text-sm mb-2">Opción 1: Crear el recurso (201 Created)</h4>
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
          <div>
            <h4 className="font-medium text-sm mb-2">Opción 2: Rechazar la creación (404 Not Found)</h4>
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
        
        <h3>Validación Completa</h3>
        <p>
          Como PUT reemplaza el recurso completo, es crucial validar que todos los campos requeridos estén presentes:
        </p>
        
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
        
        <h3>Respuestas a PUT</h3>
        <p>
          Los códigos de estado comunes para respuestas PUT incluyen:
        </p>
        
        <ul>
          <li><strong>200 OK:</strong> El recurso se actualizó correctamente y se devuelve en la respuesta</li>
          <li><strong>201 Created:</strong> Se creó un nuevo recurso (cuando no existía previamente)</li>
          <li><strong>204 No Content:</strong> La actualización fue exitosa, pero no se devuelve contenido</li>
          <li><strong>400 Bad Request:</strong> La solicitud tiene un formato incorrecto</li>
          <li><strong>404 Not Found:</strong> El recurso no existe (si el servidor no permite la creación)</li>
          <li><strong>409 Conflict:</strong> La actualización entra en conflicto con el estado actual</li>
          <li><strong>412 Precondition Failed:</strong> No se cumplieron las precondiciones (como If-Match)</li>
          <li><strong>422 Unprocessable Entity:</strong> Los datos son sintácticamente correctos pero semánticamente inválidos</li>
        </ul>
        
        <h3>Actualizaciones Condicionales</h3>
        <p>
          Utiliza encabezados HTTP condicionales para evitar condiciones de carrera:
        </p>
        
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
        
        <h2>Consideraciones de Seguridad</h2>
        <p>
          Como PUT puede modificar recursos completos:
        </p>
        <ul>
          <li>Implementa controles de autorización estrictos</li>
          <li>Considera ocultar campos sensibles en las respuestas (como contraseñas)</li>
          <li>Registra todas las modificaciones para auditoría</li>
          <li>Implementa validación exhaustiva en el servidor, no confíes solo en la validación del cliente</li>
        </ul>
        
        <blockquote>
          "PUT representa el contrato más estricto en REST: un reemplazo completo y preciso. La idempotencia 
          de PUT es una garantía poderosa para los clientes, pero requiere una implementación cuidadosa por 
          parte del servidor."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default Put;
