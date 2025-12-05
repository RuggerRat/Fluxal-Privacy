import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FluxalCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let app: any = null;
    let mounted = true;

    const initCursor = async () => {
      if (!canvasRef.current) return;

      try {
        // Note: We are NOT exposing window.THREE here because the CDN bundle likely includes its own 
        // or manages its dependencies. Explicitly setting it caused "Multiple instances" warnings.

        // Dynamic import from CDN
        // @ts-ignore
        const module = await import(/* @vite-ignore */ "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js");
        const TubesCursor = module.default || module;

        if (!mounted) return;
        if (!canvasRef.current) return;

        // Initialize with desired colors
        app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#FFE500", "#FF8C00", "#FFFFFF"],
            thickness: 5.0,
            length: 2.5,
            velocity: 3.0,
            fade: 0.06
          },
          lights: {
            intensity: 1200,
            colors: ["#FFE500", "#FF8C00", "#FFFFFF"],
            radius: 2.5
          },
          bloom: {
            strength: 8.0,
            threshold: 0.1,
            radius: 1.8
          }
        });

        // AGGRESSIVE COLOR ENFORCEMENT
        // The library sometimes defaults to random/neon colors if init is slow.
        // We force the Fluxal colors repeatedly to ensure they stick.
        const fluxalColors = ["#FFE500", "#FF8C00", "#FFFFFF"];
        
        const enforceColors = () => {
          if (app && app.tubes) {
            app.tubes.setColors(fluxalColors);
            app.tubes.setLightsColors(fluxalColors);
          }
        };

        // Enforce immediately
        enforceColors();

        // Enforce again after short delays to catch any lazy initialization
        setTimeout(enforceColors, 100);
        setTimeout(enforceColors, 500);
        setTimeout(enforceColors, 1000);

        // Re-enforce on click to be absolutely sure
        const handleClick = () => {
           enforceColors();
        };

        document.body.addEventListener('click', handleClick);

        // Trigger a resize to ensure context is ready
        window.dispatchEvent(new Event('resize'));

        return () => {
          document.body.removeEventListener('click', handleClick);
        };

      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    const cleanupPromise = initCursor();

    return () => {
      mounted = false;
      // Attempt to cleanup if possible (though the lib might not expose a clean destroy)
      if (app && typeof app.dispose === 'function') {
        app.dispose(); 
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
