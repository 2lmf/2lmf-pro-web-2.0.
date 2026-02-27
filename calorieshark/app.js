// --- STATE MANAGEMENT ---
let userProfile = {
    username: '',
    email: '',
    gender: 'male',
    age: 30,
    height: 180,
    weight: 85,
    tdee: 2500,
    dietPrefs: {
        vege: false,
        vegan: false,
        glutenFree: false
    }
};

let visionEnergy = {
    charges: 3,
    lastUsed: null // Timestamp of last deduction
};

// Daily Data
let dailyData = {
    totalKcal: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
    meals: []
};


// --- CONFIGURATION ---
// Povezano sa tvojim Google Apps Scriptom
const API_URL = 'https://script.google.com/macros/s/AKfycbzydHpTGEyigElRio20Il0ga_S4awAnAlvrijkIFw789yc7xIDr40_q-OpcySKungel/exec';

// --- DOM ELEMENTS ---
const screens = {
    onboarding: document.getElementById('screenOnboarding'),
    dashboard: document.getElementById('screenDashboard'),
    stats: document.getElementById('screenStats'),
    settings: document.getElementById('screenSettings')
};

const fabCamera = document.getElementById('fabCamera');
const inpCamera = document.getElementById('inpCamera');
const mealsList = document.getElementById('mealsList');
const textInputBar = document.getElementById('textInputBar');
const inpTextMeal = document.getElementById('inpTextMeal');
const btnSendText = document.getElementById('btnSendText');
const btnVoice = document.getElementById('btnVoice');

// Exercise Modul DOM
const btnAddExercise = document.getElementById('btnAddExercise');
const exerciseModal = document.getElementById('exerciseModal');
const exerciseSelect = document.getElementById('exerciseSelect');
const exerciseDesc = document.getElementById('exerciseDesc');
const inpExerciseDuration = document.getElementById('inpExerciseDuration');
const lblExercisePreview = document.getElementById('lblExercisePreview');
const lblExerciseInputTitle = document.getElementById('lblExerciseInputTitle');
const exercisePillButtons = document.getElementById('exercisePillButtons');
const btnCancelExercise = document.getElementById('btnCancelExercise');
const btnConfirmExercise = document.getElementById('btnConfirmExercise');
const btnsDuration = document.querySelectorAll('.btn-duration');

// Cropper DOM Elements
const cropModal = document.getElementById('cropModal');
const cropImage = document.getElementById('cropImage');
const btnCancelCrop = document.getElementById('btnCancelCrop');
const btnConfirmCrop = document.getElementById('btnConfirmCrop');
let cropperInstance = null;

// --- API RATE LIMITING ---
let isCooldown = false;

function startCooldown() {
    isCooldown = true;
    let timeLeft = 15;

    // Spremi originalne izglede
    const origPlaceholder = inpTextMeal.placeholder;
    const origCropBtnHtml = btnConfirmCrop.innerHTML;

    // Zaključaj tipke i postavi sivilo/neklikanje
    btnSendText.disabled = true;
    btnSendText.style.pointerEvents = 'none';
    btnConfirmCrop.disabled = true;
    btnConfirmCrop.style.pointerEvents = 'none';
    btnVoice.disabled = true;
    btnVoice.style.opacity = '0.5';
    btnVoice.style.pointerEvents = 'none';
    inpTextMeal.disabled = true;
    inpCamera.disabled = true;
    fabCamera.style.opacity = '0.5';
    fabCamera.style.pointerEvents = 'none';

    // Prvi render tick
    inpTextMeal.placeholder = `Hlađenje sustava: ${timeLeft}s...`;
    btnConfirmCrop.innerHTML = `<i class="fas fa-snowflake"></i> HLAĐENJE <span style="color:#FF2A2A;">${timeLeft}s</span>`;

    const timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            isCooldown = false;

            // Otključaj tipke
            btnSendText.disabled = false;
            btnSendText.style.pointerEvents = 'auto';
            btnConfirmCrop.disabled = false;
            btnConfirmCrop.style.pointerEvents = 'auto';
            btnVoice.disabled = false;
            btnVoice.style.opacity = '1';
            btnVoice.style.pointerEvents = 'auto';
            inpTextMeal.disabled = false;
            inpCamera.disabled = false;
            fabCamera.style.opacity = '1';
            fabCamera.style.pointerEvents = 'auto';

            inpTextMeal.placeholder = origPlaceholder;
            btnConfirmCrop.innerHTML = origCropBtnHtml;
        } else {
            inpTextMeal.placeholder = `Hlađenje sustava: ${timeLeft}s...`;
            btnConfirmCrop.innerHTML = `<i class="fas fa-snowflake"></i> HLAĐENJE <span style="color:#FF2A2A;">${timeLeft}s</span>`;
        }
    }, 1000);
}

// PWA Install Prompt
let deferredPrompt;
const installModal = document.getElementById('installModal');
const btnCancelInstall = document.getElementById('btnCancelInstall');
const btnConfirmInstall = document.getElementById('btnConfirmInstall');

// --- INITIALIZATION ---
function init() {
    registerServiceWorker();
    loadDailyData();
    loadProfile();
    loadVisionEnergy();
    initExerciseModal();
    bindEvents();

    // Start energy regeneration loop
    setInterval(checkVisionEnergy, 60000); // Check every minute
}

function loadVisionEnergy() {
    const saved = localStorage.getItem('calorieShark_vision_energy');
    if (saved) {
        visionEnergy = JSON.parse(saved);
    }
    checkVisionEnergy();
}

function checkVisionEnergy() {
    if (visionEnergy.charges < 3 && visionEnergy.lastUsed) {
        const now = new Date().getTime();
        const diffMs = now - visionEnergy.lastUsed;
        const diffMins = Math.floor(diffMs / 60000);

        // 20 minutes to regenerate 1 charge
        if (diffMins >= 20) {
            const chargesToAdd = Math.floor(diffMins / 20);
            visionEnergy.charges = Math.min(3, visionEnergy.charges + chargesToAdd);

            if (visionEnergy.charges < 3) {
                // If not full, advance the lastUsed timestamp to the point where the last charge regenerated
                visionEnergy.lastUsed += chargesToAdd * 20 * 60000;
            } else {
                visionEnergy.lastUsed = null; // Full
            }
            saveVisionEnergy();
        }
    }
    renderVisionEnergy();
}

