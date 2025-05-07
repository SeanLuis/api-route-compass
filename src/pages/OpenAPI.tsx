import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent } from "@/components/ui/card";

const OpenAPI = () => {
  return (
    <PageLayout>
      <PageContent
        title="OpenAPI/Swagger"
        description="Uso de OpenAPI para documentar APIs REST de forma efectiva."
        path={["Documentación", "OpenAPI/Swagger"]}
      >
        <p>
          OpenAPI (anteriormente conocido como Swagger) es un formato de especificación para describir,
          producir, consumir y visualizar servicios web RESTful. Proporciona un estándar para documentar
          APIs que puede ser entendido tanto por humanos como por máquinas.
        </p>

        <h2>¿Qué es OpenAPI?</h2>

        <p>
          OpenAPI Specification (OAS) define un formato estándar para describir una API REST de forma
          que permite a los desarrolladores:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Documentar la API de manera completa y precisa</li>
          <li>Generar código cliente y servidor automáticamente</li>
          <li>Crear interfaces de usuario interactivas para explorar la API</li>
          <li>Validar implementaciones contra la especificación</li>
          <li>Mantener la documentación sincronizada con el código</li>
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Ventajas de OpenAPI</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Estándar abierto e independiente del lenguaje</li>
                <li>Ecosistema rico de herramientas y librerías</li>
                <li>Soporte para todo el ciclo de vida de la API</li>
                <li>Facilita la colaboración entre equipos</li>
                <li>Mejora la experiencia del desarrollador</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">OpenAPI vs. Swagger</h4>
              <p>
                <strong>Swagger</strong> era el nombre original de la especificación.
                En 2015, Swagger fue donado a la Fundación Linux y renombrado a <strong>OpenAPI</strong>.
                Hoy, OpenAPI es el nombre de la especificación, mientras que Swagger se refiere a las
                herramientas que la rodean (Swagger UI, Swagger Editor, etc.)
              </p>
            </CardContent>
          </Card>
        </div>

        <h2>Estructura de un documento OpenAPI</h2>

        <p>
          Un documento OpenAPI puede ser escrito en formato YAML o JSON. A continuación, se muestra
          la estructura básica de un documento OpenAPI 3.0:
        </p>

        <CodeBlock
          code={`openapi: 3.0.3
info:
  title: API de Gestión de Productos
  description: API para gestionar productos, categorías y reviews
  version: 1.0.0
  contact:
    name: Equipo API
    email: api@example.com
    url: https://example.com/support
servers:
  - url: https://api.example.com/v1
    description: Servidor de producción
  - url: https://staging-api.example.com/v1
    description: Servidor de staging

paths:
  /products:
    get:
      summary: Listar productos
      description: Obtiene una lista paginada de todos los productos
      parameters:
        - name: page
          in: query
          description: Número de página
          schema:
            type: integer
            default: 1
      responses:
        '200':
          description: Lista de productos obtenida con éxito
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductList'
    post:
      summary: Crear producto
      description: Crea un nuevo producto
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductInput'
      responses:
        '201':
          description: Producto creado con éxito
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Product'

components:
  schemas:
    Product:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
        price:
          type: number
          format: float
        category_id:
          type: string
          format: uuid
        created_at:
          type: string
          format: date-time
      required:
        - id
        - name
        - price
    
    ProductInput:
      type: object
      properties:
        name:
          type: string
          minLength: 3
          maxLength: 100
        price:
          type: number
          minimum: 0
        category_id:
          type: string
          format: uuid
      required:
        - name
        - price
    
    ProductList:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/Product'
        pagination:
          $ref: '#/components/schemas/Pagination'
    
    Pagination:
      type: object
      properties:
        total:
          type: integer
        page:
          type: integer
        per_page:
          type: integer
        total_pages:
          type: integer`}
          language="yaml"
        />

        <h3>Elementos principales</h3>

        <div className="space-y-4 mb-8">
          <div>
            <h4 className="font-semibold">Metadatos (info)</h4>
            <p>
              Información general sobre la API, como título, descripción, versión, términos de servicio y
              datos de contacto.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Servidores (servers)</h4>
            <p>
              Lista de servidores y URLs donde la API está disponible. Puede incluir servidores de
              producción, staging, desarrollo, etc.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Rutas (paths)</h4>
            <p>
              Define los endpoints disponibles en la API y las operaciones HTTP que soportan (GET,
              POST, PUT, DELETE, etc.). Cada operación describe parámetros, cuerpo de la solicitud,
              respuestas posibles y ejemplos.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Componentes (components)</h4>
            <p>
              Definiciones reutilizables, como esquemas de datos (schemas), parámetros, cuerpos de
              solicitud, respuestas, encabezados, y ejemplos.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Seguridad (security)</h4>
            <p>
              Define los esquemas de seguridad utilizados por la API, como API keys, autenticación
              básica, OAuth2, etc.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Tags (tags)</h4>
            <p>
              Permiten agrupar operaciones por categorías lógicas, facilitando la organización y
              navegación de la documentación.
            </p>
          </div>
        </div>

        <h2>Documentación detallada de endpoints</h2>
        
        <p>
          Documentar endpoints de manera efectiva requiere proporcionar información clara sobre parámetros, 
          cuerpos de solicitud, respuestas, y ejemplos.
        </p>

        <CodeBlock
          code={`# Ejemplo detallado de un endpoint
/orders/{orderId}:
  get:
    tags:
      - Orders
    summary: Obtener detalles de una orden
    description: |-
      Retorna los detalles completos de una orden específica.
      Incluye información del cliente, productos, dirección de envío y estado del pago.
    operationId: getOrderById
    parameters:
      - name: orderId
        in: path
        description: ID único de la orden
        required: true
        schema:
          type: string
          format: uuid
      - name: include
        in: query
        description: Campos relacionados a incluir en la respuesta
        schema:
          type: string
          enum: [items, customer, payment]
    responses:
      '200':
        description: Orden encontrada
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Order'
            examples:
              completeOrder:
                summary: Orden completa con todos los detalles
                value:
                  id: "ord_123456"
                  status: "shipped"
                  total: 89.99
                  customer_id: "cus_123456"
                  created_at: "2023-05-25T14:25:09Z"
                  items: [
                    {
                      product_id: "prod_123",
                      quantity: 1,
                      price: 79.99,
                      name: "Smartphone Premium"
                    },
                    {
                      product_id: "prod_456",
                      quantity: 2,
                      price: 5.00,
                      name: "Protector de pantalla"
                    }
                  ]
      '404':
        description: Orden no encontrada
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Error'
            example:
              error:
                code: "not_found"
                message: "La orden especificada no existe"
      '401':
        $ref: '#/components/responses/Unauthorized'
    security:
      - bearerAuth: []`}
          language="yaml"
        />

        <h2>Mejores prácticas para OpenAPI</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Organización del documento</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Usar tags para agrupar endpoints relacionados</li>
                <li>Organizar paths de manera lógica y consistente</li>
                <li>Separar definiciones comunes en components/schemas</li>
                <li>Usar referencias ($ref) para evitar duplicación</li>
                <li>Dividir documentos grandes en múltiples archivos</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Documentación clara</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Usar descripciones claras y completas</li>
                <li>Incluir ejemplos para solicitudes y respuestas</li>
                <li>Documentar todos los posibles códigos de respuesta</li>
                <li>Especificar formatos para strings (date, email, uuid)</li>
                <li>Incluir restricciones (min/max, pattern, enum)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Seguridad</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Definir todos los esquemas de seguridad utilizados</li>
                <li>Especificar qué endpoints requieren autenticación</li>
                <li>Documentar diferentes niveles de acceso (scopes)</li>
                <li>Incluir ejemplos de autenticación</li>
                <li>Documentar procesos de obtención de tokens</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Versionado y compatibilidad</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Mantener la versión de OpenAPI actualizada</li>
                <li>Documentar la versión de la API</li>
                <li>Usar marcas de deprecación para features obsoletos</li>
                <li>Mantener retrocompatibilidad en especificaciones</li>
                <li>Versionar la especificación junto con la API</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-8">
          <h4 className="text-blue-900 font-medium">💡 Consejo</h4>
          <p className="text-blue-800">
            Mantén tu especificación OpenAPI sincronizada con tu código. Considera usar herramientas de
            generación automática a partir de comentarios o anotaciones en el código fuente. Esto
            ayuda a evitar discrepancias entre la documentación y la implementación real.
          </p>
        </div>

        <h2>Documentación de seguridad</h2>

        <p>
          OpenAPI permite documentar los diferentes mecanismos de seguridad que utiliza tu API:
        </p>

        <CodeBlock
          code={`components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: Utiliza un token JWT para la autenticación
    
    apiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
      description: Clave API para autenticar solicitudes
    
    OAuth2:
      type: oauth2
      description: Autenticación OAuth 2.0
      flows:
        authorizationCode:
          authorizationUrl: https://example.com/oauth/authorize
          tokenUrl: https://example.com/oauth/token
          scopes:
            read: Permiso para leer recursos
            write: Permiso para crear y modificar recursos
            admin: Acceso administrativo completo

security:
  - bearerAuth: []  # Por defecto, todas las operaciones requieren JWT

# Anular la seguridad por defecto para endpoints específicos
paths:
  /public/products:
    get:
      summary: Listar productos públicos
      security: []  # Sin requisitos de seguridad
  
  /admin/users:
    get:
      summary: Listar usuarios (solo admin)
      security:
        - bearerAuth: []
          OAuth2: [admin]  # Requiere scope 'admin'`}
          language="yaml"
        />

        <h2>Herramientas del ecosistema OpenAPI</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Herramientas de documentación</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Swagger UI</li>
                <li>ReDoc</li>
                <li>Stoplight Studio</li>
                <li>Swagger Editor</li>
                <li>OpenAPI Explorer</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Generadores de código</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Swagger Codegen</li>
                <li>OpenAPI Generator</li>
                <li>NSwag</li>
                <li>AutoRest</li>
                <li>openapi-typescript</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Integración con frameworks</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Springdoc-OpenAPI (Spring)</li>
                <li>Swagger-PHP</li>
                <li>Express OpenAPI</li>
                <li>FastAPI (Python)</li>
                <li>NestJS Swagger</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h3>Swagger UI</h3>

        <p>
          Swagger UI es una de las herramientas más populares para visualizar y probar APIs documentadas
          con OpenAPI. Proporciona una interfaz interactiva que permite explorar los endpoints, enviar
          solicitudes de prueba y ver las respuestas.
        </p>

        <div className="border border-gray-200 rounded-lg mb-8">
          <img 
            src="https://static1.smartbear.co/swagger/media/images/tools/opensource/swagger_ui.png"
            alt="Ejemplo de Swagger UI"
            className="w-full rounded-lg"
          />
        </div>

        <h2>Generación de documentación a partir del código</h2>

        <p>
          Una práctica recomendada es generar la documentación OpenAPI directamente desde el código
          fuente, utilizando anotaciones o comentarios especiales. Esto garantiza que la documentación
          siempre está sincronizada con la implementación actual.
        </p>
        
        <h3>Ejemplo en Node.js/Express con express-jsdoc-swagger</h3>

        <CodeBlock
          code={`// server.js
const express = require('express');
const expressJSDocSwagger = require('express-jsdoc-swagger');

const app = express();

// Configuración de OpenAPI
const options = {
  info: {
    title: 'API de Productos',
    version: '1.0.0',
    description: 'API para gestionar productos',
  },
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
  baseDir: __dirname,
  filesPattern: './**/*.js',
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
};

expressJSDocSwagger(app)(options);

// Controladores con anotaciones JSDoc
/**
 * GET /api/products
 * @summary Obtiene una lista de productos
 * @tags Products
 * @param {string} category.query - Filtrar por categoría
 * @param {integer} page.query.required - Número de página - default: 1
 * @return {array<Product>} 200 - Lista de productos
 */
app.get('/api/products', (req, res) => {
  // Implementación
});

/**
 * Product
 * @typedef {object} Product
 * @property {string} id - ID único
 * @property {string} name - Nombre del producto
 * @property {number} price - Precio
 * @property {string} category - Categoría
 * @property {boolean} in_stock - Disponibilidad
 */

/**
 * POST /api/products
 * @summary Crea un nuevo producto
 * @tags Products
 * @security BearerAuth
 * @param {ProductInput} request.body.required - Información del producto
 * @return {Product} 201 - Producto creado
 * @return {object} 400 - Error de validación
 */
app.post('/api/products', (req, res) => {
  // Implementación
});

/**
 * ProductInput
 * @typedef {object} ProductInput
 * @property {string} name.required - Nombre del producto
 * @property {number} price.required - Precio
 * @property {string} category - Categoría
 */

app.listen(3000, () => console.log('Server running on port 3000'));`}
          language="javascript"
        />

        <h3>Ejemplo en Spring Boot (Java)</h3>

        <CodeBlock
          code={`// ProductController.java
package com.example.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Products", description = "API para gestionar productos")
public class ProductController {

    @GetMapping
    @Operation(
        summary = "Listar productos",
        description = "Obtiene una lista paginada de productos con opciones de filtrado"
    )
    @ApiResponse(responseCode = "200", description = "Lista de productos obtenida con éxito")
    public ProductListResponse getProducts(
        @Parameter(description = "Filtrar por categoría") 
        @RequestParam(required = false) String category,
        
        @Parameter(description = "Número de página") 
        @RequestParam(defaultValue = "1") int page,
        
        @Parameter(description = "Resultados por página") 
        @RequestParam(defaultValue = "10") int size
    ) {
        // Implementación
    }

    @PostMapping
    @Operation(
        summary = "Crear producto",
        description = "Crea un nuevo producto en el sistema"
    )
    @ApiResponse(
        responseCode = "201", 
        description = "Producto creado con éxito",
        content = @Content(schema = @Schema(implementation = Product.class))
    )
    @ApiResponse(
        responseCode = "400", 
        description = "Datos de producto inválidos",
        content = @Content(schema = @Schema(implementation = ErrorResponse.class))
    )
    public Product createProduct(@RequestBody ProductInput productInput) {
        // Implementación
    }
}

// Product.java
@Schema(description = "Producto")
public class Product {
    @Schema(description = "ID único", example = "prod_123abc")
    private String id;
    
    @Schema(description = "Nombre del producto", example = "Smartphone Premium")
    private String name;
    
    @Schema(description = "Precio", example = "899.99")
    private BigDecimal price;
    
    // Getters, setters, etc.
}`}
          language="java"
        />

        <h3>Ejemplo en FastAPI (Python)</h3>

        <CodeBlock
          code={`# main.py
from fastapi import FastAPI, Query, Path, Body, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID, uuid4

app = FastAPI(
    title="API de Productos",
    description="API para gestionar productos y categorías",
    version="1.0.0"
)

class ProductBase(BaseModel):
    name: str = Field(..., description="Nombre del producto", example="Smartphone Premium")
    price: float = Field(..., description="Precio del producto", gt=0, example=899.99)
    category_id: Optional[UUID] = Field(None, description="ID de la categoría")
    in_stock: bool = Field(True, description="Disponibilidad del producto")

class Product(ProductBase):
    id: UUID = Field(default_factory=uuid4, description="ID único del producto")
    
    class Config:
        schema_extra = {
            "example": {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "name": "Smartphone Premium",
                "price": 899.99,
                "category_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "in_stock": True
            }
        }

class ProductList(BaseModel):
    data: List[Product]
    total: int
    page: int
    pages: int

@app.get(
    "/api/products", 
    response_model=ProductList,
    summary="Listar productos",
    description="Obtiene una lista paginada de productos con opciones de filtrado",
    tags=["Products"]
)
async def get_products(
    category: Optional[UUID] = Query(None, description="Filtrar por categoría"),
    page: int = Query(1, description="Número de página", ge=1),
    size: int = Query(10, description="Resultados por página", ge=1, le=100)
):
    # Implementación
    pass

@app.post(
    "/api/products", 
    response_model=Product,
    status_code=201,
    summary="Crear producto",
    description="Crea un nuevo producto en el sistema",
    tags=["Products"]
)
async def create_product(product: ProductBase = Body(...)):
    # Implementación
    pass

@app.get(
    "/api/products/{product_id}",
    response_model=Product,
    summary="Obtener producto",
    description="Obtiene los detalles de un producto específico",
    tags=["Products"]
)
async def get_product(
    product_id: UUID = Path(..., description="ID único del producto")
):
    # Implementación
    # Si no se encuentra:
    raise HTTPException(status_code=404, detail="Producto no encontrado")`}
          language="python"
        />

        <h2>OpenAPI y pruebas automatizadas</h2>

        <p>
          Las especificaciones OpenAPI no solo sirven para documentación, sino también como base para
          pruebas automatizadas de API:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Generar casos de prueba basados en la especificación</li>
          <li>Validar respuestas contra los esquemas definidos</li>
          <li>Simular solicitudes con ejemplos incluidos en la documentación</li>
          <li>Configurar pruebas de integración continua</li>
          <li>Detectar regresiones cuando la API cambia</li>
        </ul>

        <CodeBlock
          code={`// Ejemplo de prueba con swagger-typescript-api y Jest
import { Api } from './generated-api-client';

describe('Products API', () => {
  const api = new Api({
    baseUrl: 'https://api.example.com/v1',
    headers: {
      Authorization: \`Bearer \${process.env.API_TOKEN}\`
    }
  });

  test('should fetch products list', async () => {
    const response = await api.products.getProducts({
      page: 1,
      size: 10
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.pagination).toHaveProperty('total');
  });

  test('should create new product', async () => {
    const newProduct = {
      name: 'Test Product',
      price: 99.99,
      category_id: 'cat_123456'
    };

    const response = await api.products.createProduct(newProduct);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.name).toBe(newProduct.name);
    expect(response.data.price).toBe(newProduct.price);
  });
});`}
          language="javascript"
        />

        <h2>Recursos adicionales</h2>

        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li><a rel="noopener noreferrer" href="https://swagger.io/specification/" target="_blank" className="text-blue-600 hover:underline">Especificación OpenAPI oficial</a></li>
          <li><a rel="noopener noreferrer" href="https://swagger.io/tools/swagger-ui/" target="_blank" className="text-blue-600 hover:underline">Swagger UI</a></li>
          <li><a rel="noopener noreferrer" href="https://github.com/swagger-api/swagger-editor" target="_blank" className="text-blue-600 hover:underline">Swagger Editor</a></li>
          <li><a rel="noopener noreferrer" href="https://redocly.com/redoc/" target="_blank" className="text-blue-600 hover:underline">ReDoc - Documentación alternativa</a></li>
          <li><a rel="noopener noreferrer" href="https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore.yaml" target="_blank" className="text-blue-600 hover:underline">Ejemplo PetStore API (OpenAPI 3.0)</a></li>
        </ul>

        <div className="bg-gray-50 border border-gray-200 rounded-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-2">Conclusión</h3>
          <p>
            OpenAPI se ha convertido en el estándar de facto para documentar APIs REST. Proporciona un formato
            estructurado que no solo mejora la comunicación entre equipos, sino que también habilita la generación
            automática de código, pruebas y herramientas de exploración interactiva. Adoptar OpenAPI como parte
            de tu flujo de trabajo de desarrollo de API puede mejorar significativamente la calidad, consistencia
            y usabilidad de tus servicios.
          </p>
        </div>
      </PageContent>
    </PageLayout>
  );
};

export default OpenAPI;
