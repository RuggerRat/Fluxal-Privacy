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
            colors: ["#FFE500", "#FFD700", "#FFA500"], // Electric Yellow, Gold, Orange
            thickness: 6.0, // Doubled for more pop
            length: 3.0, // Longer trails
            velocity: 3.0, // Faster
            fade: 0.04 // Slower fade for more presence
          },
          lights: {
            intensity: 800, // Much brighter
            colors: ["#FFE500", "#FFD700", "#FFA500"],
            radius: 3.0
          },
          bloom: {
            strength: 4.0, // Intense glow
            threshold: 0.1, // Bloom on darker colors too
            radius: 1.5
          }
        });

        // Force set colors immediately to ensure no defaults leak through
        const colors = ["#FFE500", "#FFD700", "#FFA500"];
        app.tubes.setColors(colors);
        app.tubes.setLightsColors(colors);

        // Ensure colors stay Fluxal Yellow/Orange at all times
        const handleClick = () => {
          if (app) {
            app.tubes.setColors(colors);
            app.tubes.setLightsColors(colors);
          }
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
      if (typeof cleanupPromise === 'function') {
        // @ts-ignore
        cleanupPromise();
      }
      // Clean up global THREE if we want to be polite, but might break other things if they rely on it.
      // delete window.THREE; 
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-[5] mix-blend-screen"
      style={{ background: 'transparent' }}
    />
  );
}
