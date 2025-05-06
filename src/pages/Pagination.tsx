import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";

const Pagination = () => {
  return (
    <PageLayout>
      <PageContent
        title="Paginación"
        description="Técnicas para implementar paginación eficiente en APIs REST."
        path={["Funcionalidades", "Paginación"]}
      >
        <p>
          La paginación es una técnica esencial para gestionar grandes conjuntos de
          datos en APIs REST. Permite dividir los resultados en "páginas"
          manejables, mejorando el rendimiento, reduciendo la carga de la red y
          proporcionando una mejor experiencia al usuario.
        </p>

        <h2>Por Qué Implementar Paginación</h2>

        <p>
          La paginación resuelve varios problemas críticos en el diseño de APIs:
        </p>

        <ul>
          <li>
            <strong>Rendimiento:</strong> Evita cargar grandes volúmenes de datos
            innecesarios
          </li>
          <li>
            <strong>Experiencia de usuario:</strong> Permite mostrar datos de forma
            incremental
          </li>
          <li>
            <strong>Recursos del servidor:</strong> Reduce la carga en bases de
            datos y servidores
          </li>
          <li>
            <strong>Tiempo de respuesta:</strong> Mejora la velocidad de respuesta
            del servidor
          </li>
          <li>
            <strong>Ancho de banda:</strong> Disminuye el consumo de datos para
            clientes móviles
          </li>
        </ul>

        <h2>Estrategias de Paginación</h2>

        <h3>1. Paginación Basada en Offset</h3>

        <p>
          Este método utiliza dos parámetros principales: <code>page</code> (o{" "}
          <code>offset</code>) y <code>limit</code> (o <code>per_page</code>).
          Es el enfoque más común y simple.
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/products?page=2&per_page=20"
          description="Recupera la segunda página de productos, con 20 elementos por página."
          responseExample={`{
  "items": [
    { 
      "id": "prod_21",
      "name": "Auricular Bluetooth",
      "price": 49.99
    },
    // ... 18 más productos ...
    { 
      "id": "prod_40",
      "name": "Cable USB-C Premium",
      "price": 15.99
    }
  ],
  "pagination": {
    "total_items": 325,
    "total_pages": 17,
    "current_page": 2,
    "per_page": 20,
    "prev_page": 1,
    "next_page": 3
  }
}`}
        />

        <h4>Implementación en Base de Datos</h4>

        <CodeBlock
          code={`// SQL para paginación offset
SELECT * FROM products 
ORDER BY created_at DESC 
LIMIT 20 OFFSET 20;  // page=2 con per_page=20

// MongoDB
db.products.find()
  .sort({ created_at: -1 })
  .skip(20)
  .limit(20);`}
          language="sql"
        />

        <h4>Ventajas:</h4>
        <ul>
          <li>Simple de implementar y entender</li>
          <li>Permite saltar directamente a cualquier página</li>
          <li>Conoces el número total de páginas</li>
          <li>Intuitivo para desarrolladores frontend (ej. componente de paginación)</li>
        </ul>

        <h4>Desventajas:</h4>
        <ul>
          <li>Rendimiento deficiente en conjuntos de datos muy grandes</li>
          <li>Inconsistencias si se modifican datos mientras se pagina</li>
          <li>El cálculo de OFFSET puede ser costoso en bases de datos grandes</li>
          <li>No ideal para datos que cambian frecuentemente</li>
        </ul>

        <h3>2. Paginación Basada en Cursor</h3>

        <p>
          Esta técnica utiliza un "cursor" o "marcador" para apuntar a una
          posición específica en el conjunto de resultados. El cliente utiliza este
          cursor para solicitar la "página siguiente" o "página anterior".
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/products?limit=20&cursor=dxR5aHz7"
          description="Recupera hasta 20 productos después del cursor especificado."
          responseExample={`{
  "items": [
    { 
      "id": "prod_41",
      "name": "Teclado Mecánico",
      "price": 89.99
    },
    // ... 18 más productos ...
    { 
      "id": "prod_60",
      "name": "Mouse Ergonómico",
      "price": 35.99
    }
  ],
  "pagination": {
    "next_cursor": "fGh7Lm9p",
    "prev_cursor": "dxR5aHz7",
    "has_next": true,
    "has_prev": true
  }
}`}
        />

        <h4>Implementación en Base de Datos</h4>

        <CodeBlock
          code={`// SQL para paginación con cursor (id como cursor)
SELECT * FROM products 
WHERE id > 'prod_40'  // último ID de la página anterior
ORDER BY id ASC 
LIMIT 20;

// MongoDB
db.products.find({ _id: { $gt: ObjectId("60a2d3c3e4ce...") } })
  .sort({ _id: 1 })
  .limit(20);

// Para ordenación más compleja (usando timestamp + id)
SELECT * FROM products 
WHERE (created_at, id) > ('2023-06-10 15:30:00', 'prod_40')
ORDER BY created_at ASC, id ASC 
LIMIT 20;`}
          language="sql"
        />

        <h4>Ventajas:</h4>
        <ul>
          <li>Rendimiento constante incluso con conjuntos de datos enormes</li>
          <li>Mayor consistencia con datos que cambian frecuentemente</li>
          <li>Evita el problema de filas duplicadas si se agregan nuevos elementos</li>
          <li>Más eficiente en bases de datos para consultas grandes</li>
        </ul>

        <h4>Desventajas:</h4>
        <ul>
          <li>Mayor complejidad de implementación</li>
          <li>No permite saltar directamente a una página específica</li>
          <li>Generalmente no proporciona conteo total de elementos</li>
          <li>Requiere un campo único ordenable o combinación de campos</li>
        </ul>

        <h3>3. Paginación con Hipermedia (HATEOAS)</h3>

        <p>
          Siguiendo el principio HATEOAS de REST, este enfoque incluye enlaces a
          acciones relacionadas con la paginación directamente en la respuesta.
        </p>

        <CodeBlock
          code={`{
  "items": [
    { "id": "prod_21", "name": "Auricular Bluetooth" },
    // ... más productos ...
  ],
  "_links": {
    "self": { "href": "/api/v1/products?page=2" },
    "first": { "href": "/api/v1/products?page=1" },
    "prev": { "href": "/api/v1/products?page=1" },
    "next": { "href": "/api/v1/products?page=3" },
    "last": { "href": "/api/v1/products?page=17" }
  },
  "page": {
    "number": 2,
    "size": 20,
    "total_elements": 325,
    "total_pages": 17
  }
}`}
          language="json"
        />

        <h4>Ventajas:</h4>
        <ul>
          <li>Mayor adherencia a los principios REST</li>
          <li>El cliente no necesita construir URLs, solo seguir enlaces</li>
          <li>Facilita la navegación y descubrimiento</li>
        </ul>

        <h4>Desventajas:</h4>
        <ul>
          <li>Respuestas más verbosas</li>
          <li>Mayor complejidad para el cliente</li>
        </ul>

        <h2>Mejores Prácticas</h2>

        <h3>Parámetros Consistentes</h3>

        <p>
          Define y utiliza parámetros de paginación coherentes en toda tu API:
        </p>

        <ul>
          <li>
            <strong>limit/per_page:</strong> Para el número de elementos por página
          </li>
          <li>
            <strong>page/offset:</strong> Para paginación basada en offset
          </li>
          <li>
            <strong>cursor/after/before:</strong> Para paginación basada en cursor
          </li>
        </ul>

        <CodeBlock
          code={`# Consistencia en parámetros
/api/v1/products?page=2&per_page=20
/api/v1/orders?page=2&per_page=20
/api/v1/customers?page=2&per_page=20

# En vez de mezclar estilos
/api/v1/products?page=2&per_page=20
/api/v1/orders?p=2&size=20
/api/v1/customers?offset=40&limit=20`}
          language="http"
        />

        <h3>Valores por Defecto y Límites</h3>

        <p>
          Establece valores por defecto razonables y límites máximos para proteger
          tus recursos:
        </p>

        <ul>
          <li>
            Proporciona un valor por defecto para <code>per_page</code> (generalmente
            10, 20 o 50)
          </li>
          <li>
            Define un límite máximo para <code>per_page</code> (ej. 100 o 200)
          </li>
          <li>Si no se especifica la página, asume página 1</li>
        </ul>

        <CodeBlock
          code={`// Ejemplo de implementación en Express.js
app.get('/api/v1/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = Math.min(parseInt(req.query.per_page) || 20, 100); // Máximo 100
  
  const offset = (page - 1) * perPage;
  
  // Continuar con la consulta a la base de datos...
});`}
          language="javascript"
        />

        <h3>Metadatos de Paginación</h3>

        <p>
          Incluye información útil sobre la paginación en la respuesta:
        </p>

        <ul>
          <li>Total de elementos</li>
          <li>Total de páginas</li>
          <li>Página actual</li>
          <li>Enlaces a primera/última/siguiente/anterior página</li>
          <li>Indicadores de si hay más páginas</li>
        </ul>

        <h3>Cabeceras HTTP para Paginación</h3>

        <p>
          Considera el uso de cabeceras HTTP para información de paginación:
        </p>

        <CodeBlock
          code={`HTTP/1.1 200 OK
Content-Type: application/json
X-Total-Count: 325
X-Page-Count: 17
X-Current-Page: 2
Link: <https://api.example.com/products?page=1>; rel="first",
      <https://api.example.com/products?page=1>; rel="prev",
      <https://api.example.com/products?page=3>; rel="next",
      <https://api.example.com/products?page=17>; rel="last"

[
  { "id": "prod_21", "name": "Auricular Bluetooth", ... },
  ...
]`}
          language="http"
        />

        <h3>Manejo de Páginas Fuera de Rango</h3>

        <p>
          Define un comportamiento claro para solicitudes de páginas no existentes:
        </p>

        <ul>
          <li>Para página &lt; 1: redireccionar a la primera página o devolver error</li>
          <li>Para página &gt; total: devolver array vacío o error 404</li>
        </ul>

        <h2>Casos de Uso Específicos</h2>

        <h3>Feeds de Actividad o Líneas de Tiempo</h3>

        <p>
          Para contenido tipo Twitter o Instagram, la paginación basada en cursor es
          ideal:
        </p>

        <CodeBlock
          code={`GET /api/v1/feed?limit=20&before=1622547698_post123
GET /api/v1/feed/latest?limit=20
GET /api/v1/feed/older?timestamp=1622547698&limit=20`}
          language="http"
        />

        <h3>Resultados de Búsqueda</h3>

        <p>
          Para búsquedas donde el usuario puede querer saltar a páginas específicas,
          la paginación offset es apropiada:
        </p>

        <CodeBlock
          code={`GET /api/v1/search?q=auriculares&page=3&per_page=20
GET /api/v1/products?category=electronics&brand=sony&page=2`}
          language="http"
        />

        <h3>Paginación con Filtrado y Ordenamiento</h3>

        <p>
          Combina la paginación con otras funcionalidades para consultas complejas:
        </p>

        <CodeBlock
          code={`GET /api/v1/products?category=electronics&min_price=50&sort=price_asc&page=2&per_page=20`}
          language="http"
        />

        <h2>Consideraciones de Rendimiento</h2>

        <p>
          Optimiza el rendimiento de tu sistema de paginación:
        </p>

        <ul>
          <li>
            <strong>Índices adecuados:</strong> Asegúrate de que los campos
            utilizados para paginación estén indexados
          </li>
          <li>
            <strong>Consultas optimizadas:</strong> Evita SELECT * cuando solo
            necesites algunos campos
          </li>
          <li>
            <strong>Caché:</strong> Considera cachear resultados de páginas
            populares
          </li>
          <li>
            <strong>COUNT() optimizado:</strong> Evita contar todas las filas en
            cada solicitud cuando sea posible
          </li>
        </ul>

        <CodeBlock
          code={`-- Consulta optimizada para paginación
SELECT id, name, price, thumbnail_url 
FROM products 
WHERE category_id = 5
ORDER BY created_at DESC 
LIMIT 20 OFFSET 40;

-- En lugar de
SELECT *
FROM products 
WHERE category_id = 5
ORDER BY created_at DESC 
LIMIT 20 OFFSET 40;`}
          language="sql"
        />

        <h2>Ejemplos de APIs Populares</h2>

        <h3>GitHub API</h3>

        <p>
          GitHub utiliza paginación basada en offset con información en cabeceras:
        </p>

        <CodeBlock
          code={`GET /repositories?page=2&per_page=30
Host: api.github.com

HTTP/1.1 200 OK
Link: <https://api.github.com/repositories?page=1&per_page=30>; rel="prev",
      <https://api.github.com/repositories?page=3&per_page=30>; rel="next",
      <https://api.github.com/repositories?page=1&per_page=30>; rel="first",
      <https://api.github.com/repositories?page=367&per_page=30>; rel="last"`}
          language="http"
        />

        <h3>Twitter API</h3>

        <p>
          Twitter utiliza paginación basada en cursor para sus timelines:
        </p>

        <CodeBlock
          code={`GET /1.1/statuses/home_timeline.json?count=15&max_id=1234567
Host: api.twitter.com

{
  "statuses": [...],
  "search_metadata": {
    "max_id": 1234567,
    "since_id": 1234000,
    "next_results": "?max_id=1233999&q=%23nasa&include_entities=1",
    "refresh_url": "?since_id=1234567&q=%23nasa&include_entities=1"
  }
}`}
          language="http"
        />

        <blockquote>
          "Una buena implementación de paginación equilibra la experiencia del
          usuario, el rendimiento del servidor y la eficiencia de la transferencia
          de datos. Elige la estrategia que mejor se adapte a tu conjunto de datos
          y patrones de acceso, pero sobre todo, mantén la consistencia en toda tu
          API."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default Pagination;
