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
        description="El método TRACE realiza una prueba de bucle de retorno (loopback) de mensaje a lo largo de la ruta al recurso de destino. Se utiliza principalmente para diagnóstico y depuración."
        path={["Inicio", "Métodos HTTP", "TRACE"]}
      >
        {/* Características principales */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Es diagnóstico
              </h3>
              <p className="text-sm text-slate-700">
                Permite ver qué recibe el servidor al final de la cadena de solicitud.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Retorno de espejo
              </h3>
              <p className="text-sm text-slate-700">
                Devuelve exactamente lo que se envió, para verificar cambios durante el tránsito.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Es seguro
              </h3>
              <p className="text-sm text-slate-700">
                No modifica recursos en el servidor, solo proporciona información.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <X className="h-4 w-4 text-red-600 mr-2" />
                Restringido por seguridad
              </h3>
              <p className="text-sm text-slate-700">
                Muchos servidores lo deshabilitan por motivos de seguridad.
              </p>
            </div>
          </div>
        </section>
        
        {/* Casos de uso comunes */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Casos de uso comunes</h2>
          
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium mb-2">Diagnóstico de red</h3>
                <p className="text-sm text-slate-600">Verifica cómo llega una solicitud al servidor tras pasar por múltiples proxies</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="TRACE"
                  path="/api/v1/diagnostic"
                  description="Solicitud TRACE para diagnóstico de red"
                  requestExample={`TRACE /api/v1/diagnostic HTTP/1.1
Host: api.ejemplo.com
Custom-Header: valor-personalizado`}
                  responseExample={`HTTP/1.1 200 OK
Content-Type: message/http
Content-Length: 106

TRACE /api/v1/diagnostic HTTP/1.1
Host: api.ejemplo.com
Custom-Header: valor-personalizado
Via: 1.1 proxy.ejemplo.com`}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium mb-2">Depuración de proxy</h3>
                <p className="text-sm text-slate-600">Identifica cambios realizados por proxies intermedios</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="TRACE"
                  path="/api/v1/debug"
                  description="Solicitud TRACE para verificar modificaciones de proxy"
                  responseExample={`HTTP/1.1 200 OK
Content-Type: message/http
Content-Length: 157

TRACE /api/v1/debug HTTP/1.1
Host: api.ejemplo.com
X-Forwarded-For: 192.168.1.1
Via: 1.1 proxy1.ejemplo.com, 1.1 proxy2.ejemplo.com
X-Modified-By: proxy-gateway-001`}
                />
              </div>
            </div>
          </div>
          
          <Alert variant="default" className="bg-red-50 border-red-100">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertTitle className="text-red-800 text-base">Limitaciones de seguridad</AlertTitle>
            <AlertDescription className="text-red-700">
              Debido a vulnerabilidades potenciales (como ataques XST - Cross-Site Tracing), 
              muchos servidores modernos deshabilitan el método TRACE por defecto. Su uso está 
              generalmente limitado a herramientas de diagnóstico y entornos controlados.
            </AlertDescription>
          </Alert>
        </section>
        
        {/* Mejores prácticas */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Mejores prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-800 text-base">Uso restringido</AlertTitle>
            <AlertDescription className="text-blue-700">
              TRACE debe usarse exclusivamente para depuración y diagnóstico en entornos controlados, nunca en producción o en APIs públicas.
            </AlertDescription>
          </Alert>
          
          <div className="mt-6 space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium">Configuración de seguridad</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 p-5">
                <div>
                  <h4 className="font-medium text-sm mb-3 text-green-600">Recomendado ✓</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border">
                    <CodeBlock
                      code={`# Apache: Deshabilitar TRACE en producción
TraceEnable off

# Nginx: Limitar métodos permitidos (excluir TRACE)
if ($request_method !~ ^(GET|POST|PUT|DELETE|OPTIONS)$) {
    return 405;
}`}
                      language="nginx"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-3 text-red-600 mt-4 md:mt-0">Evitar ❌</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border">
                    <CodeBlock
                      code={`# Permitir TRACE en un servidor de producción
TraceEnable on

# No restringir TRACE en entornos públicos
server {
    listen 80;
    # Sin restricciones de método...
}`}
                      language="nginx"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Alert variant="default" className="bg-amber-50 border-amber-100">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <AlertTitle className="text-amber-800 text-base">Alternativas modernas</AlertTitle>
              <AlertDescription className="text-amber-700">
                Para diagnóstico y depuración, considera alternativas más seguras como rutas de API dedicadas que 
                muestran información de encabezados o herramientas de monitoreo de red específicas.
              </AlertDescription>
            </Alert>
          </div>
        </section>
        
        {/* Códigos de estado comunes */}
        <section className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Códigos de estado comunes</h2>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 w-[140px] font-medium">200 OK</td>
                  <td className="p-4 text-sm">La solicitud TRACE se completó con éxito, devolviendo el eco de la solicitud.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">405 Method Not Allowed</td>
                  <td className="p-4 text-sm">El método TRACE está deshabilitado o no es soportado por el servidor.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">403 Forbidden</td>
                  <td className="p-4 text-sm">El servidor rechaza la solicitud TRACE por motivos de seguridad.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">501 Not Implemented</td>
                  <td className="p-4 text-sm">El servidor no implementa el método TRACE.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Vulnerabilidades */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Vulnerabilidades de seguridad</h2>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="p-5 border-b bg-slate-50">
              <h3 className="text-lg font-medium">Cross-Site Tracing (XST)</h3>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-slate-700">
                El ataque Cross-Site Tracing (XST) es una de las razones principales por las que muchos servidores 
                deshabilitan el método TRACE. Esta vulnerabilidad permite a los atacantes robar información como 
                cookies HTTP y tokens de autenticación a través de ataques de scripting entre sitios.
              </p>
              
              <div className="bg-slate-50 rounded-lg p-4 border">
                <h4 className="font-medium text-sm mb-2">Cómo funciona un ataque XST:</h4>
                <ol className="list-decimal list-inside text-sm space-y-2 text-slate-700">
                  <li>El atacante engaña a un usuario para que ejecute un script malicioso.</li>
                  <li>El script realiza una solicitud TRACE al servidor objetivo.</li>
                  <li>El servidor refleja la solicitud, incluyendo todas las cookies del usuario.</li>
                  <li>El script captura esta respuesta y la envía al atacante.</li>
                </ol>
              </div>
              
              <Alert variant="default" className="bg-red-50 border-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <AlertTitle className="text-red-800 text-base">Mitigación</AlertTitle>
                <AlertDescription className="text-red-700">
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Deshabilitar el método TRACE en servidores de producción.</li>
                    <li>Implementar cabeceras HTTP de seguridad como X-XSS-Protection.</li>
                    <li>Utilizar flags HttpOnly para cookies sensibles.</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>
        
        {/* Ejemplo de implementación */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Configuración del servidor</h2>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="p-5 border-b bg-slate-50">
              <h3 className="text-lg font-medium">Deshabilitar TRACE en distintos servidores</h3>
            </div>
            <div className="p-5">
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Apache</h4>
                  <CodeBlock
                    code={`# En archivo httpd.conf o .htaccess
TraceEnable off

# O limitar métodos permitidos
<LimitExcept GET POST PUT DELETE OPTIONS>
    Deny from all
</LimitExcept>`}
                    language="apache"
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Nginx</h4>
                  <CodeBlock
                    code={`# En la configuración del servidor
server {
    # ...
    
    # Rechazar solicitudes TRACE
    if ($request_method = TRACE) {
        return 405;
    }
    
    # Alternativa: limitar a métodos específicos
    if ($request_method !~ ^(GET|POST|PUT|DELETE|OPTIONS)$) {
        return 405;
    }
    
    # ...
}`}
                    language="nginx"
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Express (Node.js)</h4>
                  <CodeBlock
                    code={`// Middleware para rechazar solicitudes TRACE
app.use((req, res, next) => {
  if (req.method === 'TRACE') {
    return res.status(405).send('Method Not Allowed');
  }
  next();
});

// O usando un paquete como method-override
const methodOverride = require('method-override');
const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];

app.use(methodOverride());
app.use((req, res, next) => {
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).send('Method Not Allowed');
  }
  next();
});`}
                    language="javascript"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <Alert className="bg-slate-50 border-slate-100">
            <Info className="h-5 w-5 text-slate-600" />
            <AlertTitle className="text-slate-800 text-base">Entornos de desarrollo</AlertTitle>
            <AlertDescription className="text-slate-700">
              En entornos de desarrollo controlados, puede ser útil habilitar TRACE para fines de depuración y diagnóstico.
              Sin embargo, asegúrate de deshabilitarlo antes de mover el código a un entorno de producción.
            </AlertDescription>
          </Alert>
        </section>
      </PageContent>
    </PageLayout>
  );
};

export default TraceMethodPage; 