function useVisionEnergy() {
    if (visionEnergy.charges > 0) {
        visionEnergy.charges--;
        if (!visionEnergy.lastUsed) {
            visionEnergy.lastUsed = new Date().getTime(); // Start the timer if it wasn't running
        }
        saveVisionEnergy();
        renderVisionEnergy();
        return true;
    }
    return false;
}

function saveVisionEnergy() {
    localStorage.setItem('calorieShark_vision_energy', JSON.stringify(visionEnergy));
}

function renderVisionEnergy() {
    const bolts = document.querySelectorAll('.energy-bolt');
    bolts.forEach((bolt, index) => {
        if (index < visionEnergy.charges) {
            bolt.classList.remove('used');
        } else {
            bolt.classList.add('used');
        }
    });
}

function loadDailyData() {
    const saved = localStorage.getItem('calorieShark_daily');
    const today = new Date().toLocaleDateString('hr-HR');

    if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.date === today) {
            dailyData = parsed.data;
            // Migracija unazad (ako netko već ima spremljeno bez totalBurned)
            if (typeof dailyData.totalBurned === 'undefined') {
                dailyData.totalBurned = 0;
            }
        } else {
            // Novi dan, resetiraj
            dailyData = { totalKcal: 0, carbs: 0, protein: 0, fat: 0, totalBurned: 0, meals: [] };
        }
    } else {
        dailyData = { totalKcal: 0, carbs: 0, protein: 0, fat: 0, totalBurned: 0, meals: [] };
    }
}

function saveDailyData() {
    const today = new Date().toLocaleDateString('hr-HR');
    localStorage.setItem('calorieShark_daily', JSON.stringify({
        date: today,
        data: dailyData
    }));
}

function loadProfile() {
    const saved = localStorage.getItem('calorieShark_profile');

    if (saved) {
        userProfile = JSON.parse(saved);

        // Populate inputs if they go back to settings
        document.getElementById('inpUsername').value = userProfile.username || '';
        document.getElementById('inpEmail').value = userProfile.email || '';
        document.getElementById('inpAge').value = userProfile.age || 30;
        document.getElementById('inpHeight').value = userProfile.height || 180;
        document.getElementById('inpWeight').value = userProfile.weight || 85;

        // Populate active gender
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            if (btn.dataset.gender === userProfile.gender) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Populate checkboxes
        if (userProfile.dietPrefs) {
            document.getElementById('chkSettingsVege').checked = userProfile.dietPrefs.vege || false;
            document.getElementById('chkSettingsVegan').checked = userProfile.dietPrefs.vegan || false;
            document.getElementById('chkSettingsGlutenFree').checked = userProfile.dietPrefs.glutenFree || false;
        }

        showScreen('dashboard');
        updateDashboardUI();
    } else {
        showScreen('onboarding');
    }
}

function bindEvents() {
    // Gender Toggles
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            userProfile.gender = e.target.dataset.gender;
        });
    });

    // Save Profile
    document.getElementById('btnSaveProfile').addEventListener('click', () => {
        const usernameVal = document.getElementById('inpUsername').value.trim();
        const emailVal = document.getElementById('inpEmail').value.trim();

        if (!usernameVal || !emailVal) {
            alert("Molimo unesite korisničko ime i e-mail adresu!");
            return;
        }

        userProfile.username = usernameVal;
        userProfile.email = emailVal;
        userProfile.age = parseInt(document.getElementById('inpAge').value);
        userProfile.height = parseInt(document.getElementById('inpHeight').value);
        userProfile.weight = parseFloat(document.getElementById('inpWeight').value);

        // Save Onboarding Diet Prefs
        const chkVege = document.getElementById('chkOnbVege');
        const chkVegan = document.getElementById('chkOnbVegan');
        const chkGluten = document.getElementById('chkOnbGlutenFree');

        userProfile.dietPrefs = {
            vege: chkVege ? chkVege.checked : false,
            vegan: chkVegan ? chkVegan.checked : false,
            glutenFree: chkGluten ? chkGluten.checked : false
        };

        calculateTDEE();
        localStorage.setItem('calorieShark_profile', JSON.stringify(userProfile));

        showScreen('dashboard');
        updateDashboardUI();
    });

    // Camera FAB
    fabCamera.addEventListener('click', () => {
        inpCamera.click();
    });

    inpCamera.addEventListener('change', handleImageUpload);

    // Settings Button
    document.getElementById('btnSettings').addEventListener('click', () => {
        // Pre-fill with current profile
        document.getElementById('inpSettingsUsername').value = userProfile.username;
        document.getElementById('inpSettingsEmail').value = userProfile.email || '';
        document.getElementById('inpSettingsAge').value = userProfile.age;
        document.getElementById('inpSettingsHeight').value = userProfile.height;
        document.getElementById('inpSettingsWeight').value = userProfile.weight;

        const toggleBtns = document.querySelectorAll('#settingsToggleGroup .toggle-btn');
        toggleBtns.forEach(btn => {
            if (btn.dataset.gender === userProfile.gender) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        showScreen('settings');
    });

    // Handle Setting Gender Toggles
    const settingsToggleBtns = document.querySelectorAll('#settingsToggleGroup .toggle-btn');
    settingsToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            settingsToggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Save Settings Button
    document.getElementById('btnSaveSettings').addEventListener('click', () => {
        const un = document.getElementById('inpSettingsUsername').value.trim();
        const em = document.getElementById('inpSettingsEmail').value.trim();
        const a = parseInt(document.getElementById('inpSettingsAge').value);
        const h = parseInt(document.getElementById('inpSettingsHeight').value);
        const w = parseFloat(document.getElementById('inpSettingsWeight').value);
        const activeBtn = document.querySelector('#settingsToggleGroup .toggle-btn.active');
        const g = activeBtn ? activeBtn.dataset.gender : 'male';

        if (!un || !em) { alert('Unesi korisničko ime i e-mail!'); return; }

        userProfile = { username: un, email: em, age: a, height: h, weight: w, gender: g };

        // Save Diet Prefs from settings
        const chkVege = document.getElementById('chkSettingsVege');
        const chkVegan = document.getElementById('chkSettingsVegan');
        const chkGluten = document.getElementById('chkSettingsGlutenFree');

        userProfile.dietPrefs = {
            vege: chkVege ? chkVege.checked : false,
            vegan: chkVegan ? chkVegan.checked : false,
            glutenFree: chkGluten ? chkGluten.checked : false
        };

        calculateTDEE();
        localStorage.setItem('calorieShark_profile', JSON.stringify(userProfile));

        showScreen('dashboard');
        updateDashboardUI();
    });

    // Stats Button
    const btnStats = document.getElementById('btnStats');
    if (btnStats) {
        btnStats.addEventListener('click', () => {
            showScreen('stats');
            fetchAndRenderHistory();
        });
    }

    // Text & Voice Input
    btnSendText.addEventListener('click', () => {
        if (isCooldown) return;
        const text = inpTextMeal.value.trim();
        if (text) {
            handleTextUpload(text);
        }
    });

    inpTextMeal.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (isCooldown) return;
            const text = inpTextMeal.value.trim();
            if (text) {
                handleTextUpload(text);
            }
        }
    });

    btnVoice.addEventListener('click', (e) => {
        if (isCooldown) return;
        handleVoiceInput(e);
    });

    setupExerciseEvents();
}

