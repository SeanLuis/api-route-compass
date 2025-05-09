import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { EndpointExample } from "@/components/EndpointExample";
import { RouteExample } from "@/components/RouteExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const OptionsMethodPage = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Método OPTIONS" 
        description="El método OPTIONS se utiliza para describir las opciones de comunicación con el recurso objetivo. Permite a los clientes determinar los requisitos asociados con un recurso sin iniciar una acción sobre él."
        path={["Inicio", "Métodos HTTP", "OPTIONS"]}
      >
        {/* Características principales */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Es seguro
              </h3>
              <p className="text-sm text-slate-700">
                Las peticiones OPTIONS no modifican recursos en el servidor.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Autodescubrimiento
              </h3>
              <p className="text-sm text-slate-700">
                Permite a los clientes descubrir qué operaciones están disponibles para un recurso.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                CORS Preflight
              </h3>
              <p className="text-sm text-slate-700">
                Utilizado en Cross-Origin Resource Sharing para verificar permisos antes de realizar solicitudes reales.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                No modifica el estado
              </h3>
              <p className="text-sm text-slate-700">
                No tiene efectos secundarios en el servidor y es idempotente.
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
                <h3 className="text-lg font-medium mb-2">Descubrir métodos permitidos</h3>
                <p className="text-sm text-slate-600">Obtiene información sobre los métodos HTTP que acepta un recurso</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="OPTIONS"
                  path="/api/v1/products/prod_123"
                  description="Consulta los métodos permitidos para un producto específico"
                  responseExample={`HTTP/1.1 200 OK
Allow: GET, HEAD, PUT, PATCH, DELETE, OPTIONS
Content-Length: 0
Access-Control-Allow-Methods: GET, HEAD, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400`}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium mb-2">CORS Preflight</h3>
                <p className="text-sm text-slate-600">Verificación previa para solicitudes de origen cruzado</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="OPTIONS"
                  path="/api/v1/users"
                  description="Verifica los permisos CORS antes de una solicitud POST de origen cruzado"
                  requestExample={`OPTIONS /api/v1/users HTTP/1.1
Host: api.ejemplo.com
Origin: https://app.ejemplo.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization`}
                  responseExample={`HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.ejemplo.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
Vary: Origin, Access-Control-Request-Method, Access-Control-Request-Headers`}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium mb-2">Información de la API</h3>
                <p className="text-sm text-slate-600">Obtiene información detallada sobre las capacidades del recurso</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="OPTIONS"
                  path="/api/v1"
                  description="Consulta información general sobre la API"
                  responseExample={`HTTP/1.1 200 OK
Allow: GET, OPTIONS
Content-Type: application/json

{
  "name": "API de Productos",
  "version": "1.0",
  "resources": [
    {
      "path": "/products",
      "methods": ["GET", "POST", "OPTIONS"],
      "description": "Colección de productos"
    },
    {
      "path": "/products/{id}",
      "methods": ["GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
      "description": "Producto individual"
    }
  ],
  "documentation": "https://api.ejemplo.com/docs"
}`}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Mejores prácticas */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Mejores prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-800 text-base">Configuración de CORS</AlertTitle>
            <AlertDescription className="text-blue-700">
              Una implementación correcta de OPTIONS es fundamental para aplicaciones que utilizan CORS. Devuelve siempre los encabezados apropiados para permitir el acceso entre dominios cuando sea necesario.
            </AlertDescription>
          </Alert>
          
          <div className="mt-6 space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium">Cabeceras correctas</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 p-5">
                <div>
                  <h4 className="font-medium text-sm mb-3 text-green-600">Correcto ✓</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border">
                    <CodeBlock
                      code={`// Respuesta OPTIONS para CORS
Access-Control-Allow-Origin: https://ejemplo.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400

// Respuesta OPTIONS descriptiva
Allow: GET, POST, PUT, DELETE, OPTIONS
Content-Type: application/json
{ "supportedOperations": [...] }`}
                      language="http"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-3 text-red-600 mt-4 md:mt-0">Incorrecto ❌</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border">
                    <CodeBlock
                      code={`// CORS demasiado permisivo
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: *
Access-Control-Allow-Headers: *

// Respuesta OPTIONS sin cabeceras Allow o Access-Control
HTTP/1.1 200 OK
Content-Type: text/plain

"OK"`}
                      language="http"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Alert variant="default" className="bg-amber-50 border-amber-100">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <AlertTitle className="text-amber-800 text-base">Rendimiento</AlertTitle>
              <AlertDescription className="text-amber-700">
                La solicitud preflight OPTIONS en CORS añade latencia adicional. Configura el encabezado Access-Control-Max-Age adecuadamente para permitir que los navegadores almacenen en caché los resultados y reduzcan el número de solicitudes OPTIONS.
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
                  <td className="p-4 text-sm">Respuesta que incluye información sobre las opciones de comunicación.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">204 No Content</td>
                  <td className="p-4 text-sm">Respuesta común para solicitudes preflight CORS que solo incluye cabeceras.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">403 Forbidden</td>
                  <td className="p-4 text-sm">El cliente no tiene permisos para acceder a las opciones del recurso.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">404 Not Found</td>
                  <td className="p-4 text-sm">El recurso sobre el que se solicitan las opciones no existe.</td>
                </tr>
                <tr>
                  <td className="p-4 bg-slate-50 font-medium">405 Method Not Allowed</td>
                  <td className="p-4 text-sm">El método OPTIONS no está permitido para este recurso.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* CORS y OPTIONS */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">CORS y OPTIONS</h2>
          
          <p className="text-slate-700">
            El método OPTIONS juega un papel crucial en el mecanismo de Cross-Origin Resource Sharing (CORS), 
            que permite a los sitios web realizar solicitudes a dominios diferentes al suyo propio de manera segura.
          </p>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="p-5 border-b bg-slate-50">
              <h3 className="text-lg font-medium">Flujo de CORS con Preflight</h3>
            </div>
            <div className="p-5">
              <ol className="space-y-4">
                <li className="pl-9 relative text-slate-700">
                  <span className="absolute left-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-medium">1</span>
                  <span className="font-medium">Intención de solicitud:</span> El navegador detecta que una solicitud JavaScript necesita acceder a un dominio diferente.
                </li>
                <li className="pl-9 relative text-slate-700">
                  <span className="absolute left-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-medium">2</span>
                  <span className="font-medium">Preflight OPTIONS:</span> El navegador envía automáticamente una solicitud OPTIONS con encabezados que describen la solicitud real que se desea realizar.
                </li>
                <li className="pl-9 relative text-slate-700">
                  <span className="absolute left-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-medium">3</span>
                  <span className="font-medium">Evaluación del servidor:</span> El servidor evalúa la solicitud OPTIONS y responde con los encabezados Access-Control-* apropiados.
                </li>
                <li className="pl-9 relative text-slate-700">
                  <span className="absolute left-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-medium">4</span>
                  <span className="font-medium">Decisión del navegador:</span> Si los encabezados del servidor permiten la solicitud, el navegador procede con la solicitud real. Si no, la bloquea.
                </li>
                <li className="pl-9 relative text-slate-700">
                  <span className="absolute left-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-medium">5</span>
                  <span className="font-medium">Caché de preflight:</span> El navegador puede almacenar en caché la respuesta preflight según el valor de Access-Control-Max-Age.
                </li>
              </ol>
            </div>
          </div>
        </section>
        
        {/* Ejemplo de implementación */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Ejemplo de implementación</h2>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="p-5 border-b bg-slate-50">
              <h3 className="text-lg font-medium">Implementación en Express (Node.js)</h3>
            </div>
            <div className="p-5">
              <CodeBlock
                code={`// Configuración de CORS con respuestas OPTIONS en Express
const express = require('express');
const app = express();

// Middleware para manejar CORS
app.use((req, res, next) => {
  // Origen permitido (ajustar según necesidades)
  res.header('Access-Control-Allow-Origin', 'https://miapp.com');
  
  // Encabezados permitidos
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Métodos permitidos
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  // Permitir credenciales (cookies, cabeceras de autorización)
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Tiempo de caché para respuestas preflight (en segundos)
  res.header('Access-Control-Max-Age', '86400');
  
  // Manejar solicitudes OPTIONS automáticamente
  if (req.method === 'OPTIONS') {
    // Responder a la solicitud preflight sin seguir adelante
    return res.status(204).end();
  }
  
  next();
});

// Ejemplo de ruta que implementa OPTIONS explícitamente
app.options('/api/resources/:id', (req, res) => {
  // Obtener información específica del recurso
  const resourceId = req.params.id;
  const resource = getResourceById(resourceId);
  
  if (!resource) {
    return res.status(404).end();
  }
  
  // Determinar métodos permitidos según el estado del recurso
  let allowedMethods = 'GET, HEAD, OPTIONS';
  if (resource.canEdit) {
    allowedMethods += ', PUT, PATCH';
  }
  if (resource.canDelete) {
    allowedMethods += ', DELETE';
  }
  
  // Establecer encabezado Allow con métodos permitidos
  res.header('Allow', allowedMethods);
  
  // También puede devolver un cuerpo con información adicional
  res.json({
    resource_id: resourceId,
    allowed_methods: allowedMethods.split(', '),
    description: 'Resource API endpoint'
  });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});`}
                language="javascript"
              />
            </div>
          </div>
          
          <Alert className="bg-slate-50 border-slate-100">
            <Info className="h-5 w-5 text-slate-600" />
            <AlertTitle className="text-slate-800 text-base">Nota sobre personalización</AlertTitle>
            <AlertDescription className="text-slate-700">
              Aunque muchos frameworks manejan automáticamente las solicitudes OPTIONS para CORS, implementar 
              manejadores OPTIONS personalizados te permite proporcionar información más detallada sobre 
              las capacidades de tu API y adaptarte a requisitos específicos de seguridad.
            </AlertDescription>
          </Alert>
        </section>
      </PageContent>
    </PageLayout>
  );
};

export default OptionsMethodPage; 