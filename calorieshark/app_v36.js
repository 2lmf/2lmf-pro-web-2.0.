// --- DEBUGGING & ERROR HANDLING ---
window.onerror = function (msg, url, lineNo, columnNo, error) {
    const errorMsg = `ERROR: ${msg}\nLine: ${lineNo}\nURL: ${url}`;
    console.error(errorMsg);
    if (!msg.includes('ResizeObserver')) {
        alert(errorMsg);
    }
    return false;
};
console.log("CalorieShark v51 Initializing...");

// --- TRANSLATIONS (i18n) ---
const TRANSLATIONS = {
    hr: {
        onb_lang_select: "ODABERI JEZIK / SELECT LANGUAGE",
        onb_title: "TVOJ PROFIL",
        onb_subtitle: "Unesi podatke za kreiranje osobnog oblaka.",
        onb_username: "Korisničko ime (Username)",
        onb_email: "Vaša E-mail adresa",
        onb_gender: "Spol",
        gen_male: "MUŠKO",
        gen_female: "ŽENSKO",
        onb_age: "Godine",
        onb_height: "Visina (cm)",
        onb_weight: "Trenutna težina (kg)",
        onb_diet: "Prehrambene navike (Opcionalno)",
        diet_gf: "Bez Glutena",
        onb_start: "ZAPOČNI",
        set_save: "SPREMI PROMJENE",
        dash_today: "DANAS",
        dash_exercise: "TRENING",
        dash_kcal: "KCAL",
        dash_carbs: "UGLJIKOHIDRATI",
        dash_protein: "PROTEINI",
        dash_fat: "MASTI",
        dash_divider: "DNEVNIK OBROKA",
        adv_title: "Trebaš ideju?",
        dash_empty: "Nema zabilježenih obroka danas.",
        dash_input_placeholder: "Upiši ili izgovori obrok...",
        mod_ex_title: "Zabilježi Trening",
        mod_ex_duration: "Trajanje (minute):",
        btn_cancel: "Odustani",
        btn_save: "Spremi",
        meal_confirm: "SPREMI U DNEVNIK",
        meal_discard: "ODUSTANI",
        meal_add_missing: "+ Dodaj sastojak koga AI nije skužio",
        meal_ai_analyzing: "Pitam Gemini AI za: {text}...",
        meal_ai_error: "AI greška: {errorMsg}",
        meal_quota_error: "Gemini API limit! 🦈 Previše smo pitali Shark-a u kratkom vremenu. Pokušaj ponovno za minutu.",
        mic_not_supported: "Žao mi je, vaš preglednik ne podržava glasovni unos. (Pokušajte Chrome ili Safari).",
        mic_listening: "Slušam... Pričaj sada!",
        mic_error: "Greška s mikrofonom. Pokušaj ponovno.",
        meal_not_recognized: "Nisam uspio prepoznati hranu. Pokušaj ponovno s jasnijom slikom.",
        meal_ai_title: "AI ANALIZA OBROKA",
        mod_ex_title_alt: "ZABILJEŽI TRENING",
        meal_total: "UKUPNO:",
        meal_discard_btn: "Odbaci",
        meal_weight_label: "Gramaža:",
        meal_add_missing_btn: "Dodaj sastojak koga AI nije skužio",
        meal_confirm_ex: "SPREMI TRENING",
        set_title: "POSTAVKE PROFILA",
        set_how_it_works: "Kako CalorieShark radi?",
        set_about: "O Aplikaciji",
        stats_title: "Tvoj Cloud Dnevnik",
        stats_target: "Tvoj dnevni cilj (TDEE):",
        stats_history: "Kronološki ispisi obroka",
        inst_title: "Instaliraj CalorieShark!",
        inst_body: "Dodaj aplikaciju na početni zaslon svog mobitela za brzi pristup, Kameru, Mikrofon i Offline rad.",
        inst_later: "Kasnije",
        inst_confirm: "INSTALIRAJ",
        scan_title: "Skeniraj barkod proizvoda...",
        scan_status: "Tražim fokus...",
        scan_error: "Shark ne poznaje ovaj kod. 🦈",
        scan_btn_photo: "SLIKAJ TABLICU",
        scan_btn_close: "Zatvori skener",
        adv_sub: "Ostalo ti je {kcal} kcal. Evo što možeš pojesti:",
        adv_empty: "Nemam ti što ponuditi za preostali budžet. Popij vodu!",
        adv_db_empty: "Baza savjeta je trenutno prazna.",
        adv_fav_title: "Moj Favorit",
        set_logout: "ODJAVI SE",
        dash_steps: "KORACI",
        mod_steps_title: "Zabilježi Korake",
        mod_steps_count: "Broj koraka:",
        mod_steps_kcal: "Potrošene kalorije:",
        mod_steps_hint: "Aplikacija automatski računa kalorije prema tvojoj masi, ali ih možeš korigirati.",
        btn_edit: "Uredi",
        btn_delete: "Izbriši"
    },
    en: {
        onb_lang_select: "SELECT LANGUAGE",
        onb_title: "YOUR PROFILE",
        onb_subtitle: "Enter data to create your personal cloud.",
        onb_username: "User ID (Username)",
        onb_email: "Your E-mail address",
        onb_gender: "Gender",
        gen_male: "MALE",
        gen_female: "FEMALE",
        onb_age: "Age",
        onb_height: "Height (cm)",
        onb_weight: "Current weight (kg)",
        onb_diet: "Dietary preferences (Optional)",
        diet_gf: "Gluten Free",
        onb_start: "START",
        set_save: "SAVE CHANGES",
        dash_today: "TODAY",
        dash_exercise: "WORKOUT",
        dash_kcal: "KCAL",
        dash_carbs: "CARBS",
        dash_protein: "PROTEIN",
        dash_fat: "FAT",
        dash_divider: "MEAL LOG",
        adv_title: "Need an idea?",
        dash_empty: "No meals logged today.",
        dash_input_placeholder: "Type or speak your meal...",
        mod_ex_title: "Log Workout",
        mod_ex_duration: "Duration (minutes):",
        btn_cancel: "Cancel",
        btn_save: "Save",
        meal_confirm: "SAVE TO LOG",
        meal_discard: "DISCARD",
        meal_add_missing: "+ Add ingredient AI missed",
        meal_ai_analyzing: "Asking Gemini AI for: {text}...",
        meal_ai_error: "AI Error: {errorMsg}",
        meal_quota_error: "Gemini API limit! 🦈 We asked Shark too much in a short time. Try again in a minute.",
        mic_not_supported: "Sorry, your browser doesn't support voice input. (Try Chrome or Safari).",
        mic_listening: "Listening... Speak now!",
        mic_error: "Microphone error. Try again.",
        meal_not_recognized: "I couldn't recognize the food. Try again with a clearer image.",
        meal_ai_title: "AI MEAL ANALYSIS",
        mod_ex_title_alt: "REGISTER WORKOUT",
        meal_total: "TOTAL:",
        meal_discard_btn: "Discard",
        meal_weight_label: "Weight:",
        meal_add_missing_btn: "Add ingredient AI missed",
        meal_confirm_ex: "SAVE WORKOUT",
        set_title: "PROFILE SETTINGS",
        set_how_it_works: "How CalorieShark works?",
        set_about: "About App",
        stats_title: "Your Cloud Diary",
        stats_target: "Your daily goal (TDEE):",
        stats_history: "Chronological meal logs",
        inst_title: "Install CalorieShark!",
        inst_body: "Add the app to your home screen for quick access, Camera, Microphone and Offline work.",
        inst_later: "Later",
        inst_confirm: "INSTALL",
        scan_title: "Scan product barcode...",
        scan_status: "Searching for focus...",
        scan_error: "Shark doesn't recognize this code. 🦈",
        scan_btn_photo: "PHOTO NUTRITION TABLE",
        scan_btn_close: "Close scanner",
        adv_sub: "You have {kcal} kcal left. Here is what you can eat:",
        adv_empty: "I have nothing to offer for your remaining budget. Drink some water!",
        adv_db_empty: "Advisor database is currently empty.",
        adv_fav_title: "My Favorite",
        set_logout: "LOG OUT",
        dash_steps: "STEPS",
        mod_steps_title: "Log Steps",
        mod_steps_count: "Step count:",
        mod_steps_kcal: "Calories burned:",
        mod_steps_hint: "The app automatically calculates calories based on your mass, but you can correct them.",
        btn_edit: "Edit",
        btn_delete: "Delete"
    }
};

