import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";

const ResourceHierarchy = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Jerarquía de Recursos" 
        description="Cómo estructurar recursos y sus relaciones en APIs REST."
        path={["Rutas y Recursos", "Jerarquía de Recursos"]}
      >
        <p>
          Una API REST bien diseñada modela sus recursos de manera que refleje las relaciones naturales entre 
          ellos. La jerarquía de recursos organiza estas relaciones de forma intuitiva, facilitando la navegación 
          y el descubrimiento de tu API.
        </p>

        <h2>Principios de Jerarquía de Recursos</h2>

        <h3>Modelado de Entidades</h3>
        <p>
          Los recursos en una API REST generalmente representan entidades del dominio de negocio. Al diseñar 
          la jerarquía, identifica primero las entidades principales y sus relaciones:
        </p>

        <ul>
          <li><strong>Recursos principales:</strong> Entidades independientes como usuarios, productos, pedidos</li>
          <li><strong>Subrecursos:</strong> Entidades que existen dentro del contexto de un recurso principal</li>
          <li><strong>Recursos de relación:</strong> Representan conexiones entre entidades principales</li>
        </ul>

        <h3>Niveles de Anidamiento</h3>
        <p>
          Las rutas de la API deberían reflejar la relación de padre-hijo entre recursos. Sin embargo, es 
          importante limitar la profundidad de anidamiento para evitar URIs excesivamente complejos.
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
              code={`/tasks/{task_id}?project={project_id}&organization={org_id}`}
              language="http"
            />
          </div>
        </div>

        <h2>Patrones de Jerarquía</h2>

        <h3>1. Recursos Anidados</h3>
        <p>
          Este patrón representa relaciones jerárquicas directas entre recursos, donde un recurso 
          pertenece a otro o existe dentro del contexto de otro.
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/users/{user_id}/addresses"
          description="Recupera todas las direcciones de un usuario específico."
          responseExample={`{
  "items": [
    {
      "id": "addr_123",
      "type": "shipping",
      "street": "Calle Principal 123",
      "city": "Madrid",
      "postal_code": "28001",
      "is_default": true
    },
    {
      "id": "addr_124",
      "type": "billing",
      "street": "Avenida Secundaria 456",
      "city": "Madrid",
      "postal_code": "28002",
      "is_default": false
    }
  ],
  "total": 2
}`}
        />

        <EndpointExample
          method="POST"
          path="/api/v1/users/{user_id}/addresses"
          description="Crea una nueva dirección para un usuario específico."
          requestExample={`{
  "type": "shipping",
  "street": "Calle Nueva 789",
  "city": "Barcelona",
  "postal_code": "08001",
  "is_default": false
}`}
          responseExample={`{
  "id": "addr_125",
  "type": "shipping",
  "street": "Calle Nueva 789",
  "city": "Barcelona",
  "postal_code": "08001",
  "is_default": false,
  "created_at": "2023-06-10T14:30:00Z"
}`}
        />

        <h3>2. Recursos de Relación</h3>
        <p>
          Este patrón modela las relaciones muchos-a-muchos entre recursos.
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/users/{user_id}/favorites"
          description="Recupera los productos favoritos de un usuario."
          responseExample={`{
  "items": [
    {
      "id": "prod_123",
      "name": "Auriculares Premium",
      "price": 129.99,
      "added_to_favorites_at": "2023-05-15T09:30:00Z"
    },
    {
      "id": "prod_456",
      "name": "Smartwatch Ultra",
      "price": 299.99,
      "added_to_favorites_at": "2023-05-20T14:45:00Z"
    }
  ],
  "total": 2
}`}
        />

        <EndpointExample
          method="POST"
          path="/api/v1/users/{user_id}/favorites"
          description="Añade un producto a los favoritos del usuario."
          requestExample={`{
  "product_id": "prod_789"
}`}
          responseExample={`{
  "id": "prod_789",
  "name": "Teclado Mecánico",
  "price": 89.99,
  "added_to_favorites_at": "2023-06-10T15:00:00Z"
}`}
        />

        <h3>3. Recursos Independientes con Referencias</h3>
        <p>
          Este patrón es útil cuando los recursos pueden existir independientemente pero 
          necesitan estar relacionados entre sí.
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/products/{product_id}/related"
          description="Recupera productos relacionados con un producto específico."
          responseExample={`{
  "items": [
    {
      "id": "prod_456",
      "name": "Soporte para Auriculares",
      "price": 19.99,
      "relation_type": "accessory"
    },
    {
      "id": "prod_789",
      "name": "Auriculares Bluetooth Sport",
      "price": 79.99,
      "relation_type": "alternative"
    }
  ],
  "total": 2
}`}
        />

        <h2>Estrategias de Diseño</h2>

        <h3>1. Enfoque "Primero los Recursos"</h3>
        <p>
          Comienza identificando los recursos principales y modelo sus relaciones antes de definir endpoints:
        </p>

        <ol>
          <li>Identifica entidades principales del dominio (usuarios, productos, pedidos)</li>
          <li>Establece las relaciones entre estas entidades</li>
          <li>Determina qué recursos son independientes y cuáles son anidados</li>
          <li>Diseña rutas que reflejen estas relaciones</li>
        </ol>

        <h3>2. Balanceando Profundidad y Navegabilidad</h3>
        <p>
          Es importante encontrar un equilibrio entre la representación fiel de relaciones 
          y la complejidad de las rutas:
        </p>

        <ul>
          <li><strong>Limitar a 2-3 niveles de anidamiento</strong> para mantener las URL manejables</li>
          <li><strong>Considerar rutas alternativas</strong> para recursos profundamente anidados</li>
          <li><strong>Usar query parameters</strong> para filtrar en vez de crear niveles adicionales</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md my-6">
          <h4 className="font-medium mb-2">Regla práctica: La regla "2-3-N"</h4>
          <p className="text-sm">
            <strong>2 niveles:</strong> Ideal para la mayoría de los casos<br />
            <strong>3 niveles:</strong> Aceptable cuando sea necesario<br />
            <strong>N niveles:</strong> Considerar enfoques alternativos (filtros, endpoints dedicados)
          </p>
        </div>

        <h3>3. Minimizar el Acoplamiento</h3>
        <p>
          Evita crear jerarquías que acoplen demasiado los recursos entre sí:
        </p>
    
        <CodeBlock
          code={`# Demasiado acoplado ❌
/departments/{dept_id}/employees/{employee_id}/projects/{project_id}

# Más flexible ✓
/employees/{employee_id}/projects
/projects?employee_id={employee_id}&department_id={dept_id}`}
          language="http"
        />

        <h2>Casos de Estudio</h2>

        <h3>Sistema de E-commerce</h3>
        <p>
          Un ejemplo de jerarquía de recursos para un sistema de comercio electrónico:
        </p>

        <CodeBlock
          code={`# Recursos Principales
/products
/products/{product_id}
/categories
/categories/{category_id}
/users
/users/{user_id}
/orders
/orders/{order_id}

# Subrecursos
/products/{product_id}/variants
/products/{product_id}/reviews
/users/{user_id}/addresses
/orders/{order_id}/items

# Relaciones
/products/{product_id}/related
/users/{user_id}/favorites
/categories/{category_id}/products`}
          language="http"
        />

        <h3>Sistema de Gestión de Proyectos</h3>
        <p>
          Jerarquía de recursos para un sistema de gestión de proyectos:
        </p>

        <CodeBlock
          code={`# Recursos Principales
/organizations
/organizations/{org_id}
/projects
/projects/{project_id}
/users
/users/{user_id}

# Subrecursos y Relaciones
/organizations/{org_id}/projects
/projects/{project_id}/tasks
/projects/{project_id}/members
/users/{user_id}/assignments

# Nivel más detallado (uso con precaución)
/projects/{project_id}/tasks/{task_id}/comments
/projects/{project_id}/tasks/{task_id}/attachments

# Alternativa para recursos muy anidados
/tasks/{task_id}?project_id={project_id}
/comments?task_id={task_id}
/attachments?task_id={task_id}`}
          language="http"
        />

        <h2>Consideraciones Avanzadas</h2>

        <h3>Navegación Hypermedia (HATEOAS)</h3>
        <p>
          Una API verdaderamente RESTful proporciona enlaces para navegar entre recursos relacionados:
        </p>

        <CodeBlock
          code={`{
  "id": "order_123",
  "status": "shipped",
  "total": 145.98,
  "_links": {
    "self": { "href": "/api/v1/orders/order_123" },
    "customer": { "href": "/api/v1/users/user_456" },
    "items": { "href": "/api/v1/orders/order_123/items" },
    "payment": { "href": "/api/v1/orders/order_123/payment" }
  }
}`}
          language="json"
        />

        <h3>Representaciones Parciales vs Expansión</h3>
        <p>
          Para recursos con relaciones complejas, considera ofrecer:
        </p>

        <ul>
          <li><strong>Representaciones parciales:</strong> Solo incluir IDs o referencias a recursos relacionados</li>
          <li><strong>Expansión:</strong> Permitir incluir recursos relacionados completos bajo demanda</li>
        </ul>

        <CodeBlock
          code={`# Solicitud de expansión
GET /api/v1/orders/order_123?expand=customer,items.product

# Respuesta con expansión
{
  "id": "order_123",
  "status": "shipped",
  "customer": {
    "id": "user_456",
    "name": "Ana García",
    "email": "ana@example.com"
  },
  "items": [
    {
      "quantity": 1,
      "product": {
        "id": "prod_789",
        "name": "Auriculares Premium",
        "price": 129.99
      }
    },
    // Más productos...
  ]
}`}
          language="http"
        />

        <blockquote>
          "Una jerarquía de recursos bien diseñada proporciona un equilibrio entre la expresividad de las relaciones y
          la simplicidad de las rutas. La mejor API es la que resulta intuitiva para los desarrolladores que la consumen."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default ResourceHierarchy;
