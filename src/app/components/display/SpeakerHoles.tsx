export function SpeakerHoles() {
    const radius = 1.9;
    const spacingX = 9.5;
    const spacingY = 8.6;
    const centerX = 45;
    const centerY = 20;

    // The user wants a specific diamond pattern:
    // Row 1: 4 dots
    // Row 2: 7 dots
    // Row 3: 9 dots
    // Row 4: 7 dots
    // Row 5: 4 dots
    const rowConfig = [4, 7, 9, 7, 4];

    const dots = rowConfig.flatMap((count, rIndex) => {
        // Calculate Y position centering the 5 rows block
        // Total height = 4 * spacingY. center is at spacingY * 2
        const rowIndexFromCenter = rIndex - 2;
        const y = centerY + rowIndexFromCenter * spacingY;

        // Calculate X position
        const rowWidth = (count - 1) * spacingX;
        const startX = centerX - rowWidth / 2;

        return Array.from({ length: count }).map((_, cIndex) => ({
            cx: startX + cIndex * spacingX,
            cy: y
        }));
    });

    return (
        <div className="flex justify-center mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="90"
                height="40"
                viewBox="0 0 90 40"
                fill="none"
                className="opacity-80"
            >
                {dots.map((dot, i) => (
                    <circle
                        key={i}
                        cx={dot.cx}
                        cy={dot.cy}
                        r={radius}
                        fill="#414141"
                    />
                ))}
            </svg>
        </div>
    );
}