let currentLang = 'hr';

function i18n(key, params = {}) {
    let text = TRANSLATIONS[currentLang][key] || key;
    for (const p in params) {
        text = text.replace(`{${p}}`, params[p]);
    }
    return text;
}

function applyLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (TRANSLATIONS[lang][key]) {
            el.innerText = TRANSLATIONS[lang][key];
        }
    });

    // Update all elements with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (TRANSLATIONS[lang][key]) {
            el.placeholder = TRANSLATIONS[lang][key];
        }
    });

    // Optional: update HTML lang attribute
    document.documentElement.lang = lang;
}

// --- STATE MANAGEMENT ---
function safeGetElement(id) {
    const el = document.getElementById(id);
    if (!el) {
        console.warn(`Element with ID "${id}" NOT found in DOM!`);
    }
    return el;
}

const safeLocalStorage = {
    getItem: function (key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn(`localStorage getItem error for key "${key}":`, e);
            return null;
        }
    },
    setItem: function (key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn(`localStorage setItem error for key "${key}":`, e);
        }
    }
};

let userProfile = {
    username: '',
    email: '',
    gender: 'male',
    lang: 'hr',
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
    totalBurned: 0,
    steps: 0,
    stepsKcal: 0,
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

// Barcode Scanner DOM
const barcodeModal = document.getElementById('barcodeModal');
const scannerStatus = document.getElementById('scannerStatus');
const scannerFallback = document.getElementById('scannerFallback');
const btnScannerCameraFallback = document.getElementById('btnScannerCameraFallback');
const btnScannerCancel = document.getElementById('btnScannerCancel');

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

// --- SCANNER STATE ---
let html5QrCode = null;
let scannerTimeoutTimer = null;

// --- INITIALIZATION ---
function init() {
    bindEvents(); // Bind events FIRST
    registerServiceWorker();

    // 1. Load profile (sets userProfile.username)
    loadProfile();

    // 2. Load data for specific user only AFTER username is known
    loadDailyData();
    loadVisionEnergy();
    initExerciseModal();

    // 3. Update UI specifically AFTER data is loaded
    updateDashboardUI();

    // Start energy regeneration loop
    setInterval(checkVisionEnergy, 60000); // Check every minute
}

function loadVisionEnergy() {
    if (!userProfile.username) return;
    const saved = safeLocalStorage.getItem('calorieShark_vision_energy_' + userProfile.username);
    if (saved) {
        visionEnergy = JSON.parse(saved);
    } else {
        // Reset to default for new user
        visionEnergy = { charges: 3, lastUsed: null };
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
    if (!userProfile.username) return;
    safeLocalStorage.setItem('calorieShark_vision_energy_' + userProfile.username, JSON.stringify(visionEnergy));
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

function getTodayKey() {
    // Stable YYYY-MM-DD in LOCAL time
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function loadDailyData() {
    if (!userProfile.username) return;
    const today = getTodayKey();
    const saved = safeLocalStorage.getItem('calorieShark_daily_' + userProfile.username);

    if (saved) {
        const parsed = JSON.parse(saved);
        // Fallback check for multiple formats: ISO (local), toISOString, or old locale string
        const oldLocale = new Date().toLocaleDateString('hr-HR');
        if (parsed.date === today || parsed.date === oldLocale) {
            dailyData = parsed.data;
            // Migracija (patch za stare profile)
            if (typeof dailyData.totalBurned === 'undefined') dailyData.totalBurned = 0;
            if (typeof dailyData.steps === 'undefined') dailyData.steps = 0;
            if (typeof dailyData.stepsKcal === 'undefined') dailyData.stepsKcal = 0;
        } else {
            // Novi dan, resetiraj
            dailyData = { totalKcal: 0, carbs: 0, protein: 0, fat: 0, totalBurned: 0, steps: 0, stepsKcal: 0, meals: [] };
        }
    } else {
        dailyData = { totalKcal: 0, carbs: 0, protein: 0, fat: 0, totalBurned: 0, steps: 0, stepsKcal: 0, meals: [] };
    }
}

function saveDailyData() {
    if (!userProfile.username) return;
    const today = getTodayKey();
    safeLocalStorage.setItem('calorieShark_daily_' + userProfile.username, JSON.stringify({
        date: today,
        data: dailyData
    }));
}

function loadProfile() {
    const activeUser = safeLocalStorage.getItem('calorieShark_activeUser');
    if (!activeUser) {
        showScreen('onboarding');
        return;
    }

    const saved = safeLocalStorage.getItem('calorieShark_profile_' + activeUser);

    if (saved) {
        userProfile = JSON.parse(saved);

        // Populate inputs for onboarding
        document.getElementById('inpUsername').value = userProfile.username || '';
        document.getElementById('inpEmail').value = userProfile.email || '';
        document.getElementById('inpAge').value = userProfile.age || 30;
        document.getElementById('inpHeight').value = userProfile.height || 180;
        document.getElementById('inpWeight').value = userProfile.weight || 85;

        // Populate inputs for settings screen
        const inpSUsername = document.getElementById('inpSettingsUsername');
        const inpSEmail = document.getElementById('inpSettingsEmail');
        const inpSAge = document.getElementById('inpSettingsAge');
        const inpSHeight = document.getElementById('inpSettingsHeight');
        const inpSWeight = document.getElementById('inpSettingsWeight');

        if (inpSUsername) inpSUsername.value = userProfile.username || '';
        if (inpSEmail) inpSEmail.value = userProfile.email || '';
        if (inpSAge) inpSAge.value = userProfile.age || 30;
        if (inpSHeight) inpSHeight.value = userProfile.height || 180;
        if (inpSWeight) inpSWeight.value = userProfile.weight || 85;

        // Populate active gender & lang
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            if (btn.dataset.gender === userProfile.gender) {
                btn.classList.add('active');
            } else if (btn.dataset.lang === userProfile.lang) {
                btn.classList.add('active');
            } else {
                if (btn.dataset.gender || btn.dataset.lang) {
                    btn.classList.remove('active');
                }
            }
        });

        if (userProfile.lang) {
            applyLanguage(userProfile.lang);
        }

        // Populate checkboxes safely
        if (userProfile.dietPrefs) {
            const chkVege = document.getElementById('chkSetVege');
            const chkVegan = document.getElementById('chkSetVegan');
            const chkGluten = document.getElementById('chkSetGlutenFree');

            if (chkVege) chkVege.checked = (userProfile.dietPrefs.vege === true) || false;
            if (chkVegan) chkVegan.checked = (userProfile.dietPrefs.vegan === true) || false;
            if (chkGluten) chkGluten.checked = (userProfile.dietPrefs.glutenFree === true) || false;
        }

        showScreen('dashboard');
        updateDashboardUI();
    } else {
        showScreen('onboarding');
    }
}

function saveProfile() {
    if (userProfile.username) {
        safeLocalStorage.setItem('calorieShark_activeUser', userProfile.username);
        safeLocalStorage.setItem('calorieShark_profile_' + userProfile.username, JSON.stringify(userProfile));
    }
}

function handleLogout() {
    if (confirm(i18n('hr') === 'hr' ? "Jeste li sigurni da se želite odjaviti?" : "Are you sure you want to log out?")) {
        localStorage.removeItem('calorieShark_activeUser');
        window.location.reload();
    }
}

// --- BARCODE SCANNER LOGIC ---
function openScanner() {
    barcodeModal.classList.remove('hidden');
    document.body.classList.add('body-lock');
    scannerStatus.textContent = "Pokrećem kameru...";
    scannerFallback.classList.add('hidden');

    // Mala odgoda da se DOM stigne renderirati prije pokretanja kamere
    setTimeout(() => {
        html5QrCode = new Html5Qrcode("scannerViewport");
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        html5QrCode.start(
            { facingMode: "environment" },
            config,
            (decodedText) => {
                // Success!
                handleScanSuccess(decodedText);
            },
            (errorMessage) => {
                // Scanning...
            }
        ).catch(err => {
            console.error("Greška pri pokretanju skenera:", err);
            scannerStatus.style.color = "var(--accent-orange)";
            scannerStatus.textContent = "Greška kamere: " + err;
        });

        // Pokreni timer za automatski fallback (7 sekundi)
        if (scannerTimeoutTimer) clearTimeout(scannerTimeoutTimer);
        scannerTimeoutTimer = setTimeout(() => {
            if (html5QrCode && html5QrCode.isScanning) {
                showScannerFallback();
            }
        }, 7000);

    }, 300);
}

function closeScanner() {
    if (scannerTimeoutTimer) clearTimeout(scannerTimeoutTimer);
    document.body.classList.remove('body-lock');
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            html5QrCode = null;
            barcodeModal.classList.add('hidden');
        }).catch(err => {
            console.error("Greška pri gašenju skenera:", err);
            barcodeModal.classList.add('hidden');
        });
    } else {
        barcodeModal.classList.add('hidden');
    }
}

