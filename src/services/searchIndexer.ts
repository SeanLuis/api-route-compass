import { type SearchableContent } from "@/components/SearchDialog";
import { indexPageContent } from "@/lib/contentIndex";

/**
 * Servicio para generar y proporcionar datos de búsqueda
 * 
 * En una implementación real, esto podría:
 * 1. Cargar el contenido de páginas del servidor
 * 2. Indexar contenido en tiempo de compilación/despliegue
 * 3. Proporcionar índices pre-generados para un rendimiento óptimo
 */

// Datos indexados de páginas estáticas para búsqueda
// Este enfoque simula lo que sería una indexación de contenido real
export const indexedSearchData: SearchableContent[] = [
  // Principios REST
  indexPageContent(
    "principles",
    "Principios REST",
    "Características fundamentales y principios de la arquitectura REST.",
    `REST (Representational State Transfer) es un estilo arquitectónico para sistemas distribuidos,
    definido por Roy Fielding en su tesis doctoral en 2000. Los principios fundamentales de REST incluyen:
    Interfaz uniforme, Cliente-Servidor, Sin estado (Stateless), Cacheable, Sistema en capas y Code-On-Demand.
    Estos principios promueven la escalabilidad, simplicidad y rendimiento en aplicaciones web modernas.`,
    "/principles",
    "Introducción"
  ),
  
  // Estructura de la Guía
  indexPageContent(
    "structure",
    "Estructura de la Guía",
    "Organización y contenido de la guía de APIs REST.",
    `Esta guía está organizada en secciones progresivas que cubren desde conceptos básicos hasta
    patrones avanzados de diseño de APIs. Comenzamos con los principios fundamentales y
    la terminología, luego exploramos recursos, métodos HTTP, paginación, filtrado, autenticación,
    y finalizamos con consideraciones avanzadas de escalabilidad y alternativas a REST.`,
    "/structure",
    "Introducción"
  ),
  
  // Nomenclatura
  indexPageContent(
    "naming",
    "Nomenclatura",
    "Cómo nombrar recursos y rutas en una API REST.",
    `El diseño de nombres de recursos es crucial para API REST intuitivas. Las mejores prácticas incluyen:
    Uso de nombres en plural para colecciones (ej. /products), uso de sustantivos en lugar de verbos,
    consistencia en el formato de caso (kebab-case para URLs, camelCase para parámetros),
    evitar la jerga técnica, y mantener URLs legibles por humanos. Una buena nomenclatura mejora
    la usabilidad y la adopción de la API.`,
    "/naming",
    "Rutas y Recursos"
  ),
  
  // Estructura de Rutas
  indexPageContent(
    "route-structure",
    "Estructura de Rutas",
    "Patrones y organización de rutas en APIs REST.",
    `La estructura de rutas en REST debe reflejar relaciones lógicas entre recursos.
    Las rutas deben seguir una jerarquía clara, usar IDs para identificar recursos específicos,
    y aprovechar los parámetros de consulta para operaciones adicionales. Patrones comunes incluyen:
    rutas de colección e ítem (/products y /products/{id}), rutas anidadas (/products/{id}/variants),
    y endpoints para funcionalidades específicas que mantienen el diseño orientado a recursos.`,
    "/route-structure",
    "Rutas y Recursos"
  ),
  
  // Jerarquía de Recursos
  indexPageContent(
    "resource-hierarchy",
    "Jerarquía de Recursos",
    "Organización jerárquica de recursos en REST.",
    `La jerarquía de recursos es fundamental para diseñar APIs REST eficientes y comprensibles.
    Se recomienda organizar recursos en colecciones e ítems individuales, usar identificadores únicos,
    y establecer relaciones claras entre recursos. Las jerarquías pueden ser planas o profundamente anidadas,
    dependiendo de la complejidad del dominio.`,
    "/resource-hierarchy",
    "Rutas y Recursos"
  ),
  
  // GET
  indexPageContent(
    "methods-get",
    "GET",
    "El método GET para recuperar recursos en APIs REST.",
    `GET es el método HTTP fundamental para recuperar recursos en REST.
    Es seguro e idempotente, lo que significa que no debe causar efectos secundarios y
    producir el mismo resultado independientemente del número de llamadas. 
    Las mejores prácticas incluyen: uso de filtros vía query parameters,
    implementación de campos seleccionables, respuestas cacheables con ETags,
    gestión de recursos no encontrados con 404, y soporte para diferentes formatos
    mediante content negotiation. GET nunca debe modificar el estado del servidor.`,
    "/methods/get",
    "Métodos HTTP"
  ),
  
  // POST
  indexPageContent(
    "methods-post",
    "POST",
    "El método POST para crear recursos en APIs REST.",
    `POST es el método estándar para la creación de nuevos recursos en REST.
    No es idempotente, ya que cada llamada crea un nuevo recurso.
    Las mejores prácticas incluyen: devolver código 201 (Created) con la URL del
    nuevo recurso en el header Location, proporcionar la representación completa del
    recurso creado en la respuesta, validar rigurosamente los datos entrantes,
    manejar la generación de identificadores en el servidor, y rechazar campos no esperados
    para evitar vulnerabilidades de asignación masiva.`,
    "/methods/post",
    "Métodos HTTP"
  ),
  
  // PUT
  indexPageContent(
    "methods-put",
    "PUT",
    "El método PUT para actualizar recursos en APIs REST.",
    `PUT se utiliza para actualizar completamente un recurso existente o crearlo si no existe.
    Es idempotente, lo que significa que múltiples solicitudes idénticas tendrán el mismo efecto.
    A diferencia de PATCH, PUT requiere el envío de la representación completa del recurso.
    Las mejores prácticas incluyen verificar precondiciones con ETags, devolver códigos 200 (OK)
    o 204 (No Content) para actualizaciones, y 201 (Created) cuando se crea un nuevo recurso.`,
    "/methods/put",
    "Métodos HTTP"
  ),
  
  // PATCH
  indexPageContent(
    "methods-patch",
    "PATCH",
    "El método PATCH para actualizar parcialmente recursos en APIs REST.",
    `PATCH permite modificar parcialmente un recurso, actualizando solo los campos especificados.
    A diferencia de PUT, no requiere enviar la representación completa del recurso.
    Se puede implementar usando formatos como JSON Patch (RFC 6902) o JSON Merge Patch (RFC 7396).
    PATCH no es necesariamente idempotente, por lo que se recomienda usar precondiciones con ETags.
    Es ideal para operaciones de actualización que afectan solo a pocos campos de un recurso grande.`,
    "/methods/patch",
    "Métodos HTTP"
  ),
  
  // DELETE
  indexPageContent(
    "methods-delete",
    "DELETE",
    "El método DELETE para eliminar recursos en APIs REST.",
    `DELETE se utiliza para eliminar recursos en APIs REST. Es idempotente, por lo que múltiples
    solicitudes de eliminación al mismo recurso deben tener el mismo efecto que una sola llamada.
    Las mejores prácticas incluyen devolver 204 (No Content) para eliminaciones exitosas,
    404 (Not Found) si el recurso no existe, y considerar "soft deletes" para recursos importantes.
    Para eliminaciones que requieren pre-condiciones, se pueden usar ETags con el header If-Match.`,
    "/methods/delete",
    "Métodos HTTP"
  ),
  
  // Versionado
  indexPageContent(
    "versioning",
    "Versionado",
    "Estrategias para versionar APIs REST.",
    `El versionado es esencial para evolucionar APIs sin romper clientes existentes.
    Las estrategias incluyen: versionado en URI (/v1/products), en parámetros de consulta
    (?version=1), en encabezados HTTP (Accept-Version: 1), y mediante content negotiation
    (Accept: application/vnd.company.v1+json). Cada enfoque tiene ventajas y desventajas
    en términos de caching, legibilidad y pureza REST. También se cubren prácticas para
    deprecación gradual y transición entre versiones.`,
    "/versioning",
    "Funcionalidades"
  ),
  
  // Paginación
  indexPageContent(
    "pagination",
    "Paginación",
    "Técnicas para implementar paginación en APIs REST.",
    `La paginación es crucial para gestionar grandes colecciones de recursos.
    Las principales estrategias incluyen: paginación basada en offset (?offset=20&limit=10),
    paginación basada en cursor para colecciones grandes, paginación por tiempo para
    feeds cronológicos, y keyset pagination para rendimiento óptimo con índices.
    Se recomienda incluir metadatos de navegación (total_count, next_url, prev_url) y
    Link headers siguiendo RFC 8288 para simplificar la navegación del cliente.`,
    "/pagination",
    "Funcionalidades"
  ),
  
  // Filtrado
  indexPageContent(
    "filtering",
    "Filtrado",
    "Implementación de filtros en APIs REST.",
    `El filtrado permite a los clientes obtener subconjuntos específicos de recursos.
    Se implementa principalmente a través de parámetros de consulta (?status=active&category=books).
    Para filtros complejos, se pueden usar operadores como gt (mayor que), lt (menor que), 
    eq (igual), ne (no igual), convenciones de rangos como price=10:50, o notación de puntos
    para filtrar por propiedades anidadas.`,
    "/filtering",
    "Funcionalidades"
  ),
  
  // Ordenamiento
  indexPageContent(
    "sorting",
    "Ordenamiento",
    "Técnicas para ordenar resultados en APIs REST.",
    `El ordenamiento permite a los clientes controlar el orden de los recursos retornados.
    Se implementa comúnmente con el parámetro sort (?sort=name) o sort_by.
    Para especificar dirección, se usan prefijos como + o - (?sort=-created_at,+name)
    o parámetros separados (?sort=created_at&order=desc).
    Es importante documentar los campos por los que se puede ordenar y establecer ordenamientos
    predeterminados.`,
    "/sorting",
    "Funcionalidades"
  ),
  
  // Recursos Anidados
  indexPageContent(
    "nested-resources",
    "Recursos Anidados",
    "Modelado de relaciones entre recursos en APIs REST.",
    `Los recursos anidados representan relaciones jerárquicas o de pertenencia entre entidades.
    Se implementan mediante URIs que reflejan estas relaciones, como /users/{userId}/posts para
    obtener los posts de un usuario específico. Este enfoque facilita el control de acceso
    y refleja naturalmente relaciones de uno a muchos. Para evitar URIs demasiado profundas,
    se recomienda limitar el anidamiento a no más de 2-3 niveles.`,
    "/nested-resources",
    "Relaciones"
  ),
  
  // Expansión de Campos
  indexPageContent(
    "field-expansion",
    "Expansión de Campos",
    "Técnicas para incluir recursos relacionados en respuestas REST.",
    `La expansión de campos permite incluir recursos relacionados en una sola respuesta,
    reduciendo el problema de under-fetching. Se implementa típicamente con parámetros como
    expand o include (?expand=author,comments). Esto evita múltiples llamadas a la API
    para obtener información relacionada. Se recomienda hacer opcional la expansión,
    permitir expansiones múltiples, e implementar limitaciones para prevenir expansiones
    excesivas.`,
    "/field-expansion",
    "Relaciones"
  ),
  
  // Códigos de Estado
  indexPageContent(
    "status-codes",
    "Códigos de Estado",
    "Uso correcto de códigos de estado HTTP en APIs REST.",
    `Los códigos de estado HTTP comunican efectivamente el resultado de una operación.
    Códigos comunes incluyen 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request),
    401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 409 (Conflict) y 500 (Server Error).
    Es importante usar códigos específicos en lugar de depender solo de 200 OK con mensajes
    de error en el cuerpo.`,
    "/status-codes",
    "Respuestas"
  ),
  
  // Formatos de Respuesta
  indexPageContent(
    "response-formats",
    "Formatos de Respuesta",
    "Estructuras y formatos para respuestas en APIs REST.",
    `Un formato de respuesta consistente mejora la experiencia del desarrollador.
    Para respuestas exitosas, se recomienda devolver: el recurso principal o colección,
    metadatos como paginación, e hipervínculos para navegación (HATEOAS).
    Para errores, incluir: código de estado, mensaje legible, código de error interno,
    detalles específicos, y documentación.`,
    "/response-formats",
    "Respuestas"
  ),
  
  // Manejo de Errores
  indexPageContent(
    "error-handling",
    "Manejo de Errores",
    "Estrategias para manejo de errores en APIs REST.",
    `Un sistema robusto de manejo de errores mejora la debugueabilidad y experiencia de uso.
    Se recomienda un formato consistente con: código HTTP apropiado, tipo de error,
    mensaje para humanos, detalles técnicos, e información de soporte.
    Para validación de datos, estructurar errores por campo afectado.
    Las mejores prácticas incluyen: errores granulares, documentación completa,
    y mensajes de ayuda accionables.`,
    "/error-handling",
    "Respuestas"
  ),
  
  // Autenticación
  indexPageContent(
    "authentication",
    "Autenticación",
    "Métodos de autenticación para APIs REST.",
    `La autenticación verifica la identidad de quienes acceden a la API. Las técnicas comunes incluyen:
    API Keys para APIs públicas sencillas, Basic Authentication para casos simples,
    OAuth 2.0 para autorización delegada, y JWT para comunicación stateless y microservicios.
    Se cubren mejores prácticas como: comunicación siempre sobre HTTPS, manejo seguro de credenciales,
    y límites de intentos fallidos.`,
    "/authentication",
    "Seguridad"
  ),
  
  // Autorización
  indexPageContent(
    "authorization",
    "Autorización",
    "Control de acceso a recursos en APIs REST.",
    `La autorización determina qué acciones puede realizar un usuario autenticado.
    Se cubren modelos comunes como: RBAC (Role-Based Access Control), ABAC (Attribute-Based),
    ACLs (Access Control Lists), y autorización basada en OAuth 2.0 scopes.
    Las mejores prácticas incluyen: aplicar principio de mínimo privilegio,
    centralizar lógica de autorización, y documentar permisos claramente.`,
    "/authorization",
    "Seguridad"
  ),
  
  // Prácticas de Seguridad
  indexPageContent(
    "security-practices",
    "Mejores Prácticas",
    "Prácticas de seguridad recomendadas para APIs REST.",
    `La seguridad de APIs requiere un enfoque integral. Se cubren aspectos críticos como:
    protección contra inyecciones (SQL, NoSQL, etc.), mitigación de ataques XSS y CSRF,
    implementación de rate limiting y throttling, validación rigurosa de entradas,
    prevención de exposición de datos sensibles, configuración adecuada de CORS,
    y uso de encabezados de seguridad (CSP, HSTS).`,
    "/security-practices",
    "Seguridad"
  ),
  
  // OpenAPI/Swagger
  indexPageContent(
    "openapi",
    "OpenAPI/Swagger",
    "Documentación de APIs con OpenAPI y Swagger.",
    `OpenAPI (anteriormente Swagger) es el estándar más popular para documentar APIs REST.
    Esta especificación permite describir la API de forma completa: endpoints, parámetros,
    esquemas de datos, respuestas, autenticación y más. Ofrece beneficios como generación
    automática de documentación interactiva, generación de clientes y servidores, y testing.`,
    "/openapi",
    "Documentación"
  ),
  
  // Ejemplos Prácticos
  indexPageContent(
    "examples",
    "Ejemplos Prácticos",
    "Ejemplos reales de implementación de APIs REST.",
    `Esta sección proporciona ejemplos completos de APIs REST bien diseñadas.
    Incluye implementaciones de referencia para casos de uso comunes como:
    API de gestión de usuarios, API de e-commerce, API de blog, y API de servicios
    geoespaciales. Cada ejemplo muestra rutas, métodos, formatos de respuesta,
    manejo de errores, autenticación, y documentación OpenAPI.`,
    "/examples",
    "Documentación"
  ),
  
  // Limitaciones REST
  indexPageContent(
    "rest-limitations",
    "Limitaciones REST",
    "Restricciones y desafíos del modelo REST para APIs complejas.",
    `REST ha dominado el diseño de APIs web por su simplicidad y flexibilidad, pero presenta
    limitaciones para aplicaciones complejas. Los principales desafíos incluyen ineficiencia en
    obtención de datos (over-fetching y under-fetching), dificultad con operaciones por lotes,
    limitaciones con operaciones no-CRUD, manejo de estado para operaciones largas,
    comunicación en tiempo real, contratos débiles entre cliente y servidor, y problemas de
    rendimiento por múltiples viajes de red.`,
    "/rest-limitations",
    "API Avanzada"
  ),
  
  // Alternativas a REST
  indexPageContent(
    "alternatives",
    "Alternativas a REST",
    "Enfoques alternativos para diseñar APIs web.",
    `Ante las limitaciones de REST, varias alternativas han ganado popularidad:
    GraphQL ofrece consultas flexibles y resolución de over/under-fetching;
    gRPC proporciona comunicación de alto rendimiento con buffers de protocolo;
    WebSockets permite comunicación bidireccional en tiempo real;
    MQTT es ideal para IoT y comunicaciones con bajo ancho de banda;
    y Event-driven APIs (Kafka, RabbitMQ) para sistemas reactivos y desacoplados.`,
    "/alternatives",
    "API Avanzada"
  ),
  
  // Patrones Escalables
  indexPageContent(
    "scalable-patterns",
    "Patrones Escalables",
    "Patrones de diseño para APIs REST escalables.",
    `El diseño de APIs REST escalables requiere considerar tanto aspectos técnicos como organizacionales.
    Entre los patrones recomendados se incluyen: API Gateway para enrutamiento y agregación,
    Backend for Frontend (BFF) para optimizar respuestas según el cliente,
    CQRS para separar operaciones de lectura y escritura, Event Sourcing para historial de cambios,
    y Circuit Breakers para manejo de fallos.`,
    "/scalable-patterns",
    "API Avanzada"
  )
];

/**
 * Devuelve los datos indexados para la búsqueda
 */
export function getSearchData(): SearchableContent[] {
  return indexedSearchData;
}

/**
 * En una aplicación real, esta función podría cargar datos de un
 * servicio de backend o indexar contenido dinámicamente
 */
export async function loadSearchIndex(): Promise<SearchableContent[]> {
  // Simular carga asíncrona
  return new Promise(resolve => {
    setTimeout(() => resolve(indexedSearchData), 100);
  });
} 