import { PageLayout } from "@/components/PageLayout";
import { EndpointExample } from "@/components/EndpointExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const PostMethodPage = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-semibold">POST</div>
            <Link to="/methods" className="text-sm text-slate-500 hover:text-slate-700">Métodos HTTP</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Método POST</h1>
          <p className="text-lg text-slate-700">
            El método POST se utiliza principalmente para crear nuevos recursos en el servidor. A diferencia de 
            otros métodos, no es idempotente por naturaleza, lo que significa que múltiples solicitudes idénticas 
            pueden tener efectos diferentes.
          </p>
        </div>

        {/* Main content */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="flex items-center text-base font-medium mb-1">
                <X className="h-4 w-4 text-red-600 mr-2" />
                No idempotente
              </h3>
              <p className="text-sm text-slate-700">
                Múltiples solicitudes idénticas pueden producir resultados diferentes.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="flex items-center text-base font-medium mb-1">
                <X className="h-4 w-4 text-red-600 mr-2" />
                No es seguro
              </h3>
              <p className="text-sm text-slate-700">
                Modifica el estado en el servidor al crear recursos.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="flex items-center text-base font-medium mb-1">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Cuerpo de la solicitud
              </h3>
              <p className="text-sm text-slate-700">
                Contiene los datos para crear el nuevo recurso.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="flex items-center text-base font-medium mb-1">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Estado 201
              </h3>
              <p className="text-sm text-slate-700">
                Generalmente devuelve el código 201 (Created) en caso de éxito.
              </p>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Casos de uso comunes</h2>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Crear un nuevo recurso</h3>
              <EndpointExample 
                method="POST"
                path="/api/v1/products"
                description="Crea un nuevo producto en el catálogo"
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
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Procesamiento de formularios o acciones</h3>
              <EndpointExample 
                method="POST"
                path="/api/v1/payments"
                description="Procesa un pago para un pedido"
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
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Añadir elementos a una colección existente</h3>
              <EndpointExample 
                method="POST"
                path="/api/v1/users/user_123/favorites"
                description="Añade un producto a la lista de favoritos del usuario"
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
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Buenas prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Encabezado Location</AlertTitle>
            <AlertDescription className="text-blue-700">
              Incluye un encabezado Location en la respuesta con la URI del recurso recién creado.
            </AlertDescription>
          </Alert>
          
          <div className="p-4 border rounded-lg mt-4">
            <h3 className="text-base font-medium mb-2">Ejemplo de respuesta con Location</h3>
            <CodeBlock
              code={`HTTP/1.1 201 Created
Location: /api/v1/products/prod_789
Content-Type: application/json

{
  "id": "prod_789",
  "name": "Smartwatch Ultra",
  "price": 299.99,
  "created_at": "2023-06-10T15:30:45Z"
}`}
              language="http"
            />
          </div>
          
          <div className="p-4 border rounded-lg mt-4">
            <h3 className="text-base font-medium mb-2">Validación de datos</h3>
            <p className="text-sm text-slate-700 mb-3">
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
          </div>
          
          <Alert variant="default" className="bg-amber-50 border-amber-100 mt-4">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Idempotencia condicional</AlertTitle>
            <AlertDescription className="text-amber-700">
              Aunque POST no es idempotente por definición, puedes implementar un comportamiento idempotente usando identificadores de solicitud.
            </AlertDescription>
          </Alert>
          
          <div className="p-4 border rounded-lg mt-4">
            <h3 className="text-base font-medium mb-2">Uso de claves de idempotencia</h3>
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
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">POST vs PUT</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
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
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Casos de uso avanzados</h2>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Operaciones que no son CRUD</h3>
              <p className="text-sm text-slate-700 mb-3">
                Aunque REST se centra en operaciones CRUD sobre recursos, POST también puede utilizarse para operaciones más complejas:
              </p>
              <EndpointExample 
                method="POST"
                path="/api/v1/orders/order_123/actions/cancel"
                description="Cancela un pedido existente"
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
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Procesamiento en lote (Batch)</h3>
              <p className="text-sm text-slate-700 mb-3">
                POST es adecuado para operaciones en lote que crean o modifican múltiples recursos:
              </p>
              <EndpointExample 
                method="POST"
                path="/api/v1/products/batch"
                description="Crea múltiples productos en una sola operación"
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
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Códigos de estado comunes</h2>
          
          <div className="space-y-2">
            <div className="grid grid-cols-[140px_1fr] border-b pb-2">
              <div className="font-medium">201 Created</div>
              <div className="text-sm">El recurso se creó correctamente. Incluye la URI del nuevo recurso en el encabezado Location.</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] border-b pb-2">
              <div className="font-medium">202 Accepted</div>
              <div className="text-sm">La solicitud se aceptó pero aún no se ha completado (útil para procesos asincrónicos).</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] border-b pb-2">
              <div className="font-medium">400 Bad Request</div>
              <div className="text-sm">La solicitud tiene errores de formato o validación.</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] border-b pb-2">
              <div className="font-medium">409 Conflict</div>
              <div className="text-sm">La solicitud no pudo completarse debido a un conflicto con el estado actual del recurso.</div>
            </div>
            <div className="grid grid-cols-[140px_1fr]">
              <div className="font-medium">422 Unprocessable</div>
              <div className="text-sm">La solicitud está bien formada pero tiene errores semánticos.</div>
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Consideraciones de seguridad</h2>
          
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h3 className="font-medium mb-1">Inyección de datos</h3>
              <p className="text-sm text-slate-700">
                Valida y desinfecta todas las entradas para prevenir inyecciones. Nunca confíes en los datos
                enviados por el cliente sin validarlos adecuadamente.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <h3 className="font-medium mb-1">CSRF</h3>
              <p className="text-sm text-slate-700">
                Implementa tokens anti-CSRF para operaciones POST, especialmente en aplicaciones web que
                manejan autenticación basada en cookies.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <h3 className="font-medium mb-1">Límites de tamaño</h3>
              <p className="text-sm text-slate-700">
                Establece límites para el tamaño del cuerpo de la solicitud para evitar ataques de
                denegación de servicio por consumo de recursos.
              </p>
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/methods/put" className="block p-4 border rounded-lg hover:bg-slate-50">
              <h3 className="font-medium mb-1">Método PUT</h3>
              <p className="text-sm text-slate-600">Reemplazar recursos completamente</p>
            </Link>
            <Link to="/methods/patch" className="block p-4 border rounded-lg hover:bg-slate-50">
              <h3 className="font-medium mb-1">Método PATCH</h3>
              <p className="text-sm text-slate-600">Actualizar parcialmente recursos</p>
            </Link>
            <Link to="/validation" className="block p-4 border rounded-lg hover:bg-slate-50">
              <h3 className="font-medium mb-1">Validación</h3>
              <p className="text-sm text-slate-600">Técnicas para validar datos en APIs</p>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default PostMethodPage;
