
import { PageLayout } from "@/components/PageLayout";
import { PageContent } from "@/components/PageContent";

interface TemplatePageProps {
  title: string;
  description?: string;
  path: string[];
}

const TemplatePage = ({ title, description, path }: TemplatePageProps) => {
  return (
    <PageLayout>
      <PageContent 
        title={title} 
        description={description || "Información detallada sobre este tema."}
        path={path}
      >
        <p>
          Esta sección está en desarrollo y pronto contendrá información detallada sobre {title}.
        </p>

        <h2>Contenido Próximamente</h2>
        
        <p>
          Estamos trabajando en completar esta sección con:
        </p>
        
        <ul>
          <li>Explicaciones detalladas sobre los conceptos clave</li>
          <li>Ejemplos prácticos de implementación</li>
          <li>Mejores prácticas y recomendaciones</li>
          <li>Casos de uso comunes y soluciones</li>
          <li>Referencias a recursos adicionales</li>
        </ul>
        
        <p className="italic mt-6">
          Por favor, revisa las otras secciones ya completadas mientras tanto.
        </p>
      </PageContent>
    </PageLayout>
  );
};

export default TemplatePage;
