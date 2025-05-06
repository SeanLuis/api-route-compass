
import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";

const Patch = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Método PATCH" 
        description="Uso correcto del método PATCH para actualizar parcialmente recursos."
        path={["Métodos HTTP", "PATCH"]}
      >
        <p>
          El método PATCH se utiliza para aplicar modificaciones parciales a un recurso. A diferencia de PUT, 
          que reemplaza el recurso completo, PATCH permite actualizar solo los campos específicos que necesitan 
          cambios, lo que lo hace más eficiente para actualizaciones pequeñas o frecuentes.
        </p>
        
        <h2>Principios del Método PATCH</h2>
        
        <ul>
          <li><strong>Actualización parcial:</strong> Modifica solo los campos especificados en la solicitud</li>
          <li><strong>No idempotente por defecto:</strong> Múltiples solicitudes idénticas pueden producir resultados diferentes</li>
          <li><strong>Puede ser idempotente:</strong> Si se implementa con formatos como JSON Patch o JSON Merge Patch</li>
          <li><strong>Preserva valores:</strong> Los campos no incluidos en la solicitud mantienen sus valores existentes</li>
        </ul>
        
        <h2>Casos de Uso</h2>
        
        <h3>1. Actualización Parcial con Formato Simple</h3>
        
        <EndpointExample
          method="PATCH"
          path="/api/v1/products/prod_123"
          description="Actualiza solo algunos campos de un producto."
          requestExample={`{
  "price": 549.99,
  "stock": 75,
  "specifications": {
    "camera": "48MP ultra-wide"
  }
}`}
          responseExample={`{
  "id": "prod_123",
  "name": "Smartphone Pro",
  "description": "Teléfono inteligente de alta gama",
  "price": 549.99,
  "category": "electronics",
  "stock": 75,
  "specifications": {
    "screen": "6.5 inches",
    "processor": "Octa-core 2.5GHz",
    "ram": "8GB",
    "storage": "128GB",
    "camera": "48MP ultra-wide"
  },
  "created_at": "2023-01-15T10:30:00Z",
  "updated_at": "2023-06-11T09:15:00Z"
}`}
        />
        
        <h3>2. Actualización con JSON Patch</h3>
        <p>
          JSON Patch (RFC 6902) proporciona un formato estandarizado para describir cambios en un documento JSON.
        </p>
        
        <EndpointExample
          method="PATCH"
          path="/api/v1/products/prod_123"
          description="Actualiza un producto usando JSON Patch."
          requestExample={`[
  { "op": "replace", "path": "/price", "value": 549.99 },
  { "op": "replace", "path": "/stock", "value": 75 },
  { "op": "add", "path": "/specifications/camera", "value": "48MP ultra-wide" },
  { "op": "remove", "path": "/tags/2" }
]`}
          responseExample={`{
  "id": "prod_123",
  "name": "Smartphone Pro",
  "price": 549.99,
  "stock": 75,
  "specifications": {
    "screen": "6.5 inches",
    "processor": "Octa-core 2.5GHz",
    "camera": "48MP ultra-wide"
  },
  "tags": ["smartphone", "5g"],
  "updated_at": "2023-06-11T09:20:00Z"
}`}
        />
        
        <h3>3. Actualización con JSON Merge Patch</h3>
        <p>
          JSON Merge Patch (RFC 7396) es otra forma estandarizada, más simple que JSON Patch.
        </p>
        
        <EndpointExample
          method="PATCH"
          path="/api/v1/users/user_123"
          description="Actualiza información de usuario con JSON Merge Patch."
          requestExample={`{
  "name": "Juan García",
  "contact": {
    "email": "juan.garcia@example.com",
    "phone": null
  }
}`}
          responseExample={`{
  "id": "user_123",
  "name": "Juan García",
  "username": "juanito",
  "contact": {
    "email": "juan.garcia@example.com"
  },
  "preferences": {
    "notifications": true,
    "theme": "dark"
  },
  "updated_at": "2023-06-11T09:25:00Z"
}`}
        />
        
        <h2>Formatos para PATCH</h2>
        
        <h3>1. Formato Simple (Ad Hoc)</h3>
        <p>
          El formato más común pero menos estandarizado, donde simplemente se envían los campos a actualizar.
        </p>
        
        <CodeBlock
          code={`PATCH /api/v1/profiles/profile_123
Content-Type: application/json

{
  "bio": "Desarrollador full-stack con pasión por la UX",
  "website": "https://mipaginaweb.com"
}`}
          language="http"
        />
        
        <h3>2. JSON Patch (RFC 6902)</h3>
        <p>
          Un formato basado en operaciones que permite actualizaciones complejas, secuenciales y atómicas.
        </p>
        
        <CodeBlock
          code={`PATCH /api/v1/documents/doc_123
Content-Type: application/json-patch+json

[
  { "op": "test", "path": "/version", "value": 2 },
  { "op": "replace", "path": "/title", "value": "Nuevo título" },
  { "op": "add", "path": "/sections/-", "value": { "id": "sec_5", "content": "Nueva sección" } },
  { "op": "move", "from": "/sections/1", "path": "/sections/0" },
  { "op": "copy", "from": "/metadata/author", "path": "/contributors/0" },
  { "op": "remove", "path": "/temporary_data" }
]`}
          language="http"
        />
        
        <p>
          Operaciones disponibles en JSON Patch:
        </p>
        <ul>
          <li><strong>add:</strong> Añade un valor a un objeto o array</li>
          <li><strong>remove:</strong> Elimina un valor</li>
          <li><strong>replace:</strong> Reemplaza un valor</li>
          <li><strong>move:</strong> Mueve un valor de una ubicación a otra</li>
          <li><strong>copy:</strong> Copia un valor de una ubicación a otra</li>
          <li><strong>test:</strong> Verifica que un valor en la ruta especificada sea igual al proporcionado</li>
        </ul>
        
        <h3>3. JSON Merge Patch (RFC 7396)</h3>
        <p>
          Un formato más simple que JSON Patch, pero que permite manejar correctamente valores nulos.
        </p>
        
        <CodeBlock
          code={`PATCH /api/v1/settings/app_123
Content-Type: application/merge-patch+json

{
  "display_name": "Mi Aplicación Pro",
  "theme": {
    "primary_color": "#3498db",
    "dark_mode": true
  },
  "notifications": {
    "email": null,
    "push": true
  }
}`}
          language="http"
        />
        
        <h2>Buenas Prácticas</h2>
        
        <h3>Idempotencia en PATCH</h3>
        <p>
          Aunque PATCH no es inherentemente idempotente, puedes hacerlo idempotente:
        </p>
        <ul>
          <li>Usando identificadores de solicitud únicos</li>
          <li>Implementando operaciones condicionales</li>
          <li>Utilizando JSON Patch con operaciones test</li>
        </ul>
        
        <h3>Validación de Campos</h3>
        <p>
          Valida tanto los campos individuales como el estado final del recurso después de aplicar el parche:
        </p>
        
        <CodeBlock
          code={`HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{
  "errors": {
    "price": ["El precio no puede ser negativo"],
    "state": ["Un producto no puede estar activo con stock cero"]
  },
  "message": "La actualización produciría un estado inválido del recurso"
}`}
          language="http"
        />
        
        <h3>Códigos de Estado para PATCH</h3>
        <p>
          Códigos de estado comunes para respuestas PATCH:
        </p>
        
        <ul>
          <li><strong>200 OK:</strong> Actualización exitosa con el recurso actualizado en la respuesta</li>
          <li><strong>204 No Content:</strong> Actualización exitosa sin contenido en la respuesta</li>
          <li><strong>400 Bad Request:</strong> Formato de parche inválido</li>
          <li><strong>404 Not Found:</strong> El recurso a actualizar no existe</li>
          <li><strong>409 Conflict:</strong> Conflicto con el estado actual del recurso</li>
          <li><strong>415 Unsupported Media Type:</strong> Formato de parche no soportado</li>
          <li><strong>422 Unprocessable Entity:</strong> El parche es válido pero no se puede aplicar</li>
        </ul>
        
        <h3>Especificar el Formato</h3>
        <p>
          Usa los tipos de contenido correctos para indicar el formato de PATCH:
        </p>
        
        <ul>
          <li><strong>application/json:</strong> Para el formato simple</li>
          <li><strong>application/json-patch+json:</strong> Para JSON Patch (RFC 6902)</li>
          <li><strong>application/merge-patch+json:</strong> Para JSON Merge Patch (RFC 7396)</li>
        </ul>
        
        <h2>Consideraciones de Implementación</h2>
        
        <h3>Actualizaciones Atómicas</h3>
        <p>
          En JSON Patch, asegúrate de que todas las operaciones se apliquen como una unidad atómica:
          si una operación falla, ninguna debe aplicarse.
        </p>
        
        <h3>Errores en JSON Patch</h3>
        <p>
          Para JSON Patch, proporciona información detallada sobre qué operación falló:
        </p>
        
        <CodeBlock
          code={`HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{
  "error": "Error al aplicar JSON Patch",
  "operation_index": 3,
  "operation": { "op": "replace", "path": "/stock", "value": -10 },
  "reason": "El stock no puede ser un valor negativo"
}`}
          language="http"
        />
        
        <blockquote>
          "PATCH representa un avance significativo en el diseño de APIs REST, ofreciendo un equilibrio 
          entre eficiencia y expresividad para actualizaciones parciales. Su flexibilidad lo hace ideal 
          para interfaces móviles y otros escenarios donde el ancho de banda es una preocupación."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default Patch;
