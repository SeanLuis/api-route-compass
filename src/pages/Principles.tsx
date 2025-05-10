import { PageLayout } from "@/components/PageLayout";
import { Link } from "react-router-dom";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Info, Server, Layers, Database, Globe, ArrowRight } from "lucide-react";

const PrinciplesPage = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">Inicio</Link>
            <span className="text-sm text-slate-500 dark:text-slate-400">/</span>
            <span className="text-sm font-medium dark:text-slate-300">Principios REST</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Principios de Diseño REST</h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Fundamentos y conceptos clave para construir APIs REST escalables y mantenibles.
          </p>
        </div>

        {/* Main content */}
        <section className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-100 dark:border-blue-800 rounded-lg">
            <div className="flex items-start">
              <div className="mr-4 p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                <Lightbulb className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-1">¿Qué es REST?</h2>
                <p className="text-slate-700 dark:text-slate-300">
                  REST (Representational State Transfer) es un estilo de arquitectura para sistemas distribuidos
                  definido por Roy Fielding en 2000. Establece un conjunto de restricciones y principios que, cuando
                  se aplican en conjunto, proporcionan un diseño de API escalable, simple y fácil de entender.
                </p>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold tracking-tight mt-8">Restricciones Arquitectónicas</h2>
          <p className="text-slate-700 dark:text-slate-300">
            REST se define por seis restricciones arquitectónicas que, cuando se observan, permiten crear
            sistemas de alta performance, escalabilidad, simplicidad, modificabilidad, visibilidad, portabilidad y fiabilidad.
          </p>
          
          <div className="grid gap-5 mt-6">
            <PrincipleCard 
              icon={<Layers className="h-5 w-5 text-blue-600" />}
              title="Cliente-Servidor"
              description="La separación de responsabilidades entre cliente y servidor permite que evolucionen independientemente."
              example="Los clientes no deben preocuparse por el almacenamiento de datos, mientras que el servidor no debe preocuparse por la interfaz de usuario."
            />
            
            <PrincipleCard 
              icon={<Server className="h-5 w-5 text-blue-600" />}
              title="Sin Estado"
              description="Cada solicitud del cliente debe contener toda la información necesaria para entender y completar la solicitud."
              example="El servidor no almacena contexto entre solicitudes. La autenticación y estado de sesión se manejan a través de tokens o identificadores pasados en cada solicitud."
            />
            
            <PrincipleCard 
              icon={<Database className="h-5 w-5 text-blue-600" />}
              title="Cacheable"
              description="Las respuestas deben definir si son cacheables o no para mejorar la eficiencia y escalabilidad."
              example="Utilizar cabeceras HTTP como Cache-Control, ETag y Last-Modified para controlar el comportamiento del caché."
            />
            
            <PrincipleCard 
              icon={<Layers className="h-5 w-5 text-blue-600" />}
              title="Interfaz Uniforme"
              description="Simplifica la arquitectura del sistema y mejora la visibilidad de las interacciones."
              example="Uso consistente de URIs para identificación de recursos, manipulación mediante representaciones, mensajes autodescriptivos e HATEOAS."
            />
            
            <PrincipleCard 
              icon={<Layers className="h-5 w-5 text-blue-600" />}
              title="Sistema de Capas"
              description="Permite que la arquitectura esté compuesta por capas jerárquicas, mejorando la escalabilidad."
              example="Balanceadores de carga, caches compartidos, y servidores de autenticación que pueden agregarse sin modificar el sistema."
            />
            
            <PrincipleCard 
              icon={<Globe className="h-5 w-5 text-blue-600" />}
              title="Código bajo Demanda (opcional)"
              description="Permite extender la funcionalidad del cliente descargando y ejecutando código."
              example="Enviar JavaScript o applets al cliente para extender su funcionalidad (aunque es menos común en las APIs actuales)."
            />
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Recursos y Representaciones</h2>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="dark:text-slate-300">
              Un concepto fundamental en REST es que la interacción se centra en los recursos y sus representaciones:
            </p>
            
            <ul className="dark:text-slate-300">
              <li>
                <strong>Recursos</strong>: Cualquier información que pueda ser nombrada puede ser un recurso: un documento, 
                una imagen, un servicio, una colección de otros recursos, etc.
              </li>
              <li>
                <strong>Representaciones</strong>: Los estados actual o deseados de un recurso, típicamente un documento 
                que captura el estado actual o previsto de un recurso.
              </li>
            </ul>

            <Alert className="my-6 bg-blue-50 dark:bg-blue-950/50 border-blue-100 dark:border-blue-800">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle className="text-blue-800 dark:text-blue-300">Identificación de recursos</AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-400">
                Cada recurso debe ser identificable a través de una URL única. 
                Por ejemplo, <code className="dark:text-blue-300">/users/123</code> identifica al usuario con ID 123.
              </AlertDescription>
            </Alert>
            
            <p className="dark:text-slate-300">
              La separación entre recursos y sus representaciones permite:
            </p>

            <ul className="dark:text-slate-300">
              <li>Servir el mismo recurso en diferentes formatos (JSON, XML, HTML)</li>
              <li>Evolucionar las representaciones sin cambiar el identificador del recurso</li>
              <li>Conservar enlaces estables a lo largo del tiempo</li>
            </ul>
          </div>
          
          <div className="mt-6">
            <h3 className="text-base font-medium mb-2">Ejemplo de representaciones de un mismo recurso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-2 text-slate-600 dark:text-slate-400">Representación JSON</h4>
                <CodeBlock
                  code={`{
  "id": "user_123",
  "name": "Ana García",
  "email": "ana@example.com",
  "role": "admin",
  "created_at": "2023-01-15T14:30:00Z"
}`}
                  language="json"
                  className="h-[150px]"
                />
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2 text-slate-600 dark:text-slate-400">Representación XML</h4>
                <CodeBlock
                  code={`<user>
  <id>user_123</id>
  <n>Ana García</n>
  <email>ana@example.com</email>
  <role>admin</role>
  <created_at>2023-01-15T14:30:00Z</created_at>
</user>`}
                  language="xml"
                  className="h-[150px]"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Métodos HTTP</h2>
          
          <p className="text-slate-700 dark:text-slate-300">
            REST utiliza los métodos HTTP para definir acciones sobre los recursos.
            Los métodos principales, también conocidos como verbos HTTP, proporcionan una interfaz uniforme para interactuar con recursos:
          </p>
          
          <div className="grid gap-3 mt-4">
            <div className="p-3 border dark:border-slate-700 rounded-md dark:bg-slate-900/50">
              <div className="flex items-center">
                <div className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-xs font-semibold mr-3">GET</div>
                <h3 className="font-medium dark:text-white">Consultar recursos</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Recupera la representación de un recurso sin modificarlo.
              </p>
            </div>
            
            <div className="p-3 border dark:border-slate-700 rounded-md dark:bg-slate-900/50">
              <div className="flex items-center">
                <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded text-xs font-semibold mr-3">POST</div>
                <h3 className="font-medium dark:text-white">Crear recursos</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Crea un nuevo recurso a partir de la representación proporcionada.
              </p>
            </div>
            
            <div className="p-3 border dark:border-slate-700 rounded-md dark:bg-slate-900/50">
              <div className="flex items-center">
                <div className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-300 rounded text-xs font-semibold mr-3">PUT</div>
                <h3 className="font-medium dark:text-white">Actualizar recursos (reemplazar)</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Reemplaza completamente un recurso existente con la representación proporcionada.
              </p>
            </div>
            
            <div className="p-3 border dark:border-slate-700 rounded-md dark:bg-slate-900/50">
              <div className="flex items-center">
                <div className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 rounded text-xs font-semibold mr-3">PATCH</div>
                <h3 className="font-medium dark:text-white">Actualizar recursos (parcial)</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Aplica modificaciones parciales a un recurso existente.
              </p>
            </div>
            
            <div className="p-3 border dark:border-slate-700 rounded-md dark:bg-slate-900/50">
              <div className="flex items-center">
                <div className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded text-xs font-semibold mr-3">DELETE</div>
                <h3 className="font-medium dark:text-white">Eliminar recursos</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Elimina un recurso existente.
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <Link 
              to="/methods" 
              className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              Ver documentación detallada de métodos HTTP <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Siguientes pasos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/route-structure" className="p-4 border dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 group">
              <h3 className="font-medium mb-1 flex items-center dark:text-white">
                Estructura de Rutas 
                <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Aprende a diseñar una estructura de rutas clara y consistente
              </p>
            </Link>
            
            <Link to="/versioning" className="p-4 border dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 group">
              <h3 className="font-medium mb-1 flex items-center dark:text-white">
                Versionado 
                <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Explora estrategias para versionar tus APIs correctamente
              </p>
            </Link>
            
            <Link to="/status-codes" className="p-4 border dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 group">
              <h3 className="font-medium mb-1 flex items-center dark:text-white">
                Códigos de Estado 
                <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Conoce los códigos de estado HTTP y cuándo usarlos
              </p>
            </Link>
            
            <Link to="/naming" className="p-4 border dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 group">
              <h3 className="font-medium mb-1 flex items-center dark:text-white">
                Convenciones de Nombres 
                <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Buenas prácticas para nombrar recursos y endpoints
              </p>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

// Helper component for displaying principles
const PrincipleCard = ({ 
  icon, 
  title, 
  description, 
  example 
}: { 
  icon: React.ReactNode;
  title: string; 
  description: string; 
  example: string;
}) => {
  return (
    <div className="p-4 border dark:border-slate-700 rounded-lg">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="font-medium ml-2">{title}</h3>
      </div>
      <p className="text-slate-700 dark:text-slate-300 mb-2 text-sm">{description}</p>
      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded text-sm text-slate-600 dark:text-slate-400">
        <strong className="block text-slate-800 dark:text-slate-300 mb-1">Ejemplo:</strong>
        {example}
      </div>
    </div>
  );
};

export default PrinciplesPage;