async function handleScanSuccess(decodedText) {
    if (scannerTimeoutTimer) clearTimeout(scannerTimeoutTimer);
    if (html5QrCode) {
        await html5QrCode.stop();
        html5QrCode = null;
    }

    scannerStatus.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Tražim proizvod: <strong>${decodedText}</strong>...`;
    lookupProduct(decodedText);
}

async function lookupProduct(barcode) {
    try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=product_name,nutriments,image_url`);
        const data = await response.json();

        if (data.status === 1 && data.product) {
            const p = data.product;
            const n = p.nutriments;

            // Mapiramo podatke
            const mappedResult = {
                items: [{
                    name: p.product_name || "Nepoznat proizvod",
                    estimatedWeightG: 100, // Default porcija
                    kcalPer100g: Math.round(n['energy-kcal_100g'] || 0),
                    macrosPer100g: {
                        carbs: Math.round(n.carbohydrates_100g || 0),
                        protein: Math.round(n.proteins_100g || 0),
                        fat: Math.round(n.fat_100g || 0)
                    }
                }]
            };

            barcodeModal.classList.add('hidden');
            renderAIResult(mappedResult);
        } else {
            showScannerFallback();
        }
    } catch (err) {
        console.error("Greška pri upitu baze:", err);
        showScannerFallback();
    }
}

function showScannerFallback() {
    if (scannerTimeoutTimer) clearTimeout(scannerTimeoutTimer);

    // Ako je upaljeno skeniranje, ugasi ga da ne troši bateriju dok korisnik čita poruku
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            html5QrCode = null;
        }).catch(err => console.error(err));
    }

    scannerStatus.textContent = "";
    scannerFallback.classList.remove('hidden');
}

