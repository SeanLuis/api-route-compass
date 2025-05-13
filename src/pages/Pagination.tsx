import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ArrowUpDown, LayoutGrid, Database, Code, CheckCircle, XCircle, Server } from "lucide-react";

const Pagination = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/filtering" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">Funcionalidades</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Paginación</h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Técnicas para implementar paginación eficiente en APIs REST.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <p className="dark:text-slate-300">
            La paginación es una técnica esencial para gestionar grandes conjuntos de
            datos en APIs REST. Permite dividir los resultados en "páginas"
            manejables, mejorando el rendimiento, reduciendo la carga de la red y
            proporcionando una mejor experiencia al usuario.
          </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <BookOpen className="h-5 w-5 text-indigo-500" />
            Por Qué Implementar Paginación
          </h2>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 p-6 rounded-lg border border-indigo-100 dark:border-indigo-800">
            <p className="text-slate-800 dark:text-slate-300">
              La paginación resuelve varios problemas críticos en el diseño de APIs:
            </p>
            <ul className="mt-3 space-y-1 ml-6 list-disc text-slate-700 dark:text-slate-300">
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

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <LayoutGrid className="h-5 w-5 text-indigo-500" />
            Estrategias de Paginación
          </h2>

          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowUpDown className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold dark:text-white">1. Paginación Basada en Offset</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Este método utiliza dos parámetros principales: <code>page</code> (o{" "}
                  <code>offset</code>) y <code>limit</code> (o <code>per_page</code>).
                  Es el enfoque más común y simple.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
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
                      <h4 className="font-medium text-green-600 dark:text-green-400">Ventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400 text-sm">
                      <li>Simple de implementar y entender</li>
                      <li>Permite saltar directamente a cualquier página</li>
                      <li>Conoces el número total de páginas</li>
                      <li>Intuitivo para desarrolladores frontend</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                      <h4 className="font-medium text-red-600 dark:text-red-400">Desventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400 text-sm">
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

          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold dark:text-white">2. Paginación Basada en Cursor</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Esta técnica utiliza un "cursor" o "marcador" para apuntar a una
                  posición específica en el conjunto de resultados. El cliente utiliza este
                  cursor para solicitar la "página siguiente" o "página anterior".
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
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
                      <h4 className="font-medium text-green-600 dark:text-green-400">Ventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400 text-sm">
                      <li>Rendimiento constante incluso con conjuntos de datos enormes</li>
                      <li>Mayor consistencia con datos que cambian frecuentemente</li>
                      <li>Evita el problema de filas duplicadas</li>
                      <li>Más eficiente en bases de datos para consultas grandes</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                      <h4 className="font-medium text-red-600 dark:text-red-400">Desventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400 text-sm">
                      <li>Mayor complejidad de implementación</li>
                      <li>No permite saltar a una página específica</li>
                      <li>A menudo no proporciona el total de elementos</li>
                      <li>El cursor necesita codificación/decodificación segura</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold dark:text-white">3. Paginación con Keyset</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Un refinamiento de la paginación basada en cursor, donde el cursor es
                  normalmente una combinación de la columna de ordenación y un identificador
                  único.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
                  <EndpointExample
                    method="GET"
                    path="/api/v1/products?limit=20&after_id=prod_40&after_date=2023-06-10T15:30:00Z"
                    description="Recupera hasta 20 productos después del producto con ID 'prod_40' y fecha '2023-06-10T15:30:00Z'."
                    responseExample={`{
  "items": [
    { 
      "id": "prod_41",
      "name": "Teclado Mecánico",
      "price": 89.99,
      "created_at": "2023-06-10T15:35:00Z"
    },
    // ... 18 más productos ...
    { 
      "id": "prod_60",
      "name": "Mouse Ergonómico",
      "price": 35.99,
      "created_at": "2023-06-10T16:30:00Z"
    }
  ],
  "pagination": {
    "has_next": true,
    "has_prev": true,
    "next": {
      "id": "prod_60",
      "date": "2023-06-10T16:30:00Z"
    },
    "prev": {
      "id": "prod_40",
      "date": "2023-06-10T15:30:00Z"
    }
  }
}`}
                  />
                </div>

                <h4 className="font-medium mt-4 mb-2">Implementación en Base de Datos</h4>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`// SQL para keyset pagination
SELECT * FROM products 
WHERE 
  (created_at > '2023-06-10 15:30:00') OR 
  (created_at = '2023-06-10 15:30:00' AND id > 'prod_40')
ORDER BY created_at ASC, id ASC 
LIMIT 20;`}
                    language="sql"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <h4 className="font-medium text-green-600 dark:text-green-400">Ventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400 text-sm">
                      <li>Rendimiento excelente incluso con tablas enormes</li>
                      <li>Ideal para datos ordenados por varias columnas</li>
                      <li>Más intuitivo que los cursores opacos</li>
                      <li>Compatible con índices compuestos en bases de datos</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                      <h4 className="font-medium text-red-600 dark:text-red-400">Desventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400 text-sm">
                      <li>Complejidad adicional en la implementación</li>
                      <li>Requiere identificadores únicos y estables</li>
                      <li>Limitaciones con cambios en el orden de clasificación</li>
                      <li>Los parámetros URL pueden volverse largos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <Code className="h-5 w-5 text-indigo-500" />
            Implementación de la Paginación
          </h2>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Mejores Prácticas
          </h3>

          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900/50 rounded-lg shadow p-4 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">1. Utiliza respuestas consistentes</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Independientemente del método de paginación, mantén un formato de respuesta 
                consistente que incluya:
              </p>
              <ul className="list-disc ml-5 text-slate-700 dark:text-slate-300">
                <li>Los elementos de la página actual</li>
                <li>Metadatos de paginación</li>
                <li>Enlaces a páginas relacionadas (siguiente, anterior, primera, última)</li>
              </ul>
              <div className="mt-3 bg-slate-50 dark:bg-slate-800 rounded p-3 border border-slate-200 dark:border-slate-700">
                <CodeBlock
                  code={`{
  "items": [ ... ],  // Datos de la página actual
  "pagination": {
    // Metadatos específicos del método de paginación
    "total_items": 325,
    "total_pages": 17,
    "current_page": 2,
    "per_page": 20,
    
    // Enlaces para navegación (HATEOAS)
    "_links": {
      "self": "/api/v1/products?page=2&per_page=20",
      "first": "/api/v1/products?page=1&per_page=20",
      "prev": "/api/v1/products?page=1&per_page=20",
      "next": "/api/v1/products?page=3&per_page=20",
      "last": "/api/v1/products?page=17&per_page=20"
    }
  }
}`}
                  language="json"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/50 rounded-lg shadow p-4 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">2. Proporciona valores predeterminados adecuados</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Establece valores predeterminados razonables para el tamaño de página y 
                la página inicial para que las solicitudes sin parámetros de paginación 
                funcionen correctamente.
              </p>
              <div className="mt-3 bg-slate-50 dark:bg-slate-800 rounded p-3 border border-slate-200 dark:border-slate-700">
                <CodeBlock
                  code={`// Ejemplo de configuración de parámetros predeterminados
const page = parseInt(req.query.page) || 1;  // Página predeterminada: 1
const perPage = parseInt(req.query.per_page) || 25;  // Elementos por página: 25
const maxPerPage = 100;  // Límite máximo de elementos por página

// Asegurar límites razonables
if (perPage > maxPerPage) {
  perPage = maxPerPage;
}
if (page < 1) {
  page = 1;
}`}
                  language="javascript"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/50 rounded-lg shadow p-4 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">3. Utiliza encabezados HTTP para paginación</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Además del cuerpo de la respuesta, considera incluir información de paginación
                en los encabezados HTTP para facilitar el procesamiento por parte del cliente.
              </p>
              <div className="mt-3 bg-slate-50 dark:bg-slate-800 rounded p-3 border border-slate-200 dark:border-slate-700">
                <CodeBlock
                  code={`// Encabezados de paginación
X-Total-Count: 325
X-Page: 2
X-Per-Page: 20
X-Total-Pages: 17
Link: <https://api.example.com/products?page=1&per_page=20>; rel="first",
      <https://api.example.com/products?page=1&per_page=20>; rel="prev",
      <https://api.example.com/products?page=3&per_page=20>; rel="next",
      <https://api.example.com/products?page=17&per_page=20>; rel="last"`}
                  language="http"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/50 rounded-lg shadow p-4 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">4. Documenta claramente tu estrategia de paginación</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Asegúrate de que la documentación de la API explique claramente:
              </p>
              <ul className="list-disc ml-5 text-slate-700 dark:text-slate-300">
                <li>Qué parámetros de paginación están disponibles</li>
                <li>Cuáles son los valores predeterminados y límites</li>
                <li>Cómo interpretar la respuesta y metadatos</li>
                <li>Ejemplos concretos para diferentes casos de uso</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <CheckCircle className="h-5 w-5 text-indigo-500" />
            Ejemplos de APIs Populares
          </h3>

          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900/50 rounded-lg shadow p-4 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">GitHub API</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                GitHub utiliza una combinación de paginación basada en offset y paginación basada en cursor.
              </p>
              <div className="bg-slate-50 dark:bg-slate-800 rounded p-3 border border-slate-200 dark:border-slate-700">
                <CodeBlock
                  code={`# Paginación basada en offset
GET /repos/{owner}/{repo}/issues?page=2&per_page=30

# Paginación basada en cursor (para consultas de búsqueda)
GET /search/repositories?q=tetris+language:assembly&sort=stars&page=2

# Encabezados de respuesta:
Link: <https://api.github.com/repositories?since=1000>; rel="next",
      <https://api.github.com/repositories?since=0>; rel="first"`}
                  language="http"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/50 rounded-lg shadow p-4 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Slack API</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Slack utiliza paginación basada en cursor para casi todos sus endpoints.
              </p>
              <div className="bg-slate-50 dark:bg-slate-800 rounded p-3 border border-slate-200 dark:border-slate-700">
                <CodeBlock
                  code={`# Primera solicitud
GET /api/conversations.list?limit=100

# Respuesta incluye next_cursor
{
  "ok": true,
  "channels": [ ... ],
  "response_metadata": {
    "next_cursor": "dGVhbTpDMDYxRkE1UEI="
  }
}

# Solicitud con cursor para obtener la siguiente página
GET /api/conversations.list?limit=100&cursor=dGVhbTpDMDYxRkE1UEI=`}
                  language="http"
                />
              </div>
            </div>
          </div>

          <blockquote className="border-l-4 border-indigo-300 dark:border-indigo-700 pl-6 py-2 pr-4 mt-8 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 rounded-r-lg">
            <p className="italic text-indigo-900 dark:text-indigo-300 font-medium">
              "La elección del método de paginación depende de tus datos y casos de uso. Para aplicaciones típicas con
              conjunto de datos moderados, la paginación basada en offset es más simple y suficiente. Para grandes 
              volúmenes de datos o alta actividad de inserción/eliminación, considera la paginación basada en cursor
              para un rendimiento óptimo."
            </p>
          </blockquote>
        </div>
      </div>
    </PageLayout>
  );
};

export default Pagination;
