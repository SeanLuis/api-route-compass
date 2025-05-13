import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { GitBranch, CheckCircle, XCircle, Globe, Code, Calendar, Server } from "lucide-react";

const Versioning = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/pagination" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">Funcionalidades</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Versionado de APIs</h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Estrategias para versionar APIs REST y mantener compatibilidad.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <p className="dark:text-slate-300">
            El versionado de APIs es una práctica fundamental para permitir la
            evolución de tu API sin romper las integraciones existentes. A medida
            que tu API crece y evoluciona, necesitarás realizar cambios que
            podrían ser incompatibles con los clientes actuales.
          </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-indigo-500" />
            Por Qué Versionar tu API
          </h2>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 p-6 rounded-lg border border-indigo-100 dark:border-indigo-800">
            <p className="text-slate-800 dark:text-slate-300">
              Las APIs son contratos entre proveedores de servicios y consumidores.
              Cuando necesitas realizar cambios sustanciales en ese contrato, el
              versionado te permite:
            </p>
            <ul className="mt-3 space-y-1 ml-6 list-disc text-slate-700 dark:text-slate-300">
              <li>
                Introducir nuevas funcionalidades sin afectar a clientes existentes
              </li>
              <li>
                Corregir diseños problemáticos mientras mantienes compatibilidad con
                versiones anteriores
              </li>
              <li>
                Proporcionar una transición gradual para que los clientes migren a
                nuevas versiones
              </li>
              <li>
                Mantener la confianza de los desarrolladores que dependen de la
                estabilidad de tu API
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <Calendar className="h-5 w-5 text-indigo-500" />
            Cuándo Versionar tu API
          </h2>

          <p className="dark:text-slate-300">
            No todos los cambios requieren una nueva versión. Generalmente, debes
            considerar una nueva versión cuando:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 dark:text-white">Necesitas versionar cuando hay:</h3>
                <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400">
                  <li>
                    <strong>Cambios Incompatibles:</strong> Modificaciones al formato de respuesta o parámetros requeridos
                  </li>
                  <li>
                    <strong>Eliminación de Recursos:</strong> Endpoints o campos previamente disponibles que se eliminan
                  </li>
                  <li>
                    <strong>Cambios en Lógica:</strong> Alteraciones significativas en el comportamiento
                  </li>
                  <li>
                    <strong>Rediseño Arquitectónico:</strong> Cambios fundamentales en la estructura
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 dark:text-white">No es necesario versionar por:</h3>
                <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400">
                  <li>
                    <strong>Nuevos endpoints:</strong> No afectan integraciones existentes
                  </li>
                  <li>
                    <strong>Campos opcionales nuevos:</strong> Clientes antiguos pueden ignorarlos
                  </li>
                  <li>
                    <strong>Correcciones de errores:</strong> Que no alteren el comportamiento documentado
                  </li>
                  <li>
                    <strong>Mejoras de rendimiento:</strong> Que mantienen los contratos existentes
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <Globe className="h-5 w-5 text-indigo-500" />
            Estrategias de Versionado
          </h2>

          <p className="dark:text-slate-300">
            Existen varias estrategias para versionar APIs REST, cada una con sus
            ventajas e inconvenientes:
          </p>

          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mt-6">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold dark:text-white">1. Versionado en la URL</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Incluye la versión directamente en la ruta base de la API.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-900 rounded-md overflow-hidden mb-4">
                  <CodeBlock
                    code={`# Versión incluida en la ruta
https://api.example.com/v1/products
https://api.example.com/v2/products`}
                    language="http"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <h4 className="font-medium text-green-600 dark:text-green-400">Ventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400 text-sm">
                      <li>Extremadamente claro y visible</li>
                      <li>Fácil de entender para desarrolladores</li>
                      <li>Permite probar diferentes versiones fácilmente</li>
                      <li>No requiere cabeceras HTTP personalizadas</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                      <h4 className="font-medium text-red-600 dark:text-red-400">Desventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400 text-sm">
                      <li>Viola parcialmente principios REST</li>
                      <li>Complica el cacheo a nivel de URL</li>
                      <li>Dificulta transición gradual entre versiones</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold dark:text-white">2. Versionado por Cabecera HTTP</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Utiliza una cabecera HTTP personalizada para indicar la versión.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-900 rounded-md overflow-hidden mb-4">
                  <CodeBlock
                    code={`# Mediante cabecera HTTP personalizada
GET /products HTTP/1.1
Host: api.example.com
Accept-Version: v2

# Usando Content Negotiation
GET /products HTTP/1.1
Host: api.example.com
Accept: application/vnd.example.v2+json`}
                    language="http"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <h4 className="font-medium text-green-600 dark:text-green-400">Ventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400 text-sm">
                      <li>Cumple mejor con los principios REST</li>
                      <li>Mantiene las URLs limpias y consistentes</li>
                      <li>Se integra bien con content negotiation de HTTP</li>
                      <li>Facilita la actualización progresiva</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                      <h4 className="font-medium text-red-600 dark:text-red-400">Desventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400 text-sm">
                      <li>Menos visible y difícil de descubrir</li>
                      <li>Más complejo para clientes y desarrolladores</li>
                      <li>Dificulta pruebas directas en navegador</li>
                      <li>No siempre compatible con todas las herramientas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold dark:text-white">3. Versionado por Parámetro de Consulta</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Indica la versión mediante un parámetro en la URL.
                </p>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-900 rounded-md overflow-hidden mb-4">
                  <CodeBlock
                    code={`# Usando un parámetro de consulta
https://api.example.com/products?version=2
https://api.example.com/products?api-version=2023-01-01`}
                    language="http"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <h4 className="font-medium text-green-600 dark:text-green-400">Ventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400 text-sm">
                      <li>Fácil de implementar y usar</li>
                      <li>Visible en la URL sin modificar la estructura principal</li>
                      <li>Permite pruebas directas en el navegador</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                      <h4 className="font-medium text-red-600 dark:text-red-400">Desventajas</h4>
                    </div>
                    <ul className="space-y-1 ml-6 list-disc text-slate-600 dark:text-slate-400 text-sm">
                      <li>Puede mezclarse con otros parámetros funcionales</li>
                      <li>No es tan robusto como las cabeceras</li>
                      <li>Complica el cacheo de respuestas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 mt-8 dark:text-white">
            <Calendar className="h-5 w-5 text-indigo-500" />
            Mejores Prácticas
          </h2>

          <div className="grid grid-cols-1 gap-6 mt-4">
            <Card className="overflow-hidden dark:border-slate-700">
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 dark:bg-slate-800 p-4">
                  <h3 className="font-medium dark:text-white">Proporcionar Fechas de Obsolescencia</h3>
                </div>
                <div className="p-6">
                  <p className="mb-4 dark:text-slate-300">
                    Comunica claramente cuándo se deprecarán las versiones antiguas:
                  </p>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code={`HTTP/1.1 200 OK
Content-Type: application/json
Deprecation: Sun, 31 Dec 2023 23:59:59 GMT
Sunset: Sun, 30 Jun 2024 23:59:59 GMT
Link: <https://api.example.com/v2/products>; rel="successor-version"

{
  "message": "Esta versión de la API dejará de ser compatible el 30 de junio de 2024. Por favor, migre a la v2."
}`}
                      language="http"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden dark:border-slate-700">
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 dark:bg-slate-800 p-4">
                  <h3 className="font-medium dark:text-white">Documentación de Migración</h3>
                </div>
                <div className="p-6">
                  <p className="mb-3 dark:text-slate-300">
                    Proporciona guías detalladas para actualizar entre versiones:
                  </p>
                  <ul className="space-y-1.5 ml-6 list-disc text-slate-700 dark:text-slate-300">
                    <li>Documenta todos los cambios entre versiones</li>
                    <li>Incluye ejemplos de código antes y después</li>
                    <li>Proporciona herramientas de migración cuando sea posible</li>
                    <li>Explica el razonamiento detrás de los cambios importantes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <Globe className="h-5 w-5 text-indigo-500" />
            Ejemplos Prácticos
          </h2>

          <div className="grid grid-cols-1 gap-6 mt-4">
            <Card className="overflow-hidden dark:border-slate-700">
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 dark:bg-slate-800 p-4">
                  <h3 className="font-medium dark:text-white">GitHub API</h3>
                </div>
                <div className="p-6">
                  <p className="mb-3 dark:text-slate-300">
                    GitHub utiliza el enfoque de content negotiation en la cabecera Accept:
                  </p>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code={`# API de GitHub v3
GET /users/octocat
Host: api.github.com
Accept: application/vnd.github.v3+json

# API de GitHub con características beta/preview
GET /users/octocat
Host: api.github.com
Accept: application/vnd.github.v3+json, application/vnd.github.starfox-preview+json`}
                      language="http"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden dark:border-slate-700">
              <CardContent className="p-0">
                <div className="border-b bg-slate-50 dark:bg-slate-800 p-4">
                  <h3 className="font-medium dark:text-white">Stripe API</h3>
                </div>
                <div className="p-6">
                  <p className="mb-3 dark:text-slate-300">
                    Stripe utiliza un sistema basado en fechas para versionar su API:
                  </p>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code={`# Especificando versión explícitamente
GET /v1/customers/cus_123
Host: api.stripe.com
Stripe-Version: 2023-10-16

# De manera alternativa en cada solicitud
curl https://api.stripe.com/v1/customers \
  -H "Authorization: Bearer sk_test_..." \
  -H "Stripe-Version: 2023-10-16"`}
                      language="http"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 rounded-lg p-6 mt-8">
            <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Consideraciones Finales</h2>
            <p className="text-blue-700 dark:text-blue-400 mb-3">
              La elección de la estrategia de versionado debe adaptarse a las
              necesidades específicas de tu API y tu base de usuarios:
            </p>
            <ul className="space-y-1.5 ml-6 list-disc text-blue-700 dark:text-blue-400">
              <li>
                <strong>APIs públicas:</strong> El versionado en la URL suele ser más
                claro y accesible
              </li>
              <li>
                <strong>APIs privadas:</strong> Cabeceras personalizadas pueden
                ofrecer mayor flexibilidad
              </li>
              <li>
                <strong>Microservicios:</strong> Considera estrategias por servicio
                que faciliten la evolución independiente
              </li>
            </ul>
          </div>

          <blockquote className="border-l-4 border-indigo-300 dark:border-indigo-700 pl-6 py-2 pr-4 mt-8 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 rounded-r-lg">
            <p className="italic text-indigo-900 dark:text-indigo-300 font-medium">
              "Una buena estrategia de versionado es como un buen contrato:
              proporciona estabilidad y previsibilidad mientras permite la evolución
              del sistema. La clave está en equilibrar la innovación con el compromiso
              de mantener la compatibilidad."
            </p>
          </blockquote>
        </div>
      </div>
    </PageLayout>
  );
};

export default Versioning;
