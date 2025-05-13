import { PageLayout } from "@/components/PageLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent } from "@/components/ui/card";
import { EndpointExample } from "@/components/EndpointExample";
import { Link } from "react-router-dom";
import { Shield, Users, FileKey, Database, Code, Briefcase, CheckCircle, Layout } from "lucide-react";
import { SecurityBestPractices } from "@/components/SecurityBestPractices";

const Authorization = () => {
  // Authorization best practices
  const authzBestPractices = [
    { text: "Principio de privilegio mínimo - Otorgar solo los permisos estrictamente necesarios para realizar una tarea", isRecommended: true },
    { text: "Denegar por defecto - El acceso debe estar prohibido a menos que se conceda explícitamente", isRecommended: true },
    { text: "Separación de responsabilidades - Dividir tareas críticas entre diferentes roles", isRecommended: true },
    { text: "Autorización uniforme - Aplicar las mismas comprobaciones en todos los canales de acceso", isRecommended: true },
    { text: "Centralizar la lógica de autorización - Evitar duplicación y posibles inconsistencias", isRecommended: true },
    { text: "Auditar decisiones de autorización - Registrar accesos y cambios a permisos", isRecommended: true },
    { text: "Errores genéricos - No revelar más información de la necesaria en respuestas de error", isRecommended: true },
    { text: "Reevaluar permisos regularmente - Revisar y ajustar permisos según cambien los roles", isRecommended: true }
  ];

  // Model selection recommendations
  const modelRecommendations = [
    { text: "Comience con RBAC para la mayoría de las aplicaciones - es simple, bien entendido y cubre muchos casos de uso", isRecommended: true },
    { text: "Agregue ACL cuando necesite control de acceso a nivel de instancia (ej. \"este usuario puede editar este documento específico\")", isRecommended: true },
    { text: "Considere ABAC cuando RBAC se vuelva demasiado complejo con muchos roles o cuando necesite incorporar contexto en las decisiones", isRecommended: true },
    { text: "Implemente PBAC para entornos distribuidos o cuando necesite políticas centralizadas para múltiples servicios", isRecommended: true }
  ];

  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/security-practices" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">Seguridad</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4 dark:text-white">Autorización en APIs REST</h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Estrategias para gestionar permisos y control de acceso en APIs REST.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <p className="dark:text-slate-300">
            La autorización determina qué acciones puede realizar un usuario autenticado sobre determinados recursos.
            Mientras que la autenticación verifica <strong>quién es el usuario</strong>, la autorización controla
            <strong> qué puede hacer</strong> ese usuario con los recursos de la API.
          </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <Shield className="h-5 w-5 text-indigo-500" />
            Modelos de autorización
          </h2>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <Users className="h-5 w-5 text-blue-500" />
            1. Control de Acceso Basado en Roles (RBAC)
          </h3>

          <p className="dark:text-slate-300">
            RBAC asigna permisos a roles y luego asigna roles a usuarios. Es uno de los modelos más utilizados
            por su equilibrio entre simplicidad y flexibilidad.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Componentes principales</h4>
                <ul className="list-disc pl-4 space-y-2 dark:text-slate-300">
                  <li><strong>Usuarios:</strong> Entidades que acceden al sistema (personas, servicios)</li>
                  <li><strong>Roles:</strong> Conjunto de responsabilidades o funciones (admin, editor, usuario)</li>
                  <li><strong>Permisos:</strong> Acciones específicas sobre recursos (leer, crear, editar, eliminar)</li>
                  <li><strong>Asignaciones:</strong> Mapeo entre usuarios y roles</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Ventajas de RBAC</h4>
                <ul className="list-disc pl-4 space-y-2 dark:text-slate-300">
                  <li>Administración simplificada de permisos</li>
                  <li>Fácil de entender y comunicar</li>
                  <li>Escalable para organizaciones medianas</li>
                  <li>Facilita el principio de privilegio mínimo</li>
                  <li>Cumple con requisitos comunes de conformidad</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <CodeBlock
            code={`// Ejemplo de implementación de RBAC (JWT con claims de roles)
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Middleware de verificación de rol
function requireRole(role) {
  return (req, res, next) => {
    try {
      // Obtener y verificar token
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, secret);
      
      // Verificar si el usuario tiene el rol requerido
      if (!decoded.roles || !decoded.roles.includes(role)) {
        return res.status(403).json({ 
          error: "Acceso denegado: Rol requerido: " + role 
        });
      }
      
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Token no válido" });
    }
  };
}

// Uso en rutas
app.get('/api/users', requireRole('admin'), (req, res) => {
  // Solo administradores pueden listar todos los usuarios
  // ...
});

app.get('/api/articles', requireRole('editor'), (req, res) => {
  // Solo editores pueden ver todos los artículos
  // ...
});`}
            language="javascript"
          />

          <p className="mt-6">
            Ejemplo de payload JWT con roles:
          </p>

          <CodeBlock
            code={`{
  "sub": "user_123",
  "name": "John Doe",
  "roles": ["editor", "subscriber"],
  "iat": 1516239022,
  "exp": 1516242622
}`}
            language="javascript"
          />

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <FileKey className="h-5 w-5 text-green-500" />
            2. Control de Acceso Basado en Atributos (ABAC)
          </h3>

          <p className="dark:text-slate-300">
            ABAC evalúa múltiples atributos (del usuario, recurso, acción y contexto) para tomar decisiones 
            de autorización. Es más flexible que RBAC pero también más complejo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Atributos considerados</h4>
                <ul className="list-disc pl-4 space-y-2 dark:text-slate-300">
                  <li><strong>Usuario:</strong> rol, departamento, nivel de acceso, ubicación</li>
                  <li><strong>Recurso:</strong> tipo, clasificación, propietario, fecha de creación</li>
                  <li><strong>Acción:</strong> leer, escribir, eliminar, aprobar</li>
                  <li><strong>Contexto:</strong> hora del día, ubicación, dispositivo, nivel de amenaza</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Ventajas de ABAC</h4>
                <ul className="list-disc pl-4 space-y-2 dark:text-slate-300">
                  <li>Control de acceso altamente granular</li>
                  <li>Políticas basadas en condiciones complejas</li>
                  <li>Adaptabilidad a requisitos de negocio cambiantes</li>
                  <li>Mejor para organizaciones grandes y complejas</li>
                  <li>Reduce la proliferación de roles</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p>
            Ejemplo de política ABAC expresada en pseudocódigo:
          </p>

          <CodeBlock
            code={`// Política ABAC para editar documentos
permitirAcceso SI y SOLO SI:
  (Usuario.rol == "editor" O Usuario.rol == "admin")
  Y
  (Documento.departamento == Usuario.departamento)
  Y
  (Documento.estado != "publicado" O Usuario.nivel >= 3)
  Y
  (Contexto.horario ENTRE "08:00" Y "18:00")
  Y
  (Contexto.ubicacionRed == "interna" O Usuario.autenticacionDosFactores == verdadero)`}
            language="javascript"
          />

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <FileKey className="h-5 w-5 text-yellow-500" />
            3. Control de Acceso Basado en Listas (ACL)
          </h3>

          <p className="dark:text-slate-300">
            ACL asocia directamente permisos a objetos para usuarios o grupos específicos. Es útil para
            escenarios donde se necesita control granular a nivel de instancia de recurso.
          </p>

          <div className="mt-6 mb-8">
            <p className="dark:text-slate-300">Ejemplo de una estructura ACL para un documento en una base de datos:</p>
            <CodeBlock
              code={`{
  "_id": "doc_123",
  "title": "Informe financiero 2025",
  "content": "...",
  "created_by": "user_456",
  "acl": {
    "user_456": ["read", "write", "delete", "share"],  // Propietario
    "user_789": ["read", "write"],                     // Colaborador
    "user_101": ["read"],                              // Revisor
    "group_finance": ["read"],                         // Grupo de finanzas
    "*": []                                            // Todos los demás (sin acceso)
  }
}`}
              language="javascript"
            />
          </div>

          <EndpointExample
            method="GET"
            path="/api/v1/documents/123"
            description="Respuesta con denegación de acceso utilizando ACL"
            responseExample={`{
  "error": {
    "code": "permission_denied",
    "message": "No tiene permiso para acceder a este documento",
    "required_permission": "read"
  }
}`}
          />

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <Database className="h-5 w-5 text-red-500" />
            4. Control de Acceso Basado en Políticas (PBAC)
          </h3>

          <p className="dark:text-slate-300">
            PBAC utiliza políticas centralizadas escritas en lenguajes específicos para expresar reglas de
            autorización. Es especialmente útil para entornos de múltiples servicios o multitenancy.
          </p>

          <CodeBlock
            code={`// Ejemplo de política en formato JSON (similar a IAM de AWS)
{
  "Version": "2023-05-01",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "documents:Read",
        "documents:List"
      ],
      "Resource": "arn:app:documents:*:*",
      "Condition": {
        "DateGreaterThan": {
          "CurrentTime": "2025-01-01T00:00:00Z"
        },
        "IpAddress": {
          "SourceIp": ["192.168.1.0/24", "10.0.0.0/16"]
        }
      }
    }
  ]
}`}
            language="javascript"
          />

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <Layout className="h-5 w-5 text-purple-500" />
            Implementación de autorización
          </h2>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <Users className="h-5 w-5 text-blue-500" />
            1. Autorización a nivel de endpoint
          </h3>

          <p className="dark:text-slate-300">
            La forma más común de implementar autorización en APIs REST es verificando permisos antes 
            de procesar solicitudes en endpoints específicos.
          </p>

          <CodeBlock
            code={`// Ejemplo en Express.js con middleware de autorización
const express = require('express');
const app = express();

// Middleware para verificar permisos
const checkPermission = (resource, action) => {
  return (req, res, next) => {
    const user = req.user;  // Asumimos que el usuario ya está autenticado
    
    if (hasPermission(user, resource, action)) {
      return next();
    }
    
    return res.status(403).json({
      error: {
        code: 'permission_denied',
        message: \`No tiene permiso para \${action} en \${resource}\`
      }
    });
  };
};

// Rutas con autorización
app.get('/api/v1/users',
  checkPermission('users', 'list'),
  (req, res) => {
    // Listar usuarios
  }
);

app.post('/api/v1/documents',
  checkPermission('documents', 'create'),
  (req, res) => {
    // Crear documento
  }
);

app.put('/api/v1/documents/:id',
  checkPermission('documents', 'update'),
  (req, res) => {
    // Actualizar documento
  }
);

// Función auxiliar para verificar permisos (implementación depende del modelo)
function hasPermission(user, resource, action) {
  // Implementación basada en el modelo de autorización elegido
  // (RBAC, ABAC, etc.)
}`}
            language="javascript"
          />

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <FileKey className="h-5 w-5 text-green-500" />
            2. Autorización a nivel de campo
          </h3>

          <p className="dark:text-slate-300">
            Para APIs con requisitos de seguridad más estrictos, puede ser necesario controlar
            el acceso a nivel de campos individuales dentro de recursos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Enfoques comunes</h4>
                <ul className="list-disc pl-4 space-y-2 dark:text-slate-300">
                  <li><strong>Filtrado de respuesta:</strong> Eliminar campos restringidos de las respuestas</li>
                  <li><strong>Proyección dinámica:</strong> Seleccionar solo campos permitidos en la consulta</li>
                  <li><strong>Validación de entrada:</strong> Rechazar actualizaciones a campos restringidos</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Casos de uso comunes</h4>
                <ul className="list-disc pl-4 space-y-2 dark:text-slate-300">
                  <li>Ocultar información sensible (salarios, datos personales)</li>
                  <li>Restringir campos administrativos a usuarios con privilegios</li>
                  <li>Permitir actualizaciones parciales según el rol</li>
                  <li>Datos compartidos entre tenants con diferentes niveles de acceso</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <CodeBlock
            code={`// Ejemplo de autorización a nivel de campo en Node.js
function getFieldPermissions(user, resource) {
  // Configuración de permisos por rol y recurso
  const fieldPermissions = {
    user: {
      'users': {
        read: ['id', 'name', 'email', 'profile_picture', 'public_info'],
        write: ['name', 'email', 'profile_picture', 'public_info', 'preferences']
      }
    },
    admin: {
      'users': {
        read: ['*'],  // Todos los campos
        write: ['*']  // Todos los campos
      }
    },
    hr_manager: {
      'users': {
        read: ['id', 'name', 'email', 'department', 'salary', 'hire_date'],
        write: ['department', 'salary', 'position']
      }
    }
  };
  
  // Obtener los permisos según el rol del usuario
  return fieldPermissions[user.role]?.[resource] || { read: [], write: [] };
}

// Filtrar un objeto para incluir solo los campos permitidos
function filterFields(obj, allowedFields) {
  // Si está permitido acceder a todos los campos
  if (allowedFields.includes('*')) {
    return obj;
  }
  
  return Object.keys(obj)
    .filter(key => allowedFields.includes(key))
    .reduce((filtered, key) => {
      filtered[key] = obj[key];
      return filtered;
    }, {});
}

// Uso en un controlador
function getUserProfile(req, res) {
  const user = req.user;
  const userId = req.params.id;
  
  // Obtener el perfil completo de la base de datos
  const profile = getUserFromDatabase(userId);
  
  // Obtener los campos permitidos para lectura
  const permissions = getFieldPermissions(user, 'users');
  
  // Filtrar los campos según los permisos
  const filteredProfile = filterFields(profile, permissions.read);
  
  res.json(filteredProfile);
}`}
            language="javascript"
          />

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <Database className="h-5 w-5 text-yellow-500" />
            3. Autorización basada en datos (filtrado de registros)
          </h3>

          <p className="dark:text-slate-300">
            Este enfoque controla qué registros o instancias de recursos pueden ser accedidos por un usuario,
            independientemente del endpoint. Es esencial para sistemas multitenancy o con datos compartidos.
          </p>

          <EndpointExample
            method="GET"
            path="/api/v1/documents"
            description="Filtrado automático de registros basado en permisos del usuario"
            responseExample={`{
  "data": [
    {
      "id": "doc_123",
      "title": "Informe de ventas",
      "department": "Sales",
      "created_at": "2025-03-15T10:30:00Z"
    },
    {
      "id": "doc_456",
      "title": "Plan de marketing",
      "department": "Marketing",
      "created_at": "2025-03-20T14:15:00Z"
    }
  ],
  "meta": {
    "total_accessible": 2,
    "total_overall": 15
  }
}`}
          />

          <p className="mt-6 dark:text-slate-300">
            Implementación de filtrado basado en políticas en una consulta de base de datos:
          </p>

          <CodeBlock
            code={`// Ejemplo con SQL y Node.js
async function getDocumentsList(req, res) {
  const user = req.user;
  
  try {
    let query = 'SELECT id, title, department, created_at FROM documents';
    const params = [];
    
    // Aplicar restricciones según el rol/permisos del usuario
    if (user.role === 'admin') {
      // Los administradores pueden ver todos los documentos
      // No se aplican restricciones adicionales
    } 
    else if (user.role === 'manager') {
      // Los gerentes pueden ver documentos de su departamento
      query += ' WHERE department = ?';
      params.push(user.department);
    } 
    else {
      // Los usuarios regulares solo pueden ver sus propios documentos
      // o documentos compartidos con ellos explícitamente
      query += \` WHERE created_by = ? OR 
                id IN (SELECT document_id FROM document_shares WHERE user_id = ?)\`;
      params.push(user.id, user.id);
    }
    
    const documents = await db.query(query, params);
    
    res.json({
      data: documents,
      meta: {
        total_accessible: documents.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener documentos' });
  }
}`}
            language="javascript"
          />

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <Layout className="h-5 w-5 text-purple-500" />
            Patrones avanzados
          </h2>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <Users className="h-5 w-5 text-blue-500" />
            1. Delegación de autorización
          </h3>

          <p className="dark:text-slate-300">
            Permite que un usuario conceda acceso a otro usuario o servicio para actuar en su nombre,
            generalmente con permisos limitados y durante un período específico.
          </p>

          <div className="mt-6 mb-8">
            <p className="dark:text-slate-300">
              OAuth 2.0 implementa este patrón con flujos como el código de autorización, donde una 
              aplicación cliente puede acceder a recursos en nombre del usuario, pero solo con los 
              permisos (scopes) específicamente autorizados.
            </p>

            <CodeBlock
              code={`// Ejemplo de token con permisos delegados
{
  "sub": "user_123",                  // Usuario que delega acceso
  "aud": "client_app_456",            // Cliente autorizado
  "scope": "read:profile edit:posts", // Permisos concedidos
  "exp": 1516242622,
  "delegated_by": "user_123",
  "purpose": "Social media integration"
}`}
              language="javascript"
            />
          </div>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <FileKey className="h-5 w-5 text-green-500" />
            2. Permisos jerárquicos
          </h3>

          <p className="dark:text-slate-300">
            Sistema donde los permisos se organizan en una estructura jerárquica, donde los permisos de nivel
            superior incluyen implícitamente los permisos de nivel inferior.
          </p>

          <CodeBlock
            code={`// Ejemplo de jerarquía de permisos
const permissionHierarchy = {
  'documents': {
    'admin': ['create', 'read', 'update', 'delete', 'share', 'archive'],
    'editor': ['create', 'read', 'update'],
    'viewer': ['read']
  }
};

// Verificador de permisos que considera la jerarquía
function hasPermission(user, resource, action) {
  // Obtener el nivel de acceso del usuario para este recurso
  const accessLevel = user.permissions[resource];
  
  if (!accessLevel || !permissionHierarchy[resource]) {
    return false;
  }
  
  // Comprobar si el nivel de acceso tiene explícitamente este permiso
  if (permissionHierarchy[resource][accessLevel].includes(action)) {
    return true;
  }
  
  // Si no lo tiene explícitamente, comprobar niveles superiores
  const levels = Object.keys(permissionHierarchy[resource]);
  const currentLevelIndex = levels.indexOf(accessLevel);
  
  // Comprobar todos los niveles por encima del actual
  for (let i = currentLevelIndex + 1; i < levels.length; i++) {
    if (permissionHierarchy[resource][levels[i]].includes(action)) {
      return true;
    }
  }
  
  return false;
}`}
            language="javascript"
          />

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <FileKey className="h-5 w-5 text-yellow-500" />
            3. Autorización con capacidades (capability-based)
          </h3>

          <p className="dark:text-slate-300">
            Este enfoque representa permisos como tokens o "capacidades" específicos que otorgan acceso 
            a recursos particulares. El poseedor de la capacidad puede realizar las acciones asociadas sin
            necesidad de verificación adicional de identidad.
          </p>

          <CodeBlock
            code={`// Ejemplo de token de capacidad (firmado con JWS)
{
  "action": "download",
  "resource": "file_123456",
  "issued_at": 1616418710,
  "expires_at": 1616422310,
  "max_uses": 1,
  "metadata": {
    "filename": "confidential_report.pdf",
    "file_size": 2456122
  }
}

// Uso en un sistema de archivos
app.get('/api/v1/files/:fileId/download', async (req, res) => {
  const capabilityToken = req.query.token;
  
  try {
    // Verificar y decodificar el token
    const capability = verifyCapabilityToken(capabilityToken);
    
    // Verificar que no ha expirado
    if (Date.now() > capability.expires_at * 1000) {
      return res.status(403).json({ error: 'Token expirado' });
    }
    
    // Verificar que corresponde al recurso solicitado
    if (capability.resource !== req.params.fileId) {
      return res.status(403).json({ error: 'Token no válido para este recurso' });
    }
    
    // Verificar que la acción es permitida
    if (capability.action !== 'download') {
      return res.status(403).json({ error: 'Acción no permitida' });
    }
    
    // Si el token tiene límite de usos, decrementar contador
    if (capability.max_uses) {
      await decrementCapabilityUses(capabilityToken);
    }
    
    // Proceder a servir el archivo
    const file = await getFile(req.params.fileId);
    res.download(file.path, capability.metadata.filename);
    
  } catch (error) {
    res.status(401).json({ error: 'Token de capacidad inválido' });
  }
});`}
            language="javascript"
          />

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <CheckCircle className="h-5 w-5 text-indigo-500" />
            Mejores prácticas
          </h2>

          <SecurityBestPractices 
            items={authzBestPractices}
            className="mb-8 mt-4"
          />

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6 dark:text-white">
            <Database className="h-5 w-5 text-blue-500" />
            Auditoría y registro
          </h3>

          <p className="dark:text-slate-300">
            Un sistema de auditoría robusto es crucial para complementar la autorización, ya que permite:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6 dark:text-slate-300">
            <li>Detectar usos indebidos o actividad sospechosa</li>
            <li>Cumplir con requisitos regulatorios</li>
            <li>Proporcionar un registro de las decisiones de autorización</li>
            <li>Ayudar en la resolución de disputas o investigación de incidentes</li>
          </ul>

          <CodeBlock
            code={`// Ejemplo de registro de eventos de autorización
function auditAuthorizationEvent(user, resource, action, decision, context) {
  const auditEntry = {
    timestamp: new Date().toISOString(),
    user_id: user.id,
    user_name: user.name,
    resource: {
      type: resource.type,
      id: resource.id
    },
    action: action,
    decision: decision, // "allowed" o "denied"
    reason: decision === "allowed" ? "permission_granted" : "insufficient_permissions",
    context: {
      ip_address: context.ip,
      user_agent: context.userAgent,
      request_id: context.requestId
    }
  };
  
  // Registrar en sistema de logs
  logger.info('authorization_decision', auditEntry);
  
  // Opcional: Guardar en base de datos para consultas
  db.collection('authorization_logs').insertOne(auditEntry);
}`}
            language="javascript"
          />

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <Code className="h-5 w-5 text-pink-500" />
            Herramientas y bibliotecas
          </h2>

          <p className="dark:text-slate-300">
            Existen diversas herramientas y bibliotecas para implementar autorización en APIs REST:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8">
            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">RBAC</h4>
                <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                  <li>CASL (JavaScript)</li>
                  <li>AccessControl (Node.js)</li>
                  <li>Spring Security (Java)</li>
                  <li>django-role-permissions (Python)</li>
                  <li>Pundit (Ruby)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">ABAC/Políticas</h4>
                <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                  <li>Open Policy Agent (OPA)</li>
                  <li>Casbin</li>
                  <li>AWS IAM</li>
                  <li>XACML</li>
                  <li>Oso</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-700">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Frameworks completos</h4>
                <ul className="list-disc pl-4 space-y-1 dark:text-slate-300">
                  <li>KeyCloak</li>
                  <li>IdentityServer</li>
                  <li>Auth0</li>
                  <li>Okta</li>
                  <li>Firebase Authentication</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 dark:text-white">
            <FileKey className="h-5 w-5 text-yellow-500" />
            Comparación de modelos
          </h2>

          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-8">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Modelo</th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Complejidad</th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Flexibilidad</th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Casos de uso</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">RBAC</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Baja</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Media</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">La mayoría de aplicaciones empresariales, SaaS B2B</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">ACL</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Media</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Alta para recursos específicos</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Sistemas de archivos, control de acceso granular a nivel de instancia</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">ABAC</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Alta</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Muy alta</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Sistemas con reglas complejas, regulados o con requisitos contextuales</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">PBAC</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Alta</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Alta</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Servicios en la nube, sistemas distribuidos, microservicios</td>
              </tr>
            </tbody>
          </table>

          <SecurityBestPractices 
            title="Recomendación para elegir un modelo"
            items={modelRecommendations}
            className="mb-8"
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default Authorization;
