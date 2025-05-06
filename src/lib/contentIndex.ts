import { type SearchableContent } from "@/components/SearchDialog";

/**
 * Content indexer for API Route Compass
 * 
 * This utility extracts and indexes content from pages for search functionality.
 * It provides methods to generate structured search metadata that can be used by the search dialog.
 */

// Helper to generate keywords from content
function extractKeywords(content: string): string[] {
  // Patrones para términos técnicos comunes en español e inglés
  const commonPatterns = [
    // Términos REST y HTTP generales
    /REST/gi, /HTTP[0-9]*/gi, /API/gi, /JSON/gi, /URL/gi, /URI/gi, 
    /endpoint/gi, /microservicio/gi, /stateless/gi, /servidor/gi, /cliente/gi,
    /cache/gi, /header/gi, /token/gi, /autenticaci[óo]n/gi, /autorizaci[óo]n/gi,
    
    // Métodos HTTP
    /GET/g, /POST/g, /PUT/g, /PATCH/g, /DELETE/g, /OPTIONS/g, /HEAD/g,
    
    // Códigos de estado HTTP
    /[1-5][0-9]{2}/g, /OK/g, /Created/g, /Accepted/g, /No\s*Content/gi,
    /Bad\s*Request/gi, /Unauthorized/gi, /Forbidden/gi, /Not\s*Found/gi,
    
    // Tecnologías relacionadas
    /GraphQL/gi, /gRPC/gi, /WebSockets?/gi, /CRUD/gi, /OAuth/gi, /JWT/gi,
    /CORS/gi, /MQTT/gi, /Kafka/gi, /RabbitMQ/gi, /API\s*Gateway/gi,
    
    // Conceptos técnicos
    /idempotente/gi, /recurso/gi, /colecci[óo]n/gi, /representaci[óo]n/gi,
    /paginaci[óo]n/gi, /filtrado/gi, /ordenamiento/gi, /sorting/gi,
    /versi[óo]n/gi, /seguridad/gi, /documentaci[óo]n/gi, /schema/gi,
    /serializaci[óo]n/gi, /deserializaci[óo]n/gi, /marshalling/gi,
    
    // Patrones de diseño
    /arquitectura/gi, /patr[óo]n/gi, /dise[ñn]o/gi, /principio/gi,
    /HATEOAS/gi, /interfaz\s*uniforme/gi, /uniform\s*interface/gi,
    
    // Capacidades y características
    /escalable/gi, /mantenible/gi, /rendimiento/gi, /performance/gi,
    /redundancia/gi, /tolerancia\s*a\s*fallos/gi, /fault\s*tolerance/gi,
    /rate\s*limiting/gi, /throttling/gi, /validaci[óo]n/gi
  ];

  // Extract all matches from the content
  const extractedTerms = new Set<string>();
  
  // Extraer términos de patrones comunes
  commonPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => extractedTerms.add(match.toLowerCase()));
    }
  });
  
  // Extraer términos técnicos específicos
  const technicalTerms = extractTechnicalTerms(content);
  technicalTerms.forEach(term => extractedTerms.add(term.toLowerCase()));
  
  return Array.from(extractedTerms);
}

