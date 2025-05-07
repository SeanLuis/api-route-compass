import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Expand, Database, Code, CheckCircle, XCircle, Network, Layers, Waypoints, Settings, Box } from "lucide-react";

const FieldExpansion = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/nested-resources" className="text-sm text-slate-500 hover:text-slate-700">Relaciones</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Expansión de Campos</h1>
          <p className="text-lg text-slate-700">
            Métodos para expandir relaciones y optimizar consultas en APIs REST.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <p>
            La expansión de campos es una técnica que permite a los clientes solicitar
            datos relacionados junto con el recurso principal en una misma respuesta.
            Esta funcionalidad reduce el número de peticiones necesarias y mejora la
            eficiencia, flexibilidad y experiencia de desarrollo de la API.
          </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-500" />
            El Problema que Resuelve
          </h2>

          <p>
            En REST, un desafío común es el llamado "problema N+1". Por ejemplo, al
            solicitar una lista de productos, el cliente podría necesitar hacer una
            petición adicional para obtener el detalle de cada categoría asociada:
          </p>

          <div className="bg-slate-900 rounded-md overflow-hidden">
            <CodeBlock
              code={`# Petición inicial
GET /api/v1/products
→ Devuelve 20 productos con references a sus categorías

# Luego necesitas hacer 20 peticiones adicionales para obtener cada categoría
GET /api/v1/categories/1
GET /api/v1/categories/2
GET /api/v1/categories/3
...`}
              language="http"
            />
          </div>

          <p>
            La expansión de campos permite resolver este problema solicitando que
            ciertas relaciones se incluyan directamente en la respuesta inicial.
          </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Expand className="h-5 w-5 text-indigo-500" />
            Implementaciones de Expansión de Campos
          </h2>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Box className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">1. Expansión mediante Parámetro "expand" o "include"</h3>
                </div>
                <p className="text-slate-700">
                  El enfoque más común es utilizar un parámetro de consulta que especifique
                  qué relaciones expandir.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                  <EndpointExample
                    method="GET"
                    path="/api/v1/products/123?expand=category,brand,reviews"
                    description="Recupera un producto incluyendo su categoría, marca y reseñas en la misma respuesta."
                    responseExample={`{
  "id": "prod_123",
  "name": "Smartphone Premium X",
  "price": 899.99,
  "description": "El último modelo con características avanzadas",
  "category": {
    "id": "cat_5",
    "name": "Smartphones",
    "tax_rate": 16
  },
  "brand": {
    "id": "brand_10",
    "name": "TechCorp",
    "logo_url": "https://example.com/logos/techcorp.png",
    "country": "USA"
  },
  "reviews": [
    {
      "id": "rev_45",
      "rating": 5,
      "comment": "Excelente producto, muy satisfecho con la compra",
      "author": "Carlos M."
    },
    {
      "id": "rev_67",
      "rating": 4,
      "comment": "Buen smartphone, sólo le falta mejor batería",
      "author": "Ana L."
    }
  ]
}`}
                  />
                </div>

                <p>Diferentes variantes de sintaxis para este enfoque:</p>
                
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`# Usando "expand" como parámetro
GET /api/v1/products/123?expand=category,brand,reviews

# Usando "include" como alternativa
GET /api/v1/products/123?include=category,brand,reviews

# Formato de array
GET /api/v1/products/123?expand[]=category&expand[]=brand&expand[]=reviews

# Notación de puntos para relaciones anidadas
GET /api/v1/products/123?expand=category,brand,reviews.author`}
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
                  <Layers className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">2. Expansión Selectiva de Campos</h3>
                </div>
                <p className="text-slate-700">
                  Combina la selección de campos específicos con la expansión de relaciones.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`# Seleccionar solo ciertos campos del recurso principal y expandir relaciones
GET /api/v1/products/123?fields=id,name,price&expand=category.name,brand

# Seleccionar campos específicos de las relaciones expandidas
GET /api/v1/products/123?expand=category(id,name),brand(id,name,logo_url)`}
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
                  <Network className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">3. Expansión con Niveles de Profundidad</h3>
                </div>
                <p className="text-slate-700">
                  Controla cuántos niveles de relaciones anidadas se expanden.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                  <EndpointExample
                    method="GET"
                    path="/api/v1/orders/456?expand=customer,items.product"
                    description="Recupera un pedido con el cliente asociado y los productos de cada ítem."
                    responseExample={`{
  "id": "order_456",
  "order_number": "ORD-2023-1234",
  "status": "shipped",
  "total": 1299.98,
  "created_at": "2023-05-20T14:30:00Z",
  "customer": {
    "id": "cust_789",
    "name": "Elena Rodríguez",
    "email": "elena.rodriguez@example.com",
    "address": "Calle Principal 123"
  },
  "items": [
    {
      "id": "item_901",
      "quantity": 1,
      "price": 899.99,
      "product": {
        "id": "prod_123",
        "name": "Smartphone Premium X",
        "sku": "SP-X-123",
        "image_url": "https://example.com/images/smartphone-x.jpg"
      }
    },
    {
      "id": "item_902",
      "quantity": 2,
      "price": 199.99,
      "product": {
        "id": "prod_456",
        "name": "Auriculares Bluetooth",
        "sku": "AB-456",
        "image_url": "https://example.com/images/auriculares.jpg"
      }
    }
  ]
}`}
                  />
                </div>
                
                <p>
                  También se puede limitar explícitamente la profundidad máxima:
                </p>
                
                <div className="bg-slate-900 rounded-md overflow-hidden mt-4">
                  <CodeBlock
                    code={`# Limitar profundidad a un nivel
GET /api/v1/orders/456?expand=customer,items&max_depth=1

# Especificar diferentes profundidades para distintas relaciones
GET /api/v1/users/123?expand=orders:2,favorites:1`}
                    language="http"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-indigo-500" />
            Mejores Prácticas
          </h2>

          <div className="space-y-6 mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Control de Rendimiento</h3>
                <p className="mb-3 text-sm text-slate-600">
                  La expansión de campos puede afectar el rendimiento si no se implementa adecuadamente:
                </p>
                <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm">
                  <li>
                    <strong>Limitar expansiones permitidas:</strong> Define qué relaciones pueden expandirse
                  </li>
                  <li>
                    <strong>Establecer un máximo de expansiones:</strong> Limita el número de expansiones por petición
                  </li>
                  <li>
                    <strong>Controlar la profundidad:</strong> Limita los niveles de anidación permitidos
                  </li>
                  <li>
                    <strong>Optimizar consultas:</strong> Utiliza técnicas como carga ansiosa en el ORM
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Consistencia en las Respuestas</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Mantén un formato consistente para recursos expandidos y no expandidos:
                </p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`// Sin expansión
{
  "id": "prod_123",
  "name": "Smartphone Premium X",
  "price": 899.99,
  "category_id": "cat_5",
  "brand_id": "brand_10"
}

// Con expansión (mantiene los IDs originales)
{
  "id": "prod_123",
  "name": "Smartphone Premium X",
  "price": 899.99,
  "category_id": "cat_5",
  "brand_id": "brand_10",
  "category": {
    "id": "cat_5",
    "name": "Smartphones"
  },
  "brand": {
    "id": "brand_10",
    "name": "TechCorp"
  }
}`}
                    language="json"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-100 mt-6">
            <h3 className="font-semibold mb-2 text-indigo-900">Implementación con Control de Rendimiento</h3>
            <p className="text-slate-800 mb-3">
              Ejemplo de código que muestra cómo implementar expansión con límites:
            </p>
            <div className="bg-white rounded-md overflow-hidden">
              <CodeBlock
                code={`// Ejemplo de implementación con control de rendimiento en Express.js
app.get('/api/v1/products/:id', (req, res) => {
  const { id } = req.params;
  const { expand } = req.query;
  
  // 1. Validar y limitar expansiones
  let allowedExpansions = ['category', 'brand', 'reviews'];
  let requestedExpansions = expand ? expand.split(',') : [];
  let validExpansions = requestedExpansions.filter(exp => allowedExpansions.includes(exp));
  
  if (validExpansions.length > 3) {
    validExpansions = validExpansions.slice(0, 3); // Máximo 3 expansiones
  }
  
  // 2. Construir consulta optimizada (usando Sequelize como ejemplo)
  let include = [];
  
  if (validExpansions.includes('category')) {
    include.push({ model: Category });
  }
  
  if (validExpansions.includes('brand')) {
    include.push({ model: Brand });
  }
  
  if (validExpansions.includes('reviews')) {
    include.push({
      model: Review,
      limit: 5, // Limitar número de reseñas
      order: [['created_at', 'DESC']]
    });
  }
  
  // 3. Ejecutar consulta
  Product.findByPk(id, { include })
    .then(product => {
      if (!product) return res.status(404).json({ error: 'Product not found' });
      res.json(product);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});`}
                language="javascript"
              />
            </div>
          </div>

          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Documentación Clara</h3>
              <p className="mb-3 text-sm text-slate-600">
                Documenta detalladamente el sistema de expansión:
              </p>
              <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm">
                <li>Lista todas las relaciones expandibles para cada recurso</li>
                <li>Especifica las limitaciones (profundidad, número máximo de expansiones)</li>
                <li>Proporciona ejemplos claros para diferentes escenarios</li>
                <li>Documenta el impacto en el rendimiento y las recomendaciones</li>
              </ul>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 mt-8">
            <Settings className="h-5 w-5 text-indigo-500" />
            Patrones de Implementación Avanzados
          </h2>

          <div className="space-y-6 mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Expansión Condicional</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Expandir relaciones solo cuando cumplen ciertas condiciones:
                </p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`# Expandir solo las reseñas con 5 estrellas
GET /api/v1/products/123?expand=reviews(rating=5)

# Expandir solo productos en oferta
GET /api/v1/categories/5?expand=products(on_sale=true)

# Expandir con filtros múltiples
GET /api/v1/users/123?expand=orders(status=delivered&created_after=2023-01-01)`}
                    language="http"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Expansión con Paginación Interna</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Paginar las colecciones de recursos expandidos:
                </p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`# Expandir con paginación interna
GET /api/v1/products/123?expand=reviews(page=2&per_page=10)

# Respuesta
{
  "id": "prod_123",
  "name": "Smartphone Premium X",
  // ... otros campos ...
  "reviews": {
    "data": [
      { "id": "rev_45", "rating": 5, "comment": "Excelente producto" },
      // ... más reseñas ...
    ],
    "pagination": {
      "total": 42,
      "page": 2,
      "per_page": 10,
      "pages": 5
    }
  }
}`}
                    language="http"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Expansión con Metadatos</h3>
              <p className="mb-3 text-sm text-slate-600">
                Incluir metadatos adicionales sobre las relaciones expandidas:
              </p>
              <div className="bg-slate-900 rounded-md overflow-hidden">
                <CodeBlock
                  code={`{
  "id": "prod_123",
  "name": "Smartphone Premium X",
  // ... otros campos ...
  "reviews": {
    "data": [
      { "id": "rev_45", "rating": 5, "comment": "Excelente producto" },
      // ... más reseñas ...
    ],
    "meta": {
      "average_rating": 4.7,
      "total_count": 42,
      "distribution": {
        "5_star": 30,
        "4_star": 8,
        "3_star": 3,
        "2_star": 1,
        "1_star": 0
      }
    }
  }
}`}
                  language="json"
                />
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 mt-8">
            <Waypoints className="h-5 w-5 text-indigo-500" />
            Casos de Uso Específicos
          </h2>

          <Card className="border border-slate-200 shadow-sm overflow-hidden mt-4">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Expansión en APIs de E-commerce</h3>
                </div>
                <p className="text-slate-700">
                  Recuperación de datos relacionados para productos en tiendas online.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <EndpointExample
                    method="GET"
                    path="/api/v1/products/123?expand=category,variants,recommendations"
                    description="Recupera un producto con su categoría, variantes y recomendaciones relacionadas."
                    responseExample={`{
  "id": "prod_123",
  "name": "Smartphone Premium X",
  "price": 899.99,
  "description": "El último modelo con características avanzadas",
  "category": {
    "id": "cat_5",
    "name": "Smartphones",
    "parent_category": "Electrónica"
  },
  "variants": [
    {
      "id": "var_1",
      "name": "Negro / 128GB",
      "price": 899.99,
      "stock": 15
    },
    {
      "id": "var_2",
      "name": "Blanco / 128GB",
      "price": 899.99,
      "stock": 8
    },
    {
      "id": "var_3",
      "name": "Negro / 256GB",
      "price": 999.99,
      "stock": 10
    }
  ],
  "recommendations": [
    {
      "id": "prod_456",
      "name": "Funda Protectora Premium",
      "price": 29.99,
      "thumbnail": "https://example.com/thumbnails/funda.jpg"
    },
    {
      "id": "prod_789",
      "name": "Cargador Rápido 25W",
      "price": 19.99,
      "thumbnail": "https://example.com/thumbnails/cargador.jpg"
    }
  ]
}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6 mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Expansión en APIs de Redes Sociales</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Optimización de consultas para datos socialmente conectados:
                </p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`# Expandir autor y comentarios de un post
GET /api/v1/posts/123?expand=author,comments.author,likes

# Expandir perfiles completos de seguidores
GET /api/v1/users/123?expand=followers.profile`}
                    language="http"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Expansión en APIs de SaaS B2B</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Optimización de contexto en entornos empresariales:
                </p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`# Expandir detalles de organización y permisos
GET /api/v1/users/123?expand=organization,permissions

# Expandir toda la información de un proyecto
GET /api/v1/projects/456?expand=teams,tasks.assignee,client`}
                    language="http"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 mt-8">
            <Code className="h-5 w-5 text-indigo-500" />
            Ejemplos de APIs Populares
          </h2>

          <div className="space-y-6 mt-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 p-4">
                  <h3 className="font-medium">Stripe API</h3>
                </div>
                <div className="p-6">
                  <p className="mb-3">
                    Stripe utiliza el parámetro <code>expand</code> para incluir objetos relacionados:
                  </p>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code={`# Expandir cliente y tarjeta en un cargo
GET /v1/charges/ch_1KjJXz2eZvKYlo2CvENZ4W3M?expand[]=customer&expand[]=source

# Expandir líneas de factura
GET /v1/invoices/in_1KjHz2eZvKYlo2CjkLmKjL1?expand[]=lines.data.price.product`}
                      language="http"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <blockquote className="border-l-4 border-indigo-300 pl-6 py-2 pr-4 mt-8 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-r-lg">
            <p className="italic text-indigo-900 font-medium">
              "La expansión de campos ejemplifica el equilibrio entre simplicidad y
              flexibilidad en el diseño de APIs. Permite a los clientes adaptar las
              respuestas a sus necesidades específicas, reduciendo la sobrecarga de red
              y mejorando la experiencia del desarrollador, mientras que al servidor le
              da control sobre qué y cuánto expandir para mantener un rendimiento
              óptimo."
            </p>
          </blockquote>
        </div>
      </div>
    </PageLayout>
  );
};

export default FieldExpansion;
