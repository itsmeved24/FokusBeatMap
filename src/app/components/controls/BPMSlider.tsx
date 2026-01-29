interface BPMSliderProps {
    bpm: number;
    onChange: (bpm: number) => void;
}

export function BPMSlider({ bpm, onChange }: BPMSliderProps) {
    return (
        <div className="flex items-center gap-2">
            <div className="relative w-1 h-12 bg-gray-300 rounded-full">
                <input
                    type="range"
                    min="40"
                    max="120"
                    value={bpm}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    orient="vertical"
                    style={{
                        writingMode: 'bt-lr' as any,
                        WebkitAppearance: 'slider-vertical',
                    } as React.CSSProperties}
                />
                {/* Track fill */}
                <div
                    className="absolute bottom-0 left-0 right-0 bg-gray-600 rounded-full transition-all duration-200 ease-out pointer-events-none"
                    style={{ height: `${((bpm - 40) / 80) * 100}%` }}
                />
                {/* Knob */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-800 rounded-full shadow-md transition-all duration-200 ease-out pointer-events-none"
                    style={{ bottom: `calc(${((bpm - 40) / 80) * 100}% - 6px)` }}
                />
            </div>
        </div>
    );
}
