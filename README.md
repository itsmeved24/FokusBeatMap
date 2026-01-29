# 🎵 Focus Music Maker

A beautiful, interactive web-based drum machine and music sequencer built for focus sessions. Create lo-fi beats, synthwave grooves, and ambient soundscapes with an intuitive grid-based interface.

![Focus Music Maker](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

## ✨ Features

- **🎨 Visual Grid Sequencer** - Draw beats on a 10x16 grid with touch/mouse support
- **🎹 10 Instruments** - Kick, snare, hi-hats, bass, and melodic elements
- **⏱️ Built-in Focus Timer** - Pomodoro-style timer (5-120 minutes)
- **🎚️ Real-time Controls** - BPM adjustment, volume control, and mute
- **🎲 6 Pre-made Presets** - Lo-Fi, Synthwave, Ambient styles
- **🔊 Web Audio API** - High-quality synthesis with reverb effects
- **📱 Responsive Design** - Works on desktop, tablet, and mobile
- **🎧 No Installation** - Runs entirely in your browser

## 🎮 How to Use

1. **Draw Patterns** - Click/touch grid cells to create beats
2. **Set Timer** - Choose focus duration (5-120 min)
3. **Adjust BPM** - Slide to change tempo (60-140 BPM)
4. **Start Timer** - Music plays automatically
5. **Randomize** - Load pre-made presets for instant grooves

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS 4** - Styling
- **Tone.js Audio Engine** - Professional-grade synthesis with scheduled timing
- **Radix UI** - Accessible components
- **Motion** - Smooth animations

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/focus-music-maker.git
cd focus-music-maker

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎼 Music Presets

The app includes 6 carefully crafted presets:

| Preset | Style | BPM | Vibe |
|--------|-------|-----|------|
| Deep Flow | Alpha Waves | 60 | Minimal, heartbeat pulse |
| Theta State | Meditation | 65 | Grounding bass, very slow |
| Forest Rain | Calm | 68 | Organic texture, reassuring |
| Morning Fog | Ambient | 72 | Soft pads, floating melody |
| Night Study | Lo-Fi | 80 | Warm chords, relaxed groove |

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── FocusMusicMaker.tsx    # Main component
│   │   ├── AudioEngine.tsx        # Sound synthesis
│   │   ├── DrawingGrid.tsx        # Interactive grid
│   │   ├── controls/              # UI controls
│   │   ├── display/               # Display components
│   │   └── layout/                # Layout components
│   └── App.tsx
├── constants/
│   └── musicPresets.ts            # Pre-made patterns
├── styles/
│   ├── index.css
│   ├── fonts.css
│   ├── tailwind.css
│   └── theme.css
└── main.tsx
```

## 🎹 Sequencer Specification

**Grid Layout**: 10 Rows × 16 Columns  
**Time**: 16-step loop (FL Studio style)  

### Instrument Mapping (Top to Bottom)

**Key**: A Minor Pentatonic (A, C, D, E, G)

| Row | Instrument | Frequency / Note | Vibe |
|:---|:---|:---|:---|
| **1** | **Kick** | A1 (55 Hz) | Deep heartbeat pulse |
| **2** | **Snare** | White Noise | Soft textural backbeat |
| **3** | **Closed Hat** | Metallic (200 Hz) | Fast rhythm, ticking clock |
| **4** | **Open Hat** | Metallic (200 Hz) | Accent, air, breath |
| **5** | **Bass** | A2 (110 Hz) | Solid low-end foundation |
| **6** | **Lo-Synth** | C3 (130.8 Hz) | Minor Third (Emotional grounding) |
| **7** | **Lo-Synth** | D3 (146.8 Hz) | Fourth (Tension/Movement) |
| **8** | **Lo-Synth** | E3 (164.8 Hz) | Fifth (Resolution/Stability) |
| **9** | **Lo-Synth** | G3 (196.0 Hz) | Seventh (Soulful/Bluesy) |
| **10** | **Lead Pluck** | A4, C5, E5 | Random melody generator (Sparkles) |

### Audio Architecture

- **Engine**: Tone.js (Robust Web Audio Framework)
- **Vertical stacking** = Chords (play multiple rows simultaneously)
- **Horizontal sequencing** = Melody / Rhythm (patterns over time)
- **Global reverb send** on all channels (large room, 40% wet)
- **Per-instrument envelope shaping** for dynamic expression

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Built with [Vite](https://vite.dev)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Design inspired by classic drum machines
- Original Figma design concept
---

<p align="center">Made with ♥ by Vansia</p>
