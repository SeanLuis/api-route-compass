import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent } from "@/components/ui/card";
import { EndpointExample } from "@/components/EndpointExample";

const Authentication = () => {
  return (
    <PageLayout>
      <PageContent
        title="Autenticación en APIs REST"
        description="Métodos y mejores prácticas para implementar autenticación en APIs REST."
        path={["Seguridad", "Autenticación"]}
      >
        <p>
          La autenticación es el proceso de verificar la identidad de un cliente que intenta acceder a una API.
          Implementar una autenticación robusta es fundamental para proteger los recursos y garantizar
          que solo usuarios legítimos puedan acceder a la API.
        </p>

        <h2>Métodos de autenticación</h2>

        <h3>1. Autenticación basada en tokens</h3>

        <p>
          El método más común para autenticar APIs REST es mediante tokens. El cliente se autentica una vez 
          (generalmente con credenciales) y recibe un token que utiliza en solicitudes posteriores.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Flujo básico</h4>
              <ol className="space-y-2">
                <li>1. El cliente envía credenciales al endpoint de autenticación</li>
                <li>2. El servidor valida las credenciales y genera un token</li>
                <li>3. El servidor devuelve el token al cliente</li>
                <li>4. El cliente incluye el token en las cabeceras de solicitudes posteriores</li>
                <li>5. El servidor valida el token antes de procesar cada solicitud</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Ventajas</h4>
              <ul className="list-disc pl-4 space-y-2">
                <li>Sin estado (stateless) - compatible con arquitecturas distribuidas</li>
                <li>Escalabilidad - no requiere estado de sesión en el servidor</li>
                <li>Funciona a través de diferentes dominios y servicios</li>
                <li>Permite transmitir información sobre el usuario (claims)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h4>JSON Web Tokens (JWT)</h4>
        
        <p>
          JWT es un estándar abierto (RFC 7519) para representar claims de forma segura entre dos partes.
          Es uno de los formatos más populares para tokens de autenticación en APIs REST.
        </p>

        <div className="space-y-4 mb-8">
          <p>Estructura de un JWT:</p>
          <ol className="space-y-1">
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

        <h4>Mejores prácticas para JWT</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Seguridad</h4>
              <ul className="list-disc pl-4 space-y-2">
                <li>Usar HTTPS para todas las comunicaciones</li>
                <li>Establecer tiempos de expiración cortos (15-60 minutos)</li>
                <li>Implementar tokens de actualización (refresh tokens)</li>
                <li>Usar algoritmos de firma seguros (al menos HS256 o RS256)</li>
                <li>Validar todos los campos, incluyendo expiración e issuer</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Claims recomendados</h4>
              <ul className="list-disc pl-4 space-y-2">
                <li><code>sub</code> - Identificador único del usuario</li>
                <li><code>iat</code> - Cuándo fue emitido el token</li>
                <li><code>exp</code> - Cuándo expira el token</li>
                <li><code>iss</code> - Quién emitió el token</li>
                <li><code>aud</code> - Para qué audiencia está destinado</li>
                <li><code>jti</code> - ID único del token (para revocación)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h3>2. OAuth 2.0</h3>

        <p>
          OAuth 2.0 es un protocolo de autorización que permite a aplicaciones de terceros acceder a recursos 
          en nombre del usuario sin exponer sus credenciales. Es ideal para APIs que necesitan integración con 
          servicios externos.
        </p>

        <h4>Flujos comunes de OAuth 2.0</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Authorization Code</h4>
              <p className="mb-2">Ideal para aplicaciones con servidor.</p>
              <ol className="list-decimal pl-4 space-y-1">
                <li>La app redirige al usuario al servidor de autorización</li>
                <li>El usuario se autentica y autoriza el acceso</li>
                <li>El servidor redirige de vuelta con un código</li>
                <li>La app intercambia el código por tokens de acceso</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Client Credentials</h4>
              <p className="mb-2">Para comunicación servidor a servidor.</p>
              <ol className="list-decimal pl-4 space-y-1">
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

        <h4>OpenID Connect</h4>
        
        <p>
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

        <h3>3. Autenticación API Key</h3>

        <p>
          Las API Keys son credenciales simples que identifican a la aplicación o desarrollador que realiza la llamada.
          Son adecuadas para escenarios con requisitos de seguridad moderados o para APIs públicas.
        </p>

        <div className="space-y-4 mb-8">
          <p>Formas comunes de enviar API Keys:</p>
          <ol className="space-y-1">
            <li>• En la cabecera HTTP personalizada <code>X-API-Key: your_api_key_here</code></li>
            <li>• Como parámetro de consulta <code>/api/v1/resource?api_key=your_api_key_here</code></li>
            <li>• En la cabecera de autorización <code>Authorization: ApiKey your_api_key_here</code></li>
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

        <h4>Consideraciones de seguridad para API Keys</h4>
        
        <ul className="list-disc pl-6 space-y-2 mb-8">
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

        <h3>4. Autenticación HTTP básica</h3>

        <p>
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

        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-8">
          <h4 className="text-amber-800 font-medium">⚠️ Advertencia</h4>
          <p className="text-amber-800">
            La autenticación HTTP básica solo debe usarse con HTTPS, ya que las credenciales se envían en 
            cada solicitud con una codificación base64 fácilmente decodificable. No es recomendable para 
            aplicaciones de producción a menos que se combinen con otras medidas de seguridad.
          </p>
        </div>

        <h2>Patrones de autenticación</h2>

        <h3>1. Autenticación de dos factores (2FA)</h3>

        <p>
          La autenticación de dos factores agrega una capa adicional de seguridad requiriendo dos formas de verificación:
        </p>

        <ol className="list-decimal pl-6 space-y-2 mb-6">
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

        <h3>2. Tokens de actualización</h3>

        <p>
          Los tokens de actualización (refresh tokens) permiten que una aplicación obtenga nuevos tokens de acceso 
          sin requerir que el usuario vuelva a autenticarse. 
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Flujo típico</h4>
              <ol className="list-decimal pl-4 space-y-1">
                <li>El usuario se autentica y recibe un token de acceso y un token de actualización</li>
                <li>El token de acceso se utiliza hasta que expira</li>
                <li>Cuando expira, la aplicación usa el token de actualización para obtener un nuevo token de acceso</li>
                <li>El servidor valida el token de actualización y emite un nuevo token de acceso</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Seguridad</h4>
              <ul className="list-disc pl-4 space-y-2">
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

        <h2>Implementación segura</h2>

        <h3>Almacenamiento de contraseñas</h3>

        <p>
          Nunca almacene contraseñas en texto plano. Utilice algoritmos de hash diseñados específicamente para contraseñas:
        </p>

        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Bcrypt:</strong> Algoritmo adaptativo con factor de costo configurable</li>
          <li><strong>Argon2:</strong> Ganador de la competición de hash de contraseñas (recomendado)</li>
          <li><strong>PBKDF2:</strong> Estándar en entornos que requieren certificación FIPS</li>
        </ul>

        <CodeBlock
          code={`// Ejemplo de hash de contraseña con bcrypt (Node.js)
const bcrypt = require('bcrypt');

// Crear hash (al registrar o cambiar contraseña)
async function hashPassword(plainPassword) {
  const saltRounds = 12;  // Factor de costo - ajustar según necesidades de seguridad
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
}

// Verificar contraseña (al iniciar sesión)
async function verifyPassword(plainPassword, hashedPassword) {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
}`}
          language="javascript"
        />

        <h3>Estrategia de seguridad en capas</h3>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-6 mb-8 mt-4">
          <h4 className="text-blue-900 font-medium mb-2">Seguridad multicapa</h4>
          <p className="text-blue-800 mb-4">
            Implemente múltiples capas de seguridad para proteger su API:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-blue-800">
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

        <h2>Consideraciones adicionales</h2>

        <h3>CORS y autenticación</h3>
        
        <p>
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

        <h3>Sesiones vs. Tokens</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Sesiones</h4>
              <p className="mb-2"><strong>Ventajas:</strong></p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Revocación sencilla (eliminar del servidor)</li>
                <li>Mejor para datos sensibles o voluminosos</li>
                <li>Menor sobrecarga en solicitudes</li>
              </ul>
              <p className="mt-3 mb-2"><strong>Desventajas:</strong></p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Requiere almacenamiento en el servidor</li>
                <li>Problemas en arquitecturas distribuidas</li>
                <li>Problemas con CORS</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Tokens</h4>
              <p className="mb-2"><strong>Ventajas:</strong></p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Sin estado (stateless)</li>
                <li>Escalabilidad en sistemas distribuidos</li>
                <li>Mejor para arquitecturas de microservicios</li>
                <li>Soporta CORS naturalmente</li>
              </ul>
              <p className="mt-3 mb-2"><strong>Desventajas:</strong></p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Tamaño de las solicitudes</li>
                <li>Revocación más compleja</li>
                <li>Más expuestos a XSS</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h2>Recomendaciones finales</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-md p-6 mb-8">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✓</span>
              <span><strong>Usar tokens JWT</strong> para la mayoría de las APIs REST modernas, con tiempos de expiración cortos</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✓</span>
              <span><strong>Implementar OAuth 2.0</strong> para APIs que necesiten integración con servicios de terceros</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✓</span>
              <span><strong>Utilizar HTTPS</strong> para todas las comunicaciones, incluidas llamadas de desarrollo y prueba</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✓</span>
              <span><strong>Establecer políticas de expiración y rotación</strong> para tokens y claves API</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✓</span>
              <span><strong>Almacenar credenciales</strong> utilizando algoritmos de hash específicos para contraseñas</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✓</span>
              <span><strong>Implementar 2FA</strong> para proteger el acceso a recursos sensibles</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 font-bold mr-2">✗</span>
              <span><strong>Evitar autenticación básica</strong> en entornos de producción sin protecciones adicionales</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 font-bold mr-2">✗</span>
              <span><strong>No almacenar tokens</strong> en localStorage (vulnerable a XSS) - preferir cookies HttpOnly</span>
            </li>
          </ul>
        </div>
      </PageContent>
    </PageLayout>
  );
};

export default Authentication;