// --- CORE LOGIC ---
function calculateTDEE() {
    // Mifflin-St Jeor Equation
    let bmr = (10 * userProfile.weight) + (6.25 * userProfile.height) - (5 * userProfile.age);
    bmr += (userProfile.gender === 'male') ? 5 : -161;

    // Light activity multiplier as default for modern office workers
    userProfile.tdee = Math.round(bmr * 1.375);
}

function showScreen(screenId) {
    Object.values(screens).forEach(s => s.classList.add('hidden'));
    document.getElementById('fabContainer').classList.add('hidden'); // Hide the new container
    fabCamera.classList.add('hidden');
    textInputBar.classList.add('hidden');

    if (screenId === 'dashboard') {
        screens.dashboard.classList.remove('hidden');
        fabCamera.classList.remove('hidden');
        document.getElementById('fabContainer').classList.remove('hidden'); // Show container instead of just fab
        textInputBar.classList.remove('hidden');
    } else if (screenId === 'onboarding') {
        screens.onboarding.classList.remove('hidden');
    } else if (screenId === 'stats') {
        screens.stats.classList.remove('hidden');
        // Dodajemo mali back button efekt na top-nav logo klikom (povratak na dashboard)
        document.querySelector('.brand-text').onclick = () => showScreen('dashboard');
        document.querySelector('.brand-text').style.cursor = 'pointer';
    } else if (screenId === 'settings') {
        screens.settings.classList.remove('hidden');
    }
}

// PWA Service Worker & Install Logic
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service Worker Registriran'))
            .catch(err => console.error('Service Worker Greska:', err));
    }
}

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent default Chrome mini-infobar
    e.preventDefault();
    deferredPrompt = e;

    // Show our custom modal if they haven't installed it
    setTimeout(() => {
        installModal.classList.remove('hidden');
    }, 2000); // Pokazi 2 sekunde nakon loada
});

if (btnCancelInstall && btnConfirmInstall) {
    btnCancelInstall.addEventListener('click', () => {
        installModal.classList.add('hidden');
        deferredPrompt = null;
    });

    btnConfirmInstall.addEventListener('click', async () => {
        installModal.classList.add('hidden');
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            // We've used the prompt, and can't use it again, throw it away
            deferredPrompt = null;
        }
    });
}

function updateDashboardUI() {
    // Dynamic Date Update
    const lblDateToday = document.getElementById('lblDateToday');
    if (lblDateToday) {
        const now = new Date();
        const options = { day: 'numeric', month: 'long' };
        let dateStr = now.toLocaleDateString('hr-HR', options).toUpperCase();
        // Ensure format is "DANAS, 26. VELJAČE"
        lblDateToday.textContent = `DANAS, ${dateStr}`;
    }

    const burned = dailyData.totalBurned || 0;
    const target = userProfile.tdee; // NO INCREASING TARGET TDEE

    document.getElementById('lblKcalTarget').textContent = target;

    // Exercise UI
    const lblKcalBurned = document.getElementById('lblKcalBurned');
    const lblBurnedVal = document.getElementById('lblBurnedVal');
    if (burned > 0) {
        lblKcalBurned.classList.remove('hidden');
        lblBurnedVal.textContent = Math.round(burned);
    } else {
        lblKcalBurned.classList.add('hidden');
    }

    // Update graphic ring
    const radius = 45;
    const circumference = 2 * Math.PI * radius; // ~283
    const percentEaten = Math.min(dailyData.totalKcal / target, 1);
    const offset = circumference - (percentEaten * circumference);

    const progressCircle = document.getElementById('kcalProgress');
    progressCircle.style.strokeDashoffset = offset;

    const burnedTrack = document.getElementById('kcalBurnedTrack');
    if (burned > 0) {
        const pctBurned = Math.min(burned / target, 1); // Ne pokazuj preko 100% tdee prstena u zelenoj
        burnedTrack.style.strokeDasharray = `${pctBurned * circumference} ${circumference}`;
        burnedTrack.style.strokeDashoffset = `0`;
        burnedTrack.style.transform = `none`;
    } else {
        burnedTrack.style.strokeDasharray = `0 ${circumference}`;
        burnedTrack.style.strokeDashoffset = `0`;
        burnedTrack.style.transform = `none`;
    }

    // Color logic
    if (percentEaten > 1.0) progressCircle.style.stroke = '#FF2A2A'; // Red if over
    else progressCircle.style.stroke = 'var(--accent-cyan)';

    // Ažuriranje brojčanih iznosa makrosa na UI (tako da kod ponovnog ulaska nema nula)
    document.getElementById('lblKcalEaten').textContent = Math.round(dailyData.totalKcal);
    document.getElementById('lblCarbs').textContent = Math.round(dailyData.carbs) + "g";
    document.getElementById('lblProtein').textContent = Math.round(dailyData.protein) + "g";
    document.getElementById('lblFat').textContent = Math.round(dailyData.fat) + "g";

    // Prikaz Shark Advisora
    renderSharkAdvisor();

    // Obavezno iscrtaj povijest
    renderDailyMeals();
}

