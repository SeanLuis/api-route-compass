import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, FileText, Tag, AlertTriangle, Info } from "lucide-react";

const Naming = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/route-structure" className="text-sm text-slate-500 hover:text-slate-700">Rutas y Recursos</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Nomenclatura de APIs REST</h1>
          <p className="text-lg text-slate-700">
            Convenciones para nombrar recursos y rutas de forma efectiva.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
            <p className="text-slate-800">
              Establecer convenciones claras para nombrar recursos y rutas es esencial para crear APIs REST intuitivas,
              consistentes y fáciles de usar. Las buenas prácticas de nomenclatura mejoran la experiencia del desarrollador
              y reducen la curva de aprendizaje de tu API.
            </p>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-500" />
            Principios Generales
          </h2>
          
          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Usar Sustantivos en Plural para Colecciones</h3>
                </div>
                <p className="text-slate-700">
                  Los recursos en REST representan entidades o conceptos, por lo que deben nombrarse con sustantivos.
                  Para colecciones de recursos, utiliza la forma plural para indicar que el recurso representa múltiples elementos.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div>
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    <h4 className="font-medium text-red-600">Incorrecto</h4>
                  </div>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code="/getAllUsers\n/user\n/createProduct"
                      language="http"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <h4 className="font-medium text-green-600">Correcto</h4>
                  </div>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code="/users\n/users/123\n/products"
                      language="http"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <h3 className="text-lg font-semibold">Evitar Verbos en las Rutas Principales</h3>
                </div>
                <p className="text-slate-700">
                  Los verbos HTTP (GET, POST, PUT, DELETE) ya indican la acción a realizar. Añadir verbos
                  en las URLs crea redundancia y rompe el modelo REST.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div>
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    <h4 className="font-medium text-red-600">Incorrecto</h4>
                  </div>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code="/getUsers\n/createUser\n/deleteProduct/123"
                      language="http"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <h4 className="font-medium text-green-600">Correcto</h4>
                  </div>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code="GET /users\nPOST /users\nDELETE /products/123"
                      language="http"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Usar kebab-case para Múltiples Palabras</h3>
                </div>
                <p className="text-slate-700">
                  Cuando un recurso requiere múltiples palabras, usar kebab-case (palabras en minúscula separadas por guiones)
                  es la convención más ampliamente aceptada para URLs.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div>
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    <h4 className="font-medium text-red-600">Incorrecto</h4>
                  </div>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code="/productCategories\n/product_categories\n/ProductCategories"
                      language="http"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <h4 className="font-medium text-green-600">Correcto</h4>
                  </div>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code="/product-categories\n/shipping-addresses\n/invoice-items"
                      language="http"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold">Evitar Extensiones de Archivo</h3>
                </div>
                <p className="text-slate-700">
                  No incluyas extensiones de archivo (.json, .xml) en las URLs. Utiliza las cabeceras HTTP
                  para negociación del formato de contenido.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div>
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    <h4 className="font-medium text-red-600">Incorrecto</h4>
                  </div>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code="/products.json\n/users.xml"
                      language="http"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <h4 className="font-medium text-green-600">Correcto</h4>
                  </div>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code="/products\n# Con cabecera Accept: application/json\n\n/users\n# Con cabecera Accept: application/xml"
                      language="http"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 mt-10">
            <FileText className="h-5 w-5 text-indigo-500" />
            Nombres para Casos Especiales
          </h2>
          
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
            <h3 className="text-lg font-semibold tracking-tight mb-4 flex items-center gap-2 text-indigo-800">
              <AlertTriangle className="h-4 w-4" />
              Acciones que No Encajan en CRUD
            </h3>
            
            <p className="mb-4 text-indigo-900">
              Para operaciones que no encajan en el modelo CRUD estándar, considera estas opciones:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Sub-recursos</h4>
                  <p className="text-sm text-slate-600 mb-2">
                    Para representar acciones específicas sobre un recurso
                  </p>
                  <div className="bg-slate-100 rounded-md p-3">
                    <code className="text-xs">POST /orders/123/cancellation</code>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Acciones específicas</h4>
                  <p className="text-sm text-slate-600 mb-2">
                    Para casos donde es necesario expresar verbos
                  </p>
                  <div className="bg-slate-100 rounded-md p-3 space-y-2">
                    <code className="text-xs block">POST /orders/123/actions/cancel</code>
                    <code className="text-xs block">POST /emails/123/actions/resend</code>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card className="border border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Búsquedas y Filtros</h3>
                </div>
                <p className="text-slate-700">
                  Utiliza query parameters para búsquedas, filtros y ordenamiento en lugar de crear nuevas rutas.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div>
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    <h4 className="font-medium text-red-600">Incorrecto</h4>
                  </div>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code="/searchUsers?q=john\n/findProductsByCategory/electronics"
                      language="http"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <h4 className="font-medium text-green-600">Correcto</h4>
                  </div>
                  <div className="bg-slate-900 rounded-md overflow-hidden">
                    <CodeBlock
                      code="/users?q=john\n/products?category=electronics"
                      language="http"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-10 bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
            <h2 className="text-xl font-semibold tracking-tight mb-3 text-amber-800">Consistencia es Clave</h2>
            <p className="text-amber-700 mb-3">
              Independientemente de las convenciones específicas que elijas, lo más importante es mantener
              la consistencia en toda tu API. Documenta tus convenciones de nomenclatura y asegúrate
              de que todo el equipo las siga.
            </p>
            <div className="mt-4 bg-white rounded-lg p-5 border border-amber-200">
              <blockquote className="italic text-slate-600">
                "Una API bien nombrada es intuitiva y permite a los desarrolladores adivinar correctamente cómo interactuar con ella, 
                incluso antes de leer la documentación completa."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Naming;
