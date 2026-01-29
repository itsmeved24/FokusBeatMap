interface TimerProps {
  timeRemaining: number;
  isRunning: boolean;
}

export function Timer({ timeRemaining, isRunning }: TimerProps) {
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="text-[120px] font-light text-gray-200 leading-none tracking-tight">
      {isRunning ? formatTime(timeRemaining) : '00:00:00'}
    </div>
  );
}
