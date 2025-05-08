import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent } from "@/components/ui/card";
import { RouteExample } from "@/components/RouteExample";
import { Link } from "react-router-dom";
import { AlertTriangle, Database, Network, ArrowDownUp, Clock, Timer, Activity, BarChart2, List, MessageSquare, FileWarning } from "lucide-react";

const RestLimitations = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/alternatives" className="text-sm text-slate-500 hover:text-slate-700">API Avanzada</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Limitaciones REST</h1>
          <p className="text-lg text-slate-700">
            Restricciones y desafíos del modelo REST para APIs complejas.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
        <p>
          REST ha sido el estilo arquitectónico dominante para el diseño de APIs web durante años,
          y con buena razón: es simple, flexible y se basa en los estándares HTTP que ya son
          ampliamente utilizados. Sin embargo, a medida que las aplicaciones se vuelven más complejas
          y los requisitos más exigentes, las limitaciones inherentes al modelo REST se hacen
          cada vez más evidentes.
        </p>

        <p>
          Esta sección explora las principales limitaciones del modelo REST y los escenarios
          donde otros enfoques pueden ser más adecuados.
        </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-500" />
            Fetching de datos ineficiente
          </h2>

        <p>
          Una de las limitaciones más significativas de REST es la ineficiencia en la obtención de
          datos, principalmente debido a dos problemas: el over-fetching y el under-fetching.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Over-fetching</h3>
              <p className="mb-4">
                Ocurre cuando una API REST devuelve más datos de los necesarios para un caso
                de uso específico. Los clientes reciben información excesiva que no utilizarán,
                desperdiciando ancho de banda y recursos de procesamiento.
              </p>
              <div className="bg-slate-100 p-3 rounded-md">
                <p className="text-sm text-slate-700">
                  <strong>Ejemplo:</strong> Al solicitar datos básicos de un usuario para un
                  encabezado de perfil, el endpoint <code>/users/123</code> devuelve todos los
                  detalles del usuario, incluida su dirección, preferencias y datos históricos,
                  cuando solo se necesitaba el nombre y la foto.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Under-fetching</h3>
              <p className="mb-4">
                Se produce cuando un endpoint no proporciona datos suficientes para un caso de
                uso, obligando al cliente a realizar múltiples solicitudes a distintos endpoints
                para obtener toda la información necesaria.
              </p>
              <div className="bg-slate-100 p-3 rounded-md">
                <p className="text-sm text-slate-700">
                  <strong>Ejemplo:</strong> Para mostrar una página de producto con detalles del
                  producto, reseñas, productos relacionados y disponibilidad, el cliente debe
                  llamar a <code>/products/123</code>, <code>/products/123/reviews</code>,
                  <code>/products/123/related</code> y <code>/products/123/inventory</code> por
                  separado.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2">
            <List className="h-5 w-5 text-blue-500" />
            Soluciones parciales en REST
          </h3>

        <div className="space-y-4 mb-8">
          <div>
            <h4 className="font-semibold">1. Selección de campos (Field Selection)</h4>
            <p className="mb-2">
              Muchas APIs REST permiten especificar qué campos se desean incluir en la respuesta,
              reduciendo el over-fetching:
            </p>
            <RouteExample
              method="GET"
              path="/api/users/123?fields=id,name,profile_image"
              description="Solicitar solo campos específicos"
            />
            <p className="mt-2 text-sm text-slate-600">
              Sin embargo, esto sigue requiriendo que el cliente conozca de antemano qué campos
              necesita, y no resuelve completamente el problema para estructuras de datos anidadas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">2. Expansión de relaciones (Embedding)</h4>
            <p className="mb-2">
              Para mitigar el under-fetching, algunas APIs permiten incluir recursos relacionados:
            </p>
            <RouteExample
              method="GET"
              path="/api/products/123?expand=reviews,category,inventory"
              description="Incluir recursos relacionados en una sola respuesta"
            />
            <p className="mt-2 text-sm text-slate-600">
              Esta técnica funciona bien para relaciones simples y predefinidas, pero puede volverse
              complicada para relaciones profundamente anidadas o cuando los clientes tienen
              necesidades variadas.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 p-4 mb-8">
          <h4 className="text-amber-800 font-medium">Compromiso inevitable</h4>
          <p className="text-amber-700">
            A pesar de estas soluciones, las APIs REST siempre implican un compromiso:
            demasiados endpoints específicos (fragmentación de API) o endpoints demasiado
            genéricos (ineficiencia). Este problema fundamental surge de la naturaleza
            de REST, donde los recursos y sus URLs son fijos y predefinidos.
          </p>
        </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <ArrowDownUp className="h-5 w-5 text-indigo-500" />
            Operaciones por lotes
          </h2>

        <p className="mb-4">
          REST está diseñado idealmente para operaciones sobre recursos individuales. Cuando se
          necesitan operaciones por lotes o transaccionales que afectan a múltiples recursos,
          el modelo REST muestra sus limitaciones.
        </p>

        <div className="mb-6">
            <h3 className="text-lg font-semibold tracking-tight mb-2">El problema de las modificaciones en masa</h3>
          <p>
            Consideremos un escenario donde necesitamos actualizar el estado de 50 tareas
            en una aplicación de gestión de proyectos:
          </p>

          <CodeBlock
            code={`// Enfoque REST tradicional: 50 solicitudes separadas
PATCH /api/tasks/1 { "status": "completed" }
PATCH /api/tasks/2 { "status": "completed" }
...
PATCH /api/tasks/50 { "status": "completed" }

// Problema: Sobrecarga de red, latencia acumulada, sin garantía transaccional`}
            language="http"
          />

          <p className="mt-4">
            Las soluciones comunes para este problema en REST incluyen:
          </p>

          <div className="space-y-2 mt-4">
            <div className="bg-slate-100 p-3 rounded-md">
              <h4 className="font-semibold">Endpoint específico para operaciones por lotes</h4>
              <CodeBlock
                code={`POST /api/tasks/batch-update
{
  "tasks": [1, 2, 3, ..., 50],
  "update": { "status": "completed" }
}`}
                language="json"
              />
              <p className="text-sm mt-2 text-slate-600">
                Esta solución funciona pero no es "RESTful" en sentido estricto, ya que
                el endpoint no representa un recurso específico.
              </p>
            </div>

            <div className="bg-slate-100 p-3 rounded-md">
              <h4 className="font-semibold">Colección de operaciones en una sola petición</h4>
              <CodeBlock
                code={`POST /api/batch-operations
{
  "operations": [
    { "method": "PATCH", "path": "/tasks/1", "body": { "status": "completed" } },
    { "method": "PATCH", "path": "/tasks/2", "body": { "status": "completed" } },
    ...
  ]
}`}
                language="json"
              />
              <p className="text-sm mt-2 text-slate-600">
                Este enfoque se aleja aún más de los principios REST puros y comienza
                a asemejarse a un protocolo RPC o una implementación personalizada.
              </p>
            </div>
          </div>
        </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-500" />
            Operaciones que no se ajustan al paradigma CRUD
          </h2>

        <p className="mb-4">
          REST se adapta perfectamente a las operaciones CRUD (Crear, Leer, Actualizar, Eliminar),
          pero muchas aplicaciones reales necesitan operaciones más complejas que no encajan
          naturalmente en este modelo.
        </p>

          <div className="space-y-6 mb-8">
          <div>
              <h3 className="text-lg font-semibold tracking-tight mb-3">Acciones y procesos</h3>
              <p className="mb-4">
              Las operaciones como "aprobar", "rechazar", "procesar", "calcular" o "convertir"
              no tienen una correspondencia clara con los verbos HTTP estándar y los recursos.
            </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Card className="overflow-hidden">
                  <div className="border-b pb-2 pt-1 px-6 bg-slate-50">
                    <h4 className="font-medium text-slate-700">Aproximación REST forzada</h4>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-md text-sm font-semibold">PUT</div>
                      <span className="text-slate-600">/api/orders/123</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">Actualizar orden completa para aprobarla</p>
              <div className="bg-slate-100 p-3 rounded-md">
                      <code className="block text-xs text-slate-700">
                  {`{ "status": "approved", ... otros campos obligatorios ... }`}
                </code>
              </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <div className="border-b pb-2 pt-1 px-6 bg-slate-50">
                    <h4 className="font-medium text-slate-700">Interpretación pragmática</h4>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm font-semibold">POST</div>
                      <span className="text-slate-600">/api/orders/123/approve</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">Acción específica (menos RESTful pero más clara)</p>
              <div className="bg-slate-100 p-3 rounded-md">
                      <code className="block text-xs text-slate-700">
                  {`{ "approvedBy": "user_456", "notes": "Todo correcto" }`}
                </code>
              </div>
                  </CardContent>
                </Card>
            </div>
          </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Flujos de trabajo complejos</h3>
              <p className="text-blue-800">
              Los procesos de negocio con múltiples pasos, como "finalizar una compra",
              "procesar una solicitud de préstamo" o "completar un registro en varias etapas"
              son difíciles de modelar de forma elegante en REST.
            </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-blue-800 mb-2">Finalizar compra</h4>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>1. Validar carrito</p>
                    <p>2. Procesar pago</p>
                    <p>3. Verificar stock</p>
                    <p>4. Crear orden</p>
                    <p>5. Confirmar al cliente</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-blue-800 mb-2">Solicitud de préstamo</h4>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>1. Enviar solicitud</p>
                    <p>2. Verificar documentación</p>
                    <p>3. Analizar riesgo</p>
                    <p>4. Aprobar/rechazar</p>
                    <p>5. Desembolsar fondos</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-blue-800 mb-2">Registro en etapas</h4>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>1. Datos básicos</p>
                    <p>2. Verificar email</p>
                    <p>3. Completar perfil</p>
                    <p>4. Preferencias</p>
                    <p>5. Activar cuenta</p>
                  </div>
                </div>
              </div>
            </div>
        </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-500" />
            Manejo del estado
          </h2>

        <p className="mb-6">
          REST es fundamentalmente sin estado (stateless), lo que significa que cada solicitud
          debe contener toda la información necesaria para ser procesada independientemente.
          Esto presenta desafíos para operaciones que requieren mantener un estado a través
          de múltiples interacciones.
        </p>

        <div className="space-y-4 mb-8">
          <div>
            <h4 className="font-semibold">Operaciones de larga duración</h4>
            <p className="mb-2">
                REST está diseñado para interacciones rápidas de solicitud-respuesta. Las operaciones
                que tardan minutos o incluso horas en completarse (como procesamiento de video, importaciones
                masivas o cálculos complejos) no encajan bien en este modelo.
            </p>
            <div className="bg-slate-100 p-3 rounded-md mb-4">
                <p className="text-sm text-slate-700">
                  <strong>Patrones comunes para procesos largos en APIs REST:</strong>
                </p>
                <ol className="list-decimal list-inside text-xs ml-4 mt-2 text-slate-600 space-y-1">
                  <li>
                    <strong>Polling:</strong> El cliente inicia la operación y recibe un ID de trabajo,
                    luego consulta periódicamente el estado hasta que se completa
                </li>
                <li>
                    <strong>Webhooks:</strong> El cliente proporciona una URL de callback que el servidor
                    notifica cuando la operación se completa
                </li>
                <li>
                    <strong>Respuestas 202 (Accepted):</strong> El servidor acepta la solicitud pero no la procesa inmediatamente,
                    proporcionando un endpoint para verificar el estado
                </li>
              </ol>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Flujos de conversación</h4>
            <p>
              Aplicaciones como asistentes virtuales, procesos de configuración guiados o
              formularios de múltiples pasos requieren mantener un contexto a través de varias
              interacciones, algo que REST no aborda directamente.
            </p>
          </div>
        </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-indigo-500" />
            Notificaciones en tiempo real
          </h2>

        <p className="mb-6">
          REST es fundamentalmente un modelo de comunicación basado en solicitud-respuesta,
          donde el cliente siempre inicia la interacción. Esto crea desafíos para escenarios
          que requieren notificaciones en tiempo real o actualizaciones iniciadas por el servidor.
        </p>

        <div className="mb-8">
          <h3 className="font-semibold mb-2">Técnicas para tiempo real con REST</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Long Polling</h4>
                <p className="mb-2 text-sm">
                  El cliente hace una solicitud HTTP y el servidor mantiene la conexión abierta
                  hasta que haya nuevos datos disponibles o se alcance un tiempo límite.
                </p>
                <div className="bg-slate-50 p-2 rounded-md text-xs">
                  <p className="font-medium">Limitaciones:</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Conexiones innecesariamente mantenidas</li>
                    <li>Overhead de establecimiento de conexiones</li>
                    <li>Problemas con balanceadores de carga</li>
                    <li>Dificultad de escalabilidad</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Short Polling</h4>
                <p className="mb-2 text-sm">
                  El cliente realiza solicitudes HTTP de forma periódica (cada pocos segundos)
                  para verificar si hay nuevos datos.
                </p>
                <div className="bg-slate-50 p-2 rounded-md text-xs">
                  <p className="font-medium">Limitaciones:</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Alta carga en el servidor</li>
                    <li>Desperdicio de ancho de banda</li>
                    <li>Latencia en las actualizaciones</li>
                    <li>Ineficiencia energética en móviles</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="mt-4 text-slate-700">
            Estas soluciones son "parches" sobre REST que intentan forzar un comportamiento que
            va en contra de su naturaleza fundamental. Para comunicación bidireccional en tiempo
            real, tecnologías como WebSockets, Server-Sent Events o la reciente tecnología HTTP/2
            y HTTP/3 push son más adecuadas.
          </p>
        </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <FileWarning className="h-5 w-5 text-indigo-500" />
            Documentación y contratos débiles
          </h2>

        <p className="mb-4">
          REST no tiene un mecanismo intrínseco para definir contratos estrictos entre
          cliente y servidor. Aunque existen estándares como OpenAPI (Swagger), éstos son
          complementarios y no parte integral del modelo REST.
        </p>

        <div className="space-y-4 mb-8">
          <div>
            <h4 className="font-semibold">Problemas de integración</h4>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                Los clientes dependen de documentación externa que puede quedar desactualizada
              </li>
              <li>
                No hay validación automática en tiempo de compilación de las interfaces
              </li>
              <li>
                Los cambios en la API pueden romper clientes existentes sin advertencia previa
              </li>
              <li>
                Ausencia de herramientas nativas para validación de tipos de datos complejos
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Sobrecarga cognitiva para desarrolladores</h4>
            <p>
              En proyectos grandes, los desarrolladores deben memorizar o consultar constantemente
              la estructura de múltiples endpoints, parámetros, códigos de error y formatos de
              respuesta sin ayuda del sistema de tipos o autocompletado del IDE.
            </p>
          </div>
        </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-indigo-500" />
            Rendimiento y latencia de red
          </h2>

        <p className="mb-4">
          Las APIs REST generalmente sufren de problemas de rendimiento debido a varios factores
          inherentes a su diseño:
        </p>

        <div className="space-y-4 mb-8">
          <div>
            <h4 className="font-semibold">Múltiples viajes de red (N+1 Problem)</h4>
            <p className="mb-2">
              Para obtener datos complejos y relacionados, los clientes REST suelen necesitar realizar
              múltiples solicitudes HTTP secuenciales, lo que incrementa la latencia.
            </p>
            <div className="bg-slate-100 p-3 rounded-md">
              <p className="text-sm text-slate-700">
                <strong>Ejemplo:</strong> Para mostrar una feed de redes sociales con 10 publicaciones,
                cada una con su autor, comentarios y likes, un cliente REST podría necesitar:
              </p>
              <ul className="list-disc list-inside text-xs ml-4 mt-2 text-slate-600 space-y-1">
                <li>1 solicitud para obtener el feed inicial</li>
                <li>10 solicitudes para obtener detalles del autor de cada publicación</li>
                <li>10 solicitudes para obtener comentarios de cada publicación</li>
                <li>10 solicitudes para obtener likes de cada publicación</li>
              </ul>
              <p className="text-xs font-medium text-slate-700 mt-2">
                Total: 31 solicitudes HTTP, cada una con su latencia y overhead.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Overhead de HTTP</h4>
            <p>
              Cada solicitud HTTP incluye encabezados, cookies, procesamiento de autenticación
              y establecimiento de conexión, lo que añade overhead significativo, especialmente
              para operaciones pequeñas o frecuentes.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Verbosidad de la serialización</h4>
            <p>
              Las APIs REST tradicionales suelen usar JSON, que es legible para humanos pero no
              es el formato más eficiente en términos de tamaño de transferencia. Los campos redundantes,
              nombres largos y estructura anidada aumentan el tamaño de las respuestas.
            </p>
          </div>
        </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-indigo-500" />
            ¿Cuándo considerar alternativas a REST?
          </h2>

        <div className="space-y-4 mb-8">
          <p>
            A pesar de estas limitaciones, REST sigue siendo una excelente opción para muchas
            APIs. Considera alternativas cuando:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Tu API tiene interfaces extremadamente variadas</strong> con diferentes
              necesidades de datos para cada cliente (considerar GraphQL)
            </li>
            <li>
              <strong>La eficiencia en el rendimiento es crítica</strong>, especialmente con
              volúmenes de datos grandes o dispositivos con recursos limitados (considerar gRPC)
            </li>
            <li>
              <strong>Necesitas comunicación en tiempo real</strong> o basada en eventos
              (considerar WebSockets o arquitecturas basadas en eventos)
            </li>
            <li>
              <strong>Tus operaciones son principalmente procedimentales</strong> en lugar de
              orientadas a recursos (considerar RPC)
            </li>
            <li>
              <strong>Trabajas en un ecosistema monolítico o microservicios internos</strong>
              donde la legibilidad HTTP y la interoperabilidad no son prioritarias
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-md p-4 mb-8">
          <h3 className="text-blue-900 font-medium">Conclusión</h3>
          <p className="text-blue-800">
            REST ha sido y seguirá siendo un pilar fundamental en el diseño de APIs, pero
            como cualquier tecnología, tiene sus limitaciones. Un buen arquitecto
            comprende estas limitaciones y sabe cuándo ser pragmático, ya sea adaptando
            el modelo REST a sus necesidades o adoptando enfoques alternativos cuando la 
            situación lo requiere. El objetivo final es diseñar APIs que proporcionen la
            mejor experiencia posible tanto para los desarrolladores como para los usuarios finales.
          </p>
        </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default RestLimitations;
