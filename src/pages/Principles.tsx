import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";

const Principles = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Principios REST" 
        description="Fundamentos y conceptos clave de la arquitectura REST."
        path={["Introducción", "Principios REST"]}
      >
        <p>
          REST (Representational State Transfer) es un estilo arquitectónico para sistemas distribuidos, 
          principalmente utilizado para diseñar APIs web. Fue introducido por Roy Fielding en su tesis doctoral 
          en 2000 y establece principios fundamentales para crear servicios web escalables y mantenibles.
        </p>

        <h2>Principios Fundamentales</h2>

        <h3>1. Arquitectura Cliente-Servidor</h3>
        <p>
          La separación de responsabilidades entre el cliente y el servidor permite que ambos componentes 
          evolucionen independientemente. El cliente se enfoca en la interfaz de usuario y la experiencia 
          del usuario, mientras que el servidor se encarga de almacenar y procesar datos.
        </p>

        <h3>2. Sin Estado (Stateless)</h3>
        <p>
          Cada solicitud del cliente al servidor debe contener toda la información necesaria para entender 
          y procesar la solicitud. El servidor no debe almacenar ningún estado del cliente entre solicitudes.
        </p>

        <CodeBlock
          code={`// Solicitud correcta (contiene toda la información necesaria)
GET /api/v1/products/123 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Solicitud incorrecta (depende de un estado previo)
GET /api/v1/products/current HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
          language="http"
        />

        <h3>3. Cacheable</h3>
        <p>
          Las respuestas deben definirse como almacenables en caché o no. Cuando una respuesta es cacheable, 
          los clientes pueden reutilizarla para solicitudes equivalentes posteriores, mejorando el rendimiento.
        </p>

        <CodeBlock
          code={`HTTP/1.1 200 OK
Date: Wed, 21 Oct 2023 07:28:00 GMT
Cache-Control: max-age=3600
Content-Type: application/json

{
  "id": "123",
  "name": "Producto Premium",
  "price": 29.99
}`}
          language="http"
        />

        <h3>4. Interfaz Uniforme</h3>
        <p>
          REST define una interfaz uniforme que simplifica la arquitectura y mejora la visibilidad de las interacciones. 
          Los componentes clave de esta interfaz son:
        </p>
        <ul>
          <li><strong>Recursos identificados:</strong> Cada recurso tiene un identificador único (URI)</li>
          <li><strong>Manipulación a través de representaciones:</strong> Los clientes interactúan con los recursos mediante representaciones</li>
          <li><strong>Mensajes autodescriptivos:</strong> Cada mensaje contiene suficiente información para ser procesado</li>
          <li><strong>HATEOAS:</strong> Hypermedia como motor del estado de la aplicación</li>
        </ul>

        <h3>5. Sistema en Capas</h3>
        <p>
          Un cliente no puede distinguir si está conectado directamente al servidor final o a un intermediario. 
          Esto permite la escalabilidad mediante el uso de balanceadores de carga, cachés y otros intermediarios.
        </p>

        <h3>6. Código bajo demanda (opcional)</h3>
        <p>
          Los servidores pueden enviar código ejecutable al cliente para extender su funcionalidad temporalmente.
        </p>

        <h2>Beneficios de REST</h2>
        <ul>
          <li><strong>Escalabilidad:</strong> Diseño sin estado que facilita el crecimiento</li>
          <li><strong>Flexibilidad:</strong> Independencia entre cliente y servidor</li>
          <li><strong>Independencia:</strong> Evolución separada de clientes y servidores</li>
          <li><strong>Rendimiento:</strong> Aprovecha mecanismos de caché para mejorar la velocidad</li>
          <li><strong>Visibilidad:</strong> Comunicación estandarizada y comprensible</li>
        </ul>

        <h2>REST vs RESTful</h2>
        <p>
          Es importante distinguir entre "REST" como estilo arquitectónico teórico y "RESTful" como 
          implementación práctica. Una API verdaderamente RESTful cumple con todos los principios de REST, 
          especialmente HATEOAS. Sin embargo, muchas APIs se describen como RESTful aunque solo implementen 
          parcialmente los principios.
        </p>

        <blockquote>
          "REST no es un estándar sino un conjunto de restricciones arquitectónicas. Una API que sigue los 
          principios REST es una API RESTful, pero el grado de cumplimiento puede variar." - Roy Fielding
        </blockquote>

        <h2>Niveles de Madurez REST</h2>
        <p>
          El Modelo de Madurez de Richardson describe la adopción gradual de los principios REST:
        </p>

        <ul>
          <li><strong>Nivel 0:</strong> Un único punto de entrada y método HTTP</li>
          <li><strong>Nivel 1:</strong> Múltiples recursos con URIs</li>
          <li><strong>Nivel 2:</strong> Uso de métodos HTTP y códigos de estado</li>
          <li><strong>Nivel 3:</strong> Implementación completa de HATEOAS</li>
        </ul>

        <p>
          La mayoría de las APIs consideradas "RESTful" hoy en día se encuentran en el nivel 2, mientras que 
          el nivel 3 representa una implementación completa de REST según la definición de Roy Fielding.
        </p>

        <h2>Aplicación Práctica</h2>
        <p>
          Al diseñar una API REST, es recomendable seguir estos principios lo más estrictamente posible, pero 
          también es importante entender los compromisos prácticos. En algunos casos, una implementación parcial 
          de REST puede ser más adecuada para las necesidades del proyecto.
        </p>

        <p>
          En las siguientes secciones, exploraremos cómo aplicar estos principios en aspectos específicos del 
          diseño de APIs, desde la nomenclatura hasta la gestión de errores.
        </p>
      </PageContent>
    </PageLayout>
  );
};

export default Principles;
