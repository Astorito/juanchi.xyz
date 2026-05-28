'use client';

import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

function hideSplineWatermark(splineApp: any) {
  try {
    const canvas = splineApp?.canvas as HTMLCanvasElement | undefined;
    const container = canvas?.parentElement;
    if (!container) return;
    // Spline appends a <a> watermark link after the canvas
    container.querySelectorAll('a').forEach((el: HTMLElement) => {
      el.style.display = 'none';
    });
    // Also observe for late-injected elements
    const observer = new MutationObserver(() => {
      container.querySelectorAll('a').forEach((el: HTMLElement) => {
        el.style.display = 'none';
      });
    });
    observer.observe(container, { childList: true, subtree: true });
  } catch (_) {}
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  return (
    <Suspense fallback={<div className={`w-full h-full bg-black ${className}`} />}>
      <Spline
        scene={scene}
        className={className}
        onLoad={hideSplineWatermark}
      />
    </Suspense>
  );
}
