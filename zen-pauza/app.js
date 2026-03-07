/**
 * ZEN PAUZA - Core Engine
 */

class ZenPauza {
    constructor() {
        this.audioCtx = null;
        this.nodes = { white: null, pink: null, brown: null, master: null };

        this.state = {
            activeView: 'today', // today, habits, explore
            activeModule: null,
            isSoundPlaying: false,
            volumes: { white: 0.3, pink: 0.3, brown: 0.3, car: 0, vacuum: 0 },
            breathing: { active: false, method: 'box', phase: 'inhale', timer: 0 },
            habits: JSON.parse(localStorage.getItem('zp_habits_v11')) || {
                breathing: [], sounds: [], meditation: []
            },
            habitMetadata: JSON.parse(localStorage.getItem('zp_habit_meta_v12')) || {
                breathing: { name: 'Duboko Disanje', icon: 'fa-lungs', color: '#4FACFE', goal: 7 },
                sounds: { name: 'Mirni Zvukovi', icon: 'fa-water', color: '#00D084', goal: 7 },
                meditation: { name: 'Jutarnja Meditacija', icon: 'fa-om', color: '#ff4d6d', goal: 7 }
            },
            expandedHabitId: null
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
        this.renderTodayView();

        // Firebase bridge
        if (window.onFirebaseStateChange) {
            window.onFirebaseStateChange((user) => {
                if (user) {
                    console.log("Firebase: User logged in", user.email);
                    this.loadHabitsFromCloud();
                } else {
                    console.log("Firebase: No user");
                }
                this.refreshUI();
            });
        }

        // Allow native touch events for scrolling and pull-to-refresh
        // Removed v24 blocker to allow native browser refresh
    }

    refreshUI() {
        if (this.state.activeView === 'today') this.renderTodayView();
        if (this.state.activeView === 'habits') this.renderHabitsModule();
    }

    // --- NAVIGATION ---

    switchView(viewId) {
        this.closeHabitModal();
        this.expandedHabitId = null; // Close any expanded detail when switching
        this.state.activeView = viewId;
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

        const targetView = document.getElementById(`view-${viewId}`);
        const targetBtn = document.getElementById(`nav-${viewId}`);
        if (targetView) targetView.classList.add('active');
        if (targetBtn) targetBtn.classList.add('active');

        if (viewId === 'today') this.renderTodayView();
        if (viewId === 'habits') this.renderHabitsModule();
        if (viewId === 'explore') this.renderMirView();
    }

    showModule(moduleId) {
        const overlay = document.getElementById('overlay-container');
        overlay.style.display = 'flex';
        this.state.activeModule = moduleId;
        const content = document.getElementById('module-content');

        if (moduleId === 'breathe') this.renderCalmModule(content);
        if (moduleId === 'sounds') this.renderFocusModule(content);
    }

    hideModule() {
        document.getElementById('overlay-container').style.display = 'none';
        this.state.activeModule = null;
        this.stopBreathing();
    }

    // --- TODAY VIEW ---

    renderTodayView() {
        const container = document.getElementById('today-list');
        if (!container) return;

        const habits = Object.keys(this.state.habitMetadata);
        const today = new Date().toISOString().split('T')[0];

        container.innerHTML = `
            <div class="today-date-chips" style="display:flex; gap:10px; overflow-x:auto; margin-bottom:20px; padding-bottom:10px;">
                ${this.generateDateChips()}
            </div>
            ${habits.map(id => {
            const meta = this.state.habitMetadata[id] || { name: id, icon: 'fa-star' };
            const data = this.state.habits[id] || [];
            const completed = data.includes(today);
            const isExpanded = this.state.expandedHabitId === id;

            return `
                <div class="habit-container-inline ${isExpanded ? 'expanded' : ''}">
                    <div class="habit-card today-item ${completed ? 'completed' : ''}" onclick="app.toggleExpandHabit('${id}')">
                        <div class="habit-icon-box">
                            <i class="fas ${meta.icon}"></i>
                        </div>
                        <div class="habit-content-main" style="text-align:left; margin-left:15px;">
                            <h3 style="font-size:0.95rem; margin-bottom:2px;">${meta.name}</h3>
                        </div>
                        <div class="status-icon" style="margin-left:auto; font-size:1.2rem; color:${completed ? '#00D084' : 'rgba(255,255,255,0.1)'}" 
                             onclick="event.stopPropagation(); app.toggleTodayHabit('${id}')">
                            <i class="fas ${completed ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
                        </div>
                    </div>
                    
                    ${isExpanded ? `
                        <div class="habit-detail-inline">
                            <div class="inline-calendar-grid">
                                ${this.generateFullMonthCalendar(id)}
                            </div>
                            <div style="display:flex; justify-content:space-between; margin-top:15px; padding:0 10px;">
                                <div class="inline-stat">
                                    <span class="val">${this.getStreak(id)}</span>
                                    <span class="lbl">Streak</span>
                                </div>
                                <div class="inline-stat">
                                    <span class="val">${this.calculateStats(id).completionRate}%</span>
                                    <span class="lbl">Cilj</span>
                                </div>
                                <button class="action-btn-circle" onclick="app.openHabitModal('${id}')">
                                    <i class="fas fa-expand-alt"></i>
                                </button>
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('')}
        `;
    }

    toggleExpandHabit(id) {
        this.state.expandedHabitId = this.state.expandedHabitId === id ? null : id;
        this.renderTodayView();
    }

    generateDateChips() {
        const days = [];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = -3; i <= 3; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            const isToday = i === 0;
            days.push(`
                <div class="date-chip ${isToday ? 'active' : ''}" style="display:flex; flex-direction:column; align-items:center; min-width:45px; padding:10px; border-radius:12px; background:${isToday ? '#ff4d6d' : 'transparent'}; color:${isToday ? 'white' : 'var(--text-dim)'}">
                    <span style="font-size:0.6rem; text-transform:uppercase;">${dayNames[d.getDay()]}</span>
                    <strong style="font-size:1.1rem;">${d.getDate()}</strong>
                </div>
            `);
        }
        return days.join('');
    }

    toggleTodayHabit(id) {
        this.toggleHabit(id, new Date().toISOString().split('T')[0]);
        this.renderTodayView();

        // Refresh detail view if it's expanded to show color change
        if (this.state.expandedHabitId === id) {
            this.renderTodayView();
        }
    }

    renderMirView() {
        const container = document.getElementById('mir-content');
        if (!container) return;

        container.innerHTML = `
            <div class="mir-section-card">
                <h3><i class="fas fa-volume-up"></i> Sound Oasis</h3>
                <div class="visualizer-container" style="margin-bottom:12px;">
                    <div class="visualizer-bar" id="v-bar-1"></div>
                    <div class="visualizer-bar" id="v-bar-2"></div>
                    <div class="visualizer-bar" id="v-bar-3"></div>
                </div>
                <div class="controls-grid">
                    <div class="control-group">
                        <label>Povjetarac</label>
                        <input type="range" min="0" max="1" step="0.01" value="${this.state.volumes.white}" oninput="app.updateVolume('white', this.value)">
                    </div>
                    <div class="control-group">
                        <label>Kiša</label>
                        <input type="range" min="0" max="1" step="0.01" value="${this.state.volumes.pink}" oninput="app.updateVolume('pink', this.value)">
                    </div>
                    <div class="control-group">
                        <label>Ocean</label>
                        <input type="range" min="0" max="1" step="0.01" value="${this.state.volumes.brown}" oninput="app.updateVolume('brown', this.value)">
                    </div>
                    <div class="control-group">
                        <label>Auto</label>
                        <input type="range" min="0" max="1" step="0.01" value="${this.state.volumes.car}" oninput="app.updateVolume('car', this.value)">
                    </div>
                    <div class="control-group">
                        <label>Sauger</label>
                        <input type="range" min="0" max="1" step="0.01" value="${this.state.volumes.vacuum}" oninput="app.updateVolume('vacuum', this.value)">
                    </div>
                </div>
                <button class="main-play-btn" id="play-btn" onclick="app.toggleSound()" style="margin-top:10px;">${this.state.isSoundPlaying ? 'PAUZIRAJ' : 'POKRENI MIR'}</button>
            </div>

            <div class="mir-section-card">
                <h3><i class="fas fa-lungs"></i> Dah (Box Breathing)</h3>
                <div class="method-selector" style="margin-bottom:12px;">
                    ${Object.keys(this.breathingMethods).map(id => `
                        <button class="method-btn ${this.state.breathing.method === id ? 'active' : ''}" 
                                onclick="app.setBreathingMethod('${id}')">
                            ${this.breathingMethods[id].name}
                        </button>
                    `).join('')}
                </div>
                <div class="breathing-container" style="margin: 10px 0;">
                    <div class="breathing-circle" id="b-circle">
                        <div class="breathing-text" id="b-text">START</div>
                    </div>
                </div>
                <div class="breathing-timer" id="b-timer" style="text-align:center;">Klikni krug za početak</div>
                <button class="main-play-btn" id="b-main-btn" onclick="app.toggleBreathing()" style="margin-top:10px;">${this.state.breathing.active ? 'ZAUSTAVI' : 'ZAPOČNI'}</button>
            </div>
        `;

        if (this.state.isSoundPlaying) this.updateVisualizer();
        if (this.state.breathing.active) this.runBreathingCycle();
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
        this.renderMirView();
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
                            <input type="range" min="0" max="1" step="0.01" value="${this.state.volumes.white}" oninput="app.updateVolume('white', this.value)">
                        </div>
                        <div class="control-group">
                            <label>Kiša</label>
                            <input type="range" min="0" max="1" step="0.01" value="${this.state.volumes.pink}" oninput="app.updateVolume('pink', this.value)">
                        </div>
                        <div class="control-group">
                            <label>Ocean</label>
                            <input type="range" min="0" max="1" step="0.01" value="${this.state.volumes.brown}" oninput="app.updateVolume('brown', this.value)">
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
            if (!this.nodes.white) {
                this.createNoiseGenerators();
                // Apply initial volumes
                Object.keys(this.state.volumes).forEach(type => this.updateVolume(type, this.state.volumes[type]));
            }
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

        // --- 4. ENGINE DRONE (Auto v23) ---
        this.nodes.carGain = this.audioCtx.createGain();
        this.nodes.carGain.gain.value = 0;

        // Base hum - lower frequency detuned triangle waves
        this.nodes.carOsc1 = this.audioCtx.createOscillator();
        this.nodes.carOsc1.type = 'triangle';
        this.nodes.carOsc1.frequency.value = 65;

        this.nodes.carOsc2 = this.audioCtx.createOscillator();
        this.nodes.carOsc2.type = 'triangle';
        this.nodes.carOsc2.frequency.value = 65.4; // Detuning for richness

        // Mix group for engine
        const engineMixGroup = this.audioCtx.createGain();
        engineMixGroup.gain.value = 0.25;

        this.nodes.carFilter = this.audioCtx.createBiquadFilter();
        this.nodes.carFilter.type = 'lowpass';
        this.nodes.carFilter.frequency.value = 140;

        // Modulation for "movement"
        const wobble = this.audioCtx.createOscillator();
        wobble.type = 'sine';
        wobble.frequency.value = 0.5; // Slow vibration
        const wobbleGain = this.audioCtx.createGain();
        wobbleGain.gain.value = 5; // Variation in Hz
        wobble.connect(wobbleGain);
        wobbleGain.connect(this.nodes.carFilter.frequency);
        wobble.start();

        // Add some "road noise" mixing in brown noise
        const carRoadBuffer = this.createNoiseBuffer('brown', bufferSize);
        this.nodes.carRoad = this.createSource(carRoadBuffer);
        const carRoadGain = this.audioCtx.createGain();
        carRoadGain.gain.value = 0.15;

        this.nodes.carOsc1.connect(engineMixGroup);
        this.nodes.carOsc2.connect(engineMixGroup);
        engineMixGroup.connect(this.nodes.carFilter);
        this.nodes.carRoad.connect(carRoadGain).connect(this.nodes.carFilter);

        this.nodes.carFilter.connect(this.nodes.carGain).connect(this.nodes.master);

        this.nodes.carOsc1.start();
        this.nodes.carOsc2.start();
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

        // Apply Cross-fade (Seamless Loop v23)
        for (let i = 0; i < fadeSize; i++) {
            const alpha = i / fadeSize;
            const head = data[i];
            const tail = data[size - fadeSize + i];

            data[i] = head * alpha + tail * (1 - alpha);
            data[size - fadeSize + i] = tail * alpha + head * (1 - alpha);
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

    // --- HABITS VIEW (List with Weekly Circles) ---

    renderHabitsModule() {
        const container = document.getElementById('all-habits-list');
        if (!container) return;

        const habits = Object.keys(this.state.habitMetadata);
        container.innerHTML = `
            ${habits.map(id => this.renderHabitCard(id)).join('')}
            <div class="add-habit-btn" onclick="app.addCustomHabit()">
                <i class="fas fa-plus-circle"></i> NOVA NAVIKA
            </div>
        `;
    }

    renderHabitCard(id) {
        const meta = this.state.habitMetadata[id] || { name: id, icon: 'fa-star' };
        const data = this.state.habits[id] || [];
        const streak = this.getStreak(id);
        const rate = this.calculateStats(id).completionRate;

        // 7-day range (Friday to Thursday style as in screenshot)
        const days = [];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayShorts = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push({
                date: d.toISOString().split('T')[0],
                label: dayShorts[d.getDay()],
                isToday: i === 0
            });
        }

        return `
            <div class="habit-card list-item" onclick="app.openHabitModal('${id}')">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; width:100%;">
                    <div>
                        <h3 style="font-size:1rem; font-weight:700; color:white; margin-bottom:4px;">${meta.name}</h3>
                        <p style="font-size:0.65rem; color:#ffcc00; font-weight:600; text-transform:uppercase;">EVERY DAY</p>
                    </div>
                    <div class="habit-icon-box" style="width:40px; height:40px; background:rgba(255,255,255,0.03);">
                        <i class="fas ${meta.icon}" style="font-size:1.1rem; color:#ff4d6d;"></i>
                    </div>
                </div>

                <div class="habit-week-circles">
                    ${days.map(day => {
            const active = data.includes(day.date);
            return `
                            <div class="day-circle ${active ? 'active' : ''} ${day.isToday ? 'today' : ''}" 
                                 onclick="event.stopPropagation(); app.toggleHabit('${id}', '${day.date}')"
                                 style="background:${active ? '#00D084' : '#252529'}; border-color:${active ? '#00D084' : 'rgba(255,255,255,0.05)'}">
                                <span style="font-size:0.5rem; margin-bottom:2px; color:var(--text-dim);">${day.label}</span>
                                <strong style="font-size:0.8rem; color:${active ? '#000' : '#fff'};">${day.date.split('-')[2]}</strong>
                            </div>
                        `;
        }).join('')}
                </div>

                <div style="display:flex; gap:15px; margin-top:5px;">
                    <span style="font-size:0.65rem; color:var(--text-dim);"><i class="fas fa-link" style="color:#ff4d6d; margin-right:4px;"></i> ${streak}</span>
                    <span style="font-size:0.65rem; color:var(--text-dim);"><i class="fas fa-circle-check" style="color:#00D084; margin-right:4px;"></i> ${rate}%</span>
                </div>
            </div>
        `;
    }

    // --- HABIT MODAL (Detail View) ---

    openHabitModal(id) {
        const modal = document.getElementById('habit-modal');
        const nameEl = document.getElementById('modal-habit-name');
        const meta = this.state.habitMetadata[id] || { name: id };

        this.state.currentHabitId = id;
        this.state.currentModalTab = 'calendar';
        nameEl.innerText = meta.name;

        this.switchModalTab('calendar');
        modal.style.display = 'block';
    }

    switchModalTab(tabId) {
        this.state.currentModalTab = tabId;

        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.innerText.toLowerCase().includes(tabId === 'stats' ? 'stat' : tabId));
        });

