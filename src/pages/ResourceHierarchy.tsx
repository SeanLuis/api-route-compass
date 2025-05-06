
import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";

const ResourceHierarchy = () => {
  return (
    <PageLayout>
      <PageContent
        title="Jerarquía de Recursos"
        description="Modelado de relaciones entre recursos y organización jerárquica."
        path={["Rutas y Recursos", "Jerarquía de Recursos"]}
      >
        <p>
          La jerarquía de recursos es fundamental en el diseño de APIs REST y define cómo los diferentes 
          recursos se relacionan entre sí. Una jerarquía bien diseñada refleja el modelo de dominio 
          de la aplicación y facilita la navegación intuitiva entre recursos relacionados.
        </p>

        <h2>Tipos de Relaciones entre Recursos</h2>
        
        <h3>1. Relaciones de Pertenencia</h3>
        <p>
          La relación de pertenencia indica que un recurso es propiedad de otro recurso o existe 
          exclusivamente dentro del contexto de otro recurso.
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/articles/{article_id}/comments"
          description="Obtiene los comentarios que pertenecen a un artículo específico."
          responseExample={`{
  "data": [
    {
      "id": "comment_123",
      "article_id": "article_456",
      "author": "usuario_789",
      "content": "Excelente artículo, muy informativo.",
      "created_at": "2023-05-10T15:30:00Z"
    },
    {
      "id": "comment_124",
      "article_id": "article_456",
      "author": "usuario_101",
      "content": "Me gustaría ver más contenido similar.",
      "created_at": "2023-05-11T09:15:00Z"
    }
  ],
  "pagination": {
    "total": 24,
    "page": 1,
    "per_page": 10
  }
}`}
        />

        <h3>2. Relaciones de Asociación</h3>
        <p>
          Las relaciones de asociación indican que dos recursos están conectados, pero pueden existir 
          independientemente entre sí.
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/users/{user_id}/following"
          description="Obtiene los usuarios que un usuario específico está siguiendo."
          responseExample={`{
  "data": [
    {
      "id": "user_345",
      "username": "maria_design",
      "name": "María Rodríguez",
      "followed_at": "2023-03-15T10:20:00Z"
    },
    {
      "id": "user_567",
      "username": "carlos_dev",
      "name": "Carlos Gómez",
      "followed_at": "2023-04-02T14:45:00Z"
    }
  ],
  "pagination": {
    "total": 125,
    "page": 1,
    "per_page": 10,
    "next": "/api/v1/users/user_123/following?page=2"
  }
}`}
        />

        <h2>Estrategias para Modelar Jerarquías</h2>

        <h3>Anidamiento Directo</h3>
        <p>
          El anidamiento directo es útil para relaciones claras de pertenencia donde un recurso 
          no tiene sentido fuera del contexto de su padre.
        </p>

        <CodeBlock
          code={`# Anidamiento directo
/organizations/{org_id}/teams/{team_id}
/albums/{album_id}/photos/{photo_id}
/courses/{course_id}/lessons/{lesson_id}`}
          language="http"
        />

        <h3>Referencias Planas</h3>
        <p>
          Para recursos que pueden existir independientemente pero están relacionados, es mejor 
          usar referencias planas.
        </p>

        <CodeBlock
          code={`# Referencias planas
/users/{user_id}
/products/{product_id}
/orders/{order_id}  # Contiene user_id y productos como referencias

# En lugar de
/users/{user_id}/orders/{order_id}/products/{product_id}`}
          language="http"
        />

        <h3>Relaciones Muchos a Muchos</h3>
        <p>
          Para relaciones muchos a muchos, considera usar recursos de relación explícitos o 
          endpoints de asociación.
        </p>

        <CodeBlock
          code={`# Recursos de relación explícitos
/products/{product_id}/tags
/tags/{tag_id}/products

# Endpoint de asociación
POST /products/{product_id}/tags/{tag_id}
DELETE /products/{product_id}/tags/{tag_id}`}
          language="http"
        />

        <h2>Manejo de Recursos Complejos</h2>

        <h3>Límites de Profundidad</h3>
        <p>
          Para evitar URIs excesivamente largos y complejos, establece un límite de profundidad 
          en la jerarquía de recursos. Generalmente, es recomendable no exceder 3-4 niveles.
        </p>

        <div className="grid grid-cols-1 gap-4 my-6">
          <div>
            <h4 className="font-medium text-sm mb-2 text-amber-500">Complejo pero Aceptable ⚠️</h4>
            <CodeBlock
              code={`/organizations/{org_id}/projects/{project_id}/tasks/{task_id}`}
              language="http"
            />
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2 text-red-500">Demasiado Complejo ❌</h4>
            <CodeBlock
              code={`/organizations/{org_id}/departments/{dept_id}/projects/{project_id}/milestones/{milestone_id}/tasks/{task_id}/subtasks/{subtask_id}`}
              language="http"
            />
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2 text-green-500">Alternativa Simplificada ✓</h4>
            <CodeBlock
              code={`# Acceder a subtareas directamente
/subtasks/{subtask_id}

# Con filtros para contexto
/subtasks?task_id={task_id}&milestone_id={milestone_id}

# O con un enfoque intermedio
/tasks/{task_id}/subtasks/{subtask_id}`}
              language="http"
            />
          </div>
        </div>

        <h3>Recursos Agregados</h3>
        <p>
          En algunos casos, proporcionar recursos agregados puede simplificar la API y reducir 
          el número de solicitudes necesarias.
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/dashboards/user/{user_id}"
          description="Obtiene datos agregados para el panel de control del usuario."
          responseExample={`{
  "user": {
    "id": "user_123",
    "name": "Juan Pérez",
    "role": "premium"
  },
  "statistics": {
    "orders_count": 27,
    "total_spent": 1245.75,
    "average_order_value": 46.14
  },
  "recent_orders": [
    {
      "id": "order_789",
      "date": "2023-06-01T10:30:00Z",
      "status": "delivered",
      "total": 125.99
    },
    {
      "id": "order_790",
      "date": "2023-06-05T14:45:00Z",
      "status": "processing",
      "total": 89.50
    }
  ],
  "recommendations": [
    {
      "id": "prod_456",
      "name": "Auriculares Premium",
      "price": 129.99
    },
    {
      "id": "prod_789",
      "name": "Smartwatch Series X",
      "price": 199.99
    }
  ]
}`}
        />

        <h2>Navegación entre Recursos Relacionados</h2>
        <p>
          Implementar HATEOAS (Hypermedia as the Engine of Application State) permite a los clientes 
          descubrir dinámicamente las relaciones entre recursos y las acciones disponibles.
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/orders/order_123"
          description="Obtiene una orden con hipervínculos a recursos relacionados."
          responseExample={`{
  "id": "order_123",
  "customer_id": "cust_456",
  "status": "shipped",
  "total": 129.99,
  "created_at": "2023-06-02T09:30:00Z",
  "_links": {
    "self": {
      "href": "/api/v1/orders/order_123"
    },
    "customer": {
      "href": "/api/v1/customers/cust_456"
    },
    "items": {
      "href": "/api/v1/orders/order_123/items"
    },
    "shipment": {
      "href": "/api/v1/shipments/ship_789"
    },
    "cancel": {
      "href": "/api/v1/orders/order_123/actions/cancel",
      "method": "POST"
    }
  }
}`}
        />

        <blockquote>
          "Una buena jerarquía de recursos no solo refleja la estructura lógica del modelo de dominio, 
          sino que también facilita la evolución de la API a medida que el negocio crece y cambia."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default ResourceHierarchy;
