import { PageLayout } from "@/components/PageLayout";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, BookOpen, Code, Server, Shield, ExternalLink, RefreshCw, FileText, Database } from "lucide-react";

const Structure = () => {
  return (
    <PageLayout>
      <div className="space-y-10 max-w-3xl">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/principles" className="text-sm text-slate-500 hover:text-slate-700">Introducción</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Estructura de la Guía</h1>
          <p className="text-lg text-slate-700">
            Organización del contenido y propósito de cada sección.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
            <p className="text-lg text-blue-900">
              Esta guía está organizada de manera progresiva, comenzando con los conceptos fundamentales de REST
              y avanzando hacia temas más específicos y avanzados. Cada sección está diseñada para proporcionar 
              conocimientos prácticos y aplicables al diseño de APIs REST.
            </p>
          </div>

          <h2 className="text-xl font-semibold tracking-tight">Organización del Contenido</h2>

          <p>
            El contenido está estructurado siguiendo un flujo lógico que te llevará desde los principios básicos
            hasta las consideraciones avanzadas para API REST escalables:
          </p>

          <div className="overflow-hidden rounded-lg border border-slate-200 mt-4">
            <ol className="divide-y divide-slate-200">
              {[
                { title: "Introducción y Principios Fundamentales", desc: "Presentación de los conceptos clave que definen REST y sus beneficios." },
                { title: "Diseño de Rutas y Recursos", desc: "Nomenclatura, estructura y jerarquía para crear APIs intuitivas." },
                { title: "Métodos HTTP", desc: "Uso correcto de verbos HTTP para operaciones CRUD y más allá." },
                { title: "Funcionalidades Esenciales", desc: "Versionado, paginación, filtrado y ordenamiento para APIs robustas." },
                { title: "Manejo de Relaciones", desc: "Estrategias para representar y manipular relaciones entre recursos." },
                { title: "Respuestas y Errores", desc: "Códigos de estado, formatos de respuesta y manejo efectivo de errores." },
                { title: "Seguridad", desc: "Autenticación, autorización y mejores prácticas de seguridad." },
                { title: "Documentación", desc: "Herramientas y enfoques para documentar APIs REST." },
                { title: "Consideraciones Avanzadas", desc: "Limitaciones de REST, alternativas y patrones para APIs escalables." }
              ].map((item, index) => (
                <li key={index} className="p-4 hover:bg-slate-50">
                  <div className="flex items-start">
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-slate-600 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <h2 className="text-xl font-semibold tracking-tight mt-8">Cómo Usar Esta Guía</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-semibold">Si eres principiante</h3>
                </div>
                <p className="text-slate-600">
                  Comienza desde el principio y avanza secuencialmente para construir 
                  una comprensión sólida de REST.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="font-semibold">Si eres desarrollador con experiencia</h3>
                </div>
                <p className="text-slate-600">
                  Usa la navegación lateral para saltar directamente 
                  a los temas específicos que te interesen.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-slate-100 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold tracking-tight mb-4">Componentes Clave de Cada Sección</h3>
            <p className="mb-4">
              Para facilitar el aprendizaje y la aplicación práctica, cada sección incluye:
            </p>

            <ul className="space-y-3">
              {[
                { icon: <FileText className="h-4 w-4 text-indigo-500" />, title: "Explicaciones conceptuales", desc: "Fundamentos teóricos y principios de diseño" },
                { icon: <Code className="h-4 w-4 text-indigo-500" />, title: "Ejemplos de código", desc: "Muestras prácticas de implementación" },
                { icon: <CheckIcon className="h-4 w-4 text-indigo-500" />, title: "Buenas prácticas", desc: "Recomendaciones basadas en estándares de la industria" },
                { icon: <Server className="h-4 w-4 text-indigo-500" />, title: "Casos de uso comunes", desc: "Escenarios reales y sus soluciones" },
                { icon: <Database className="h-4 w-4 text-indigo-500" />, title: "Consideraciones técnicas", desc: "Aspectos a tener en cuenta durante la implementación" }
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="mt-1 mr-3">{item.icon}</div>
                  <div>
                    <span className="font-medium">{item.title}:</span> {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <h2 className="text-xl font-semibold tracking-tight mt-8">Secciones Principales</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <SectionCard 
              title="Introducción" 
              description="Base teórica necesaria para entender REST como estilo arquitectónico"
              items={[
                "Principios REST: Los seis principios fundamentales definidos por Roy Fielding",
                "Estructura de la Guía: Esta página que estás leyendo ahora"
              ]}
              icon={<BookOpen className="h-5 w-5 text-blue-500" />}
            />
            
            <SectionCard 
              title="Rutas y Recursos" 
              description="Diseño de la estructura de recursos, un aspecto crucial de toda API REST"
              items={[
                "Nomenclatura: Convenciones para nombrar recursos de forma consistente",
                "Estructura de Rutas: Organización lógica de las URLs de tu API",
                "Jerarquía de Recursos: Modelado de relaciones entre entidades"
              ]}
              icon={<FileText className="h-5 w-5 text-indigo-500" />}
            />
            
            <SectionCard 
              title="Métodos HTTP" 
              description="Uso adecuado de los verbos HTTP para diferentes operaciones"
              items={[
                "GET: Recuperación de recursos",
                "POST: Creación de nuevos recursos",
                "PUT: Actualización completa de recursos",
                "PATCH: Actualización parcial de recursos",
                "DELETE: Eliminación de recursos"
              ]}
              icon={<Code className="h-5 w-5 text-green-500" />}
            />
            
            <SectionCard 
              title="Funcionalidades Esenciales" 
              description="Características fundamentales que toda API REST moderna debería implementar"
              items={[
                "Versionado: Estrategias para evolucionar tu API sin romper compatibilidad",
                "Paginación: Técnicas para manejar grandes conjuntos de resultados",
                "Filtrado: Métodos para que los clientes soliciten subconjuntos específicos",
                "Ordenamiento: Opciones para ordenar resultados según diferentes criterios"
              ]}
              icon={<Server className="h-5 w-5 text-amber-500" />}
            />
            
            <SectionCard 
              title="Relaciones" 
              description="Cómo manejar eficientemente las relaciones entre recursos"
              items={[
                "Recursos Anidados: Representación de relaciones jerárquicas",
                "Expansión de Campos: Técnicas para incluir datos relacionados en respuestas"
              ]}
              icon={<Database className="h-5 w-5 text-red-500" />}
            />
            
            <SectionCard 
              title="Respuestas" 
              description="Todo lo relacionado con las respuestas que tu API devuelve"
              items={[
                "Códigos de Estado: Uso correcto de códigos HTTP para comunicar resultados",
                "Formatos de Respuesta: Estructuración consistente de respuestas JSON",
                "Manejo de Errores: Patrones para comunicar errores de forma eficaz"
              ]}
              icon={<FileText className="h-5 w-5 text-blue-500" />}
            />
            
            <SectionCard 
              title="Seguridad" 
              description="Aspectos críticos de seguridad para proteger tu API"
              items={[
                "Autenticación: Verificación de identidad de los consumidores de la API",
                "Autorización: Control de acceso a recursos y operaciones",
                "Mejores Prácticas: Protección contra vulnerabilidades comunes"
              ]}
              icon={<Shield className="h-5 w-5 text-purple-500" />}
            />
            
            <SectionCard 
              title="Documentación" 
              description="Herramientas y enfoques para documentar tu API"
              items={[
                "OpenAPI/Swagger: Especificación estándar para documentación de APIs",
                "Ejemplos: Casos de uso y ejemplos prácticos"
              ]}
              icon={<ExternalLink className="h-5 w-5 text-indigo-500" />}
            />
            
            <SectionCard 
              title="API Avanzada" 
              description="Temas avanzados y alternativas"
              items={[
                "Limitaciones REST: Cuándo REST puede no ser la mejor opción",
                "Alternativas: GraphQL, gRPC, WebSockets y otros enfoques",
                "Patrones Escalables: Arquitecturas para APIs de gran escala"
              ]}
              icon={<RefreshCw className="h-5 w-5 text-teal-500" />}
            />
          </div>

          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">Ejemplos Prácticos</h2>
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6">
              <p className="text-indigo-900">
                A lo largo de la guía encontrarás numerosos ejemplos prácticos que ilustran los conceptos presentados. 
                Estos ejemplos están diseñados para ser aplicables en escenarios reales de desarrollo.
              </p>
            </div>

            <h2 className="text-xl font-semibold tracking-tight">Recursos Complementarios</h2>
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-6">
              <p className="text-amber-900">
                Al final de cada sección, encontrarás recursos adicionales para profundizar en los temas tratados, 
                incluyendo referencias a estándares, herramientas y lecturas recomendadas.
              </p>
            </div>

            <blockquote className="border-l-4 border-indigo-300 pl-6 py-2 pr-4 my-8 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-r-lg">
              <p className="italic text-indigo-900 font-medium">
                "Las APIs REST bien diseñadas no solo facilitan la integración entre sistemas, sino que también
                mejoran la experiencia del desarrollador, reducen errores y aumentan la adopción de tu servicio."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

// Componente de tarjeta de sección
const SectionCard = ({ title, description, items, icon }) => (
  <Card className="overflow-hidden">
    <CardContent className="p-0">
      <div className="p-5 border-b">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <h3 className="font-medium">{title}</h3>
        </div>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <ul className="py-2 px-3">
        {items.map((item, i) => {
          const [title, desc] = item.split(': ');
          return (
            <li key={i} className="py-2 text-sm">
              <span className="font-medium">{title}:</span> {desc}
            </li>
          )
        })}
      </ul>
    </CardContent>
  </Card>
);

// Icono de check
const CheckIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default Structure;
