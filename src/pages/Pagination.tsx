import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ArrowUpDown, LayoutGrid, Database, Code, CheckCircle, XCircle, Server } from "lucide-react";

const Pagination = () => {
  return (
    <PageLayout>
      <div className="space-y-10 max-w-3xl">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/filtering" className="text-sm text-slate-500 hover:text-slate-700">Funcionalidades</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Paginación</h1>
          <p className="text-lg text-slate-700">
            Técnicas para implementar paginación eficiente en APIs REST.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <p>
            La paginación es una técnica esencial para gestionar grandes conjuntos de
            datos en APIs REST. Permite dividir los resultados en "páginas"
            manejables, mejorando el rendimiento, reduciendo la carga de la red y
            proporcionando una mejor experiencia al usuario.
          </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-500" />
            Por Qué Implementar Paginación
          </h2>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-100">
            <p className="text-slate-800">
              La paginación resuelve varios problemas críticos en el diseño de APIs:
            </p>
            <ul className="mt-3 space-y-1 ml-6 list-disc text-slate-700">
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
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-indigo-500" />
            Estrategias de Paginación
          </h2>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowUpDown className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">1. Paginación Basada en Offset</h3>
                </div>
                <p className="text-slate-700">
                  Este método utiliza dos parámetros principales: <code>page</code> (o{" "}
                  <code>offset</code>) y <code>limit</code> (o <code>per_page</code>).
                  Es el enfoque más común y simple.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
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
                </div>

                <h4 className="font-medium mt-4 mb-2">Implementación en Base de Datos</h4>
                <div className="bg-slate-900 rounded-md overflow-hidden">
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
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <h4 className="font-medium text-green-600">Ventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm">
                      <li>Simple de implementar y entender</li>
                      <li>Permite saltar directamente a cualquier página</li>
                      <li>Conoces el número total de páginas</li>
                      <li>Intuitivo para desarrolladores frontend</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                      <h4 className="font-medium text-red-600">Desventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm">
                      <li>Rendimiento deficiente en conjuntos de datos muy grandes</li>
                      <li>Inconsistencias si se modifican datos mientras se pagina</li>
                      <li>El cálculo de OFFSET puede ser costoso en bases de datos grandes</li>
                      <li>No ideal para datos que cambian frecuentemente</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">2. Paginación Basada en Cursor</h3>
                </div>
                <p className="text-slate-700">
                  Esta técnica utiliza un "cursor" o "marcador" para apuntar a una
                  posición específica en el conjunto de resultados. El cliente utiliza este
                  cursor para solicitar la "página siguiente" o "página anterior".
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
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
                </div>

                <h4 className="font-medium mt-4 mb-2">Implementación en Base de Datos</h4>
                <div className="bg-slate-900 rounded-md overflow-hidden">
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
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <h4 className="font-medium text-green-600">Ventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm">
                      <li>Rendimiento constante incluso con conjuntos de datos enormes</li>
                      <li>Mayor consistencia con datos que cambian frecuentemente</li>
                      <li>Evita el problema de filas duplicadas</li>
                      <li>Más eficiente en bases de datos para consultas grandes</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                      <h4 className="font-medium text-red-600">Desventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm">
                      <li>Mayor complejidad de implementación</li>
                      <li>No permite saltar directamente a una página específica</li>
                      <li>Generalmente no proporciona conteo total de elementos</li>
                      <li>Requiere un campo único ordenable o combinación de campos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">3. Paginación con Hipermedia (HATEOAS)</h3>
                </div>
                <p className="text-slate-700">
                  Siguiendo el principio HATEOAS de REST, este enfoque incluye enlaces a
                  acciones relacionadas con la paginación directamente en la respuesta.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-900 rounded-md overflow-hidden">
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
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <h4 className="font-medium text-green-600">Ventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm">
                      <li>Mayor adherencia a los principios REST</li>
                      <li>El cliente solo necesita seguir enlaces</li>
                      <li>Facilita la navegación y descubrimiento</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                      <h4 className="font-medium text-red-600">Desventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm">
                      <li>Respuestas más verbosas</li>
                      <li>Mayor complejidad para el cliente</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-indigo-500" />
            Mejores Prácticas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Parámetros Consistentes</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Define y utiliza parámetros de paginación coherentes en toda tu API:
                </p>
                <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm">
                  <li><strong>limit/per_page:</strong> Para el número de elementos por página</li>
                  <li><strong>page/offset:</strong> Para paginación basada en offset</li>
                  <li><strong>cursor/after/before:</strong> Para paginación basada en cursor</li>
                </ul>
                <div className="mt-3 bg-slate-100 p-3 rounded-md">
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
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Valores por Defecto y Límites</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Establece valores por defecto razonables y límites máximos para proteger tus recursos:
                </p>
                <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm">
                  <li>Proporciona un valor por defecto para <code>per_page</code> (generalmente 10, 20 o 50)</li>
                  <li>Define un límite máximo para <code>per_page</code> (ej. 100 o 200)</li>
                  <li>Si no se especifica la página, asume página 1</li>
                </ul>
                <div className="mt-3 bg-slate-100 p-3 rounded-md">
                  <CodeBlock
                    code={`// Ejemplo en Express.js
app.get('/api/v1/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = Math.min(parseInt(req.query.per_page) || 20, 100); // Máximo 100
  
  const offset = (page - 1) * perPage;
  
  // Continuar con la consulta...
});`}
                    language="javascript"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border border-slate-200 shadow-sm overflow-hidden mt-6">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Cabeceras HTTP para Paginación</h3>
                </div>
                <p className="text-slate-700">
                  Considera el uso de cabeceras HTTP para información de paginación.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-900 rounded-md overflow-hidden">
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
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Server className="h-5 w-5 text-indigo-500" />
            Casos de Uso Específicos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Feeds de Actividad o Líneas de Tiempo</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Para contenido tipo Twitter o Instagram, la paginación basada en cursor es ideal:
                </p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`GET /api/v1/feed?limit=20&before=1622547698_post123
GET /api/v1/feed/latest?limit=20
GET /api/v1/feed/older?timestamp=1622547698&limit=20`}
                    language="http"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Resultados de Búsqueda</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Para búsquedas donde el usuario puede querer saltar a páginas específicas, la paginación offset es apropiada:
                </p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`GET /api/v1/search?q=auriculares&page=3&per_page=20
GET /api/v1/products?category=electronics&brand=sony&page=2`}
                    language="http"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-500" />
            Ejemplos de APIs Populares
          </h2>

          <div className="grid grid-cols-1 gap-6 mt-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 p-4">
                  <h3 className="font-medium">GitHub API</h3>
                </div>
                <div className="p-6">
                  <p className="mb-3">
                    GitHub utiliza paginación basada en offset con información en cabeceras:
                  </p>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
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
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 p-4">
                  <h3 className="font-medium">Twitter API</h3>
                </div>
                <div className="p-6">
                  <p className="mb-3">
                    Twitter utiliza paginación basada en cursor para sus timelines:
                  </p>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <blockquote className="border-l-4 border-indigo-300 pl-6 py-2 pr-4 mt-8 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-r-lg">
            <p className="italic text-indigo-900 font-medium">
              "Una buena implementación de paginación equilibra la experiencia del
              usuario, el rendimiento del servidor y la eficiencia de la transferencia
              de datos. Elige la estrategia que mejor se adapte a tu conjunto de datos
              y patrones de acceso, pero sobre todo, mantén la consistencia en toda tu
              API."
            </p>
          </blockquote>
        </div>
      </div>
    </PageLayout>
  );
};

export default Pagination;
