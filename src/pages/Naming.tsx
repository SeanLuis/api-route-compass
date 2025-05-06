
import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";

const Naming = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Nomenclatura de APIs REST" 
        description="Convenciones para nombrar recursos y rutas de forma efectiva."
        path={["Rutas y Recursos", "Nomenclatura"]}
      >
        <p>
          Establecer convenciones claras para nombrar recursos y rutas es esencial para crear APIs REST intuitivas,
          consistentes y fáciles de usar. Las buenas prácticas de nomenclatura mejoran la experiencia del desarrollador
          y reducen la curva de aprendizaje de tu API.
        </p>

        <h2>Principios Generales</h2>
        
        <h3>Usar Sustantivos en Plural para Colecciones</h3>
        <p>
          Los recursos en REST representan entidades o conceptos, por lo que deben nombrarse con sustantivos.
          Para colecciones de recursos, utiliza la forma plural para indicar que el recurso representa múltiples elementos.
        </p>
        
        <div className="grid grid-cols-2 gap-4 my-6">
          <div>
            <h4 className="font-medium text-sm mb-2 text-red-500">Incorrecto ❌</h4>
            <CodeBlock
              code={`/getAllUsers\n/user\n/createProduct`}
              language="http"
            />
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2 text-green-500">Correcto ✓</h4>
            <CodeBlock
              code={`/users\n/users/123\n/products`}
              language="http"
            />
          </div>
        </div>
        
        <h3>Evitar Verbos en las Rutas Principales</h3>
        <p>
          Los verbos HTTP (GET, POST, PUT, DELETE) ya indican la acción a realizar. Añadir verbos
          en las URLs crea redundancia y rompe el modelo REST.
        </p>
        
        <div className="grid grid-cols-2 gap-4 my-6">
          <div>
            <h4 className="font-medium text-sm mb-2 text-red-500">Incorrecto ❌</h4>
            <CodeBlock
              code={`/getUsers\n/createUser\n/deleteProduct/123`}
              language="http"
            />
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2 text-green-500">Correcto ✓</h4>
            <CodeBlock
              code={`GET /users\nPOST /users\nDELETE /products/123`}
              language="http"
            />
          </div>
        </div>
        
        <h3>Usar kebab-case para Múltiples Palabras</h3>
        <p>
          Cuando un recurso requiere múltiples palabras, usar kebab-case (palabras en minúscula separadas por guiones)
          es la convención más ampliamente aceptada para URLs.
        </p>
        
        <div className="grid grid-cols-2 gap-4 my-6">
          <div>
            <h4 className="font-medium text-sm mb-2 text-red-500">Incorrecto ❌</h4>
            <CodeBlock
              code={`/productCategories\n/product_categories\n/ProductCategories`}
              language="http"
            />
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2 text-green-500">Correcto ✓</h4>
            <CodeBlock
              code={`/product-categories\n/shipping-addresses\n/invoice-items`}
              language="http"
            />
          </div>
        </div>
        
        <h3>Evitar Extensiones de Archivo</h3>
        <p>
          No incluyas extensiones de archivo (.json, .xml) en las URLs. Utiliza las cabeceras HTTP
          para negociación del formato de contenido.
        </p>
        
        <div className="grid grid-cols-2 gap-4 my-6">
          <div>
            <h4 className="font-medium text-sm mb-2 text-red-500">Incorrecto ❌</h4>
            <CodeBlock
              code={`/products.json\n/users.xml`}
              language="http"
            />
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2 text-green-500">Correcto ✓</h4>
            <CodeBlock
              code={`/products\n# Con cabecera Accept: application/json\n\n/users\n# Con cabecera Accept: application/xml`}
              language="http"
            />
          </div>
        </div>
        
        <h2>Nombres para Casos Especiales</h2>
        
        <h3>Acciones que No Encajan en CRUD</h3>
        <p>
          Para operaciones que no encajan en el modelo CRUD estándar, considera estas opciones:
        </p>
        
        <ul>
          <li><strong>Sub-recursos:</strong> Para representar acciones específicas sobre un recurso</li>
          <li><strong>Acciones específicas:</strong> Para casos donde es necesario expresar verbos</li>
        </ul>
        
        <div className="my-6">
          <h4 className="font-medium text-sm mb-2">Ejemplos para Casos Especiales</h4>
          <CodeBlock
            code={`# Sub-recurso
POST /orders/123/cancellation

# Acciones específicas
POST /orders/123/actions/cancel
POST /emails/123/actions/resend`}
            language="http"
          />
        </div>
        
        <h3>Búsquedas y Filtros</h3>
        <p>
          Utiliza query parameters para búsquedas, filtros y ordenamiento en lugar de crear nuevas rutas.
        </p>
        
        <div className="grid grid-cols-2 gap-4 my-6">
          <div>
            <h4 className="font-medium text-sm mb-2 text-red-500">Incorrecto ❌</h4>
            <CodeBlock
              code={`/searchUsers?q=john\n/findProductsByCategory/electronics`}
              language="http"
            />
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2 text-green-500">Correcto ✓</h4>
            <CodeBlock
              code={`/users?q=john\n/products?category=electronics`}
              language="http"
            />
          </div>
        </div>
        
        <h2>Consistencia es Clave</h2>
        <p>
          Independientemente de las convenciones específicas que elijas, lo más importante es mantener
          la consistencia en toda tu API. Documenta tus convenciones de nomenclatura y asegúrate
          de que todo el equipo las siga.
        </p>
        
        <blockquote>
          "Una API bien nombrada es intuitiva y permite a los desarrolladores adivinar correctamente cómo interactuar con ella, 
          incluso antes de leer la documentación completa."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default Naming;
