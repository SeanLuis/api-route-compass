import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteExample } from "@/components/RouteExample";
import { Link } from "react-router-dom";
import { Code, Server, Shield, CheckCircle, Database, ArrowRight, LucideIcon, LayoutDashboard, Workflow, Layers, RefreshCw } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import MermaidDiagram from "@/components/MermaidDiagram";

const ScalablePatterns = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/rest-limitations" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">API Avanzada</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Patrones Escalables</h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Arquitecturas y patrones para APIs REST de gran escala.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <p className="dark:text-slate-300">
            A medida que una API REST crece en uso, complejidad y volumen de datos, se vuelve
            fundamental emplear patrones arquitectónicos que garanticen su escalabilidad,
            mantenibilidad y rendimiento. Esta sección presenta patrones y estrategias para
            diseñar y evolucionar APIs REST que puedan escalar de manera eficiente.
          </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Server className="h-5 w-5 text-indigo-500" />
            Arquitecturas API Gateway
          </h2>
          
          <p className="mb-4 dark:text-slate-300">
            API Gateway es un patrón arquitectónico que proporciona un punto de entrada único
            para múltiples servicios backend, actuando como intermediario entre clientes y
            servicios.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Beneficios</h4>
                <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                  <li>Enrutamiento inteligente y balanceo de carga</li>
                  <li>Aplicación centralizada de seguridad y autenticación</li>
                  <li>Limitación de tasa (rate limiting) y cuotas</li>
                  <li>Caché de respuestas comunes</li>
                  <li>Composición y agregación de datos</li>
                  <li>Transformación de protocolos (ej: REST a gRPC)</li>
                  <li>Monitorización y análisis del tráfico</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Implementaciones populares</h4>
                <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                  <li>Kong</li>
                  <li>Amazon API Gateway</li>
                  <li>Azure API Management</li>
                  <li>Google Apigee</li>
                  <li>Tyk</li>
                  <li>Express Gateway</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-8">
            <h3 className="font-semibold mb-2">Variante: BFF (Backend for Frontend)</h3>
            <p className="mb-4 dark:text-slate-300">
              El patrón BFF es una variante especializada de API Gateway donde se crean gateways 
              específicos para cada tipo de cliente (móvil, web, TV, etc.), optimizando las
              respuestas a las necesidades particulares de cada interfaz.
            </p>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 mb-4 bg-gray-50 dark:bg-gray-900">
              <MermaidDiagram 
                className="bg-white dark:bg-slate-800 p-4 rounded-md mb-2 max-w-2xl mx-auto"
                chart={`graph TD
    subgraph "Clientes"
        Web["Web Client"]
        Mobile["Mobile Client"]
        TV["TV Client"]
    end
    
    subgraph "Backend For Frontend"
        WebBFF["Web BFF"]
        MobileBFF["Mobile BFF"]
        TVBFF["TV BFF"]
    end
    
    subgraph "Servicios Backend"
        Service1["Servicio 1"]
        Service2["Servicio 2"]
        Service3["Servicio 3"]
        Service4["Servicio 4"]
    end
    
    Web --> WebBFF
    Mobile --> MobileBFF
    TV --> TVBFF
    
    WebBFF --> Service1
    WebBFF --> Service2
    WebBFF --> Service3
    
    MobileBFF --> Service1
    MobileBFF --> Service3
    MobileBFF --> Service4
    
    TVBFF --> Service2
    TVBFF --> Service4`}
              />
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                Patrón BFF: API Gateways específicos para cada tipo de cliente
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="dark:text-slate-300"><strong>Cuándo usar BFF:</strong></p>
              <ul className="list-disc pl-6 space-y-1 dark:text-slate-300">
                <li>Cuando tienes clientes con necesidades significativamente diferentes</li>
                <li>Cuando buscas optimizar el rendimiento para clientes con limitaciones específicas (ej: dispositivos móviles)</li>
                <li>Cuando deseas equipos dedicados que puedan evolucionar rápidamente las APIs para cada plataforma</li>
              </ul>
            </div>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-500" />
            CQRS (Command Query Responsibility Segregation)
          </h2>

          <p className="mb-4 dark:text-slate-300">
            El patrón CQRS separa las operaciones que modifican el estado (comandos) de 
            las operaciones que solo leen datos (consultas), permitiendo optimizar cada tipo
            de operación por separado.
          </p>
          
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="border border-gray-200 dark:border-slate-700 rounded-md p-4">
                <h4 className="font-medium mb-2 dark:text-white">Modelo de comandos</h4>
                <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                  <li>Enfocado en la escritura y modificación de datos</li>
                  <li>Optimizado para validación y consistencia</li>
                  <li>Modelo de dominio rico con lógica de negocio</li>
                  <li>Normalmente usa base de datos normalizada</li>
                  <li>Endpoints REST orientados a acciones</li>
                </ul>
                <div className="mt-3">
                  <p className="text-sm font-medium dark:text-white">Ejemplos de endpoints:</p>
                  <div className="space-y-2 mt-2">
                    <RouteExample method="POST" path="/api/orders" />
                    <RouteExample method="PUT" path="/api/customers/:id" />
                    <RouteExample method="DELETE" path="/api/products/:id" />
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-slate-700 rounded-md p-4">
                <h4 className="font-medium mb-2 dark:text-white">Modelo de consultas</h4>
                <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                  <li>Enfocado en la lectura y recuperación de datos</li>
                  <li>Optimizado para rendimiento y escalabilidad</li>
                  <li>Modelo desnormalizado para acceso rápido</li>
                  <li>Puede usar almacenes especializados (NoSQL, etc.)</li>
                  <li>Endpoints REST orientados a recursos</li>
                </ul>
                <div className="mt-3">
                  <p className="text-sm font-medium dark:text-white">Ejemplos de endpoints:</p>
                  <div className="space-y-2 mt-2">
                    <RouteExample method="GET" path="/api/product-catalog" />
                    <RouteExample method="GET" path="/api/order-history/:customerId" />
                    <RouteExample method="GET" path="/api/dashboard/sales-summary" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-l-4 border-blue-400 dark:border-blue-700 p-4">
              <h4 className="text-blue-800 dark:text-blue-300 font-medium">Beneficios en APIs REST de gran escala</h4>
              <ul className="list-disc pl-4 mt-2 text-blue-700 dark:text-blue-300 space-y-1">
                <li>Cada modelo puede escalar independientemente según la carga</li>
                <li>Las lecturas pueden ser altamente cacheadas y distribuidas</li>
                <li>Las escrituras pueden enfocarse en consistencia y validación</li>
                <li>Permite optimizar los patrones de acceso para diferentes casos de uso</li>
                <li>Facilita la implementación de estrategias de resiliencia específicas para cada tipo de operación</li>
              </ul>
            </div>

            <div className="border border-gray-200 dark:border-slate-700 rounded-md p-4 mt-4 bg-gray-50 dark:bg-slate-900/50">
              <MermaidDiagram 
                className="bg-white dark:bg-slate-800 p-4 rounded-md mb-2 max-w-6xl mx-auto"
                chart={`flowchart LR
    User([Client])
    
    subgraph "API Gateway"
        Commands[/"Command API"/]
        Queries[/"Query API"/]
    end
    
    subgraph "Command Side"
        CommandHandler["Command Handler"]
        Domain["Domain Model"]
        EventStore[(Event Store)]
        WriteDB[(Write DB)]
    end
    
    subgraph "Query Side"
        QueryHandler["Query Handler"]
        ReadModel["Read Models"]
        ReadDB[(Read DB)]
    end
    
    User -->|"POST, PUT, DELETE"| Commands
    User -->|"GET"| Queries
    
    Commands --> CommandHandler
    CommandHandler --> Domain
    Domain -.->|"Domain Events"| EventStore
    Domain --> WriteDB
    
    EventStore -.->|"Projections"| ReadModel
    
    Queries --> QueryHandler
    QueryHandler --> ReadModel
    ReadModel --> ReadDB`}
              />
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                Patrón CQRS: Separación de responsabilidades entre operaciones de lectura y escritura
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-indigo-500" />
            Arquitecturas basadas en eventos
          </h2>

          <p className="mb-4 dark:text-slate-300">
            Las arquitecturas basadas en eventos complementan las APIs REST con mecanismos
            asíncronos para propagar cambios y mantener la consistencia entre sistemas distribuidos.
          </p>

          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-semibold dark:text-white">Event Sourcing</h3>
              <p className="mb-2 dark:text-slate-300">
                En lugar de almacenar solo el estado actual, este patrón almacena una secuencia
                de eventos que llevaron a ese estado, lo que permite recrear el estado en cualquier
                punto del tiempo y facilita la auditoría.
              </p>
              
              <CodeBlock
                code={`// 1. En lugar de actualizar directamente un recurso
PATCH /api/orders/123 { "status": "shipped" }

// 2. Se registra un evento que representa el cambio
POST /api/events {
  "type": "order_shipped",
  "aggregate_id": "order_123",
  "data": {
    "shipped_at": "2023-06-15T10:30:00Z",
    "tracking_code": "TRACK123456",
    "carrier": "FedEx"
  },
  "timestamp": "2023-06-15T10:30:00Z",
  "user_id": "user_456"
}

// 3. Los consumidores de eventos reaccionan al cambio
// (enviar email, actualizar inventario, etc.)`}
                language="http"
              />
            </div>
            
            <div>
              <h3 className="font-semibold dark:text-white">Consistencia Eventual</h3>
              <p className="dark:text-slate-300">
                En sistemas distribuidos a gran escala, la consistencia inmediata entre todos los 
                componentes es difícil de mantener. La consistencia eventual acepta que puede haber 
                períodos breves donde diferentes partes del sistema tienen estados ligeramente diferentes, 
                pero eventualmente convergerán.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-md p-4">
              <h4 className="font-medium mb-2 dark:text-white">Cómo integrar eventos con APIs REST</h4>
              <ul className="list-disc pl-6 space-y-2 dark:text-slate-300">
                <li>
                  <strong>Webhooks:</strong> Permitir a los clientes registrar URLs de callback que se 
                  invocan cuando ocurren eventos específicos
                </li>
                <li>
                  <strong>Event feeds:</strong> Proporcionar endpoints REST para consultar eventos recientes,
                  permitiendo a los clientes mantenerse actualizados
                </li>
                <li>
                  <strong>Suscripciones Server-Sent Events (SSE):</strong> Ofrecer un flujo de eventos
                  en tiempo real a través de HTTP
                </li>
                <li>
                  <strong>Estado con versión:</strong> Incluir números de versión o timestamps en las
                  respuestas REST para detectar cambios
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-500" />
            Caché multinivel
          </h2>

          <p className="mb-4 dark:text-slate-300">
            Las estrategias de caché son fundamentales para mejorar el rendimiento y reducir la carga
            en APIs REST a gran escala. Un enfoque multinivel proporciona beneficios a varios niveles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Caché de cliente</h4>
                <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                  <li>Uso de cabeceras HTTP Cache-Control</li>
                  <li>ETag para validación condicional</li>
                  <li>Last-Modified para actualizaciones basadas en tiempo</li>
                  <li>Evita solicitudes innecesarias a la API</li>
                </ul>
                <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-md mt-3 text-xs font-mono dark:text-slate-300">
                  Cache-Control: max-age=3600, stale-while-revalidate=86400
                </div>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Caché CDN/Edge</h4>
                <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                  <li>Recursos cacheables cerca del usuario</li>
                  <li>Ideal para datos de lenta modificación</li>
                  <li>Variantes por región o parámetros</li>
                  <li>Purga selectiva ante actualizaciones</li>
                </ul>
                <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-md mt-3 text-xs font-mono dark:text-slate-300">
                  Vary: Accept, Accept-Language, Origin
                </div>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Caché de aplicación</h4>
                <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                  <li>Redis, Memcached para datos dinámicos</li>
                  <li>Clave-valor con TTL configurable</li>
                  <li>Invalidación selectiva de caché</li>
                  <li>Patrones de read-through/write-behind</li>
                </ul>
                <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-md mt-3 text-xs dark:text-slate-300">
                  Almacenar respuestas completas o fragmentos intermedios
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/50 border border-emerald-200 dark:border-emerald-800 rounded-md p-4 mb-8">
            <h4 className="text-emerald-800 dark:text-emerald-300 font-medium mb-2">Estrategia de invalidación de caché</h4>
            <p className="text-emerald-700 dark:text-emerald-400 mb-2">
              Una estrategia efectiva de invalidación mantiene la frescura de los datos sin sacrificar
              los beneficios del caché. Considera estos enfoques:
            </p>
            <ul className="list-disc pl-6 text-emerald-700 dark:text-emerald-400 space-y-1">
              <li>Invalidación basada en eventos usando message queues</li>
              <li>Purga por patrones de URL cuando cambian recursos relacionados</li>
              <li>Versión en la URL para cambios importantes: <code>/api/v2/products</code></li>
              <li>TTL variable según la frecuencia de cambio del recurso</li>
            </ul>
          </div>

          <h2 className="text-xl font-semibold tracking-tight dark:text-white">Estrategias de replicación y particionamiento</h2>

          <p className="mb-4 dark:text-slate-300">
            A medida que aumenta el volumen de datos y el tráfico, las estrategias para distribuir
            datos se vuelven esenciales para mantener el rendimiento y la resiliencia.
          </p>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="font-semibold dark:text-white">Replicación de datos</h3>
              <p className="mb-3 dark:text-slate-300">
                Mantener copias redundantes de datos en múltiples servidores o regiones
                permite balancear la carga de lectura y mejorar la disponibilidad.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full h-6 w-6 flex items-center justify-center mt-1">
                    <span className="font-bold text-sm">R</span>
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">Replica para lecturas</h4>
                    <p className="text-sm dark:text-slate-300">
                      Distribuir consultas GET entre múltiples réplicas mientras todas las operaciones
                      de escritura van a un nodo primario que luego propaga los cambios.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full h-6 w-6 flex items-center justify-center mt-1">
                    <span className="font-bold text-sm">M</span>
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">Multi-región con proximidad</h4>
                    <p className="text-sm dark:text-slate-300">
                      Dirigir a los usuarios a la API más cercana geográficamente para reducir
                      la latencia, manteniendo consistencia entre regiones.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold dark:text-white">Particionamiento (Sharding)</h3>
              <p className="mb-3 dark:text-slate-300">
                Dividir grandes conjuntos de datos en particiones más pequeñas distribuidas
                entre múltiples servidores, permitiendo escalar horizontalmente.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 rounded-full h-6 w-6 flex items-center justify-center mt-1">
                    <span className="font-bold text-sm">K</span>
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">Particionamiento por clave</h4>
                    <p className="text-sm dark:text-slate-300">
                      Dividir datos según un identificador principal, como ID de cliente o región geográfica.
                      En APIs REST, puede reflejarse en el enrutamiento a diferentes backends:
                      <code className="block mt-1 bg-slate-50 dark:bg-slate-800 p-1 rounded">GET /api/customers/region-eu/12345</code>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 rounded-full h-6 w-6 flex items-center justify-center mt-1">
                    <span className="font-bold text-sm">F</span>
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">Particionamiento funcional</h4>
                    <p className="text-sm dark:text-slate-300">
                      Separar los datos por dominio funcional (ej: productos, usuarios, pedidos).
                      Se refleja naturalmente en la estructura de una API REST organizada por recursos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
              <p className="text-sm text-gray-600 dark:text-slate-400">
                <strong>Nota:</strong> El particionamiento puede complicar las consultas que cruzan
                múltiples particiones. Considera implementar una capa de agregación o usar bases de
                datos especializadas para consultas análiticas (CQRS).
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold tracking-tight dark:text-white">Circuit Breaker y patrones de resiliencia</h2>

          <p className="mb-4 dark:text-slate-300">
            En entornos distribuidos, los fallos son inevitables. Los patrones de resiliencia
            ayudan a prevenir la propagación de fallos y mantener la estabilidad del sistema.
          </p>

          <div className="mb-8">
            <div className="border border-gray-200 dark:border-slate-700 rounded-md p-4 mb-6 bg-gray-50 dark:bg-slate-900/50">
              <h3 className="font-semibold mb-3 dark:text-white">Circuit Breaker</h3>
              <p className="mb-3 dark:text-slate-300">
                El patrón Circuit Breaker monitorea los fallos en llamadas a servicios externos
                y, cuando la tasa de error supera un umbral, "abre el circuito" para evitar llamadas
                adicionales que probablemente fallarían.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 border dark:border-slate-700 rounded-md p-3 bg-white dark:bg-slate-800">
                  <h4 className="text-sm font-medium mb-2 dark:text-white">Estado Cerrado (Normal)</h4>
                  <p className="text-xs dark:text-slate-300">Las solicitudes fluyen normalmente al servicio</p>
                  <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-md text-xs">
                    GET /api/products → 200 OK
                  </div>
                </div>
                
                <div className="flex-1 border dark:border-slate-700 rounded-md p-3 bg-white dark:bg-slate-800">
                  <h4 className="text-sm font-medium mb-2 dark:text-white">Estado Abierto (Error)</h4>
                  <p className="text-xs dark:text-slate-300">Detecta umbral de errores y falla rápido</p>
                  <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-300 rounded-md text-xs">
                    GET /api/products → 503 Service Unavailable
                  </div>
                </div>
                
                <div className="flex-1 border dark:border-slate-700 rounded-md p-3 bg-white dark:bg-slate-800">
                  <h4 className="text-sm font-medium mb-2 dark:text-white">Estado Semi-abierto</h4>
                  <p className="text-xs dark:text-slate-300">Permite algunas solicitudes para probar recuperación</p>
                  <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 rounded-md text-xs">
                    GET /api/products → 200 OK o 503
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold dark:text-white">Otros patrones de resiliencia</h3>
                <ul className="list-disc pl-6 space-y-2 mt-2 dark:text-slate-300">
                  <li>
                    <strong>Bulkhead:</strong> Aislar componentes para que los fallos no afecten a todo el sistema,
                    por ejemplo, usando pools de conexiones separados para diferentes servicios
                  </li>
                  <li>
                    <strong>Timeout:</strong> Establecer límites de tiempo para operaciones externas para evitar
                    bloqueos indefinidos
                  </li>
                  <li>
                    <strong>Retry con backoff exponencial:</strong> Reintentar operaciones fallidas con
                    intervalos crecientes para evitar sobrecarga durante recuperaciones
                  </li>
                  <li>
                    <strong>Fallback:</strong> Proporcionar respuestas alternativas cuando un servicio no está
                    disponible, como datos en caché o valores predeterminados
                  </li>
                </ul>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/50 border-l-4 border-amber-500 dark:border-amber-600 p-4">
                <h4 className="text-amber-800 dark:text-amber-300 font-medium mb-1">Headers para resiliencia</h4>
                <p className="text-amber-700 dark:text-amber-400 text-sm mb-2">
                  Considera usar headers HTTP para comunicar capacidades de resiliencia entre servicios:
                </p>
                <pre className="text-xs bg-white dark:bg-slate-800 p-2 rounded-md dark:text-slate-300">
{`X-Retry-After: 30
X-Rate-Limit-Remaining: 45
X-Circuit-Breaker-State: closed
X-Degraded-Service: recommendations`}
                </pre>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold tracking-tight dark:text-white">Orquestación y administración de APIs</h2>

          <p className="mb-4 dark:text-slate-300">
            A medida que el ecosistema de APIs crece, se vuelve crucial contar con herramientas
            para gestionar, monitorear y gobernar estas interfaces.
          </p>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="font-semibold dark:text-white">Monitorización y observabilidad</h3>
              <p className="mb-2 dark:text-slate-300">
                Un sistema de monitorización robusto debe abarcar múltiples dimensiones:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="dark:border-slate-700">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2 dark:text-white">Métricas operativas</h4>
                    <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                      <li>Latencia por endpoint y percentiles (p50, p95, p99)</li>
                      <li>Tasa de solicitudes y throughput</li>
                      <li>Tasas de error por tipo y endpoint</li>
                      <li>Utilización de recursos (CPU, memoria, conexiones)</li>
                      <li>Caché hit/miss ratio</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="dark:border-slate-700">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2 dark:text-white">Métricas de negocio</h4>
                    <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                      <li>Actividad por cliente o segmento</li>
                      <li>Conversiones y tasas de éxito</li>
                      <li>Utilización de características específicas</li>
                      <li>Valor de transacciones procesadas</li>
                      <li>SLAs y cumplimiento de contratos</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold dark:text-white">Despliegue y control de versiones</h3>
              <p className="mb-3 dark:text-slate-300">
                Las APIs escalables requieren estrategias de despliegue que minimicen el riesgo
                y permitan evolucionar sin interrumpir a los clientes existentes.
              </p>
              
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-md p-3">
                  <h4 className="font-medium dark:text-white">Despliegues Blue-Green</h4>
                  <p className="text-sm mt-1 dark:text-slate-300">
                    Mantener dos entornos idénticos (blue y green) y cambiar el tráfico de uno a otro
                    durante actualizaciones, permitiendo rollback instantáneo si se detectan problemas.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-md p-3">
                  <h4 className="font-medium dark:text-white">Despliegues Canary</h4>
                  <p className="text-sm mt-1 dark:text-slate-300">
                    Dirigir gradualmente un porcentaje pequeño de tráfico a la nueva versión,
                    monitoreando resultados antes de escalar al 100% de los usuarios.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-md p-3">
                  <h4 className="font-medium dark:text-white">Feature Flags</h4>
                  <p className="text-sm mt-1 dark:text-slate-300">
                    Utilizar interruptores configurables para habilitar o deshabilitar nuevas
                    características sin necesidad de redespliegue, facilitando pruebas A/B y
                    lanzamientos progresivos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold tracking-tight dark:text-white">Estrategias para microservicios REST</h2>

          <p className="mb-4 dark:text-slate-300">
            Los microservicios presentan desafíos únicos para el diseño de APIs REST,
            especialmente en temas de consistencia, comunicación y manejo de dependencias.
          </p>

          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-semibold dark:text-white">Consistency Patterns</h3>
              <div className="space-y-3 mt-2">
                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-md p-3 shadow-sm">
                  <h4 className="font-medium dark:text-white">Saga Pattern</h4>
                  <p className="text-sm mt-1 dark:text-slate-300">
                    Secuencia de transacciones locales donde cada paso publica eventos que 
                    disparan el siguiente paso. Si algún paso falla, se ejecutan transacciones 
                    compensatorias para revertir los cambios.
                  </p>
                  <div className="mt-2 text-xs bg-gray-50 dark:bg-slate-900/50 p-2 rounded-md dark:text-slate-300">
                    <p><strong>Ejemplo:</strong> Proceso de compra que involucra múltiples servicios</p>
                    <ol className="list-decimal pl-6 mt-1 space-y-1">
                      <li>Crear orden (Orders service)</li>
                      <li>Procesar pago (Payments service)</li>
                      <li>Actualizar inventario (Inventory service)</li>
                      <li>Notificar envío (Shipping service)</li>
                    </ol>
                    <p className="mt-1">
                      Si el paso 2 falla, se ejecuta la compensación del paso 1 (cancelar orden).
                    </p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-md p-3 shadow-sm">
                  <h4 className="font-medium dark:text-white">API Composition</h4>
                  <p className="text-sm mt-1 dark:text-slate-300">
                    Un servicio de composición consulta múltiples servicios y combina los resultados,
                    ofreciendo una vista unificada al cliente sin que este tenga que hacer múltiples llamadas.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold dark:text-white">Service Discovery y API Documentation</h3>
              <p className="mb-3 dark:text-slate-300">
                En un entorno de microservicios, mantener la documentación actualizada y permitir
                que los servicios se encuentren entre sí es fundamental.
              </p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium dark:text-white">Service Registry</h4>
                  <p className="text-sm dark:text-slate-300">
                    Implementar un registro centralizado donde los servicios se registren al iniciar
                    y que permita la localización dinámica de endpoints (Consul, Eureka, etcd).
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium dark:text-white">API Documentation automática</h4>
                  <p className="text-sm dark:text-slate-300">
                    Usar herramientas que generen documentación OpenAPI a partir del código fuente
                    y la mantengan sincronizada automáticamente, facilitando el descubrimiento entre servicios.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium dark:text-white">API Contracts y Testing</h4>
                  <p className="text-sm dark:text-slate-300">
                    Implementar pruebas de contrato (como PACT) para verificar que los cambios en un servicio
                    no rompen la integración con otros servicios que dependen de él.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200 dark:border-blue-800 rounded-md p-4 mb-8">
            <h3 className="text-blue-900 dark:text-blue-300 font-medium mb-2">Conclusión</h3>
            <p className="text-blue-800 dark:text-blue-300 mb-3">
              La escalabilidad de una API REST no es solo una cuestión de infraestructura, sino también
              de patrones de diseño, estrategias de caché, monitorización y administración adecuadas.
            </p>
            <p className="text-blue-800 dark:text-blue-300">
              Al aplicar estos patrones de manera estratégica, es posible construir APIs REST que
              soporten un crecimiento significativo en volumen, complejidad y usuarios, manteniendo
              al mismo tiempo un alto rendimiento, disponibilidad y mantenibilidad.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ScalablePatterns;
