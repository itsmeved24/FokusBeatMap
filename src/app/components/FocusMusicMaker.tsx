import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { PlusButton } from './layout/PlusButton';
import { AboutModal } from './layout/AboutModal';
import { TimerDisplay } from './display/TimerDisplay';
import { TimerControls } from './controls/TimerControls';
import { MusicDevicePanel } from './layout/MusicDevicePanel';
import { BottomControls } from './controls/BottomControls';
import { MUSIC_PRESETS } from '@/constants/musicPresets';

export function FocusMusicMaker() {
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [bpm, setBpm] = useState(80);
  const [gridData, setGridData] = useState<boolean[][]>([]);

  useEffect(() => {
    if (!isTimerRunning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  const hasBeats = () => {
    if (!gridData.length || gridData.length !== 10) return false;
    return gridData.some(row => row.some(cell => cell));
  };

  const handleStartTimer = () => {
    if (!hasBeats()) {
      toast.error('Add the beats first!', {
        description: 'Draw some patterns on the grid before starting the timer.',
        duration: 3000,
      });
      return;
    }

    setTimeRemaining(timerMinutes * 60);
    setIsTimerRunning(true);
    setTimerStarted(true);
    setIsPlaying(true);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
    setIsPlaying(false);
  };

  const handleResumeTimer = () => {
    setIsTimerRunning(true);
    setIsPlaying(true);
  };

  const handleRestartTimer = () => {
    setIsTimerRunning(false);
    setTimerStarted(false);
    setTimeRemaining(0);
    setIsPlaying(false);
  };

  const handleIncrement = () => {
    setTimerMinutes((prev) => Math.min(prev + 5, 120));
  };

  const handleDecrement = () => {
    setTimerMinutes((prev) => Math.max(prev - 5, 5));
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleRandomize = () => {
    const randomPreset = MUSIC_PRESETS[Math.floor(Math.random() * MUSIC_PRESETS.length)];
    const newGrid = Array(10).fill(null).map(() => Array(16).fill(false));

    const setRow = (rowIndex: number, steps: number[]) => {
      steps.forEach(step => {
        if (step >= 0 && step < 16) newGrid[rowIndex][step] = true;
      });
    };

    randomPreset.setup(setRow);
    setBpm(randomPreset.bpm);
    setGridData(newGrid);
    setIsPlaying(true);
    console.log(`Loaded Preset: ${randomPreset.name}`);
  };

  const handleReset = () => {
    const emptyGrid = Array(10)
      .fill(null)
      .map(() => Array(16).fill(false));
    setGridData(emptyGrid);
    setIsPlaying(false);
    setBpm(80);
    setIsTimerRunning(false);
    setTimerStarted(false);
    setTimeRemaining(0);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl h-full flex flex-col justify-center py-4 relative">
        <PlusButton onClick={() => setAboutModalOpen(!aboutModalOpen)} />
        <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />

        <TimerDisplay timeRemaining={timeRemaining} isRunning={isTimerRunning} />

        <TimerControls
          minutes={timerMinutes}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onStart={handleStartTimer}
          onPause={handlePauseTimer}
          onResume={handleResumeTimer}
          onRestart={handleRestartTimer}
          isRunning={isTimerRunning}
          timerStarted={timerStarted}
        />

        <div className="h-4 sm:h-6" />

        <MusicDevicePanel
          gridData={gridData}
          setGridData={setGridData}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          volume={volume}
          isMuted={isMuted}
          bpm={bpm}
          onBpmChange={setBpm}
          onPlayPause={handlePlayPause}
          isTimerRunning={isTimerRunning}
          handleMute={handleMute}
          handleReset={handleReset}
          handleRandomize={handleRandomize}
        />

        <BottomControls
          isMuted={isMuted}
          handleMute={handleMute}
          handleReset={handleReset}
          handleRandomize={handleRandomize}
        />
      </div>
    </div>
  );
}