function renderSharkAdvisor() {
    const list = document.getElementById('advisorSuggestionsList');
    if (!list) return;

    if (!advisorMeals || advisorMeals.length === 0) {
        list.innerHTML = `<p style="font-size:0.8rem; color:var(--text-muted); text-align:center;">Baza savjeta je trenutno prazna.</p>`;
        return;
    }

    const burned = dailyData.totalBurned || 0;
    const target = userProfile.tdee;
    const remainingKcal = Math.max(0, target - dailyData.totalKcal + burned);

    document.getElementById('lblAdvisorTarget').textContent = Math.round(remainingKcal);

    // Filtriranje prema dijetalnim opcijama
    let validMeals = advisorMeals.filter(meal => {
        if (meal.kcal > remainingKcal + 100) return false; // Ne nudimo jela puno veca od budzeta

        if (userProfile.dietPrefs) {
            if (userProfile.dietPrefs.vege && !meal.tags.includes("vege")) return false;
            if (userProfile.dietPrefs.vegan && !meal.tags.includes("vegan")) return false;
            if (userProfile.dietPrefs.glutenFree && !meal.tags.includes("glutenFree")) return false;
        }
        return true;
    });

    // Ako smo previše filtera stavili i nema nicega, ublazavamo samo budzetom
    if (validMeals.length === 0) {
        validMeals = advisorMeals.filter(meal => meal.kcal <= remainingKcal + 100);
    }

    // Odaberi 3 random opcije
    let shownMeals = [];
    if (validMeals.length <= 3) {
        shownMeals = validMeals;
    } else {
        const shuffled = [...validMeals].sort(() => 0.5 - Math.random());
        shownMeals = shuffled.slice(0, 3);
    }

    if (shownMeals.length === 0) {
        list.innerHTML = `<p style="font-size:0.85rem; color:var(--text-muted); text-align:center;">Nemam ti što ponuditi za preostali budžet. Popij vodu!</p>`;
        return;
    }

    let html = '';
    shownMeals.forEach(meal => {
        // Iscrtavanje bedzeva za tagove
        let tagsHtml = '';
        meal.tags.forEach(t => {
            if (t === 'vege') tagsHtml += `<span style="background:rgba(0,208,132,0.1); color:#00D084; padding:2px 6px; border-radius:10px; font-size:0.65rem; margin-right:4px;">Vege</span>`;
            if (t === 'vegan') tagsHtml += `<span style="background:rgba(0,255,100,0.1); color:#00FF64; padding:2px 6px; border-radius:10px; font-size:0.65rem; margin-right:4px;">Vegan</span>`;
            if (t === 'glutenFree') tagsHtml += `<span style="background:rgba(255,165,0,0.1); color:var(--accent-orange); padding:2px 6px; border-radius:10px; font-size:0.65rem; margin-right:4px;">GF</span>`;
        });

        html += `
        <div style="background: var(--bg-card); border-radius: 8px; padding: 10px; display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                    <h4 style="margin:0; font-size:0.95rem; color:var(--text-main);">${meal.name}</h4>
                    <div style="margin-top:4px;">${tagsHtml}</div>
                </div>
                <div style="text-align:right;">
                    <div style="color:var(--accent-cyan); font-weight:bold; font-size:0.9rem;">${meal.kcal} kcal</div>
                    <div style="font-size:0.7rem; color:var(--text-muted);">P:${meal.protein}g C:${meal.carbs}g F:${meal.fat}g</div>
                </div>
            </div>
            <p style="margin:0; font-size:0.8rem; color:var(--text-muted); font-style:italic;">${meal.recipe}</p>
        </div>
        `;
    });

    list.innerHTML = html;
}

async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!useVisionEnergy()) {
        alert("Sharks are resting! Ponestalo ti je energije za skeniranje. Pokušaj malo kasnije ili unesi tekstualno.");
        e.target.value = ''; // Reset
        return;
    }

    if (!API_URL) {
        alert("Molimo unesite Google Apps Script Web App URL u postavkama!");
        showScreen('onboarding');
        return;
    }

    // Prikaz Crop Modala
    const reader = new FileReader();
    reader.onload = function (event) {
        cropImage.src = event.target.result;
        cropModal.classList.remove('hidden');

        if (cropperInstance) {
            cropperInstance.destroy();
        }

        cropperInstance = new Cropper(cropImage, {
            viewMode: 1,
            dragMode: 'move',
            autoCropArea: 0.8,
            restore: false,
            guides: true,
            center: true,
            highlight: false,
            cropBoxMovable: true,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: false,
        });
    };
    reader.readAsDataURL(file);
}

// Otkazivanje Croppera
btnCancelCrop.addEventListener('click', () => {
    cropModal.classList.add('hidden');
    if (cropperInstance) cropperInstance.destroy();
    inpCamera.value = ''; // Resetiraj input da se može opet kliknuti
});

