interface PlayPauseButtonProps {
    isPlaying: boolean;
    onClick: () => void;
    disabled?: boolean;
}

export function PlayPauseButton({ isPlaying, onClick, disabled }: PlayPauseButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg flex items-center justify-center transition-colors"
            style={{ backgroundColor: '#DEDEDE' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D0D0D0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#DEDEDE'}
            disabled={disabled}
        >
            {isPlaying ? (
                <div className="flex gap-1">
                    <div className="w-1 h-3 sm:h-4 bg-gray-800" />
                    <div className="w-1 h-3 sm:h-4 bg-gray-800" />
                </div>
            ) : (
                <div className="w-0 h-0 border-t-[6px] sm:border-t-[8px] border-t-transparent border-l-[10px] sm:border-l-[12px] border-l-gray-800 border-b-[6px] sm:border-b-[8px] border-b-transparent ml-1" />
            )}
        </button>
    );
}
