document.addEventListener('DOMContentLoaded', function() {
    const stage = document.getElementById('stage');
    if (!stage) return;

    stage.style.opacity = '0.8';

    const cols = Math.floor(window.innerWidth / 6);
    const rows = Math.floor(window.innerHeight / 12);

    const glyphs = " .:-=+*#%@";

    const fluxalColors = [
        "#FFEF9E",
        "#FFE761",
        "#FFC300",
        "#FF9100",
        "#FF6A00"
    ];

    let animationFrameId = null;

    function frame(time) {
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

        stage.innerHTML = `<pre>${out.join("\n")}</pre>`;
        animationFrameId = requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
});
