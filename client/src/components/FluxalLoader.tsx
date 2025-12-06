import { useEffect, useRef, useState } from 'react';

export default function FluxalLoader({ duration = 3000 }: { duration?: number }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrame: number;

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress}%`;
      }

      if (progress < 100) {
        animationFrame = requestAnimationFrame(animateProgress);
      }
    };

    animationFrame = requestAnimationFrame(animateProgress);

    return () => cancelAnimationFrame(animationFrame);
  }, [duration]);

  useEffect(() => {
    if (!stageRef.current) return;

    let animationFrameId: number;
    const stage = stageRef.current;
    stage.style.opacity = '0.8';

    // Characters used for the ASCII spiral
    const glyphs = " .:-=+*#%@";
    
    // Fluxal Color Palette
    const fluxalColors = [
        "#FFEF9E",
        "#FFE761",
        "#FFC300",
        "#FF9100",
        "#FF6A00"
    ];

    function frame(time: number) {
        // Recalculate dimensions on every frame to handle resize smoothly
        // Using a fixed font size of 10px roughly translates to these divisions
        const cols = Math.floor(window.innerWidth / 6);
        const rows = Math.floor(window.innerHeight / 12);
        
        const e = time * 0.0009 + 0.8;
        const out = [];
        const k = glyphs.length / 2;

        for (let y = 0; y < rows; y++) {
            let rowString = "";
            const Y = y / rows * 2 - 1;

            for (let x = 0; x < cols; x++) {
                const X = x / cols * 2 - 1;

                const l = Math.hypot(X, Y);
                let a = Math.atan2(Y, X);

                let char_idx = 0;
                let ch = glyphs[0];

                if (l < 1.0) {
                    a += e;
                    a += l * Math.PI;

                    char_idx = Math.floor(
                        (Math.cos(a * 3 + l * 2 + e * 2) +
                         Math.sin(a * 2 - l * 3 + e * 3)) / 2 * k + k
                    );

                    char_idx = Math.max(0, Math.min(glyphs.length - 1, char_idx));
                    ch = glyphs[char_idx];
                }

                let color;
                if (char_idx > 7) color = fluxalColors[4];
                else if (char_idx > 5) color = fluxalColors[3];
                else if (char_idx > 3) color = fluxalColors[2];
                else if (char_idx > 1) color = fluxalColors[1];
                else color = fluxalColors[0];

                rowString += `<span style="color:${color}">${ch}</span>`;
            }

            out.push(rowString);
        }

        if (stage) {
            stage.innerHTML = `<pre>${out.join("\n")}</pre>`;
        }
        animationFrameId = requestAnimationFrame(frame);
    }

    animationFrameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      <div 
        ref={stageRef} 
        className="whitespace-pre font-mono text-[10px] leading-none select-none pointer-events-none"
        style={{ fontFamily: "'Source Code Pro', monospace" }}
      />
    </div>
  );
}
