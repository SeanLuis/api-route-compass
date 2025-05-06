import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";

const Filtering = () => {
  return (
    <PageLayout>
      <PageContent
        title="Filtrado"
        description="Patrones para implementar filtrado flexible en APIs REST."
        path={["Funcionalidades", "Filtrado"]}
      >
        <p>
          El filtrado permite a los clientes de una API REST solicitar exactamente
          los datos que necesitan, reduciendo el volumen de información transferida
          y mejorando la eficiencia. Una implementación adecuada de filtrado puede
          transformar una API básica en una herramienta potente y flexible.
        </p>

        <h2>Por Qué Implementar Filtrado</h2>

        <p>
          Un buen sistema de filtrado proporciona numerosos beneficios:
        </p>

        <ul>
          <li>
            <strong>Eficiencia:</strong> Los clientes reciben solo los datos
            relevantes
          </li>
          <li>
            <strong>Rendimiento:</strong> Reduce la carga en el servidor y el
            tiempo de procesamiento
          </li>
          <li>
            <strong>Flexibilidad:</strong> Permite casos de uso diferentes sin
            crear endpoints específicos
          </li>
          <li>
            <strong>Experiencia del desarrollador:</strong> Facilita la
            integración y adopción de tu API
          </li>
          <li>
            <strong>Escalabilidad:</strong> Minimiza el ancho de banda y recursos
            requeridos
          </li>
        </ul>

        <h2>Enfoques de Filtrado</h2>

        <h3>1. Filtrado Simple por Campos</h3>

        <p>
          El enfoque más básico y común es permitir filtrar por campos específicos
          usando parámetros de consulta:
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/products?category=electronics&in_stock=true"
          description="Recupera productos electrónicos que están en stock."
          responseExample={`{
  "items": [
    { 
      "id": "prod_123",
      "name": "Smartphone Premium",
      "category": "electronics",
      "in_stock": true,
      "price": 899.99
    },
    { 
      "id": "prod_124",
      "name": "Auricular Bluetooth",
      "category": "electronics",
      "in_stock": true,
      "price": 59.99
    }
    // ... más productos ...
  ],
  "pagination": {
    "total": 58,
    "page": 1,
    "per_page": 20
  }
}`}
        />

        <p>
          Para campos con múltiples valores, puedes usar varios enfoques:
        </p>

        <CodeBlock
          code={`# Múltiples parámetros con el mismo nombre
GET /api/v1/products?category=electronics&category=accessories

# Valores separados por comas
GET /api/v1/products?categories=electronics,accessories

# Formato de array
GET /api/v1/products?categories[]=electronics&categories[]=accessories`}
          language="http"
        />

        <h3>2. Filtrado con Operadores de Comparación</h3>

        <p>
          Para valores numéricos, fechas y otros tipos ordenables, es útil
          proporcionar operadores de comparación:
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/products?price_min=50&price_max=200&created_after=2023-01-01"
          description="Recupera productos con precio entre 50 y 200, creados después del 1 de enero de 2023."
          responseExample={`{
  "items": [
    { 
      "id": "prod_125",
      "name": "Teclado Mecánico",
      "price": 89.99,
      "created_at": "2023-05-15T10:30:00Z"
    },
    { 
      "id": "prod_126",
      "name": "Ratón Inalámbrico",
      "price": 59.99,
      "created_at": "2023-03-22T14:15:00Z"
    }
    // ... más productos ...
  ],
  "filters_applied": {
    "price_range": [50, 200],
    "created_after": "2023-01-01T00:00:00Z"
  }
}`}
        />

        <p>
          Diferentes convenciones para operadores de comparación:
        </p>

        <CodeBlock
          code={`# Prefijos/sufijos descriptivos
GET /api/v1/products?price_min=50&price_max=200
GET /api/v1/users?created_after=2023-01-01&created_before=2023-06-30

# Sintaxis de operador
GET /api/v1/products?price[gte]=50&price[lte]=200
GET /api/v1/users?created_at[gt]=2023-01-01&created_at[lt]=2023-06-30

# Operadores inline
GET /api/v1/products?price=gte:50,lte:200
GET /api/v1/users?created_at=gt:2023-01-01,lt:2023-06-30`}
          language="http"
        />

        <h3>3. Filtrado por Texto y Búsqueda</h3>

        <p>
          Para filtrado por texto libre o búsqueda:
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/products?search=auriculares bluetooth&brand=sony"
          description="Busca productos Sony relacionados con 'auriculares bluetooth'."
          responseExample={`{
  "items": [
    { 
      "id": "prod_127",
      "name": "Auriculares Bluetooth Sony WH-1000XM4",
      "brand": "sony",
      "description": "Auriculares inalámbricos con cancelación de ruido",
      "price": 349.99,
      "relevance": 0.95
    },
    { 
      "id": "prod_128",
      "name": "Sony WF-1000XM4 True Wireless",
      "brand": "sony",
      "description": "Auriculares bluetooth intraaurales con cancelación de ruido",
      "price": 279.99,
      "relevance": 0.87
    }
    // ... más productos ...
  ],
  "search_info": {
    "query": "auriculares bluetooth",
    "total_matches": 7,
    "filters": {
      "brand": "sony"
    }
  }
}`}
        />

        <h3>4. Filtrado con Metadatos y Relaciones</h3>

        <p>
          Para filtrar por campos anidados o relaciones:
        </p>

        <CodeBlock
          code={`# Filtrado por metadatos anidados
GET /api/v1/products?metadata.color=red&metadata.size=large

# Filtrado por relaciones
GET /api/v1/orders?customer.country=spain&items.product.category=electronics

# Alternativa con notación de puntos
GET /api/v1/products?color=red&size=large
GET /api/v1/orders?customer_country=spain&product_category=electronics`}
          language="http"
        />

        <h3>5. Filtrado con Lenguaje de Consulta</h3>

        <p>
          Para casos más complejos, considera implementar un mini lenguaje de
          consulta:
        </p>

        <CodeBlock
          code={`# Operadores lógicos
GET /api/v1/products?filter=(category:electronics AND price<200) OR (category:books AND author:"Isaac Asimov")

# Similar a OData
GET /api/v1/products?$filter=category eq 'electronics' and price lt 200

# Inspirado en MongoDB
GET /api/v1/products?query={"category":"electronics","price":{"$lt":200}}`}
          language="http"
        />

        <h2>Implementación y Mejores Prácticas</h2>

        <h3>Validación de Parámetros</h3>

        <p>
          Es crucial validar todos los parámetros de filtrado para evitar
          problemas de seguridad:
        </p>

        <ul>
          <li>Valida tipos de datos (números, fechas, enumeraciones)</li>
          <li>Define rangos aceptables para valores numéricos</li>
          <li>Limita la longitud de los campos de texto</li>
          <li>Previene inyección SQL en campos de búsqueda</li>
        </ul>

        <CodeBlock
          code={`// Ejemplo de validación en Express.js
app.get('/api/v1/products', (req, res) => {
  // Validar precio mínimo
  let minPrice = parseFloat(req.query.price_min);
  if (isNaN(minPrice) || minPrice < 0) minPrice = 0;
  
  // Validar precio máximo
  let maxPrice = parseFloat(req.query.price_max);
  if (isNaN(maxPrice) || maxPrice < 0) maxPrice = Number.MAX_SAFE_INTEGER;
  
  // Validar categoría (enumerable)
  const validCategories = ['electronics', 'clothing', 'books', 'home'];
  let category = req.query.category;
  if (category && !validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }
  
  // Continuar con la consulta...
});`}
          language="javascript"
        />

        <h3>Documentar el Sistema de Filtrado</h3>

        <p>
          Una documentación clara del sistema de filtrado es esencial para los
          desarrolladores:
        </p>

        <ul>
          <li>Listar todos los campos filtrables</li>
          <li>Documentar operadores compatibles</li>
          <li>Proporcionar ejemplos para cada tipo de filtro</li>
          <li>Especificar valores por defecto si no se aplican filtros</li>
          <li>Describir el comportamiento con filtros inválidos</li>
        </ul>

        <h3>Rendimiento y Optimización</h3>

        <p>
          Optimiza el rendimiento del filtrado:
        </p>

        <ul>
          <li>
            Crea índices en la base de datos para los campos de filtrado comunes
          </li>
          <li>Limita la complejidad de las consultas permitidas</li>
          <li>Implementa caché para consultas frecuentes</li>
          <li>
            Considera paginación obligatoria para conjuntos de resultados grandes
          </li>
        </ul>

        <CodeBlock
          code={`-- Índices para campos comunes de filtrado
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_created_at ON products(created_at);
CREATE INDEX idx_products_brand ON products(brand);

-- Índice compuesto para consultas comunes
CREATE INDEX idx_products_category_price ON products(category, price);`}
          language="sql"
        />

        <h3>Indicar Filtros Aplicados</h3>

        <p>
          Es útil incluir en la respuesta los filtros que se aplicaron:
        </p>

        <CodeBlock
          code={`{
  "items": [...],
  "filters_applied": {
    "category": "electronics",
    "price_range": [50, 200],
    "in_stock": true,
    "brand": ["apple", "samsung"]
  },
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 45
  }
}`}
          language="json"
        />

        <h3>Consistencia con Otros Parámetros</h3>

        <p>
          Asegúrate de que los filtros funcionen bien con otros parámetros como
          ordenamiento y paginación:
        </p>

        <CodeBlock
          code={`# Combinación de filtrado, ordenamiento y paginación
GET /api/v1/products?category=electronics&price_min=100&sort=price_asc&page=2&per_page=20`}
          language="http"
        />

        <h2>Patrones Avanzados</h2>

        <h3>Filtrado Geoespacial</h3>

        <p>
          Para datos con componentes geográficos:
        </p>

        <CodeBlock
          code={`# Búsqueda por proximidad
GET /api/v1/restaurants?lat=40.7128&lon=-74.0060&radius=5km

# Búsqueda por área
GET /api/v1/properties?bounds=40.7,-74.0,40.8,-73.9`}
          language="http"
        />

        <h3>Filtrado Temporal</h3>

        <p>
          Patrones específicos para datos temporales:
        </p>

        <CodeBlock
          code={`# Rangos de fechas
GET /api/v1/events?start_date=2023-06-01&end_date=2023-06-30

# Períodos relativos
GET /api/v1/transactions?period=last_30_days
GET /api/v1/reports?timeframe=this_month

# Fechas con horarios
GET /api/v1/logs?from=2023-06-01T00:00:00Z&to=2023-06-02T23:59:59Z`}
          language="http"
        />

        <h3>Filtrado con Expresiones Regulares</h3>

        <p>
          Para búsquedas por patrones (usar con precaución):
        </p>

        <CodeBlock
          code={`# Filtrado con patrones
GET /api/v1/products?sku_pattern=ABC-[0-9]{3}-XYZ
GET /api/v1/users?email_pattern=.*@example\.com`}
          language="http"
        />

        <h2>Casos de Uso Específicos</h2>

        <h3>Catálogos de Productos</h3>

        <EndpointExample
          method="GET"
          path="/api/v1/products?category=clothing&gender=women&size=m&color=black&price_max=50&sort=price_asc"
          description="Filtrado complejo para un catálogo de tienda online."
          responseExample={`{
  "items": [
    {
      "id": "prod_501",
      "name": "Camiseta Básica",
      "category": "clothing",
      "gender": "women",
      "attributes": {
        "size": "m",
        "color": "black"
      },
      "price": 19.99,
      "discount": null,
      "in_stock": true
    },
    // ... más productos ...
  ],
  "filters_applied": {
    "category": "clothing",
    "gender": "women",
    "size": "m",
    "color": "black",
    "price_max": 50
  },
  "available_filters": {
    "size": ["xs", "s", "m", "l", "xl"],
    "color": ["black", "white", "red", "blue", "green"]
  }
}`}
        />

        <h3>Registros de Actividad o Logs</h3>

        <CodeBlock
          code={`# Filtrado para logs o registros de actividad
GET /api/v1/logs?level=error&component=payment&date_from=2023-06-01&user_id=12345`}
          language="http"
        />

        <h3>Informes Analíticos</h3>

        <CodeBlock
          code={`# Filtrado para informes
GET /api/v1/analytics/sales?period=last_quarter&group_by=product_category&region=europe`}
          language="http"
        />

        <h2>Ejemplos de APIs Populares</h2>

        <h3>GitHub API</h3>

        <p>
          GitHub proporciona filtros específicos para sus recursos:
        </p>

        <CodeBlock
          code={`# Filtrar issues por estado, asignado y etiqueta
GET /repos/octocat/hello-world/issues?state=open&assignee=octocat&labels=bug,enhancement

# Filtrar pull requests
GET /repos/octocat/hello-world/pulls?state=open&base=main&sort=created&direction=desc`}
          language="http"
        />

        <h3>Stripe API</h3>

        <p>
          Stripe utiliza un sistema de filtrado uniforme:
        </p>

        <CodeBlock
          code={`# Filtrar pagos por cliente y fecha
GET /v1/charges?customer=cus_123&created[gte]=1625097600&created[lte]=1627689600`}
          language="http"
        />

        <blockquote>
          "Un sistema de filtrado bien diseñado encuentra el equilibrio entre
          flexibilidad y simplicidad. Debe ser lo suficientemente potente para
          satisfacer las necesidades de los clientes más exigentes, pero lo
          suficientemente intuitivo para que cualquier desarrollador pueda empezar
          rápidamente."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default Filtering;