// Potvrda Croppera i Slanje na AI
btnConfirmCrop.addEventListener('click', async () => {
    if (!cropperInstance) return;
    if (isCooldown) return;

    // Uzmi izrezani dio
    const canvas = cropperInstance.getCroppedCanvas({
        maxWidth: 1024,
        maxHeight: 1024
    });

    const croppedBase64 = canvas.toDataURL('image/jpeg', 0.8);

    // Sakrij modal i očisti
    cropModal.classList.add('hidden');
    cropperInstance.destroy();
    inpCamera.value = '';

    // Skeleton loading UI
    mealsList.innerHTML = `<div class="empty-state" style="color:var(--accent-cyan);"><i class="fas fa-spinner fa-spin"></i><p>Šaljem izrezanu sliku na AI analizu...</p></div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Prekidač za hlađenje prije slanja na API
    startCooldown();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                action: 'analyzeImage',
                imageBase64: croppedBase64 // Šaljemo izrezani base64 umjesto originala
            })
        });

        const responseText = await response.text();
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            throw new Error("Losa struktura odgovora: " + responseText.substring(0, 100));
        }

        if (result.status === 'success') {
            renderAIResult(result.data);
        } else {
            throw new Error(result.message || "Nepoznata greska s API-ja");
        }

    } catch (err) {
        console.error("Greska pri uploadu okrnjene slike:", err);
        mealsList.innerHTML = `<div class="empty-state" style="color:#FF2A2A;"><i class="fas fa-exclamation-triangle"></i><p>Greska: ${err.message}</p></div>`;
    }
});



// Tekstualni i Glasovni "Upload"
async function handleTextUpload(text) {
    if (!API_URL) {
        alert("Nije postavljen sustav (Google API_URL). Vratite se na postavke onboardinga.");
        return;
    }

    inpTextMeal.value = "";

    // --- OFFLINE AI PROVJERA ---
    // Ako postoji funkcija iz food_database.js, prvo dajemo njoj šansu!
    if (typeof searchLocalFoodDB === 'function') {
        const localHit = searchLocalFoodDB(text);

        if (localHit) {
            window.scrollTo({ top: 0, behavior: 'smooth' });

            const fakeAPIResponse = {
                items: [
                    {
                        name: localHit.name,
                        estimatedWeightG: localHit.estimatedWeightG,
                        kcalPer100g: localHit.kcalPer100g,
                        macrosPer100g: localHit.macrosPer100g
                    }
                ]
            };

            // Trenutno prebacivanje u UI (bez ikakvih napomena i čekanja)
            renderAIResult(fakeAPIResponse);
            return; // Prekini, NE ŠALJI na Google API! Tvoj novčanik je spašen.
        }
    }

    // --- GOOGLE GEMINI AI (Ako lokalna baza ne zna što je to) ---
    mealsList.innerHTML = `<div class="empty-state" style="color:var(--accent-cyan);"><i class="fas fa-spinner fa-spin"></i><p>Pitam Gemini AI za: ${text}...</p></div>`;

    // Scrolaj na vrh
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Prekidač za hlađenje
    startCooldown();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                action: 'analyzeMeal',
                textDescription: text
            })
        });

        const responseText = await response.text();
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            throw new Error("Losa struktura odgovora: " + responseText.substring(0, 100));
        }

        if (result.status === 'success') {
            renderAIResult(result.data);
        } else {
            throw new Error(result.message || "Nepoznata greska s API-ja");
        }

    } catch (err) {
        console.error("Greska pri uploadu teksta:", err);
        mealsList.innerHTML = `<div class="empty-state" style="color:#FF2A2A;"><i class="fas fa-exclamation-triangle"></i><p>AI greška: ${err.message}</p></div>`;
    }
}

// Web Speech API
function handleVoiceInput() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("Žao mi je, vaš preglednik ne podržava glasovni unos. (Pokušajte Chrome ili Safari).");
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'hr-HR'; // Hrvatski jezik po defaultu
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function () {
        btnVoice.classList.add('recording-pulse');
        inpTextMeal.placeholder = "Slušam... Pričaj sada!";
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        inpTextMeal.value = transcript;

        // Automatski pošalji text na analizu ako je uspjesno prepoznao
        setTimeout(() => {
            handleTextUpload(transcript);
        }, 800);
    };

    recognition.onspeechend = function () {
        recognition.stop();
        btnVoice.classList.remove('recording-pulse');
        inpTextMeal.placeholder = "Upiši ili izgovori obrok...";
    };

    recognition.onerror = function (event) {
        btnVoice.classList.remove('recording-pulse');
        inpTextMeal.placeholder = "Greška s mikrofonom. Pokušaj ponovno.";
        console.error("Speech recognition error", event.error);
    };

    recognition.start();
}

function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

let currentUnsavedMeal = null;
let editingMealIndex = null; // Zastavica za cuvanje id-a kod re-edita

function renderAIResult(aiJson) {
    if (!aiJson || !aiJson.items || aiJson.items.length === 0) {
        mealsList.innerHTML = `<div class="empty-state"><i class="fas fa-question-circle"></i><p>Nisam uspio prepoznati hranu. Pokušaj ponovno s jasnijom slikom.</p></div>`;
        return;
    }

    currentUnsavedMeal = aiJson;
    drawPendingMealUI();
}

function drawPendingMealUI() {
    let html = '';
    let totalKcal = 0;

    currentUnsavedMeal.items.forEach((item, index) => {
        // Izračun trenutnih kalorija na bazi procijenjene gramaže
        const factor = item.estimatedWeightG / 100;
        const currentKcal = Math.round(item.kcalPer100g * factor);
        totalKcal += currentKcal;

        html += `
        <div class="meal-item-editor" style="background: rgba(255,255,255,0.05); padding:15px; border-radius:8px; margin-bottom:10px; border-left: 3px solid var(--accent-orange);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <strong>${item.name}</strong>
                <span style="color:var(--accent-cyan); font-weight:bold;">${currentKcal} kcal</span>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
                <label style="font-size:0.8rem; color:var(--text-muted);">Gramaža:</label>
                <input type="number" class="gram-input" data-index="${index}" value="${item.estimatedWeightG}" style="width:70px; padding:5px; border-radius:4px; border:1px solid var(--border-color); background:#FAFCFF; color:#2C3E50; text-align:center;">
                <span style="font-size:0.8rem; color:var(--text-muted);">g (AI procijenio)</span>
            </div>
        </div>`;
    });

    const isExercise = totalKcal < 0;
    const headerTitle = isExercise ? "ZABILJEŽI TRENING" : "AI ANALIZA OBROKA";
    const headerIcon = isExercise ? "fa-running" : "fa-robot";
    const confirmBtnTxt = isExercise ? "SPREMI TRENING" : "SPREMI U DNEVNIK";

    // Ubacujemo dinamični naslov na dno nakon zbrajanja
    let finalHtml = `<div class="pending-meal">
        <h3 style="color:${isExercise ? '#00D084' : 'var(--accent-cyan)'}; margin-bottom:15px;"><i class="fas ${headerIcon}"></i> ${headerTitle}</h3>
        ${html}
        <div style="display:flex; justify-content:space-between; align-items:center; margin: 20px 0; padding-top:15px; border-top: 1px solid var(--border-color);">
            <strong style="font-size:1.2rem;">UKUPNO:</strong>
            <strong style="font-size:1.5rem; color:${isExercise ? '#00D084' : 'var(--accent-orange)'};">${Math.abs(totalKcal)} kcal</strong>
        </div>
        <button id="btnConfirmMeal" class="primary-btn" style="background:${isExercise ? '#00D084' : 'var(--accent-orange)'};"><i class="fas fa-check"></i> ${confirmBtnTxt}</button>
        <button id="btnCancelMeal" class="icon-btn" style="width:100%; margin-top:10px; color:var(--text-muted); font-size:1rem;"><i class="fas fa-times"></i> Odbaci</button>
    </div>`;

    mealsList.innerHTML = finalHtml;

    // Attach Listeners za mjenjanje gramaže
    document.querySelectorAll('.gram-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const idx = e.target.getAttribute('data-index');
            const newGrams = parseInt(e.target.value) || 0;
            currentUnsavedMeal.items[idx].estimatedWeightG = newGrams;
            drawPendingMealUI(); // Re-render to update calculations
        });
    });

    document.getElementById('btnConfirmMeal').addEventListener('click', saveMealToServer);
    document.getElementById('btnCancelMeal').addEventListener('click', () => {
        currentUnsavedMeal = null;
        editingMealIndex = null;
        renderDailyMeals(); // Osvjezi trenutnu listu i povrati stari obrok (ako editiramo)
        updateDashboardUI();
    });
}

async function saveMealToServer() {
    const btn = document.getElementById('btnConfirmMeal');
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> SPREMAM...`;
    btn.disabled = true;

    // Preracunavanje totala makrosa
    let totals = { kcal: 0, carbs: 0, protein: 0, fat: 0 };
    currentUnsavedMeal.items.forEach(item => {
        const factor = item.estimatedWeightG / 100;
        totals.kcal += item.kcalPer100g * factor;
        if (item.macrosPer100g) {
            totals.carbs += (item.macrosPer100g.carbs || 0) * factor;
            totals.protein += (item.macrosPer100g.protein || 0) * factor;
            totals.fat += (item.macrosPer100g.fat || 0) * factor;
        }
    });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // Izbjegava CORS preflight
            body: JSON.stringify({
                action: 'saveMeal',
                username: userProfile.username,
                userInfo: userProfile,
                mealData: {
                    items: currentUnsavedMeal.items,
                    totals: totals
                }
            })
        });

        const responseText = await response.text();
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            throw new Error("Neispravan odgovor sa servera: " + responseText.substring(0, 100));
        }

        if (result.status === 'success') {

            // U slucaju da editiramo postojeci obrok, tek SADA nakon uspjeha Brisemo onaj sa starog indexa!
            if (editingMealIndex !== null) {
                deleteMeal(editingMealIndex, true); // (index, skipRender) -> istina
                editingMealIndex = null;
            }

            applyMealToDashboard(currentUnsavedMeal.items, totals, result.insertedId);
            currentUnsavedMeal = null;
            const isExercise = totals.kcal < 0;
            const msg = isExercise ? "Trening uspješno spremljen!" : "Obrok uspješno spremljen!";
            const color = isExercise ? "#00D084" : "var(--accent-cyan)";
            mealsList.innerHTML = `<div class="empty-state" style="color:${color};"><i class="fas fa-check-circle"></i><p>${msg}</p></div>`;
            setTimeout(() => {
                renderDailyMeals();
            }, 1500);
        } else {
            throw new Error(result.message);
        }
    } catch (err) {
        console.error("Greška pri spremanju:", err);
        alert("Greška pri spremanju: " + err.message);
        btn.innerHTML = `<i class="fas fa-check"></i> POKUŠAJ PONOVNO`;
        btn.disabled = false;
    }
}

