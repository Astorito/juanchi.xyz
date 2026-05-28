'use client';

import { Suspense, lazy, useState } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  const [ready, setReady] = useState(false);

  return (
    <Suspense fallback={<div className="w-full h-full bg-black" />}>
      <div className={`w-full h-full transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
        <Spline
          scene={scene}
          className={className}
          onLoad={() => setReady(true)}
        />
      </div>
    </Suspense>
  );
}
