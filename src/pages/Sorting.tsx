import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";

const Sorting = () => {
  return (
    <PageLayout>
      <PageContent
        title="Ordenamiento"
        description="Estrategias para implementar ordenamiento en APIs REST."
        path={["Funcionalidades", "Ordenamiento"]}
      >
        <p>
          El ordenamiento permite a los clientes especificar el orden en que desean
          recibir los recursos de una colección. Esta funcionalidad mejora la
          experiencia del desarrollador y proporciona flexibilidad para diferentes
          casos de uso sin necesidad de crear múltiples endpoints.
        </p>

        <h2>Por Qué Implementar Ordenamiento</h2>

        <p>
          Un sistema de ordenamiento bien implementado ofrece varios beneficios:
        </p>

        <ul>
          <li>
            <strong>Flexibilidad:</strong> Los clientes pueden adaptar las respuestas
            a sus necesidades específicas
          </li>
          <li>
            <strong>Eficiencia:</strong> Se evitan ordenamientos adicionales en el
            lado del cliente
          </li>
          <li>
            <strong>Usabilidad:</strong> Facilita la presentación de datos en
            interfaces de usuario
          </li>
          <li>
            <strong>Consistencia:</strong> Proporciona resultados predecibles para
            paginación y navegación
          </li>
          <li>
            <strong>Rendimiento:</strong> Permite optimizaciones específicas cuando
            se conoce el criterio de ordenamiento
          </li>
        </ul>

        <h2>Patrones de Implementación</h2>

        <h3>1. Ordenamiento Simple por Campo</h3>

        <p>
          El enfoque más básico y común es permitir ordenar por un solo campo:
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/products?sort=price"
          description="Recupera productos ordenados por precio (ascendente por defecto)."
          responseExample={`{
  "items": [
    { 
      "id": "prod_101",
      "name": "Cable USB",
      "price": 5.99
    },
    { 
      "id": "prod_102",
      "name": "Cargador Inalámbrico",
      "price": 19.99
    },
    { 
      "id": "prod_103",
      "name": "Auriculares",
      "price": 29.99
    }
    // ... más productos ordenados por precio ascendente ...
  ]
}`}
        />

        <h3>2. Ordenamiento con Dirección (Ascendente/Descendente)</h3>

        <p>
          Permite especificar la dirección del ordenamiento:
        </p>

        <CodeBlock
          code={`# Usando sufijos para indicar dirección
GET /api/v1/products?sort=price_asc
GET /api/v1/products?sort=price_desc

# Usando un parámetro separado para la dirección
GET /api/v1/products?sort=price&order=desc

# Prefijo con signo
GET /api/v1/products?sort=-price  # Descendente
GET /api/v1/products?sort=+price  # Ascendente (o sin signo)`}
          language="http"
        />

        <h3>3. Ordenamiento por Múltiples Campos</h3>

        <p>
          Permite ordenar por varios campos con diferentes prioridades:
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/products?sort=category_asc,price_desc"
          description="Recupera productos ordenados primero por categoría (ascendente) y luego por precio (descendente)."
          responseExample={`{
  "items": [
    // Categoría: Accesorios
    { 
      "id": "prod_104",
      "name": "Funda Premium",
      "category": "accesorios",
      "price": 39.99
    },
    { 
      "id": "prod_105",
      "name": "Protector de Pantalla",
      "category": "accesorios",
      "price": 12.99
    },
    // Categoría: Electrónica
    { 
      "id": "prod_106",
      "name": "Smartphone de Alta Gama",
      "category": "electronica",
      "price": 899.99
    },
    { 
      "id": "prod_107",
      "name": "Tablet 10 pulgadas",
      "category": "electronica",
      "price": 349.99
    }
    // ... más productos ordenados por categoría y precio ...
  ]
}`}
        />

        <p>
          Otras sintaxis comunes para ordenamiento múltiple:
        </p>

        <CodeBlock
          code={`# Separados por comas
GET /api/v1/products?sort=category,price_desc

# Múltiples parámetros de ordenamiento
GET /api/v1/products?sort=category&sort=price_desc

# Formato de array
GET /api/v1/products?sort[]=category&sort[]=-price

# Sintaxis JSON
GET /api/v1/products?sort=["category","-price"]`}
          language="http"
        />

        <h3>4. Ordenamiento por Campos Anidados</h3>

        <p>
          Permite ordenar por propiedades anidadas o relacionadas:
        </p>

        <CodeBlock
          code={`# Ordenar por campos anidados usando notación de punto
GET /api/v1/orders?sort=customer.name_asc

# Ordenar por relaciones
GET /api/v1/products?sort=reviews.average_rating_desc

# Alternativa con nombres de campo específicos
GET /api/v1/orders?sort=customer_name_asc
GET /api/v1/products?sort=average_rating_desc`}
          language="http"
        />

        <h2>Mejores Prácticas</h2>

        <h3>Orden por Defecto</h3>

        <p>
          Siempre define un orden por defecto claro para cada recurso:
        </p>

        <ul>
          <li>Especifica el orden por defecto en la documentación</li>
          <li>
            Elige un orden por defecto que tenga sentido para el recurso (ej.
            cronológico para logs, alfabético para usuarios)
          </li>
          <li>
            Considera definir órdenes por defecto diferentes para distintos
            endpoints del mismo recurso
          </li>
        </ul>

        <CodeBlock
          code={`// Ejemplo de implementación de orden por defecto en Express.js
app.get('/api/v1/products', (req, res) => {
  let sort = req.query.sort || 'created_at_desc'; // Orden por defecto
  
  // Procesamiento del parámetro sort...
  
  // Continuar con la consulta a la base de datos...
});`}
          language="javascript"
        />

        <h3>Campos Ordenables Permitidos</h3>

        <p>
          Define y valida explícitamente qué campos pueden usarse para ordenar:
        </p>

        <ul>
          <li>Lista los campos ordenables en la documentación</li>
          <li>Valida los campos de ordenamiento para evitar inyecciones SQL</li>
          <li>Considera el rendimiento al elegir qué campos son ordenables</li>
        </ul>

        <CodeBlock
          code={`// Validación de campos ordenables
app.get('/api/v1/products', (req, res) => {
  const allowedSortFields = ['name', 'price', 'created_at', 'popularity'];
  const defaultSort = 'created_at_desc';
  
  let sort = req.query.sort || defaultSort;
  let field = sort.replace(/_asc$|_desc$/, '');
  let direction = sort.endsWith('_desc') ? 'DESC' : 'ASC';
  
  if (!allowedSortFields.includes(field)) {
    return res.status(400).json({ 
      error: 'Invalid sort field', 
      allowed_fields: allowedSortFields 
    });
  }
  
  // Continuar con la consulta...
});`}
          language="javascript"
        />

        <h3>Consistencia en la Sintaxis</h3>

        <p>
          Mantén una sintaxis de ordenamiento consistente en toda tu API:
        </p>

        <ul>
          <li>Usa el mismo parámetro (<code>sort</code>) en todos los endpoints</li>
          <li>Mantén consistencia en cómo se indica la dirección</li>
          <li>Usa la misma sintaxis para el ordenamiento múltiple</li>
        </ul>

        <h3>Optimización de Rendimiento</h3>

        <p>
          Asegura un rendimiento óptimo para el ordenamiento:
        </p>

        <ul>
          <li>
            Crea índices en la base de datos para los campos ordenables comunes
          </li>
          <li>
            Considera índices compuestos para ordenamiento por múltiples campos
          </li>
          <li>
            Limita la cantidad de campos por los que se puede ordenar
            simultáneamente
          </li>
        </ul>

        <CodeBlock
          code={`-- Índices para campos comunes de ordenamiento
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_created_at ON products(created_at);

-- Índice compuesto para ordenamiento común por múltiples campos
CREATE INDEX idx_products_category_price ON products(category ASC, price DESC);`}
          language="sql"
        />

        <h3>Indicar Orden Aplicado</h3>

        <p>
          Es útil incluir en la respuesta el ordenamiento que se aplicó:
        </p>

        <CodeBlock
          code={`{
  "items": [...],
  "sort_applied": {
    "fields": [
      { "name": "category", "direction": "asc" },
      { "name": "price", "direction": "desc" }
    ]
  },
  "links": {
    "self": "https://api.example.com/products?sort=category_asc,price_desc&page=1"
  }
}`}
          language="json"
        />

        <h2>Casos de Uso Específicos</h2>

        <h3>Ordenamiento para E-commerce</h3>

        <p>
          Ordenamiento típico para un catálogo de productos:
        </p>

        <CodeBlock
          code={`# Ordenamiento común en e-commerce
GET /api/v1/products?sort=relevance        # Por relevancia (algoritmo personalizado)
GET /api/v1/products?sort=price_asc        # De menor a mayor precio
GET /api/v1/products?sort=price_desc       # De mayor a menor precio
GET /api/v1/products?sort=newest           # Los más nuevos primero
GET /api/v1/products?sort=bestselling      # Los más vendidos primero
GET /api/v1/products?sort=rating_desc      # Mejor valorados primero`}
          language="http"
        />

        <h3>Ordenamiento para Contenido Social</h3>

        <p>
          Ordenamiento típico para posts, comentarios, etc.:
        </p>

        <CodeBlock
          code={`# Ordenamiento para contenido social
GET /api/v1/posts?sort=recent        # Más recientes primero (cronológico)
GET /api/v1/posts?sort=popular       # Más populares primero
GET /api/v1/comments?sort=oldest     # Más antiguos primero
GET /api/v1/comments?sort=likes      # Más gustados primero
GET /api/v1/feed?sort=relevance      # Algoritmo personalizado de relevancia`}
          language="http"
        />

        <h3>Ordenamiento con Algoritmos Personalizados</h3>

        <p>
          Para casos más complejos donde el ordenamiento se basa en algoritmos:
        </p>

        <CodeBlock
          code={`# Ordenamientos algorítmicos
GET /api/v1/search?q=laptops&sort=relevance    # Basado en coincidencia de búsqueda
GET /api/v1/recommendations?sort=personalized  # Basado en preferencias del usuario`}
          language="http"
        />

        <h2>Ordenamiento y su Relación con Otras Funcionalidades</h2>

        <h3>Ordenamiento y Paginación</h3>

        <p>
          El ordenamiento debe funcionar correctamente junto con la paginación:
        </p>

        <ul>
          <li>El orden debe ser consistente entre páginas</li>
          <li>Los enlaces de paginación deben mantener los parámetros de
            ordenamiento
          </li>
          <li>El ordenamiento debe aplicarse antes de la paginación</li>
        </ul>

        <CodeBlock
          code={`{
  "items": [...],
  "pagination": {
    "page": 2,
    "per_page": 20,
    "total_pages": 5
  },
  "links": {
    "first": "/api/v1/products?sort=price_asc&page=1",
    "prev": "/api/v1/products?sort=price_asc&page=1",
    "next": "/api/v1/products?sort=price_asc&page=3",
    "last": "/api/v1/products?sort=price_asc&page=5"
  }
}`}
          language="json"
        />

        <h3>Ordenamiento y Filtrado</h3>

        <p>
          El ordenamiento debe funcionar correctamente con el filtrado:
        </p>

        <CodeBlock
          code={`# Combinación de filtrado y ordenamiento
GET /api/v1/products?category=electronics&price_min=100&sort=rating_desc

# El orden debe aplicarse al conjunto filtrado
SELECT * FROM products 
WHERE category = 'electronics' AND price >= 100
ORDER BY rating DESC
LIMIT 20 OFFSET 0;`}
          language="http"
        />

        <h3>Ordenamiento y Proyección de Campos</h3>

        <p>
          El ordenamiento debe funcionar incluso cuando los campos ordenados no
          están incluidos en la respuesta:
        </p>

        <CodeBlock
          code={`# Ordenamiento con selección de campos
GET /api/v1/users?fields=id,name,email&sort=last_login_desc

# El campo de ordenamiento no está en la respuesta
{
  "items": [
    { "id": "user_101", "name": "Ana García", "email": "ana@example.com" },
    { "id": "user_102", "name": "Juan López", "email": "juan@example.com" }
  ]
}`}
          language="http"
        />

        <h2>Ejemplos de APIs Populares</h2>

        <h3>GitHub API</h3>

        <p>
          GitHub utiliza parámetros <code>sort</code> y <code>direction</code>:
        </p>

        <CodeBlock
          code={`# Ordenamiento en GitHub API
GET /repos/octocat/hello-world/issues?sort=created&direction=desc

# Para listar repositorios
GET /users/octocat/repos?sort=pushed&direction=desc`}
          language="http"
        />

        <h3>Google API</h3>

        <p>
          Google utiliza el parámetro <code>orderBy</code>:
        </p>

        <CodeBlock
          code={`# Ordenamiento en Google Drive API
GET https://www.googleapis.com/drive/v3/files?orderBy=name

# Ordenamiento múltiple
GET https://www.googleapis.com/drive/v3/files?orderBy=folder,name desc`}
          language="http"
        />

        <blockquote>
          "Un buen sistema de ordenamiento equilibra la simplicidad de uso con la
          flexibilidad para escenarios complejos. Aunque parece una funcionalidad
          sencilla, el ordenamiento bien implementado puede mejorar drásticamente la
          experiencia del desarrollador y el rendimiento de la aplicación cliente."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default Sorting;
