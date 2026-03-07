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
            volumes: { white: 0, pink: 0, brown: 0, car: 0, vacuum: 0 },
            breathing: { active: false, method: 'box', phase: 'inhale', timer: 0 },
            habits: JSON.parse(localStorage.getItem('zp_habits_v11')) || {
                breathing: [], sounds: [], meditation: []
            },
            habitMetadata: JSON.parse(localStorage.getItem('zp_habit_meta_v12')) || {
                breathing: { name: 'Duboko Disanje', icon: 'fa-lungs', color: '#4FACFE', goal: 7 },
                sounds: { name: 'Mirni Zvukovi', icon: 'fa-water', color: '#00D084', goal: 7 },
                meditation: { name: 'Jutarnja Meditacija', icon: 'fa-om', color: '#ff4d6d', goal: 7 }
            }
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
    }

    refreshUI() {
        if (this.state.activeView === 'today') this.renderTodayView();
        if (this.state.activeView === 'habits') this.renderHabitsModule();
    }

    // --- NAVIGATION ---

    switchView(viewId) {
        this.closeHabitModal();
        this.state.activeView = viewId;
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

        const targetView = document.getElementById(`view-${viewId}`);
        const targetBtn = document.getElementById(`nav-${viewId}`);
        if (targetView) targetView.classList.add('active');
        if (targetBtn) targetBtn.classList.add('active');

        if (viewId === 'today') this.renderTodayView();
        if (viewId === 'habits') this.renderHabitsModule();
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

        container.innerHTML = habits.map(id => {
            const meta = this.state.habitMetadata[id] || { name: id, icon: 'fa-star' };
            const data = this.state.habits[id] || [];
            const completed = data.includes(today);

            return `
                <div class="habit-card today-item ${completed ? 'completed' : ''}" onclick="app.openHabitModal('${id}')">
                    <div class="habit-icon-box">
                        <i class="fas ${meta.icon}"></i>
                    </div>
                    <div class="habit-content-main">
                        <h3>${meta.name}</h3>
                        <p>${completed ? 'Završeno' : 'Čeka na tebe'}</p>
                    </div>
                    <button class="habit-check-btn" onclick="event.stopPropagation(); app.toggleTodayHabit('${id}')">
                        <i class="fas ${completed ? 'fa-check' : 'fa-plus'}"></i>
                    </button>
                </div>
            `;
        }).join('');
    }

    toggleTodayHabit(id) {
        this.toggleHabit(id, new Date().toISOString().split('T')[0]);
        this.renderTodayView();
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

    // --- HABITS VIEW (List with Weekly Circles) ---

    renderHabitsModule() {
        const container = document.getElementById('all-habits-list');
        if (!container) return;

        const habits = Object.keys(this.state.habitMetadata);
        container.innerHTML = `
            <div class="habits-list-v14">
                ${habits.map(id => this.renderHabitCard(id)).join('')}
                <button class="add-habit-btn" onclick="app.addCustomHabit()" style="width:100%; margin-top:10px;">
                    <i class="fas fa-plus"></i> NOVA NAVIKA
                </button>
            </div>
        `;
    }

    renderHabitCard(id) {
        const meta = this.state.habitMetadata[id] || { name: id, icon: 'fa-star' };
        const data = this.state.habits[id] || [];
        const streak = this.getStreak(id);

        // 7-day range (Friday to Thursday style as in screenshot)
        const days = [];
        const dayNames = ['N', 'P', 'U', 'S', 'Č', 'P', 'S'];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push({
                date: d.toISOString().split('T')[0],
                label: dayNames[d.getDay()],
                isToday: i === 0
            });
        }

        return `
            <div class="habit-card list-item" onclick="app.openHabitModal('${id}')">
                <div class="habit-header">
                    <div class="habit-info">
                        <h3><i class="fas ${meta.icon}"></i> ${meta.name}</h3>
                    </div>
                    <div class="stat-pill"><i class="fas fa-fire"></i> ${streak}d</div>
                </div>
                
                <div class="habit-week-circles">
                    ${days.map(day => {
            const active = data.includes(day.date);
            return `
                            <div class="day-circle ${active ? 'active' : ''} ${day.isToday ? 'today' : ''}" 
                                 onclick="event.stopPropagation(); app.toggleHabit('${id}', '${day.date}')">
                                <span>${day.label}</span>
                                <strong>${day.date.split('-')[2]}</strong>
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
        `;
    }

    // --- HABIT MODAL (Detail View) ---

    openHabitModal(id) {
        const modal = document.getElementById('habit-modal');
        const nameEl = document.getElementById('modal-habit-name');
        const meta = this.state.habitMetadata[id] || { name: id };

        nameEl.innerText = meta.name;
        this.renderHabitDetail(id);
        modal.style.display = 'block';
    }

    closeHabitModal() {
        document.getElementById('habit-modal').style.display = 'none';
    }

    renderHabitDetail(id) {
        const container = document.getElementById('modal-habit-content');
        const data = this.state.habits[id] || [];
        const meta = this.state.habitMetadata[id] || { goal: 7 };
        const streak = this.getStreak(id);
        const rate = this.calculateStats(id).completionRate;
        const goal = meta.goal || 7;

        container.innerHTML = `
            <div class="modal-section">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                    <h4>Cilj i Statistika</h4>
                    <button class="edit-goal-btn" onclick="app.editHabit('${id}')" style="background:none; border:1px solid rgba(255,255,255,0.2); color:white; padding:5px 10px; border-radius:8px; font-size:0.7rem;">
                        <i class="fas fa-edit"></i> UREDI CILJ
                    </button>
                </div>
                <div class="stats-grid">
                    <div class="stat-box">
                        <span class="val">${streak} dana</span>
                        <span class="lbl">Trenutni Streak</span>
                    </div>
                    <div class="stat-box">
                        <span class="val">${goal}x tjedno</span>
                        <span class="lbl">Tvoj Cilj</span>
                    </div>
                </div>
                <div style="margin-top:15px; background:rgba(255,255,255,0.03); padding:15px; border-radius:12px; text-align:center;">
                    <span class="val" style="display:block; font-size:1.5rem; font-weight:800; color:#00D084;">${rate}%</span>
                    <span class="lbl" style="font-size:0.7rem; color:var(--text-dim);">Mjesečni prosjek</span>
                </div>
            </div>

            <div class="modal-section">
                <h4>Kalendar (Srpanj)</h4>
                <div class="big-calendar">
                    ${this.generateFullMonthCalendar(id)}
                </div>
            </div>
            
            <button class="delete-habit-btn" onclick="app.deleteHabit('${id}'); app.closeHabitModal();" style="margin-top:20px; color:#ff4d6d;">
                <i class="fas fa-trash"></i> OBRIŠI NAVIKU
            </button>
        `;
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