        this.renderHabitDetail(this.state.currentHabitId);
    }

    closeHabitModal() {
        document.getElementById('habit-modal').style.display = 'none';
    }

    renderHabitDetail(id) {
        const container = document.getElementById('modal-habit-content');
        const tab = this.state.currentModalTab;

        if (tab === 'calendar') {
            container.innerHTML = `
                <div class="modal-section" style="text-align:center;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                        <i class="fas fa-chevron-left" style="color:var(--text-dim); cursor:pointer;"></i>
                        <h4 style="color:white; font-size:1.1rem; margin:0;">Ožujak <span style="color:var(--text-dim); font-weight:400;">2026</span></h4>
                        <i class="fas fa-chevron-right" style="color:var(--text-dim); cursor:pointer;"></i>
                    </div>
                    <div class="big-calendar">
                        <div class="cal-day-box lbl">Mon</div><div class="cal-day-box lbl">Tue</div><div class="cal-day-box lbl">Wed</div>
                        <div class="cal-day-box lbl">Thu</div><div class="cal-day-box lbl">Fri</div><div class="cal-day-box lbl">Sat</div><div class="cal-day-box lbl">Sun</div>
                        ${this.generateFullMonthCalendar(id)}
                    </div>
                </div>

                <div class="detail-card-section" style="background:#1a1a1e; border-radius:20px; padding:20px; margin-top:20px; display:flex; align-items:center; gap:20px;">
                    <div style="background:rgba(255,77,109,0.1); width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#ff4d6d;">
                        <i class="fas fa-link"></i>
                    </div>
                    <div>
                        <p style="font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">Streak</p>
                        <h4 style="color:#ff4d6d; font-size:1.2rem; font-weight:800; margin:0;">${this.getStreak(id)} DAYS</h4>
                    </div>
                </div>

                <div class="detail-card-section" style="background:#1a1a1e; border-radius:20px; padding:20px; margin-top:15px; display:flex; align-items:center; gap:20px;">
                    <div style="background:rgba(0,208,132,0.1); width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#00D084;">
                        <i class="fas fa-comment-dots"></i>
                    </div>
                    <div>
                        <p style="font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">Zabilješke</p>
                        <h4 style="color:var(--text-dim); font-size:0.9rem; font-weight:400; margin:0;">Nema zabilješki za ovaj mjesec</h4>
                    </div>
                </div>
            `;
        } else if (tab === 'stats') {
            const stats = this.calculateStats(id);
            container.innerHTML = `
                <div class="modal-section">
                    <h4 style="color:white; margin-bottom:20px;">Statistika Navike</h4>
                    <div class="stats-grid">
                        <div class="stat-box" style="background:#1a1a1e; padding:20px; border-radius:20px; text-align:center;">
                            <span class="val" style="color:#ff4d6d; font-size:1.5rem;">${this.getStreak(id)}</span>
                            <span class="lbl" style="display:block; font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; margin-top:5px;">Streak</span>
                        </div>
                        <div class="stat-box" style="background:#1a1a1e; padding:20px; border-radius:20px; text-align:center;">
                            <span class="val" style="color:#00D084; font-size:1.5rem;">${stats.completionRate}%</span>
                            <span class="lbl" style="display:block; font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; margin-top:5px;">Učestalost</span>
                        </div>
                    </div>
                </div>
            `;
        } else if (tab === 'edit') {
            const meta = this.state.habitMetadata[id];
            container.innerHTML = `
                <div class="modal-section">
                    <h4 style="color:white; margin-bottom:20px;">Uredi Naviku</h4>
                    <div style="background:#1a1a1e; padding:25px; border-radius:20px;">
                        <label style="display:block; font-size:0.7rem; color:var(--text-dim); margin-bottom:10px; text-transform:uppercase;">Naziv cilja</label>
                        <input type="text" id="edit-habit-name" value="${meta.name}" style="width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); padding:15px; border-radius:12px; color:white; margin-bottom:20px;">
                        
                        <label style="display:block; font-size:0.7rem; color:var(--text-dim); margin-bottom:10px; text-transform:uppercase;">Tjedni cilj</label>
                        <select id="edit-habit-goal" style="width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); padding:15px; border-radius:12px; color:white; margin-bottom:30px;">
                            ${[1, 2, 3, 4, 5, 6, 7].map(g => `<option value="${g}" ${meta.goal === g ? 'selected' : ''}>${g} puta tjedno</option>`).join('')}
                        </select>

                        <button onclick="app.saveHabitEdit('${id}')" style="width:100%; background:#ff4d6d; color:white; padding:18px; border-radius:15px; border:none; font-weight:800; cursor:pointer;">SPREMI PROMJENE</button>
                        <button onclick="app.deleteHabit('${id}'); app.closeHabitModal();" style="width:100%; background:none; border:1px solid rgba(255,77,109,0.3); color:#ff4d6d; padding:15px; border-radius:15px; margin-top:15px; font-weight:600; cursor:pointer;">OBRIŠI NAVIKU</button>
                    </div>
                </div>
            `;
        }
    }

    saveHabitEdit(id) {
        const name = document.getElementById('edit-habit-name').value;
        const goal = document.getElementById('edit-habit-goal').value;
        if (name && name.trim()) {
            this.state.habitMetadata[id].name = name.trim();
            this.state.habitMetadata[id].goal = parseInt(goal);
            this.saveAndSync();
            this.refreshUI();
            document.getElementById('modal-habit-name').innerText = name.trim();
            this.switchModalTab('calendar');
        }
    }

    generateFullMonthCalendar(id) {
        const data = this.state.habits[id] || [];
        const today = new Date();
        const daysInMonth = 31; // Simplification for UI
        const html = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `2026-03-${String(i).padStart(2, '0')}`; // Static for demo consistency
            const active = data.includes(dateStr);
            const isToday = i === today.getDate();
            html.push(`<div class="cal-day-box ${active ? 'active' : ''} ${isToday ? 'today' : ''}">${i}</div>`);
        }
        return html.join('');
    }

    toggleHabit(id, date) {
        if (!date) date = new Date().toISOString().split('T')[0];
        if (!this.state.habits[id]) this.state.habits[id] = [];

        if (this.state.habits[id].includes(date)) {
            this.state.habits[id] = this.state.habits[id].filter(d => d !== date);
        } else {
            this.state.habits[id].push(date);
        }

        this.saveAndSync();
        this.refreshUI();
        if (document.getElementById('habit-modal').style.display === 'block') {
            this.renderHabitDetail(id);
        }
    }

    trackHabit(id) {
        const today = new Date().toISOString().split('T')[0];
        if (!this.state.habits[id]) this.state.habits[id] = [];
        if (!this.state.habits[id].includes(today)) {
            this.state.habits[id].push(today);
            this.saveAndSync();
        }
    }

    editHabit(id) {
        const meta = this.state.habitMetadata[id];
        const newGoal = prompt(`Koliko puta tjedno želiš raditi "${meta.name}"? (1-7)`, meta.goal || 7);
        if (newGoal && !isNaN(newGoal)) {
            const goalNum = Math.min(Math.max(parseInt(newGoal), 1), 7);
            this.state.habitMetadata[id].goal = goalNum;
            this.saveAndSync();
            this.renderHabitDetail(id);
        }
    }

    addCustomHabit() {
        const name = prompt("Unesite naziv nove navike:");
        if (name && name.trim()) {
            const id = 'custom_' + Date.now();
            this.state.habitMetadata[id] = { name: name.trim(), icon: 'fa-star', color: '#ffcc00', goal: 7 };
            this.state.habits[id] = [];
            this.saveAndSync();
            this.refreshUI();
        }
    }

    deleteHabit(id) {
        if (confirm("Sigurno želiš obrisati ovu naviku?")) {
            delete this.state.habits[id];
            delete this.state.habitMetadata[id];
            this.saveAndSync();
            this.refreshUI();
        }
    }

    saveAndSync() {
        localStorage.setItem('zp_habits_v11', JSON.stringify(this.state.habits));
        localStorage.setItem('zp_habit_meta_v12', JSON.stringify(this.state.habitMetadata));
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
            await window.ZP_Firebase.saveHabits(user.uid, this.state.habits, this.state.habitMetadata);
        }
    }

    async loadHabitsFromCloud() {
        const user = window.ZP_Firebase ? window.ZP_Firebase.user : null;
        if (user) {
            const data = await window.ZP_Firebase.loadHabits(user.uid);
            if (data && typeof data === 'object') {
                const cloudHabits = data.habits || {};
                const cloudMeta = data.metadata || {};

                // Merge habits
                Object.keys(cloudHabits).forEach(id => {
                    const local = this.state.habits[id] || [];
                    const cloud = cloudHabits[id] || [];
                    this.state.habits[id] = [...new Set([...local, ...cloud])];
                });

                // Merge metadata
                Object.keys(cloudMeta).forEach(id => {
                    if (!this.state.habitMetadata[id]) {
                        this.state.habitMetadata[id] = cloudMeta[id];
                    }
                });

                this.saveAndSync();
                this.refreshUI();
            }
        }
    }
}

// Initialize App
const app = new ZenPauza();

// Global bridge for inline onclicks
window.showModule = (id) => app.showModule(id);
window.hideModule = () => app.hideModule();
