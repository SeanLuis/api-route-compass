import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Link2, Code, Database, CheckCircle, XCircle, Boxes, Network, Layers, Info, ListTreeIcon } from "lucide-react";

const NestedResources = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/field-expansion" className="text-sm text-slate-500 hover:text-slate-700">Relaciones</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Recursos Anidados</h1>
          <p className="text-lg text-slate-700">
            Técnicas para representar y trabajar con recursos anidados en APIs REST.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <p>
            Los recursos anidados representan relaciones jerárquicas entre entidades en una API REST.
            Permiten expresar naturalmente relaciones de pertenencia, composición o asociación, facilitando
            la navegación y manipulación de datos relacionados.
          </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-500" />
            Fundamentos de Recursos Anidados
          </h2>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Info className="h-5 w-5 text-blue-500" />
            ¿Qué Son los Recursos Anidados?
          </h3>

          <p>
            Los recursos anidados son una forma de modelar relaciones jerárquicas en APIs REST, donde un recurso
            está contenido dentro de otro o depende directamente de otro recurso. Esta estructura refleja relaciones
            naturales entre entidades del dominio.
          </p>

          <p>
            Ejemplos comunes de recursos anidados incluyen:
          </p>

          <ul className="ml-6 space-y-1 list-disc text-slate-700">
            <li>Comentarios en un artículo</li>
            <li>Mensajes en una conversación</li>
            <li>Fotos en un álbum</li>
            <li>Productos en un catálogo</li>
            <li>Elementos en un pedido</li>
          </ul>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <CheckCircle className="h-5 w-5 text-blue-500" />
            Cuándo Utilizar Recursos Anidados
          </h3>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-100">
            <p className="text-slate-800">
              Los recursos anidados son especialmente apropiados cuando:
            </p>
            <ul className="mt-3 space-y-1 ml-6 list-disc text-slate-700">
              <li><strong>Existe una relación fuerte de pertenencia:</strong> Un recurso no puede existir sin su recurso padre</li>
              <li><strong>El acceso siempre o frecuentemente se realiza en contexto del padre:</strong> Raramente se accede al recurso de forma independiente</li>
              <li><strong>La seguridad o permisos se heredan del recurso padre:</strong> Los permisos para acceder al recurso hijo dependen del padre</li>
              <li><strong>Se requiere navegación natural por la API:</strong> La anidación facilita el descubrimiento de recursos relacionados</li>
            </ul>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <ListTreeIcon className="h-5 w-5 text-indigo-500" />
            Patrones de Implementación
          </h2>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Link2 className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">1. Recursos Anidados en URLs</h3>
                </div>
                <p className="text-slate-700">
                  El enfoque más común es reflejar la jerarquía directamente en las URLs.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                  <EndpointExample
                    method="GET"
                    path="/api/v1/posts/123/comments"
                    description="Recupera todos los comentarios del post con ID 123."
                    responseExample={`{
  "data": [
    {
      "id": "comment_456",
      "post_id": "123",
      "author": "usuario_abc",
      "content": "Excelente artículo, muy bien explicado.",
      "created_at": "2023-05-20T14:30:00Z"
    },
    {
      "id": "comment_457",
      "post_id": "123",
      "author": "usuario_xyz",
      "content": "Me gustaría ver más ejemplos sobre este tema.",
      "created_at": "2023-05-20T15:45:00Z"
    }
  ],
  "pagination": {
    "total": 8,
    "page": 1,
    "per_page": 10
  }
}`}
                  />
                </div>

                <p>
                  Las operaciones CRUD sobre recursos anidados siguen un patrón consistente:
                </p>

                <div className="bg-slate-900 rounded-md overflow-hidden mt-4">
                  <CodeBlock
                    code={`# Listar todos los comentarios de un post
GET /posts/{post_id}/comments

# Obtener un comentario específico de un post
GET /posts/{post_id}/comments/{comment_id}

# Crear un nuevo comentario en un post
POST /posts/{post_id}/comments

# Actualizar un comentario específico
PUT /posts/{post_id}/comments/{comment_id}

# Eliminar un comentario específico
DELETE /posts/{post_id}/comments/{comment_id}`}
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
                  <h3 className="text-lg font-semibold">2. Múltiples Niveles de Anidación</h3>
                </div>
                <p className="text-slate-700">
                  Las APIs pueden soportar múltiples niveles de anidación para representar jerarquías más complejas.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`# Respuestas a un comentario específico
GET /posts/{post_id}/comments/{comment_id}/replies

# Reacciones a una respuesta específica
GET /posts/{post_id}/comments/{comment_id}/replies/{reply_id}/reactions`}
                    language="http"
                  />
                </div>
                
                <p className="mt-4 text-slate-700">
                  Sin embargo, es recomendable limitar la profundidad de anidación a 2-3 niveles como máximo para mantener
                  las URLs manejables y evitar problemas de rendimiento.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Boxes className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">3. Recursos Accesibles por Múltiples Rutas</h3>
                </div>
                <p className="text-slate-700">
                  En algunos casos, puede ser útil permitir acceder al mismo recurso por diferentes rutas jerárquicas.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`# Acceso a comentarios a través de su post padre
GET /posts/{post_id}/comments/{comment_id}

# Acceso directo al comentario (ruta alternativa)
GET /comments/{comment_id}`}
                    language="http"
                  />
                </div>
                
                <p className="mt-4 text-slate-700">
                  Este enfoque proporciona flexibilidad, pero requiere coherencia en las respuestas y permisos.
                </p>
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
                <h3 className="font-semibold mb-2">Consistencia en las Representaciones</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Los recursos deben tener la misma representación independientemente de cómo se acceda a ellos:
                </p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`// Respuesta de /posts/123/comments/456
{
  "id": "456",
  "post_id": "123",
  "content": "Gran artículo!",
  "author": "usuario_abc",
  "created_at": "2023-06-10T09:00:00Z"
}

// Respuesta de /comments/456 (debe ser idéntica)
{
  "id": "456",
  "post_id": "123",
  "content": "Gran artículo!",
  "author": "usuario_abc",
  "created_at": "2023-06-10T09:00:00Z"
}`}
                    language="json"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Enlaces HATEOAS para Navegación</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Siguiendo los principios REST, es recomendable incluir enlaces que faciliten la navegación:
                </p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`{
  "id": "comment_456",
  "content": "Excelente artículo!",
  "created_at": "2023-05-20T14:30:00Z",
  "_links": {
    "self": { "href": "/api/v1/comments/456" },
    "post": { "href": "/api/v1/posts/123" },
    "author": { "href": "/api/v1/users/abc" },
    "replies": { "href": "/api/v1/comments/456/replies" }
  }
}`}
                    language="json"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Limitación de Profundidad</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Evita crear jerarquías excesivamente profundas:
                </p>
                <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm">
                  <li><strong>Recomendable:</strong> Máximo 2-3 niveles de anidación</li>
                  <li><strong>No recomendable:</strong> <code>/api/v1/organizations/123/departments/456/teams/789/projects/101/tasks/202/comments/303</code></li>
                </ul>
                <div className="mt-3">
                  <p className="text-sm text-slate-600">Para estructuras muy profundas, considera:</p>
                  <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm mt-2">
                    <li>Proporcionar endpoints alternativos más directos</li>
                    <li>Usar parámetros de consulta para filtrar</li>
                    <li>Implementar expansión de campos selectiva</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Permisos y Seguridad</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Los permisos deben verificarse tanto para el recurso hijo como para el padre:
                </p>
                <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm">
                  <li>Verificar que el usuario tiene acceso al recurso padre</li>
                  <li>Verificar que el usuario tiene acceso al recurso hijo</li>
                  <li>Confirmar que el recurso hijo realmente pertenece al padre especificado</li>
                </ul>
                <div className="mt-3 bg-slate-100 p-3 rounded-md">
                  <CodeBlock
                    code={`// Implementación de seguridad (pseudocódigo)
app.get('/posts/:postId/comments/:commentId', (req, res) => {
  const { postId, commentId } = req.params;
  
  // 1. Verificar acceso al post
  if (!userCanAccessPost(req.user, postId)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  // 2. Obtener el comentario
  const comment = getComment(commentId);
  
  // 3. Verificar que el comentario pertenece al post
  if (!comment || comment.postId !== postId) {
    return res.status(404).json({ error: 'Comment not found in this post' });
  }
  
  // 4. Verificar acceso al comentario
  if (!userCanAccessComment(req.user, comment)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  // Devolver el comentario
  return res.json(comment);
});`}
                    language="javascript"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-500" />
            Casos de Uso y Patrones
          </h2>

          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Boxes className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Colecciones de Subrecursos</h3>
                </div>
                <p className="text-slate-700">
                  Para manejar subrecursos como colecciones dentro de un recurso padre.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <EndpointExample
                    method="GET"
                    path="/api/v1/users/123/orders"
                    description="Recupera todas las órdenes del usuario con ID 123."
                    responseExample={`{
  "data": [
    {
      "id": "order_789",
      "user_id": "123",
      "status": "delivered",
      "total": 89.97,
      "created_at": "2023-04-15T10:30:00Z"
    },
    {
      "id": "order_790",
      "user_id": "123",
      "status": "processing",
      "total": 129.99,
      "created_at": "2023-05-20T14:15:00Z"
    }
  ],
  "pagination": {
    "total": 7,
    "page": 1,
    "per_page": 10
  }
}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6 mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Acciones en Recursos Anidados</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Para operaciones específicas que no encajan en el modelo CRUD tradicional:
                </p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`# Marcar como favorito un comentario específico
POST /posts/{post_id}/comments/{comment_id}/actions/favorite

# Reportar contenido inapropiado
POST /posts/{post_id}/comments/{comment_id}/actions/report

# Aprobar un comentario pendiente de moderación
POST /posts/{post_id}/comments/{comment_id}/actions/approve`}
                    language="http"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Filtrado de Recursos Anidados</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Combina recursos anidados con filtrado para consultas más específicas:
                </p>
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`# Obtener comentarios recientes de un post
GET /posts/{post_id}/comments?created_after=2023-05-01&sort=newest

# Filtrar por autor
GET /posts/{post_id}/comments?author=usuario_abc

# Buscar texto específico en comentarios
GET /posts/{post_id}/comments?search=interesante`}
                    language="http"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Code className="h-5 w-5 text-indigo-500" />
            Consideraciones de Diseño
          </h2>

          <div className="space-y-6 mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">1. Relaciones vs. Anidación</h3>
                <p className="mb-3 text-sm text-slate-600">
                  No todas las relaciones deben modelarse como recursos anidados:
                </p>
                <ul className="space-y-1 ml-6 list-disc text-slate-600 text-sm">
                  <li><strong>Usar recursos anidados para:</strong> Relaciones de pertenencia fuerte, acceso contextual</li>
                  <li><strong>Usar alternativas para:</strong> Relaciones muchos a muchos, asociaciones débiles, grafos complejos</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">2. Desnormalización vs. Navegación</h3>
                <p className="mb-3 text-sm text-slate-600">
                  Equilibrio entre incluir datos anidados y proporcionar enlaces para navegación:
                </p>
                <div className="mt-3 bg-slate-100 p-3 rounded-md">
                  <CodeBlock
                    code={`// Enfoque 1: Referencias - Más normalizado
{
  "id": "post_123",
  "title": "Introducción a REST",
  "content": "...",
  "author_id": "user_456",
  "comment_count": 8,
  "_links": {
    "author": { "href": "/api/v1/users/456" },
    "comments": { "href": "/api/v1/posts/123/comments" }
  }
}

// Enfoque 2: Desnormalizado - Incluye datos anidados
{
  "id": "post_123",
  "title": "Introducción a REST",
  "content": "...",
  "author": {
    "id": "user_456",
    "name": "Ana García",
    "avatar": "https://example.com/avatars/ana.jpg"
  },
  "comments": [
    { "id": "comment_789", "content": "Gran artículo!", "author": "Luis" },
    { "id": "comment_790", "content": "Muy útil, gracias", "author": "Elena" }
  ]
}`}
                    language="json"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-500" />
            Ejemplos de APIs Populares
          </h2>

          <div className="space-y-6 mt-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 p-4">
                  <h3 className="font-medium">GitHub API</h3>
                </div>
                <div className="p-6">
                  <p className="mb-3">
                    GitHub utiliza recursos anidados para expresar jerarquías naturales:
                  </p>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code={`# Comentarios en un issue específico
GET /repos/{owner}/{repo}/issues/{issue_number}/comments

# Commits en un repositorio específico
GET /repos/{owner}/{repo}/commits

# Archivos en una ruta específica de un repositorio
GET /repos/{owner}/{repo}/contents/{path}`}
                      language="http"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 p-4">
                  <h3 className="font-medium">Stripe API</h3>
                </div>
                <div className="p-6">
                  <p className="mb-3">
                    Stripe combina recursos anidados con acceso directo:
                  </p>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code={`# Listar todos los cargos de un cliente
GET /v1/customers/{customer_id}/charges

# Acceder directamente a un cargo específico
GET /v1/charges/{charge_id}

# Listar elementos de una suscripción
GET /v1/subscriptions/{subscription_id}/items`}
                      language="http"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <blockquote className="border-l-4 border-indigo-300 pl-6 py-2 pr-4 mt-8 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-r-lg">
            <p className="italic text-indigo-900 font-medium">
              "Los recursos anidados son una herramienta poderosa para expresar relaciones naturales entre
              entidades en una API REST. Cuando se implementan correctamente, hacen que tu API sea más
              intuitiva y navegable, facilitando a los desarrolladores el descubrimiento y uso de
              los datos relacionados. La clave está en encontrar el equilibrio adecuado entre profundidad
              de anidación, flexibilidad y rendimiento."
            </p>
          </blockquote>
        </div>
      </div>
    </PageLayout>
  );
};

export default NestedResources;
