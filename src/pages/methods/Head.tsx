import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { EndpointExample } from "@/components/EndpointExample";
import { RouteExample } from "@/components/RouteExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const HeadMethodPage = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Método HEAD" 
        description="El método HEAD es idéntico a GET, pero el servidor NO devuelve el cuerpo en la respuesta. Se utiliza para obtener metadatos sin transferir todo el contenido."
        path={["Inicio", "Métodos HTTP", "HEAD"]}
      >
        {/* Características principales */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Es seguro
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Las peticiones HEAD no modifican recursos en el servidor.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Es cacheable
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Las respuestas a peticiones HEAD pueden ser almacenadas en caché, al igual que GET.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Más eficiente que GET
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Reduce la transferencia de datos al omitir el cuerpo de la respuesta.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 dark:bg-slate-950/50 dark:hover:bg-slate-900/50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                Identical headers to GET
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Proporciona los mismos encabezados de respuesta que una solicitud GET equivalente.
              </p>
            </div>
          </div>
        </section>
        
        {/* Casos de uso comunes */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Casos de uso comunes</h2>
          
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium mb-2">Verificar disponibilidad de recursos</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Comprueba si un recurso existe sin descargar su contenido</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="HEAD"
                  path="/api/v1/products/prod_123"
                  description="Verifica si un producto específico existe"
                  responseExample={`HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 237
Last-Modified: 2023-10-15T09:30:00Z
ETag: "a1b2c3d4e5f6"
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99

[No body returned]`}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium mb-2">Comprobar actualizaciones</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Verifica si un recurso ha sido modificado utilizando cabeceras de caché</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="HEAD"
                  path="/api/v1/products/prod_123"
                  description="Verifica si un producto ha sido actualizado desde la última petición"
                  responseExample={`HTTP/1.1 304 Not Modified
ETag: "a1b2c3d4e5f6"
Last-Modified: 2023-10-15T09:30:00Z
Cache-Control: max-age=3600
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99

[No body returned]`}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium mb-2">Verificar tamaño de archivos</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Comprueba el tamaño de un archivo antes de descargarlo</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="HEAD"
                  path="/api/v1/files/report_2023.pdf"
                  description="Obtiene el tamaño del archivo sin descargarlo"
                  responseExample={`HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Length: 1048576
Content-Disposition: attachment; filename="report_2023.pdf"
Accept-Ranges: bytes
Last-Modified: 2023-11-01T14:25:00Z

[No body returned]`}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Mejores prácticas */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Mejores prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100 dark:bg-blue-950/50 dark:border-blue-900/50">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-300 text-base">Coherencia con GET</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              Cualquier encabezado que devuelva GET para un recurso también debe devolverse con HEAD. Sin embargo, el cuerpo de la respuesta debe omitirse.
            </AlertDescription>
          </Alert>
          
          <div className="mt-6 space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-medium">Utilizar para verificación previa</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 p-5">
                <div>
                  <h4 className="font-medium text-sm mb-3 text-green-600">Correcto ✓</h4>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border">
                    <CodeBlock
                      code={`// Verificar si un archivo existe y su tamaño antes de descargarlo
HEAD /api/v1/files/large-report.pdf

// Comprobar si ha cambiado un recurso con If-Modified-Since
HEAD /api/v1/products/12345
If-Modified-Since: Wed, 21 Oct 2023 07:28:00 GMT`}
                      language="http"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-3 text-red-600 mt-4 md:mt-0">Incorrecto ❌</h4>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border">
                    <CodeBlock
                      code={`// Enviar un cuerpo en la petición HEAD
HEAD /api/v1/products
Content-Type: application/json
{ "category": "electronics" }

// Usar HEAD para operaciones que modifican recursos
HEAD /api/v1/products/12345/delete`}
                      language="http"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Alert variant="default" className="bg-amber-50 border-amber-100 dark:bg-amber-950/50 dark:border-amber-900/50">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <AlertTitle className="text-amber-800 dark:text-amber-300 text-base">Rendimiento</AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-400">
                Aunque HEAD es más eficiente que GET para verificar metadatos, sigue consumiendo recursos del servidor. 
                Evita hacer solicitudes HEAD excesivas en bucles o a intervalos muy frecuentes.
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
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 w-[140px] font-medium">200 OK</td>
                  <td className="p-4 text-sm">El recurso existe y está disponible.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">304 Not Modified</td>
                  <td className="p-4 text-sm">El recurso no ha cambiado desde la última solicitud (usado con caché).</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">404 Not Found</td>
                  <td className="p-4 text-sm">El recurso solicitado no existe.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">403 Forbidden</td>
                  <td className="p-4 text-sm">El cliente no tiene permisos para acceder al recurso.</td>
                </tr>
                <tr>
                  <td className="p-4 bg-slate-50 dark:bg-slate-900 font-medium">500 Internal Server Error</td>
                  <td className="p-4 text-sm">Error del servidor al procesar la solicitud.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Comparativa con GET */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Comparativa con GET</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white dark:bg-slate-800 shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900">
                  <th className="p-4 text-left font-medium text-slate-600 dark:text-slate-300">Característica</th>
                  <th className="p-4 text-left font-medium text-slate-600 dark:text-slate-300">HEAD</th>
                  <th className="p-4 text-left font-medium text-slate-600 dark:text-slate-300">GET</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4 font-medium">Devuelve cuerpo</td>
                  <td className="p-4">No</td>
                  <td className="p-4">Sí</td>
                </tr>
                <tr className="border-t bg-slate-50 dark:bg-slate-900">
                  <td className="p-4 font-medium">Devuelve encabezados</td>
                  <td className="p-4">Sí</td>
                  <td className="p-4">Sí</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">Uso típico</td>
                  <td className="p-4">Verificar metadatos, disponibilidad</td>
                  <td className="p-4">Obtener el recurso completo</td>
                </tr>
                <tr className="border-t bg-slate-50 dark:bg-slate-900">
                  <td className="p-4 font-medium">Eficiencia en red</td>
                  <td className="p-4">Mayor (menor transferencia de datos)</td>
                  <td className="p-4">Menor (transferencia completa)</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">Idempotente</td>
                  <td className="p-4">Sí</td>
                  <td className="p-4">Sí</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Ejemplo de implementación */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Ejemplo de implementación</h2>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="p-5 border-b bg-slate-50 dark:bg-slate-900">
              <h3 className="text-lg font-medium">Implementación en Express (Node.js)</h3>
            </div>
            <div className="p-5">
              <CodeBlock
                code={`// Implementación del método HEAD para verificar existencia de productos
const express = require('express');
const router = express.Router();

// Esta ruta maneja tanto GET como HEAD automáticamente
router.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await db.products.findOne({ id: productId });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Configurar encabezados relevantes
    res.set({
      'ETag': \`"$\{product.version}"\`,
      'Last-Modified': product.updatedAt.toUTCString(),
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=3600'
    });
    
    // Para HEAD, Express omitirá automáticamente el cuerpo
    // Para GET, enviamos el producto completo
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;`}
                language="javascript"
              />
            </div>
          </div>
          
          <Alert className="bg-slate-50 border-slate-100 dark:bg-slate-900/50 dark:border-slate-800">
            <Info className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <AlertTitle className="text-slate-800 dark:text-slate-200 text-base">Nota sobre Express</AlertTitle>
            <AlertDescription className="text-slate-700 dark:text-slate-300">
              Express maneja automáticamente las solicitudes HEAD para rutas GET existentes. 
              Si se realiza una solicitud HEAD a una ruta que tiene un controlador GET, Express ejecutará ese controlador 
              pero omitirá el cuerpo de la respuesta. Si necesitas comportamiento personalizado para HEAD, puedes definir un controlador específico.
            </AlertDescription>
          </Alert>
        </section>
      </PageContent>
    </PageLayout>
  );
};

export default HeadMethodPage; 