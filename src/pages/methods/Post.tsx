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
          <li><strong>No seguro:</strong> Modifica el estado en el servidor</li>
          <li><strong>Cuerpo de la solicitud:</strong> Contiene los datos para crear el nuevo recurso</li>
          <li><strong>Estado 201:</strong> Generalmente devuelve el código de estado HTTP 201 (Created) en caso de éxito</li>
        </ul>
        
        <h2>Casos de Uso</h2>
        
        <h3>1. Crear un Nuevo Recurso</h3>
        
        <EndpointExample
          method="POST"
          path="/api/v1/products"
          description="Crea un nuevo producto en el catálogo."
          requestExample={`{
  "name": "Smartwatch Ultra",
  "description": "Reloj inteligente con monitor cardíaco y GPS integrado",
  "price": 299.99,
  "category": "electronics",
  "tags": ["wearable", "fitness", "tech"]
}`}
          responseExample={`{
  "id": "prod_789",
  "name": "Smartwatch Ultra",
  "description": "Reloj inteligente con monitor cardíaco y GPS integrado",
  "price": 299.99,
  "category": "electronics",
  "tags": ["wearable", "fitness", "tech"],
  "created_at": "2023-06-10T15:30:45Z"
}`}
        />
        
        <h3>2. Procesamiento de Formularios o Acciones</h3>
        
        <EndpointExample
          method="POST"
          path="/api/v1/payments"
          description="Procesa un pago para un pedido."
          requestExample={`{
  "order_id": "order_123",
  "amount": 299.99,
  "currency": "EUR",
  "payment_method": {
    "type": "credit_card",
    "card_number": "XXXX-XXXX-XXXX-1111",
    "expiry": "05/25",
    "cvv": "XXX"
  }
}`}
          responseExample={`{
  "payment_id": "pay_456",
  "order_id": "order_123",
  "amount": 299.99,
  "currency": "EUR",
  "status": "completed",
  "transaction_id": "tx_789",
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
          Utiliza el código de estado adecuado para comunicar el resultado de la operación POST:
        </p>
        
        <ul>
          <li><strong>201 Created:</strong> El recurso se creó correctamente</li>
          <li><strong>202 Accepted:</strong> La solicitud se aceptó pero aún no se ha completado (útil para procesos asincrónicos)</li>
          <li><strong>400 Bad Request:</strong> La solicitud tiene errores de formato o validación</li>
          <li><strong>401 Unauthorized:</strong> Se requiere autenticación</li>
          <li><strong>403 Forbidden:</strong> El usuario no tiene permisos para crear el recurso</li>
          <li><strong>409 Conflict:</strong> La solicitud no pudo completarse debido a un conflicto con el estado actual del recurso</li>
          <li><strong>422 Unprocessable Entity:</strong> La solicitud está bien formada pero tiene errores semánticos</li>
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
  "message": "No se pudo crear el producto debido a errores de validación"
}`}
          language="http"
        />
        
        <h3>Idempotencia Condicional</h3>
        <p>
          Aunque POST no es idempotente por definición, puedes implementar un comportamiento idempotente usando identificadores 
          de solicitud:
        </p>
        
        <CodeBlock
          code={`POST /api/v1/orders HTTP/1.1
Content-Type: application/json
Idempotency-Key: 123e4567-e89b-12d3-a456-426655440000

{
  "customer_id": "cust_123",
  "items": [
    { "product_id": "prod_456", "quantity": 1 }
  ]
}`}
          language="http"
        />
        
        <h2>POST vs PUT</h2>
        <p>
          Es importante entender la diferencia entre POST y PUT para elegir el método adecuado:
        </p>
        
        <table className="w-full border-collapse my-6">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="border p-2 text-left">Característica</th>
              <th className="border p-2 text-left">POST</th>
              <th className="border p-2 text-left">PUT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Idempotencia</td>
              <td className="border p-2">No idempotente</td>
              <td className="border p-2">Idempotente</td>
            </tr>
            <tr>
              <td className="border p-2">URI del recurso</td>
              <td className="border p-2">El servidor decide la URI final</td>
              <td className="border p-2">El cliente especifica la URI exacta</td>
            </tr>
            <tr>
              <td className="border p-2">Uso principal</td>
              <td className="border p-2">Crear nuevos recursos</td>
              <td className="border p-2">Actualizar recursos existentes</td>
            </tr>
            <tr>
              <td className="border p-2">Colecciones</td>
              <td className="border p-2">POST a la colección</td>
              <td className="border p-2">PUT al recurso específico</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Casos de Uso Avanzados</h2>
        
        <h3>1. POST para Operaciones que No Son CRUD</h3>
        <p>
          Aunque REST se centra en operaciones CRUD sobre recursos, POST también puede utilizarse para operaciones más complejas:
        </p>
        
        <EndpointExample
          method="POST"
          path="/api/v1/orders/order_123/actions/cancel"
          description="Cancela un pedido existente."
          requestExample={`{
  "reason": "El cliente ha solicitado la cancelación",
  "refund": true
}`}
          responseExample={`{
  "order_id": "order_123",
  "status": "cancelled",
  "cancelled_at": "2023-06-10T16:45:30Z",
  "refund_status": "processing"
}`}
        />
        
        <h3>2. Procesamiento en Lote (Batch)</h3>
        <p>
          POST es adecuado para operaciones en lote que crean o modifican múltiples recursos:
        </p>
        
        <EndpointExample
          method="POST"
          path="/api/v1/products/batch"
          description="Crea múltiples productos en una sola operación."
          requestExample={`{
  "items": [
    {
      "name": "Teclado Mecánico",
      "price": 89.99,
      "category": "peripherals"
    },
    {
      "name": "Ratón Inalámbrico",
      "price": 45.99,
      "category": "peripherals"
    }
  ]
}`}
          responseExample={`{
  "created": 2,
  "items": [
    {
      "id": "prod_567",
      "name": "Teclado Mecánico",
      "price": 89.99
    },
    {
      "id": "prod_568",
      "name": "Ratón Inalámbrico",
      "price": 45.99
    }
  ]
}`}
        />
        
        <h2>Consideraciones de Seguridad</h2>
        <ul>
          <li><strong>Inyección de datos:</strong> Valida y desinfecta todas las entradas para prevenir inyecciones</li>
          <li><strong>CSRF:</strong> Implementa tokens anti-CSRF para operaciones POST</li>
          <li><strong>Límites de tamaño:</strong> Establece límites para el tamaño del cuerpo de la solicitud</li>
          <li><strong>Rate limiting:</strong> Protege tus endpoints POST contra abusos con limitación de tasa</li>
        </ul>
        
        <blockquote>
          "El método POST es la base para la creación de recursos en una API REST. Diseñar endpoints POST claros,
          con validación robusta y mensajes de error descriptivos, mejora significativamente la usabilidad
          de tu API y reduce los errores de integración."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default Post;
