import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, CheckCircle, Database, Code, Server, Search, Map, SlidersHorizontal } from "lucide-react";

const Filtering = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/sorting" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">Funcionalidades</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Filtrado</h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Patrones para implementar filtrado flexible en APIs REST.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <p className="dark:text-slate-300">
            El filtrado permite a los clientes de una API REST solicitar exactamente
            los datos que necesitan, reduciendo el volumen de información transferida
            y mejorando la eficiencia. Una implementación adecuada de filtrado puede
            transformar una API básica en una herramienta potente y flexible.
          </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Filter className="h-5 w-5 text-indigo-500" />
            Por Qué Implementar Filtrado
          </h2>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 p-6 rounded-lg border border-indigo-100 dark:border-indigo-800">
            <p className="text-slate-800 dark:text-slate-300">
              Un buen sistema de filtrado proporciona numerosos beneficios:
            </p>
            <ul className="mt-3 space-y-1 ml-6 list-disc text-slate-700 dark:text-slate-300">
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
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-indigo-500" />
            Enfoques de Filtrado
          </h2>

          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold dark:text-white">1. Filtrado Simple por Campos</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  El enfoque más básico y común es permitir filtrar por campos específicos
                  usando parámetros de consulta.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
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
                </div>
                
                <p className="mt-4 mb-2 dark:text-slate-300">Para campos con múltiples valores, puedes usar varios enfoques:</p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`# Múltiples parámetros con el mismo nombre
GET /api/v1/products?category=electronics&category=accessories

# Valores separados por comas
GET /api/v1/products?categories=electronics,accessories

# Formato de array
GET /api/v1/products?categories[]=electronics&categories[]=accessories`}
                    language="http"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold dark:text-white">2. Filtrado con Operadores de Comparación</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Para valores numéricos, fechas y otros tipos ordenables, es útil
                  proporcionar operadores de comparación.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
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
                </div>
                
                <p className="mt-4 mb-2 dark:text-slate-300">Diferentes convenciones para operadores de comparación:</p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
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
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold dark:text-white">3. Filtrado por Texto y Búsqueda</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Para filtrado por texto libre o búsqueda en campos textuales.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
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
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold dark:text-white">4. Filtrado con Metadatos y Relaciones</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Para filtrar por campos anidados o relaciones.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-900 rounded-md overflow-hidden">
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
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <CheckCircle className="h-5 w-5 text-indigo-500" />
            Implementación y Mejores Prácticas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 dark:text-white">Validación de Parámetros</h3>
                <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                  Es crucial validar todos los parámetros de filtrado para evitar
                  problemas de seguridad:
                </p>
                <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400 text-sm">
                  <li>Valida tipos de datos (números, fechas, enumeraciones)</li>
                  <li>Define rangos aceptables para valores numéricos</li>
                  <li>Limita la longitud de los campos de texto</li>
                  <li>Previene inyección SQL en campos de búsqueda</li>
                </ul>
                
                <div className="mt-3 bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                  <CodeBlock
                    code={`// Ejemplo en Express.js
app.get('/api/v1/products', (req, res) => {
  // Validar precio mínimo
  let minPrice = parseFloat(req.query.price_min);
  if (isNaN(minPrice) || minPrice < 0) minPrice = 0;
  
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
                </div>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 dark:text-white">Rendimiento y Optimización</h3>
                <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                  Optimiza el rendimiento del filtrado:
                </p>
                <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400 text-sm">
                  <li>Crea índices para los campos de filtrado comunes</li>
                  <li>Limita la complejidad de las consultas permitidas</li>
                  <li>Implementa caché para consultas frecuentes</li>
                  <li>Considera paginación obligatoria para resultados grandes</li>
                </ul>
                
                <div className="mt-3 bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                  <CodeBlock
                    code={`-- Índices para campos comunes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_created_at ON products(created_at);

-- Índice compuesto para consultas comunes
CREATE INDEX idx_products_category_price ON products(category, price);`}
                    language="sql"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <Map className="h-5 w-5 text-indigo-500" />
            Patrones Avanzados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 dark:text-white">Filtrado Geoespacial</h3>
                <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                  Para datos con componentes geográficos:
                </p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`# Búsqueda por proximidad
GET /api/v1/restaurants?lat=40.7128&lon=-74.0060&radius=5km

# Búsqueda por área
GET /api/v1/properties?bounds=40.7,-74.0,40.8,-73.9`}
                    language="http"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 dark:text-white">Filtrado Temporal</h3>
                <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                  Patrones específicos para datos temporales:
                </p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
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
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <Server className="h-5 w-5 text-indigo-500" />
            Casos de Uso Específicos
          </h2>

          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mt-4">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold dark:text-white">Catálogos de Productos</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Filtrado complejo para un catálogo de tienda online.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
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
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <CheckCircle className="h-5 w-5 text-indigo-500" />
            Ejemplos de APIs Populares
          </h2>

          <div className="grid grid-cols-1 gap-6 mt-4">
            <Card className="overflow-hidden dark:border-slate-700">
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 dark:bg-slate-800 p-4">
                  <h3 className="font-medium dark:text-white">GitHub API</h3>
                </div>
                <div className="p-6">
                  <p className="mb-3 dark:text-slate-300">
                    GitHub proporciona filtros específicos para sus recursos:
                  </p>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code={`# Filtrar issues por estado, asignado y etiqueta
GET /repos/octocat/hello-world/issues?state=open&assignee=octocat&labels=bug,enhancement

# Filtrar pull requests
GET /repos/octocat/hello-world/pulls?state=open&base=main&sort=created&direction=desc`}
                      language="http"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden dark:border-slate-700">
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 dark:bg-slate-800 p-4">
                  <h3 className="font-medium dark:text-white">Stripe API</h3>
                </div>
                <div className="p-6">
                  <p className="mb-3 dark:text-slate-300">
                    Stripe utiliza un sistema de filtrado uniforme:
                  </p>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code={`# Filtrar pagos por cliente y fecha
GET /v1/charges?customer=cus_123&created[gte]=1625097600&created[lte]=1627689600`}
                      language="http"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <blockquote className="border-l-4 border-indigo-300 dark:border-indigo-700 pl-6 py-2 pr-4 mt-8 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 rounded-r-lg">
            <p className="italic text-indigo-900 dark:text-indigo-300 font-medium">
              "Un sistema de filtrado bien diseñado encuentra el equilibrio entre
              flexibilidad y simplicidad. Debe ser lo suficientemente potente para
              satisfacer las necesidades de los clientes más exigentes, pero lo
              suficientemente intuitivo para que cualquier desarrollador pueda empezar
              rápidamente."
            </p>
          </blockquote>
        </div>
      </div>
    </PageLayout>
  );
};

export default Filtering;
