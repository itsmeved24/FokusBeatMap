import { DrawingGrid } from '../DrawingGrid';
import { SpeakerHoles } from '../display/SpeakerHoles';
import { BPMSlider } from '../controls/BPMSlider';
import { PlayPauseButton } from '../controls/PlayPauseButton';

interface MusicDevicePanelProps {
    gridData: boolean[][];
    setGridData: (data: boolean[][]) => void;
    isPlaying: boolean;
    setIsPlaying: (playing: boolean) => void;
    volume: number;
    isMuted: boolean;
    bpm: number;
    onBpmChange: (bpm: number) => void;
    onPlayPause: () => void;
    isTimerRunning: boolean;
    handleMute: () => void;
    handleReset: () => void;
    handleRandomize: () => void;
}

export function MusicDevicePanel({
    gridData,
    setGridData,
    isPlaying,
    setIsPlaying,
    volume,
    isMuted,
    bpm,
    onBpmChange,
    onPlayPause,
    isTimerRunning,
    handleMute,
    handleReset,
    handleRandomize,
}: MusicDevicePanelProps) {
    return (
        <div
            className="device relative mx-auto shadow-2xl"
            style={{
                width: '100%',
                maxWidth: '380px',
                height: 'auto',
                aspectRatio: '380/450',
                background: '#efefef',
                border: '1px solid #f1f1f1',
                borderRadius: 'clamp(16px, 5vw, 28px)',
                padding: 'clamp(16px, 5vw, 24px)',
                flexShrink: 0
            }}
        >
            {/* Device Top - Grid Area */}
            <div className="device-top mb-4">
                <DrawingGrid
                    gridData={gridData}
                    setGridData={setGridData}
                    isPlaying={isPlaying}
                    volume={volume}
                    isMuted={isMuted}
                    bpm={bpm}
                />
            </div>

            {/* Device Bottom - Controls Area */}
            <div
                className="device-bottom"
                style={{
                    position: 'absolute',
                    top: '259px',
                    left: 0,
                    right: 0,
                    height: '189px',
                    background: 'linear-gradient(357deg, #c6c6c6 -13.02%, #e0e0e0 12.25%, #f6f6f6 100%)',
                    border: '1px solid #f1f1f1',
                    borderRadius: '4px 4px 24px 24px',
                    padding: '24px 24px 32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '-3px -2px 3px 0 rgba(255, 255, 255, 0.25) inset'
                }}
            >
                {/* Speaker Holes */}
                <SpeakerHoles />

                {/* Controls Row */}
                <div className="flex items-center justify-between w-full px-2">
                    {/* BPM Slider - LEFT (mirrors play button distance) */}
                    <BPMSlider bpm={bpm} onChange={onBpmChange} />

                    {/* Play/Pause Button - RIGHT (stays in place) */}
                    <PlayPauseButton
                        isPlaying={isPlaying}
                        onClick={onPlayPause}
                        disabled={isTimerRunning}
                    />
                </div>
            </div>
        </div>
    );
}
