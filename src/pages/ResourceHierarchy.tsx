import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { GitBranch, Compass, Network, Layers, AlertTriangle, CheckCircle, XCircle, Database, Link2, GitMerge } from "lucide-react";
import { CodeExample } from "@/components/CodeExample";

const ResourceHierarchy = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/route-structure" className="text-sm text-slate-500 hover:text-slate-700">Rutas y Recursos</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Jerarquía de Recursos</h1>
          <p className="text-lg text-slate-700">
            Cómo estructurar recursos y sus relaciones en APIs REST.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-100">
            <p className="text-slate-800">
              Una API REST bien diseñada modela sus recursos de manera que refleje las relaciones naturales entre 
              ellos. La jerarquía de recursos organiza estas relaciones de forma intuitiva, facilitando la navegación 
              y el descubrimiento de tu API.
            </p>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Compass className="h-5 w-5 text-indigo-500" />
            Principios de Jerarquía de Recursos
          </h2>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b bg-slate-50 p-4">
                <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2">
                  <Database className="h-4 w-4 text-indigo-600" />
                  Modelado de Entidades
                </h3>
              </div>
              <div className="p-6">
                <p className="mb-4">
                  Los recursos en una API REST generalmente representan entidades del dominio de negocio. Al diseñar 
                  la jerarquía, identifica primero las entidades principales y sus relaciones:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="bg-blue-50 border border-blue-100">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Database className="h-4 w-4 text-blue-600" />
                        </div>
                        <h4 className="font-medium text-blue-700">Recursos principales</h4>
                      </div>
                      <p className="text-sm text-blue-800">
                        Entidades independientes como usuarios, productos, pedidos
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-indigo-50 border border-indigo-100">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <GitBranch className="h-4 w-4 text-indigo-600" />
                        </div>
                        <h4 className="font-medium text-indigo-700">Subrecursos</h4>
                      </div>
                      <p className="text-sm text-indigo-800">
                        Entidades que existen dentro del contexto de un recurso principal
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-purple-50 border border-purple-100">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <Link2 className="h-4 w-4 text-purple-600" />
                        </div>
                        <h4 className="font-medium text-purple-700">Recursos de relación</h4>
                      </div>
                      <p className="text-sm text-purple-800">
                        Representan conexiones entre entidades principales
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Network className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Niveles de Anidamiento</h3>
                </div>
                <p className="text-slate-700">
                  Las rutas de la API deberían reflejar la relación de padre-hijo entre recursos. Sin embargo, es 
                  importante limitar la profundidad de anidamiento para evitar URIs excesivamente complejos.
                </p>
              </div>
              
              <div className="space-y-4 p-6">
                <CodeExample 
                  type="warning"
                  title="Complejo pero Aceptable"
                  code="/organizations/{org_id}/projects/{project_id}/tasks/{task_id}"
                />
                
                <CodeExample 
                  type="error"
                  title="Demasiado Complejo"
                  code="/organizations/{org_id}/departments/{dept_id}/projects/{project_id}/milestones/{milestone_id}/tasks/{task_id}/subtasks/{subtask_id}"
                />
                
                <CodeExample 
                  type="success"
                  title="Alternativa Simplificada"
                  code="/tasks/{task_id}?project={project_id}&organization={org_id}"
                />
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 mt-10">
            <GitMerge className="h-5 w-5 text-indigo-500" />
            Patrones de Jerarquía
          </h2>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 p-4 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-sm flex items-center justify-center mr-2">1</div>
                  <h3 className="text-lg font-semibold">Recursos Anidados</h3>
                </div>
                <div className="p-6">
                  <p className="mb-4">
                    Este patrón representa relaciones jerárquicas directas entre recursos, donde un recurso 
                    pertenece a otro o existe dentro del contexto de otro.
                  </p>
                  
                  <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
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
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 p-4 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-sm flex items-center justify-center mr-2">2</div>
                  <h3 className="text-lg font-semibold">Recursos de Relación</h3>
                </div>
                <div className="p-6">
                  <p className="mb-4">
                    Este patrón modela las relaciones muchos-a-muchos entre recursos.
                  </p>
                  
                  <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
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
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 p-4 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-sm flex items-center justify-center mr-2">3</div>
                  <h3 className="text-lg font-semibold">Recursos Independientes con Referencias</h3>
                </div>
                <div className="p-6">
                  <p className="mb-4">
                    Este patrón es útil cuando los recursos pueden existir independientemente pero 
                    necesitan estar relacionados entre sí.
                  </p>
                  
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 mt-10">
            <Compass className="h-5 w-5 text-indigo-500" />
            Estrategias de Diseño
          </h2>

          <h3 className="text-lg font-semibold tracking-tight">1. Enfoque "Primero los Recursos"</h3>
          <p>
            Comienza identificando los recursos principales y modelo sus relaciones antes de definir endpoints:
          </p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>Identifica entidades principales del dominio (usuarios, productos, pedidos)</li>
            <li>Establece las relaciones entre estas entidades</li>
            <li>Determina qué recursos son independientes y cuáles son anidados</li>
            <li>Diseña rutas que reflejen estas relaciones</li>
          </ol>

          <h3 className="text-lg font-semibold tracking-tight">2. Balanceando Profundidad y Navegabilidad</h3>
          <p>
            Es importante encontrar un equilibrio entre la representación fiel de relaciones 
            y la complejidad de las rutas:
          </p>

          <ul className="list-disc pl-6 space-y-2">
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

          <h3 className="text-lg font-semibold tracking-tight">3. Minimizar el Acoplamiento</h3>
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

          <h2 className="text-xl font-semibold tracking-tight">Casos de Estudio</h2>

          <h3 className="text-lg font-semibold tracking-tight">Sistema de E-commerce</h3>
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

          <h3 className="text-lg font-semibold tracking-tight">Sistema de Gestión de Proyectos</h3>
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

          <h2 className="text-xl font-semibold tracking-tight">Consideraciones Avanzadas</h2>

          <h3 className="text-lg font-semibold tracking-tight">Navegación Hypermedia (HATEOAS)</h3>
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

          <h3 className="text-lg font-semibold tracking-tight">Representaciones Parciales vs Expansión</h3>
          <p>
            Para recursos con relaciones complejas, considera ofrecer:
          </p>

          <ul className="list-disc pl-6 space-y-2">
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

          <blockquote className="border-l-4 border-slate-200 pl-4 italic text-slate-600 my-4">
            "Una jerarquía de recursos bien diseñada proporciona un equilibrio entre la expresividad de las relaciones y
            la simplicidad de las rutas. La mejor API es la que resulta intuitiva para los desarrolladores que la consumen."
          </blockquote>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResourceHierarchy;
