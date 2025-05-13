import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent } from "@/components/ui/card";
import { EndpointExample } from "@/components/EndpointExample";
import { Link } from "react-router-dom";
import { Key, Shield, LockKeyhole, Lock, FileKey, UserCheck } from "lucide-react";
import { SecurityBestPractices } from "@/components/SecurityBestPractices";

const Authentication = () => {
  // Final recommendations
  const authRecommendations = [
    { text: "Usar tokens JWT para la mayoría de las APIs REST modernas, con tiempos de expiración cortos", isRecommended: true },
    { text: "Implementar OAuth 2.0 para APIs que necesiten integración con servicios de terceros", isRecommended: true },
    { text: "Utilizar HTTPS para todas las comunicaciones, incluidas llamadas de desarrollo y prueba", isRecommended: true },
    { text: "Establecer políticas de expiración y rotación para tokens y claves API", isRecommended: true },
    { text: "Almacenar credenciales utilizando algoritmos de hash específicos para contraseñas", isRecommended: true },
    { text: "Implementar 2FA para proteger el acceso a recursos sensibles", isRecommended: true },
    { text: "Evitar autenticación básica en entornos de producción sin protecciones adicionales", isRecommended: false },
    { text: "No almacenar tokens en localStorage (vulnerable a XSS) - preferir cookies HttpOnly", isRecommended: false }
  ];

  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/security-practices" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">Seguridad</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4 dark:text-white">Autenticación en APIs REST</h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Métodos y mejores prácticas para implementar autenticación en APIs REST.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <p className="dark:text-slate-300">
            La autenticación es el proceso de verificar la identidad de un cliente que intenta acceder a una API.
            Implementar una autenticación robusta es fundamental para proteger los recursos y garantizar
            que solo usuarios legítimos puedan acceder a la API.
          </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <Shield className="h-5 w-5 text-indigo-500" />
            Métodos de autenticación
          </h2>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <Key className="h-5 w-5 text-blue-500" />
            1. Autenticación basada en tokens
          </h3>

          <p className="dark:text-slate-300">
            El método más común para autenticar APIs REST es mediante tokens. El cliente se autentica una vez 
            (generalmente con credenciales) y recibe un token que utiliza en solicitudes posteriores.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Flujo básico</h4>
                <ol className="space-y-2 dark:text-slate-300">
                  <li>1. El cliente envía credenciales al endpoint de autenticación</li>
                  <li>2. El servidor valida las credenciales y genera un token</li>
                  <li>3. El servidor devuelve el token al cliente</li>
                  <li>4. El cliente incluye el token en las cabeceras de solicitudes posteriores</li>
                  <li>5. El servidor valida el token antes de procesar cada solicitud</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Ventajas</h4>
                <ul className="list-disc pl-4 space-y-2 dark:text-slate-300">
                  <li>Sin estado (stateless) - compatible con arquitecturas distribuidas</li>
                  <li>Escalabilidad - no requiere estado de sesión en el servidor</li>
                  <li>Funciona a través de diferentes dominios y servicios</li>
                  <li>Permite transmitir información sobre el usuario (claims)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h4 className="dark:text-white">JSON Web Tokens (JWT)</h4>
          
          <p className="dark:text-slate-300">
            JWT es un estándar abierto (RFC 7519) para representar claims de forma segura entre dos partes.
            Es uno de los formatos más populares para tokens de autenticación en APIs REST.
          </p>

          <div className="space-y-4 mb-8">
            <p className="dark:text-slate-300">Estructura de un JWT:</p>
            <ol className="space-y-1 dark:text-slate-300">
              <li>• <strong>Header:</strong> Define el tipo de token y algoritmo de firma</li>
              <li>• <strong>Payload:</strong> Contiene los claims (información sobre el usuario)</li>
              <li>• <strong>Signature:</strong> Garantiza que el token no ha sido modificado</li>
            </ol>
          </div>

          <EndpointExample
            method="POST"
            path="/api/v1/auth/login"
            description="Solicitud de autenticación para obtener un JWT"
            responseExample={`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "token_type": "Bearer",
  "expires_in": 3600
}`}
          />

          <CodeBlock
            code={`// Ejemplo de uso en solicitud posterior
GET /api/v1/users/me HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
`}
            language="http"
          />

          <h4 className="dark:text-white">Mejores prácticas para JWT</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Seguridad</h4>
                <ul className="list-disc pl-4 space-y-2 dark:text-slate-300">
                  <li>Usar HTTPS para todas las comunicaciones</li>
                  <li>Establecer tiempos de expiración cortos (15-60 minutos)</li>
                  <li>Implementar tokens de actualización (refresh tokens)</li>
                  <li>Usar algoritmos de firma seguros (al menos HS256 o RS256)</li>
                  <li>Validar todos los campos, incluyendo expiración e issuer</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Claims recomendados</h4>
                <ul className="list-disc pl-4 space-y-2 dark:text-slate-300">
                  <li><code className="dark:bg-slate-800 dark:text-slate-300">sub</code> - Identificador único del usuario</li>
                  <li><code className="dark:bg-slate-800 dark:text-slate-300">iat</code> - Cuándo fue emitido el token</li>
                  <li><code className="dark:bg-slate-800 dark:text-slate-300">exp</code> - Cuándo expira el token</li>
                  <li><code className="dark:bg-slate-800 dark:text-slate-300">iss</code> - Quién emitió el token</li>
                  <li><code className="dark:bg-slate-800 dark:text-slate-300">aud</code> - Para qué audiencia está destinado</li>
                  <li><code className="dark:bg-slate-800 dark:text-slate-300">jti</code> - ID único del token (para revocación)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <LockKeyhole className="h-5 w-5 text-blue-500" />
            2. OAuth 2.0
          </h3>

          <p className="dark:text-slate-300">
            OAuth 2.0 es un protocolo de autorización que permite a aplicaciones de terceros acceder a recursos 
            en nombre del usuario sin exponer sus credenciales. Es ideal para APIs que necesitan integración con 
            servicios externos.
          </p>

          <h4 className="dark:text-white">Flujos comunes de OAuth 2.0</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Authorization Code</h4>
                <p className="mb-2 dark:text-slate-300">Ideal para aplicaciones con servidor.</p>
                <ol className="list-decimal pl-4 space-y-1 dark:text-slate-300">
                  <li>La app redirige al usuario al servidor de autorización</li>
                  <li>El usuario se autentica y autoriza el acceso</li>
                  <li>El servidor redirige de vuelta con un código</li>
                  <li>La app intercambia el código por tokens de acceso</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Client Credentials</h4>
                <p className="mb-2 dark:text-slate-300">Para comunicación servidor a servidor.</p>
                <ol className="list-decimal pl-4 space-y-1 dark:text-slate-300">
                  <li>La aplicación se autentica con su ID y secreto</li>
                  <li>El servidor valida las credenciales</li>
                  <li>El servidor emite un token de acceso</li>
                  <li>La app usa el token para acceder a recursos</li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <EndpointExample
            method="POST"
            path="/oauth/token"
            description="Solicitud de token de acceso (flujo client_credentials)"
            responseExample={`{
  "access_token": "2YotnFZFEjr1zCsicMWpAA",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read write"
}`}
          />

          <h4 className="dark:text-white">OpenID Connect</h4>
          
          <p className="dark:text-slate-300">
            OpenID Connect (OIDC) es una capa de identidad sobre OAuth 2.0 que agrega funcionalidad de
            autenticación. Proporciona información verificada sobre el usuario final a través de tokens JWT.
          </p>

          <CodeBlock
            code={`// Ejemplo de ID Token (JWT) de OpenID Connect
{
  "iss": "https://auth.example.com",
  "sub": "user123",
  "aud": "client456",
  "exp": 1516239022,
  "iat": 1516235422,
  "auth_time": 1516235422,
  "nonce": "abc123",
  "name": "John Doe",
  "given_name": "John",
  "family_name": "Doe",
  "email": "john.doe@example.com",
  "email_verified": true
}`}
            language="javascript"
          />

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <FileKey className="h-5 w-5 text-blue-500" />
            3. Autenticación API Key
          </h3>

          <p className="dark:text-slate-300">
            Las API Keys son credenciales simples que identifican a la aplicación o desarrollador que realiza la llamada.
            Son adecuadas para escenarios con requisitos de seguridad moderados o para APIs públicas.
          </p>

          <div className="space-y-4 mb-8">
            <p className="dark:text-slate-300">Formas comunes de enviar API Keys:</p>
            <ol className="space-y-1 dark:text-slate-300">
              <li>• En la cabecera HTTP personalizada <code className="dark:bg-slate-800 dark:text-slate-300">X-API-Key: your_api_key_here</code></li>
              <li>• Como parámetro de consulta <code className="dark:bg-slate-800 dark:text-slate-300">/api/v1/resource?api_key=your_api_key_here</code></li>
              <li>• En la cabecera de autorización <code className="dark:bg-slate-800 dark:text-slate-300">Authorization: ApiKey your_api_key_here</code></li>
            </ol>
          </div>

          <CodeBlock
            code={`// Ejemplo de solicitud con API Key en cabecera
GET /api/v1/products HTTP/1.1
Host: api.example.com
X-API-Key: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6

// Ejemplo con API Key como parámetro de consulta
GET /api/v1/products?api_key=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6 HTTP/1.1
Host: api.example.com`}
            language="http"
          />

          <h4 className="dark:text-white">Consideraciones de seguridad para API Keys</h4>
          
          <ul className="list-disc pl-6 space-y-2 mb-8 dark:text-slate-300">
            <li>
              <strong>Nivel de protección:</strong> Ofrecen menor seguridad que los tokens JWT u OAuth 2.0
            </li>
            <li>
              <strong>Transmisión:</strong> Siempre usar HTTPS para proteger la transmisión de la clave
            </li>
            <li>
              <strong>Almacenamiento:</strong> Almacenar de forma segura mediante hash, no en texto plano
            </li>
            <li>
              <strong>Revocación:</strong> Implementar mecanismos para revocar y rotar claves
            </li>
            <li>
              <strong>Limitación:</strong> Establecer límites de tasa por clave API
            </li>
            <li>
              <strong>Parámetros de consulta:</strong> Evitar enviar en URLs si es posible (pueden quedar en logs)
            </li>
          </ul>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <Lock className="h-5 w-5 text-blue-500" />
            4. Autenticación HTTP básica
          </h3>

          <p className="dark:text-slate-300">
            La autenticación HTTP básica es un método simple donde el cliente envía un nombre de usuario y contraseña 
            en la cabecera de autorización. Es la forma más sencilla pero menos segura de autenticar solicitudes.
          </p>

          <CodeBlock
            code={`// Ejemplo de autenticación HTTP básica
// Formato: Authorization: Basic base64(username:password)

GET /api/v1/profile HTTP/1.1
Host: api.example.com
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=`}
            language="http"
          />

          <div className="bg-amber-50 border border-amber-200 dark:bg-amber-950/50 dark:border-amber-900/50 rounded-md p-4 mb-8">
            <h4 className="text-amber-800 dark:text-amber-400 font-medium">⚠️ Advertencia</h4>
            <p className="text-amber-800 dark:text-amber-400">
              La autenticación HTTP básica solo debe usarse con HTTPS, ya que las credenciales se envían en 
              cada solicitud con una codificación base64 fácilmente decodificable. No es recomendable para 
              aplicaciones de producción a menos que se combinen con otras medidas de seguridad.
            </p>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <UserCheck className="h-5 w-5 text-indigo-500" />
            Patrones de autenticación
          </h2>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <LockKeyhole className="h-5 w-5 text-blue-500" />
            1. Autenticación de dos factores (2FA)
          </h3>

          <p className="dark:text-slate-300">
            La autenticación de dos factores agrega una capa adicional de seguridad requiriendo dos formas de verificación:
          </p>

          <ol className="list-decimal pl-6 space-y-2 mb-6 dark:text-slate-300">
            <li>
              <strong>Algo que sabes:</strong> contraseña, PIN
            </li>
            <li>
              <strong>Algo que tienes:</strong> dispositivo móvil, token de hardware
            </li>
            <li>
              <strong>Algo que eres:</strong> huella digital, reconocimiento facial
            </li>
          </ol>

          <EndpointExample
            method="POST"
            path="/api/v1/auth/verify-2fa"
            description="Verificación de código 2FA después de la autenticación inicial"
            responseExample={`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "def502003b1cc9096c...",
  "token_type": "Bearer",
  "expires_in": 3600
}`}
          />

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <Lock className="h-5 w-5 text-blue-500" />
            2. Tokens de actualización
          </h3>

          <p className="dark:text-slate-300">
            Los tokens de actualización (refresh tokens) permiten que una aplicación obtenga nuevos tokens de acceso 
            sin requerir que el usuario vuelva a autenticarse. 
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Flujo típico</h4>
                <ol className="list-decimal pl-4 space-y-1 dark:text-slate-300">
                  <li>El usuario se autentica y recibe un token de acceso y un token de actualización</li>
                  <li>El token de acceso se utiliza hasta que expira</li>
                  <li>Cuando expira, la aplicación usa el token de actualización para obtener un nuevo token de acceso</li>
                  <li>El servidor valida el token de actualización y emite un nuevo token de acceso</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Seguridad</h4>
                <ul className="list-disc pl-4 space-y-2 dark:text-slate-300">
                  <li>Los tokens de actualización deben tener una vida útil más larga</li>
                  <li>Almacenar de forma segura (HttpOnly cookies, almacenamiento seguro)</li>
                  <li>Implementar rotación de tokens de actualización</li>
                  <li>Mantener un registro de tokens emitidos para revocación</li>
                  <li>Invalidar todos los tokens cuando se cambia la contraseña</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <CodeBlock
            code={`// Solicitud para refrescar un token
POST /api/v1/auth/refresh HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "refresh_token": "def502003b1cc9096c7a31d4d0c5bac00f91f7d3a1c022..."
}

// Respuesta
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "ghi502003b1cc9096c7a31d4d0c5bac00f91f7...",  // Nuevo refresh token (rotación)
  "token_type": "Bearer",
  "expires_in": 3600
}`}
            language="javascript"
          />

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <Shield className="h-5 w-5 text-indigo-500" />
            Implementación segura
          </h2>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <Lock className="h-5 w-5 text-blue-500" />
            Almacenamiento de contraseñas
          </h3>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 p-6 rounded-lg border border-indigo-100 dark:border-indigo-800 mb-8">
            <h4 className="text-indigo-900 dark:text-indigo-300 font-medium mb-3">Almacenamiento de contraseñas</h4>
            <p className="mb-3 text-indigo-800 dark:text-indigo-300">
              Nunca almacene contraseñas en texto plano. Utilice algoritmos de hash diseñados específicamente para contraseñas:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-indigo-800 dark:text-indigo-300">
              <li><strong>Bcrypt:</strong> Algoritmo adaptativo con factor de costo configurable</li>
              <li><strong>Argon2:</strong> Ganador de la competición de hash de contraseñas (recomendado)</li>
              <li><strong>PBKDF2:</strong> Estándar en entornos que requieren certificación FIPS</li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <Shield className="h-5 w-5 text-indigo-500" />
            Estrategia de seguridad en capas
          </h3>

          <div className="bg-blue-50 border border-blue-200 dark:bg-blue-950/50 dark:border-blue-900/50 rounded-md p-6 mb-8 mt-4">
            <h4 className="text-blue-900 dark:text-blue-300 font-medium mb-2">Seguridad multicapa</h4>
            <p className="text-blue-800 dark:text-blue-300 mb-4">
              Implemente múltiples capas de seguridad para proteger su API:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-blue-800 dark:text-blue-300">
              <li>HTTPS para todas las comunicaciones</li>
              <li>Autenticación robusta mediante tokens o OAuth 2.0</li>
              <li>Autorización granular basada en roles o permisos</li>
              <li>Limitación de tasa para prevenir abusos</li>
              <li>Validación estricta de entrada</li>
              <li>Auditoría y registro de actividades</li>
              <li>Configuración segura de CORS</li>
              <li>Cabeceras de seguridad HTTP (HSTS, CSP, etc.)</li>
            </ul>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <Shield className="h-5 w-5 text-indigo-500" />
            Consideraciones adicionales
          </h2>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <Shield className="h-5 w-5 text-blue-500" />
            CORS y autenticación
          </h3>
          
          <p className="dark:text-slate-300">
            Cross-Origin Resource Sharing (CORS) puede complicar la autenticación en aplicaciones web. 
            Asegúrese de configurarlo correctamente para permitir que clientes legítimos se autentiquen.
          </p>

          <CodeBlock
            code={`// Ejemplo de cabeceras CORS para autenticación
Access-Control-Allow-Origin: https://tuaplicacion.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true`}
            language="http"
          />

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <Shield className="h-5 w-5 text-blue-500" />
            Sesiones vs. Tokens
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Sesiones</h4>
                <p className="mb-2 dark:text-slate-300"><strong>Ventajas:</strong></p>
                <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                  <li>Revocación sencilla (eliminar del servidor)</li>
                  <li>Mejor para datos sensibles o voluminosos</li>
                  <li>Menor sobrecarga en solicitudes</li>
                </ul>
                <p className="mt-3 mb-2 dark:text-slate-300"><strong>Desventajas:</strong></p>
                <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                  <li>Requiere almacenamiento en el servidor</li>
                  <li>Problemas en arquitecturas distribuidas</li>
                  <li>Problemas con CORS</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Tokens</h4>
                <p className="mb-2 dark:text-slate-300"><strong>Ventajas:</strong></p>
                <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                  <li>Sin estado (stateless)</li>
                  <li>Escalabilidad en sistemas distribuidos</li>
                  <li>Mejor para arquitecturas de microservicios</li>
                  <li>Soporta CORS naturalmente</li>
                </ul>
                <p className="mt-3 mb-2 dark:text-slate-300"><strong>Desventajas:</strong></p>
                <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                  <li>Tamaño de las solicitudes</li>
                  <li>Revocación más compleja</li>
                  <li>Más expuestos a XSS</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <UserCheck className="h-5 w-5 text-indigo-500" />
            Recomendaciones finales
          </h2>

          <SecurityBestPractices 
            items={authRecommendations}
            className="mb-8"
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default Authentication;
