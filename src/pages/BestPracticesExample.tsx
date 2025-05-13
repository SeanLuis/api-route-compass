import { PageLayout } from "@/components/PageLayout";
import { SecurityBestPractices } from "@/components/SecurityBestPractices";
import { SecurityItem } from "@/components/SecurityItem";

const BestPracticesExample = () => {
  // Authentication best practices
  const authBestPractices = [
    { text: "Usar tokens JWT para la mayoría de las APIs REST modernas, con tiempos de expiración cortos", isRecommended: true },
    { text: "Implementar OAuth 2.0 para APIs que necesiten integración con servicios de terceros", isRecommended: true },
    { text: "Utilizar HTTPS para todas las comunicaciones, incluidas llamadas de desarrollo y prueba", isRecommended: true },
    { text: "Establecer políticas de expiración y rotación para tokens y claves API", isRecommended: true },
    { text: "Almacenar credenciales utilizando algoritmos de hash específicos para contraseñas", isRecommended: true },
    { text: "Implementar 2FA para proteger el acceso a recursos sensibles", isRecommended: true },
    { text: "Evitar autenticación básica en entornos de producción sin protecciones adicionales", isRecommended: false },
    { text: "No almacenar tokens en localStorage (vulnerable a XSS) - preferir cookies HttpOnly", isRecommended: false }
  ];

  // Error handling best practices
  const errorHandlingPractices = [
    { text: "Usa los códigos adecuados: Elige el código más específico que describa la situación", isRecommended: true },
    { text: "Mantén la consistencia: Usa los mismos formatos para todos los errores", isRecommended: true },
    { text: "Proporciona detalles útiles: Los mensajes de error deben guiar hacia la solución", isRecommended: true },
    { text: "Incluye identificadores únicos: Facilita la correlación entre logs y errores reportados", isRecommended: true },
    { text: "Evita filtrar información sensible: No incluyas datos internos o sensibles en los mensajes de error", isRecommended: true }
  ];

  return (
    <PageLayout>
      <div className="space-y-10">
        <h1 className="text-3xl font-bold tracking-tight mt-3 mb-4 dark:text-white">Ejemplos de Buenas Prácticas</h1>
        
        <div className="space-y-8">
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Aquí se muestran ejemplos de nuestro nuevo componente de buenas prácticas 
            con un diseño más elegante.
          </p>

          <h2 className="text-xl font-semibold tracking-tight dark:text-white mb-4">
            Componentes individuales
          </h2>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-lg border dark:border-slate-700 space-y-4 mb-8">
            <h3 className="font-semibold mb-2 dark:text-white">Ejemplos de items individuales</h3>
            <SecurityItem isRecommended={true}>
              Utilizar HTTPS para todas las comunicaciones
            </SecurityItem>
            <SecurityItem isRecommended={false}>
              Almacenar contraseñas sin cifrar en la base de datos
            </SecurityItem>
          </div>

          <h2 className="text-xl font-semibold tracking-tight dark:text-white mb-4">
            Componentes de grupo
          </h2>

          <SecurityBestPractices 
            title="Prácticas recomendadas de autenticación" 
            items={authBestPractices}
            className="mb-8"
          />

          <SecurityBestPractices 
            title="Prácticas recomendadas para manejo de errores" 
            items={errorHandlingPractices}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default BestPracticesExample; 