function bindEvents() {
    // Language Toggles (Onboarding & Settings)
    const langBtns = document.querySelectorAll('#langToggleGroup .toggle-btn, #langToggleGroupSettings .toggle-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedLang = e.currentTarget.dataset.lang;
            userProfile.lang = selectedLang;

            // Sync all lang toggles visual state
            document.querySelectorAll('.toggle-btn[data-lang]').forEach(b => {
                if (b.dataset.lang === selectedLang) b.classList.add('active');
                else b.classList.remove('active');
            });

            applyLanguage(selectedLang);
            saveProfile(); // Immediate save if changed in settings
        });
    });

    // Gender Toggles
    const genderBtns = document.querySelectorAll('#genderToggleGroup .toggle-btn, #settingsToggleGroup .toggle-btn');
    genderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const group = e.currentTarget.parentElement;
            group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            userProfile.gender = e.currentTarget.dataset.gender;
        });
    });

    // Save Profile
    document.getElementById('btnSaveProfile').addEventListener('click', () => {
        try {
            const usernameVal = document.getElementById('inpUsername').value.trim();
            const emailVal = document.getElementById('inpEmail').value.trim();

            if (!usernameVal || !emailVal) {
                alert("Molimo unesite korisničko ime i e-mail adresu!");
                return;
            }

            userProfile.username = usernameVal;
            userProfile.email = emailVal;
            // Defensive parsing to prevent NaN errors freezing the UI
            userProfile.age = Math.abs(parseInt(document.getElementById('inpAge').value)) || 30;
            userProfile.height = Math.abs(parseInt(document.getElementById('inpHeight').value)) || 180;
            userProfile.weight = Math.abs(parseFloat(document.getElementById('inpWeight').value)) || 85;

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
            saveProfile();
            loadDailyData();
            loadVisionEnergy();

            showScreen('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            updateDashboardUI();
        } catch (e) {
            alert("Greska kod spremanja profila: " + e.message);
        }
    });

    // Camera FAB
    fabCamera.addEventListener('click', () => {
        inpCamera.click();
    });

    // Barcode Button
    const btnBarcode = document.getElementById('btnBarcode');
    if (btnBarcode) {
        btnBarcode.addEventListener('click', openScanner);
    }

    // Logout Button
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', handleLogout);
    }

    // Barcode Modal controls
    if (btnScannerCancel) btnScannerCancel.addEventListener('click', closeScanner);
    document.getElementById('btnCloseScanner').addEventListener('click', closeScanner);

    if (btnScannerCameraFallback) {
        btnScannerCameraFallback.addEventListener('click', () => {
            closeScanner();
            inpCamera.click(); // Trigger regular AI camera flow
        });
    }

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

        // Pre-fill language in settings
        const langToggleBtns = document.querySelectorAll('#langToggleGroupSettings .toggle-btn');
        langToggleBtns.forEach(btn => {
            if (btn.dataset.lang === userProfile.lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        const chkVege = document.getElementById('chkSetVege');
        const chkVegan = document.getElementById('chkSetVegan');
        const chkGluten = document.getElementById('chkSetGlutenFree');

        if (chkVege) chkVege.checked = (userProfile.dietPrefs && userProfile.dietPrefs.vege) || false;
        if (chkVegan) chkVegan.checked = (userProfile.dietPrefs && userProfile.dietPrefs.vegan) || false;
        if (chkGluten) chkGluten.checked = (userProfile.dietPrefs && userProfile.dietPrefs.glutenFree) || false;

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
        try {
            const un = document.getElementById('inpSettingsUsername').value.trim();
            const em = document.getElementById('inpSettingsEmail').value.trim();
            const a = Math.abs(parseInt(document.getElementById('inpSettingsAge').value)) || 30;
            const h = Math.abs(parseInt(document.getElementById('inpSettingsHeight').value)) || 180;
            const w = Math.abs(parseFloat(document.getElementById('inpSettingsWeight').value)) || 85;
            const activeBtn = document.querySelector('#settingsToggleGroup .toggle-btn.active');
            const g = activeBtn ? activeBtn.dataset.gender : 'male';

            if (!un || !em) { alert('Unesi korisničko ime i e-mail!'); return; }

            // Update profile while preserving language
            userProfile.username = un;
            userProfile.email = em;
            userProfile.age = a;
            userProfile.height = h;
            userProfile.weight = w;
            userProfile.gender = g;

            // Save Diet Prefs from settings
            const chkVege = document.getElementById('chkSetVege');
            const chkVegan = document.getElementById('chkSetVegan');
            const chkGluten = document.getElementById('chkSetGlutenFree');

            userProfile.dietPrefs = {
                vege: chkVege ? chkVege.checked : false,
                vegan: chkVegan ? chkVegan.checked : false,
                glutenFree: chkGluten ? chkGluten.checked : false
            };

            calculateTDEE();
            saveProfile(); // Use the standard saveProfile function

            showScreen('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            updateDashboardUI();
        } catch (e) {
            alert("Greska kod postavki: " + e.message);
        }
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

    // Uklonjen isCooldown return za glasovni gumb da korisnik može 
    // pritisnuti i snimiti glasovni upit bez da troši AI vizijski cooldown
    btnVoice.addEventListener('click', (e) => {
        handleVoiceInput(e);
    });

    // Shark Advisor UI Toggle
    const advisorCard = document.getElementById('advisorCard');
    const advisorExpandedSection = document.getElementById('advisorExpandedSection');
    const advisorExpandedIcon = document.getElementById('advisorExpandedIcon');
    const btnRefreshAdvisor = document.getElementById('btnRefreshAdvisor');

    if (advisorCard && advisorExpandedSection) {
        // Toggle on clicking the main card
        advisorCard.addEventListener('click', (e) => {
            // Prevent toggling if clicked exactly on the refresh button
            if (e.target.closest('#btnRefreshAdvisor')) return;

            advisorExpandedSection.classList.toggle('hidden');
            if (advisorExpandedSection.classList.contains('hidden')) {
                advisorExpandedIcon.classList.remove('fa-chevron-up');
                advisorExpandedIcon.classList.add('fa-chevron-down');
            } else {
                advisorExpandedIcon.classList.remove('fa-chevron-down');
                advisorExpandedIcon.classList.add('fa-chevron-up');
            }
        });

        // Refresh explicitly
        if (btnRefreshAdvisor) {
            btnRefreshAdvisor.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                renderSharkAdvisor();
            });
        }

        // Filter Buttons explicitly
        const advFilterBtns = document.querySelectorAll('.adv-filter-btn');
        advFilterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Toggle active state only
                if (btn.classList.contains('active')) {
                    btn.classList.remove('active');
                    btn.style.background = 'transparent';
                    btn.style.color = btn.style.borderColor; // Reset text color
                } else {
                    advFilterBtns.forEach(b => {
                        b.classList.remove('active');
                        b.style.background = 'transparent';
                        b.style.color = b.style.borderColor; // Reset all
                    });
                    btn.classList.add('active');
                    btn.style.background = btn.style.borderColor; // Fill it with color
                    btn.style.color = '#111'; // Dark text for filled bg
                }

                renderSharkAdvisor(); // Refresh after filter selection
            });
        });
    }

    setupExerciseEvents();
    setupStepsEvents();
}

function setupStepsEvents() {
    const btnAddSteps = document.getElementById('btnAddSteps');
    const stepsModal = document.getElementById('stepsModal');
    const btnCancelSteps = document.getElementById('btnCancelSteps');
    const btnConfirmSteps = document.getElementById('btnConfirmSteps');
    const inpStepCount = document.getElementById('inpStepCount');
    const inpStepKcal = document.getElementById('inpStepKcal');

    if (btnAddSteps) {
        btnAddSteps.addEventListener('click', () => {
            inpStepCount.value = dailyData.steps || 5000;
            updateStepsPreview();
            stepsModal.classList.remove('hidden');
        });
    }

    if (btnCancelSteps) {
        btnCancelSteps.addEventListener('click', () => stepsModal.classList.add('hidden'));
    }

    if (inpStepCount) {
        inpStepCount.addEventListener('input', updateStepsPreview);
    }

    document.querySelectorAll('.btn-steps-quick').forEach(btn => {
        btn.addEventListener('click', () => {
            const add = parseInt(btn.dataset.steps);
            inpStepCount.value = parseInt(inpStepCount.value || 0) + add;
            updateStepsPreview();
        });
    });

    if (btnConfirmSteps) {
        btnConfirmSteps.addEventListener('click', () => {
            const stepsCount = parseInt(inpStepCount.value || 0);
            const stepsKcal = parseInt(inpStepKcal.value || 0);

            // 1. Ažuriraj dnevne sume
            dailyData.steps = stepsCount;
            dailyData.stepsKcal = stepsKcal;

            // 2. Dodaj u dnevnik kao "vježbu"
            const fakeStepItem = [{
                name: `[KORACI] ${stepsCount.toLocaleString('hr-HR')} koraka`,
                estimatedWeightG: 100,
                kcalPer100g: -stepsKcal,
                macrosPer100g: { carbs: 0, protein: 0, fat: 0 }
            }];

            // Ako već postoji zapis koraka u dnevniku, možemo ga zamijeniti ili samo dodati novi
            // Korisnik želi da se vidi kao zapis (kao trening)
            applyMealToDashboard(fakeStepItem, { kcal: -stepsKcal, carbs: 0, protein: 0, fat: 0 });

            saveDailyData();
            updateDashboardUI();
            stepsModal.classList.add('hidden');
        });
    }
}

