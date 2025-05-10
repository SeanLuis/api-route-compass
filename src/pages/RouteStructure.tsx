import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { GitFork, CheckCircle, XCircle, Layers, GitMerge, CornerDownRight, GitBranch, Network, Codepen } from "lucide-react";

const RouteStructure = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/naming" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">Rutas y Recursos</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Estructura de Rutas</h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Organización jerárquica y patrones de diseño para rutas de API.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 p-6 rounded-lg border border-indigo-100 dark:border-indigo-800">
            <p className="text-slate-800 dark:text-slate-300">
              Diseñar una estructura de rutas coherente y predecible es fundamental para crear APIs REST 
              intuitivas y fáciles de usar. Una buena estructura de rutas refleja la organización lógica 
              de los recursos y facilita su descubrimiento y navegación.
            </p>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <GitFork className="h-5 w-5 text-indigo-500" />
            Principios de Diseño para Rutas
          </h2>
          
          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold dark:text-white">Jerarquía Lógica</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Las rutas deben organizarse siguiendo una jerarquía lógica que refleje las relaciones 
                  entre los recursos. Esta estructura permite a los desarrolladores entender intuitivamente 
                  cómo navegar por la API.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-900 rounded-md overflow-hidden">
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
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Network className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold dark:text-white">Consistencia en Profundidad</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Mantener una profundidad de ruta consistente ayuda a los usuarios a predecir cómo acceder 
                  a recursos similares en diferentes partes de la API.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div>
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    <h4 className="font-medium text-red-600 dark:text-red-400">Inconsistente</h4>
                  </div>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code={`/users/{id}/profile
/products/{id}
/orders/for-user/{user_id}`}
                      language="http"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <h4 className="font-medium text-green-600 dark:text-green-400">Consistente</h4>
                  </div>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code={`/users/{id}
/users/{id}/profile
/products/{id}
/users/{id}/orders`}
                      language="http"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mb-4">
              <Codepen className="h-4 w-4 text-indigo-600" />
              Patrones Comunes
            </h3>

            <div className="grid grid-cols-1 gap-6">
              <Card className="overflow-hidden dark:border-slate-700">
                <CardContent className="p-0">
                  <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 flex items-center">
                    <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 text-sm flex items-center justify-center mr-2">1</div>
                    <h4 className="font-medium dark:text-white">Recursos Principales (Entidades)</h4>
                  </div>
                  <div className="p-6">
                    <p className="mb-4 dark:text-slate-300">
                      Los recursos principales representan las entidades centrales de tu sistema y generalmente 
                      se nombran como sustantivos en plural.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
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
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden dark:border-slate-700">
                <CardContent className="p-0">
                  <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 flex items-center">
                    <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 text-sm flex items-center justify-center mr-2">2</div>
                    <h4 className="font-medium dark:text-white">Sub-recursos</h4>
                  </div>
                  <div className="p-6">
                    <p className="mb-4 dark:text-slate-300">
                      Los sub-recursos representan entidades que existen dentro del contexto de un recurso principal.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
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
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden dark:border-slate-700">
                <CardContent className="p-0">
                  <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 flex items-center">
                    <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 text-sm flex items-center justify-center mr-2">3</div>
                    <h4 className="font-medium dark:text-white">Acciones Específicas</h4>
                  </div>
                  <div className="p-6">
                    <p className="mb-4 dark:text-slate-300">
                      Para operaciones que no se ajustan al modelo CRUD estándar, usa el patrón de acciones.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mt-10">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <GitMerge className="h-5 w-5 text-indigo-500" />
                  <h3 className="text-lg font-semibold dark:text-white">Niveles de Profundidad</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Como regla general, intenta mantener la profundidad de tus rutas a un máximo de 3-4 niveles 
                  para mantener la API navegable y evitar URIs excesivamente largos.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div>
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    <h4 className="font-medium text-red-600 dark:text-red-400">Demasiado Profundo</h4>
                  </div>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code="/organizations/{org_id}/departments/{dept_id}/teams/{team_id}/projects/{project_id}/tasks/{task_id}/comments/{comment_id}"
                      language="http"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <h4 className="font-medium text-green-600 dark:text-green-400">Mejor Alternativa</h4>
                  </div>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code={`/tasks/{task_id}/comments/{comment_id}

# Con parámetros de filtro para contexto
/comments?task_id={task_id}&project_id={project_id}`}
                      language="http"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mt-10">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch className="h-5 w-5 text-indigo-500" />
                  <h3 className="text-lg font-semibold dark:text-white">Versiones en la Ruta</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Incluir el número de versión en la ruta es una práctica común para gestionar la evolución 
                  de la API. Típicamente se coloca al inicio del path.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-900 rounded-md overflow-hidden">
                  <CodeBlock
                    code={`# Versión en la ruta
/api/v1/products
/api/v2/products

# Versión en el subdominio (alternativa)
https://v1.api.example.com/products
https://v2.api.example.com/products`}
                    language="http"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-10 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
            <h2 className="text-xl font-semibold tracking-tight mb-4 dark:text-white">Consideraciones para APIs Públicas vs Privadas</h2>
            <p className="mb-4 dark:text-slate-300">
              Las APIs públicas suelen beneficiarse de estructuras más simples y estables, mientras que 
              las APIs privadas pueden permitirse estructuras más específicas del dominio.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="dark:border-slate-700">
                <CardContent className="p-4">
                  <h4 className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">APIs públicas</h4>
                  <ul className="space-y-1 text-sm dark:text-slate-300">
                    <li className="flex items-start">
                      <CornerDownRight className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Prioriza la estabilidad y navegabilidad</span>
                    </li>
                    <li className="flex items-start">
                      <CornerDownRight className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Facilita el descubrimiento de recursos</span>
                    </li>
                    <li className="flex items-start">
                      <CornerDownRight className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Mantén rutas simples y predecibles</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="dark:border-slate-700">
                <CardContent className="p-4">
                  <h4 className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">APIs privadas</h4>
                  <ul className="space-y-1 text-sm dark:text-slate-300">
                    <li className="flex items-start">
                      <CornerDownRight className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Puede ajustarse a necesidades específicas</span>
                    </li>
                    <li className="flex items-start">
                      <CornerDownRight className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Mayor flexibilidad en la estructura</span>
                    </li>
                    <li className="flex items-start">
                      <CornerDownRight className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Optimizada para casos de uso internos</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <blockquote className="border-l-4 border-indigo-300 dark:border-indigo-700 pl-6 py-2 pr-4 mt-8 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 rounded-r-lg">
            <p className="italic text-indigo-900 dark:text-indigo-300 font-medium">
              "Una API bien estructurada es como un buen mapa: ayuda a los usuarios a encontrar fácilmente lo que 
              buscan y a descubrir nuevos caminos sin perderse."
            </p>
          </blockquote>
        </div>
      </div>
    </PageLayout>
  );
};

export default RouteStructure;