// Extrae términos técnicos basados en patrones comunes en documentación de APIs
function extractTechnicalTerms(content: string): string[] {
  const terms = new Set<string>();
  
  // Buscar términos entre comillas o en código
  const codePatterns = [
    /<code>([^<]+)<\/code>/g,  // Contenido entre tags de código
    /`([^`]+)`/g,              // Contenido entre backticks
    /"([^"]+)"/g,              // Contenido entre comillas dobles
    /'([^']+)'/g,              // Contenido entre comillas simples
  ];
  
  codePatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      // Solo agregar si parece un término técnico (evitar palabras comunes)
      const term = match[1].trim();
      if (term.length > 2 && !/^(el|la|los|las|un|una|unos|unas|de|del|a|ante|con|en|para|por|y|o|u|e)$/i.test(term)) {
        terms.add(term);
      }
    }
  });
  
  // Buscar patrones de URI/URL
  const uriPattern = /\/[\w{}]+/g;
  let uriMatch;
  while ((uriMatch = uriPattern.exec(content)) !== null) {
    terms.add(uriMatch[0]);
  }
  
  // Buscar patrones específicos de la API (parámetros, headers, etc.)
  const apiPatterns = [
    /[a-zA-Z_][a-zA-Z0-9_]*=[a-zA-Z0-9_]+/g,  // parámetros de consulta
    /[A-Z][a-zA-Z-]*:\s*[^\s,;]+/g,          // headers HTTP
    /\{[a-zA-Z_][a-zA-Z0-9_]*\}/g,            // parámetros de ruta
  ];
  
  apiPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      terms.add(match[0]);
    }
  });
  
  return Array.from(terms);
}

// Helper to extract summary from content
function generateSummary(content: string, maxLength: number = 300): string {
  // Prepare content: remove HTML tags and normalize whitespace
  const cleanContent = content
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ')    // Normalize whitespace
    .trim();
  
  // Identify potential sections for a good summary
  const sentences = cleanContent.split(/[.!?]+\s+/);
  
  // Try to extract a good introduction paragraph
  let summary = '';
  
  // First try to find paragraphs that contain key introductory phrases
  const introPatterns = [
    /esta sección/i, /en este artículo/i, /esta guía/i, 
    /introducción/i, /overview/i, /resumen/i,
    /aprenderás/i, /veremos/i, /exploraremos/i
  ];
  
  // Look for sentences that match intro patterns
  for (const pattern of introPatterns) {
    for (let i = 0; i < Math.min(10, sentences.length); i++) {
      if (pattern.test(sentences[i]) && sentences[i].length > 30) {
        // Try to include this sentence and the next one if possible
        summary = sentences[i];
        if (i + 1 < sentences.length) {
          summary += '. ' + sentences[i + 1];
        }
        break;
      }
    }
    
    if (summary) break;
  }
  
  // If no intro-like paragraph was found, use the first few sentences
  if (!summary) {
    let length = 0;
    for (let i = 0; i < sentences.length && length < maxLength; i++) {
      // Skip very short sentences at the beginning
      if (i === 0 && sentences[i].length < 20) continue;
      
      if (summary) summary += '. ';
      summary += sentences[i];
      length += sentences[i].length;
    }
  }
  
  // Trim to max length if needed
  if (summary.length > maxLength) {
    summary = summary.substring(0, maxLength) + '...';
  }
  
  return summary;
}

// Helper to extract tags from content
function extractTags(content: string): string[] {
  // Extract headings (h1, h2, h3)
  const headingRegex = /<h[123][^>]*>(.*?)<\/h[123]>/gi;
  const headings = new Set<string>();
  
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    // Remove potential HTML tags inside heading
    const cleanHeading = match[1]
      .replace(/<[^>]+>/g, '')  // Remove HTML tags
      .replace(/\s+/g, ' ')     // Normalize whitespace
      .trim()
      .toLowerCase();
    
    if (cleanHeading.length > 0 && cleanHeading.length < 30) {
      headings.add(cleanHeading);
    }
  }
  
  // Extract emphasized terms (bold, italic)
  const emphasisRegex = /<(strong|b|em|i)[^>]*>(.*?)<\/\1>/gi;
  const emphasisTerms = new Set<string>();
  
  while ((match = emphasisRegex.exec(content)) !== null) {
    const term = match[2]
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    
    // Only add terms that look like specific technical terms (avoid common phrases)
    if (term.length > 0 && term.length < 30 && !/^(note|importante|ejemplo|atención)/.test(term)) {
      emphasisTerms.add(term);
    }
  }
  
  // Combine both sets and convert to array
  return [
    ...Array.from(headings),
    ...Array.from(emphasisTerms)
  ];
}

// Main function to generate searchable content from page
export function indexPageContent(
  id: string,
  title: string,
  shortDescription: string,
  content: string,
  path: string,
  category: string
): SearchableContent {
  // Extract relevant content elements
  const summary = generateSummary(content);
  const tags = extractTags(content);
  const keywords = extractKeywords(content);
  
  return {
    id,
    title,
    content: shortDescription,
    summary,
    path,
    category,
    tags,
    keywords
  };
}

// Generate searchable content for all pages
export function generateSearchIndex(): SearchableContent[] {
  // This would typically fetch page content and metadata
  // For now, returning a placeholder - in a real implementation,
  // this would scan page files or fetch from an API
  return [
    // Examples shown in SearchDialog.tsx
  ];
} 