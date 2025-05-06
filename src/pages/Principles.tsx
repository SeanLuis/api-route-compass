
import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";
import { CodeBlock } from "@/components/CodeBlock";

const Principles = () => {
  return (
    <PageLayout>
      <PageContent 
        title="Principios Fundamentales REST" 
        description="Los principios básicos que definen una arquitectura REST."
        path={["Introducción", "Principios REST"]}
      >
        <p>
          REST (Representational State Transfer) es un estilo de arquitectura para diseñar aplicaciones en red.
          Fue definido por Roy Fielding en su tesis doctoral en el año 2000, y establece un conjunto de restricciones
          y propiedades basadas en HTTP para crear servicios web que sean escalables, simples y desacoplados.
        </p>
        
        <h2>Principios Clave</h2>
        
        <h3>1. Arquitectura Cliente-Servidor</h3>
        <p>
          Separación clara de responsabilidades entre cliente (interfaz de usuario, experiencia de usuario) y servidor
          (almacenamiento de datos, reglas de negocio). Esta separación permite que ambos componentes evolucionen
          de manera independiente.
        </p>
        
        <h3>2. Sin Estado (Stateless)</h3>
        <p>
          Cada solicitud del cliente al servidor debe contener toda la información necesaria para entender y completar
          la solicitud. El servidor no debe almacenar contexto del cliente entre solicitudes, lo que mejora la escalabilidad
          y simplifica la implementación del servidor.
        </p>
        
        <CodeBlock 
          code={`// Solicitud sin estado: Contiene todo lo necesario
GET /products/123 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5...
Accept: application/json`}
          language="http" 
          className="my-6"
        />
        
        <h3>3. Cacheable</h3>
        <p>
          Las respuestas deben definir implícita o explícitamente si son cacheables o no, y por cuánto tiempo.
          Un buen control de caché reduce parcial o completamente la necesidad de algunas interacciones cliente-servidor,
          mejorando la escalabilidad y rendimiento.
        </p>
        
        <h3>4. Sistema en Capas</h3>
        <p>
          Un cliente no puede distinguir si está conectado directamente al servidor final o a un intermediario.
          Esta restricción permite la introducción de proxies, balanceadores de carga y otros intermediarios para
          mejorar la escalabilidad y seguridad.
        </p>
        
        <h3>5. Interfaz Uniforme</h3>
        <p>
          La interfaz entre componentes debe ser uniforme para simplificar la arquitectura y mejorar la visibilidad
          de las interacciones. REST logra esto a través de cuatro restricciones:
        </p>
        
        <ul>
          <li><strong>Identificación de recursos:</strong> Cada recurso es identificado por un URI único</li>
          <li><strong>Manipulación de recursos a través de representaciones:</strong> Los recursos son conceptualmente separados de sus representaciones</li>
          <li><strong>Mensajes auto-descriptivos:</strong> Cada mensaje incluye suficiente información para describir cómo procesarlo</li>
          <li><strong>HATEOAS (Hypermedia As The Engine Of Application State):</strong> Los clientes interactúan con la aplicación mediante hipermedia proporcionada dinámicamente por el servidor</li>
        </ul>
        
        <h3>6. Código Bajo Demanda (Opcional)</h3>
        <p>
          Los servidores pueden extender temporalmente la funcionalidad del cliente transfiriendo código ejecutable.
          Este principio es opcional en REST y no se utiliza comúnmente en la mayoría de las APIs REST.
        </p>
        
        <h2>Beneficios de Seguir los Principios REST</h2>
        <ul>
          <li>Escalabilidad mejorada</li>
          <li>Independencia entre cliente y servidor</li>
          <li>Compatibilidad con múltiples lenguajes y plataformas</li>
          <li>Facilita el desarrollo y mantenimiento</li>
          <li>Arquitectura familiar para desarrolladores</li>
        </ul>
        
        <blockquote>
          "Los principios REST no son reglas estrictas sino guías para crear APIs eficientes,
          escalables y fáciles de mantener. La implementación de estos principios puede variar
          según las necesidades específicas de cada aplicación."
        </blockquote>
      </PageContent>
    </PageLayout>
  );
};

export default Principles;
