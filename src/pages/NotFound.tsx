
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="space-y-6 max-w-lg">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <h2 className="text-3xl font-semibold">Página no encontrada</h2>
        <p className="text-muted-foreground">
          La página que estás buscando no existe o ha sido movida a otra ubicación.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button onClick={() => navigate(-1)}>
            Regresar
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            Ir al inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