function applyMealToDashboard(items, totals, id = null) {
    if (totals.kcal < 0) {
        dailyData.totalBurned = (dailyData.totalBurned || 0) + Math.abs(totals.kcal);
    } else {
        dailyData.totalKcal += totals.kcal;
        dailyData.carbs += totals.carbs;
        dailyData.protein += totals.protein;
        dailyData.fat += totals.fat;
    }

    // Spremamo obrok lokalno u niz za današnji dan
    dailyData.meals.push({
        id: id,
        time: new Date().toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' }),
        items: items,
        totals: totals
    });

    document.getElementById('lblKcalEaten').textContent = Math.round(dailyData.totalKcal);
    document.getElementById('lblCarbs').textContent = Math.round(dailyData.carbs) + "g";
    document.getElementById('lblProtein').textContent = Math.round(dailyData.protein) + "g";
    document.getElementById('lblFat').textContent = Math.round(dailyData.fat) + "g";

    saveDailyData();
    updateDashboardUI();
}

function renderDailyMeals() {
    if (dailyData.meals.length === 0) {
        mealsList.innerHTML = `<div class="empty-state"><i class="fas fa-utensils"></i><p>Nema zabilježenih obroka danas.</p></div>`;
        return;
    }

    let html = '';
    // Prikazujemo najnovije na vrhu (reverse)
    const reversedMeals = [...dailyData.meals].reverse();

    reversedMeals.forEach((meal, reversedIndex) => {
        const originalIndex = dailyData.meals.length - 1 - reversedIndex;
        let mealDesc = meal.items.map(item => `${item.name} (${item.estimatedWeightG}g)`).join(', ');

        html += `
        <div style="background: var(--bg-card); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid ${meal.totals.kcal < 0 ? '#00D084' : 'var(--accent-cyan)'}; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="flex:1;">
                    <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:5px;"><i class="fas fa-clock"></i> ${meal.time}</div>
                    <div style="font-weight:bold; font-size:0.95rem; color: ${meal.totals.kcal < 0 ? '#00D084' : 'var(--text-main)'}; line-height:1.4;">${mealDesc}</div>
                </div>
                <div style="font-size:1.3rem; font-weight:900; color:var(--accent-orange); margin-left:15px; text-align:right;">
                    ${meal.totals.kcal < 0 ? '<span style="color:#00D084"><i class="fas fa-fire"></i> ' + Math.abs(Math.round(meal.totals.kcal)) + '</span>' : Math.round(meal.totals.kcal)}<br><span style="font-size:0.7rem; color:var(--text-muted); font-weight:normal;">kcal</span>
                </div>
            </div>
            
            <div style="display: flex; justify-content: flex-end; gap: 15px; margin-top: 10px; padding-top: 10px; border-top: 1px dashed var(--border-color);">
                <button class="btn-edit-meal" data-index="${originalIndex}" style="background: none; border: none; color: var(--accent-cyan); cursor: pointer; padding: 5px; font-size: 0.9rem;">
                    <i class="fas fa-edit"></i> Uredi
                </button>
                <button class="btn-delete-meal" data-index="${originalIndex}" style="background: none; border: none; color: #FF2A2A; cursor: pointer; padding: 5px; font-size: 0.9rem;">
                    <i class="fas fa-trash"></i> Izbriši
                </button>
            </div>
        </div>
        `;
    });

    mealsList.innerHTML = html;

    // Attach Listeners
    document.querySelectorAll('.btn-delete-meal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            const isExercise = dailyData.meals[index].totals.kcal < 0;
            const message = isExercise ? "Jeste li sigurni da želite obrisati ovaj trening?" : "Jeste li sigurni da želite obrisati ovaj obrok?";
            if (confirm(message)) {
                deleteMeal(index);
            }
        });
    });

    document.querySelectorAll('.btn-edit-meal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            editMeal(index);
        });
    });
}

