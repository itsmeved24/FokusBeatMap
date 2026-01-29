import { useRef, useEffect, useState, useCallback } from 'react';
// import { AudioEngine } from './AudioEngine'; // Fallback: Web Audio API
import { ToneAudioEngine as AudioEngine } from './ToneAudioEngine'; // New: Tone.js Engine

interface DrawingGridProps {
  gridData: boolean[][];
  setGridData: (data: boolean[][]) => void;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  bpm: number;
}

const ROWS = 10;
const COLS = 16;

export function DrawingGrid({ gridData, setGridData, isPlaying, volume, isMuted, bpm }: DrawingGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState<'draw' | 'erase'>('draw');
  const audioEngineRef = useRef<AudioEngine | null>(null);
  const [currentColumn, setCurrentColumn] = useState(0);

  useEffect(() => {
    if (!gridData.length) {
      const initialGrid = Array(ROWS)
        .fill(null)
        .map(() => Array(COLS).fill(false));
      setGridData(initialGrid);
    }
  }, [gridData, setGridData]);

  useEffect(() => {
    if (!audioEngineRef.current) {
      audioEngineRef.current = new AudioEngine();
    }
  }, []);

  useEffect(() => {
    if (audioEngineRef.current) {
      audioEngineRef.current.setVolume(isMuted ? 0 : volume / 100);
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (!isPlaying) {
      setCurrentColumn(0);
      if (audioEngineRef.current) {
        audioEngineRef.current.stopAll();
      }
      return;
    }

    const interval = (60000 / bpm) / 4;

    const intervalId = setInterval(() => {
      setCurrentColumn((prev) => {
        const next = (prev + 1) % COLS;

        if (audioEngineRef.current && gridData.length) {
          const activeRows: number[] = [];
          for (let row = 0; row < ROWS; row++) {
            if (gridData[row]?.[next]) {
              activeRows.push(row);
            }
          }
          audioEngineRef.current.playColumn(activeRows, ROWS);
        }

        return next;
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [isPlaying, gridData, bpm]);

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#1a1a1a'; // Dark background
    ctx.fillRect(0, 0, width, height);

    // Calculate cell size for perfect squares
    const padding = 20; // Padding around the grid
    const gap = 2; // Gap between cells
    const availableWidth = width - padding * 2;
    const availableHeight = height - padding * 2;

    // Cell size should be square - use the smaller dimension as constraint
    const cellWidth = (availableWidth - (COLS - 1) * gap) / COLS;
    const cellHeight = (availableHeight - (ROWS - 1) * gap) / ROWS;
    const cellSize = Math.min(cellWidth, cellHeight);

    // Center the grid
    const gridWidth = COLS * cellSize + (COLS - 1) * gap;
    const gridHeight = ROWS * cellSize + (ROWS - 1) * gap;
    const offsetX = (width - gridWidth) / 2;
    const offsetY = (height - gridHeight) / 2;

    // Draw cells
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const x = offsetX + col * (cellSize + gap);
        const y = offsetY + row * (cellSize + gap);
        const isActive = gridData[row]?.[col] || false;
        const isPlayingColumn = currentColumn === col && isPlaying;

        // Cell background
        if (isActive) {
          ctx.fillStyle = '#ffffff'; // White for active cells
        } else {
          ctx.fillStyle = isPlayingColumn ? '#374151' : '#2d2d2d'; // Lighter when playing column, dark otherwise
        }

        // Draw rounded rectangle
        const radius = 3;
        ctx.beginPath();
        ctx.roundRect(x, y, cellSize, cellSize, radius);
        ctx.fill();
      }
    }
  }, [gridData, currentColumn, isPlaying]);

  useEffect(() => {
    drawGrid();
  }, [drawGrid]);

  const getCellFromPosition = (x: number, y: number): [number, number] | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const canvasX = (x - rect.left) * scaleX;
    const canvasY = (y - rect.top) * scaleY;

    const col = Math.floor(canvasX / (canvas.width / COLS));
    const row = Math.floor(canvasY / (canvas.height / ROWS));

    if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
      return [row, col];
    }

    return null;
  };

  const toggleCell = (row: number, col: number, force?: boolean) => {
    if (!gridData.length) return;

    const newGrid = gridData.map((r) => [...r]);
    if (force !== undefined) {
      newGrid[row][col] = force;
    } else {
      newGrid[row][col] = !newGrid[row][col];
    }
    setGridData(newGrid);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Initialize audio context on first interaction
    if (audioEngineRef.current && 'start' in audioEngineRef.current) {
      (audioEngineRef.current as any).start();
    }

    const cell = getCellFromPosition(e.clientX, e.clientY);
    if (cell) {
      const [row, col] = cell;
      const newMode = gridData[row]?.[col] ? 'erase' : 'draw';
      setDrawMode(newMode);
      toggleCell(row, col);
      setIsDrawing(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const cell = getCellFromPosition(e.clientX, e.clientY);
    if (cell) {
      const [row, col] = cell;
      toggleCell(row, col, drawMode === 'draw');
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();

    // Initialize audio context on first interaction
    if (audioEngineRef.current && 'start' in audioEngineRef.current) {
      (audioEngineRef.current as any).start();
    }

    const touch = e.touches[0];
    const cell = getCellFromPosition(touch.clientX, touch.clientY);
    if (cell) {
      const [row, col] = cell;
      const newMode = gridData[row]?.[col] ? 'erase' : 'draw';
      setDrawMode(newMode);
      toggleCell(row, col);
      setIsDrawing(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    const touch = e.touches[0];
    const cell = getCellFromPosition(touch.clientX, touch.clientY);
    if (cell) {
      const [row, col] = cell;
      toggleCell(row, col, drawMode === 'draw');
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  return (
    <div className="mb-2 sm:mb-3 md:mb-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="max-w-full max-h-[50vh] w-auto h-auto cursor-crosshair rounded-lg mx-auto"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
}
