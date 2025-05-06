
import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";

const Get = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Método GET" 
        description="Uso correcto del método GET para obtener recursos."
        path={["Métodos HTTP", "GET"]}
      >
        <p>
          El método GET es uno de los más fundamentales en REST y se utiliza para recuperar datos de recursos.
          Es un método seguro e idempotente, lo que significa que múltiples solicitudes idénticas deben producir
          el mismo resultado sin efectos secundarios en el servidor.
        </p>
        
        <h2>Principios del Método GET</h2>
        
        <ul>
          <li><strong>Seguro:</strong> No debe modificar recursos en el servidor</li>
          <li><strong>Idempotente:</strong> Múltiples solicitudes idénticas deben tener el mismo efecto</li>
          <li><strong>Cacheable:</strong> Las respuestas pueden ser cacheadas cuando sea apropiado</li>
          <li><strong>No debe contener cuerpo:</strong> Los parámetros se envían en la URL</li>
        </ul>
        
        <h2>Casos de Uso</h2>
        
        <h3>1. Obtener un Listado de Recursos</h3>
        
        <EndpointExample
          method="GET"
          path="/api/v1/products"
          description="Obtiene una colección paginada de productos."
          responseExample={`{
  "data": [
    {
      "id": "prod_123",
      "name": "Smartphone XL",
      "price": 599.99,
      "category": "electronics"
    },
    {
      "id": "prod_124",
      "name": "Laptop Pro",
      "price": 1299.99,
      "category": "electronics"
    }
  ],
  "pagination": {
    "total": 254,
    "page": 1,
    "per_page": 10,
    "pages": 26
  }
}`}
        />
        
        <h3>2. Obtener un Recurso Específico</h3>
        
        <EndpointExample
          method="GET"
          path="/api/v1/products/prod_123"
          description="Obtiene los detalles de un producto específico."
          responseExample={`{
  "id": "prod_123",
  "name": "Smartphone XL",
  "description": "El último smartphone con pantalla grande y batería de larga duración.",
  "price": 599.99,
  "category": "electronics",
  "stock": 45,
  "created_at": "2023-04-15T10:30:00Z",
  "updated_at": "2023-05-20T08:45:12Z",
  "specifications": {
    "screen": "6.7 inches",
    "processor": "Octa-core 2.5GHz",
    "ram": "8GB",
    "storage": "128GB"
  }
}`}
        />
        
        <h3>3. Buscar Recursos con Filtros</h3>
        
        <EndpointExample
          method="GET"
          path="/api/v1/products?category=electronics&price_min=500&price_max=1000"
          description="Obtiene productos filtrados por categoría y rango de precios."
          responseExample={`{
  "data": [
    {
      "id": "prod_123",
      "name": "Smartphone XL",
      "price": 599.99,
      "category": "electronics"
    },
    {
      "id": "prod_125",
      "name": "Tablet Mini",
      "price": 899.99,
      "category": "electronics"
    }
  ],
  "pagination": {
    "total": 8,
    "page": 1,
    "per_page": 10,
    "pages": 1
  }
}`}
        />
        
        <h2>Buenas Prácticas</h2>
        
        <h3>Parámetros de Consulta</h3>
        <p>
          Utiliza parámetros de consulta (query parameters) para filtrar, ordenar y paginar resultados:
        </p>
        
        <CodeBlock
          code={`# Filtrado
GET /products?category=electronics

# Ordenamiento
GET /products?sort=price:desc

# Paginación
GET /products?page=2&per_page=25

# Combinados
GET /products?category=electronics&sort=price:desc&page=2`}
          language="http"
          className="my-6"
        />
        
        <h3>Respuestas Parciales</h3>
        <p>
          Permite al cliente solicitar solo los campos necesarios para mejorar el rendimiento:
        </p>
        
        <CodeBlock
          code={`# Solicitar campos específicos
GET /products/123?fields=id,name,price`}
          language="http"
          className="my-6"
        />
        
        <h3>Códigos de Estado HTTP</h3>
        <p>
          Utiliza los códigos de estado apropiados para las respuestas GET:
        </p>
        
        <ul>
          <li><strong>200 OK:</strong> La solicitud se completó correctamente</li>
          <li><strong>304 Not Modified:</strong> El recurso no ha cambiado desde la última solicitud (usado con caché)</li>
          <li><strong>400 Bad Request:</strong> Parámetros de consulta inválidos</li>
          <li><strong>401 Unauthorized:</strong> Se requiere autenticación</li>
          <li><strong>403 Forbidden:</strong> Cliente autenticado pero sin permisos</li>
          <li><strong>404 Not Found:</strong> Recurso no encontrado</li>
        </ul>
        
        <h2>Consideraciones de Rendimiento</h2>
        <p>
          Como GET es el método más utilizado en muchas APIs, es fundamental optimizar su rendimiento:
        </p>
        
        <ul>
          <li>Implementa caching efectivo con cabeceras apropiadas (ETag, Cache-Control)</li>
          <li>Utiliza compresión GZIP/Brotli para reducir el tamaño de las respuestas</li>
          <li>Implementa paginación para conjuntos grandes de datos</li>
          <li>Permite respuestas parciales para reducir el payload cuando sea posible</li>
          <li>Considera implementar proyecciones o vistas para casos de uso comunes</li>
        </ul>
        
        <blockquote>
          "El método GET es la base de la navegabilidad en REST. Diseñar bien estos endpoints hace que tu API
          sea intuitiva y fácil de explorar, siguiendo el principio HATEOAS de REST."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default Get;
