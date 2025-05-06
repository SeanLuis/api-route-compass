import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";

const Versioning = () => {
  return (
    <PageLayout>
      <PageContent
        title="Versionado de APIs"
        description="Estrategias para versionar APIs REST y mantener compatibilidad."
        path={["Funcionalidades", "Versionado"]}
      >
        <p>
          El versionado de APIs es una práctica fundamental para permitir la
          evolución de tu API sin romper las integraciones existentes. A medida
          que tu API crece y evoluciona, necesitarás realizar cambios que
          podrían ser incompatibles con los clientes actuales.
        </p>

        <h2>Por Qué Versionar tu API</h2>

        <p>
          Las APIs son contratos entre proveedores de servicios y consumidores.
          Cuando necesitas realizar cambios sustanciales en ese contrato, el
          versionado te permite:
        </p>

        <ul>
          <li>
            Introducir nuevas funcionalidades sin afectar a clientes existentes
          </li>
          <li>
            Corregir diseños problemáticos mientras mantienes compatibilidad con
            versiones anteriores
          </li>
          <li>
            Proporcionar una transición gradual para que los clientes migren a
            nuevas versiones
          </li>
          <li>
            Mantener la confianza de los desarrolladores que dependen de la
            estabilidad de tu API
          </li>
        </ul>

        <h2>Cuándo Versionar tu API</h2>

        <p>
          No todos los cambios requieren una nueva versión. Generalmente, debes
          considerar una nueva versión cuando:
        </p>

        <ul>
          <li>
            <strong>Cambios Incompatibles:</strong> Modificas el formato de
            respuesta o los parámetros requeridos
          </li>
          <li>
            <strong>Eliminación de Recursos:</strong> Eliminas endpoints o campos
            previamente disponibles
          </li>
          <li>
            <strong>Cambios en la Lógica de Negocio:</strong> Alteras
            significativamente el comportamiento de la API
          </li>
          <li>
            <strong>Rediseño Arquitectónico:</strong> Implementas cambios
            fundamentales en la estructura de la API
          </li>
        </ul>

        <h3>Cambios que No Requieren Versionado</h3>

        <ul>
          <li>
            <strong>Adición de nuevos endpoints:</strong> No afectan a las
            integraciones existentes
          </li>
          <li>
            <strong>Adición de campos opcionales:</strong> Siempre que los
            clientes antiguos puedan ignorarlos
          </li>
          <li>
            <strong>Correcciones de errores:</strong> Que no alteran el
            comportamiento documentado
          </li>
          <li>
            <strong>Mejoras de rendimiento:</strong> Que no modifican contratos
            existentes
          </li>
        </ul>

        <h2>Estrategias de Versionado</h2>

        <p>
          Existen varias estrategias para versionar APIs REST, cada una con sus
          ventajas e inconvenientes:
        </p>

        <h3>1. Versionado en la URL</h3>

        <p>
          Incluye la versión directamente en la ruta base de la API:
        </p>

        <CodeBlock
          code={`# Versión incluida en la ruta
https://api.example.com/v1/products
https://api.example.com/v2/products`}
          language="http"
        />

        <h4>Ventajas:</h4>
        <ul>
          <li>Extremadamente claro y visible</li>
          <li>Fácil de entender para los desarrolladores</li>
          <li>Permite probar diferentes versiones fácilmente en el navegador</li>
          <li>No requiere cabeceras HTTP personalizadas</li>
        </ul>

        <h4>Desventajas:</h4>
        <ul>
          <li>Viola parcialmente los principios REST (un recurso debería tener una URL única)</li>
          <li>Complica el cacheo a nivel de URL</li>
          <li>Dificulta la transición gradual entre versiones</li>
        </ul>

        <h3>2. Versionado por Cabecera HTTP</h3>

        <p>
          Utiliza una cabecera HTTP personalizada para indicar la versión:
        </p>

        <CodeBlock
          code={`# Mediante cabecera HTTP personalizada
GET /products HTTP/1.1
Host: api.example.com
Accept-Version: v2

# Usando Content Negotiation
GET /products HTTP/1.1
Host: api.example.com
Accept: application/vnd.example.v2+json`}
          language="http"
        />

        <h4>Ventajas:</h4>
        <ul>
          <li>Cumple mejor con los principios REST</li>
          <li>Mantiene las URLs limpias y consistentes</li>
          <li>Se integra bien con el sistema de content negotiation de HTTP</li>
          <li>Facilita la actualización progresiva</li>
        </ul>

        <h4>Desventajas:</h4>
        <ul>
          <li>Menos visible y puede ser difícil de descubrir</li>
          <li>Más complejo para clientes y desarrolladores</li>
          <li>Dificulta las pruebas directas en el navegador</li>
          <li>No siempre es compatible con todas las herramientas o proxies</li>
        </ul>

        <h3>3. Versionado por Parámetro de Consulta</h3>

        <p>
          Indica la versión mediante un parámetro en la URL:
        </p>

        <CodeBlock
          code={`# Usando un parámetro de consulta
https://api.example.com/products?version=2
https://api.example.com/products?api-version=2023-01-01`}
          language="http"
        />

        <h4>Ventajas:</h4>
        <ul>
          <li>Fácil de implementar y usar</li>
          <li>Visible en la URL pero sin modificar la estructura principal</li>
          <li>Permite pruebas directas en el navegador</li>
        </ul>

        <h4>Desventajas:</h4>
        <ul>
          <li>Puede mezclarse con otros parámetros funcionales</li>
          <li>No es tan robusto como las cabeceras para este propósito</li>
          <li>Complica el cacheo de respuestas</li>
        </ul>

        <h3>4. Versionado por Subdominio</h3>

        <p>
          Utiliza subdominios diferentes para cada versión:
        </p>

        <CodeBlock
          code={`# Mediante subdominio
https://v1.api.example.com/products
https://v2.api.example.com/products`}
          language="http"
        />

        <h4>Ventajas:</h4>
        <ul>
          <li>Permite separar completamente la infraestructura por versión</li>
          <li>Facilita el mantenimiento independiente de versiones</li>
          <li>Clara separación visual</li>
        </ul>

        <h4>Desventajas:</h4>
        <ul>
          <li>Requiere configuración DNS adicional</li>
          <li>Puede complicar la gestión de certificados SSL</li>
          <li>Más complejo de implementar y mantener</li>
        </ul>

        <h2>Mejores Prácticas</h2>

        <h3>Proporcionar Fechas de Obsolescencia</h3>

        <p>
          Comunica claramente cuándo se deprecarán las versiones antiguas:
        </p>

        <CodeBlock
          code={`HTTP/1.1 200 OK
Content-Type: application/json
Deprecation: Sun, 31 Dec 2023 23:59:59 GMT
Sunset: Sun, 30 Jun 2024 23:59:59 GMT
Link: <https://api.example.com/v2/products>; rel="successor-version"

{
  "message": "Esta versión de la API dejará de ser compatible el 30 de junio de 2024. Por favor, migre a la v2."
}`}
          language="http"
        />

        <h3>Documentación de Migración</h3>

        <p>
          Proporciona guías detalladas para actualizar entre versiones:
        </p>

        <ul>
          <li>Documenta todos los cambios entre versiones</li>
          <li>Incluye ejemplos de código antes y después</li>
          <li>Proporciona herramientas de migración cuando sea posible</li>
          <li>Explica el razonamiento detrás de los cambios importantes</li>
        </ul>

        <h3>Período de Transición</h3>

        <p>
          Mantén múltiples versiones simultáneamente durante un período razonable:
        </p>

        <ul>
          <li>Anuncia nuevas versiones con suficiente antelación</li>
          <li>Mantén versiones antiguas por un período definido (típicamente 6-12 meses)</li>
          <li>Implementa redirecciones y advertencias amigables</li>
        </ul>

        <h3>Versionado Semántico</h3>

        <p>
          Considera utilizar versionado semántico (SemVer) para comunicar
          claramente la naturaleza de los cambios:
        </p>

        <ul>
          <li>
            <strong>Mayor (X.y.z):</strong> Cambios incompatibles con versiones
            anteriores
          </li>
          <li>
            <strong>Menor (x.Y.z):</strong> Nuevas funcionalidades compatibles
            con versiones anteriores
          </li>
          <li>
            <strong>Parche (x.y.Z):</strong> Correcciones de errores compatibles
            con versiones anteriores
          </li>
        </ul>

        <h2>Ejemplos Prácticos</h2>

        <h3>GitHub API</h3>

        <p>
          GitHub utiliza el enfoque de content negotiation en la cabecera Accept:
        </p>

        <CodeBlock
          code={`# API de GitHub v3
GET /users/octocat
Host: api.github.com
Accept: application/vnd.github.v3+json

# API de GitHub con características beta/preview
GET /users/octocat
Host: api.github.com
Accept: application/vnd.github.v3+json, application/vnd.github.starfox-preview+json`}
          language="http"
        />

        <h3>Stripe API</h3>

        <p>
          Stripe utiliza un sistema basado en fechas para versionar su API:
        </p>

        <CodeBlock
          code={`# Especificando versión explícitamente
GET /v1/customers/cus_123
Host: api.stripe.com
Stripe-Version: 2023-10-16

# De manera alternativa en cada solicitud
curl https://api.stripe.com/v1/customers \
  -H "Authorization: Bearer sk_test_..." \
  -H "Stripe-Version: 2023-10-16"`}
          language="http"
        />

        <h2>Consideraciones Finales</h2>

        <p>
          La elección de la estrategia de versionado debe adaptarse a las
          necesidades específicas de tu API y tu base de usuarios:
        </p>

        <ul>
          <li>
            <strong>APIs públicas:</strong> El versionado en la URL suele ser más
            claro y accesible
          </li>
          <li>
            <strong>APIs privadas:</strong> Cabeceras personalizadas pueden
            ofrecer mayor flexibilidad
          </li>
          <li>
            <strong>Microservicios:</strong> Considera estrategias por servicio
            que faciliten la evolución independiente
          </li>
        </ul>

        <p>
          Independientemente de la estrategia elegida, lo más importante es ser
          consistente, comunicar claramente los cambios y proporcionar un camino
          de migración bien definido para los usuarios de tu API.
        </p>

        <blockquote>
          "Una buena estrategia de versionado es como un buen contrato:
          proporciona estabilidad y previsibilidad mientras permite la evolución
          del sistema. La clave está en equilibrar la innovación con el compromiso
          de mantener la compatibilidad."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default Versioning;
