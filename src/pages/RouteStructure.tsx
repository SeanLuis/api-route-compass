
import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";

const RouteStructure = () => {
  return (
    <PageLayout>
      <PageContent
        title="Estructura de Rutas"
        description="Organización jerárquica y patrones de diseño para rutas de API."
        path={["Rutas y Recursos", "Estructura de Rutas"]}
      >
        <p>
          Diseñar una estructura de rutas coherente y predecible es fundamental para crear APIs REST 
          intuitivas y fáciles de usar. Una buena estructura de rutas refleja la organización lógica 
          de los recursos y facilita su descubrimiento y navegación.
        </p>

        <h2>Principios de Diseño para Rutas</h2>
        
        <h3>Jerarquía Lógica</h3>
        <p>
          Las rutas deben organizarse siguiendo una jerarquía lógica que refleje las relaciones 
          entre los recursos. Esta estructura permite a los desarrolladores entender intuitivamente 
          cómo navegar por la API.
        </p>
        
        <CodeBlock
          code={`# Estructura jerárquica de recursos
/organizations
/organizations/{org_id}
/organizations/{org_id}/members
/organizations/{org_id}/teams
/organizations/{org_id}/teams/{team_id}
/organizations/{org_id}/teams/{team_id}/members`}
          language="http"
        />
        
        <h3>Consistencia en Profundidad</h3>
        <p>
          Mantener una profundidad de ruta consistente ayuda a los usuarios a predecir cómo acceder 
          a recursos similares en diferentes partes de la API.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div>
            <h4 className="font-medium text-sm mb-2 text-red-500">Inconsistente ❌</h4>
            <CodeBlock
              code={`/users/{id}/profile
/products/{id}
/orders/for-user/{user_id}`}
              language="http"
            />
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2 text-green-500">Consistente ✓</h4>
            <CodeBlock
              code={`/users/{id}
/users/{id}/profile
/products/{id}
/users/{id}/orders`}
              language="http"
            />
          </div>
        </div>

        <h3>Patrones Comunes</h3>

        <h4>1. Recursos Principales (Entidades)</h4>
        <p>
          Los recursos principales representan las entidades centrales de tu sistema y generalmente 
          se nombran como sustantivos en plural.
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/products"
          description="Obtiene la lista de productos."
          responseExample={`{
  "data": [
    { "id": "prod-001", "name": "Smartphone", "price": 599.99 },
    { "id": "prod-002", "name": "Laptop", "price": 1299.99 }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "per_page": 10
  }
}`}
        />

        <h4>2. Sub-recursos</h4>
        <p>
          Los sub-recursos representan entidades que existen dentro del contexto de un recurso principal.
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/products/{product_id}/reviews"
          description="Obtiene las reseñas de un producto específico."
          responseExample={`{
  "data": [
    {
      "id": "rev-001",
      "product_id": "prod-001",
      "rating": 4.5,
      "comment": "Excelente producto, muy satisfecho con la compra.",
      "author": "usuario123",
      "date": "2023-05-15T14:30:00Z"
    },
    {
      "id": "rev-002",
      "product_id": "prod-001",
      "rating": 3.0,
      "comment": "Buen producto pero la batería podría durar más.",
      "author": "cliente456",
      "date": "2023-05-10T09:15:00Z"
    }
  ],
  "pagination": {
    "total": 24,
    "page": 1,
    "per_page": 10
  }
}`}
        />

        <h4>3. Acciones Específicas</h4>
        <p>
          Para operaciones que no se ajustan al modelo CRUD estándar, usa el patrón de acciones.
        </p>

        <EndpointExample
          method="POST"
          path="/api/v1/orders/{order_id}/actions/cancel"
          description="Cancela una orden específica."
          requestExample={`{
  "reason": "El cliente solicitó la cancelación",
  "refund": true
}`}
          responseExample={`{
  "id": "order-001",
  "status": "cancelled",
  "cancelled_at": "2023-06-10T15:45:00Z",
  "cancellation_reason": "El cliente solicitó la cancelación",
  "refund_status": "processing"
}`}
        />

        <h2>Niveles de Profundidad</h2>
        <p>
          Como regla general, intenta mantener la profundidad de tus rutas a un máximo de 3-4 niveles 
          para mantener la API navegable y evitar URIs excesivamente largos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div>
            <h4 className="font-medium text-sm mb-2 text-red-500">Demasiado Profundo ❌</h4>
            <CodeBlock
              code={`/organizations/{org_id}/departments/{dept_id}/teams/{team_id}/projects/{project_id}/tasks/{task_id}/comments/{comment_id}`}
              language="http"
            />
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2 text-green-500">Mejor Alternativa ✓</h4>
            <CodeBlock
              code={`/tasks/{task_id}/comments/{comment_id}

# Con parámetros de filtro para contexto
/comments?task_id={task_id}&project_id={project_id}`}
              language="http"
            />
          </div>
        </div>

        <h2>Versiones en la Ruta</h2>
        <p>
          Incluir el número de versión en la ruta es una práctica común para gestionar la evolución 
          de la API. Típicamente se coloca al inicio del path.
        </p>

        <CodeBlock
          code={`# Versión en la ruta
/api/v1/products
/api/v2/products

# Versión en el subdominio (alternativa)
https://v1.api.example.com/products
https://v2.api.example.com/products`}
          language="http"
        />

        <h2>Consideraciones para APIs Públicas vs Privadas</h2>
        <p>
          Las APIs públicas suelen beneficiarse de estructuras más simples y estables, mientras que 
          las APIs privadas pueden permitirse estructuras más específicas del dominio.
        </p>

        <ul>
          <li><strong>APIs públicas:</strong> Prioriza la estabilidad, navegabilidad y descubrimiento</li>
          <li><strong>APIs privadas:</strong> Puede ajustarse más a las necesidades específicas del negocio</li>
        </ul>

        <blockquote>
          "Una API bien estructurada es como un buen mapa: ayuda a los usuarios a encontrar fácilmente lo que 
          buscan y a descubrir nuevos caminos sin perderse."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default RouteStructure;
