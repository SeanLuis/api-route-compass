import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointExample } from "@/components/EndpointExample";

const FieldExpansion = () => {
  return (
    <PageLayout>
      <PageContent
        title="Expansión de Campos"
        description="Métodos para expandir relaciones y optimizar consultas en APIs REST."
        path={["Relaciones", "Expansión de Campos"]}
      >
        <p>
          La expansión de campos es una técnica que permite a los clientes solicitar
          datos relacionados junto con el recurso principal en una misma respuesta.
          Esta funcionalidad reduce el número de peticiones necesarias y mejora la
          eficiencia, flexibilidad y experiencia de desarrollo de la API.
        </p>

        <h2>El Problema que Resuelve</h2>

        <p>
          En REST, un desafío común es el llamado "problema N+1". Por ejemplo, al
          solicitar una lista de productos, el cliente podría necesitar hacer una
          petición adicional para obtener el detalle de cada categoría asociada:
        </p>

        <CodeBlock
          code={`# Petición inicial
GET /api/v1/products
→ Devuelve 20 productos con references a sus categorías

# Luego necesitas hacer 20 peticiones adicionales para obtener cada categoría
GET /api/v1/categories/1
GET /api/v1/categories/2
GET /api/v1/categories/3
...`}
          language="http"
        />

        <p>
          La expansión de campos permite resolver este problema solicitando que
          ciertas relaciones se incluyan directamente en la respuesta inicial.
        </p>

        <h2>Implementaciones de Expansión de Campos</h2>

        <h3>1. Expansión mediante Parámetro "expand" o "include"</h3>

        <p>
          El enfoque más común es utilizar un parámetro de consulta que especifique
          qué relaciones expandir:
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/products/123?expand=category,brand,reviews"
          description="Recupera un producto incluyendo su categoría, marca y reseñas en la misma respuesta."
          responseExample={`{
  "id": "prod_123",
  "name": "Smartphone Premium X",
  "price": 899.99,
  "description": "El último modelo con características avanzadas",
  "category": {
    "id": "cat_5",
    "name": "Smartphones",
    "tax_rate": 16
  },
  "brand": {
    "id": "brand_10",
    "name": "TechCorp",
    "logo_url": "https://example.com/logos/techcorp.png",
    "country": "USA"
  },
  "reviews": [
    {
      "id": "rev_45",
      "rating": 5,
      "comment": "Excelente producto, muy satisfecho con la compra",
      "author": "Carlos M."
    },
    {
      "id": "rev_67",
      "rating": 4,
      "comment": "Buen smartphone, sólo le falta mejor batería",
      "author": "Ana L."
    }
  ]
}`}
        />

        <p>Diferentes variantes de sintaxis para este enfoque:</p>

        <CodeBlock
          code={`# Usando "expand" como parámetro
GET /api/v1/products/123?expand=category,brand,reviews

# Usando "include" como alternativa
GET /api/v1/products/123?include=category,brand,reviews

# Formato de array
GET /api/v1/products/123?expand[]=category&expand[]=brand&expand[]=reviews

# Notación de puntos para relaciones anidadas
GET /api/v1/products/123?expand=category,brand,reviews.author`}
          language="http"
        />

        <h3>2. Expansión Selectiva de Campos</h3>

        <p>
          Combina la selección de campos específicos con la expansión de relaciones:
        </p>

        <CodeBlock
          code={`# Seleccionar solo ciertos campos del recurso principal y expandir relaciones
GET /api/v1/products/123?fields=id,name,price&expand=category.name,brand

# Seleccionar campos específicos de las relaciones expandidas
GET /api/v1/products/123?expand=category(id,name),brand(id,name,logo_url)`}
          language="http"
        />

        <h3>3. Expansión con Niveles de Profundidad</h3>

        <p>
          Controla cuántos niveles de relaciones anidadas se expanden:
        </p>

        <EndpointExample
          method="GET"
          path="/api/v1/orders/456?expand=customer,items.product"
          description="Recupera un pedido con el cliente asociado y los productos de cada ítem."
          responseExample={`{
  "id": "order_456",
  "order_number": "ORD-2023-1234",
  "status": "shipped",
  "total": 1299.98,
  "created_at": "2023-05-20T14:30:00Z",
  "customer": {
    "id": "cust_789",
    "name": "Elena Rodríguez",
    "email": "elena.rodriguez@example.com",
    "address": "Calle Principal 123"
  },
  "items": [
    {
      "id": "item_901",
      "quantity": 1,
      "price": 899.99,
      "product": {
        "id": "prod_123",
        "name": "Smartphone Premium X",
        "sku": "SP-X-123",
        "image_url": "https://example.com/images/smartphone-x.jpg"
      }
    },
    {
      "id": "item_902",
      "quantity": 2,
      "price": 199.99,
      "product": {
        "id": "prod_456",
        "name": "Auriculares Bluetooth",
        "sku": "AB-456",
        "image_url": "https://example.com/images/auriculares.jpg"
      }
    }
  ]
}`}
        />

        <p>
          También se puede limitar explícitamente la profundidad máxima:
        </p>

        <CodeBlock
          code={`# Limitar profundidad a un nivel
GET /api/v1/orders/456?expand=customer,items&max_depth=1

# Especificar diferentes profundidades para distintas relaciones
GET /api/v1/users/123?expand=orders:2,favorites:1`}
          language="http"
        />

        <h2>Mejores Prácticas</h2>

        <h3>Control de Rendimiento</h3>

        <p>
          La expansión de campos puede afectar el rendimiento si no se implementa
          adecuadamente:
        </p>

        <ul>
          <li>
            <strong>Limitar expansiones permitidas:</strong> Define qué relaciones
            pueden expandirse
          </li>
          <li>
            <strong>Establecer un máximo de expansiones:</strong> Limita el número de
            expansiones por petición
          </li>
          <li>
            <strong>Controlar la profundidad:</strong> Limita los niveles de
            anidación permitidos
          </li>
          <li>
            <strong>Optimizar consultas:</strong> Utiliza técnicas como carga ansiosa
            en el ORM
          </li>
        </ul>

        <CodeBlock
          code={`// Ejemplo de implementación con control de rendimiento en Express.js
app.get('/api/v1/products/:id', (req, res) => {
  const { id } = req.params;
  const { expand } = req.query;
  
  // 1. Validar y limitar expansiones
  let allowedExpansions = ['category', 'brand', 'reviews'];
  let requestedExpansions = expand ? expand.split(',') : [];
  let validExpansions = requestedExpansions.filter(exp => allowedExpansions.includes(exp));
  
  if (validExpansions.length > 3) {
    validExpansions = validExpansions.slice(0, 3); // Máximo 3 expansiones
  }
  
  // 2. Construir consulta optimizada (usando Sequelize como ejemplo)
  let include = [];
  
  if (validExpansions.includes('category')) {
    include.push({ model: Category });
  }
  
  if (validExpansions.includes('brand')) {
    include.push({ model: Brand });
  }
  
  if (validExpansions.includes('reviews')) {
    include.push({
      model: Review,
      limit: 5, // Limitar número de reseñas
      order: [['created_at', 'DESC']]
    });
  }
  
  // 3. Ejecutar consulta
  Product.findByPk(id, { include })
    .then(product => {
      if (!product) return res.status(404).json({ error: 'Product not found' });
      res.json(product);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});`}
          language="javascript"
        />

        <h3>Consistencia en las Respuestas</h3>

        <p>
          Mantén un formato consistente para recursos expandidos y no expandidos:
        </p>

        <CodeBlock
          code={`// Sin expansión
{
  "id": "prod_123",
  "name": "Smartphone Premium X",
  "price": 899.99,
  "category_id": "cat_5",
  "brand_id": "brand_10"
}

// Con expansión (mantiene los IDs originales)
{
  "id": "prod_123",
  "name": "Smartphone Premium X",
  "price": 899.99,
  "category_id": "cat_5",
  "brand_id": "brand_10",
  "category": {
    "id": "cat_5",
    "name": "Smartphones"
  },
  "brand": {
    "id": "brand_10",
    "name": "TechCorp"
  }
}`}
          language="json"
        />

        <h3>Documentación Clara</h3>

        <p>
          Documenta detalladamente el sistema de expansión:
        </p>

        <ul>
          <li>Lista todas las relaciones expandibles para cada recurso</li>
          <li>Especifica las limitaciones (profundidad, número máximo de expansiones)</li>
          <li>Proporciona ejemplos claros para diferentes escenarios</li>
          <li>Documenta el impacto en el rendimiento y las recomendaciones</li>
        </ul>

        <h2>Patrones de Implementación Avanzados</h2>

        <h3>Expansión Condicional</h3>

        <p>
          Expandir relaciones solo cuando cumplen ciertas condiciones:
        </p>

        <CodeBlock
          code={`# Expandir solo las reseñas con 5 estrellas
GET /api/v1/products/123?expand=reviews(rating=5)

# Expandir solo productos en oferta
GET /api/v1/categories/5?expand=products(on_sale=true)

# Expandir con filtros múltiples
GET /api/v1/users/123?expand=orders(status=delivered&created_after=2023-01-01)`}
          language="http"
        />

        <h3>Expansión con Paginación Interna</h3>

        <p>
          Paginar las colecciones de recursos expandidos:
        </p>

        <CodeBlock
          code={`# Expandir con paginación interna
GET /api/v1/products/123?expand=reviews(page=2&per_page=10)

# Respuesta
{
  "id": "prod_123",
  "name": "Smartphone Premium X",
  // ... otros campos ...
  "reviews": {
    "data": [
      { "id": "rev_45", "rating": 5, "comment": "Excelente producto" },
      // ... más reseñas ...
    ],
    "pagination": {
      "total": 42,
      "page": 2,
      "per_page": 10,
      "pages": 5
    }
  }
}`}
          language="http"
        />

        <h3>Expansión con Metadatos</h3>

        <p>
          Incluir metadatos adicionales sobre las relaciones expandidas:
        </p>

        <CodeBlock
          code={`{
  "id": "prod_123",
  "name": "Smartphone Premium X",
  // ... otros campos ...
  "reviews": {
    "data": [
      { "id": "rev_45", "rating": 5, "comment": "Excelente producto" },
      // ... más reseñas ...
    ],
    "meta": {
      "average_rating": 4.7,
      "total_count": 42,
      "distribution": {
        "5_star": 30,
        "4_star": 8,
        "3_star": 3,
        "2_star": 1,
        "1_star": 0
      }
    }
  }
}`}
          language="json"
        />

        <h2>Casos de Uso Específicos</h2>

        <h3>Expansión en APIs de E-commerce</h3>

        <EndpointExample
          method="GET"
          path="/api/v1/products/123?expand=category,variants,recommendations"
          description="Recupera un producto con su categoría, variantes y recomendaciones relacionadas."
          responseExample={`{
  "id": "prod_123",
  "name": "Smartphone Premium X",
  "price": 899.99,
  "description": "El último modelo con características avanzadas",
  "category": {
    "id": "cat_5",
    "name": "Smartphones",
    "parent_category": "Electrónica"
  },
  "variants": [
    {
      "id": "var_1",
      "name": "Negro / 128GB",
      "price": 899.99,
      "stock": 15
    },
    {
      "id": "var_2",
      "name": "Blanco / 128GB",
      "price": 899.99,
      "stock": 8
    },
    {
      "id": "var_3",
      "name": "Negro / 256GB",
      "price": 999.99,
      "stock": 10
    }
  ],
  "recommendations": [
    {
      "id": "prod_456",
      "name": "Funda Protectora Premium",
      "price": 29.99,
      "thumbnail": "https://example.com/thumbnails/funda.jpg"
    },
    {
      "id": "prod_789",
      "name": "Cargador Rápido 25W",
      "price": 19.99,
      "thumbnail": "https://example.com/thumbnails/cargador.jpg"
    }
  ]
}`}
        />

        <h3>Expansión en APIs de Redes Sociales</h3>

        <CodeBlock
          code={`# Expandir autor y comentarios de un post
GET /api/v1/posts/123?expand=author,comments.author,likes

# Expandir perfiles completos de seguidores
GET /api/v1/users/123?expand=followers.profile`}
          language="http"
        />

        <h3>Expansión en APIs de SaaS B2B</h3>

        <CodeBlock
          code={`# Expandir detalles de organización y permisos
GET /api/v1/users/123?expand=organization,permissions

# Expandir toda la información de un proyecto
GET /api/v1/projects/456?expand=teams,tasks.assignee,client`}
          language="http"
        />

        <h2>Implementación en Diferentes Tecnologías</h2>

        <h3>Node.js (Express + Mongoose)</h3>

        <CodeBlock
          code={`// Middleware para procesar expansiones
const handleExpand = (req, res, next) => {
  req.expandFields = [];
  if (req.query.expand) {
    req.expandFields = req.query.expand.split(',');
  }
  next();
};

// Controlador para productos
app.get('/api/v1/products/:id', handleExpand, async (req, res) => {
  try {
    let query = Product.findById(req.params.id);
    
    // Aplicar expansiones
    if (req.expandFields.includes('category')) {
      query = query.populate('category');
    }
    
    if (req.expandFields.includes('reviews')) {
      query = query.populate({
        path: 'reviews',
        options: { sort: { createdAt: -1 }, limit: 5 }
      });
    }
    
    const product = await query.exec();
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});`}
          language="javascript"
        />

        <h3>Django REST Framework (Python)</h3>

        <CodeBlock
          code={`# serializers.py
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True, required=False)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'description', 'category']
    
    def __init__(self, *args, **kwargs):
        # Obtener campos a expandir del contexto
        expand_fields = kwargs.pop('expand_fields', []);
        super().__init__(*args, **kwargs);
        
        # Si category no está en los campos a expandir, quitarlo
        if 'category' not in expand_fields and 'category' in self.fields:
            self.fields['category'] = serializers.PrimaryKeyRelatedField(
                read_only=True
            )

# views.py
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_serializer(self, *args, **kwargs):
        expand = self.request.query_params.get('expand', '')
        expand_fields = [field.strip() for field in expand.split(',')] if expand else []
        
        # Pasar los campos a expandir al serializador
        kwargs['expand_fields'] = expand_fields
        return super().get_serializer(*args, **kwargs)
    
    def get_queryset(self):
        queryset = super().get_queryset()
        expand = self.request.query_params.get('expand', '')
        
        if expand:
            expand_fields = [field.strip() for field in expand.split(',')]
            # Precargar relaciones para optimizar
            if 'category' in expand_fields:
                queryset = queryset.select_related('category')
        
        return queryset`}
          language="python"
        />

        <h2>Ejemplos de APIs Populares</h2>

        <h3>Stripe API</h3>

        <p>
          Stripe utiliza el parámetro <code>expand</code> para incluir objetos
          relacionados:
        </p>

        <CodeBlock
          code={`# Expandir cliente y tarjeta en un cargo
GET /v1/charges/ch_1KjJXz2eZvKYlo2CvENZ4W3M?expand[]=customer&expand[]=source

# Expandir líneas de factura
GET /v1/invoices/in_1KjHz2eZvKYlo2CjkLmKjL1?expand[]=lines.data.price.product`}
          language="http"
        />

        <h3>Shopify API</h3>

        <p>
          Shopify utiliza campos específicos en algunos endpoints:
        </p>

        <CodeBlock
          code={`# Incluir metafields en productos
GET /admin/api/2023-04/products.json?fields=id,title,metafields

# Incluir imágenes en variantes
GET /admin/api/2023-04/products/632910392/variants.json?fields=id,title,price,image`}
          language="http"
        />

        <blockquote>
          "La expansión de campos ejemplifica el equilibrio entre simplicidad y
          flexibilidad en el diseño de APIs. Permite a los clientes adaptar las
          respuestas a sus necesidades específicas, reduciendo la sobrecarga de red
          y mejorando la experiencia del desarrollador, mientras que al servidor le
          da control sobre qué y cuánto expandir para mantener un rendimiento
          óptimo."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default FieldExpansion;
