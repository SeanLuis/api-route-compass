import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      mermaid.initialize({ 
        startOnLoad: true,
        theme: 'neutral',
        securityLevel: 'loose',
        fontFamily: 'inherit',
      });
      
      try {
        mermaid.contentLoaded();
      } catch (error) {
        console.error("Error rendering mermaid diagram:", error);
      }
    }
  }, [chart]);

  return (
    <div className={className} ref={containerRef}>
      <div className="mermaid">{chart}</div>
    </div>
  );
};

export default MermaidDiagram; 