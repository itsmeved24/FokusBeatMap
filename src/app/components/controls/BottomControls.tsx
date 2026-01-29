import { Volume2, VolumeX, RotateCcw, Waves } from 'lucide-react';

interface BottomControlsProps {
    isMuted: boolean;
    handleMute: () => void;
    handleReset: () => void;
    handleRandomize: () => void;
}

export function BottomControls({ isMuted, handleMute, handleReset, handleRandomize }: BottomControlsProps) {
    return (
        <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 mt-3 sm:mt-4 md:mt-5">
            <button
                onClick={handleMute}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
                {isMuted ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                )}
            </button>
            <button
                onClick={handleReset}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </button>
            <button
                onClick={handleRandomize}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
                <Waves className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </button>
        </div>
    );
}
