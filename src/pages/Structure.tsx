
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
      </PageContent>
    </PageLayout>
  );
};

export default Structure;
