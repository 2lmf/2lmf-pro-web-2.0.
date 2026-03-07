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
            volumes: { white: 0, pink: 0, brown: 0, car: 0, vacuum: 0 },
            breathing: {
                active: false,
                method: 'box',
                phase: 'inhale', // inhale, hold, exhale, hold2
                timer: 0
            },
            habits: JSON.parse(localStorage.getItem('zp_habits_v11')) || {
                breathing: [],
                sounds: [],
                meditation: []
            }
        };

        this.habitMetadata = {
            breathing: { name: 'Duboko Disanje', icon: 'fa-lungs', desc: 'Završi vježbu disanja' },
            sounds: { name: 'Mirni Zvukovi', icon: 'fa-water', desc: 'Slušaj zvukove barem 5 min' },
            meditation: { name: 'Jutarnja Meditacija', icon: 'fa-om', desc: 'Dnevna doza tišine' }
        };

        this.breathingInterval = null;
        this.breathingMethods = {
            box: { name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, hold2: 4 },
            relax: { name: 'Relax (4-6)', inhale: 4, hold: 0, exhale: 6, hold2: 0 },
            power: { name: '4-7-8 (Sleep)', inhale: 4, hold: 7, exhale: 8, hold2: 0 }
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
            this.renderCalmModule(content);
        } else if (moduleId === 'habits') {
            this.renderHabitsModule(content);
        }
    }

    hideModule() {
        const overlay = document.getElementById('overlay-container');
        overlay.style.display = 'none';
        this.state.activeModule = null;

        // Stop breathing if active
        this.stopBreathing();
    }

    renderCalmModule(container) {
        container.innerHTML = `
            <div class="calm-ui">
                <h2 style="margin-bottom: 20px;">Vježbe Disanja</h2>
                
                <div class="method-selector">
                    ${Object.keys(this.breathingMethods).map(id => `
                        <button class="method-btn ${this.state.breathing.method === id ? 'active' : ''}" 
                                onclick="app.setBreathingMethod('${id}')">
                            ${this.breathingMethods[id].name}
                        </button>
                    `).join('')}
                </div>

                <div class="breathing-container">
                    <div class="breathing-circle" id="b-circle">
                        <div class="breathing-text" id="b-text">START</div>
                    </div>
                </div>

                <div class="breathing-timer" id="b-timer">Klikni krug za početak</div>
                
                <button class="main-play-btn" id="b-main-btn" onclick="app.toggleBreathing()" style="margin-top: 20px;">ZAPOČNI</button>
            </div>
        `;
    }

    setBreathingMethod(id) {
        this.state.breathing.method = id;
        this.stopBreathing();
        this.renderCalmModule(document.getElementById('module-content'));
    }

    toggleBreathing() {
        if (this.state.breathing.active) {
            this.stopBreathing();
        } else {
            this.startBreathing();
        }
    }

    startBreathing() {
        this.state.breathing.active = true;
        this.state.breathing.phase = 'inhale';
        const method = this.breathingMethods[this.state.breathing.method];
        const btn = document.getElementById('b-main-btn');
        if (btn) btn.innerText = "ZAUSTAVI";

        // Auto-track breathing when started (or could be on finish, let's do start for instant feedback)
        this.trackHabit('breathing');

        this.runBreathingCycle();
    }

    stopBreathing() {
        this.state.breathing.active = false;
        if (this.breathingTimeout) clearTimeout(this.breathingTimeout);
        if (this.breathingCountInterval) clearInterval(this.breathingCountInterval);

        const circle = document.getElementById('b-circle');
        const text = document.getElementById('b-text');
        const btn = document.getElementById('b-main-btn');
        const timer = document.getElementById('b-timer');

        if (circle) circle.className = 'breathing-circle';
        if (text) text.innerText = 'START';
        if (btn) btn.innerText = 'ZAPOČNI';
        if (timer) timer.innerText = 'Klikni krug za početak';
    }

    runBreathingCycle() {
        if (!this.state.breathing.active) return;

        const method = this.breathingMethods[this.state.breathing.method];
        const circle = document.getElementById('b-circle');
        const text = document.getElementById('b-text');
        const timer = document.getElementById('b-timer');

        const phases = ['inhale', 'hold', 'exhale', 'hold2'];
        let currentIndex = phases.indexOf(this.state.breathing.phase);

        const currentPhase = phases[currentIndex];
        const duration = method[currentPhase];

        // Skip phase if duration is 0
        if (duration === 0) {
            this.state.breathing.phase = phases[(currentIndex + 1) % 4];
            this.runBreathingCycle();
            return;
        }

        // Update UI
        if (circle) {
            circle.className = 'breathing-circle';
            if (currentPhase === 'inhale') {
                circle.classList.add('circle-inhale');
            } else if (currentPhase === 'exhale') {
                circle.classList.add('circle-exhale');
            } else if (currentPhase === 'hold') {
                circle.classList.add('circle-hold-inhale');
            } else if (currentPhase === 'hold2') {
                circle.classList.add('circle-hold-exhale');
            }

            // Adjust transition duration dynamically
            circle.style.transition = `all ${duration}s ease-in-out`;
        }

        if (text) {
            const labels = { inhale: 'Udahni', hold: 'Zadrži', exhale: 'Izdahni', hold2: 'Zadrži' };
            text.innerText = labels[currentPhase];
        }

        // Timer
        let timeLeft = duration;
        if (timer) timer.innerText = `${timeLeft}s`;

        if (this.breathingCountInterval) clearInterval(this.breathingCountInterval);
        this.breathingCountInterval = setInterval(() => {
            timeLeft--;
            if (timer && timeLeft > 0) timer.innerText = `${timeLeft}s`;
        }, 1000);

        this.breathingTimeout = setTimeout(() => {
            this.state.breathing.phase = phases[(currentIndex + 1) % 4];
            this.runBreathingCycle();
        }, duration * 1000);
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

                <div class="controls-container glass-card" style="width: 100%; margin-top: 30px;">
                    <div class="controls-grid">
                        <div class="control-group">
                            <label>Povjetarac</label>
                            <input type="range" min="0" max="1" step="0.01" value="0" oninput="app.updateVolume('white', this.value)">
                        </div>
                        <div class="control-group">
                            <label>Kiša</label>
                            <input type="range" min="0" max="1" step="0.01" value="0" oninput="app.updateVolume('pink', this.value)">
                        </div>
                        <div class="control-group">
                            <label>Ocean</label>
                            <input type="range" min="0" max="1" step="0.01" value="0" oninput="app.updateVolume('brown', this.value)">
                        </div>
                        <div class="control-group">
                            <label>Auto</label>
                            <input type="range" min="0" max="1" step="0.01" value="0" oninput="app.updateVolume('car', this.value)">
                        </div>
                        <div class="control-group">
                            <label>Sauger</label>
                            <input type="range" min="0" max="1" step="0.01" value="0" oninput="app.updateVolume('vacuum', this.value)">
                        </div>
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
            if (this.soundStartTime) {
                const duration = (Date.now() - this.soundStartTime) / 1000;
                if (duration > 300) this.trackHabit('sounds'); // 5 minutes
            }
        } else {
            this.audioCtx.resume();
            this.soundStartTime = Date.now();
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

        // --- 4. ENGINE DRONE (Auto) ---
        // Uses Brown noise + a deep oscillator for the engine thrum
        this.nodes.carGain = this.audioCtx.createGain();
        this.nodes.carGain.gain.value = 0;

        this.nodes.carOsc = this.audioCtx.createOscillator();
        this.nodes.carOsc.type = 'sine'; // Smoother wave to prevent crackling/clipping
        this.nodes.carOsc.frequency.value = 65;

        this.nodes.carOscGain = this.audioCtx.createGain();
        this.nodes.carOscGain.gain.value = 0.3; // Reduced gain for headroom

        this.nodes.carFilter = this.audioCtx.createBiquadFilter();
        this.nodes.carFilter.type = 'lowpass';
        this.nodes.carFilter.frequency.value = 120; // Deeper thrum

        // Mix brown noise into the car sound for the road/wind feel
        const carRoadBuffer = this.createNoiseBuffer('brown', bufferSize);
        this.nodes.carRoad = this.createSource(carRoadBuffer);

        this.nodes.carOsc.connect(this.nodes.carOscGain).connect(this.nodes.carFilter);
        this.nodes.carRoad.connect(this.nodes.carFilter);
        this.nodes.carFilter.connect(this.nodes.carGain).connect(this.nodes.master);

        this.nodes.carOsc.start();
        this.nodes.carRoad.start();

        // --- 5. DEEP VACUUM (Sauger) ---
        // Specifically filtered Pink noise for that "industrial" white noise
        this.nodes.vacuumGain = this.audioCtx.createGain();
        this.nodes.vacuumGain.gain.value = 0;

        this.nodes.vacuumFilter = this.audioCtx.createBiquadFilter();
        this.nodes.vacuumFilter.type = 'bandpass';
        this.nodes.vacuumFilter.frequency.value = 450;
        this.nodes.vacuumFilter.Q.value = 1.0;

        const vacuumBuffer = this.createNoiseBuffer('pink', bufferSize);
        this.nodes.vacuumNoise = this.createSource(vacuumBuffer);

        this.nodes.vacuumNoise.connect(this.nodes.vacuumFilter).connect(this.nodes.vacuumGain).connect(this.nodes.master);
        this.nodes.vacuumNoise.start();
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

    // --- HABITS MODULE (DAILY ZEN v11) ---

    renderHabitsModule(container) {
        const user = window.ZP_Firebase ? window.ZP_Firebase.user : null;
        const habits = Object.keys(this.habitMetadata);

        // Summary Stats
        const totalCompletions = habits.reduce((acc, id) => acc + (this.state.habits[id] ? this.state.habits[id].length : 0), 0);
        const avgStreak = Math.round(habits.reduce((acc, id) => acc + this.getStreak(id), 0) / habits.length);

        container.innerHTML = `
            <div class="habits-ui">
                <h2 style="margin-bottom: 20px;">Habit Tracker</h2>

                <div class="summary-card">
                    <div class="summary-stat">
                        <span class="summary-val">${totalCompletions}</span>
                        <span class="summary-lbl">UKUPNO</span>
                    </div>
                    <div class="summary-stat">
                        <span class="summary-val">${avgStreak}</span>
                        <span class="summary-lbl">AVG STREAK</span>
                    </div>
                    <div class="summary-stat">
                        <span class="summary-val">🦈</span>
                        <span class="summary-lbl">ZEN STATUS</span>
                    </div>
                </div>

                ${habits.map(id => this.renderHabitCard(id)).join('')}

                <div class="cloud-info-v11">
                    <i class="fas ${user ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                    ${user ? `<span class="sync-pill">CLOUD SYNC AKTIVAN</span> <span>${user.email}</span>` :
                `<span>Podaci su samo lokalno.</span> <button class="sync-btn" onclick="app.loginFirebase()">PRIJAVI SE</button>`}
                </div>
            </div>
        `;
    }

    renderHabitCard(id) {
        const meta = this.habitMetadata[id];
        const data = this.state.habits[id] || [];
        const today = new Date().toISOString().split('T')[0];
        const completedToday = data.includes(today);
        const stats = this.calculateStats(id);
        const streak = this.getStreak(id);

        return `
            <div class="habit-card ${completedToday ? 'completed' : ''}">
                <div class="habit-header">
                    <div class="habit-info">
                        <h3><i class="fas ${meta.icon}"></i> ${meta.name}</h3>
                        <p>${meta.desc}</p>
                    </div>
                    <button class="habit-action-btn" onclick="app.toggleHabit('${id}')">
                        <i class="fas ${completedToday ? 'fa-check' : 'fa-plus'}"></i>
                    </button>
                </div>

                <div class="habit-stats-row">
                    <div class="stat-pill"><i class="fas fa-fire"></i> ${streak}d streak</div>
                    <div class="stat-pill"><i class="fas fa-chart-line"></i> ${stats.completionRate}%</div>
                    <div class="stat-pill"><i class="fas fa-calendar-check"></i> ${data.length} dana</div>
                </div>

                <div class="calendar-grid">
                    ${this.generateCalendarDots(id)}
                </div>
            </div>
        `;
    }

    generateCalendarDots(id) {
        const data = this.state.habits[id] || [];
        const today = new Date();
        const dots = [];

        // Show last 31 days
        for (let i = 30; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const active = data.includes(dateStr);
            const isToday = i === 0;
            dots.push(`<div class="cal-dot ${active ? 'active' : ''} ${isToday ? 'today' : ''}" title="${dateStr}"></div>`);
        }
        return dots.join('');
    }

    toggleHabit(id) {
        const today = new Date().toISOString().split('T')[0];
        if (!this.state.habits[id]) this.state.habits[id] = [];

        if (this.state.habits[id].includes(today)) {
            this.state.habits[id] = this.state.habits[id].filter(d => d !== today);
        } else {
            this.state.habits[id].push(today);
        }

        this.saveAndSync();
        this.renderHabitsModule(document.getElementById('module-content'));
    }

    trackHabit(id) {
        const today = new Date().toISOString().split('T')[0];
        if (!this.state.habits[id]) this.state.habits[id] = [];
        if (!this.state.habits[id].includes(today)) {
            this.state.habits[id].push(today);
            this.saveAndSync();
        }
    }

    saveAndSync() {
        localStorage.setItem('zp_habits_v11', JSON.stringify(this.state.habits));
        this.syncHabitsToCloud();
    }

    calculateStats(id) {
        const data = this.state.habits[id] || [];
        const totalDays = 31; // Based on our dot view
        const completions = data.filter(d => {
            const date = new Date(d);
            const diff = (new Date() - date) / (1000 * 60 * 60 * 24);
            return diff <= totalDays;
        }).length;

        return {
            completionRate: Math.round((completions / totalDays) * 100)
        };
    }

    getStreak(id) {
        const data = this.state.habits[id] || [];
        if (data.length === 0) return 0;
        const sorted = [...data].sort().reverse();
        let streak = 0;
        let checkDate = new Date();

        const todayStr = checkDate.toISOString().split('T')[0];
        if (!sorted.includes(todayStr)) {
            checkDate.setDate(checkDate.getDate() - 1);
        }

        while (true) {
            const dateStr = checkDate.toISOString().split('T')[0];
            if (sorted.includes(dateStr)) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
            if (streak > 365) break;
        }
        return streak;
    }

    async loginFirebase() {
        if (!window.ZP_Firebase) return;
        try {
            await window.ZP_Firebase.login();
        } catch (e) {
            alert("Greška pri prijavi!");
        }
    }

    async syncHabitsToCloud() {
        const user = window.ZP_Firebase ? window.ZP_Firebase.user : null;
        if (user) {
            await window.ZP_Firebase.saveHabits(user.uid, this.state.habits);
        }
    }

    async loadHabitsFromCloud() {
        const user = window.ZP_Firebase ? window.ZP_Firebase.user : null;
        if (user) {
            const cloudHabits = await window.ZP_Firebase.loadHabits(user.uid);
            if (cloudHabits && typeof cloudHabits === 'object') {
                // Proper merge per habit
                Object.keys(cloudHabits).forEach(id => {
                    const local = this.state.habits[id] || [];
                    const cloud = cloudHabits[id] || [];
                    this.state.habits[id] = [...new Set([...local, ...cloud])];
                });
                localStorage.setItem('zp_habits_v11', JSON.stringify(this.state.habits));
                if (this.state.activeModule === 'habits') {
                    const content = document.getElementById('module-content');
                    if (content) this.renderHabitsModule(content);
                }
            }
        }
    }
}

// Initialize App
const app = new ZenPauza();

// Global bridge for inline onclicks
window.showModule = (id) => app.showModule(id);
window.hideModule = () => app.hideModule();
