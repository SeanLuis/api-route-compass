import { PageLayout } from "@/components/PageLayout";
import { Link } from "react-router-dom";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, ArrowRight } from "lucide-react";

const MethodsOverviewPage = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">Inicio</Link>
            <span className="text-sm text-slate-500 dark:text-slate-400">/</span>
            <span className="text-sm font-medium">Métodos HTTP</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Métodos HTTP</h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Una guía completa sobre el uso adecuado de los métodos HTTP en el diseño de APIs REST.
          </p>
        </div>

        {/* Main content */}
        <section className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300">
            Los métodos HTTP (también conocidos como verbos) definen qué acción se realiza sobre un recurso. 
            Utilizar estos métodos correctamente es clave para crear una API REST bien diseñada y predecible.
          </p>
          
          <Alert className="bg-blue-50 border-blue-100 dark:bg-blue-950/50 dark:border-blue-900/50">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-300">Interfaz uniforme</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              REST utiliza métodos HTTP estándar para proporcionar una interfaz uniforme, lo que hace que las APIs sean 
              más fáciles de entender y utilizar.
            </AlertDescription>
          </Alert>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Resumen de métodos HTTP</h2>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Método</TableHead>
                <TableHead>Propósito</TableHead>
                <TableHead>Idempotente</TableHead>
                <TableHead>Seguro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <Link to="/methods/get" className="text-indigo-600 dark:text-indigo-400 hover:underline">GET</Link>
                </TableCell>
                <TableCell>Recuperar recursos</TableCell>
                <TableCell>✓</TableCell>
                <TableCell>✓</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <Link to="/methods/post" className="text-indigo-600 dark:text-indigo-400 hover:underline">POST</Link>
                </TableCell>
                <TableCell>Crear recursos</TableCell>
                <TableCell>✗</TableCell>
                <TableCell>✗</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <Link to="/methods/put" className="text-indigo-600 dark:text-indigo-400 hover:underline">PUT</Link>
                </TableCell>
                <TableCell>Actualizar recursos (reemplazo total)</TableCell>
                <TableCell>✓</TableCell>
                <TableCell>✗</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <Link to="/methods/patch" className="text-indigo-600 dark:text-indigo-400 hover:underline">PATCH</Link>
                </TableCell>
                <TableCell>Actualizar recursos (parcial)</TableCell>
                <TableCell>✗</TableCell>
                <TableCell>✗</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <Link to="/methods/delete" className="text-indigo-600 dark:text-indigo-400 hover:underline">DELETE</Link>
                </TableCell>
                <TableCell>Eliminar recursos</TableCell>
                <TableCell>✓</TableCell>
                <TableCell>✗</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <Link to="/methods/head" className="text-indigo-600 dark:text-indigo-400 hover:underline">HEAD</Link>
                </TableCell>
                <TableCell>Obtener metadatos (sin cuerpo)</TableCell>
                <TableCell>✓</TableCell>
                <TableCell>✓</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <Link to="/methods/options" className="text-indigo-600 dark:text-indigo-400 hover:underline">OPTIONS</Link>
                </TableCell>
                <TableCell>Determinar opciones de comunicación</TableCell>
                <TableCell>✓</TableCell>
                <TableCell>✓</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <Link to="/methods/trace" className="text-indigo-600 dark:text-indigo-400 hover:underline">TRACE</Link>
                </TableCell>
                <TableCell>Diagnóstico y depuración</TableCell>
                <TableCell>✓</TableCell>
                <TableCell>✓</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            <p><strong>Idempotente:</strong> Realizar la misma operación múltiples veces produce el mismo resultado que hacerlo una vez.</p>
            <p><strong>Seguro:</strong> La operación no modifica recursos en el servidor (solo lectura).</p>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Métodos HTTP en detalle</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MethodCard 
              method="GET" 
              color="green"
              description="Solicita una representación de un recurso específico."
              path="/methods/get"
              example={`GET /api/v1/products/123`}
              characteristics={[
                "Es seguro (solo lectura)",
                "Es idempotente",
                "Puede ser cacheado",
                "No debe contener cuerpo de solicitud"
              ]}
            />
            
            <MethodCard 
              method="POST" 
              color="blue"
              description="Crea un nuevo recurso en el servidor."
              path="/methods/post"
              example={`POST /api/v1/products
{
  "name": "Nuevo Producto",
  "price": 29.99
}`}
              characteristics={[
                "No es seguro (modifica estado)",
                "No es idempotente",
                "Normalmente no se cachea",
                "Contiene cuerpo con datos"
              ]}
            />
            
            <MethodCard 
              method="PUT" 
              color="orange"
              description="Reemplaza todas las representaciones del recurso destino."
              path="/methods/put"
              example={`PUT /api/v1/products/123
{
  "name": "Producto Actualizado",
  "price": 39.99
}`}
              characteristics={[
                "No es seguro (modifica estado)",
                "Es idempotente",
                "Reemplaza completamente el recurso",
                "Requiere identificador de recurso"
              ]}
            />
            
            <MethodCard 
              method="PATCH" 
              color="yellow"
              description="Aplica modificaciones parciales a un recurso."
              path="/methods/patch"
              example={`PATCH /api/v1/products/123
{
  "price": 34.99
}`}
              characteristics={[
                "No es seguro (modifica estado)",
                "Normalmente no es idempotente",
                "Actualiza parcialmente el recurso",
                "Más eficiente para actualizaciones pequeñas"
              ]}
            />
            
            <MethodCard 
              method="DELETE" 
              color="red"
              description="Elimina un recurso específico."
              path="/methods/delete"
              example={`DELETE /api/v1/products/123`}
              characteristics={[
                "No es seguro (modifica estado)",
                "Es idempotente",
                "Puede retornar diferentes códigos (202, 204)",
                "Normalmente no requiere cuerpo"
              ]}
            />
            
            <MethodCard 
              method="HEAD" 
              color="purple"
              description="Igual que GET pero solo retorna los encabezados, sin cuerpo."
              path="/methods/head"
              example={`HEAD /api/v1/products/123`}
              characteristics={[
                "Es seguro (solo lectura)",
                "Es idempotente",
                "Útil para verificar recursos sin descargarlos",
                "Útil para verificar caché"
              ]}
            />
            
            <MethodCard 
              method="OPTIONS" 
              color="indigo"
              description="Describe las opciones de comunicación para el recurso."
              path="/methods/options"
              example={`OPTIONS /api/v1/products`}
              characteristics={[
                "Es seguro (solo lectura)",
                "Es idempotente",
                "Fundamental para CORS (Cross-Origin)",
                "Informa sobre métodos permitidos"
              ]}
            />
            
            <MethodCard 
              method="TRACE" 
              color="teal"
              description="Realiza una prueba de bucle de retorno (loopback) para diagnóstico."
              path="/methods/trace"
              example={`TRACE /api/v1/diagnostic`}
              characteristics={[
                "Es seguro (solo diagnóstico)",
                "Es idempotente",
                "Devuelve la solicitud como respuesta",
                "A menudo deshabilitado por seguridad"
              ]}
            />
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Uso de métodos en URIs</h2>
          
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-base font-medium mb-2">Estructura de URI correcta</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm mb-2 text-green-500">Correcto ✓</h4>
                  <CodeBlock
                    code={`GET /products          # Listar productos
GET /products/123      # Obtener producto
POST /products         # Crear producto
PUT /products/123      # Actualizar producto
DELETE /products/123   # Eliminar producto`}
                    language="http"
                    className="h-[160px]"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2 text-red-500">Incorrecto ❌</h4>
                  <CodeBlock
                    code={`GET /getProducts
POST /createProduct
GET /listAllProducts
PUT /updateProduct/123
GET /products/delete/123
POST /products/123/update`}
                    language="http"
                    className="h-[160px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Buenas prácticas</h2>
          
          <div className="space-y-2">
            <div className="p-3 border rounded-lg dark:border-slate-700">
              <h3 className="font-medium mb-1">Utilizar métodos HTTP apropiados</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Cada método HTTP tiene un propósito específico. Asegúrate de utilizar GET para obtener recursos, 
                POST para crear recursos, PUT para actualizaciones completas, PATCH para actualizaciones parciales 
                y DELETE para eliminar recursos.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg dark:border-slate-700">
              <h3 className="font-medium mb-1">Mantener URIs enfocadas en recursos, no en acciones</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Las URIs deben identificar recursos (sustantivos), no acciones (verbos). Las acciones se comunican 
                mediante los métodos HTTP, no mediante la ruta.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg dark:border-slate-700">
              <h3 className="font-medium mb-1">Respetar la idempotencia</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Los métodos GET, PUT y DELETE deben ser idempotentes. Esto significa que realizar la misma operación 
                múltiples veces debe tener el mismo efecto que hacerla una vez.
              </p>
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Explorar métodos en detalle</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["get", "post", "put", "patch", "delete", "head", "options", "trace"].map((method) => (
              <Link 
                key={method}
                to={`/methods/${method}`} 
                className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors dark:border-slate-700 flex items-center justify-center"
              >
                <span className="font-medium text-indigo-600 dark:text-indigo-400 mr-1">{method.toUpperCase()}</span>
                <ArrowRight className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

// Helper component for displaying HTTP methods
const MethodCard = ({ 
  method, 
  color,
  description, 
  path,
  example,
  characteristics
}: { 
  method: string; 
  color: "green" | "blue" | "orange" | "yellow" | "red" | "purple" | "indigo" | "teal";
  description: string;
  path: string;
  example: string;
  characteristics: string[];
}) => {
  const colorClasses = {
    green: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    orange: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    red: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
    indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300",
    teal: "bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300"
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-md text-sm font-semibold ${colorClasses[color]}`}>{method}</div>
          <CardTitle className="text-lg">{method}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">EJEMPLO</h4>
          <CodeBlock
            code={example}
            language="http"
            className="h-[80px]"
          />
        </div>
        
        <div>
          <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">CARACTERÍSTICAS</h4>
          <ul className="text-xs space-y-1 dark:text-slate-300">
            {characteristics.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-1">•</span> {item}
              </li>
            ))}
          </ul>
        </div>
        
        <Link
          to={path}
          className="mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center"
        >
          Ver documentación detallada <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default MethodsOverviewPage; 