function updateStepsPreview() {
    const count = parseInt(document.getElementById('inpStepCount').value || 0);
    const weight = userProfile.weight || 85;
    // Formula: 0.04 kcal po koraku, korigirano za masu (baza 75kg)
    const calculated = Math.round(count * 0.04 * (weight / 75));
    document.getElementById('inpStepKcal').value = calculated;
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

    // Show our custom modal if they haven't installed it and ARE LOGGED IN
    setTimeout(() => {
        if (userProfile.username && userProfile.username.length > 0 && !document.getElementById('screenOnboarding').classList.contains('hidden') === false) {
            installModal.classList.remove('hidden');
        }
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
        const localLocale = currentLang === 'hr' ? 'hr-HR' : 'en-US';
        let dateStr = now.toLocaleDateString(localLocale, options).toUpperCase();
        lblDateToday.textContent = `${i18n('dash_today')}, ${dateStr}`;
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
    const stepsTrack = document.getElementById('stepsTrack');
    const stepsCircumference = 238; // r=38 -> 2 * PI * 38 ≈ 238

    if (burned > 0) {
        const pctBurned = Math.min(burned / target, 1);
        burnedTrack.style.strokeDasharray = `${pctBurned * circumference} ${circumference}`;
        burnedTrack.style.strokeDashoffset = `0`;
    } else {
        burnedTrack.style.strokeDasharray = `0 ${circumference}`;
    }

    // Steps Ring (Orange)
    if (stepsTrack) {
        const stepsKcal = dailyData.stepsKcal || 0;
        if (stepsKcal > 0) {
            const pctSteps = Math.min(stepsKcal / target, 1);
            stepsTrack.style.strokeDasharray = `${pctSteps * stepsCircumference} ${stepsCircumference}`;
            stepsTrack.style.opacity = "1";
        } else {
            stepsTrack.style.strokeDasharray = `0 ${stepsCircumference}`;
            stepsTrack.style.opacity = "0.3";
        }
    }

    // Color logic
    if (percentEaten > 1.0) progressCircle.style.stroke = '#FF2A2A'; // Red if over
    else progressCircle.style.stroke = 'var(--accent-cyan)';

    // Ažuriranje brojčanih iznosa makrosa na UI
    document.getElementById('lblKcalEaten').textContent = Math.round(dailyData.totalKcal);
    document.getElementById('lblCarbs').textContent = Math.round(dailyData.carbs) + "g";
    document.getElementById('lblProtein').textContent = Math.round(dailyData.protein) + "g";
    document.getElementById('lblFat').textContent = Math.round(dailyData.fat) + "g";

    // Prikaz vježbe/koraka u budgetu
    const budgetBonus = burned; // koraci su sada dio burned jer ulaze u dnevnik
    const burnedValEl = document.getElementById('lblBurnedVal');
    if (burnedValEl) {
        burnedValEl.textContent = Math.round(budgetBonus);
    }

    // Prikaz Shark Advisora
    renderSharkAdvisor();

    // Obavezno iscrtaj povijest
    renderDailyMeals();
}

function renderSharkAdvisor() {
    const list = document.getElementById('advisorSuggestionsList');
    if (!list) return;

    if (!advisorMeals || advisorMeals.length === 0) {
        list.innerHTML = `<p style="font-size:0.8rem; color:var(--text-muted); text-align:center;">${i18n('adv_db_empty')}</p>`;
        return;
    }

    const burned = dailyData.totalBurned || 0;
    const target = userProfile.tdee;
    const remainingKcal = Math.max(0, target - dailyData.totalKcal + burned);

    if (document.getElementById('lblAdvisorTarget')) {
        document.getElementById('lblAdvisorTarget').textContent = Math.round(remainingKcal);
    }
    const subTitle = document.getElementById('advisorSubTitle');
    if (subTitle) {
        subTitle.innerText = i18n('adv_sub', { kcal: Math.round(remainingKcal) });
    }

    // Ako je korisnik odabrao iskljucivi filter na samom vizualnom panelu dashboarda
    const activeFilterBtn = document.querySelector('.adv-filter-btn.active');
    const explicitFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : null;

    let validMeals = [];

    if (explicitFilter === 'favorite') {
        // Logika za 'Moji favoriti': Pronađi obroke koji su eksplicitno označeni zvjezdicom

        // 1. Favoriti iz povijesti
        let uniqueFavs = {};
        dailyData.meals.forEach(m => {
            if (m.isFavorite && m.totals.kcal > 0) {
                let namesStr = m.items.map(i => i.name).sort().join(', ');
                if (!uniqueFavs[namesStr]) {
                    uniqueFavs[namesStr] = m;
                }
            }
        });

        validMeals = Object.values(uniqueFavs).map(favMeal => {
            const recipeStr = favMeal.items.map(i => `${i.name} (${i.estimatedWeightG}g)`).join(' + ');
            return {
                name: i18n('adv_fav_title'),
                tags: ['favorite'],
                kcal: favMeal.totals.kcal,
                protein: Math.round(favMeal.totals.protein || 0),
                carbs: Math.round(favMeal.totals.carbs || 0),
                fat: Math.round(favMeal.totals.fat || 0),
                recipe: recipeStr,
                originalItems: favMeal.items
            };
        });

        // 2. Favoriti iz Advisor baze (oni koje je korisnik "zvijezdao" u meniju)
        const advisorFavNames = JSON.parse(localStorage.getItem('calorieShark_advisorFavs') || '[]');
        if (typeof advisorMeals !== 'undefined') {
            const advisorFavs = advisorMeals.filter(m => advisorFavNames.includes(m.name));
            validMeals = [...validMeals, ...advisorFavs];
        }
    } else {
        // Standardna logika iz baze savjeta
        validMeals = advisorMeals.filter(meal => {
            if (meal.kcal > remainingKcal + 100) return false;

            if (explicitFilter && explicitFilter !== 'favorite') {
                if (!meal.tags.includes(explicitFilter)) return false;
            } else if (userProfile.dietPrefs) {
                if (userProfile.dietPrefs.vege && !meal.tags.includes("vege")) return false;
                if (userProfile.dietPrefs.vegan && !meal.tags.includes("vegan")) return false;
                if (userProfile.dietPrefs.glutenFree && !meal.tags.includes("glutenFree")) return false;
            }
            return true;
        });

        // Soft fallback
        if (validMeals.length === 0) {
            if (explicitFilter) {
                validMeals = advisorMeals.filter(meal => meal.tags.includes(explicitFilter));
            } else {
                validMeals = advisorMeals.filter(meal => meal.kcal <= remainingKcal + 100);
            }
        }
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
        list.innerHTML = `<p style="font-size:0.85rem; color:var(--text-muted); text-align:center;">${i18n('adv_empty')}</p>`;
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

        // Provjeri je li ovaj specifični obrok favorit (ako je iz advisor baze, tražimo u localStorage)
        const savedFavs = JSON.parse(localStorage.getItem('calorieShark_advisorFavs') || '[]');
        const isFav = savedFavs.includes(meal.name);

        const mealJson = JSON.stringify(meal).replace(/'/g, "&#39;");

        html += `
        <div class="advisor-item" data-meal='${mealJson}' style="background: var(--bg-card); cursor: pointer; border-radius: 8px; padding: 10px; display:flex; flex-direction:column; gap:8px; border-left: 3px solid #00D084; box-shadow: 0 2px 5px rgba(0,0,0,0.05); transition: transform 0.1s; position:relative;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div style="flex:1;">
                    <h4 style="margin:0; font-size:0.95rem; color:var(--text-main);">${currentLang === 'en' && meal.name_en ? meal.name_en : meal.name}</h4>
                    <div style="margin-top:4px;">${tagsHtml}</div>
                </div>
                <div style="text-align:right; display:flex; align-items:center; gap:10px;">
                    <div>
                        <div style="color:var(--accent-cyan); font-weight:bold; font-size:0.9rem;">${meal.kcal} kcal</div>
                        <div style="font-size:0.7rem; color:var(--text-muted);">P:${meal.protein}g C:${meal.carbs}g F:${meal.fat}g</div>
                    </div>
                    <i class="${isFav ? 'fas' : 'far'} fa-star btn-toggle-adv-fav" 
                       data-name="${meal.name}" 
                       style="color: #F1C40F; cursor: pointer; font-size: 1.1rem; padding: 5px;" 
                       title="Favorit"></i>
                </div>
            </div>
            <p style="margin:0; font-size:0.8rem; color:var(--text-muted); font-style:italic;">${currentLang === 'en' && meal.recipe_en ? meal.recipe_en : meal.recipe}</p>
        </div>
        `;
    });

    list.innerHTML = html;

    // Favoriti toggle u advisor listi
    document.querySelectorAll('.btn-toggle-adv-fav').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Ne želimo aktivaciju obroka
            const mealName = e.currentTarget.getAttribute('data-name');
            let savedFavs = JSON.parse(localStorage.getItem('calorieShark_advisorFavs') || '[]');
            if (savedFavs.includes(mealName)) {
                savedFavs = savedFavs.filter(n => n !== mealName);
            } else {
                savedFavs.push(mealName);
            }
            localStorage.setItem('calorieShark_advisorFavs', JSON.stringify(savedFavs));
            renderSharkAdvisor(); // Refresh list to show new star state
        });
    });

    // Attach click listener for automatic filling (instant confirm)
    document.querySelectorAll('.advisor-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const mealData = JSON.parse(e.currentTarget.getAttribute('data-meal'));

            if (mealData.tags && mealData.tags.includes('favorite') && mealData.originalItems) {
                // Za već spremljene favorite iz povijesti
                currentUnsavedMeal = { items: mealData.originalItems };
                window.scrollTo({ top: 0, behavior: 'smooth' });
                saveMealToServer(); // INSTANT SAVE
            } else {
                // Za objekte iz advisor baze (bypassing AI)
                const fakeAI = {
                    items: [{
                        name: mealData.name,
                        estimatedWeightG: 100, // standardna porcija
                        kcalPer100g: mealData.kcal,
                        macrosPer100g: {
                            carbs: mealData.carbs,
                            protein: mealData.protein,
                            fat: mealData.fat
                        }
                    }]
                };
                renderAIResult(fakeAI); // Prikazuje pending UI tako da korisnik vidi što se sprema
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

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

    // Provjera energije netom prije slanja
    if (!useVisionEnergy()) {
        alert("Shark Energy Low! 🦈⚡ Ponestalo ti je energije (munja) za AI skeniranje. Pričekaj 20 minuta da se regenerira jedna munja ili unesi tekstualno.");
        cropModal.classList.add('hidden');
        if (cropperInstance) cropperInstance.destroy();
        return;
    }

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
        let errorMsg = err.message;
        if (errorMsg.includes("quota") || errorMsg.includes("limit") || errorMsg.includes("429")) {
            errorMsg = "Gemini API limit! 🦈 Shark je trenutno prezauzeta analizom (kvota potrošena). Pokušaj ponovno za koju minutu.";
        }
        mealsList.innerHTML = `<div class="empty-state" style="color:#FF2A2A;"><i class="fas fa-exclamation-triangle"></i><p>Greška: ${errorMsg}</p></div>`;
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
    mealsList.innerHTML = `<div class="empty-state" style="color:var(--accent-cyan);"><i class="fas fa-spinner fa-spin"></i><p>${i18n('meal_ai_analyzing', { text: text })}</p></div>`;

    // Scrolaj na vrh
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Prekidač za hlađenje SAMO ako idemo na Google API
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
                textDescription: text + (currentLang === 'en' ? " (Please respond in English)" : ""),
                language: currentLang
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
        let errorMsg = err.message;
        if (errorMsg.includes("quota") || errorMsg.includes("limit") || errorMsg.includes("429")) {
            errorMsg = i18n('meal_quota_error');
        }
        mealsList.innerHTML = `<div class="empty-state" style="color:#FF2A2A;"><i class="fas fa-exclamation-triangle"></i><p>${i18n('meal_ai_error', { errorMsg: errorMsg })}</p></div>`;
    }
}

