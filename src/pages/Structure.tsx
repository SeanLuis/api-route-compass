import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";

const Structure = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Estructura de la Guía" 
        description="Organización del contenido y propósito de cada sección."
        path={["Introducción", "Estructura de la Guía"]}
      >
        <p>
          Esta guía está organizada de manera progresiva, comenzando con los conceptos fundamentales de REST
          y avanzando hacia temas más específicos y avanzados. Cada sección está diseñada para proporcionar 
          conocimientos prácticos y aplicables al diseño de APIs REST.
        </p>

        <h2>Organización del Contenido</h2>

        <p>
          El contenido está estructurado siguiendo un flujo lógico que te llevará desde los principios básicos
          hasta las consideraciones avanzadas para API REST escalables:
        </p>

        <ol>
          <li>
            <strong>Introducción y Principios Fundamentales:</strong> Presentación de los conceptos clave que definen 
            REST y sus beneficios.
          </li>
          <li>
            <strong>Diseño de Rutas y Recursos:</strong> Nomenclatura, estructura y jerarquía para crear APIs intuitivas.
          </li>
          <li>
            <strong>Métodos HTTP:</strong> Uso correcto de verbos HTTP para operaciones CRUD y más allá.
          </li>
          <li>
            <strong>Funcionalidades Esenciales:</strong> Versionado, paginación, filtrado y ordenamiento para APIs robustas.
          </li>
          <li>
            <strong>Manejo de Relaciones:</strong> Estrategias para representar y manipular relaciones entre recursos.
          </li>
          <li>
            <strong>Respuestas y Errores:</strong> Códigos de estado, formatos de respuesta y manejo efectivo de errores.
          </li>
          <li>
            <strong>Seguridad:</strong> Autenticación, autorización y mejores prácticas de seguridad.
          </li>
          <li>
            <strong>Documentación:</strong> Herramientas y enfoques para documentar APIs REST.
          </li>
          <li>
            <strong>Consideraciones Avanzadas:</strong> Limitaciones de REST, alternativas y patrones para APIs escalables.
          </li>
        </ol>

        <h2>Cómo Usar Esta Guía</h2>

        <p>
          Esta guía está diseñada tanto para principiantes como para desarrolladores experimentados:
        </p>

        <ul>
          <li>
            <strong>Si eres principiante:</strong> Comienza desde el principio y avanza secuencialmente para construir 
            una comprensión sólida de REST.
          </li>
          <li>
            <strong>Si eres desarrollador con experiencia:</strong> Usa la navegación lateral para saltar directamente 
            a los temas específicos que te interesen.
          </li>
        </ul>

        <h3>Componentes Clave de Cada Sección</h3>
        <p>
          Para facilitar el aprendizaje y la aplicación práctica, cada sección incluye:
        </p>

        <ul>
          <li><strong>Explicaciones conceptuales:</strong> Fundamentos teóricos y principios de diseño</li>
          <li><strong>Ejemplos de código:</strong> Muestras prácticas de implementación</li>
          <li><strong>Buenas prácticas:</strong> Recomendaciones basadas en estándares de la industria</li>
          <li><strong>Casos de uso comunes:</strong> Escenarios reales y sus soluciones</li>
          <li><strong>Consideraciones técnicas:</strong> Aspectos a tener en cuenta durante la implementación</li>
        </ul>

        <h2>Secciones Principales</h2>

        <h3>Introducción</h3>
        <p>
          La sección de introducción establece la base teórica necesaria para entender REST como estilo arquitectónico:
        </p>
        <ul>
          <li><strong>Principios REST:</strong> Los seis principios fundamentales definidos por Roy Fielding</li>
          <li><strong>Estructura de la Guía:</strong> Esta página que estás leyendo ahora</li>
        </ul>

        <h3>Rutas y Recursos</h3>
        <p>
          Esta sección se centra en el diseño de la estructura de recursos, un aspecto crucial de toda API REST:
        </p>
        <ul>
          <li><strong>Nomenclatura:</strong> Convenciones para nombrar recursos de forma consistente e intuitiva</li>
          <li><strong>Estructura de Rutas:</strong> Organización lógica de las URLs de tu API</li>
          <li><strong>Jerarquía de Recursos:</strong> Modelado de relaciones entre entidades</li>
        </ul>

        <h3>Métodos HTTP</h3>
        <p>
          Detalla el uso adecuado de los verbos HTTP para diferentes operaciones:
        </p>
        <ul>
          <li><strong>GET:</strong> Recuperación de recursos</li>
          <li><strong>POST:</strong> Creación de nuevos recursos</li>
          <li><strong>PUT:</strong> Actualización completa de recursos</li>
          <li><strong>PATCH:</strong> Actualización parcial de recursos</li>
          <li><strong>DELETE:</strong> Eliminación de recursos</li>
        </ul>

        <h3>Funcionalidades Esenciales</h3>
        <p>
          Cubre características fundamentales que toda API REST moderna debería implementar:
        </p>
        <ul>
          <li><strong>Versionado:</strong> Estrategias para evolucionar tu API sin romper compatibilidad</li>
          <li><strong>Paginación:</strong> Técnicas para manejar grandes conjuntos de resultados</li>
          <li><strong>Filtrado:</strong> Métodos para que los clientes soliciten subconjuntos específicos de datos</li>
          <li><strong>Ordenamiento:</strong> Opciones para ordenar resultados según diferentes criterios</li>
        </ul>

        <h3>Relaciones</h3>
        <p>
          Explora cómo manejar eficientemente las relaciones entre recursos:
        </p>
        <ul>
          <li><strong>Recursos Anidados:</strong> Representación de relaciones jerárquicas</li>
          <li><strong>Expansión de Campos:</strong> Técnicas para incluir datos relacionados en las respuestas</li>
        </ul>

        <h3>Respuestas</h3>
        <p>
          Cubre todo lo relacionado con las respuestas que tu API devuelve:
        </p>
        <ul>
          <li><strong>Códigos de Estado:</strong> Uso correcto de códigos HTTP para comunicar resultados</li>
          <li><strong>Formatos de Respuesta:</strong> Estructuración consistente de respuestas JSON</li>
          <li><strong>Manejo de Errores:</strong> Patrones para comunicar errores de forma eficaz</li>
        </ul>

        <h3>Seguridad</h3>
        <p>
          Aspectos críticos de seguridad para proteger tu API:
        </p>
        <ul>
          <li><strong>Autenticación:</strong> Verificación de identidad de los consumidores de la API</li>
          <li><strong>Autorización:</strong> Control de acceso a recursos y operaciones</li>
          <li><strong>Mejores Prácticas:</strong> Protección contra vulnerabilidades comunes</li>
        </ul>

        <h3>Documentación</h3>
        <p>
          Herramientas y enfoques para documentar tu API:
        </p>
        <ul>
          <li><strong>OpenAPI/Swagger:</strong> Especificación estándar para documentación de APIs</li>
          <li><strong>Ejemplos:</strong> Casos de uso y ejemplos prácticos</li>
        </ul>

        <h3>API Avanzada</h3>
        <p>
          Explora temas avanzados y alternativas:
        </p>
        <ul>
          <li><strong>Limitaciones REST:</strong> Cuándo REST puede no ser la mejor opción</li>
          <li><strong>Alternativas:</strong> GraphQL, gRPC, WebSockets y otros enfoques</li>
          <li><strong>Patrones Escalables:</strong> Arquitecturas para APIs de gran escala</li>
        </ul>

        <h2>Ejemplos Prácticos</h2>

        <p>
          A lo largo de la guía encontrarás numerosos ejemplos prácticos que ilustran los conceptos presentados. 
          Estos ejemplos están diseñados para ser aplicables en escenarios reales de desarrollo.
        </p>

        <h2>Recursos Complementarios</h2>

        <p>
          Al final de cada sección, encontrarás recursos adicionales para profundizar en los temas tratados, 
          incluyendo referencias a estándares, herramientas y lecturas recomendadas.
        </p>

        <blockquote>
          "Las APIs REST bien diseñadas no solo facilitan la integración entre sistemas, sino que también
          mejoran la experiencia del desarrollador, reducen errores y aumentan la adopción de tu servicio."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default Structure;
