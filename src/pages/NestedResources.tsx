import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";

const NestedResources = () => {
  return (
    <PageLayout>
      <PageContent
        title="Recursos Anidados"
        description="Técnicas para representar y trabajar con recursos anidados en APIs REST."
        path={["Relaciones", "Recursos Anidados"]}
      >
        <p>
          Los recursos anidados representan relaciones jerárquicas entre entidades en una API REST.
          Permiten expresar naturalmente relaciones de pertenencia, composición o asociación, facilitando
          la navegación y manipulación de datos relacionados.
        </p>

        <h2>Fundamentos de Recursos Anidados</h2>

        <h3>¿Qué Son los Recursos Anidados?</h3>

        <p>
          Los recursos anidados son una forma de modelar relaciones jerárquicas en APIs REST, donde un recurso
          está contenido dentro de otro o depende directamente de otro recurso. Esta estructura refleja relaciones
          naturales entre entidades del dominio.
        </p>

        <p>
          Ejemplos comunes de recursos anidados incluyen:
        </p>

        <ul>
          <li>Comentarios en un artículo</li>
          <li>Mensajes en una conversación</li>
          <li>Fotos en un álbum</li>
          <li>Productos en un catálogo</li>
          <li>Elementos en un pedido</li>
        </ul>

        <h3>Cuándo Utilizar Recursos Anidados</h3>

        <p>
          Los recursos anidados son especialmente apropiados cuando:
        </p>

        <ul>
          <li><strong>Existe una relación fuerte de pertenencia:</strong> Un recurso no puede existir sin su recurso padre</li>
          <li><strong>El acceso siempre o frecuentemente se realiza en contexto del padre:</strong> Raramente se accede al recurso de forma independiente</li>
          <li><strong>La seguridad o permisos se heredan del recurso padre:</strong> Los permisos para acceder al recurso hijo dependen del padre</li>
          <li><strong>Se requiere navegación natural por la API:</strong> La anidación facilita el descubrimiento de recursos relacionados</li>
        </ul>

        <h2>Patrones de Implementación</h2>

        <h3>1. Recursos Anidados en URLs</h3>

        <p>
          El enfoque más común es reflejar la jerarquía directamente en las URLs:
        </p>

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

        <p>
          Las operaciones CRUD sobre recursos anidados siguen un patrón consistente:
        </p>

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

        <h3>2. Múltiples Niveles de Anidación</h3>

        <p>
          Las APIs pueden soportar múltiples niveles de anidación para representar jerarquías más complejas:
        </p>

        <CodeBlock
          code={`# Respuestas a un comentario específico
GET /posts/{post_id}/comments/{comment_id}/replies

# Reacciones a una respuesta específica
GET /posts/{post_id}/comments/{comment_id}/replies/{reply_id}/reactions`}
          language="http"
        />

        <p>
          Sin embargo, es recomendable limitar la profundidad de anidación a 2-3 niveles como máximo para mantener
          las URLs manejables y evitar problemas de rendimiento.
        </p>

        <h3>3. Recursos Accesibles por Múltiples Rutas</h3>

        <p>
          En algunos casos, puede ser útil permitir acceder al mismo recurso por diferentes rutas jerárquicas:
        </p>

        <CodeBlock
          code={`# Acceso a comentarios a través de su post padre
GET /posts/{post_id}/comments/{comment_id}

# Acceso directo al comentario (ruta alternativa)
GET /comments/{comment_id}`}
          language="http"
        />

        <p>
          Este enfoque proporciona flexibilidad, pero requiere coherencia en las respuestas y permisos.
        </p>

        <h2>Mejores Prácticas</h2>

        <h3>Consistencia en las Representaciones</h3>

        <p>
          Los recursos deben tener la misma representación independientemente de cómo se acceda a ellos:
        </p>

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

        <h3>Enlaces HATEOAS para Navegación</h3>

        <p>
          Siguiendo los principios REST, es recomendable incluir enlaces que faciliten la navegación entre recursos relacionados:
        </p>

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

        <h3>Limitación de Profundidad</h3>

        <p>
          Evita crear jerarquías excesivamente profundas:
        </p>

        <ul>
          <li><strong>Recomendable:</strong> Máximo 2-3 niveles de anidación</li>
          <li><strong>No recomendable:</strong> <code>/api/v1/organizations/123/departments/456/teams/789/projects/101/tasks/202/comments/303</code></li>
        </ul>

        <p>
          Para estructuras muy profundas, considera:
        </p>

        <ul>
          <li>Proporcionar endpoints alternativos más directos</li>
          <li>Usar parámetros de consulta para filtrar</li>
          <li>Implementar expansión de campos selectiva</li>
        </ul>

        <h3>Permisos y Seguridad</h3>

        <p>
          Los permisos deben verificarse tanto para el recurso hijo como para el padre:
        </p>

        <ul>
          <li>Verificar que el usuario tiene acceso al recurso padre</li>
          <li>Verificar que el usuario tiene acceso al recurso hijo</li>
          <li>Confirmar que el recurso hijo realmente pertenece al padre especificado</li>
        </ul>

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

        <h2>Casos de Uso y Patrones</h2>

        <h3>Colecciones de Subrecursos</h3>

        <p>
          Para manejar subrecursos como colecciones dentro de un recurso padre:
        </p>

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

        <h3>Acciones en Recursos Anidados</h3>

        <p>
          Para operaciones específicas que no encajan en el modelo CRUD tradicional:
        </p>

        <CodeBlock
          code={`# Marcar como favorito un comentario específico
POST /posts/{post_id}/comments/{comment_id}/actions/favorite

# Reportar contenido inapropiado
POST /posts/{post_id}/comments/{comment_id}/actions/report

# Aprobar un comentario pendiente de moderación
POST /posts/{post_id}/comments/{comment_id}/actions/approve`}
          language="http"
        />

        <h3>Filtrado de Recursos Anidados</h3>

        <p>
          Combina recursos anidados con filtrado para consultas más específicas:
        </p>

        <CodeBlock
          code={`# Obtener comentarios recientes de un post
GET /posts/{post_id}/comments?created_after=2023-05-01&sort=newest

# Filtrar por autor
GET /posts/{post_id}/comments?author=usuario_abc

# Buscar texto específico en comentarios
GET /posts/{post_id}/comments?search=interesante`}
          language="http"
        />

        <h3>Manejar Colecciones Grandes</h3>

        <p>
          Para recursos anidados con muchos elementos, implementa paginación:
        </p>

        <CodeBlock
          code={`# Paginación de comentarios
GET /posts/{post_id}/comments?page=2&per_page=25

# Respuesta
{
  "data": [...],
  "pagination": {
    "total_items": 142,
    "total_pages": 6,
    "current_page": 2,
    "per_page": 25,
    "next_page": 3,
    "prev_page": 1
  }
}`}
          language="http"
        />

        <h2>Consideraciones de Diseño</h2>

        <h3>1. Relaciones vs. Anidación</h3>

        <p>
          No todas las relaciones deben modelarse como recursos anidados:
        </p>

        <ul>
          <li><strong>Usar recursos anidados para:</strong> Relaciones de pertenencia fuerte, acceso contextual</li>
          <li><strong>Usar alternativas para:</strong> Relaciones muchos a muchos, asociaciones débiles, grafos complejos</li>
        </ul>

        <h3>2. Desnormalización vs. Navegación</h3>

        <p>
          Equilibrio entre incluir datos anidados y proporcionar enlaces para navegación:
        </p>

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
  ],
  "comment_count": 8
}`}
          language="json"
        />

        <h3>3. Estrategias para APIs Escalables</h3>

        <p>
          Para APIs con muchos recursos y relaciones complejas:
        </p>

        <ul>
          <li><strong>Enfoque híbrido:</strong> Recursos anidados para relaciones primarias, endpoints planos para acceso directo</li>
          <li><strong>Expansión selectiva:</strong> Permitir incluir relaciones con parámetros como <code>?include=comments,author</code></li>
          <li><strong>Consultas por lotes:</strong> Implementar endpoints para recuperar múltiples recursos en una sola solicitud</li>
        </ul>

        <h2>Implementación en Diferentes Frameworks</h2>

        <h3>Express.js (Node.js)</h3>

        <CodeBlock
          code={`// Implementación de recursos anidados en Express.js
