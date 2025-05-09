import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for component to be mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (containerRef.current && mounted) {
      const theme = resolvedTheme === 'dark' ? 'dark' : 'neutral';
      
      mermaid.initialize({ 
        startOnLoad: true,
        theme: theme,
        securityLevel: 'loose',
        fontFamily: 'inherit',
        darkMode: resolvedTheme === 'dark',
      });
      
      try {
        mermaid.contentLoaded();
      } catch (error) {
        console.error("Error rendering mermaid diagram:", error);
      }
    }
  }, [chart, resolvedTheme, mounted]);

  return (
    <div className={className} ref={containerRef}>
      <div className="mermaid">{chart}</div>
    </div>
  );
};

export default MermaidDiagram; 