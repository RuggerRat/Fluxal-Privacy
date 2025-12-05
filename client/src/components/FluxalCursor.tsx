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
            colors: ["#9945FF", "#14F195", "#FFFFFF"],
            thickness: 3.0,
            length: 2.2,
            velocity: 2.5,
            fade: 0.06
          },
          lights: {
            intensity: 420,
            colors: ["#9945FF", "#14F195", "#FFFFFF"],
            radius: 1.8
          },
          bloom: {
            strength: 2.5,
            threshold: 0.2,
            radius: 1.1
          }
        });

        // Click handler to cycle colors
        let colorIndex = 0;
        const palettes = [
          ["#00F0FF", "#0000FF", "#FFFFFF"], // Cyber Blue
          ["#FF0055", "#FF0000", "#FFFFFF"], // Neon Red
          ["#FFE500", "#FF8C00", "#FFFFFF"], // Fluxal Yellow (Original)
          ["#9945FF", "#14F195", "#FFFFFF"], // Solana Purple/Green
        ];

        const handleClick = () => {
          if (app) {
            colorIndex = (colorIndex + 1) % palettes.length;
            const colors = palettes[colorIndex];
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen"
      style={{ background: 'transparent' }}
    />
  );
}
