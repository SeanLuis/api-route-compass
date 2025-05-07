import { PageLayout } from "@/components/PageLayout";
import { Link } from "react-router-dom";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Info, Server, Layers, Database, Globe, ArrowRight } from "lucide-react";

const PrinciplesPage = () => {
  return (
    <PageLayout>
      <div className="space-y-10 max-w-3xl">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">Inicio</Link>
            <span className="text-sm text-slate-500">/</span>
            <span className="text-sm font-medium">Principios REST</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Principios de Diseño REST</h1>
          <p className="text-lg text-slate-700">
            Fundamentos y conceptos clave para construir APIs REST escalables y mantenibles.
          </p>
        </div>

        {/* Main content */}
        <section className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg">
            <div className="flex items-start">
              <div className="mr-4 p-2 bg-white rounded-full shadow-sm">
                <Lightbulb className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-1">¿Qué es REST?</h2>
                <p className="text-slate-700">
                  REST (Representational State Transfer) es un estilo de arquitectura para sistemas distribuidos
                  definido por Roy Fielding en 2000. Establece un conjunto de restricciones y principios que, cuando
                  se aplican en conjunto, proporcionan un diseño de API escalable, simple y fácil de entender.
                </p>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold tracking-tight mt-8">Restricciones Arquitectónicas</h2>
          <p className="text-slate-700">
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
          
          <div className="prose prose-slate max-w-none">
            <p>
              Un concepto fundamental en REST es que la interacción se centra en los recursos y sus representaciones:
            </p>
            
            <ul>
              <li>
                <strong>Recursos</strong>: Cualquier información que pueda ser nombrada puede ser un recurso: un documento, 
                una imagen, un servicio, una colección de otros recursos, etc.
              </li>
              <li>
                <strong>Representaciones</strong>: Los estados actual o deseados de un recurso, típicamente un documento 
                que captura el estado actual o previsto de un recurso.
              </li>
        </ul>

            <Alert className="my-6 bg-blue-50 border-blue-100">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Identificación de recursos</AlertTitle>
              <AlertDescription className="text-blue-700">
                Cada recurso debe ser identificable a través de una URL única. 
                Por ejemplo, <code>/users/123</code> identifica al usuario con ID 123.
              </AlertDescription>
            </Alert>
            
            <p>
              La separación entre recursos y sus representaciones permite:
        </p>

        <ul>
              <li>Servir el mismo recurso en diferentes formatos (JSON, XML, HTML)</li>
              <li>Evolucionar las representaciones sin cambiar el identificador del recurso</li>
              <li>Conservar enlaces estables a lo largo del tiempo</li>
        </ul>
          </div>
          
          <div className="mt-6">
            <h3 className="text-base font-medium mb-2">Ejemplo de representaciones de un mismo recurso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-2 text-slate-600">Representación JSON</h4>
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
                <h4 className="font-medium text-sm mb-2 text-slate-600">Representación XML</h4>
                <CodeBlock
                  code={`<user>
  <id>user_123</id>
  <name>Ana García</name>
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
          
          <p className="text-slate-700">
            REST utiliza los métodos HTTP para definir acciones sobre los recursos.
            Los métodos principales, también conocidos como verbos HTTP, proporcionan una interfaz uniforme para interactuar con recursos:
          </p>
          
          <div className="grid gap-3 mt-4">
            <div className="p-3 border rounded-md">
              <div className="flex items-center">
                <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold mr-3">GET</div>
                <h3 className="font-medium">Consultar recursos</h3>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                Recupera la representación de un recurso sin modificarlo.
              </p>
            </div>
            
            <div className="p-3 border rounded-md">
              <div className="flex items-center">
                <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold mr-3">POST</div>
                <h3 className="font-medium">Crear recursos</h3>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                Crea un nuevo recurso a partir de la representación proporcionada.
              </p>
            </div>
            
            <div className="p-3 border rounded-md">
              <div className="flex items-center">
                <div className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-semibold mr-3">PUT</div>
                <h3 className="font-medium">Actualizar recursos (reemplazar)</h3>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                Reemplaza completamente un recurso existente con la representación proporcionada.
              </p>
            </div>
            
            <div className="p-3 border rounded-md">
              <div className="flex items-center">
                <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold mr-3">PATCH</div>
                <h3 className="font-medium">Actualizar recursos (parcial)</h3>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                Aplica modificaciones parciales a un recurso existente.
              </p>
            </div>
            
            <div className="p-3 border rounded-md">
              <div className="flex items-center">
                <div className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold mr-3">DELETE</div>
                <h3 className="font-medium">Eliminar recursos</h3>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                Elimina un recurso existente.
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <Link 
              to="/methods" 
              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Ver documentación detallada de métodos HTTP <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Siguientes pasos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/route-structure" className="p-4 border rounded-lg hover:bg-slate-50 group">
              <h3 className="font-medium mb-1 flex items-center">
                Estructura de Rutas 
                <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-600">
                Aprende a diseñar una estructura de rutas clara y consistente
              </p>
            </Link>
            
            <Link to="/naming" className="p-4 border rounded-lg hover:bg-slate-50 group">
              <h3 className="font-medium mb-1 flex items-center">
                Nomenclatura 
                <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-600">
                Convenciones para nombrar recursos de forma intuitiva
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
    <div className="p-4 border rounded-lg">
      <div className="flex items-center">
        <div className="mr-2">{icon}</div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-slate-700 mb-2">{description}</p>
      <div className="text-xs bg-slate-50 p-2 rounded border border-slate-100">
        <span className="font-medium">Ejemplo:</span> {example}
      </div>
    </div>
  );
};

export default PrinciplesPage;
