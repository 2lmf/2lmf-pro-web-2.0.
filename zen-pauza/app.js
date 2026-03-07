/**
 * ZEN PAUZA - Core Engine
 */

class ZenPauza {
    constructor() {
        this.audioCtx = null;
        this.nodes = {
            white: null,
            pink: null,
            brown: null,
            master: null
        };

        this.state = {
            activeModule: null,
            isSoundPlaying: false,
            volumes: { white: 0, pink: 0, brown: 0 }
        };

        this.init();
    }

    init() {
        console.log("Zen Pauza Initialized");
        this.registerSW();
    }

    registerSW() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('SW Registered', reg))
                .catch(err => console.log('SW Failed', err));
        }
    }

    // --- NAVIGATION ---

    showModule(moduleId) {
        const overlay = document.getElementById('overlay-container');
        const content = document.getElementById('module-content');

        overlay.style.display = 'flex';
        this.state.activeModule = moduleId;

        if (moduleId === 'focus') {
            this.renderFocusModule(content);
        } else if (moduleId === 'calm') {
            content.innerHTML = `<h2>Uskoro...</h2><p>Vježbe disanja stižu za trenutak.</p>`;
        } else if (moduleId === 'habits') {
            content.innerHTML = `<h2>Uskoro...</h2><p>Habit tracker stiže za trenutak.</p>`;
        }
    }

    hideModule() {
        const overlay = document.getElementById('overlay-container');
        overlay.style.display = 'none';
        this.state.activeModule = null;

        // Stop any active processes if needed
    }

    // --- FOCUS MODULE (SOUND OASIS) ---

    renderFocusModule(container) {
        container.innerHTML = `
            <div class="focus-ui">
                <h2 style="margin-bottom: 40px; text-align:center;">Sound Oasis</h2>
                
                <div class="visualizer-container">
                    <div class="visualizer-bar" id="v-bar-1"></div>
                    <div class="visualizer-bar" id="v-bar-2"></div>
                    <div class="visualizer-bar" id="v-bar-3"></div>
                </div>

                <div class="controls-container glass-card" style="width: 100%; margin-top: 50px;">
                    <div class="control-group">
                        <label>Šum vjetra (Povjetarac)</label>
                        <input type="range" min="0" max="1" step="0.01" value="0" oninput="app.updateVolume('white', this.value)">
                    </div>
                    <div class="control-group">
                        <label>Nježna kiša</label>
                        <input type="range" min="0" max="1" step="0.01" value="0" oninput="app.updateVolume('pink', this.value)">
                    </div>
                    <div class="control-group">
                        <label>Valovi oceana (Duboki mir)</label>
                        <input type="range" min="0" max="1" step="0.01" value="0" oninput="app.updateVolume('brown', this.value)">
                    </div>
                </div>

                <button class="main-play-btn" id="play-btn" onclick="app.toggleSound()">POKRENI MIR</button>
            </div>
        `;
    }

    /**
     * Web Audio API Engine with Organic Filters
     */
    initAudio() {
        if (this.audioCtx) return;

        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.nodes.master = this.audioCtx.createGain();
        this.nodes.master.connect(this.audioCtx.destination);
    }

    toggleSound() {
        this.initAudio();

        if (this.state.isSoundPlaying) {
            this.audioCtx.suspend();
            document.getElementById('play-btn').innerText = "POKRENI MIR";
            if (this.visualReq) cancelAnimationFrame(this.visualReq);
        } else {
            this.audioCtx.resume();
            document.getElementById('play-btn').innerText = "PAUZIRAJ";

            // Start generators if not already started
            if (!this.nodes.white) this.createNoiseGenerators();
            this.updateVisualizer();
        }

        this.state.isSoundPlaying = !this.state.isSoundPlaying;
    }

    updateVisualizer() {
        if (!this.state.isSoundPlaying) return;

        const bars = [
            document.getElementById('v-bar-1'),
            document.getElementById('v-bar-2'),
            document.getElementById('v-bar-3')
        ];

        if (bars[0]) {
            // Organic pulsing based on volumes and LFO state
            const time = Date.now() / 1000;
            bars.forEach((bar, i) => {
                const baseHeight = 20;
                const variance = 40;
                const speed = 1 + i * 0.5;
                const h = baseHeight + Math.sin(time * speed) * variance + (Math.random() * 10);
                bar.style.height = `${Math.max(10, h)}px`;
                bar.style.opacity = 0.5 + (h / 100);
            });
        }

        this.visualReq = requestAnimationFrame(() => this.updateVisualizer());
    }

    createNoiseGenerators() {
        // Increased buffer size for more organic feel (10 seconds)
        const bufferSize = 10 * this.audioCtx.sampleRate;

        // --- 1. WHITE NOISE (Wind) ---
        const whiteBuffer = this.createNoiseBuffer('white', bufferSize);
        this.nodes.white = this.createSource(whiteBuffer);
        this.nodes.whiteGain = this.audioCtx.createGain();
        this.nodes.whiteGain.gain.value = 0;

        this.nodes.whiteFilter = this.audioCtx.createBiquadFilter();
        this.nodes.whiteFilter.type = 'lowpass';
        this.nodes.whiteFilter.frequency.value = 800;

        this.nodes.white.connect(this.nodes.whiteFilter).connect(this.nodes.whiteGain).connect(this.nodes.master);
        this.nodes.white.start();

        // --- 2. PINK NOISE (Rain) ---
        const pinkBuffer = this.createNoiseBuffer('pink', bufferSize);
        this.nodes.pink = this.createSource(pinkBuffer);
        this.nodes.pinkGain = this.audioCtx.createGain();
        this.nodes.pinkGain.gain.value = 0;

        this.nodes.pinkFilter = this.audioCtx.createBiquadFilter();
        this.nodes.pinkFilter.type = 'lowpass';
        this.nodes.pinkFilter.frequency.value = 2500;

        this.nodes.pink.connect(this.nodes.pinkFilter).connect(this.nodes.pinkGain).connect(this.nodes.master);
        this.nodes.pink.start();

        // --- 3. BROWN NOISE (Ocean Waves) ---
        const brownBuffer = this.createNoiseBuffer('brown', bufferSize);
        this.nodes.brown = this.createSource(brownBuffer);

        // Main volume control for brown
        this.nodes.brownGain = this.audioCtx.createGain();
        this.nodes.brownGain.gain.value = 0;

        // Modulation Gain (This is what LFO will control)
        this.nodes.brownModGain = this.audioCtx.createGain();
        this.nodes.brownModGain.gain.value = 0.6; // Base intensity

        // Ocean Wave LFO (Slow breathing)
        const waveLFO = this.audioCtx.createOscillator();
        waveLFO.type = 'sine';
        waveLFO.frequency.value = 0.12; // Even slower, 8-9s per wave

        const waveLFOGain = this.audioCtx.createGain();
        waveLFOGain.gain.value = 0.35; // How much it breathes

        waveLFO.connect(waveLFOGain);
        // Modulate the ModGain node instead of main Gain for stability
        waveLFOGain.connect(this.nodes.brownModGain.gain);
        waveLFO.start();

        this.nodes.brown.connect(this.nodes.brownModGain).connect(this.nodes.brownGain).connect(this.nodes.master);
        this.nodes.brown.start();
    }

    createNoiseBuffer(type, size) {
        const buffer = this.audioCtx.createBuffer(1, size, this.audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        const fadeSize = Math.floor(0.5 * this.audioCtx.sampleRate); // 0.5s fade for seamless loop

        if (type === 'white') {
            for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
        } else if (type === 'pink') {
            let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
            for (let i = 0; i < size; i++) {
                const white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                data[i] *= 0.11;
                b6 = white * 0.115926;
            }
        } else if (type === 'brown') {
            let lastOut = 0;
            for (let i = 0; i < size; i++) {
                const white = Math.random() * 2 - 1;
                const out = (lastOut + (0.02 * white)) / 1.002;
                data[i] = out * 3.5;
                lastOut = out;
            }
        }

        // Apply Cross-fade (Seamless Loop)
        for (let i = 0; i < fadeSize; i++) {
            const alpha = i / fadeSize;
            // Mix the beginning and the end
            const startVal = data[i];
            const endVal = data[size - fadeSize + i];

            data[i] = startVal * alpha + endVal * (1 - alpha);
            data[size - fadeSize + i] = endVal * alpha + startVal * (1 - alpha);
        }

        return buffer;
    }

    createSource(buffer) {
        const source = this.audioCtx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        return source;
    }

    updateVolume(type, val) {
        if (!this.audioCtx) return;
        const gainNode = this.nodes[`${type}Gain`];
        if (gainNode) {
            // Suptilni fade za prirodniji osjećaj
            gainNode.gain.setTargetAtTime(val, this.audioCtx.currentTime, 0.1);
        }
    }
}

// Initialize App
const app = new ZenPauza();

// Global bridge for inline onclicks
window.showModule = (id) => app.showModule(id);
window.hideModule = () => app.hideModule();
