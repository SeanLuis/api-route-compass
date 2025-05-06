import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent } from "@/components/ui/card";

const SecurityPractices = () => {
  return (
    <PageLayout>
      <PageContent
        title="Mejores Prácticas de Seguridad"
        description="Recomendaciones para asegurar APIs REST contra vulnerabilidades comunes."
        path={["Seguridad", "Mejores Prácticas"]}
      >
        <p>
          La seguridad de las APIs REST es fundamental para proteger los datos y recursos de su aplicación.
          Esta guía presenta las mejores prácticas para proteger sus APIs contra amenazas comunes y
          vulnerabilidades de seguridad.
        </p>

        <h2>Vulnerabilidades comunes en APIs REST</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Autenticación débil</h4>
              <p>Mecanismos de autenticación insuficientes o mal implementados que permiten acceso no autorizado.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Autorización insuficiente</h4>
              <p>Controles inadecuados que permiten a usuarios acceder a recursos o realizar acciones no permitidas.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Exposición de datos sensibles</h4>
              <p>Transmisión o almacenamiento inseguro de información confidencial sin cifrado adecuado.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Inyección</h4>
              <p>Inserción de código malicioso (SQL, NoSQL, comandos) a través de entradas no validadas.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">CORS mal configurado</h4>
              <p>Políticas demasiado permisivas que facilitan ataques de tipo cross-site.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Rate limiting ausente</h4>
              <p>Falta de mecanismos para prevenir abusos como ataques de fuerza bruta o DDoS.</p>
            </CardContent>
          </Card>
        </div>

        <h2>Medidas de seguridad esenciales</h2>

        <h3>1. Utilizar siempre HTTPS</h3>

        <p>
          HTTPS (HTTP sobre TLS) es fundamental para proteger la confidencialidad e integridad de los datos
          en tránsito. Nunca despliegue una API de producción sin HTTPS.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Configuración recomendada</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>TLS 1.2 o superior</li>
                <li>Certificados válidos (no autofirmados)</li>
                <li>Cipher suites fuertes</li>
                <li>Desactivar SSL/TLS antiguos</li>
                <li>Verificación de certificados en el lado cliente</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Cabeceras adicionales</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li><code>Strict-Transport-Security</code> (HSTS)</li>
                <li><code>Content-Security-Policy</code></li>
                <li><code>X-Content-Type-Options: nosniff</code></li>
                <li><code>Referrer-Policy</code></li>
                <li>Certificados renovados automáticamente</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <CodeBlock
          code={`# Ejemplo de configuración HTTPS en Nginx
server {
    listen 443 ssl http2;
    server_name api.example.com;

    ssl_certificate     /etc/ssl/certs/example.com.crt;
    ssl_certificate_key /etc/ssl/private/example.com.key;
    
    # Protocolos y cifrados modernos
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    
    # Cabeceras de seguridad
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
    add_header X-Content-Type-Options nosniff;
    add_header Content-Security-Policy "default-src 'self'";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    
    # Resto de la configuración
    # ...
}`}
          language="nginx"
        />

        <h3>2. Implementar cabeceras HTTP de seguridad</h3>

        <p>
          Las cabeceras HTTP de seguridad proporcionan una capa adicional de protección contra diversos ataques.
        </p>

        <table className="min-w-full divide-y divide-gray-200 mb-8">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cabecera</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propósito</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ejemplo</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Strict-Transport-Security</td>
              <td className="px-6 py-4 text-sm text-gray-500">Fuerza conexiones HTTPS</td>
              <td className="px-6 py-4 text-sm text-gray-500"><code>max-age=31536000; includeSubDomains</code></td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Content-Security-Policy</td>
              <td className="px-6 py-4 text-sm text-gray-500">Mitiga XSS y otras inyecciones</td>
              <td className="px-6 py-4 text-sm text-gray-500"><code>default-src 'self'</code></td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">X-Content-Type-Options</td>
              <td className="px-6 py-4 text-sm text-gray-500">Previene MIME sniffing</td>
              <td className="px-6 py-4 text-sm text-gray-500"><code>nosniff</code></td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">X-Frame-Options</td>
              <td className="px-6 py-4 text-sm text-gray-500">Previene clickjacking</td>
              <td className="px-6 py-4 text-sm text-gray-500"><code>DENY</code></td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cache-Control</td>
              <td className="px-6 py-4 text-sm text-gray-500">Controla caching del navegador</td>
              <td className="px-6 py-4 text-sm text-gray-500"><code>no-store, max-age=0</code></td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          code={`// Ejemplo de implementación en Express.js
const express = require('express');
const helmet = require('helmet');
const app = express();

// Agregar cabeceras de seguridad automáticamente
app.use(helmet());

// O configurar cabeceras específicas
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  })
);`}
          language="javascript"
        />

        <h3>3. Validación y sanitización de entradas</h3>

        <p>
          Todas las entradas de usuario deben ser validadas y sanitizadas para prevenir inyecciones y otros ataques.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Tipos de validación</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Validación de tipo (string, number, boolean)</li>
                <li>Validación de formato (email, URL, fecha)</li>
                <li>Validación de longitud/tamaño</li>
                <li>Validación de rango</li>
                <li>Validación de contenido (caracteres permitidos)</li>
                <li>Validación de negocio (reglas específicas)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Buenas prácticas</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Validar en el cliente y en el servidor</li>
                <li>Usar esquemas de validación declarativos</li>
                <li>Validar antes de usar los datos</li>
                <li>Sanitizar después de validar</li>
                <li>Usar bibliotecas probadas (no reinventar)</li>
                <li>Lista blanca sobre lista negra</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <CodeBlock
          code={`// Ejemplo con Joi (Node.js)
const Joi = require('joi');

// Definir esquema de validación
const userSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    .required(),
  birthyear: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear()),
  role: Joi.string()
    .valid('user', 'admin')
    .default('user')
});

// Middleware de validación
function validateUser(req, res, next) {
  const { error } = userSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ 
      error: {
        code: 'validation_error',
        message: 'Datos de usuario inválidos',
        details: error.details.map(d => ({
          field: d.path.join('.'),
          message: d.message
        }))
      }
    });
  }
  
  next();
}

// Uso en ruta
app.post('/api/users', validateUser, createUser);`}
          language="javascript"
        />

        <h3>4. Seguridad para bases de datos</h3>

        <p>
          Proteger la capa de persistencia es crucial para la seguridad general de la API.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Prevención de inyecciones</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Usar consultas parametrizadas</li>
                <li>Nunca construir SQL con concatenación</li>
                <li>Usar ORM con protección integrada</li>
                <li>Limitar privilegios de usuario de BD</li>
                <li>Validar tipos de datos antes de consultas</li>
                <li>Sanitizar datos para NoSQL también</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Seguridad de datos</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Cifrar datos sensibles en reposo</li>
                <li>Usar TLS para conexiones a BD</li>
                <li>Implementar enmascaramiento de datos</li>
                <li>Auditar accesos a datos sensibles</li>
                <li>Backups cifrados</li>
                <li>Separación de entornos (dev/prod)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <CodeBlock
          code={`// Ejemplo inseguro (¡NO HACER ESTO!)
const username = req.body.username;
const query = \`SELECT * FROM users WHERE username = '\${username}'\`;
db.query(query);

// Ejemplo seguro con parámetros
const username = req.body.username;
const query = "SELECT * FROM users WHERE username = ?";
db.query(query, [username]);

// Ejemplo con ORM (Sequelize)
const user = await User.findOne({
  where: { username: req.body.username }
});

// Ejemplo para MongoDB (evitar inyecciones NoSQL)
// Inseguro:
const filter = { username: req.params.username };
// Potencialmente peligroso si req.params.username es un objeto como { $ne: null }

// Seguro:
const username = String(req.params.username);
const filter = { username: username };`}
          language="javascript"
        />

        <h3>5. Limitación de tasa (Rate Limiting)</h3>

        <p>
          Implementar límites de tasa ayuda a prevenir ataques de fuerza bruta, scraping y degradación
          del rendimiento por uso excesivo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Tipos de limitación</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Por IP:</strong> Limita solicitudes por dirección IP</li>
                <li><strong>Por usuario:</strong> Limita solicitudes por usuario autenticado</li>
                <li><strong>Por API key:</strong> Limita por clave API</li>
                <li><strong>Global:</strong> Limita el total de solicitudes a la API</li>
                <li><strong>Por endpoint:</strong> Diferentes límites según sensibilidad</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Estrategias de implementación</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Token bucket:</strong> Flexible, permite ráfagas</li>
                <li><strong>Leaky bucket:</strong> Tasa constante</li>
                <li><strong>Fixed window:</strong> Simple pero susceptible a picos</li>
                <li><strong>Sliding window:</strong> Más preciso, evita los picos</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <CodeBlock
          code={`// Ejemplo de rate limiting en Express con express-rate-limit
const rateLimit = require("express-rate-limit");

// Límite global básico
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutos
  max: 100,                   // 100 solicitudes por ventana
  standardHeaders: true,      // Cabeceras estándar de rate limit
  message: {
    error: {
      code: "rate_limit_exceeded",
      message: "Demasiadas solicitudes. Intente nuevamente más tarde."
    }
  }
});

// Aplicar a todas las rutas
app.use(globalLimiter);

// Límite más estricto para rutas sensibles
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,   // 1 hora
  max: 5,                      // 5 intentos por hora
  message: {
    error: {
      code: "rate_limit_exceeded",
      message: "Demasiados intentos de login. Cuenta bloqueada temporalmente."
    }
  }
});

// Aplicar a rutas específicas
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/forgot-password", authLimiter);`}
          language="javascript"
        />

        <h3>6. Configuración segura de CORS</h3>

        <p>
          Cross-Origin Resource Sharing (CORS) debe configurarse correctamente para permitir
          solicitudes legítimas mientras se bloquean orígenes no autorizados.
        </p>

        <CodeBlock
          code={`// Configuración de CORS en Express
const cors = require('cors');

// Configuración básica - Permite solicitudes solo desde orígenes específicos
const corsOptions = {
  origin: ['https://app.example.com', 'https://admin.example.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,           // Permite cookies en solicitudes cross-origin
  maxAge: 86400,               // Cache por 24 horas
  optionsSuccessStatus: 200    // Para compatibilidad con navegadores antiguos
};

app.use(cors(corsOptions));

// Configuración avanzada - Función para decidir dinámicamente
const dynamicCorsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['https://app.example.com', 'https://admin.example.com'];
    
    // Permitir solicitudes sin origen (mobile apps, curl, etc)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por política CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(dynamicCorsOptions));`}
          language="javascript"
        />

        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6 mt-4">
          <h4 className="text-amber-800 font-medium">⚠️ Advertencia sobre CORS</h4>
          <p className="text-amber-800">
            CORS es una protección del navegador, no de su API. Para APIs públicas, también debe
            implementar autenticación y autorización adecuadas, ya que las solicitudes que no provengan
            del navegador pueden eludir las restricciones CORS.
          </p>
        </div>

        <h3>7. Manejo seguro de secretos</h3>

        <p>
          Los secretos (claves API, contraseñas, tokens, etc.) nunca deben estar expuestos en el código 
          fuente o incluidos directamente en la aplicación.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">¿Qué proteger?</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Llaves de API y secretos</li>
                <li>Tokens de acceso</li>
                <li>Credenciales de base de datos</li>
                <li>Claves de cifrado</li>
                <li>Credenciales de servicios externos</li>
                <li>Certificados y claves privadas</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Soluciones seguras</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Variables de entorno</li>
                <li>Servicios de gestión de secretos (AWS Secrets Manager, HashiCorp Vault)</li>
                <li>Inyección en tiempo de ejecución</li>
                <li>Rotación regular de secretos</li>
                <li>Cifrado de secretos en reposo</li>
                <li>Control de acceso a secretos</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <CodeBlock
          code={`// Enfoque inseguro - NO HACER
const API_KEY = "1234567890abcdef";
const DB_PASSWORD = "supersecret123";

// Enfoque seguro - Variables de entorno
const API_KEY = process.env.API_KEY;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Cargar variables de entorno desde archivo .env (solo en desarrollo)
// En producción, usar variables de entorno del sistema o servicio de secretos
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Usar un servicio de gestión de secretos (ejemplo con AWS)
const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

async function getSecret(secretName) {
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    if ('SecretString' in data) {
      return JSON.parse(data.SecretString);
    }
  } catch (err) {
    console.error('Error al obtener secreto:', err);
    throw err;
  }
}`}
          language="javascript"
        />

        <h2>Protección contra vulnerabilidades comunes</h2>

        <h3>1. Cross-Site Scripting (XSS)</h3>

        <p>
          XSS ocurre cuando un atacante puede inyectar código malicioso que se ejecuta en el navegador del usuario.
          Aunque es principalmente una preocupación del frontend, las APIs REST deben implementar medidas para prevenirlo.
        </p>

        <div className="mb-6">
          <h4 className="font-semibold mb-2">Medidas de protección:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Sanitizar datos antes de almacenarlos</li>
            <li>Escapar/codificar datos al servirlos</li>
            <li>Implementar Content-Security-Policy</li>
            <li>Usar el encabezado X-XSS-Protection</li>
            <li>Establecer cookies con atributos HttpOnly y Secure</li>
          </ul>
        </div>

        <CodeBlock
          code={`// Ejemplo de sanitización con DOMPurify en JavaScript
const DOMPurify = require('dompurify');

// Antes de almacenar contenido generado por usuarios
const sanitizedHtml = DOMPurify.sanitize(userProvidedHtml);

// En el servidor con Node.js
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = require('dompurify')(window);

const sanitizedContent = DOMPurify.sanitize(userContent);`}
          language="javascript"
        />

        <h3>2. Cross-Site Request Forgery (CSRF)</h3>

        <p>
          CSRF ocurre cuando un sitio malicioso engaña al navegador de un usuario autenticado para realizar
          acciones no autorizadas en una API o aplicación donde el usuario tiene una sesión activa.
        </p>

        <div className="mb-6">
          <h4 className="font-semibold mb-2">Medidas de protección:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Usar autenticación basada en tokens en vez de cookies</li>
            <li>Implementar tokens CSRF para las solicitudes que usan cookies</li>
            <li>Verificar el encabezado Origin/Referer</li>
            <li>Implementar SameSite en cookies</li>
            <li>Requerir re-autenticación para operaciones críticas</li>
          </ul>
        </div>

        <CodeBlock
          code={`// Ejemplo de protección CSRF con Express
const csrf = require('csurf');

// Configurar middleware CSRF
const csrfProtection = csrf({ 
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

// Aplicar a rutas que necesitan protección
app.get('/api/profile', csrfProtection, (req, res) => {
  // Incluir token CSRF en la respuesta para que el cliente lo use en solicitudes futuras
  res.json({
    user: req.user,
    csrfToken: req.csrfToken()
  });
});

app.post('/api/update-profile', csrfProtection, (req, res) => {
  // El middleware csrf verificará automáticamente el token
  // Si es inválido, devolverá un error antes de llegar aquí
  
  // Proceder con la actualización...
});`}
          language="javascript"
        />

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6 mt-4">
          <h4 className="text-blue-900 font-medium">💡 Consejo sobre APIs REST puras</h4>
          <p className="text-blue-800">
            Si su API REST utiliza tokens JWT u OAuth 2.0 y no mantiene estado de sesión con cookies, 
            generalmente no es vulnerable a CSRF. Sin embargo, si utiliza cookies para autenticación, 
            debe implementar protección CSRF.
          </p>
        </div>

        <h3>3. Server-Side Request Forgery (SSRF)</h3>

        <p>
          SSRF ocurre cuando una aplicación realiza solicitudes HTTP a una ubicación arbitraria
          proporcionada por un atacante, permitiendo potencialmente el acceso a servicios internos.
        </p>

        <div className="mb-6">
          <h4 className="font-semibold mb-2">Medidas de protección:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Validar y sanitizar todas las URLs proporcionadas por el usuario</li>
            <li>Usar listas blancas de dominios/IPs permitidos</li>
            <li>Bloquear tráfico a direcciones IP privadas y localhost</li>
            <li>Implementar firewalls a nivel de red</li>
            <li>Limitar los privilegios del servicio</li>
          </ul>
        </div>

        <CodeBlock
          code={`// Ejemplo de protección contra SSRF en Node.js
const { URL } = require('url');
const axios = require('axios');
const ipRangeCheck = require('ip-range-check');

async function fetchExternalUrl(urlString) {
  try {
    // Validar formato de URL
    const url = new URL(urlString);
    
    // Obtener la IP (simplificado - en producción usar DNS lookup)
    const hostname = url.hostname;
    
    // Lista de rangos de IP privados
    const privateRanges = [
      '10.0.0.0/8',
      '172.16.0.0/12',
      '192.168.0.0/16',
      '127.0.0.0/8',
      '169.254.0.0/16',
      '::1/128',
      'fc00::/7'
    ];
    
    // Comprobar si es una IP privada
    if (isIP(hostname) && ipRangeCheck(hostname, privateRanges)) {
      throw new Error('Acceso a dirección IP privada no permitido');
    }
    
    // Lista blanca de dominios permitidos
    const allowedDomains = ['api.trusted.com', 'cdn.trusted.com'];
    if (!allowedDomains.includes(url.hostname)) {
      throw new Error('Dominio no permitido');
    }
    
    // Establecer límite de tiempo para la solicitud
    const response = await axios.get(url.toString(), {
      timeout: 5000,
      maxRedirects: 3  // Limitar redirecciones
    });
    
    return response.data;
  } catch (error) {
    throw new Error(\`Error en solicitud externa: \${error.message}\`);
  }
}`}
          language="javascript"
        />

        <h2>Monitoreo y respuesta a incidentes</h2>

        <h3>1. Logging y auditoría</h3>

        <p>
          Un registro completo de eventos es crucial para detectar, investigar y responder a incidentes de seguridad.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Qué registrar</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Intentos de autenticación (éxitos/fallos)</li>
                <li>Acciones administrativas y sensibles</li>
                <li>Cambios de permisos</li>
                <li>Acceso a datos sensibles</li>
                <li>Errores de validación</li>
                <li>Errores de seguridad (CORS, CSP, etc.)</li>
                <li>Rate limiting y bloqueos</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Buenas prácticas</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Usar formato estructurado (JSON)</li>
                <li>Incluir marcas de tiempo precisas (UTC)</li>
                <li>Agregar identificadores de correlación</li>
                <li>Normalizar formato de logs</li>
                <li>Usar niveles de log apropiados</li>
                <li>No registrar datos sensibles (PII, contraseñas)</li>
                <li>Proteger los propios logs (inmutabilidad)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <CodeBlock
          code={`// Ejemplo de registro estructurado con Winston
const winston = require('winston');
const { v4: uuidv4 } = require('uuid');

// Crear logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Middleware para agregar request ID
app.use((req, res, next) => {
  req.requestId = req.headers['x-request-id'] || uuidv4();
  res.setHeader('x-request-id', req.requestId);
  next();
});

// Ejemplo de registro de eventos de seguridad
app.post('/api/login', (req, res) => {
  const { username } = req.body;
  
  try {
    // Lógica de autenticación
    const success = authenticateUser(req.body);
    
    // Registrar evento
    logger.info('Authentication attempt', {
      event: 'authentication_attempt',
      outcome: success ? 'success' : 'failure',
      username,
      ip: req.ip,
      user_agent: req.headers['user-agent'],
      request_id: req.requestId
    });
    
    // Responder
    if (success) {
      res.json({ token: generateToken(username) });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    logger.error('Authentication error', {
      event: 'authentication_error',
      error: error.message,
      username,
      ip: req.ip,
      request_id: req.requestId
    });
    
    res.status(500).json({ error: 'Server error' });
  }
});`}
          language="javascript"
        />

        <h3>2. Detección de intrusiones</h3>

        <p>
          Implementar sistemas para detectar actividades sospechosas o maliciosas en tiempo real.
        </p>

        <div className="mb-6">
          <h4 className="font-semibold mb-2">Señales a monitorear:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Patrones de acceso inusuales</li>
            <li>Picos de solicitudes fallidas</li>
            <li>Accesos desde ubicaciones geográficas inusuales</li>
            <li>Intentos de inyección o explotación</li>
            <li>Escalada de privilegios</li>
            <li>Acceso a rutas no existentes (probing)</li>
            <li>Patrones consistentes con herramientas automatizadas</li>
          </ul>
        </div>

        <CodeBlock
          code={`// Ejemplo simplificado de detección de comportamiento sospechoso
const loginAttempts = new Map();  // IP -> {count, lastAttempt}
const suspiciousIPs = new Set();

// Middleware para detección de inicios de sesión sospechosos
function detectSuspiciousLogins(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  
  // Ignorar IPs ya marcadas como sospechosas
  if (suspiciousIPs.has(ip)) {
    return res.status(403).json({ error: 'IP bloqueada por actividad sospechosa' });
  }
  
  // Registrar intento
  if (!loginAttempts.has(ip)) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
  } else {
    const record = loginAttempts.get(ip);
    const timeDiff = now - record.lastAttempt;
    
    // Actualizar registro
    record.count++;
    record.lastAttempt = now;
    
    // Detectar actividad sospechosa
    
    // Más de 5 intentos en menos de 60 segundos
    if (record.count > 5 && timeDiff < 60000) {
      suspiciousIPs.add(ip);
      logger.warn('Posible ataque de fuerza bruta detectado', {
        ip, attempts: record.count, timeframe: \`\${Math.floor(timeDiff / 1000)}s\`
      });
      return res.status(403).json({ error: 'Demasiados intentos de inicio de sesión. IP bloqueada temporalmente' });
    }
    
    // Intentos demasiado rápidos (menos de 2 segundos entre intentos)
    if (timeDiff < 2000) {
      record.automationScore = (record.automationScore || 0) + 1;
      if (record.automationScore > 3) {
        suspiciousIPs.add(ip);
        logger.warn('Posible automatización de intentos de login', { ip });
        return res.status(403).json({ error: 'Actividad sospechosa detectada. IP bloqueada temporalmente' });
      }
    }
  }
  
  next();
}

// Aplicar a rutas sensibles
app.post('/api/login', detectSuspiciousLogins, loginController);
app.post('/api/password-reset', detectSuspiciousLogins, passwordResetController);`}
          language="javascript"
        />

        <h2>Lista de verificación de seguridad</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-md p-6 mb-8">
          <p className="mb-4 font-medium">
            Use esta lista para verificar la seguridad de su API REST:
          </p>
          
          <h4 className="font-semibold mb-2">Comunicación segura</h4>
          <ul className="space-y-1 mb-4">
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>HTTPS habilitado para todas las comunicaciones</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>HSTS configurado en servidores de producción</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Certificados SSL válidos y actualizados</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>TLS 1.2+ configurado, versiones antiguas deshabilitadas</span>
            </li>
          </ul>
          
          <h4 className="font-semibold mb-2">Autenticación y autorización</h4>
          <ul className="space-y-1 mb-4">
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Todas las rutas requieren autenticación excepto las explícitamente públicas</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Tokens con tiempo de expiración corto</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Mecanismo de revocación de tokens implementado</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Permisos verificados en cada endpoint</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Política de contraseñas seguras</span>
            </li>
          </ul>
          
          <h4 className="font-semibold mb-2">Procesamiento de datos</h4>
          <ul className="space-y-1 mb-4">
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Validación de entrada implementada para todas las solicitudes</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Sanitización de datos para prevenir XSS</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Consultas parametrizadas para prevenir inyección SQL</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Validación de tipos y formatos</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Protección contra deserialización insegura</span>
            </li>
          </ul>
          
          <h4 className="font-semibold mb-2">Configuración y operaciones</h4>
          <ul className="space-y-1">
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>CORS configurado correctamente</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Cabeceras HTTP de seguridad implementadas</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Secretos gestionados de forma segura</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Rate limiting implementado</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Sistema de logging y monitoreo en funcionamiento</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Dependencias actualizadas y escaneadas</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              <span>Plan de respuesta a incidentes documentado</span>
            </li>
          </ul>
        </div>

        <h2>Herramientas y recursos</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Pruebas de seguridad</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>OWASP ZAP</li>
                <li>Burp Suite</li>
                <li>Metasploit</li>
                <li>Postman Security Tests</li>
                <li>Node.js Security Checker</li>
                <li>SonarQube</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Estándares de seguridad</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>OWASP API Security Top 10</li>
                <li>OWASP Security Testing Guide</li>
                <li>NIST Cybersecurity Framework</li>
                <li>ISO/IEC 27001</li>
                <li>CIS Controls</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Bibliotecas de seguridad</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Helmet.js (Express)</li>
                <li>jwt-oauth2 (autenticación)</li>
                <li>DOMPurify (sanitización)</li>
                <li>bcrypt/Argon2 (hashing)</li>
                <li>express-validator</li>
                <li>express-rate-limit</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </PageLayout>
  );
};

export default SecurityPractices;
