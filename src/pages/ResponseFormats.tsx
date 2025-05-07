import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";
import { Link } from "react-router-dom";
import { Code, Info, CheckCircle, Database, FileJson, Terminal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const ResponseFormats = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/status-codes" className="text-sm text-slate-500 hover:text-slate-700">Respuestas</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Formatos de Respuesta</h1>
          <p className="text-lg text-slate-700">
            Estándares y mejores prácticas para estructurar respuestas en APIs REST.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <p>
            Un formato de respuesta bien diseñado es fundamental para una API REST efectiva.
            Las respuestas consistentes, predecibles y expresivas mejoran la experiencia del
            desarrollador y reducen los errores de integración. En esta guía exploraremos los
            estándares, mejores prácticas y patrones para estructurar respuestas en APIs REST.
          </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Info className="h-5 w-5 text-slate-700" />
            Principios Básicos
          </h2>

          <p>
            Antes de entrar en formatos específicos, es importante entender los principios
            fundamentales que deben guiar el diseño de las respuestas:
          </p>

          <div className="border border-slate-200 p-6 rounded-md mt-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                <span><strong>Consistencia:</strong> Mantener una estructura uniforme en todas las respuestas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                <span><strong>Predicción:</strong> Los clientes deben poder anticipar la estructura de la respuesta</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                <span><strong>Expresividad:</strong> Las respuestas deben ser autoexplicativas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                <span><strong>Minimalismo:</strong> Evitar información innecesaria que aumente el tamaño de la respuesta</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                <span><strong>Flexibilidad:</strong> Permitir extensiones futuras sin romper la compatibilidad</span>
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <FileJson className="h-5 w-5 text-slate-700" />
            Formato JSON
          </h2>

          <p>
            JSON (JavaScript Object Notation) se ha convertido en el formato estándar de facto para APIs REST
            modernas debido a su simplicidad, ligereza y amplio soporte en prácticamente todos los lenguajes
            de programación.
          </p>

          <h3 className="text-lg font-semibold tracking-tight mt-6">
            Ventajas de JSON
          </h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>Sintaxis simple y legible para humanos</li>
            <li>Más compacto que XML (menos sobrecarga de marcado)</li>
            <li>Parsing nativo en JavaScript/TypeScript</li>
            <li>Soporte universal en lenguajes de programación</li>
            <li>Facilita la transferencia de estructuras de datos complejas</li>
          </ul>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <EndpointExample
                  method="GET"
                  path="/api/v1/products/123"
                  description="Respuesta típica en formato JSON para un recurso individual."
                  responseExample={`{
  "id": "prod_123",
  "name": "Smartphone Premium X",
  "price": 899.99,
  "in_stock": true,
  "category_id": "cat_5",
  "attributes": {
    "color": "black",
    "storage": "128GB",
    "dimensions": {
      "height": 150,
      "width": 75,
      "depth": 8
    }
  },
  "tags": ["premium", "new", "featured"],
  "created_at": "2023-05-20T14:56:29Z",
  "updated_at": "2023-06-15T09:12:45Z"
}`}
                />
              </div>
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold tracking-tight mt-6">
            Convenciones de Nomenclatura
          </h3>

          <p>
            Es importante seguir un estilo consistente para nombrar propiedades en JSON:
          </p>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <CodeBlock
                code={`// Ejemplo con snake_case
{
  "user_id": 123,
  "first_name": "John",
  "last_name": "Doe",
  "created_at": "2023-06-15T09:12:45Z"
}

// Ejemplo con camelCase
{
  "userId": 123,
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2023-06-15T09:12:45Z"
}

// Ejemplo con PascalCase
{
  "UserId": 123,
  "FirstName": "John",
  "LastName": "Doe",
  "CreatedAt": "2023-06-15T09:12:45Z"
}`}
                language="javascript"
              />

              <p className="mt-4 text-sm text-slate-600">
                Lo más importante es elegir un estilo y mantenerlo consistentemente en toda la API.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Database className="h-5 w-5 text-slate-700" />
            Estructuras de Respuesta Estándares
          </h2>

          <h3 className="text-lg font-semibold tracking-tight mt-6">
            Respuesta para Recurso Individual
          </h3>

          <p>
            Al devolver un único recurso, la respuesta típicamente contiene el objeto directamente como raíz:
          </p>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <CodeBlock
                code={`{
  "id": "order_123",
  "status": "shipped",
  "customer_id": "cust_456",
  "total": 129.99,
  "items_count": 3,
  "created_at": "2023-06-10T15:30:22Z"
}`}
                language="javascript"
              />
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold tracking-tight mt-6">
            Respuesta para Colecciones
          </h3>

          <p>
            Existen varios enfoques para devolver colecciones de recursos:
          </p>

          <h4 className="font-semibold mt-4">1. Array Simple</h4>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <CodeBlock
                code={`[
  {
    "id": "prod_101",
    "name": "Smartphone Premium X",
    "price": 899.99
  },
  {
    "id": "prod_102",
    "name": "Smartwatch Series 5",
    "price": 299.99
  },
  {
    "id": "prod_103",
    "name": "Wireless Earbuds Pro",
    "price": 149.99
  }
]`}
                language="javascript"
              />

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-md p-3">
                  <p className="text-sm font-semibold text-slate-700">Ventajas:</p>
                  <p className="text-sm text-slate-600">Simple, directo y ahorra ancho de banda.</p>
                </div>
                <div className="border border-slate-200 rounded-md p-3">
                  <p className="text-sm font-semibold text-slate-700">Desventajas:</p>
                  <p className="text-sm text-slate-600">No permite incluir metadatos como paginación o información de filtrado.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h4 className="font-semibold mt-4">2. Objeto con Array en Propiedad Data/Items</h4>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <CodeBlock
                code={`{
  "data": [
    {
      "id": "prod_101",
      "name": "Smartphone Premium X",
      "price": 899.99
    },
    {
      "id": "prod_102",
      "name": "Smartwatch Series 5",
      "price": 299.99
    },
    {
      "id": "prod_103",
      "name": "Wireless Earbuds Pro",
      "price": 149.99
    }
  ],
  "pagination": {
    "total": 325,
    "page": 1,
    "per_page": 10,
    "pages": 33
  },
  "filters_applied": {
    "category": "electronics"
  }
}`}
                language="javascript"
              />

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-md p-3">
                  <p className="text-sm font-semibold text-slate-700">Ventajas:</p>
                  <p className="text-sm text-slate-600">Permite incluir metadatos y mantiene estructura coherente.</p>
                </div>
                <div className="border border-slate-200 rounded-md p-3">
                  <p className="text-sm font-semibold text-slate-700">Desventajas:</p>
                  <p className="text-sm text-slate-600">Agrega un nivel adicional de anidación.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold tracking-tight mt-6">
            Patrones de Respuesta para Operaciones
          </h3>

          <h4 className="font-semibold mt-4">Respuesta para Creación (POST)</h4>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <EndpointExample
                  method="POST"
                  path="/api/v1/orders"
                  description="Ejemplo de respuesta tras crear un nuevo recurso."
                  responseExample={`{
  "id": "order_789",
  "status": "pending",
  "customer_id": "cust_456",
  "total": 89.97,
  "created_at": "2023-06-20T10:15:30Z",
  "items": [
    {
      "product_id": "prod_101",
      "quantity": 1,
      "price": 89.97
    }
  ]
}`}
                />
              </div>
            </CardContent>
          </Card>

          <p>
            Las respuestas a operaciones de creación generalmente:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Devuelven código HTTP 201 Created</li>
            <li>Incluyen el recurso completo con todos los campos generados por el servidor</li>
            <li>Proporcionan una cabecera Location con la URL del nuevo recurso</li>
          </ul>

          <h4 className="font-semibold mt-4">Respuesta para Actualización (PUT/PATCH)</h4>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <EndpointExample
                  method="PATCH"
                  path="/api/v1/users/123"
                  description="Ejemplo de respuesta tras actualizar un recurso existente."
                  responseExample={`{
  "id": "user_123",
  "name": "John Smith",
  "email": "john.smith@example.com",
  "role": "admin",
  "updated_at": "2023-06-20T14:25:10Z"
}`}
                />
              </div>
            </CardContent>
          </Card>

          <p>
            Las respuestas a operaciones de actualización típicamente:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Devuelven código HTTP 200 OK</li>
            <li>Incluyen el recurso actualizado completo (recomendado)</li>
            <li>Alternativamente, pueden devolver solo los campos actualizados</li>
          </ul>

          <h4 className="font-semibold mt-4">Respuesta para Eliminación (DELETE)</h4>

          <p>
            Existen diferentes enfoques para respuestas tras eliminación:
          </p>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <CodeBlock
                code={`// Opción 1: 204 No Content (sin cuerpo de respuesta)
HTTP/1.1 204 No Content

// Opción 2: 200 OK con confirmación
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "message": "Resource successfully deleted"
}

// Opción 3: 200 OK con recurso eliminado
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "task_456",
  "title": "Complete the report",
  "deleted_at": "2023-06-20T15:30:45Z"
}`}
                language="http"
              />
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Code className="h-5 w-5 text-slate-700" />
            Formatos Estándar y Especificaciones
          </h2>

          <h3 className="text-lg font-semibold tracking-tight mt-6">
            JSON:API
          </h3>

          <p>
            JSON:API es una especificación para construir APIs que define cómo los clientes deben solicitar
            y modificar recursos, y cómo los servidores deben responder.
          </p>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <CodeBlock
                code={`{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "Introducción a REST",
      "content": "REST (Representational State Transfer) es un estilo arquitectónico...",
      "created": "2023-01-15T12:00:00Z"
    },
    "relationships": {
      "author": {
        "data": { "type": "people", "id": "42" }
      },
      "comments": {
        "data": [
          { "type": "comments", "id": "5" },
          { "type": "comments", "id": "12" }
        ]
      }
    },
    "links": {
      "self": "https://api.example.com/articles/1"
    }
  },
  "included": [
    {
      "type": "people",
      "id": "42",
      "attributes": {
        "name": "John Doe",
        "email": "john.doe@example.com"
      }
    },
    {
      "type": "comments",
      "id": "5",
      "attributes": {
        "content": "Gran artículo!",
        "created": "2023-01-16T08:30:00Z"
      }
    },
    {
      "type": "comments",
      "id": "12",
      "attributes": {
        "content": "Muy bien explicado",
        "created": "2023-01-16T09:15:00Z"
      }
    }
  ]
}`}
                language="javascript"
              />

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-md p-3">
                  <p className="text-sm font-semibold text-slate-700">Ventajas:</p>
                  <p className="text-sm text-slate-600">Especificación madura, manejo consistente de relaciones, amplio soporte.</p>
                </div>
                <div className="border border-slate-200 rounded-md p-3">
                  <p className="text-sm font-semibold text-slate-700">Desventajas:</p>
                  <p className="text-sm text-slate-600">Mayor complejidad, estructura más verbosa.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold tracking-tight mt-6">OData (Open Data Protocol)</h3>

          <p>
            OData es un protocolo para crear y consumir APIs RESTful, comúnmente usado en ecosistemas Microsoft.
          </p>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <CodeBlock
                code={`{
  "@odata.context": "https://api.example.com/odata/$metadata#Products",
  "value": [
    {
      "ID": 1,
      "Name": "Smartphone Premium X",
      "Price": 899.99,
      "Category": {
        "ID": 5,
        "Name": "Electronics"
      }
    },
    {
      "ID": 2,
      "Name": "Smartwatch Series 5",
      "Price": 299.99,
      "Category": {
        "ID": 5,
        "Name": "Electronics"
      }
    }
  ],
  "@odata.nextLink": "https://api.example.com/odata/Products?$skip=2&$top=2"
}`}
                language="javascript"
              />
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold tracking-tight mt-6">HAL (Hypertext Application Language)</h3>

          <p>
            HAL es un formato simple que proporciona una manera consistente de hipervínculos entre recursos.
          </p>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <CodeBlock
                code={`{
  "id": "order_123",
  "total": 129.99,
  "status": "shipped",
  "_links": {
    "self": { "href": "/orders/123" },
    "customer": { "href": "/customers/456" },
    "items": { "href": "/orders/123/items" }
  },
  "_embedded": {
    "items": [
      {
        "id": "item_1",
        "product_id": "prod_101",
        "quantity": 1,
        "price": 89.99,
        "_links": {
          "self": { "href": "/order-items/1" },
          "product": { "href": "/products/101" }
        }
      },
      {
        "id": "item_2",
        "product_id": "prod_202",
        "quantity": 2,
        "price": 19.99,
        "_links": {
          "self": { "href": "/order-items/2" },
          "product": { "href": "/products/202" }
        }
      }
    ]
  }
}`}
                language="javascript"
              />
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-slate-700" />
            Mejores Prácticas
          </h2>

          <h3 className="text-lg font-semibold tracking-tight mt-6">
            Consistencia en la Estructura
          </h3>

          <p>
            Mantén una estructura consistente en todas las respuestas:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Usa los mismos nombres de campo para representar el mismo tipo de datos</li>
            <li>Mantén el mismo formato para fechas, identificadores y valores enumerados</li>
            <li>Sigue la misma convención de nomenclatura en todos los endpoints</li>
          </ul>

          <h3 className="text-lg font-semibold tracking-tight mt-6">
            Manejo de Valores Nulos vs. Omisión de Campos
          </h3>

          <p>
            Hay dos enfoques para tratar con campos sin valor:
          </p>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <CodeBlock
                code={`// Enfoque 1: Incluir campos con null
{
  "id": "user_123",
  "name": "John Doe",
  "phone": null,
  "address": null
}

// Enfoque 2: Omitir campos nulos
{
  "id": "user_123",
  "name": "John Doe"
}`}
                language="javascript"
              />

              <p className="mt-4 text-sm text-slate-600">
                <strong>Recomendación:</strong> Ser consistente y documentar el enfoque elegido. La omisión reduce el tamaño
                de las respuestas pero puede complicar el procesamiento del lado del cliente.
              </p>
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold tracking-tight mt-6">
            Formato de Fechas
          </h3>

          <p>
            Utiliza ISO 8601 para representar fechas y horas:
          </p>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <CodeBlock
                code={`{
  "created_at": "2023-06-20T14:25:10Z",         // Tiempo UTC
  "updated_at": "2023-06-20T16:30:45+02:00",    // Con zona horaria explícita
  "due_date": "2023-07-15"                      // Solo fecha
}`}
                language="javascript"
              />
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold tracking-tight mt-6">
            Metadatos y Paginación
          </h3>

          <p>
            Incluye metadatos útiles en respuestas de colecciones:
          </p>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <CodeBlock
                code={`{
  "data": [
    // ... array de recursos ...
  ],
  "meta": {
    "pagination": {
      "total": 1358,
      "count": 10,
      "per_page": 10,
      "current_page": 3,
      "total_pages": 136,
      "links": {
        "first": "https://api.example.com/products?page=1",
        "last": "https://api.example.com/products?page=136",
        "prev": "https://api.example.com/products?page=2",
        "next": "https://api.example.com/products?page=4"
      }
    },
    "response_time_ms": 42
  }
}`}
                language="javascript"
              />
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold tracking-tight mt-6">
            Hipermedia y HATEOAS
          </h3>

          <p>
            Siguiendo los principios de HATEOAS, incluye enlaces relacionados:
          </p>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <CodeBlock
                code={`{
  "id": "article_123",
  "title": "Introducción a REST",
  "content": "...",
  "_links": {
    "self": { "href": "/articles/123" },
    "author": { "href": "/users/456" },
    "comments": { "href": "/articles/123/comments" },
    "category": { "href": "/categories/tech" }
  }
}`}
                language="javascript"
              />
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Terminal className="h-5 w-5 text-slate-700" />
            Ejemplos de APIs Populares
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-base">GitHub API</CardTitle>
                <CardDescription>Estructura simple y directa</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <CodeBlock
                  code={`{
  "id": 1296269,
  "name": "Hello-World",
  "full_name": "octocat/Hello-World",
  "owner": {
    "login": "octocat",
    "id": 1,
    "avatar_url": "https://github.com/images/error/octocat_happy.gif"
  },
  "private": false,
  "description": "This your first repo!",
  "created_at": "2011-01-26T19:01:12Z",
  "updated_at": "2011-01-26T19:14:43Z"
}`}
                  language="javascript"
                />
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-base">Stripe API</CardTitle>
                <CardDescription>Incluye identificador de objeto</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <CodeBlock
                  code={`{
  "id": "ch_3ONBD42eZvKYlo2C1hmsQfPh",
  "object": "charge",
  "amount": 2000,
  "amount_captured": 2000,
  "amount_refunded": 0,
  "currency": "usd",
  "created": 1674241861,
  "status": "succeeded",
  "livemode": false
}`}
                  language="javascript"
                />
              </CardContent>
            </Card>
          </div>

          <div className="border border-slate-200 rounded-md p-6 mt-8 bg-slate-50">
            <p className="text-slate-700">
              "Un buen formato de respuesta es como un contrato bien redactado: claro, predecible y sin ambigüedades.
              La consistencia y la expresividad son más importantes que seguir una especificación particular.
              Independientemente del formato que elijas, mantén la coherencia y documenta bien tus decisiones."
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResponseFormats;