const express = require('express');
const router = express.Router();

// Rutas para posts
router.get('/posts', getAllPosts);
router.get('/posts/:postId', getPost);

// Rutas para comentarios como recursos anidados
router.get('/posts/:postId/comments', getPostComments);
router.post('/posts/:postId/comments', createPostComment);
router.get('/posts/:postId/comments/:commentId', getPostComment);
router.put('/posts/:postId/comments/:commentId', updatePostComment);
router.delete('/posts/:postId/comments/:commentId', deletePostComment);

// Ruta alternativa directa para comentarios
router.get('/comments/:commentId', getComment);

module.exports = router;`}
          language="javascript"
        />

        <h3>Django REST Framework (Python)</h3>

        <CodeBlock
          code={`# views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    @action(detail=True)
    def comments(self, request, pk=None):
        post = self.get_object()
        comments = post.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
        
    @comments.mapping.post
    def create_comment(self, request, pk=None):
        post = self.get_object()
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(post=post)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
]`}
          language="python"
        />

        <h2>Ejemplos de APIs Populares</h2>

        <h3>GitHub API</h3>

        <p>
          GitHub utiliza recursos anidados para expresar jerarquías naturales:
        </p>

        <CodeBlock
          code={`# Comentarios en un issue específico
GET /repos/{owner}/{repo}/issues/{issue_number}/comments

# Commits en un repositorio específico
GET /repos/{owner}/{repo}/commits

# Archivos en una ruta específica de un repositorio
GET /repos/{owner}/{repo}/contents/{path}`}
          language="http"
        />

        <h3>Stripe API</h3>

        <p>
          Stripe combina recursos anidados con acceso directo:
        </p>

        <CodeBlock
          code={`# Listar todos los cargos de un cliente
GET /v1/customers/{customer_id}/charges

# Acceder directamente a un cargo específico
GET /v1/charges/{charge_id}

# Listar elementos de una suscripción
GET /v1/subscriptions/{subscription_id}/items`}
          language="http"
        />

        <blockquote>
          "Los recursos anidados son una herramienta poderosa para expresar relaciones naturales entre
          entidades en una API REST. Cuando se implementan correctamente, hacen que tu API sea más
          intuitiva y navegable, facilitando a los desarrolladores el descubrimiento y uso de
          los datos relacionados. La clave está en encontrar el equilibrio adecuado entre profundidad
          de anidación, flexibilidad y rendimiento."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default NestedResources;
