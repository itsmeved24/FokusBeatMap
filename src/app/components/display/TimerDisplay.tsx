interface TimerDisplayProps {
    timeRemaining: number;
    isRunning: boolean;
}

function formatTime(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function TimerDisplay({ timeRemaining, isRunning }: TimerDisplayProps) {
    return (
        <div className="text-center mb-3 sm:mb-4 md:mb-6">
            <div
                className={`text-[50px] sm:text-[70px] md:text-[90px] lg:text-[110px] font-light leading-none tracking-tight transition-colors duration-300 ${isRunning ? 'text-black' : 'text-gray-200'
                    }`}
                style={{ fontFamily: 'Geist, sans-serif' }}
            >
                {timeRemaining > 0 ? formatTime(timeRemaining) : '00:00:00'}
            </div>
        </div>
    );
}