function editMeal(index) {
    // Spremi stari obrok u varijablu da imamo pocetne stavke za edit UI
    // Duboka kopija da ne mutiramo orginal dok se ne spremi
    currentUnsavedMeal = JSON.parse(JSON.stringify({ items: dailyData.meals[index].items }));
    editingMealIndex = index; // Cuva lokaciju da ga overwriteamo ako dode confirm

    window.scrollTo({ top: 0, behavior: 'smooth' });
    drawPendingMealUI();
}

async function deleteMeal(index, skipRender = false) {
    const meal = dailyData.meals[index];
    const mealId = meal.id;

    // Ako ima ID iz clouda, proslijedi brisanje bazi u pozadini
    if (mealId && API_URL) {
        try {
            fetch(API_URL, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({
                    action: 'deleteMeal',
                    username: userProfile.username,
                    id: mealId
                })
            }).catch(e => console.error("Cloud Error:", e));
        } catch (e) {
            console.warn("Nije uspjelo brisanje iz clouda.", e);
        }
    }

    // Oduzimanje makrosa i kalorija
    if (meal.totals.kcal < 0) {
        dailyData.totalBurned = (dailyData.totalBurned || 0) - Math.abs(meal.totals.kcal);
        if (dailyData.totalBurned < 0) dailyData.totalBurned = 0;
    } else {
        dailyData.totalKcal -= meal.totals.kcal;
        dailyData.carbs -= meal.totals.carbs;
        dailyData.protein -= meal.totals.protein;
        dailyData.fat -= meal.totals.fat;
    }

    // Fix floating point sub-zero rendering issues
    if (dailyData.totalKcal < 0) dailyData.totalKcal = 0;
    if (dailyData.carbs < 0) dailyData.carbs = 0;
    if (dailyData.protein < 0) dailyData.protein = 0;
    if (dailyData.fat < 0) dailyData.fat = 0;

    // Brisanje iz Array-a
    dailyData.meals.splice(index, 1);

    if (!skipRender) {
        // Update screen
        document.getElementById('lblKcalEaten').textContent = Math.round(dailyData.totalKcal);
        document.getElementById('lblCarbs').textContent = Math.round(dailyData.carbs) + "g";
        document.getElementById('lblProtein').textContent = Math.round(dailyData.protein) + "g";
        document.getElementById('lblFat').textContent = Math.round(dailyData.fat) + "g";

        saveDailyData();
        renderDailyMeals();
        updateDashboardUI();
    }
}

// ==========================================
// CLOUD STATISTIKA I GRAFOVI
// ==========================================
let kcalChartInstance = null;

async function fetchAndRenderHistory() {
    const listEl = document.getElementById('cloudMealsList');
    listEl.innerHTML = `<div class="empty-state" style="color:var(--accent-cyan);"><i class="fas fa-spinner fa-spin"></i><p>Povlačim podatke s Clouda...</p></div>`;

    if (!userProfile.username) {
        listEl.innerHTML = `<div class="empty-state" style="color:#FF2A2A;"><i class="fas fa-exclamation-triangle"></i><p>Nedostaje korisničko ime. Odi u Postavke.</p></div>`;
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
                action: 'getHistory',
                username: userProfile.username
            })
        });

        const responseText = await response.text();
        const result = JSON.parse(responseText);

        if (result.status === 'success') {
            renderStatsUI(result.data);
        } else {
            throw new Error(result.message);
        }
    } catch (err) {
        console.error("Greška pri dohvaćanju povijesti:", err);
        listEl.innerHTML = `<div class="empty-state" style="color:#FF2A2A;"><i class="fas fa-exclamation-triangle"></i><p>Greška: ${err.message}</p></div>`;
    }
}

