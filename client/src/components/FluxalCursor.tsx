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
        // Expose THREE globally as some CDN scripts expect it
        // @ts-ignore
        window.THREE = THREE;

        // Dynamic import from CDN
        // @ts-ignore - ignore typescript complaining about URL import
        const module = await import(/* @vite-ignore */ "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js");
        const TubesCursor = module.default;

        if (!mounted) return;

        app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#FFE500", "#FFE500", "#FF8C00"],
            thickness: 1.0,
            length: 1.5,
            velocity: 2.5,
            fade: 0.06
          },
          lights: {
            intensity: 420,
            colors: ["#FFE500", "#FF8C00", "#FFE500", "#FF8C00"],
            radius: 0.8
          },
          bloom: {
            strength: 0.8,
            threshold: 0.2,
            radius: 0.5
          }
        });

        // Force set colors immediately and periodically to override any defaults/glitches
        // STRICT PALETTE: Yellow and Orange only. No white, no defaults.
        const tubeColors = ["#FFE500", "#FFE500", "#FF8C00"];
        const lightColors = ["#FFE500", "#FF8C00", "#FFE500", "#FF8C00"];
        
        const enforceColors = () => {
          if (app && app.tubes) {
            app.tubes.setColors(tubeColors);
            app.tubes.setLightsColors(lightColors);
          }
        };

        // Run immediately
        enforceColors();

        // Run repeatedly for a second to catch any late initialization
        const intervalId = setInterval(enforceColors, 100);
        setTimeout(() => clearInterval(intervalId), 2000);

        // Ensure colors stay Fluxal Yellow/Orange on click
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

    const setupPromise = initCursor();

    return () => {
      mounted = false;
      setupPromise.then(cleanup => {
        if (typeof cleanup === 'function') {
            cleanup();
        }
      });
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen"
      style={{ background: 'transparent' }}
    />
  );
}
