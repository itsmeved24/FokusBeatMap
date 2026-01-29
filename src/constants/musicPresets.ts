export interface MusicPreset {
  name: string;
  bpm: number;
  setup: (setRow: (row: number, steps: number[]) => void) => void;
}

export const MUSIC_PRESETS: MusicPreset[] = [
  {
    name: "Deep Flow - Alpha Waves",
    bpm: 60,
    setup: (setRow: (r: number, s: number[]) => void) => {
      // Minimal heartbeat kick
      setRow(0, [0, 8]);
      // Soft ambient bass drone
      setRow(4, [0, 4, 8, 12]); // A2
      setRow(5, [0, 8]);        // C3
      setRow(7, [4, 12]);       // E3
      // Sparse gentle droplets
      setRow(9, [2]);           // Occasional high note
    }
  },
  {
    name: "Morning Fog - Ambient",
    bpm: 72,
    setup: (setRow: (r: number, s: number[]) => void) => {
      // Very sparse rhythm
      setRow(1, [12]);          // Soft snare hint
      setRow(2, [0, 4, 8, 12]); // Consistent soft shaker
      // Lush padding
      setRow(4, [0]);
      setRow(6, [0, 8]);        // D3
      setRow(7, [0, 4, 8, 12]); // E3 swell
      // Floating melody
      setRow(8, [4, 10]);       // G3
      setRow(9, [0, 6, 12]);    // Plucks
    }
  },
  {
    name: "Theta State - Meditation",
    bpm: 65,
    setup: (setRow: (r: number, s: number[]) => void) => {
      // Grounding bass rhythm
      setRow(0, [0]);
      setRow(4, [0, 8]);        // Heartbeat bass
      // Minimal harmonics
      setRow(5, [2, 10]);       // C3
      setRow(7, [6, 14]);       // E3
      // Drifting top line
      setRow(9, [4, 12]);       // Spread out melody
    }
  },
  {
    name: "Night Study - Lo-Fi",
    bpm: 80,
    setup: (setRow: (r: number, s: number[]) => void) => {
      // Steady relaxing groove
      setRow(0, [0, 10]);
      setRow(1, [8]);           // Laid back snare
      setRow(2, [0, 2, 4, 6, 8, 10, 12, 14]);
      // Warm chords
      setRow(5, [0, 6, 12]);    // C3
      setRow(6, [2, 8]);        // D3
      setRow(8, [4, 10]);       // G3
      // Subtle lead
      setRow(9, [14]);          // End phrase resolve
    }
  },
  {
    name: "Forest Rain - Calm",
    bpm: 68,
    setup: (setRow: (r: number, s: number[]) => void) => {
      // Natural organic rhythm
      setRow(2, [0, 3, 6, 9, 12, 15]); // Rain-like hats
      setRow(0, [0]);           // Impact
      // Minor texture
      setRow(4, [0, 8]);
      setRow(5, [0, 4, 8, 12]); // Constant reassuring harmonic
      setRow(9, [1, 5, 9, 13]); // Water drop effect
    }
  }
];
