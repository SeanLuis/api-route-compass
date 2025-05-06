import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";

const Get = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Método GET" 
        description="Uso correcto del método GET para recuperar recursos."
        path={["Métodos HTTP", "GET"]}
      >
        <p>
          El método GET es uno de los pilares de REST, utilizado para recuperar datos de un recurso o colección
          de recursos. Es el método HTTP más comúnmente utilizado y forma la base de la navegación web.
        </p>
        
        <h2>Principios del Método GET</h2>
        
        <ul>
          <li><strong>Seguro:</strong> No debe modificar el estado del servidor ni de los recursos</li>
          <li><strong>Idempotente:</strong> Múltiples solicitudes GET idénticas deben producir el mismo resultado</li>
          <li><strong>Cacheable:</strong> Las respuestas pueden almacenarse en caché para mejorar el rendimiento</li>
          <li><strong>Sin efectos secundarios:</strong> No debe alterar datos en el servidor</li>
        </ul>
        
        <h2>Casos de Uso</h2>
        
        <h3>1. Recuperar un Recurso Específico</h3>
        
        <EndpointExample
          method="GET"
          path="/api/v1/products/123"
          description="Obtiene los detalles de un producto específico."
          responseExample={`{
  "id": "123",
  "name": "Auriculares Premium",
  "description": "Auriculares inalámbricos con cancelación de ruido",
  "price": 129.99,
  "category": "electronics",
  "stock": 45,
  "ratings": {
    "average": 4.7,
    "count": 142
  }
}`}
        />
        
        <h3>2. Listar una Colección de Recursos</h3>
        
        <EndpointExample
          method="GET"
          path="/api/v1/products"
          description="Obtiene una lista paginada de productos."
          responseExample={`{
  "items": [
    {
      "id": "123",
      "name": "Auriculares Premium",
      "price": 129.99
    },
    {
      "id": "124",
      "name": "Teclado Mecánico",
      "price": 89.99
    },
    {
      "id": "125",
      "name": "Ratón Inalámbrico",
      "price": 45.99
    }
  ],
  "page": 1,
  "per_page": 3,
  "total": 187
}`}
        />
        
        <h3>3. Filtrar Recursos</h3>
        
        <EndpointExample
          method="GET"
          path="/api/v1/products?category=electronics&min_price=50&max_price=200&sort=price_asc"
          description="Recupera productos filtrados por categoría y precio, ordenados por precio ascendente."
          responseExample={`{
  "items": [
    {
      "id": "125",
      "name": "Ratón Inalámbrico",
      "price": 45.99,
      "category": "electronics"
    },
    {
      "id": "124",
      "name": "Teclado Mecánico",
      "price": 89.99,
      "category": "electronics"
    },
    {
      "id": "123",
      "name": "Auriculares Premium",
      "price": 129.99,
      "category": "electronics"
    }
  ],
  "page": 1,
  "per_page": 3,
  "total": 24,
  "filters_applied": {
    "category": "electronics",
    "price_range": [50, 200],
    "sort": "price_asc"
  }
}`}
        />
        
        <h3>4. Buscar Recursos</h3>
        
        <EndpointExample
          method="GET"
          path="/api/v1/products/search?q=auriculares+bluetooth"
          description="Busca productos que coincidan con los términos de búsqueda."
          responseExample={`{
  "query": "auriculares bluetooth",
  "items": [
    {
      "id": "123",
      "name": "Auriculares Premium",
      "description": "Auriculares inalámbricos con bluetooth y cancelación de ruido",
      "relevance": 0.92
    },
    {
      "id": "456",
      "name": "Auriculares Bluetooth Sport",
      "description": "Auriculares deportivos resistentes al agua",
      "relevance": 0.87
    }
  ],
  "total": 7
}`}
        />
        
        <h2>Buenas Prácticas</h2>
        
        <h3>Cabeceras de Caché</h3>
        <p>
          Utiliza las cabeceras de caché adecuadas para mejorar el rendimiento y reducir la carga del servidor:
        </p>
        
        <CodeBlock
          code={`GET /api/v1/products/123 HTTP/1.1
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=3600, public
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Last-Modified: Wed, 15 May 2023 12:30:45 GMT

{
  "id": "123",
  "name": "Auriculares Premium",
  ...
}`}
          language="http"
        />
        
        <h3>Condicional GET</h3>
        <p>
          Implementa solicitudes condicionales para evitar transferencias innecesarias:
        </p>
        
        <CodeBlock
          code={`# Solicitud con If-None-Match
GET /api/v1/products/123 HTTP/1.1
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"

HTTP/1.1 304 Not Modified

# Solicitud con If-Modified-Since
GET /api/v1/products/123 HTTP/1.1
If-Modified-Since: Wed, 15 May 2023 12:30:45 GMT

HTTP/1.1 304 Not Modified`}
          language="http"
        />
        
        <h3>Paginación, Filtros y Ordenamiento</h3>
        <p>
          Implementa parámetros consistentes para paginación, filtrado y ordenamiento:
        </p>
        
        <CodeBlock
          code={`# Paginación básica
GET /api/v1/products?page=2&per_page=20

# Paginación por cursor
GET /api/v1/products?cursor=dXNlcjpYYVg3

# Filtros
GET /api/v1/products?category=electronics&in_stock=true

# Ordenamiento
GET /api/v1/products?sort=price_desc,popularity_desc

# Combinados
GET /api/v1/products?category=electronics&min_price=100&page=1&per_page=20&sort=newest`}
          language="http"
        />
        
        <h3>Control de Representación</h3>
        <p>
          Permite al cliente especificar el formato y nivel de detalle de la respuesta:
        </p>
        
        <CodeBlock
          code={`# Negociación de contenido
GET /api/v1/products/123
Accept: application/json

# Campos específicos
GET /api/v1/products/123?fields=id,name,price

# Expansión de relaciones
GET /api/v1/orders/789?expand=customer,items.product

# Versión del API
GET /api/v1/products/123
Accept-Version: 1.2`}
          language="http"
        />
        
        <h2>Consideraciones de Seguridad</h2>
        
        <ul>
          <li><strong>Datos sensibles:</strong> No enviar información sensible en las URLs</li>
          <li><strong>Control de acceso:</strong> Validar permisos antes de devolver recursos</li>
          <li><strong>Inyección:</strong> Sanitizar y validar todos los parámetros de consulta</li>
          <li><strong>Limitación de tasa:</strong> Implementar límites para evitar abusos</li>
        </ul>
        
        <h2>Códigos de Estado</h2>
        
        <p>Los códigos de estado comunes para el método GET incluyen:</p>
        
        <ul>
          <li><strong>200 OK:</strong> La solicitud se completó correctamente</li>
          <li><strong>304 Not Modified:</strong> El recurso no ha cambiado desde la última solicitud</li>
          <li><strong>400 Bad Request:</strong> La solicitud tiene parámetros inválidos</li>
          <li><strong>401 Unauthorized:</strong> Se requiere autenticación</li>
          <li><strong>403 Forbidden:</strong> El cliente no tiene permisos para acceder al recurso</li>
          <li><strong>404 Not Found:</strong> El recurso solicitado no existe</li>
          <li><strong>429 Too Many Requests:</strong> El cliente ha enviado demasiadas solicitudes</li>
        </ul>
        
        <blockquote>
          "El método GET es la base de la navegabilidad de tu API. Diseñar endpoints GET bien estructurados, 
          con paginación, filtrado y ordenamiento consistentes, mejora significativamente la experiencia del 
          desarrollador y la eficiencia de tu API."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default Get;
