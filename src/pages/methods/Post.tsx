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
        description="El método POST se utiliza para enviar datos al servidor para crear un nuevo recurso. Es uno de los métodos más comunes en el desarrollo de APIs REST y aplicaciones web."
        path={["Inicio", "Métodos HTTP", "POST"]}
      >
        {/* Características principales */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Creación de recursos
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                El uso principal de POST es crear nuevos recursos en el servidor.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <X className="h-4 w-4 text-red-600 dark:text-red-500 mr-2" />
                No idempotente
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Múltiples solicitudes POST idénticas pueden crear múltiples recursos.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Contiene cuerpo
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Generalmente incluye datos en el cuerpo de la solicitud.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Modifica estado
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Cambia el estado del servidor al crear o actualizar recursos.
              </p>
            </div>
          </div>
        </section>
        
        {/* Casos de uso comunes */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Casos de uso comunes</h2>
          
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium mb-2">Crear un nuevo recurso</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Este es el uso más común y estándar del método POST</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="POST"
                  path="/api/v1/products"
                  description="Crea un nuevo producto"
                  requestExample={`{
  "name": "Smartphone Pro",
  "description": "Teléfono inteligente de alta gama",
  "price": 599.99,
  "category": "electronics",
  "stock": 50,
  "specifications": {
    "screen": "6.5 inches",
    "processor": "Octa-core 2.5GHz",
    "ram": "8GB",
    "storage": "128GB"
  }
}`}
                  responseExample={`{
  "id": "prod_123456",
  "name": "Smartphone Pro",
  "description": "Teléfono inteligente de alta gama",
  "price": 599.99,
  "category": "electronics",
  "stock": 50,
  "specifications": {
    "screen": "6.5 inches",
    "processor": "Octa-core 2.5GHz",
    "ram": "8GB",
    "storage": "128GB"
  },
  "created_at": "2023-06-10T15:30:00Z",
  "updated_at": "2023-06-10T15:30:00Z"
}`}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium mb-2">Enviar datos a un proceso</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">POST también se usa para enviar datos que serán procesados sin crear un recurso persistente</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="POST"
                  path="/api/v1/payments/calculate-fees"
                  description="Calcula las tarifas para un posible pago"
                  requestExample={`{
  "amount": 1500.00,
  "currency": "USD",
  "payment_method": "credit_card",
  "country": "US"
}`}
                  responseExample={`{
  "base_amount": 1500.00,
  "processing_fee": 45.00,
  "tax": 12.38,
  "total_amount": 1557.38,
  "currency": "USD"
}`}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium mb-2">Añadir elementos a una colección</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Agregar un nuevo elemento a una colección existente</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="POST"
                  path="/api/v1/orders/ord_789/items"
                  description="Añade un producto a un pedido existente"
                  requestExample={`{
  "product_id": "prod_123456",
  "quantity": 2,
  "price_override": 549.99
}`}
                  responseExample={`{
  "order_id": "ord_789",
  "item_id": "item_456",
  "product_id": "prod_123456",
  "product_name": "Smartphone Pro",
  "quantity": 2,
  "unit_price": 549.99,
  "total_price": 1099.98,
  "added_at": "2023-06-10T16:15:00Z"
}`}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Casos especiales de POST */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Casos especiales de POST</h2>
          
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium">Búsquedas complejas</h3>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                  Aunque GET es preferible para búsquedas, POST puede usarse cuando los criterios son demasiado complejos para una URL.
                </p>
                <EndpointExample 
                  method="POST"
                  path="/api/v1/products/search"
                  description="Realiza una búsqueda avanzada de productos"
                  requestExample={`{
  "filters": {
    "price_range": { "min": 100, "max": 500 },
    "categories": ["electronics", "accessories"],
    "rating": { "min": 4 }
  },
  "sort": { "field": "popularity", "order": "desc" },
  "pagination": { "page": 1, "limit": 20 }
}`}
                  responseExample={`{
  "total": 156,
  "page": 1,
  "limit": 20,
  "results": [
    { "id": "prod_456", "name": "Wireless Earbuds", "price": 149.99, "..." },
    { "id": "prod_789", "name": "Smart Watch", "price": 299.99, "..." },
    { "..." }
  ]
}`}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium">Iniciar sesión / Autenticación</h3>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                  Es común usar POST para enviar credenciales y obtener tokens de autenticación.
                </p>
                <EndpointExample 
                  method="POST"
                  path="/api/v1/auth/login"
                  description="Iniciar sesión y obtener un token de acceso"
                  requestExample={`{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}`}
                  responseExample={`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "Bearer",
  "user": {
    "id": "user_123",
    "name": "Usuario Ejemplo",
    "email": "usuario@ejemplo.com"
  }
}`}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium">Subida de archivos</h3>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                  POST es el método estándar para cargar archivos al servidor.
                </p>
                <EndpointExample 
                  method="POST"
                  path="/api/v1/files/upload"
                  description="Carga un archivo al servidor"
                  requestExample={`
// Usando FormData (multipart/form-data)
const formData = new FormData();
formData.append('file', fileBlob);
formData.append('type', 'image');
formData.append('description', 'Imagen de perfil');

fetch('/api/v1/files/upload', {
  method: 'POST',
  body: formData
});`}
                  responseExample={`{
  "file_id": "file_789",
  "filename": "profile_image.jpg",
  "content_type": "image/jpeg",
  "size": 123456,
  "url": "https://api.ejemplo.com/files/file_789",
  "uploaded_at": "2023-06-10T16:30:00Z"
}`}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Mejores prácticas */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Mejores prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100 dark:bg-blue-950/50 dark:border-blue-900/50">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-300 text-base">Respuesta apropiada</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              Después de un POST exitoso que crea un recurso, la respuesta debe incluir:
              <ul className="list-disc ml-6 mt-2">
                <li>Código de estado 201 Created</li>
                <li>Encabezado Location con la URL del nuevo recurso</li>
                <li>Representación del recurso creado en el cuerpo</li>
              </ul>
            </AlertDescription>
          </Alert>
          
          <div className="mt-6 space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium">Ejemplos de respuestas correctas</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 p-5">
                <div>
                  <h4 className="font-medium text-sm mb-3 text-green-600">Correcto ✓</h4>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border">
                    <CodeBlock
                      code={`HTTP/1.1 201 Created
Location: /api/v1/products/prod_123
Content-Type: application/json

{
  "id": "prod_123",
  "name": "Nuevo Producto",
  "created_at": "2023-06-10T12:00:00Z",
  ...
}`}
                      language="http"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-3 text-red-600 mt-4 md:mt-0">Incorrecto ❌</h4>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border">
                    <CodeBlock
                      code={`HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "message": "El producto fue creado"
}`}
                      language="http"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Alert variant="default" className="bg-amber-50 border-amber-100 dark:bg-amber-950/50 dark:border-amber-900/50">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <AlertTitle className="text-amber-800 dark:text-amber-300 text-base">Prevención de envíos duplicados</AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-400">
                Para prevenir la creación de recursos duplicados debido a reenvíos accidentales:
                <ul className="list-disc ml-6 mt-2">
                  <li>Usa identificadores idempotentes del cliente (idempotency keys)</li>
                  <li>Implementa validaciones de unicidad en los campos apropiados</li>
                  <li>Usa POST/Redirect/GET para formularios web</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </section>
        
        {/* Códigos de estado comunes */}
        <section className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Códigos de estado comunes</h2>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 w-[140px] font-medium">201 Created</td>
                  <td className="p-4 text-sm">La solicitud ha tenido éxito y se ha creado un nuevo recurso.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">202 Accepted</td>
                  <td className="p-4 text-sm">La solicitud ha sido aceptada para procesamiento, pero el procesamiento no se ha completado.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">400 Bad Request</td>
                  <td className="p-4 text-sm">La solicitud tiene errores de formato o contenido inválido.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">401 Unauthorized</td>
                  <td className="p-4 text-sm">Autenticación requerida para crear el recurso.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">403 Forbidden</td>
                  <td className="p-4 text-sm">El cliente no tiene permiso para crear el recurso.</td>
                </tr>
                <tr>
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">409 Conflict</td>
                  <td className="p-4 text-sm">La solicitud no pudo completarse debido a un conflicto con el estado actual del recurso.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* POST vs. PUT */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">POST vs. PUT</h2>
          
          <p className="text-slate-700 dark:text-slate-300">
            Es importante entender la diferencia entre POST y PUT, ya que ambos pueden usarse para crear recursos:
          </p>
          
          <div className="overflow-hidden border rounded-lg shadow-sm">
            <table className="w-full border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Característica</th>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">POST</th>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">PUT</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4 font-medium text-slate-700 dark:text-slate-300">Idempotencia</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">No idempotente</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">Idempotente</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700 dark:text-slate-300">URI del recurso</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">El servidor decide la URI</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">El cliente especifica la URI</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700 dark:text-slate-300">Resultado de múltiples solicitudes</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">Crea múltiples recursos</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">Crea/actualiza un solo recurso</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700 dark:text-slate-300">Uso principal</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">Crear recursos cuando el servidor asigna ID</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">Crear/actualizar recursos cuando el ID es conocido</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <Alert className="bg-slate-50 border-slate-100 dark:bg-slate-900/50 dark:border-slate-800">
            <Info className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <AlertTitle className="text-slate-800 dark:text-slate-200 text-base">Regla práctica</AlertTitle>
            <AlertDescription className="text-slate-700 dark:text-slate-300">
              Usa POST cuando no conoces la URL exacta del recurso que se creará.
              Usa PUT cuando conoces exactamente la URL donde quieres crear o reemplazar un recurso.
            </AlertDescription>
          </Alert>
        </section>
        
        {/* Relacionados */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/methods/put" className="block p-5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Método PUT</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Actualizar o reemplazar recursos</p>
            </Link>
            <Link to="/methods/patch" className="block p-5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Método PATCH</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Actualizar parcialmente recursos</p>
            </Link>
            <Link to="/status-codes" className="block p-5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Códigos de estado</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Significado de los códigos HTTP</p>
            </Link>
          </div>
        </section>
      </PageContent>
    </PageLayout>
  );
};

export default PostMethodPage;