// Web Speech API
function handleVoiceInput() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert(i18n('mic_not_supported'));
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'hr-HR'; // Hrvatski jezik po defaultu
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function () {
        btnVoice.classList.add('recording-pulse');
        inpTextMeal.placeholder = i18n('mic_listening');
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
    };

    recognition.onerror = function (event) {
        btnVoice.classList.remove('recording-pulse');
        inpTextMeal.placeholder = i18n('mic_error');
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
        mealsList.innerHTML = `<div class="empty-state"><i class="fas fa-question-circle"></i><p>${i18n('meal_not_recognized')}</p></div>`;
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
                <label style="font-size:0.8rem; color:var(--text-muted);">${i18n('meal_weight_label')}</label>
                <input type="number" class="gram-input" data-index="${index}" value="${item.estimatedWeightG}" style="width:70px; padding:5px; border-radius:4px; border:1px solid var(--border-color); background:#FAFCFF; color:#2C3E50; text-align:center;">
                <span style="font-size:0.8rem; color:var(--text-muted);">g</span>
                <button class="icon-btn btn-delete-pending" data-index="${index}" style="margin-left:auto; color:#FF2A2A; padding:5px; border:none; background:transparent;"><i class="fas fa-times"></i></button>
            </div>
        </div>`;
    });

    const isExercise = totalKcal < 0;
    const headerTitle = isExercise ? i18n('mod_ex_title_alt') : i18n('meal_ai_title');
    const headerIcon = isExercise ? "fa-running" : "fa-robot";
    const confirmBtnTxt = isExercise ? i18n('meal_confirm_ex') : i18n('meal_confirm');

    // Ubacujemo dinamični naslov na dno nakon zbrajanja
    let finalHtml = `<div class="pending-meal">
        <h3 style="color:${isExercise ? '#00D084' : 'var(--accent-cyan)'}; margin-bottom:15px;"><i class="fas ${headerIcon}"></i> ${headerTitle}</h3>
        ${html}
        <div style="display:flex; justify-content:space-between; align-items:center; margin: 20px 0; padding-top:15px; border-top: 1px solid var(--border-color);">
            <strong style="font-size:1.2rem;">${i18n('meal_total')}</strong>
            <strong style="font-size:1.5rem; color:${isExercise ? '#00D084' : 'var(--accent-orange)'};">${Math.abs(totalKcal)} kcal</strong>
        </div>
        ${!isExercise ? `<button id="btnAddMissingItem" class="secondary-btn" style="width:100%; margin-bottom:15px; font-size:0.9rem; border: 1px dashed var(--accent-cyan); color: var(--accent-cyan);"><i class="fas fa-plus"></i> ${i18n('meal_add_missing_btn')}</button>` : ''}
        <button id="btnConfirmMeal" class="primary-btn" style="background:${isExercise ? '#00D084' : 'var(--accent-orange)'};"><i class="fas fa-check"></i> ${confirmBtnTxt}</button>
        <button id="btnCancelMeal" class="icon-btn" style="width:100%; margin-top:10px; color:var(--text-muted); font-size:1rem;"><i class="fas fa-times"></i> ${i18n('meal_discard_btn')}</button>
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

    // Attach Listeners za brisanje (X)
    document.querySelectorAll('.btn-delete-pending').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.target.closest('.btn-delete-pending');
            const idx = btnEl.getAttribute('data-index');
            currentUnsavedMeal.items.splice(idx, 1);
            if (currentUnsavedMeal.items.length === 0) {
                // Ako smo obrisali jedini sastojak, odbacujemo obrok totalno
                document.getElementById('btnCancelMeal').click();
            } else {
                drawPendingMealUI(); // Re-render
            }
        });
    });

    document.getElementById('btnConfirmMeal').addEventListener('click', saveMealToServer);
    document.getElementById('btnCancelMeal').addEventListener('click', () => {
        currentUnsavedMeal = null;
        editingMealIndex = null;
        renderDailyMeals(); // Osvjezi trenutnu listu i povrati stari obrok (ako editiramo)
        updateDashboardUI();
    });

    const btnAddMissing = document.getElementById('btnAddMissingItem');
    if (btnAddMissing) {
        btnAddMissing.addEventListener('click', handleMissingItemAdd);
    }
}

