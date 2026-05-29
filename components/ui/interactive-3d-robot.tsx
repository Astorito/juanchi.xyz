'use client';

import { Suspense, lazy, useState, useEffect, useRef } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Aggressively hide Spline watermark after load
  useEffect(() => {
    if (!ready || !containerRef.current) return;
    const container = containerRef.current;

    const hide = () => {
      container.querySelectorAll('a').forEach((el) => {
        (el as HTMLElement).style.cssText = 'display:none!important;opacity:0!important;pointer-events:none!important;';
      });
    };

    hide();
    const interval = setInterval(hide, 200);
    const timeout = setTimeout(() => clearInterval(interval), 8000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [ready]);

  return (
    <Suspense fallback={<div className="w-full h-full bg-black" />}>
      <div ref={containerRef} className={`w-full h-full transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
        <Spline
          scene={scene}
          className={className}
          onLoad={() => setReady(true)}
        />
        {/* Fallback overlay covering bottom-right where Spline renders its badge */}
        <div className="absolute bottom-0 right-0 w-48 h-12 bg-black" style={{ zIndex: 9999 }} />
      </div>
    </Suspense>
  );
}
