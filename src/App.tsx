
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Principles from "./pages/Principles";
import Structure from "./pages/Structure";
import Naming from "./pages/Naming";
import RouteStructure from "./pages/RouteStructure";
import ResourceHierarchy from "./pages/ResourceHierarchy";
import MethodsGet from "./pages/methods/Get";
import MethodsPost from "./pages/methods/Post";
import MethodsPut from "./pages/methods/Put";
import MethodsPatch from "./pages/methods/Patch";
import MethodsDelete from "./pages/methods/Delete";
import Versioning from "./pages/Versioning";
import Pagination from "./pages/Pagination";
import Filtering from "./pages/Filtering";
import Sorting from "./pages/Sorting";
import NestedResources from "./pages/NestedResources";
import FieldExpansion from "./pages/FieldExpansion";
import StatusCodes from "./pages/StatusCodes";
import ResponseFormats from "./pages/ResponseFormats";
import ErrorHandling from "./pages/ErrorHandling";
import Authentication from "./pages/Authentication";
import Authorization from "./pages/Authorization";
import SecurityPractices from "./pages/SecurityPractices";
import OpenAPI from "./pages/OpenAPI";
import Examples from "./pages/Examples";
import RestLimitations from "./pages/RestLimitations";
import Alternatives from "./pages/Alternatives";
import ScalablePatterns from "./pages/ScalablePatterns";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Introducción */}
          <Route path="/principles" element={<Principles />} />
          <Route path="/structure" element={<Structure />} />
          
          {/* Rutas y Recursos */}
          <Route path="/naming" element={<Naming />} />
          <Route path="/route-structure" element={<RouteStructure />} />
          <Route path="/resource-hierarchy" element={<ResourceHierarchy />} />
          
          {/* Métodos HTTP */}
          <Route path="/methods/get" element={<MethodsGet />} />
          <Route path="/methods/post" element={<MethodsPost />} />
          <Route path="/methods/put" element={<MethodsPut />} />
          <Route path="/methods/patch" element={<MethodsPatch />} />
          <Route path="/methods/delete" element={<MethodsDelete />} />
          
          {/* Funcionalidades */}
          <Route path="/versioning" element={<Versioning />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/filtering" element={<Filtering />} />
          <Route path="/sorting" element={<Sorting />} />
          
          {/* Relaciones */}
          <Route path="/nested-resources" element={<NestedResources />} />
          <Route path="/field-expansion" element={<FieldExpansion />} />
          
          {/* Respuestas */}
          <Route path="/status-codes" element={<StatusCodes />} />
          <Route path="/response-formats" element={<ResponseFormats />} />
          <Route path="/error-handling" element={<ErrorHandling />} />
          
          {/* Seguridad */}
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/security-practices" element={<SecurityPractices />} />
          
          {/* Documentación */}
          <Route path="/openapi" element={<OpenAPI />} />
          <Route path="/examples" element={<Examples />} />
          
          {/* API Avanzada */}
          <Route path="/rest-limitations" element={<RestLimitations />} />
          <Route path="/alternatives" element={<Alternatives />} />
          <Route path="/scalable-patterns" element={<ScalablePatterns />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