async function handleMissingItemAdd() {
    const itemName = prompt("Upišite naziv sastojka kojeg je AI zaboravio (npr. 'kruh', 'maslinovo ulje'):");
    if (!itemName || itemName.trim() === '') return;

    // Prvo provjeri lokalnu bazu
    if (typeof searchLocalFoodDB === 'function') {
        const localHit = searchLocalFoodDB(itemName.trim());
        if (localHit) {
            currentUnsavedMeal.items.push(localHit);
            drawPendingMealUI();
            return;
        }
    }

    // Ako nemamo lokalno, šalji na AI API
    const prevText = mealsList.innerHTML;
    mealsList.innerHTML = `<div class="empty-state" style="color:var(--accent-cyan);"><i class="fas fa-spinner fa-spin"></i><p>Pitam AI za: ${itemName}...</p></div>`;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                action: 'analyzeMeal',
                textDescription: itemName
            })
        });

        const responseText = await response.text();
        const result = JSON.parse(responseText);

        if (result.status === 'success' && result.data && result.data.items && result.data.items.length > 0) {
            currentUnsavedMeal.items.push(result.data.items[0]); // Dodaj prvi AI item
            drawPendingMealUI();
        } else {
            alert("AI nažalost nije prepoznao: " + itemName);
            mealsList.innerHTML = prevText;
            drawPendingMealUI(); // rebind
        }
    } catch (err) {
        alert("Greška sa spajanjem na AI: " + err.message);
        mealsList.innerHTML = prevText;
        drawPendingMealUI(); // rebind
    }
}

