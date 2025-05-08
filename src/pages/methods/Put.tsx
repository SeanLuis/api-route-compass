
import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { EndpointExample } from "@/components/EndpointExample";
import { RouteExample } from "@/components/RouteExample";
import { CodeBlock } from "@/components/CodeBlock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const PutMethodPage = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Método PUT" 
        description="El método PUT se utiliza para reemplazar completamente un recurso existente con la representación proporcionada, o crearlo si no existe. A diferencia de PATCH, que actualiza parcialmente, PUT sustituye el recurso por completo."
        path={["Inicio", "Métodos HTTP", "PUT"]}
      >
        {/* Características principales */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Características principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Reemplazo completo
              </h3>
              <p className="text-sm text-slate-700">
                Reemplaza todas las propiedades del recurso por las enviadas.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Es idempotente
              </h3>
              <p className="text-sm text-slate-700">
                Múltiples solicitudes idénticas tienen el mismo efecto que una sola.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <X className="h-4 w-4 text-red-600 mr-2" />
                No es seguro
              </h3>
              <p className="text-sm text-slate-700">
                Modifica el estado del recurso en el servidor.
              </p>
            </div>
            
            <div className="p-5 border rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
              <h3 className="flex items-center text-base font-medium mb-2">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Requiere el recurso completo
              </h3>
              <p className="text-sm text-slate-700">
                Se deben enviar todos los campos del recurso, no solo los que cambian.
              </p>
            </div>
          </div>
        </section>
        
        {/* Casos de uso comunes */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Casos de uso comunes</h2>
          
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium mb-2">Actualización completa de un recurso</h3>
                <p className="text-sm text-slate-600">Reemplaza todos los datos de un producto</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="PUT"
                  path="/api/v1/products/prod_123"
                  description="Actualiza completamente un producto existente"
                  requestExample={`{
  "name": "Smartphone Pro Max",
  "description": "Versión actualizada del teléfono inteligente de alta gama",
  "price": 899.99,
  "category": "electronics",
  "stock": 50,
  "specifications": {
    "screen": "6.7 inches",
    "processor": "Octa-core 3.0GHz",
    "ram": "12GB",
    "storage": "256GB",
    "camera": "64MP triple lens"
  },
  "tags": ["smartphone", "premium", "5g"]
}`}
                  responseExample={`{
  "id": "prod_123",
  "name": "Smartphone Pro Max",
  "description": "Versión actualizada del teléfono inteligente de alta gama",
  "price": 899.99,
  "category": "electronics",
  "stock": 50,
  "specifications": {
    "screen": "6.7 inches",
    "processor": "Octa-core 3.0GHz",
    "ram": "12GB",
    "storage": "256GB",
    "camera": "64MP triple lens"
  },
  "tags": ["smartphone", "premium", "5g"],
  "created_at": "2023-01-15T10:30:00Z",
  "updated_at": "2023-06-12T15:20:00Z"
}`}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium mb-2">Creación de un recurso con identificador conocido</h3>
                <p className="text-sm text-slate-600">Crea un recurso con un ID específico si no existe</p>
              </div>
              <div className="p-5">
                <EndpointExample 
                  method="PUT"
                  path="/api/v1/configurations/site-settings"
                  description="Crea o reemplaza la configuración del sitio"
                  requestExample={`{
  "title": "Mi Tienda Online",
  "description": "Tienda de productos electrónicos",
  "theme": {
    "primary_color": "#3498db",
    "secondary_color": "#2ecc71",
    "font": "Roboto"
  },
  "contact": {
    "email": "info@mitienda.com",
    "phone": "+1234567890",
    "address": "Calle Principal 123"
  },
  "features": {
    "reviews_enabled": true,
    "newsletter_popup": false,
    "maintenance_mode": false
  }
}`}
                  responseExample={`{
  "id": "site-settings",
  "title": "Mi Tienda Online",
  "description": "Tienda de productos electrónicos",
  "theme": {
    "primary_color": "#3498db",
    "secondary_color": "#2ecc71",
    "font": "Roboto"
  },
  "contact": {
    "email": "info@mitienda.com",
    "phone": "+1234567890",
    "address": "Calle Principal 123"
  },
  "features": {
    "reviews_enabled": true,
    "newsletter_popup": false,
    "maintenance_mode": false
  },
  "updated_at": "2023-06-12T15:25:00Z"
}`}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Códigos de estado comunes */}
        <section className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Códigos de estado comunes</h2>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 w-[140px] font-medium">200 OK</td>
                  <td className="p-4 text-sm">El recurso existente fue actualizado exitosamente.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">201 Created</td>
                  <td className="p-4 text-sm">Se creó un nuevo recurso (si no existía previamente).</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">204 No Content</td>
                  <td className="p-4 text-sm">Actualización exitosa sin devolver contenido en la respuesta.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 bg-slate-50 font-medium">400 Bad Request</td>
                  <td className="p-4 text-sm">La solicitud tiene un formato inválido o datos incorrectos.</td>
                </tr>
                <tr>
                  <td className="p-4 bg-slate-50 font-medium">404 Not Found</td>
                  <td className="p-4 text-sm">El recurso especificado no existe y el servidor no permite crearlo.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Mejores prácticas */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Mejores prácticas</h2>
          
          <Alert variant="default" className="bg-blue-50 border-blue-100">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-800 text-base">Idempotencia garantizada</AlertTitle>
            <AlertDescription className="text-blue-700">
              Asegúrate de que tu implementación de PUT sea verdaderamente idempotente. Múltiples 
              solicitudes idénticas deben producir el mismo estado del recurso.
            </AlertDescription>
          </Alert>
          
          <div className="mt-6 space-y-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-5 border-b bg-slate-50">
                <h3 className="text-lg font-medium">Considerar las validaciones</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 p-5">
                <div>
                  <h4 className="font-medium text-sm mb-3 text-green-600">Correcto ✓</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border">
                    <CodeBlock
                      code={`PUT /api/v1/users/user_123
Content-Type: application/json

{
  "name": "Carlos Pérez",
  "email": "carlos@example.com",
  "role": "user",
  "settings": {
    "language": "es",
    "notifications": true,
    "theme": "dark"
  }
}`}
                      language="http"
                    />
                  </div>
                  <p className="mt-3 text-xs text-slate-600">
                    Proporciona todos los campos requeridos para el recurso completo.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-3 text-red-600 mt-4 md:mt-0">Incorrecto ❌</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border">
                    <CodeBlock
                      code={`PUT /api/v1/users/user_123
Content-Type: application/json

{
  "name": "Carlos Pérez",
  "role": "admin"
}`}
                      language="http"
                    />
                  </div>
                  <p className="mt-3 text-xs text-slate-600">
                    Falta información (email, settings) que ahora se perderá en el recurso.
                  </p>
                </div>
              </div>
            </div>
            
            <Alert variant="default" className="bg-amber-50 border-amber-100">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <AlertTitle className="text-amber-800 text-base">Precaución con datos faltantes</AlertTitle>
              <AlertDescription className="text-amber-700">
                Con PUT, cualquier propiedad no incluida en la solicitud se eliminará o establecerá a valores por defecto.
                Si solo deseas actualizar algunos campos, considera usar PATCH en su lugar.
              </AlertDescription>
            </Alert>
          </div>
        </section>
        
        {/* PUT vs PATCH vs POST */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">PUT vs. PATCH vs. POST</h2>
          
          <div className="overflow-hidden border rounded-lg shadow-sm">
            <table className="w-full border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-4 font-medium text-slate-700">Característica</th>
                  <th className="text-left p-4 font-medium text-slate-700">PUT</th>
                  <th className="text-left p-4 font-medium text-slate-700">PATCH</th>
                  <th className="text-left p-4 font-medium text-slate-700">POST</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4 font-medium text-slate-700">Propósito</td>
                  <td className="p-4 text-sm text-slate-600">Reemplazo completo</td>
                  <td className="p-4 text-sm text-slate-600">Actualización parcial</td>
                  <td className="p-4 text-sm text-slate-600">Creación</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">Idempotencia</td>
                  <td className="p-4 text-sm text-slate-600">Sí</td>
                  <td className="p-4 text-sm text-slate-600">No siempre</td>
                  <td className="p-4 text-sm text-slate-600">No</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">Uso en recursos existentes</td>
                  <td className="p-4 text-sm text-slate-600">Reemplaza el recurso</td>
                  <td className="p-4 text-sm text-slate-600">Modifica parcialmente</td>
                  <td className="p-4 text-sm text-slate-600">Generalmente no aplica</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-700">Si el recurso no existe</td>
                  <td className="p-4 text-sm text-slate-600">Puede crearlo</td>
                  <td className="p-4 text-sm text-slate-600">Error 404 normalmente</td>
                  <td className="p-4 text-sm text-slate-600">Lo crea</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Relacionados */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/methods/patch" className="block p-5 border rounded-lg hover:bg-slate-50 transition-colors">
              <h3 className="font-medium mb-2">Método PATCH</h3>
              <p className="text-sm text-slate-600">Actualizar parcialmente recursos</p>
            </Link>
            <Link to="/methods/post" className="block p-5 border rounded-lg hover:bg-slate-50 transition-colors">
              <h3 className="font-medium mb-2">Método POST</h3>
              <p className="text-sm text-slate-600">Crear nuevos recursos</p>
            </Link>
            <Link to="/methods" className="block p-5 border rounded-lg hover:bg-slate-50 transition-colors">
              <h3 className="font-medium mb-2">Métodos HTTP</h3>
              <p className="text-sm text-slate-600">Vista general de métodos REST</p>
            </Link>
          </div>
        </section>
      </PageContent>
    </PageLayout>
  );
};

export default PutMethodPage;