function renderStatsUI(meals) {
    const listEl = document.getElementById('cloudMealsList');

    if (!meals || meals.length === 0) {
        listEl.innerHTML = `<div class="empty-state"><i class="fas fa-box-open"></i><p>Još nemaš spremljenih obroka u Cloudu.</p></div>`;

        // Uništi stari graf ako postoji (nema podataka)
        if (kcalChartInstance) kcalChartInstance.destroy();
        return;
    }

    // 1. Grupiranje kalorija po datumima za Chart.js
    const dailySums = {};
    meals.forEach(m => {
        // Pretvaramo "dd.MM.yyyy" u kraći format "dd.MM."
        const shortDate = m.date.substring(0, 5);
        if (!dailySums[shortDate]) dailySums[shortDate] = 0;
        dailySums[shortDate] += m.totals.kcal;
    });

    const labels = Object.keys(dailySums).reverse();
    const dataKcal = Object.values(dailySums).reverse();

    // Osiguravamo da je TDEE broj kako Chart.js ne bi odbio iscrtati liniju zbog greške u tipu podatka
    const numericTDEE = parseFloat(userProfile.tdee) || 2000;

    // Ažuriranje teksta na UI
    const targetLabel = document.getElementById('lblStatsTDEE');
    if (targetLabel) targetLabel.textContent = numericTDEE;

    // TDEE linija (Target) kreira se ispunjavajući niz istim brojem
    const tdeeLine = Array(labels.length).fill(numericTDEE);

    // Bojanje stupaca (Crveno ako prelazi TDEE, Lagana plava ako je ispod)
    const barColors = dataKcal.map(val => val > numericTDEE ? '#FF2A2A' : '#00A8B5');

    // Crtanje Grafa
    const ctx = document.getElementById('kcalChart').getContext('2d');

    if (kcalChartInstance) {
        kcalChartInstance.destroy(); // Uništi stari graf ako postoji prije crtanja novog
    }

    // Chart.js globalne postavke za dark mode estetiku
    Chart.defaults.color = '#7f8c8d';
    Chart.defaults.font.family = "'Orbitron', sans-serif";

    kcalChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    type: 'line',
                    label: 'TDEE Cilj',
                    data: tdeeLine,
                    borderColor: '#E67E22', // High-contrast orange
                    borderWidth: 3,
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 4,
                    order: 1 // Draw line over bars
                },
                {
                    type: 'bar',
                    label: 'Unos (kcal)',
                    data: dataKcal,
                    backgroundColor: barColors,
                    borderRadius: 4,
                    order: 2
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    // 2. Iscrtavanje kronološke liste ispod grafa
    let html = '';
    let currentDateDivider = '';

    meals.forEach(meal => {
        // Razdvajanje po datumima vizualno
        if (meal.date !== currentDateDivider) {
            html += `<div style="background:var(--border-color); padding:5px 10px; border-radius:4px; font-weight:bold; font-size:0.8rem; margin:15px 0 5px 0; color:var(--text-main);">${meal.date}</div>`;
            currentDateDivider = meal.date;
        }

        let mealDesc = meal.items.map(i => `${i.name} (${i.estimatedWeightG}g)`).join(', ');

        html += `
        <div style="background: var(--bg-card); padding: 10px; border-radius: 6px; margin-bottom: 5px; border-left: 3px solid var(--text-muted); display:flex; justify-content:space-between; align-items:center;">
            <div style="flex:1;">
                <div style="font-size:0.75rem; color:var(--text-muted);"><i class="fas fa-clock"></i> ${meal.time}</div>
                <div style="font-size:0.9rem; color:var(--text-main); line-height:1.2;">${mealDesc}</div>
            </div>
            <div style="font-size:1rem; font-weight:bold; color:var(--accent-orange); margin-left:10px;">
                ${Math.round(meal.totals.kcal)} <span style="font-size:0.6rem; color:var(--text-muted);">kcal</span>
            </div>
        </div>
        `;
    });

    listEl.innerHTML = html;
}

// ==========================================
// EXERCISE MODUL LOGIKA
// ==========================================

function initExerciseModal() {
    if (typeof exerciseDB === 'undefined') return;

    let html = '';
    exerciseDB.forEach((ex, idx) => {
        html += `<option value="${idx}">${ex.name}</option>`;
    });
    exerciseSelect.innerHTML = html;
    updateExercisePreview();
}

function updateExercisePreview() {
    if (typeof exerciseDB === 'undefined' || exerciseSelect.selectedIndex < 0) return;

    const ex = exerciseDB[exerciseSelect.value];
    exerciseDesc.textContent = ex.description;

    const val = parseInt(inpExerciseDuration.value) || 0;

    let burnedKcal = 0;
    if (ex.met === 0) {
        // Pametni sat ručni unos!
        burnedKcal = val;
        lblExerciseInputTitle.textContent = "Potrošene kalorije (kcal):";
        exercisePillButtons.style.display = 'none'; // Sakrij +15m +30m gumbe
    } else {
        // Normalan znanstveni izračun iz minuta i mase
        burnedKcal = (ex.met * 3.5 * userProfile.weight / 200) * val;
        lblExerciseInputTitle.textContent = "Trajanje (minute):";
        exercisePillButtons.style.display = 'flex';
    }

    lblExercisePreview.innerHTML = `🔥 -${Math.round(burnedKcal)} <span style="font-size:1rem;">kcal</span>`;
}

function setupExerciseEvents() {
    btnAddExercise.addEventListener('click', () => {
        exerciseModal.classList.remove('hidden');
        updateExercisePreview(); // Refresh in case weight changed
    });

    btnCancelExercise.addEventListener('click', () => {
        exerciseModal.classList.add('hidden');
    });

    exerciseSelect.addEventListener('change', updateExercisePreview);

    inpExerciseDuration.addEventListener('input', updateExercisePreview);

    btnsDuration.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const addMin = parseInt(e.target.getAttribute('data-min'));
            let current = parseInt(inpExerciseDuration.value) || 0;
            inpExerciseDuration.value = current + addMin;
            updateExercisePreview();
        });
    });

    btnConfirmExercise.addEventListener('click', () => {
        if (typeof exerciseDB === 'undefined') return;
        const ex = exerciseDB[exerciseSelect.value];
        const val = parseInt(inpExerciseDuration.value) || 0;

        if (val <= 0) {
            alert("Unesite ispravan broj.");
            return;
        }

        let burnedKcal = 0;
        if (ex.met === 0) {
            burnedKcal = val;
        } else {
            burnedKcal = Math.round((ex.met * 3.5 * userProfile.weight / 200) * val);
        }

        // Formiramo "lažni" AI odgovor za Pending UI, ali s negativnim kalorijama i 0 makro
        const fakeAIResponse = {
            items: [
                {
                    name: ex.met === 0 ? `[VJEŽBA] Garmin / Smartwatch` : `[VJEŽBA] ${ex.name} (${val} min)`,
                    estimatedWeightG: val, // Hack da UI gramaže postane UI minute
                    kcalPer100g: -burnedKcal, // -burnedKcal za 1 minutu hack
                    macrosPer100g: { carbs: 0, protein: 0, fat: 0 }
                }
            ]
        };

        // Sakrivamo modal
        exerciseModal.classList.add('hidden');
        inpExerciseDuration.value = 30; // reset

        // Prikazujemo u pending UI (Hack: stavljam estimatedWeightG na 100 da factor bude 1)
        fakeAIResponse.items[0].estimatedWeightG = 100;

        renderAIResult(fakeAIResponse);
    });
}

// Boot
document.addEventListener('DOMContentLoaded', init);