async function saveMealToServer() {
    const btn = document.getElementById('btnConfirmMeal');
    if (btn) {
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> SPREMAM...`;
        btn.disabled = true;
    }

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

            // ŠARKOV SUSTAV UČENJA (Nauči nova jela za offline bazu)
            try {
                if (!isExercise) {
                    let learnedArr = [];
                    const learnedStr = safeLocalStorage.getItem('calorieShark_learnedFoods');
                    if (learnedStr) learnedArr = JSON.parse(learnedStr);

                    let addedNew = false;
                    currentUnsavedMeal.items.forEach(item => {
                        // Ako dodano jelo nije iz lokalne baze (nema onu '⚡ Offline AI' bilješku), znači da je AI novo generirao!
                        if (!item.note || !item.note.includes('Offline AI') && !item.note.includes('AI Memorija/Baza')) {
                            // Provjeri jesmo li ga vec negdje naucili prije (po nazivu)
                            const exists = learnedArr.find(x => x.name.toLowerCase() === item.name.toLowerCase());
                            if (!exists) {
                                // Dodaj ga i spakuj standardne "komad / gram / ml" vrijednosti
                                learnedArr.push({
                                    name: item.name,
                                    keywords: [item.name.toLowerCase(), item.name.toLowerCase() + "a"],
                                    kcalPer100g: item.kcalPer100g,
                                    macrosPer100g: item.macrosPer100g,
                                    standardUnits: { "kom": 100, "porcija": 150 },
                                    note: "Naučeno od Google AI: " + new Date().toLocaleDateString('hr-HR')
                                });
                                addedNew = true;
                            }
                        }
                    });

                    // Spremi nazad u lokalnu memoriju ako smo obogatili rječnik
                    if (addedNew) {
                        safeLocalStorage.setItem('calorieShark_learnedFoods', JSON.stringify(learnedArr));
                    }
                }
            } catch (e) {
                console.warn("Greška kod AI sustava učenja:", e);
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

    // Spremamo obrok lokalno u niz za današnji dan - NA VRH (unshift)
    dailyData.meals.unshift({
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
    // Prikazujemo najnovije na vrhu (već su na početku zbog unshift)
    dailyData.meals.forEach((meal, originalIndex) => {
        let mealDesc = meal.items.map(item => `${item.name} (${item.estimatedWeightG}g)`).join(', ');

        html += `
        <div style="background: var(--bg-card); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid ${meal.totals.kcal < 0 ? '#00D084' : 'var(--accent-cyan)'}; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="flex:1;">
                    <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:5px;"><i class="fas fa-clock"></i> ${meal.time}</div>
                    <div style="font-weight:bold; font-size:0.95rem; color: ${meal.totals.kcal < 0 ? '#00D084' : 'var(--text-main)'}; line-height:1.4;">${mealDesc}</div>
                </div>
                <div style="font-size:1.3rem; font-weight:900; color:var(--accent-orange); margin-left:15px; text-align:right;">
                    ${meal.totals.kcal < 0 ? '<span style="color:' + (mealDesc.includes('KORACI') ? 'var(--accent-orange)' : '#00D084') + '"><i class="fas ' + (mealDesc.includes('KORACI') ? 'fa-shoe-prints' : 'fa-fire') + '"></i> ' + Math.abs(Math.round(meal.totals.kcal)) + '</span>' : Math.round(meal.totals.kcal)}<br><span style="font-size:0.7rem; color:var(--text-muted); font-weight:normal;">kcal</span>
                    ${meal.totals.kcal > 0 ? `
                        <div style="margin-top:5px;">
                            <i class="${meal.isFavorite ? 'fas' : 'far'} fa-star btn-toggle-fav" 
                               data-index="${originalIndex}" 
                               style="color: #F1C40F; cursor: pointer; font-size: 1.1rem;" 
                               title="Označi kao favorit"></i>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div style="display: flex; justify-content: flex-end; gap: 15px; margin-top: 10px; padding-top: 10px; border-top: 1px dashed var(--border-color);">
                <button class="btn-edit-meal" data-index="${originalIndex}" style="background: none; border: none; color: var(--accent-cyan); cursor: pointer; padding: 5px; font-size: 0.9rem;">
                    <i class="fas fa-edit"></i> ${i18n('btn_edit')}
                </button>
                <button class="btn-delete-meal" data-index="${originalIndex}" style="background: none; border: none; color: #FF2A2A; cursor: pointer; padding: 5px; font-size: 0.9rem;">
                    <i class="fas fa-trash"></i> ${i18n('btn_delete')}
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

    document.querySelectorAll('.btn-toggle-fav').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            toggleFavorite(index);
        });
    });
}

function toggleFavorite(index) {
    const meal = dailyData.meals[index];
    meal.isFavorite = !meal.isFavorite;
    saveDailyData();
    renderDailyMeals();
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
    const dailyMacros = {}; // Za pie chart najnovijeg dana

    meals.forEach(m => {
        // Pretvaramo "dd.MM.yyyy" u kraći format "dd.MM."
        const shortDate = m.date.substring(0, 5);
        if (!dailySums[shortDate]) dailySums[shortDate] = 0;
        dailySums[shortDate] += m.totals.kcal;

        // Racunamo pozitivne (unešene) makrose samo za zadnji/najnoviji vizualno
        if (m.totals.kcal > 0) {
            if (!dailyMacros[m.date]) dailyMacros[m.date] = { carbs: 0, protein: 0, fat: 0 };
            dailyMacros[m.date].carbs += (m.totals.carbs || 0);
            dailyMacros[m.date].protein += (m.totals.protein || 0);
            dailyMacros[m.date].fat += (m.totals.fat || 0);
        }
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

    // --- MACRO CHART LOGIKA ---
    // Dohvaćamo najnoviji zabilježeni datum na listi za pie chart
    const latestDate = meals[0].date;
    let todayMacros = dailyMacros[latestDate] || { carbs: 0, protein: 0, fat: 0 };

    // Inject kanvas dinamicki poslije grafa od kcal (ako vec ne postoji)
    const statsContainer = document.getElementById('kcalChart').parentElement;
    let macroCanvas = document.getElementById('macroChart');
    if (!macroCanvas) {
        macroCanvas = document.createElement('canvas');
        macroCanvas.id = 'macroChart';
        macroCanvas.width = 400;
        macroCanvas.height = 200;
        macroCanvas.style.marginTop = '20px';
        statsContainer.appendChild(macroCanvas);
    }

    const ctxMacro = macroCanvas.getContext('2d');
    if (window.macroChartInstance) {
        window.macroChartInstance.destroy();
    }

    const cG = Math.round(todayMacros.carbs);
    const pG = Math.round(todayMacros.protein);
    const fG = Math.round(todayMacros.fat);
    const totalG = cG + pG + fG;

    // Ako je total 0 da izbjegnemo NaN divisuon
    const pC = totalG > 0 ? Math.round((cG / totalG) * 100) : 0;
    const pP = totalG > 0 ? Math.round((pG / totalG) * 100) : 0;
    const pF = totalG > 0 ? Math.round((fG / totalG) * 100) : 0;

    window.macroChartInstance = new Chart(ctxMacro, {
        type: 'doughnut',
        data: {
            labels: [
                `Ugljikohidrati (${pC}%)`,
                `Proteini (${pP}%)`,
                `Masti (${pF}%)`
            ],
            datasets: [{
                data: [cG, pG, fG],
                backgroundColor: ['#00A8B5', '#00D084', '#FF2A2A'], // Cyan, Green, Red
                borderWidth: 2,
                borderColor: '#1E293B' // Da pase uz dark background
            }]
        },
        options: {
            responsive: true,
            cutout: '65%',
            plugins: {
                title: {
                    display: true,
                    text: `Makronutrijenti za ${latestDate}`,
                    color: '#7f8c8d'
                },
                legend: { position: 'right' }
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

        // Formiramo "lažni" AI odgovor i direktno spremamo bez Pending UI
        const fakeItems = [
            {
                name: ex.met === 0 ? `[VJEŽBA] Garmin / Smartwatch` : `[VJEŽBA] ${ex.name} (${val} min)`,
                estimatedWeightG: 100, // standardni factor
                kcalPer100g: -burnedKcal,
                macrosPer100g: { carbs: 0, protein: 0, fat: 0 }
            }
        ];

        // Sakrivamo modal
        exerciseModal.classList.add('hidden');
        inpExerciseDuration.value = 30; // reset

        // Postavljamo globalno da se može spremiti
        currentUnsavedMeal = { items: fakeItems };

        // Instant spremanje na server (i u lokalni dnevnik)
        saveMealToServer();
    });
}

// Boot
document.addEventListener('DOMContentLoaded', init);
