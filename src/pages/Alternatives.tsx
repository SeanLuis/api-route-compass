import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Code, Server, Shield, Database, Workflow, Network, MessageSquare, Terminal, RefreshCw, GitBranch } from "lucide-react";

const Alternatives = () => {
  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="border-b pb-8">
          <div className="flex items-center gap-2">
            <Link to="/scalable-patterns" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">API Avanzada</Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4">Alternativas a REST</h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Enfoques alternativos a REST para APIs web.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <p className="dark:text-slate-300">
            Aunque REST ha sido el paradigma dominante para APIs web durante muchos años,
            existen varios enfoques alternativos que pueden ser más adecuados dependiendo
            de los requisitos específicos del proyecto, el tipo de aplicación y los patrones
            de comunicación necesarios.
          </p>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Code className="h-5 w-5 text-indigo-500" />
            GraphQL
          </h2>
          <p className="dark:text-slate-300">
            GraphQL es un lenguaje de consulta y manipulación para APIs, desarrollado por Facebook,
            que proporciona una alternativa flexible a REST. En lugar de múltiples endpoints,
            GraphQL utiliza un único endpoint donde el cliente especifica exactamente qué datos necesita.
          </p>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Terminal className="h-5 w-5 text-blue-500" />
            Ejemplo de GraphQL
          </h3>
          <CodeBlock
            code={`# Solicitud GraphQL
query {
  user(id: "123") {
    name
    email
    orders(last: 3) {
      id
      total
      items {
        product {
          name
          price
        }
        quantity
      }
    }
  }
}

# Respuesta
{
  "data": {
    "user": {
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "orders": [
        {
          "id": "order_789",
          "total": 129.99,
          "items": [
            {
              "product": {
                "name": "Auriculares Premium",
                "price": 129.99
              },
              "quantity": 1
            }
          ]
        },
        // ... más órdenes
      ]
    }
  }
}`}
            language="graphql"
          />

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Shield className="h-5 w-5 text-blue-500" />
            Cuándo Usar GraphQL
          </h3>
          <ul className="ml-6 space-y-1 list-disc text-slate-700 dark:text-slate-300">
            <li>APIs que sirven a múltiples clientes con necesidades diferentes</li>
            <li>Interfaces que necesitan datos anidados complejos en una sola solicitud</li>
            <li>Aplicaciones que requieren flexibilidad para evolucionar la UI sin modificar la API</li>
            <li>Aplicaciones móviles donde minimizar el tamaño de la respuesta es crucial</li>
          </ul>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Server className="h-5 w-5 text-indigo-500" />
            gRPC
          </h2>
          <p className="dark:text-slate-300">
            gRPC es un framework RPC (Remote Procedure Call) moderno, de alto rendimiento, desarrollado
            por Google. Utiliza Protocol Buffers para serialización y HTTP/2 para transporte.
          </p>

          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mt-6">
            <Database className="h-5 w-5 text-blue-500" />
            Características Principales
          </h3>
          <ul className="dark:text-slate-300">
            <li><strong>Alto rendimiento:</strong> Más rápido que REST/JSON gracias a serialización binaria y HTTP/2</li>
            <li><strong>Contract-first:</strong> Define servicios y mensajes mediante Protocol Buffers</li>
            <li><strong>Streaming:</strong> Soporta streaming bidireccional</li>
            <li><strong>Multiplexación:</strong> Múltiples solicitudes y respuestas sobre una sola conexión</li>
            <li><strong>Generación de código:</strong> Genera automáticamente cliente y servidor para múltiples lenguajes</li>
          </ul>

          <h3>Ejemplo de gRPC (Proto Definition)</h3>
          <CodeBlock
            code={`syntax = "proto3";

package inventory;

service InventoryService {
  rpc GetProduct(ProductRequest) returns (Product) {}
  rpc SearchProducts(SearchRequest) returns (stream Product) {}
  rpc UpdateStock(stream StockUpdate) returns (StockResponse) {}
  rpc MonitorStock(StockRequest) returns (stream StockLevel) {}
}

message ProductRequest {
  string product_id = 1;
}

message Product {
  string id = 1;
  string name = 2;
  string description = 3;
  double price = 4;
  int32 stock = 5;
}

message SearchRequest {
  string query = 1;
  int32 page_size = 2;
  string category = 3;
}

message StockUpdate {
  string product_id = 1;
  int32 quantity_change = 2; // positive for additions, negative for reductions
}

message StockResponse {
  bool success = 1;
  repeated StockError errors = 2;
}

message StockError {
  string product_id = 1;
  string error_message = 2;
}

message StockRequest {
  repeated string product_ids = 1;
  int32 threshold = 2;
}

message StockLevel {
  string product_id = 1;
  int32 current_stock = 2;
  bool below_threshold = 3;
}`}
            language="protobuf"
          />

          <h3>Cuándo Usar gRPC</h3>
          <ul className="dark:text-slate-300">
            <li>Microservicios que necesitan comunicación de alto rendimiento entre ellos</li>
            <li>Sistemas que requieren streaming en tiempo real</li>
            <li>Aplicaciones con restricciones significativas de latencia o ancho de banda</li>
            <li>Comunicación políglota entre servicios escritos en diferentes lenguajes</li>
          </ul>

          <h2>WebSockets</h2>
          <p className="dark:text-slate-300">
            WebSockets proporciona un canal de comunicación bidireccional, full-duplex sobre una única conexión TCP.
            Es ideal para aplicaciones que requieren actualizaciones en tiempo real.
          </p>

          <h3>Características Principales</h3>
          <ul className="dark:text-slate-300">
            <li><strong>Comunicación bidireccional:</strong> El servidor puede enviar datos sin solicitud del cliente</li>
            <li><strong>Conexión persistente:</strong> Una única conexión permanece abierta para intercambio de mensajes</li>
            <li><strong>Menor latencia:</strong> No requiere establecer nuevas conexiones para cada mensaje</li>
            <li><strong>Ideal para tiempo real:</strong> Perfecto para chat, juegos, dashboards en vivo</li>
          </ul>

          <h3>Ejemplo de WebSockets</h3>
          <CodeBlock
            code={`// Cliente JavaScript
const socket = new WebSocket('wss://api.example.com/realtime');

socket.onopen = function(event) {
  console.log('Conexión establecida');
  
  // Suscribirse a actualizaciones de precio
  socket.send(JSON.stringify({
    action: 'subscribe',
    channel: 'price_updates',
    symbols: ['AAPL', 'GOOGL', 'MSFT']
  }));
};

socket.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log('Actualización recibida:', data);
  updateUI(data);
};

// Servidor (Node.js con ws)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function(ws) {
  console.log('Cliente conectado');
  
  ws.on('message', function(message) {
    const request = JSON.parse(message);
    
    if (request.action === 'subscribe') {
      // Añadir cliente a canal específico
      subscribeToChannel(ws, request.channel, request.symbols);
    }
  });
  
  // Enviar actualizaciones periódicas
  const interval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'price_update',
        symbol: 'AAPL',
        price: 150.75,
        change: +1.25
      }));
    }
  }, 1000);
  
  ws.on('close', function() {
    clearInterval(interval);
  });
});`}
            language="javascript"
          />

          <h3>Cuándo Usar WebSockets</h3>
          <ul className="dark:text-slate-300">
            <li>Aplicaciones con actualización de datos en tiempo real</li>
            <li>Chats y sistemas de mensajería</li>
            <li>Juegos multijugador</li>
            <li>Dashboards y visualizaciones en vivo</li>
            <li>Notificaciones instantáneas</li>
          </ul>

          <h2>Server-Sent Events (SSE)</h2>
          <p className="dark:text-slate-300">
            SSE permite que un servidor envíe actualizaciones a un cliente a través de HTTP.
            A diferencia de WebSockets, SSE es unidireccional (del servidor al cliente).
          </p>

          <h3>Características Principales</h3>
          <ul className="dark:text-slate-300">
            <li><strong>Comunicación unidireccional:</strong> Del servidor al cliente</li>
            <li><strong>Basado en HTTP:</strong> Mejor compatibilidad con infraestructuras existentes</li>
            <li><strong>Reconexión automática:</strong> Los clientes se reconectan automáticamente si se pierde la conexión</li>
            <li><strong>Formato de evento estandarizado:</strong> Estructura definida para mensajes</li>
          </ul>

          <h3>Ejemplo de SSE</h3>
          <CodeBlock
            code={`// Cliente JavaScript
const eventSource = new EventSource('/api/events');

eventSource.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log('Evento recibido:', data);
};

eventSource.addEventListener('notification', function(e) {
  const notification = JSON.parse(e.data);
  showNotification(notification);
});

eventSource.addEventListener('price_alert', function(e) {
  const alert = JSON.parse(e.data);
  updatePriceChart(alert);
});

// Servidor (Node.js con Express)
const app = require('express')();

app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // Enviar un evento cada 5 segundos
  const interval = setInterval(() => {
    res.write('event: notification\n');
    res.write(\`data: {"id": "notif_123", "message": "Nuevo comentario en tu publicación", "type": "comment"}\n\n\`);
    
    // Ocasionalmente enviar una alerta de precio
    if (Math.random() > 0.7) {
      res.write('event: price_alert\n');
      res.write(\`data: {"symbol": "AAPL", "price": 150.75, "change": 2.5}\n\n\`);
    }
  }, 5000);
  
  req.on('close', () => {
    clearInterval(interval);
  });
});
// data: {"id": "notif_123", "message": "Nuevo comentario en tu publicación", "type": "comment"}
//
// event: price_alert
// data: {"symbol": "AAPL", "price": 150.75, "change": 2.5}
//
`}
            language="javascript"
          />

          <h3>Cuándo Usar SSE</h3>
          <ul className="dark:text-slate-300">
            <li>Escenarios donde solo necesitas comunicación unidireccional del servidor al cliente</li>
            <li>Actualizaciones de feed de noticias, notificaciones, alertas</li>
            <li>Cuando necesitas compatibilidad con proxies y firewalls tradicionales</li>
            <li>Como alternativa más ligera a WebSockets cuando no necesitas comunicación bidireccional</li>
          </ul>

          <h2>JSON-RPC y SOAP</h2>
          <p className="dark:text-slate-300">
            Estos protocolos más tradicionales siguen siendo relevantes en ciertos contextos empresariales
            y sistemas heredados.
          </p>

          <h3>JSON-RPC</h3>
          <p className="dark:text-slate-300">
            Un protocolo RPC liviano basado en JSON para llamadas de procedimiento remoto.
          </p>

          <CodeBlock
            code={`// Solicitud
{
  "jsonrpc": "2.0",
  "method": "calculateTax",
  "params": {
    "amount": 100.00,
    "country": "ES",
    "product_type": "digital"
  },
  "id": 1
}

// Respuesta
{
  "jsonrpc": "2.0",
  "result": {
    "tax_amount": 21.00,
    "total_amount": 121.00,
    "tax_rate": 0.21,
    "tax_type": "VAT"
  },
  "id": 1
}`}
            language="json"
          />

          <h3>SOAP</h3>
          <p className="dark:text-slate-300">
            Un protocolo basado en XML para intercambio de mensajes estructurados en servicios web.
          </p>

          <CodeBlock
            code={`<!-- Solicitud SOAP -->
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"
               xmlns:m="http://www.example.org/stock">
  <soap:Header>
    <m:Authentication>
      <m:token>abc123token</m:token>
    </m:Authentication>
  </soap:Header>
  <soap:Body>
    <m:GetStock>
      <m:StockName>IBM</m:StockName>
    </m:GetStock>
  </soap:Body>
</soap:Envelope>

<!-- Respuesta SOAP -->
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"
               xmlns:m="http://www.example.org/stock">
  <soap:Body>
    <m:GetStockResponse>
      <m:Price>95.25</m:Price>
    </m:GetStockResponse>
  </soap:Body>
</soap:Envelope>`}
            language="xml"
          />

          <h2>Comparativa de Enfoques</h2>

          <table className="w-full border-collapse my-6">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="border border-slate-300 dark:border-slate-700 p-2 text-left">Característica</th>
                <th className="border border-slate-300 dark:border-slate-700 p-2 text-left">REST</th>
                <th className="border border-slate-300 dark:border-slate-700 p-2 text-left">GraphQL</th>
                <th className="border border-slate-300 dark:border-slate-700 p-2 text-left">gRPC</th>
                <th className="border border-slate-300 dark:border-slate-700 p-2 text-left">WebSockets</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Modelo de comunicación</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Solicitud/Respuesta</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Solicitud/Respuesta</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">RPC, Streaming</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Bidireccional</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Formato de datos</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Cualquiera (típicamente JSON)</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">JSON</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Protocol Buffers (binario)</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Cualquiera</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Tipado</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">No tipado</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Fuertemente tipado</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Fuertemente tipado</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">No tipado</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Evolución de API</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Por versiones</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Iterativa, sin romper</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Por versiones de proto</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Flexible</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Rendimiento</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Bueno</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Bueno</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Excelente</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Muy bueno</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Facilidad de uso</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Alta</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Media</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Media</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Media</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Casos de uso ideales</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">APIs públicas, sistemas web</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Apps móviles, UIs complejas</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Microservicios, bajo latencia</td>
                <td className="border border-slate-300 dark:border-slate-700 p-2 dark:text-slate-300">Apps en tiempo real</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-indigo-500" />
            Enfoques Híbridos
          </h2>
          <p className="dark:text-slate-300">
            En la práctica, muchas aplicaciones modernas utilizan enfoques híbridos, combinando diferentes
            tecnologías según los requisitos específicos de cada componente:
          </p>

          <ul className="ml-6 space-y-1 list-disc text-slate-700 dark:text-slate-300">
            <li><strong>REST + WebSockets:</strong> REST para operaciones CRUD y WebSockets para actualizaciones en tiempo real</li>
            <li><strong>GraphQL + gRPC:</strong> GraphQL para clientes externos y gRPC para comunicación interna entre microservicios</li>
            <li><strong>REST + SSE:</strong> REST para operaciones estándar y SSE para notificaciones o streaming de eventos</li>
          </ul>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 p-6 rounded-lg border border-indigo-100 dark:border-indigo-800 mb-8 mt-4">
            <p className="text-indigo-800 dark:text-indigo-300">
              "La elección del enfoque adecuado para tu API no debe ser dogmática, sino pragmática. 
              Entiende las fortalezas y debilidades de cada tecnología y selecciona la que mejor se 
              alinee con tus requisitos específicos, o combina varias para aprovechar lo mejor de cada una."
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Alternatives;
