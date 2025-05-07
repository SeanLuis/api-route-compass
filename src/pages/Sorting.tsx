import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpDown, CheckCircle, XCircle, Database, Code, Server, SortAsc } from "lucide-react";

const Sorting = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/filtering" className="text-sm text-slate-500 hover:text-slate-700">Funcionalidades</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Ordenamiento</h1>
          <p className="text-lg text-slate-700">
            Estrategias para implementar ordenamiento en APIs REST.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <p>
            El ordenamiento permite a los clientes especificar el orden en que desean
            recibir los recursos de una colección. Esta funcionalidad mejora la
            experiencia del desarrollador y proporciona flexibilidad para diferentes
            casos de uso sin necesidad de crear múltiples endpoints.
          </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5 text-indigo-500" />
            Por Qué Implementar Ordenamiento
          </h2>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-100">
            <p className="text-slate-800">
              Un sistema de ordenamiento bien implementado ofrece varios beneficios:
            </p>
            <ul className="mt-3 space-y-1 ml-6 list-disc text-slate-700">
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
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <SortAsc className="h-5 w-5 text-indigo-500" />
            Patrones de Implementación
          </h2>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">1. Ordenamiento Simple por Campo</h3>
                </div>
                <p className="text-slate-700">
                  El enfoque más básico y común es permitir ordenar por un solo campo.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
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
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">2. Ordenamiento con Dirección</h3>
                </div>
                <p className="text-slate-700">
                  Permite especificar la dirección del ordenamiento (ascendente/descendente).
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-900 rounded-md overflow-hidden">
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
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">3. Ordenamiento por Múltiples Campos</h3>
                </div>
                <p className="text-slate-700">
                  Permite ordenar por varios campos con diferentes prioridades.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
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
                </div>
                
                <div className="mt-4">
                  <p className="mb-3">Otras sintaxis comunes para ordenamiento múltiple:</p>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
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
                <h3 className="font-semibold mb-2">Orden por Defecto</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Siempre define un orden por defecto claro para cada recurso:
                </p>
                <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm">
                  <li>Especifica el orden por defecto en la documentación</li>
                  <li>Elige un orden por defecto que tenga sentido para el recurso</li>
                  <li>Considera definir órdenes por defecto diferentes para distintos endpoints</li>
                </ul>
                <div className="mt-3 bg-slate-100 p-3 rounded-md">
                  <CodeBlock
                    code={`// Ejemplo en Express.js
app.get('/api/v1/products', (req, res) => {
  let sort = req.query.sort || 'created_at_desc'; // Orden por defecto
  
  // Procesamiento del parámetro sort...
});`}
                    language="javascript"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Campos Ordenables Permitidos</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Define y valida explícitamente qué campos pueden usarse para ordenar:
                </p>
                <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm">
                  <li>Lista los campos ordenables en la documentación</li>
                  <li>Valida los campos de ordenamiento para evitar inyecciones SQL</li>
                  <li>Considera el rendimiento al elegir qué campos son ordenables</li>
                </ul>
                <div className="mt-3 bg-slate-100 p-3 rounded-md">
                  <CodeBlock
                    code={`// Validación de campos ordenables
const allowedSortFields = ['name', 'price', 'created_at'];
const sort = req.query.sort || defaultSort;
const field = sort.replace(/_asc$|_desc$/, '');

if (!allowedSortFields.includes(field)) {
  return res.status(400).json({ 
    error: 'Invalid sort field', 
    allowed_fields: allowedSortFields 
  });
}`}
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
                  <Database className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Optimización de Rendimiento</h3>
                </div>
                <p className="text-slate-700">
                  Asegura un rendimiento óptimo para el ordenamiento creando los índices adecuados en tu base de datos.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`-- Índices para campos comunes de ordenamiento
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_created_at ON products(created_at);

-- Índice compuesto para ordenamiento común por múltiples campos
CREATE INDEX idx_products_category_price ON products(category ASC, price DESC);`}
                    language="sql"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5 text-indigo-500" />
            Casos de Uso Específicos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Ordenamiento para E-commerce</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Ordenamiento típico para un catálogo de productos:
                </p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`# Ordenamiento común en e-commerce
GET /api/v1/products?sort=relevance        # Por relevancia
GET /api/v1/products?sort=price_asc        # De menor a mayor precio
GET /api/v1/products?sort=price_desc       # De mayor a menor precio
GET /api/v1/products?sort=newest           # Los más nuevos primero
GET /api/v1/products?sort=bestselling      # Los más vendidos primero
GET /api/v1/products?sort=rating_desc      # Mejor valorados primero`}
                    language="http"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Ordenamiento para Contenido Social</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Ordenamiento típico para posts, comentarios, etc.:
                </p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`# Ordenamiento para contenido social
GET /api/v1/posts?sort=recent        # Más recientes primero
GET /api/v1/posts?sort=popular       # Más populares primero
GET /api/v1/comments?sort=oldest     # Más antiguos primero
GET /api/v1/comments?sort=likes      # Más gustados primero
GET /api/v1/feed?sort=relevance      # Algoritmo de relevancia`}
                    language="http"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Server className="h-5 w-5 text-indigo-500" />
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
                    GitHub utiliza parámetros <code>sort</code> y <code>direction</code>:
                  </p>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code={`# Ordenamiento en GitHub API
GET /repos/octocat/hello-world/issues?sort=created&direction=desc

# Para listar repositorios
GET /users/octocat/repos?sort=pushed&direction=desc`}
                      language="http"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 p-4">
                  <h3 className="font-medium">Google API</h3>
                </div>
                <div className="p-6">
                  <p className="mb-3">
                    Google utiliza el parámetro <code>orderBy</code>:
                  </p>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code={`# Ordenamiento en Google Drive API
GET https://www.googleapis.com/drive/v3/files?orderBy=name

# Ordenamiento múltiple
GET https://www.googleapis.com/drive/v3/files?orderBy=folder,name desc`}
                      language="http"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <blockquote className="border-l-4 border-indigo-300 pl-6 py-2 pr-4 mt-8 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-r-lg">
            <p className="italic text-indigo-900 font-medium">
              "Un buen sistema de ordenamiento equilibra la simplicidad de uso con la
              flexibilidad para escenarios complejos. Aunque parece una funcionalidad
              sencilla, el ordenamiento bien implementado puede mejorar drásticamente la
              experiencia del desarrollador y el rendimiento de la aplicación cliente."
            </p>
          </blockquote>
        </div>
      </div>
    </PageLayout>
  );
};

export default Sorting;
