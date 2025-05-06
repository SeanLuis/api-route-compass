
import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";

const Post = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Método POST" 
        description="Uso correcto del método POST para crear recursos."
        path={["Métodos HTTP", "POST"]}
      >
        <p>
          El método POST se utiliza principalmente para crear nuevos recursos en el servidor. Es idempotente por naturaleza,
          lo que significa que múltiples solicitudes idénticas pueden tener efectos secundarios diferentes (como crear múltiples
          recursos idénticos).
        </p>
        
        <h2>Principios del Método POST</h2>
        
        <ul>
          <li><strong>No idempotente:</strong> Múltiples solicitudes idénticas pueden producir resultados diferentes</li>
          <li><strong>Estado de creación:</strong> Devuelve 201 Created cuando se crea un nuevo recurso</li>
          <li><strong>Ubicación del recurso:</strong> Proporciona la URI del recurso creado en el encabezado Location</li>
          <li><strong>Cuerpo en la respuesta:</strong> Típicamente devuelve la representación del recurso creado</li>
        </ul>
        
        <h2>Casos de Uso</h2>
        
        <h3>1. Crear un Nuevo Recurso</h3>
        
        <EndpointExample
          method="POST"
          path="/api/v1/products"
          description="Crea un nuevo producto en la base de datos."
          requestExample={`{
  "name": "Smartwatch Ultra",
  "description": "Reloj inteligente con monitoreo avanzado de salud",
  "price": 299.99,
  "category": "wearables",
  "stock": 100,
  "specifications": {
    "display": "AMOLED 1.5 inch",
    "battery": "48 hours",
    "water_resistant": true,
    "connectivity": ["Bluetooth 5.0", "Wi-Fi"]
  }
}`}
          responseExample={`{
  "id": "prod_789",
  "name": "Smartwatch Ultra",
  "description": "Reloj inteligente con monitoreo avanzado de salud",
  "price": 299.99,
  "category": "wearables",
  "stock": 100,
  "specifications": {
    "display": "AMOLED 1.5 inch",
    "battery": "48 hours",
    "water_resistant": true,
    "connectivity": ["Bluetooth 5.0", "Wi-Fi"]
  },
  "created_at": "2023-06-10T14:30:00Z",
  "updated_at": "2023-06-10T14:30:00Z"
}`}
        />
        
        <h3>2. Procesar Datos sin Crear un Recurso</h3>
        
        <EndpointExample
          method="POST"
          path="/api/v1/payments/process"
          description="Procesa un pago sin crear necesariamente un recurso."
          requestExample={`{
  "amount": 99.99,
  "currency": "USD",
  "payment_method": "credit_card",
  "credit_card": {
    "number": "4111111111111111",
    "expiry_month": 12,
    "expiry_year": 2025,
    "cvv": "123"
  },
  "billing_address": {
    "name": "Juan Pérez",
    "address_line1": "Calle Principal 123",
    "city": "Madrid",
    "postal_code": "28001",
    "country": "Spain"
  }
}`}
          responseExample={`{
  "transaction_id": "tx_456789",
  "status": "success",
  "amount": 99.99,
  "currency": "USD",
  "processed_at": "2023-06-10T15:05:23Z",
  "payment_method": "credit_card",
  "card_last4": "1111"
}`}
        />
        
        <h3>3. Añadir Elementos a una Colección Existente</h3>
        
        <EndpointExample
          method="POST"
          path="/api/v1/users/user_123/favorites"
          description="Añade un producto a la lista de favoritos del usuario."
          requestExample={`{
  "product_id": "prod_456"
}`}
          responseExample={`{
  "id": "fav_987",
  "user_id": "user_123",
  "product_id": "prod_456",
  "product": {
    "name": "Auriculares Premium",
    "price": 129.99,
    "image_url": "https://example.com/images/headphones.jpg"
  },
  "added_at": "2023-06-10T15:30:45Z"
}`}
        />
        
        <h2>Buenas Prácticas</h2>
        
        <h3>Códigos de Estado HTTP Apropiados</h3>
        <p>
          Utiliza los códigos de estado correctos para las respuestas POST:
        </p>
        
        <ul>
          <li><strong>201 Created:</strong> Cuando se ha creado un nuevo recurso</li>
          <li><strong>202 Accepted:</strong> Cuando la solicitud se ha aceptado para procesamiento, pero no se ha completado</li>
          <li><strong>204 No Content:</strong> Cuando la operación se realizó correctamente pero no hay contenido para devolver</li>
          <li><strong>400 Bad Request:</strong> Cuando la solicitud tiene datos inválidos</li>
          <li><strong>401 Unauthorized:</strong> Cuando se requiere autenticación</li>
          <li><strong>403 Forbidden:</strong> Cuando el cliente está autenticado pero sin permisos</li>
          <li><strong>409 Conflict:</strong> Cuando hay un conflicto con el estado actual del recurso</li>
          <li><strong>422 Unprocessable Entity:</strong> Cuando los datos son sintácticamente correctos pero semánticamente inválidos</li>
        </ul>
        
        <h3>Encabezado Location</h3>
        <p>
          Incluye un encabezado Location en la respuesta con la URI del recurso recién creado:
        </p>
        
        <CodeBlock
          code={`HTTP/1.1 201 Created
Location: /api/v1/products/prod_789
Content-Type: application/json

{
  "id": "prod_789",
  "name": "Smartwatch Ultra",
  ...
}`}
          language="http"
        />
        
        <h3>Validación de Datos</h3>
        <p>
          Implementa una validación exhaustiva de los datos entrantes y proporciona mensajes de error claros:
        </p>
        
        <CodeBlock
          code={`HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{
  "errors": {
    "price": ["El precio debe ser un número positivo"],
    "name": ["El nombre del producto es obligatorio"],
    "category": ["La categoría especificada no existe"]
  },
  "message": "Datos de entrada inválidos"
}`}
          language="http"
        />
        
        <h3>POST vs PUT para Creación</h3>
        <p>
          Usa POST cuando:
        </p>
        <ul>
          <li>El servidor determina el ID/URI del recurso</li>
          <li>Múltiples solicitudes idénticas pueden crear múltiples recursos</li>
          <li>No conoces la URI final del recurso antes de crearlo</li>
        </ul>
        
        <p>
          Usa PUT cuando:
        </p>
        <ul>
          <li>El cliente determina el ID/URI del recurso</li>
          <li>Quieres que la operación sea idempotente (múltiples solicitudes idénticas tienen el mismo efecto)</li>
          <li>Conoces la URI exacta donde debe existir el recurso</li>
        </ul>
        
        <h2>Procesamiento Asíncrono</h2>
        <p>
          Para operaciones que pueden tardar tiempo en completarse, considera un enfoque asíncrono:
        </p>
        
        <CodeBlock
          code={`# Solicitud para iniciar un proceso
POST /api/v1/reports/generate
{
  "type": "annual_sales",
  "year": 2023,
  "format": "pdf"
}

# Respuesta que indica aceptación
HTTP/1.1 202 Accepted
Content-Type: application/json
Location: /api/v1/tasks/task_456

{
  "task_id": "task_456",
  "status": "processing",
  "estimated_completion_time": "60 seconds",
  "status_url": "/api/v1/tasks/task_456"
}`}
          language="http"
        />
        
        <blockquote>
          "El método POST es la herramienta principal para crear contenido en una API REST. Aunque es simple 
          en concepto, implementarlo correctamente requiere atención a los códigos de estado, encabezados y
          patrones de respuesta adecuados."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default Post;
