
import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { EndpointExample } from "@/components/EndpointExample";
import { RouteExample } from "@/components/RouteExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const PostMethodPage = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Método POST" 
        description="El método POST se utiliza principalmente para crear nuevos recursos en el servidor. A diferencia de otros métodos, no es idempotente por naturaleza, lo que significa que múltiples solicitudes idénticas pueden tener efectos diferentes."
        path={["Inicio", "Métodos HTTP", "POST"]}
      >
        {/* Características principales */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <X className="h-4 w-4 text-red-600 mr-2" />
                No idempotente
              </h3>
              <p className="text-sm text-slate-700">
                Múltiples solicitudes idénticas pueden producir resultados diferentes.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <X className="h-4 w-4 text-red-600 mr-2" />
                No es seguro
              </h3>
              <p className="text-sm text-slate-700">
                Modifica el estado en el servidor al crear recursos.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Cuerpo de la solicitud
              </h3>
              <p className="text-sm text-slate-700">
                Contiene los datos para crear el nuevo recurso.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Estado 201
              </h3>
              <p className="text-sm text-slate-700">
                Generalmente devuelve el código 201 (Created) en caso de éxito.
              </p>
            </div>
          </div>
        </section>
        
        {/* Casos de uso comunes */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Casos de uso comunes</h2>
          
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium mb-2">Crear un nuevo recurso</h3>
                <p className="text-sm text-slate-600">Crea un nuevo producto en el catálogo</p>
              </div>
              <div className="p-5">
                <RouteExample 
                  method="POST"
                  path="/api/v1/products"
                  description="Crea un nuevo producto en el catálogo"
                />
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-slate-900 flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                      Ejemplo de petición
                    </h4>
                    <CodeBlock 
                      code={`{
  "name": "Smartwatch Ultra",
  "description": "Reloj inteligente con monitor cardíaco y GPS integrado",
  "price": 299.99,
  "category": "electronics",
  "tags": ["wearable", "fitness", "tech"]
}`}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-slate-900 flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                      Ejemplo de respuesta
                    </h4>
                    <CodeBlock 
                      code={`{
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
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium mb-2">Procesamiento de formularios o acciones</h3>
                <p className="text-sm text-slate-600">Procesa un pago para un pedido</p>
              </div>
              <div className="p-5">
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
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium mb-2">Añadir elementos a una colección existente</h3>
                <p className="text-sm text-slate-600">Añade un producto a la lista de favoritos del usuario</p>
              </div>
              <div className="p-5">
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
          </div>
        </section>
        
        {/* Buenas prácticas */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Buenas prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-800 text-base">Encabezado Location</AlertTitle>
            <AlertDescription className="text-blue-700">
              Incluye un encabezado Location en la respuesta con la URI del recurso recién creado.
            </AlertDescription>
          </Alert>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="p-5 border-b bg-slate-50">
              <h3 className="text-lg font-medium">Ejemplo de respuesta con Location</h3>
            </div>
            <div className="p-5">
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
          </div>
          
          <div className="border rounded-lg overflow-hidden shadow-sm mt-6">
            <div className="p-5 border-b bg-slate-50">
              <h3 className="text-lg font-medium">Validación de datos</h3>
              <p className="text-sm text-slate-600 mt-2">
                Implementa una validación exhaustiva de los datos entrantes y proporciona mensajes de error claros:
              </p>
            </div>
            <div className="p-5">
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
          </div>
          
          <Alert variant="default" className="bg-amber-50 border-amber-100 mt-6">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertTitle className="text-amber-800 text-base">Idempotencia condicional</AlertTitle>
            <AlertDescription className="text-amber-700">
              Aunque POST no es idempotente por definición, puedes implementar un comportamiento idempotente usando identificadores de solicitud.
            </AlertDescription>
          </Alert>
          
          <div className="border rounded-lg overflow-hidden shadow-sm mt-4">
            <div className="p-5 border-b bg-slate-50">
              <h3 className="text-lg font-medium">Uso de claves de idempotencia</h3>
            </div>
            <div className="p-5">
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
          </div>
        </section>
        
        {/* POST vs PUT */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">POST vs PUT</h2>
          
          <div className="overflow-hidden rounded-lg border shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="border-b p-4 text-sm font-semibold text-slate-600">Característica</th>
                  <th className="border-b p-4 text-sm font-semibold text-slate-600">POST</th>
                  <th className="border-b p-4 text-sm font-semibold text-slate-600">PUT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b p-4 bg-slate-50">Idempotencia</td>
                  <td className="border-b p-4">No idempotente</td>
                  <td className="border-b p-4">Idempotente</td>
                </tr>
                <tr>
                  <td className="border-b p-4 bg-slate-50">URI del recurso</td>
                  <td className="border-b p-4">El servidor decide la URI final</td>
                  <td className="border-b p-4">El cliente especifica la URI exacta</td>
                </tr>
                <tr>
                  <td className="border-b p-4 bg-slate-50">Uso principal</td>
                  <td className="border-b p-4">Crear nuevos recursos</td>
                  <td className="border-b p-4">Actualizar recursos existentes</td>
                </tr>
                <tr>
                  <td className="p-4 bg-slate-50">Colecciones</td>
                  <td className="p-4">POST a la colección</td>
                  <td className="p-4">PUT al recurso específico</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Casos de uso avanzados */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Casos de uso avanzados</h2>
          
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium">Operaciones que no son CRUD</h3>
                <p className="text-sm text-slate-600 mt-2">
                  Aunque REST se centra en operaciones CRUD sobre recursos, POST también puede utilizarse para operaciones más complejas:
                </p>
              </div>
              <div className="p-5">
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
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium">Procesamiento en lote (Batch)</h3>
                <p className="text-sm text-slate-600 mt-2">
                  POST es adecuado para operaciones en lote que crean o modifican múltiples recursos:
                </p>
              </div>
              <div className="p-5">
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
          </div>
        </section>
        
        {/* Códigos de estado comunes */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Códigos de estado comunes</h2>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 w-[140px] font-medium">201 Created</td>
                  <td className="p-4 text-sm">El recurso se creó correctamente. Incluye la URI del nuevo recurso en el encabezado Location.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">202 Accepted</td>
                  <td className="p-4 text-sm">La solicitud se aceptó pero aún no se ha completado (útil para procesos asincrónicos).</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">400 Bad Request</td>
                  <td className="p-4 text-sm">La solicitud tiene errores de formato o validación.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">409 Conflict</td>
                  <td className="p-4 text-sm">La solicitud no pudo completarse debido a un conflicto con el estado actual del recurso.</td>
                </tr>
                <tr>
                  <td className="p-4 bg-slate-50 font-medium">422 Unprocessable</td>
                  <td className="p-4 text-sm">La solicitud está bien formada pero tiene errores semánticos.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Consideraciones de seguridad */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Consideraciones de seguridad</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="font-medium mb-2">Inyección de datos</h3>
              <p className="text-sm text-slate-700">
                Valida y desinfecta todas las entradas para prevenir inyecciones. Nunca confíes en los datos
                enviados por el cliente sin validarlos adecuadamente.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="font-medium mb-2">CSRF</h3>
              <p className="text-sm text-slate-700">
                Implementa tokens anti-CSRF para operaciones POST, especialmente en aplicaciones web que
                manejan autenticación basada en cookies.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="font-medium mb-2">Límites de tamaño</h3>
              <p className="text-sm text-slate-700">
                Establece límites para el tamaño del cuerpo de la solicitud para evitar ataques de
                denegación de servicio por consumo de recursos.
              </p>
            </div>
          </div>
        </section>
        
        {/* Relacionados */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/methods/put" className="block p-5 border rounded-lg hover:bg-slate-50 transition-colors">
              <h3 className="font-medium mb-2">Método PUT</h3>
              <p className="text-sm text-slate-600">Reemplazar recursos completamente</p>
            </Link>
            <Link to="/methods/patch" className="block p-5 border rounded-lg hover:bg-slate-50 transition-colors">
              <h3 className="font-medium mb-2">Método PATCH</h3>
              <p className="text-sm text-slate-600">Actualizar parcialmente recursos</p>
            </Link>
            <Link to="/validation" className="block p-5 border rounded-lg hover:bg-slate-50 transition-colors">
              <h3 className="font-medium mb-2">Validación</h3>
              <p className="text-sm text-slate-600">Técnicas para validar datos en APIs</p>
            </Link>
          </div>
        </section>
      </PageContent>
    </PageLayout>
  );
};

export default PostMethodPage;
