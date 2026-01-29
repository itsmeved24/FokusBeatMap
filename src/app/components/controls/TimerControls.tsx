interface TimerControlsProps {
    minutes: number;
    onIncrement: () => void;
    onDecrement: () => void;
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onRestart: () => void;
    isRunning: boolean;
    timerStarted: boolean;
}

export function TimerControls({
    minutes,
    onIncrement,
    onDecrement,
    onStart,
    onPause,
    onResume,
    onRestart,
    isRunning,
    timerStarted
}: TimerControlsProps) {
    // Default state: Show +/- and "Start timer"
    if (!timerStarted) {
        return (
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-3 mb-8 sm:mb-12">
                <button
                    onClick={onDecrement}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center transition-all shadow-sm hover:shadow-md"
                >
                    <span className="text-lg sm:text-xl text-gray-700 font-medium">−</span>
                </button>
                <span className="text-xs sm:text-sm text-gray-600 w-12 sm:w-16 text-center">
                    {minutes} mins
                </span>
                <button
                    onClick={onIncrement}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center transition-all shadow-sm hover:shadow-md"
                >
                    <span className="text-lg sm:text-xl text-gray-700 font-medium">+</span>
                </button>
                <button
                    onClick={onStart}
                    className="ml-2 sm:ml-4 px-6 sm:px-8 py-2 sm:py-2.5 bg-black text-white text-xs sm:text-sm font-medium rounded-full hover:bg-gray-900 transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                    Start timer
                </button>
            </div>
        );
    }

    // Running/Paused state: Show "Restart" and "Pause/Resume"
    return (
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-3 mb-8 sm:mb-12">
            <button
                onClick={onRestart}
                className="px-6 sm:px-8 py-2 sm:py-2.5 bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-md active:scale-95"
            >
                Restart
            </button>
            <button
                onClick={isRunning ? onPause : onResume}
                className="px-6 sm:px-8 py-2 sm:py-2.5 bg-black text-white text-xs sm:text-sm font-medium rounded-full hover:bg-gray-900 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
                {isRunning ? 'Pause' : 'Resume'}
            </button>
        </div>
    );
}
