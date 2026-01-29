import * as Tone from 'tone';

export class ToneAudioEngine {
    private masterGain: Tone.Gain;
    private reverb: Tone.Reverb;
    private volume: number = 0.5;
    private isStarted: boolean = false;

    // Instruments
    private kick: Tone.MembraneSynth;
    private snare: Tone.NoiseSynth;
    private hatClosed: Tone.MetalSynth;
    private hatOpen: Tone.MetalSynth;
    private bass: Tone.Synth;
    private polySynth: Tone.PolySynth;
    private leadSynth: Tone.Synth;

    // Frequencies mapped to rows (matching original scale)
    // A Minor Pentatonic: A, C, D, E, G
    private scale = {
        kick: "A1",
        bass: "A2",
        minorThird: "C3",
        fourth: "D3",
        fifth: "E3",
        seventh: "G3",
        lead: ["A4", "C5", "E5"]
    };

    constructor() {
        this.masterGain = new Tone.Gain(0.5).toDestination();

        // Reverb Setup (Large Room feel)
        this.reverb = new Tone.Reverb({
            decay: 2.5,
            preDelay: 0.1,
            wet: 0.4
        }).connect(this.masterGain);

        // Initialize Instruments

        // Row 1: Kick
        this.kick = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 4,
            oscillator: { type: "sine" },
            envelope: {
                attack: 0.001,
                decay: 0.4,
                sustain: 0.01,
                release: 1.4,
            }
        }).connect(this.masterGain);

        // Row 2: Snare (Noise)
        this.snare = new Tone.NoiseSynth({
            noise: { type: "white" },
            envelope: {
                attack: 0.001,
                decay: 0.2,
                sustain: 0
            }
        }).connect(this.reverb);

        this.hatClosed = new Tone.MetalSynth({
            envelope: {
                attack: 0.001,
                decay: 0.05,
                release: 0.05
            },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1.5
        }).connect(this.masterGain);
        this.hatClosed.frequency.value = 200;
        this.hatClosed.volume.value = -6;

        this.hatOpen = new Tone.MetalSynth({
            envelope: {
                attack: 0.001,
                decay: 0.3,
                release: 0.3
            },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1.5
        }).connect(this.reverb);
        this.hatOpen.frequency.value = 200;
        this.hatOpen.volume.value = -6;

        // Row 5: Bass (Triangle)
        this.bass = new Tone.Synth({
            oscillator: { type: "triangle" },
            envelope: {
                attack: 0.02,
                decay: 0.2,
                sustain: 0.6,
                release: 0.4,
            }
        }).connect(this.masterGain);

        // Rows 6-9: PolySynth (Sine/Triangle mix feel)
        this.polySynth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "sine" },
            envelope: {
                attack: 0.02,
                decay: 0.1,
                sustain: 0.3,
                release: 1
            }
        }).connect(this.reverb);

        // Row 10: Lead (Pluck/Sawtooth)
        this.leadSynth = new Tone.Synth({
            oscillator: { type: "sawtooth" },
            envelope: {
                attack: 0.01,
                decay: 0.3,
                sustain: 0.1,
                release: 1
            }
        }).connect(this.reverb);

        // Lowpass filter for lead to match original "pluck" feel
        const filter = new Tone.Filter(3000, "lowpass").connect(this.reverb);
        this.leadSynth.connect(filter);
    }

    // Necessary for browser policies
    async start() {
        if (!this.isStarted) {
            await Tone.start();
            this.isStarted = true;
        }
    }

    setVolume(volume: number) {
        this.volume = volume;
        // Map 0-100 to decibels (approx range -60db to 0db)
        // or just linear gain control if we prefer to stick to simple multiplier
        const gainValue = volume <= 0 ? 0 : (volume / 100) * 0.8; // Boost to 0.8
        this.masterGain.gain.rampTo(gainValue, 0.1);
    }

    playColumn(activeRows: number[], totalRows: number) {
        if (activeRows.length === 0) return;

        // Ensure Context is started
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }

        const now = Tone.now();

        activeRows.forEach(row => {
            try {
                switch (row) {
                    case 0:
                        this.kick.triggerAttackRelease(this.scale.kick, "8n", now);
                        break;
                    case 1:
                        this.snare.triggerAttackRelease("8n", now);
                        break;
                    case 2:
                        this.hatClosed.triggerAttackRelease(32, "32n", now); // 32Hz meta frequency adjustment
                        break;
                    case 3:
                        this.hatOpen.triggerAttackRelease(32, "8n", now);
                        break;
                    case 4:
                        this.bass.triggerAttackRelease(this.scale.bass, "8n", now);
                        break;
                    case 5:
                        this.polySynth.triggerAttackRelease(this.scale.minorThird, "8n", now);
                        break;
                    case 6:
                        this.polySynth.triggerAttackRelease(this.scale.fourth, "8n", now);
                        break;
                    case 7:
                        this.polySynth.triggerAttackRelease(this.scale.fifth, "8n", now);
                        break;
                    case 8:
                        this.polySynth.triggerAttackRelease(this.scale.seventh, "8n", now);
                        break;
                    case 9:
                        const note = this.scale.lead[Math.floor(Math.random() * this.scale.lead.length)];
                        this.leadSynth.triggerAttackRelease(note, "8n", now);
                        break;
                }
            } catch (e) {
                console.warn("Audio trigger error:", e);
            }
        });
    }

    stopAll() {
        // Tone.Transport.stop() would be used if we were using the transport, 
        // but here we just ensure release is called.
        this.polySynth.releaseAll();
    }
}
