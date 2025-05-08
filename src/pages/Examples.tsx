import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent } from "@/components/ui/card";
import { EndpointExample } from "@/components/EndpointExample";
import { RouteExample } from "@/components/RouteExample";
import { Link } from "react-router-dom";
import { ShoppingCart, BookOpen, ListChecks, Calendar, Codepen, Code, CheckCircle, ArrowRight, Terminal, Database, Info } from "lucide-react";

const Examples = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/openapi" className="text-sm text-slate-500 hover:text-slate-700">Documentación</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Ejemplos Prácticos</h1>
          <p className="text-lg text-slate-700">
            Casos de estudio y ejemplos de implementaciones de APIs REST.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <p className="text-slate-700">
            Esta sección presenta ejemplos prácticos de implementaciones de APIs REST para diferentes
            escenarios y casos de uso. Cada ejemplo incluye explicaciones detalladas, código de muestra
            y consideraciones de diseño.
          </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-indigo-500" />
            API de comercio electrónico
          </h2>

          <p className="text-slate-700">
            Este ejemplo muestra una API REST para una plataforma de comercio electrónico, con endpoints
            para gestionar productos, pedidos, usuarios y carritos de compra.
          </p>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Database className="h-5 w-5 text-blue-500" />
            Estructura de recursos
          </h3>

          <div className="space-y-3 mb-6">
            <RouteExample method="GET" path="/products" description="Catálogo de productos" />
            <RouteExample method="GET" path="/categories" description="Categorías de productos" />
            <RouteExample method="GET" path="/users" description="Usuarios registrados" />
            <RouteExample method="GET" path="/orders" description="Pedidos realizados" />
            <RouteExample method="GET" path="/carts" description="Carritos de compra" />
            <RouteExample method="GET" path="/reviews" description="Reseñas de productos" />
          </div>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Code className="h-5 w-5 text-blue-500" />
            Endpoints para productos
          </h3>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
            <EndpointExample
              method="GET"
              path="/api/v1/products"
              description="Listar productos con soporte para filtrado, ordenamiento y paginación"
              responseExample={`{
  "data": [
    {
      "id": "prod_123",
      "name": "Smartphone Premium X",
      "price": 899.99,
      "description": "El último smartphone con características avanzadas",
      "category_id": "cat_5",
      "in_stock": true,
      "image_url": "https://example.com/images/smartphone-x.jpg",
      "created_at": "2023-05-20T14:56:29Z"
    },
    {
      "id": "prod_124",
      "name": "Auriculares Inalámbricos Pro",
      "price": 149.99,
      "description": "Auriculares con cancelación de ruido",
      "category_id": "cat_5",
      "in_stock": true,
      "image_url": "https://example.com/images/auriculares-pro.jpg",
      "created_at": "2023-05-22T10:23:15Z"
    }
  ],
  "meta": {
    "total": 243,
    "page": 1,
    "per_page": 20,
    "total_pages": 13,
    "links": {
      "next": "/api/v1/products?page=2",
      "prev": null
    }
  }
}`}
            />
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
            <EndpointExample
              method="POST"
              path="/api/v1/products"
              description="Crear un nuevo producto"
              responseExample={`{
  "id": "prod_125",
  "name": "Tableta Ultra HD",
  "price": 499.99,
  "description": "Tableta de 10 pulgadas con pantalla Ultra HD",
  "category_id": "cat_5",
  "in_stock": true,
  "image_url": "https://example.com/images/tablet-hd.jpg",
  "created_at": "2023-06-20T08:12:45Z"
}`}
            />
          </div>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Terminal className="h-5 w-5 text-blue-500" />
            Gestión de pedidos
          </h3>

          <CodeBlock
            code={`// Solicitud para crear un nuevo pedido
POST /api/v1/orders HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "items": [
    {
      "product_id": "prod_123",
      "quantity": 1
    },
    {
      "product_id": "prod_124",
      "quantity": 2
    }
  ],
  "shipping_address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "postal_code": "12345",
    "country": "US"
  },
  "payment_method_id": "pm_card_visa"
}

// Respuesta
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "order_789",
  "status": "pending",
  "created_at": "2023-06-20T15:30:45Z",
  "updated_at": "2023-06-20T15:30:45Z",
  "items": [
    {
      "product_id": "prod_123",
      "name": "Smartphone Premium X",
      "quantity": 1,
      "unit_price": 899.99,
      "total": 899.99
    },
    {
      "product_id": "prod_124",
      "name": "Auriculares Inalámbricos Pro",
      "quantity": 2,
      "unit_price": 149.99,
      "total": 299.98
    }
  ],
  "subtotal": 1199.97,
  "tax": 108.00,
  "shipping": 15.00,
  "total": 1322.97,
  "shipping_address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "postal_code": "12345",
    "country": "US"
  },
  "payment_status": "unpaid",
  "payment_method": "credit_card",
  "_links": {
    "self": { "href": "/api/v1/orders/order_789" },
    "payment": { "href": "/api/v1/orders/order_789/payment" },
    "cancel": { "href": "/api/v1/orders/order_789/cancel" }
  }
}`}
            language="http"
          />

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Database className="h-5 w-5 text-blue-500" />
            Implementación de carrito de compras
          </h3>

          <CodeBlock
            code={`// Solicitud para agregar un producto al carrito
POST /api/v1/carts/current/items HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "product_id": "prod_123",
  "quantity": 1
}

// Respuesta
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "cart_456",
  "created_at": "2023-06-19T10:15:30Z",
  "updated_at": "2023-06-20T14:25:10Z",
  "items": [
    {
      "id": "item_1",
      "product_id": "prod_123",
      "name": "Smartphone Premium X",
      "quantity": 1,
      "unit_price": 899.99,
      "total": 899.99
    },
    {
      "id": "item_2",
      "product_id": "prod_124",
      "name": "Auriculares Inalámbricos Pro",
      "quantity": 1,
      "unit_price": 149.99,
      "total": 149.99
    }
  ],
  "subtotal": 1049.98,
  "item_count": 2,
  "_links": {
    "checkout": { "href": "/api/v1/carts/cart_456/checkout" },
    "products": { "href": "/api/v1/products" }
  }
}`}
            language="http"
          />

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <CheckCircle className="h-5 w-5 text-blue-500" />
            Características avanzadas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Expansión de relaciones</h4>
                <p className="mb-2 text-slate-700">Permitir incluir recursos relacionados en la respuesta:</p>
                <code className="block bg-slate-100 p-2 rounded">
                  GET /api/v1/products/prod_123?expand=category,reviews
                </code>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Filtrado avanzado</h4>
                <p className="mb-2 text-slate-700">Filtrar productos por múltiples criterios:</p>
                <code className="block bg-slate-100 p-2 rounded">
                  GET /api/v1/products?category=cat_5&min_price=100&max_price=500&in_stock=true
                </code>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-500" />
            API de sistema de blog
          </h2>

          <p className="text-slate-700">
            Este ejemplo muestra una API REST para un sistema de blog con artículos, 
            comentarios y usuarios.
          </p>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Database className="h-5 w-5 text-blue-500" />
            Estructura de recursos
          </h3>

          <div className="space-y-1 mb-6 ml-6 text-slate-700">
            <p><code>/posts</code> - Artículos del blog</p>
            <p><code>/comments</code> - Comentarios en artículos</p>
            <p><code>/users</code> - Autores y usuarios</p>
            <p><code>/categories</code> - Categorías de artículos</p>
            <p><code>/tags</code> - Etiquetas para artículos</p>
          </div>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <ArrowRight className="h-5 w-5 text-blue-500" />
            API para el Blog: Endpoints principales
          </h3>
          
          <div className="space-y-6 mb-6">
            <div>
              <h4 className="font-semibold mb-3">Artículos (Posts)</h4>
              <div className="space-y-2">
                <RouteExample method="GET" path="/api/posts" description="Listar artículos con filtros y paginación" />
                <RouteExample method="GET" path="/api/posts/:id" description="Obtener un artículo específico" />
                <RouteExample method="POST" path="/api/posts" description="Crear un nuevo artículo (autenticado)" />
                <RouteExample method="PUT" path="/api/posts/:id" description="Actualizar un artículo completo" />
                <RouteExample method="PATCH" path="/api/posts/:id" description="Actualizar partes de un artículo" />
                <RouteExample method="DELETE" path="/api/posts/:id" description="Eliminar un artículo" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Comentarios (Comments)</h4>
              <div className="space-y-2">
                <RouteExample method="GET" path="/api/posts/:postId/comments" description="Listar comentarios de un artículo" />
                <RouteExample method="POST" path="/api/posts/:postId/comments" description="Añadir comentario a un artículo" />
                <RouteExample method="PUT" path="/api/comments/:id" description="Actualizar un comentario" />
                <RouteExample method="DELETE" path="/api/comments/:id" description="Eliminar un comentario" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Categorías y etiquetas</h4>
              <div className="space-y-2">
                <RouteExample method="GET" path="/api/categories" description="Listar todas las categorías" />
                <RouteExample method="GET" path="/api/tags" description="Listar todas las etiquetas" />
                <RouteExample method="GET" path="/api/categories/:id/posts" description="Artículos por categoría" />
                <RouteExample method="GET" path="/api/tags/:name/posts" description="Artículos por etiqueta" />
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Database className="h-5 w-5 text-blue-500" />
            Ejemplos de solicitudes y respuestas
          </h3>

          <CodeBlock
            code={`// Listar posts con filtrado y paginación
GET /api/posts?category=technology&tag=javascript&page=2&limit=10 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Respuesta
HTTP/1.1 200 OK
Content-Type: application/json

{
  "data": [
    {
      "id": "post_123",
      "title": "Introducción a REST API",
      "excerpt": "Aprende los conceptos básicos de REST...",
      "author": {
        "id": "user_456",
        "name": "María García",
        "email": "maria@example.com"
      },
      "categories": [
        {
          "id": "cat_789",
          "name": "Technology"
        }
      ],
      "tags": ["api", "javascript", "rest"],
      "created_at": "2023-05-20T14:56:29Z",
      "updated_at": "2023-05-20T14:56:29Z"
    },
    // Más posts...
  ],
  "meta": {
    "total": 25,
    "page": 2,
    "per_page": 10,
    "total_pages": 3
  }
}`}
            language="http"
          />

          <CodeBlock
            code={`// Crear un nuevo comentario en un artículo
POST /api/posts/post_123/comments HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "content": "Excelente artículo, muy informativo y bien explicado."
}

// Respuesta
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "comment_456",
  "post_id": "post_123",
  "content": "Excelente artículo, muy informativo y bien explicado.",
  "author": {
    "id": "user_789",
    "name": "Juan Pérez",
    "email": "juan@example.com"
  },
  "created_at": "2023-06-20T15:30:45Z",
  "_links": {
    "self": { "href": "/api/comments/comment_456" },
    "post": { "href": "/api/posts/post_123" },
    "author": { "href": "/api/users/user_789" }
  }
}`}
            language="http"
          />

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Database className="h-5 w-5 text-blue-500" />
            Uso de la API
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Obtener artículos por categoría</h4>
                <code className="block bg-gray-100 p-2 rounded">
                  GET /api/posts?category=technology&page=2&limit=15
                </code>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Buscar artículos por etiqueta</h4>
                <code className="block bg-gray-100 p-2 rounded">
                  GET /api/posts?tag=javascript&tag=tutorial
                </code>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-indigo-500" />
            API de gestión de tareas
          </h2>

          <p className="text-slate-700">
            Un ejemplo de API REST para una aplicación de gestión de tareas tipo Todo list,
            con soporte para usuarios, proyectos y tareas.
          </p>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Database className="h-5 w-5 text-blue-500" />
            Estructura de recursos
          </h3>

          <div className="space-y-1 mb-6 ml-6 text-slate-700">
            <p><code>/users</code> - Usuarios del sistema</p>
            <p><code>/projects</code> - Proyectos o listas de tareas</p>
            <p><code>/tasks</code> - Tareas individuales</p>
            <p><code>/labels</code> - Etiquetas para categorizar tareas</p>
          </div>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Code className="h-5 w-5 text-blue-500" />
            Operaciones con tareas
          </h3>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
            <EndpointExample
              method="GET"
              path="/api/v1/tasks"
              description="Listar tareas con filtrado por proyecto, etiqueta y estado"
              responseExample={`{
  "data": [
    {
      "id": "task_123",
      "title": "Implementar autenticación de usuario",
      "description": "Agregar login con JWT",
      "status": "in_progress",
      "priority": "high",
      "due_date": "2023-06-30T00:00:00Z",
      "project_id": "project_456",
      "assignee_id": "user_789",
      "labels": ["backend", "security"],
      "created_at": "2023-06-01T10:00:00Z",
      "updated_at": "2023-06-15T14:30:00Z"
    },
    {
      "id": "task_124",
      "title": "Diseñar página de inicio",
      "description": "Crear wireframes para la página principal",
      "status": "todo",
      "priority": "medium",
      "due_date": "2023-06-25T00:00:00Z",
      "project_id": "project_456",
      "assignee_id": "user_790",
      "labels": ["design", "frontend"],
      "created_at": "2023-06-02T09:15:00Z",
      "updated_at": "2023-06-02T09:15:00Z"
    }
  ],
  "meta": {
    "total": 24,
    "page": 1,
    "per_page": 20,
    "total_pages": 2
  }
}`}
            />
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
            <EndpointExample
              method="PATCH"
              path="/api/v1/tasks/task_123"
              description="Actualizar estado y asignación de una tarea"
              responseExample={`{
  "id": "task_123",
  "title": "Implementar autenticación de usuario",
  "description": "Agregar login con JWT",
  "status": "completed",
  "priority": "high",
  "due_date": "2023-06-30T00:00:00Z",
  "project_id": "project_456",
  "assignee_id": "user_791",
  "labels": ["backend", "security"],
  "created_at": "2023-06-01T10:00:00Z",
  "updated_at": "2023-06-20T16:45:00Z"
}`}
            />
          </div>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Terminal className="h-5 w-5 text-blue-500" />
            API de Tareas: Diseño de Recursos y Operaciones
          </h3>

          <div className="space-y-6 mb-6">
            <div>
              <h4 className="font-semibold mb-3">Recursos y Endpoints</h4>
              <div className="space-y-2">
                <RouteExample method="GET" path="/api/tasks" description="Listar tareas con múltiples filtros" />
                <RouteExample method="GET" path="/api/tasks/:id" description="Obtener detalles de una tarea" />
                <RouteExample method="POST" path="/api/tasks" description="Crear una nueva tarea" />
                <RouteExample method="PATCH" path="/api/tasks/:id" description="Actualizar estado u otros campos" />
                <RouteExample method="DELETE" path="/api/tasks/:id" description="Eliminar una tarea" />
                <RouteExample method="GET" path="/api/projects/:id/tasks" description="Listar tareas de un proyecto" />
                <RouteExample method="GET" path="/api/labels/:name/tasks" description="Tareas con una etiqueta" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Diseño de filtros</h4>
              <div className="space-y-2">
                <RouteExample method="GET" path="/api/tasks?status=in_progress" description="Filtros por estado" />
                <RouteExample method="GET" path="/api/tasks?priority=high" description="Filtros por prioridad" />
                <RouteExample method="GET" path="/api/tasks?labels=backend&labels=security" description="Filtros por etiqueta" />
                <RouteExample method="GET" path="/api/tasks?project_id=project_456" description="Filtros por proyecto" />
                <RouteExample method="GET" path="/api/tasks?assignee_id=user_789" description="Filtros por asignación" />
                <RouteExample method="GET" path="/api/tasks?due_before=2023-06-30" description="Filtros por fecha" />
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Database className="h-5 w-5 text-blue-500" />
            Ejemplos de Operaciones con Tareas
          </h3>

          <CodeBlock
            code={`// Crear una nueva tarea
POST /api/tasks HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "title": "Implementar autenticación de usuario",
  "description": "Agregar login con JWT",
  "status": "todo",
  "priority": "high",
  "due_date": "2023-06-30T00:00:00Z",
  "project_id": "project_456",
  "assignee_id": "user_789",
  "labels": ["backend", "security"]
}

// Respuesta
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "task_123",
  "title": "Implementar autenticación de usuario",
  "description": "Agregar login con JWT",
  "status": "todo",
  "priority": "high",
  "due_date": "2023-06-30T00:00:00Z",
  "project_id": "project_456",
  "assignee_id": "user_789",
  "labels": ["backend", "security"],
  "created_at": "2023-06-01T10:00:00Z",
  "updated_at": "2023-06-01T10:00:00Z"
}`}
            language="http"
          />

          <CodeBlock
            code={`// Actualizar el estado y reasignar una tarea
PATCH /api/tasks/task_123 HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "status": "completed",
  "assignee_id": "user_790"
}

// Respuesta
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "task_123",
  "title": "Implementar autenticación de usuario",
  "description": "Agregar login con JWT",
  "status": "completed",
  "priority": "high", 
  "due_date": "2023-06-30T00:00:00Z",
  "project_id": "project_456",
  "assignee_id": "user_790",
  "labels": ["backend", "security"],
  "created_at": "2023-06-01T10:00:00Z",
  "updated_at": "2023-06-15T14:30:00Z"
}`}
            language="http"
          />

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-500" />
            API de sistema de reservas
          </h2>

          <p className="text-slate-700">
            Una API REST para un sistema de reservas que permite a los usuarios reservar 
            recursos como salas de reuniones, equipos o servicios.
          </p>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Database className="h-5 w-5 text-blue-500" />
            Estructura de recursos
          </h3>

          <div className="space-y-3 mb-6">
            <RouteExample method="GET" path="/resources" description="Recursos disponibles para reservar" />
            <RouteExample method="GET" path="/bookings" description="Reservas realizadas" />
            <RouteExample method="GET" path="/users" description="Usuarios del sistema" />
            <RouteExample method="GET" path="/availability" description="Disponibilidad de recursos" />
          </div>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Database className="h-5 w-5 text-blue-500" />
            Verificar disponibilidad
          </h3>

          <EndpointExample
            method="GET"
            path="/api/v1/resources/room_101/availability?date=2023-06-25"
            description="Comprobar la disponibilidad de un recurso para una fecha específica"
            responseExample={`{
  "resource_id": "room_101",
  "name": "Sala de reuniones principal",
  "date": "2023-06-25",
  "available_slots": [
    {
      "start": "09:00",
      "end": "10:00"
    },
    {
      "start": "10:00",
      "end": "11:00"
    },
    {
      "start": "13:00",
      "end": "14:00"
    },
    {
      "start": "16:00",
      "end": "17:00"
    }
  ],
  "booked_slots": [
    {
      "start": "11:00",
      "end": "13:00",
      "booking_id": "book_123"
    },
    {
      "start": "14:00",
      "end": "16:00",
      "booking_id": "book_456"
    }
  ]
}`}
          />

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Database className="h-5 w-5 text-blue-500" />
            Crear una reserva
          </h3>

          <CodeBlock
            code={`// Solicitud para crear una reserva
POST /api/v1/bookings HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "resource_id": "room_101",
  "date": "2023-06-25",
  "start_time": "10:00",
  "end_time": "11:00",
  "title": "Reunión de planificación",
  "description": "Planificación del sprint Q3",
  "attendees": [
    "user_123",
    "user_456",
    "user_789"
  ]
}

// Respuesta
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "book_789",
  "resource_id": "room_101",
  "resource_name": "Sala de reuniones principal",
  "date": "2023-06-25",
  "start_time": "10:00",
  "end_time": "11:00",
  "title": "Reunión de planificación",
  "description": "Planificación del sprint Q3",
  "status": "confirmed",
  "created_by": "user_123",
  "created_at": "2023-06-20T15:30:45Z",
  "attendees": [
    {
      "id": "user_123",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "status": "confirmed"
    },
    {
      "id": "user_456",
      "name": "María López",
      "email": "maria@example.com",
      "status": "pending"
    },
    {
      "id": "user_789",
      "name": "Carlos Gómez",
      "email": "carlos@example.com",
      "status": "pending"
    }
  ],
  "_links": {
    "self": { "href": "/api/v1/bookings/book_789" },
    "resource": { "href": "/api/v1/resources/room_101" },
    "cancel": { "href": "/api/v1/bookings/book_789/cancel" }
  }
}`}
            language="http"
          />

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-indigo-500" />
            Consideraciones de diseño comunes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Consistencia</h4>
                <ul className="list-disc pl-4 space-y-1 text-slate-700">
                  <li>Usar convenciones de nomenclatura consistentes</li>
                  <li>Estructurar respuestas de manera uniforme</li>
                  <li>Aplicar los mismos patrones de paginación y filtrado</li>
                  <li>Mantener coherencia en los códigos de error</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Rendimiento</h4>
                <ul className="list-disc pl-4 space-y-1 text-slate-700">
                  <li>Implementar caché para recursos frecuentes</li>
                  <li>Optimizar consultas de base de datos</li>
                  <li>Permitir selección de campos (fields=id,name)</li>
                  <li>Paginar colecciones grandes</li>
                  <li>Comprimir respuestas (gzip)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Escalabilidad</h4>
                <ul className="list-disc pl-4 space-y-1 text-slate-700">
                  <li>Diseñar APIs sin estado (stateless)</li>
                  <li>Implementar rate limiting</li>
                  <li>Versionar APIs para cambios importantes</li>
                  <li>Usar CDNs para contenido estático</li>
                  <li>Considerar arquitecturas microservicios</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Codepen className="h-5 w-5 text-indigo-500" />
            Herramientas y recursos
          </h2>

          <div className="space-y-4 mb-8">
            <div>
              <h4 className="font-semibold">Herramientas para desarrollo de APIs</h4>
              <ul className="list-disc pl-6 space-y-1 text-slate-700">
                <li>Postman - Pruebas y documentación de API</li>
                <li>Insomnia - Cliente REST alternativo</li>
                <li>Swagger/OpenAPI - Especificación y documentación</li>
                <li>JSON Server - Mock de API REST para desarrollo</li>
                <li>HTTPie - Cliente HTTP para línea de comandos</li>
                <li>Pactum - Framework de pruebas de contrato</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Frameworks para implementación de APIs REST</h4>
              <ul className="list-disc pl-6 space-y-1 text-slate-700">
                <li>Express.js (Node.js)</li>
                <li>FastAPI (Python)</li>
                <li>Spring Boot (Java)</li>
                <li>ASP.NET Core (C#)</li>
                <li>Laravel (PHP)</li>
                <li>Ruby on Rails (Ruby)</li>
                <li>Django REST Framework (Python)</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-2">Conclusión</h3>
            <p className="text-slate-700">
              Los ejemplos anteriores muestran diferentes formas de implementar APIs REST para escenarios comunes.
              Al diseñar su propia API, considere las necesidades específicas de su aplicación, pero mantenga
              presentes los principios fundamentales REST y las mejores prácticas para asegurar que su API sea
              intuitiva, consistente, escalable y fácil de mantener.
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-100 mb-8">
            <h4 className="text-indigo-900 font-medium">💡 Consejo</h4>
            <p className="text-indigo-800">
              Invierta tiempo en el diseño inicial de su API. Un buen diseño desde el principio ahorrará
              tiempo y recursos en el futuro, evitando cambios incompatibles que podrían romper integraciones
              existentes. Considere crear un prototipo o mock de su API y probarlo con casos de uso reales antes
              de la implementación completa.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Examples;
