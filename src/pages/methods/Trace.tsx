import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { EndpointExample } from "@/components/EndpointExample";
import { RouteExample } from "@/components/RouteExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const TraceMethodPage = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Método TRACE" 
        description="El método TRACE realiza una prueba de bucle de retorno (loopback) de mensaje a lo largo del camino al recurso de destino. Se utiliza principalmente con fines de diagnóstico para ver qué reciben los servidores intermedios y cómo modifican la solicitud."
        path={["Inicio", "Métodos HTTP", "TRACE"]}
      >
        {/* Características principales */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Diagnóstico
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Permite depurar y ver cómo llega la solicitud al servidor.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Es idempotente
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Múltiples solicitudes idénticas tienen el mismo efecto.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Es seguro
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                No altera ningún recurso en el servidor (solo lectura).
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <X className="h-4 w-4 text-red-600 dark:text-red-500 mr-2" />
                Habitualmente deshabilitado
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Por motivos de seguridad, muchos servidores lo tienen desactivado.
              </p>
            </div>
          </div>
        </section>
        
        {/* Uso y propósito */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Uso y propósito</h2>
          
          <p className="text-slate-700 dark:text-slate-300">
            El método TRACE es principalmente una herramienta de diagnóstico. Cuando se envía una solicitud TRACE, 
            el destinatario debe reflejar en el cuerpo de la respuesta el contenido exacto de la solicitud. 
            Esto permite al cliente ver qué se recibió en el otro extremo y determinar si y cómo los 
            servidores intermedios modificaron la solicitud.
          </p>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
              <h3 className="text-lg font-medium">Principales casos de uso</h3>
            </div>
            <div className="p-5">
              <ul className="space-y-4">
                <li className="pl-9 relative text-slate-700 dark:text-slate-300">
                  <span className="absolute left-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm font-medium">1</span>
                  <span className="font-medium">Depuración de proxies</span>: Identificar si los proxies intermedios están modificando las cabeceras HTTP.
                </li>
                <li className="pl-9 relative text-slate-700 dark:text-slate-300">
                  <span className="absolute left-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm font-medium">2</span>
                  <span className="font-medium">Verificar modificaciones</span>: Comprobar cómo los balanceadores de carga o CDNs están modificando las solicitudes.
                </li>
                <li className="pl-9 relative text-slate-700 dark:text-slate-300">
                  <span className="absolute left-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm font-medium">3</span>
                  <span className="font-medium">Testing de redes</span>: Verificar la conectividad y el comportamiento de la red entre cliente y servidor.
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Ejemplo de solicitud */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Ejemplo de solicitud y respuesta</h2>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
              <h3 className="text-lg font-medium mb-2">Solicitud TRACE básica</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Ejemplo de una solicitud TRACE para diagnóstico</p>
            </div>
            <div className="p-5">
              <EndpointExample 
                method="TRACE"
                path="/api/v1/diagnostics"
                description="Realiza un diagnóstico de la ruta de red al servidor"
                requestExample={`TRACE /api/v1/diagnostics HTTP/1.1
Host: api.ejemplo.com
X-Custom-Header: valor-personalizado`}
                responseExample={`HTTP/1.1 200 OK
Content-Type: message/http
Content-Length: 123

TRACE /api/v1/diagnostics HTTP/1.1
Host: api.ejemplo.com
X-Custom-Header: valor-personalizado
X-Forwarded-For: 192.168.1.1
Via: 1.1 proxy.ejemplo.com (Proxy Server 1.0)`}
              />
            </div>
          </div>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100 dark:bg-blue-950/50 dark:border-blue-900/50">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-300 text-base">Formato de la respuesta</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              La respuesta a una solicitud TRACE debe tener el tipo de contenido <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/50 rounded">message/http</code> y 
              contener en el cuerpo un mensaje que incluya todos los encabezados recibidos, incluidos los que fueron 
              agregados por proxies intermedios.
            </AlertDescription>
          </Alert>
        </section>
        
        {/* Consideraciones de seguridad */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Consideraciones de seguridad</h2>
          
          <Alert variant="default" className="bg-amber-50 border-amber-100 dark:bg-amber-950/50 dark:border-amber-900/50">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <AlertTitle className="text-amber-800 dark:text-amber-300 text-base">Ataques XST (Cross-Site Tracing)</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-400">
              El método TRACE puede ser utilizado en ataques de Cross-Site Tracing (XST). Estos ataques combinan el uso 
              de TRACE con Cross-Site Scripting (XSS) para robar cookies y otra información sensible, incluso si están 
              protegidas con el flag HttpOnly.
            </AlertDescription>
          </Alert>
          
          <div className="border rounded-lg overflow-hidden shadow-sm mt-6">
            <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
              <h3 className="text-lg font-medium">Por qué se deshabilita TRACE</h3>
            </div>
            <div className="p-5">
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Debido a los riesgos de seguridad, muchos servidores web deshabilitan el método TRACE por defecto:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-slate-700 dark:text-slate-300">
                  <span className="mr-2 text-red-500">•</span>
                  En Apache, se puede deshabilitar usando la directiva <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">TraceEnable Off</code>
                </li>
                <li className="flex items-start text-slate-700 dark:text-slate-300">
                  <span className="mr-2 text-red-500">•</span>
                  En Nginx, TRACE no está habilitado por defecto
                </li>
                <li className="flex items-start text-slate-700 dark:text-slate-300">
                  <span className="mr-2 text-red-500">•</span>
                  En Microsoft IIS, se puede deshabilitar a través de la configuración de WebDAV
                </li>
              </ul>
              
              <div className="mt-5 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                <h4 className="font-medium mb-2">Ejemplo de deshabilitación en Apache:</h4>
                <CodeBlock
                  code={`# Archivo: apache2.conf o httpd.conf
TraceEnable Off`}
                  language="apache"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Alternativas a TRACE */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Alternativas seguras</h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Dado que TRACE suele estar deshabilitado por razones de seguridad, existen alternativas más seguras para 
            lograr diagnósticos similares:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b">
                <h3 className="font-medium">Endpoint de eco personalizado</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                  Implementa un endpoint específico que refleje información de la solicitud de forma controlada.
                </p>
                <CodeBlock
                  code={`// Ejemplo en Express.js
app.get('/api/diagnostic/echo', (req, res) => {
  const requestInfo = {
    headers: req.headers,
    ip: req.ip,
    protocol: req.protocol,
    method: req.method,
    path: req.path,
    query: req.query
  };
  
  res.json({
    message: 'Información de diagnóstico',
    request: requestInfo
  });
});`}
                  language="javascript"
                />
              </div>
            </div>
            
            <div className="border rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b">
                <h3 className="font-medium">Herramientas de monitoreo de red</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                  Utiliza herramientas de monitoreo de red que proporcionen datos más completos y seguros.
                </p>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span><strong>Developer Tools:</strong> Las herramientas para desarrolladores del navegador (Network tab)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span><strong>Wireshark:</strong> Para análisis detallado del tráfico de red</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span><strong>Proxies de depuración:</strong> Como Charles Proxy, Fiddler o mitmproxy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span><strong>Herramientas de línea de comandos:</strong> Como curl con la opción -v (verbose)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Códigos de estado comunes */}
        <section className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Códigos de estado comunes</h2>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 w-[140px] font-medium">200 OK</td>
                  <td className="p-4 text-sm">La solicitud TRACE se completó correctamente.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">405 Method Not Allowed</td>
                  <td className="p-4 text-sm">El método TRACE está deshabilitado en el servidor.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">403 Forbidden</td>
                  <td className="p-4 text-sm">El servidor entendió la solicitud pero se niega a autorizarla.</td>
                </tr>
                <tr>
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">501 Not Implemented</td>
                  <td className="p-4 text-sm">El servidor no soporta la funcionalidad requerida para el método TRACE.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Soporte en APIs modernas */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Soporte en APIs modernas</h2>
          
          <Alert className="bg-slate-50 border-slate-100 dark:bg-slate-900/50 dark:border-slate-800">
            <Info className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <AlertTitle className="text-slate-800 dark:text-slate-200 text-base">Uso limitado</AlertTitle>
            <AlertDescription className="text-slate-700 dark:text-slate-300">
              En las APIs REST modernas, el método TRACE raramente se utiliza como parte de la interfaz pública.
              Se prefieren otros métodos de diagnóstico más específicos y seguros.
            </AlertDescription>
          </Alert>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
              <h3 className="text-lg font-medium">Mejores opciones para diagnóstico de APIs</h3>
            </div>
            <div className="p-5">
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">•</span>
                  <div>
                    <span className="font-medium">Endpoints de health check</span>
                    <p className="mt-1 text-sm">Implementa endpoints específicos para verificar el estado y la conectividad.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">•</span>
                  <div>
                    <span className="font-medium">Logs detallados</span>
                    <p className="mt-1 text-sm">Registra información de solicitudes y respuestas para análisis posterior.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">•</span>
                  <div>
                    <span className="font-medium">Tracing distribuido</span>
                    <p className="mt-1 text-sm">Utiliza herramientas como Jaeger, Zipkin o AWS X-Ray para seguimiento de solicitudes.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">•</span>
                  <div>
                    <span className="font-medium">Métricas y monitorización</span>
                    <p className="mt-1 text-sm">Implementa sistemas de métricas como Prometheus con Grafana para visualizar el comportamiento.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Relacionados */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/methods/options" className="block p-5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Método OPTIONS</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Determinar funcionalidades de comunicación</p>
            </Link>
            <Link to="/methods/head" className="block p-5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Método HEAD</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Obtener encabezados sin cuerpo de respuesta</p>
            </Link>
            <Link to="/security/cors" className="block p-5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="font-medium mb-2">Seguridad CORS</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Prevenir ataques cross-site</p>
            </Link>
          </div>
        </section>
      </PageContent>
    </PageLayout>
  );
};

export default TraceMethodPage; 