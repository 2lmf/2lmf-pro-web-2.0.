// 2LMF PRO CALC SCRIPT
const VERSION = "2.3-force-update"; // Cache busting
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyIWixcWJRDQOzcBPTCTfstUzbhrFJlTa7dMq21lnE2YunRDJL-IJlpxEnjf3w76-KI/exec";

// DOM Elements
const navBtns = document.querySelectorAll('.nav-btn');
const contentArea = document.getElementById('calculator-content');
const resultsSection = document.getElementById('results-section');
const resultsContainer = document.getElementById('results-container');

function translateModule(mod) {
    const map = {
        'facade': 'FASADE',
        'thermal': 'TERMOIZOLACIJA',
        'hydro': 'HIDROIZOLACIJA',
        'fence': 'OGRADE'
    };
    return map[mod] || mod.toUpperCase();
}

// State
// State
// State
let currentModule = 'facade';

// --- PRICE SYNC LOGIC ---

async function initPriceFetch() {
    if (!GOOGLE_SCRIPT_URL) {
        console.log("⚠️ No API URL configured. Using local prices.");
        return;
    }

    try {
        console.log("⏳ Fetching live prices...");
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=get_prices`);
        const livePrices = await response.json();

        if (livePrices.error) throw new Error(livePrices.error);
        if (Object.keys(livePrices).length === 0) throw new Error("Empty price list");

        // Sync Logic: Map SKU to our internal structure
        updatePricesRecursive(prices, livePrices);
        console.log("✅ Live prices active!", livePrices);

        // Show subtle success indicator
        const ind = document.createElement("div");
        ind.style.cssText = "position:fixed; bottom:10px; right:10px; background:#4cd964; color:white; padding:5px 10px; border-radius:20px; font-size:12px; opacity:0.8; z-index:9999;";
        ind.innerText = `⚡ Live Cijene (${Object.keys(livePrices).length})`;
        document.body.appendChild(ind);
        setTimeout(() => ind.remove(), 4000);

    } catch (e) {
        console.error("❌ Price sync failed:", e);
        // Also show alert
        const errDiv = document.createElement("div");
        errDiv.style.cssText = "position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); background:red; color:white; padding:20px; z-index:10000; font-size:20px;";
        errDiv.innerText = "GREŠKA PRI UČITAVANJU: \n" + e.message;
        document.body.appendChild(errDiv);
    }
}

function updatePricesRecursive(targetObj, sourceFlat) {
    for (const key in targetObj) {
        if (typeof targetObj[key] === 'object' && targetObj[key] !== null) {
            if (targetObj[key].hasOwnProperty('sku') && targetObj[key].hasOwnProperty('price')) {
                const sku = targetObj[key].sku;
                // Try uppercase SKU match
                let livePrice = sourceFlat[sku] || sourceFlat[sku.toUpperCase()] || sourceFlat[sku.toString().toUpperCase()];

                if (livePrice !== undefined) {
                    targetObj[key].price = parseFloat(livePrice);
                }
            } else {
                updatePricesRecursive(targetObj[key], sourceFlat);
            }
        }
    }
}

// Start fetch
document.addEventListener('DOMContentLoaded', () => {
    initPriceFetch();
});
const templates = {
    facade: `
        <div class="module-header" style="margin-bottom: 2rem;">
            <h2>🧱 Fasada (ETICS & ventilirana)</h2>
            <p>Izračunajte materijal za kontaktnu ili ventiliranu fasadu.</p>
        </div>
        <form id="calc-form">
            <div class="form-group">
                <label for="facade-type">Tip fasade</label>
                <select id="facade-type" name="type" onchange="toggleSubOptions()">
                    <option value="etics">ETICS (kontaktna - stiropor/vuna)</option>
                    <option value="ventilated">Ventilirana</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="area">Površina zida (m²)</label>
                <input type="text" inputmode="decimal" id="area" name="area" placeholder="npr. 150,5" required>
            </div>

            <!-- ETICS Options -->
            <div id="etics-options">
                <div class="form-group">
                    <label for="insulation-type">Vrsta izolacije</label>
                    <select id="insulation-type" name="material">
                        <option value="eps">EPS (stiropor)</option>
                        <option value="wool">Kamena vuna</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="thickness">Debljina izolacije (cm)</label>
                    <input type="number" id="thickness" name="thickness" value="10" min="1">
                </div>
            </div>

            <!-- Ventilated Options -->
            <div id="ventilated-options" class="hidden">
                 <div class="form-group">
                    <label for="cladding-type">Vrsta obloge</label>
                    <select id="cladding-type" name="cladding">
                        <option value="hpl">HPL ploče</option>
                        <option value="alu">Aluminijski kompozit (alucobond)</option>
                        <option value="fiber">Vlaknocementne ploče</option>
                    </select>
                </div>
                 <div class="form-group">
                    <label for="vent-insulation">Debljina vune (cm)</label>
                    <input type="number" id="vent-insulation" name="vent-thickness" value="10" min="1">
                </div>
            </div>

            </div>

            <!-- Contact Form -->
            <div class="user-details-grid">
                <div class="form-group">
                    <label for="user-name">Ime</label>
                    <input type="text" id="user-name" name="userName" placeholder="Vaše ime">
                </div>
                <div class="form-group">
                    <label for="user-phone">Kontakt broj <span style="color:red">*</span></label>
                    <input type="tel" id="user-phone" name="userPhone" placeholder="Br. telefona" required>
                </div>
                <div class="form-group">
                    <label for="user-email">Email <span style="color:red">*</span></label>
                    <input type="email" id="user-email" name="userEmail" placeholder="Vaš email" required>
                </div>
                <div class="form-group">
                    <label for="user-location">Lokacija</label>
                    <input type="text" id="user-location" name="userLocation" placeholder="Grad/Adresa">
                </div>
            </div>

            <button type="submit" class="calculate-btn">Izračunaj</button>
        </form>
    `,
    thermal: `
        <div class="module-header" style="margin-bottom: 2rem;">
            <h2>🌡️ Termoizolacija</h2>
            <p>XPS za podove/temelje i Vuna za krovove.</p>
        </div>
        <form id="calc-form">
            <div class="form-group">
                <label for="thermal-type">Primjena</label>
                <select id="thermal-type" name="type">
                    <option value="xps">XPS (podovi, temelji, podrum)</option>
                    <option value="roof">Kosi krov (staklena/kamena vuna)</option>
                </select>
            </div>
            <div class="form-group">
                <label for="area">Površina (m²)</label>
                <input type="text" inputmode="decimal" id="area" name="area" placeholder="npr. 50,5" required>
            </div>
            <div class="form-group">
                <label for="thickness">Debljina (cm)</label>
                <input type="number" id="thickness" name="thickness" value="5">
            </div>
            </div>

            <!-- Contact Form -->
            <div class="user-details-grid">
                <div class="form-group">
                    <label for="user-name">Ime</label>
                    <input type="text" id="user-name" name="userName" placeholder="Vaše ime">
                </div>
                <div class="form-group">
                    <label for="user-phone">Kontakt broj <span style="color:red">*</span></label>
                    <input type="tel" id="user-phone" name="userPhone" placeholder="Br. telefona" required>
                </div>
                <div class="form-group">
                    <label for="user-email">Email <span style="color:red">*</span></label>
                    <input type="email" id="user-email" name="userEmail" placeholder="Vaš email" required>
                </div>
                <div class="form-group">
                    <label for="user-location">Lokacija</label>
                    <input type="text" id="user-location" name="userLocation" placeholder="Grad/Adresa">
                </div>
            </div>

            <button type="submit" class="calculate-btn">Izračunaj</button>
        </form>
    `,
    hydro: `
        <div class="module-header" style="margin-bottom: 2rem;">
            <h2>💧 Hidroizolacija</h2>
            <p>Bitumen, Polimer cement ili TPO/PVC folije.</p>
        </div>
        <form id="calc-form">
            <div class="form-group">
                <label for="hydro-type">Sustav</label>
                <select id="hydro-type" name="type" required onchange="toggleHydroOptions()">
                    <option value="" disabled>Odaberite tip...</option>
                    <option value="bitumen-foundation">Bitumen - temelji</option>
                    <option value="bitumen-roof">Bitumen - ravni krov</option>
                    <option value="membrane-roof" selected>TPO/PVC - ravni krov</option>
                    <option value="pvc-foundation">PVC - temelji</option>
                    <option value="polymer">Polimercement - terase/kupaonice</option>
                    <option value="isoflex-pu500">Poliuretan, PU - terase</option>
                </select>
            </div>
            <div class="form-group">
                <label for="area">Površina (m²)</label>
                <input type="text" inputmode="decimal" id="area" name="area" placeholder="npr. 30,5" required>
            </div>
            
            <div id="membrane-options" class="hidden">
                 <div class="form-group">
                     <label for="membrane-mat">Materijal membrane</label>
                     <select id="membrane-mat" name="membraneMaterial" onchange="toggleMembraneThickness()">
                        <option value="tpo">TPO (termoplastični)</option>
                        <option value="pvc">PVC (polivinil klorid)</option>
                     </select>
                </div>
                <!-- TPO Thickness Options -->
                <div class="form-group" id="tpo-thickness-group">
                    <label for="tpo-thickness">Debljina TPO folije</label>
                    <select id="tpo-thickness" name="tpoThickness">
                        <option value="1.5">1.5 mm</option>
                        <option value="1.8">1.8 mm</option>
                        <option value="2.0">2.0 mm</option>
                    </select>
                </div>
            </div>

            <div id="hydro-xps-options" class="hidden">
                <div class="form-group">
                    <label for="hydro-thickness">Debljina XPS-a (cm) (min. 5cm)</label>
                    <input type="number" id="hydro-thickness" name="hydroThickness" value="5" min="5">
                </div>
            </div>

            <div id="polymer-options" class="hidden">
                 <div class="form-group">
                    <label for="polymer-finish">Završna obloga</label>
                    <select id="polymer-finish" name="polymerFinish">
                        <option value="none">Bez završne obloge</option>
                        <option value="ceramics">Keramika (Pločice)</option>
                    </select>
                </div>
            </div>

            </div>

            <!-- Contact Form -->
            <div class="user-details-grid">
                <div class="form-group">
                    <label for="user-name">Ime</label>
                    <input type="text" id="user-name" name="userName" placeholder="Vaše ime">
                </div>
                <div class="form-group">
                    <label for="user-phone">Kontakt broj <span style="color:red">*</span></label>
                    <input type="tel" id="user-phone" name="userPhone" placeholder="Br. telefona" required>
                </div>
                <div class="form-group">
                    <label for="user-email">Email <span style="color:red">*</span></label>
                    <input type="email" id="user-email" name="userEmail" placeholder="Vaš email" required>
                </div>
                <div class="form-group">
                    <label for="user-location">Lokacija</label>
                    <input type="text" id="user-location" name="userLocation" placeholder="Grad/Adresa">
                </div>
            </div>

            <button type="submit" class="calculate-btn">Izračunaj</button>
        </form>
    `,
    fence: `
        <div class="module-header" style="margin-bottom: 2rem;">
            <h2>🏡 Panel ograde</h2>
            <p>Izračun panelne ograde (2D ili 3D), stupova i pribora.</p>
        </div>
        <form id="calc-form">
            <!-- 0. Color Selection -->
            <div class="form-group">
                <label>Odaberite Boju</label>
                <div class="color-selection-row">
                    <div class="color-btn btn-ral-7016 active" onclick="selectColor('7016', this)">
                        ANTRACIT - RAL 7016
                    </div>
                    <div class="color-btn btn-ral-6005" onclick="selectColor('6005', this)">
                        ZELENO - RAL 6005
                    </div>
                </div>
                <!-- Hidden input to store selection -->
                <input type="hidden" id="fence-color" name="fenceColor" value="7016">
            </div>

            <!-- 1. Panel Type Selection -->
            <div class="form-group">
                <label for="panel-type">Tip panela</label>
                <select id="panel-type" name="panelType" onchange="toggleFenceOptions()">
                    <option value="2d">2D panel (6/5/6 mm)</option>
                    <option value="3d">3D panel</option>
                </select>
            </div>

            <!-- 2. Thickness (Only for 3D) -->
            <div id="fence-3d-options" class="hidden">
                <div class="form-group">
                    <label for="panel-thickness">Debljina žice (3D)</label>
                    <select id="panel-thickness" name="panelThickness">
                        <option value="4">4 mm</option>
                        <option value="5">5 mm</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="length">Ukupna dužina ograde (m)</label>
                <input type="text" inputmode="decimal" id="length" name="length" placeholder="npr. 25,5" required>
            </div>
            
            <div class="form-group">
                <label for="height">Visina panela</label>
                <select id="height" name="height">
                    <option value="103">103 cm</option>
                    <option value="123">123 cm</option>
                    <option value="153">153 cm</option>
                    <option value="173">173 cm</option>
                    <option value="203">203 cm</option>
                </select>
            </div>

            <div class="form-group">
                <label for="post-type">Tip stupova (60x60mm, sa kapom)</label>
                <select id="post-type" name="postType">
                     <option value="plate">S pločicom (za beton)</option>
                     <option value="concrete">Za betoniranje (stup duži min. 50cm od visine panela)</option>
                </select>
            </div>

            <!-- Layout Options -->
             <div class="form-group">
                <label>Izgled ograde</label>
                <div style="display: flex; gap: 1rem;">
                    <div class="layout-btn active" id="layout-straight" onclick="selectLayout('straight')">
                        <div class="layout-btn-text">Ravna</div>
                    </div>
                    <div class="layout-btn" id="layout-corners" onclick="selectLayout('corners')">
                        <input type="number" id="fence-corners" name="fenceCorners" placeholder="Broj kuteva ograde" min="0" onfocus="selectLayout('corners')">
                    </div>
                </div>
            </div>

            <!-- GATE OPTION (Moved Here) -->
            <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid #ccc;">
            <div class="form-group">
                <label>Trebate li pješačka vrata?</label>
                <div style="display: flex; gap: 1rem;">
                    <div class="layout-btn" id="gate-yes" onclick="selectGate('yes')">
                        <div class="layout-btn-text">DA</div>
                    </div>
                    <div class="layout-btn active" id="gate-no" onclick="selectGate('no')">
                        <div class="layout-btn-text">NE</div>
                    </div>
                </div>
                <input type="hidden" id="gate-needed" name="gateNeeded" value="no">
            </div>

            <!-- GATE SUB-OPTIONS -->
            <div id="gate-options" class="hidden" style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-top: 1.5rem;">
                <div class="form-group">
                    <label>Dimenzija vrata (Š x V)</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: flex-start;">
                        <!-- 1000x1000 -->
                        <div class="layout-btn small-btn active" id="gate-1000" onclick="selectGateSize('1000')" style="flex: 1 1 auto; min-width: 80px;">
                            <div class="layout-btn-text">1000x1000</div>
                        </div>
                        <!-- 1000x1200 -->
                        <div class="layout-btn small-btn" id="gate-1200" onclick="selectGateSize('1200')" style="flex: 1 1 auto; min-width: 80px;">
                            <div class="layout-btn-text">1000x1200</div>
                        </div>
                        <!-- 1000x1500 -->
                        <div class="layout-btn small-btn" id="gate-1500" onclick="selectGateSize('1500')" style="flex: 1 1 auto; min-width: 80px;">
                            <div class="layout-btn-text">1000x1500</div>
                        </div>
                        <!-- 1000x1700 -->
                        <div class="layout-btn small-btn" id="gate-1700" onclick="selectGateSize('1700')" style="flex: 1 1 auto; min-width: 80px;">
                            <div class="layout-btn-text">1000x1700</div>
                        </div>
                        <!-- 1000x2000 -->
                        <div class="layout-btn small-btn" id="gate-2000" onclick="selectGateSize('2000')" style="flex: 1 1 auto; min-width: 80px;">
                            <div class="layout-btn-text">1000x2000</div>
                        </div>
                    </div>
                    <input type="hidden" id="gate-size" name="gateSize" value="1000">
                </div>

                <div class="form-group">
                    <label>Vrsta stupova za vrata</label>
                    <select id="gate-post-type" name="gatePostType">
                        <option value="plate">Stupovi s pločicom</option>
                        <option value="concrete">Stupovi za betoniranje</option>
                    </select>
                </div>
            </div>

            <!-- Installation Option -->
            <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid #ccc;">
            <div class="form-group">
                <label>Trebate montažu?</label>
                <div style="display: flex; gap: 1rem;">
                    <div class="layout-btn" id="install-yes" onclick="selectInstallation('yes')">
                        <div class="layout-btn-text">DA</div>
                    </div>
                    <div class="layout-btn active" id="install-no" onclick="selectInstallation('no')">
                        <div class="layout-btn-text">NE</div>
                    </div>
                </div>
                <input type="hidden" id="fence-installation" name="fenceInstallation" value="no">
                <p style="font-size: 0.9rem; color: black; font-weight: 700; margin-top: 0.5rem; margin-bottom: 0;">
                    * Iznos montaže je informativnog karaktera i vrijedi za Zagreb i okolicu do 20km.
                </p>
            </div>
            
            </div>
            
            <!-- Contact Form -->
            <div class="user-details-grid">
                <div class="form-group">
                    <label for="user-name">Ime</label>
                    <input type="text" id="user-name" name="userName" placeholder="Vaše ime">
                </div>
                <div class="form-group">
                    <label for="user-phone">Kontakt broj <span style="color:red">*</span></label>
                    <input type="tel" id="user-phone" name="userPhone" placeholder="Br. telefona" required>
                </div>
                <div class="form-group">
                    <label for="user-email">Email <span style="color:red">*</span></label>
                    <input type="email" id="user-email" name="userEmail" placeholder="Vaš email" required>
                </div>
                <div class="form-group">
                    <label for="user-location">Lokacija</label>
                    <input type="text" id="user-location" name="userLocation" placeholder="Grad/Adresa">
                </div>
            </div>

            <button type="submit" class="calculate-btn">Izračunaj</button>
        </form>
    `
};

// Event Listeners
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        navBtns.forEach(b => b.classList.remove('active'));
        // Add active class
        btn.classList.add('active');

        currentModule = btn.dataset.module;
        loadModule(currentModule);
    });
});

// Functions
function loadModule(moduleName) {
    contentArea.innerHTML = templates[moduleName];
    // Re-attach listeners for the new form
    const form = document.getElementById('calc-form');
    if (form) {
        form.addEventListener('submit', handleCalculation);

        // Auto-format main input field (area or length)
        const mainInput = form.querySelector('input[name="area"], input[name="length"]');
        if (mainInput) {
            mainInput.addEventListener('blur', function () {
                let val = this.value.replace(',', '.');
                if (val && !isNaN(val)) {
                    this.value = parseFloat(val).toFixed(2).replace('.', ',');
                }
            });
        }
    }

    // Initial toggle check for Facade (and now Fence)
    if (moduleName === 'facade') toggleSubOptions();
    if (moduleName === 'hydro') toggleHydroOptions();
    if (moduleName === 'fence') {
        toggleFenceOptions();
        updateFenceHeights();
    }
}

// UI Toggles
window.selectLayout = function (type) {
    const btnStraight = document.getElementById('layout-straight');
    const btnCorners = document.getElementById('layout-corners');
    const inputCorners = document.getElementById('fence-corners');

    if (type === 'straight') {
        btnStraight.classList.add('active');
        btnCorners.classList.remove('active');
        // Clear input logic
        if (inputCorners) inputCorners.value = '';
    } else {
        btnCorners.classList.add('active');
        btnStraight.classList.remove('active');
        // If simply clicked container, focus input
        if (inputCorners && document.activeElement !== inputCorners) {
            inputCorners.focus();
        }
    }
}

window.selectInstallation = function (val) {
    const btnYes = document.getElementById('install-yes');
    const btnNo = document.getElementById('install-no');
    const input = document.getElementById('fence-installation');

    input.value = val;

    if (val === 'yes') {
        btnYes.classList.add('active');
        btnNo.classList.remove('active');
    } else {
        btnNo.classList.add('active');
        btnYes.classList.remove('active');
    }
}

window.selectGate = function (val) {
    const btnYes = document.getElementById('gate-yes');
    const btnNo = document.getElementById('gate-no');
    const input = document.getElementById('gate-needed');
    const options = document.getElementById('gate-options');

    input.value = val;

    if (val === 'yes') {
        btnYes.classList.add('active');
        btnNo.classList.remove('active');
        options.classList.remove('hidden');
    } else {
        btnNo.classList.add('active');
        btnYes.classList.remove('active');
        options.classList.add('hidden');
    }
}

window.selectGateSize = function (size) {
    // 1. Update hidden input
    document.getElementById('gate-size').value = size;

    // 2. Update visual buttons
    // Reset all
    ['1000', '1200', '1500', '1700', '2000'].forEach(s => {
        document.getElementById(`gate-${s}`).classList.remove('active');
    });

    // Set active
    document.getElementById(`gate-${size}`).classList.add('active');
}

window.toggleFenceOptions = function () {
    const type = document.getElementById('panel-type').value;
    const opt3d = document.getElementById('fence-3d-options');

    if (type === '3d') {
        opt3d.classList.remove('hidden');
    } else {
        opt3d.classList.add('hidden');
    }
    // Refresh height list
    updateFenceHeights();
}

// Data for heights
const fenceHeights = {
    '2d': [83, 103, 123, 143, 163, 183, 203],
    '3d': [83, 103, 123, 153, 173, 203]
};

window.updateFenceHeights = function () {
    const type = document.getElementById('panel-type').value;
    const heightSelect = document.getElementById('height');
    const validHeights = fenceHeights[type] || [];
    const currentVal = parseInt(heightSelect.value) || 0;

    heightSelect.innerHTML = '';

    validHeights.forEach(h => {
        const option = document.createElement('option');
        option.value = h;
        option.text = `${h} cm`;
        if (h === currentVal) option.selected = true;
        heightSelect.appendChild(option);
    });
}

window.toggleSubOptions = function () {
    const type = document.getElementById('facade-type').value;
    const eticsOpts = document.getElementById('etics-options');
    const ventOpts = document.getElementById('ventilated-options');

    if (type === 'etics') {
        eticsOpts.classList.remove('hidden');
        ventOpts.classList.add('hidden');
    } else {
        eticsOpts.classList.add('hidden');
        ventOpts.classList.remove('hidden');
    }
}

window.toggleHydroOptions = function () {
    const type = document.getElementById('hydro-type').value;
    const membraneOpts = document.getElementById('membrane-options');
    const xpsOpts = document.getElementById('hydro-xps-options');

    // Show Membrane options only for TPO/PVC Roof
    if (type === 'membrane-roof') {
        membraneOpts.classList.remove('hidden');
        toggleMembraneThickness(); // Check sub-options
    } else {
        membraneOpts.classList.add('hidden');
    }

    // Show XPS options for Foundations (Bitumen/PVC) AND now Roof (TPO/PVC)
    if (type === 'bitumen-foundation' || type === 'pvc-foundation' || type === 'membrane-roof') {
        xpsOpts.classList.remove('hidden');
    } else {
        xpsOpts.classList.add('hidden');
    }

    // Show Polymer Options
    const polymerOpts = document.getElementById('polymer-options');
    if (polymerOpts) {
        if (type === 'polymer') {
            polymerOpts.classList.remove('hidden');
        } else {
            polymerOpts.classList.add('hidden');
        }
    }
}

window.toggleMembraneThickness = function () {
    const matSelect = document.getElementById('membrane-mat');
    const tpoGroup = document.getElementById('tpo-thickness-group');

    if (matSelect && matSelect.value === 'tpo') {
        tpoGroup.classList.remove('hidden');
    } else {
        tpoGroup.classList.add('hidden');
    }
}

// Main Calculator Logic
// Main Calculator Logic
let isSubmitting = false;

function handleCalculation(e) {
    if (e) e.preventDefault();

    // EXTRACT DATA FROM FORM
    const form = document.getElementById('calc-form');
    if (!form) {
        console.error("Form element not found!");
        return;
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log("Starting calculation...", data);

    if (isSubmitting) {
        console.warn("Calculation block: Already submitting");
        return;
    }

    // Find the button and disable it temporarily
    const btn = document.querySelector('#calc-form .calculate-btn');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = "⏳ Računam...";
    }
    isSubmitting = true;

    // Re-enable after delay (prevents double clicks)
    setTimeout(() => {
        isSubmitting = false;
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = "Izračunaj";
        }
    }, 2000);

    // VALIDATION: Strict check for Email and Phone
    if (!data.userEmail || !data.userPhone) {
        alert("Molimo unesite Email i Kontakt broj za izračun.");
        // Re-enable immediately on validation error
        isSubmitting = false;
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = "Izračunaj";
        }
        return; // Stop calculation
    }

    console.log("Calculating for module:", currentModule, data);

    let results = [];

    // --- LOGIC ROUTER ---
    try {
        if (currentModule === 'facade') {
            results = calculateFacade(data);
        } else if (currentModule === 'thermal') {
            results = calculateThermal(data);
        } else if (currentModule === 'hydro') {
            results = calculateHydro(data);
        } else if (currentModule === 'fence') {
            results = calculateFence(data);
        }

        console.log("Calculation results:", results);

        if (results && results.length > 0) {
            displayResults(results);
            resultsSection.classList.remove('hidden');
            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth' });

            // 5. Send Data (Instant Logic) & Alert
            sendInstantData(results, data);

            setTimeout(() => {
                alert("Hvala na upitu! Vaš izračun je spreman ispod.\n(Kopija upita je poslana našem timu.)");
            }, 500);
        } else {
            console.warn("No results returned from calculation engine.");
            alert("Molimo provjerite unesene podatke.");
        }

    } catch (err) {
        console.error("Calculation Error:", err);
        alert("Greška u izračunu: " + err.message);
    }

    // Reset Button State
    if (btn) {
        btn.innerHTML = "Izračunaj";
        btn.disabled = false;
    }
    isSubmitting = false;
}

// --- CALCULATION ENGINES ---

function calculateFacade(data) {
    const area = parseFloat(data.area.replace(',', '.'));
    const waste = 1.05; // 5% waste
    let items = [];

    // console.log("Calculating Facade...", data); // Debug

    if (data.type === 'etics') {
        const h = parseInt(data.thickness) || 10;

        const pEtics = prices.facade_etics;

        let insulationName = pEtics.eps_base_cm.name;
        let insulationSku = pEtics.eps_base_cm.sku;
        let insulationPrice = h * pEtics.eps_base_cm.price;

        let glueStickName = pEtics.glue_eps.name;
        let glueStickPrice = pEtics.glue_eps.price;

        if (data.material === 'wool') {
            const allowed = [5, 6, 8, 10, 12, 14, 15];
            let snapH = h;
            const found = allowed.find(x => x >= h);
            if (found) snapH = found; else snapH = 15;

            const woolData = prices.wool_facade[snapH];
            insulationName = woolData.name;
            insulationSku = woolData.sku;
            insulationPrice = woolData.price;

            glueStickName = "Ljepilo za vunu (Ljepljenje)"; // Note: User list doesn't have a specific wool glue SKU, using EPS glue for now as placeholder or 4101
            glueStickPrice = pEtics.glue_eps.price;
        }

        // 1. Izolacija
        items.push({ sku: insulationSku, name: insulationName, value: (area * waste).toFixed(2), unit: 'm²', price: insulationPrice });

        // 2. Ljepilo za Ljepljenje
        items.push({ sku: pEtics.glue_eps.sku, name: glueStickName, value: (area * 3.5).toFixed(1), unit: 'kg', price: glueStickPrice });

        // 3. Ljepilo za Armiranje (Uniterm)
        items.push({ sku: pEtics.glue_armor.sku, name: pEtics.glue_armor.name, value: (area * 4.5).toFixed(1), unit: 'kg', price: pEtics.glue_armor.price });

        // 4. Mrežica
        items.push({ sku: pEtics.mesh.sku, name: pEtics.mesh.name, value: (area * 1.1).toFixed(2), unit: 'm²', price: pEtics.mesh.price });

        // 5. Profili
        items.push({ sku: pEtics.profile_pvc.sku, name: pEtics.profile_pvc.name, value: (area * 0.4).toFixed(1), unit: 'm', price: pEtics.profile_pvc.price });
        items.push({ sku: pEtics.profile_alu.sku, name: pEtics.profile_alu.name, value: (area * 0.2).toFixed(1), unit: 'm', price: pEtics.profile_alu.price });

        // 6. Pričvrsnice
        items.push({ sku: pEtics.dowel.sku, name: pEtics.dowel.name, value: Math.ceil(area * 6), unit: 'kom', price: pEtics.dowel.price });

        // 7. Grund
        items.push({ sku: pEtics.grund.sku, name: pEtics.grund.name, value: (area * 0.3).toFixed(1), unit: 'L', price: pEtics.grund.price });

        // 8. Završna žbuka
        items.push({ sku: pEtics.plaster_silicat.sku, name: pEtics.plaster_silicat.name, value: (area * 2.5).toFixed(1), unit: 'kg', price: pEtics.plaster_silicat.price });

    } else {
        // Ventilated
        items.push({ sku: '4050', name: 'Kamena vuna s voalom', value: (area * waste).toFixed(2), unit: 'm²' });
        items.push({ sku: '4051', name: `Fasadna obloga (${data.cladding})`, value: (area * waste).toFixed(2), unit: 'm²' });
        items.push({ sku: '4052', name: 'Alu nosači', value: Math.ceil(area * 2.5), unit: 'kom' });
        items.push({ sku: '4053', name: 'Vertikalni profili', value: (area * 2.2).toFixed(1), unit: 'm' });
        items.push({ sku: '4054', name: 'Vijci', value: Math.ceil(area * 15), unit: 'kom' });
    }

    return items;
}

function calculateThermal(data) {
    const area = parseFloat(data.area.replace(',', '.'));
    const waste = 1.05;
    let items = [];

    if (data.type === 'xps') {
        const thickness = parseInt(data.thickness);
        const xpsData = prices.xps[thickness];
        const isStik = prices.chemicals.insta_stik;
        const cepData = prices.membranes.cepasta;

        items.push({ sku: xpsData.sku, name: xpsData.name, value: (area * waste).toFixed(2), unit: 'm²', price: xpsData.price });
        items.push({ sku: isStik.sku, name: isStik.name, value: Math.ceil(area / 10), unit: 'pak', price: isStik.price });
        items.push({ sku: cepData.sku, name: cepData.name, value: (area * 1.1).toFixed(2), unit: 'm²', price: cepData.price });
    } else {
        const thickness = parseInt(data.thickness);
        const woolData = prices.wool_facade[thickness];
        const vaporData = prices.bitumen.vapor_al;

        items.push({ sku: woolData.sku, name: woolData.name, value: (area * waste).toFixed(2), unit: 'm²', price: woolData.price });
        items.push({ sku: vaporData.sku, name: vaporData.name, value: (area * 1.1).toFixed(2), unit: 'm²', price: vaporData.price });
    }
    return items;
}

function calculateHydro(data) {
    const area = parseFloat(data.area.replace(',', '.'));
    let items = [];

    // --- BITUMEN TEMELJI ---
    if (data.type === 'bitumen-foundation') {
        const thickness = parseInt(data.hydroThickness) || 5;
        const xpsData = prices.xps[thickness];

        // 1. Bitumen
        items.push({ sku: prices.chemicals.fimizol.sku, name: prices.chemicals.fimizol.name, value: (area * 0.3).toFixed(1), unit: 'L', price: prices.chemicals.fimizol.price });
        items.push({ sku: prices.bitumen.ruby_v4.sku, name: prices.bitumen.ruby_v4.name, value: (area * 1.15).toFixed(2), unit: 'm²', price: prices.bitumen.ruby_v4.price });

        // 2. XPS
        items.push({ sku: xpsData.sku, name: xpsData.name, value: (area * 1.05).toFixed(2), unit: 'm²', price: xpsData.price });
        items.push({ sku: prices.chemicals.insta_stik.sku, name: prices.chemicals.insta_stik.name, value: Math.ceil(area / 10), unit: 'pak', price: prices.chemicals.insta_stik.price });

        // 3. Čepasta
        items.push({ sku: prices.membranes.cepasta.sku, name: prices.membranes.cepasta.name, value: (area * 1.15).toFixed(2), unit: 'm²', price: prices.membranes.cepasta.price });

    } else if (data.type === 'bitumen-roof') {
        items.push({ sku: prices.chemicals.fimizol.sku, name: prices.chemicals.fimizol.name, value: (area * 0.3).toFixed(1), unit: 'L', price: prices.chemicals.fimizol.price });
        items.push({ sku: prices.bitumen.diamond_p4.sku, name: prices.bitumen.diamond_p4.name, value: (area * 1.15).toFixed(2), unit: 'm²', price: prices.bitumen.diamond_p4.price });
        items.push({ sku: prices.membranes.geotextile_200.sku, name: prices.membranes.geotextile_200.name, value: (area * 1.1).toFixed(2), unit: 'm²', price: prices.membranes.geotextile_200.price });
        items.push({ sku: prices.bitumen.vapor_al.sku, name: prices.bitumen.vapor_al.name, value: (area * 1.1).toFixed(2), unit: 'm²', price: prices.bitumen.vapor_al.price });

        // --- TPO / PVC ---
    } else if (data.type === 'membrane-roof' || data.type === 'tpo' || data.type === 'pvc-roof') {
        const thickness = parseInt(data.hydroThickness) || 5;
        const xpsData = prices.xps[thickness];

        // Determine sub-type from membraneMaterial
        const isTPO = (data.membraneMaterial === 'tpo') || (data.type === 'tpo');
        const tpoThickness = data.tpoThickness || '1.5';

        let folijaData = null;

        if (isTPO) {
            if (tpoThickness === '1.5') folijaData = prices.membranes.tpo_15;
            else if (tpoThickness === '1.8') folijaData = prices.membranes.tpo_18;
            else if (tpoThickness === '2.0') folijaData = prices.membranes.tpo_20;
            else folijaData = prices.membranes.tpo_15;
        } else {
            folijaData = prices.membranes.pvc_krov;
        }

        // 1. XPS
        items.push({ sku: xpsData.sku, name: xpsData.name, value: (area * 1.05).toFixed(2), unit: 'm²', price: xpsData.price });

        // 2. Foil
        items.push({ sku: folijaData.sku, name: folijaData.name, value: (area * 1.15).toFixed(2), unit: 'm²', price: folijaData.price });
        items.push({ sku: prices.membranes.geotextile_200.sku, name: prices.membranes.geotextile_200.name, value: (area * 1.1).toFixed(2), unit: 'm²', price: prices.membranes.geotextile_200.price });

        const limData = isTPO ? prices.others.tpo_lim : prices.others.pvc_lim;
        items.push({ sku: limData.sku, name: limData.name, value: 4, unit: 'kom', price: limData.price });

        // --- PVC FOUNDATION ---
    } else if (data.type === 'pvc-foundation') {
        const thickness = parseInt(data.hydroThickness) || 5;
        const xpsData = prices.xps[thickness];
        const pvcData = prices.membranes.pvc_temelji;
        const geoData = prices.membranes.geotextile_200;
        const isStik = prices.chemicals.insta_stik;
        const cepData = prices.membranes.cepasta;

        items.push({ sku: pvcData.sku, name: pvcData.name, value: (area * 1.10).toFixed(2), unit: 'm²', price: pvcData.price });
        items.push({ sku: geoData.sku, name: geoData.name, value: (area * 1.1).toFixed(2), unit: 'm²', price: geoData.price });
        items.push({ sku: xpsData.sku, name: xpsData.name, value: (area * 1.05).toFixed(2), unit: 'm²', price: xpsData.price });
        items.push({ sku: isStik.sku, name: isStik.name, value: Math.ceil(area / 10), unit: 'pak', price: isStik.price });
        items.push({ sku: cepData.sku, name: cepData.name, value: (area * 1.15).toFixed(2), unit: 'm²', price: cepData.price });

    } else if (data.type === 'polymer') {
        items.push({ sku: '1015', name: 'Polimercement (Aquamat Elastic) 2 sloja', value: (area * 3).toFixed(1), unit: 'kg', price: prices.chemicals.aquamat_elastic.price, cost_price: 0 });
        items.push({ sku: '1016', name: 'Brtveća traka', value: Math.ceil(Math.sqrt(area) * 4), unit: 'm', price: 0 });

        if (data.polymerFinish === 'ceramics') {
            items.push({ sku: '1017', name: 'Isomat AK-20', value: (area * 3.5).toFixed(1), unit: 'kg', price: prices.chemicals.ak20.price, cost_price: 0 });
        }
    } else if (data.type === 'isoflex-pu500') {
        items.push({ sku: '1018', name: 'Primer (Isomat Primer-PU 100)', value: (area * 0.2).toFixed(1), unit: 'kg', price: 0, cost_price: 0 });
        items.push({ sku: '1019', name: 'Isomat Isoflex PU500 (2 sloja)', value: (area * 1.5).toFixed(1), unit: 'kg', price: prices.chemicals.isoflex_pu500.price, cost_price: 0 });
        items.push({ sku: '1016', name: 'Brtveća traka', value: Math.ceil(Math.sqrt(area) * 4), unit: 'm', price: 0 });
    }

    return items;
}

// Color Selection Logic
window.selectColor = function (ral, btn) {
    // Update hidden input
    document.getElementById('fence-color').value = ral;

    // Update UI
    const btns = document.querySelectorAll('.color-btn');
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function calculateFence(data) {
    const length = parseFloat(data.length.replace(',', '.'));
    const height = parseInt(data.height); // 83, 103, 123, 153, 173, 203
    const color = data.color === '6005' ? 'Zelena (6005)' : 'Antracit (7016)';
    let items = [];

    // console.log("Calculating Fence...", height);

    // 1. PANELI
    let panelSku = '';
    let panelName = '';
    let panelPrice = 0;

    // Height match to SKU suffix/ID could be complex, assuming standard mapping from items_data.js
    // prices.fence.panel_2d[height] exists.

    const heightKey = height; // e.g. 83

    if (data.panelType === '2d') {
        if (prices.fence.panel_2d[heightKey]) {
            panelSku = prices.fence.panel_2d[heightKey].sku;
            panelPrice = prices.fence.panel_2d[heightKey].price;
            panelName = prices.fence.panel_2d[heightKey].name;
        } else {
            console.error("Missing 2D panel price for height", heightKey);
        }
    } else {
        // 3D
        const thickness = data.panelThickness || '5'; // default 5
        const groupKey = thickness == '4' ? 'panel_3d_4' : 'panel_3d_5';

        if (prices.fence[groupKey] && prices.fence[groupKey][heightKey]) {
            panelSku = prices.fence[groupKey][heightKey].sku;
            panelPrice = prices.fence[groupKey][heightKey].price;
            panelName = prices.fence[groupKey][heightKey].name;
        } else {
            console.error(`Missing 3D panel price ${groupKey} for height`, heightKey);
        }
    }

    // Calc Panels
    const numPanels = Math.ceil(length / 2.5);
    items.push({ sku: panelSku, name: panelName, value: numPanels, unit: 'kom', price: panelPrice });

    // 2. STUPOVI
    const corners = parseInt(data.fenceCorners) || 0;
    const numPosts = numPanels + 1 + corners;

    let postSku = '';
    let postName = '';
    let postPrice = 0;
    let postCost = 0;

    if (data.installation === 'parapet' || data.postType === 'plate') {
        // STUPOVI S PLOČICOM
        // Map Panel Height -> Post Size Key (prices.fence.posts[key])
        let pKey = 0;
        if (height == 83) pKey = 85; // 1020
        else if (height == 103) pKey = 105; // 1021
        else if (height == 123) pKey = 125; // 1022
        else if (height == 143) pKey = 145;
        else if (height == 153) pKey = 155;
        else if (height == 163) pKey = 165;
        else if (height == 173) pKey = 175;
        else if (height == 183) pKey = 185;
        else if (height == 203) pKey = 205;

        if (prices.fence.posts[pKey]) {
            postSku = prices.fence.posts[pKey].sku;
            postName = prices.fence.posts[pKey].name;
            postPrice = prices.fence.posts[pKey].price;
        } else {
            console.error("Missing Plate Post price for height", height, "key", pKey);
            postName = `Stup s pločicom (Greška: ${height})`;
        }

    } else {
        // STUPOVI ZA BETON
        let cKey = 150;
        if (height == 83 || height == 103) cKey = 150;
        else if (height == 123) cKey = 175;
        else if (height == 153) cKey = 200;
        else if (height == 173) cKey = 230;
        else if (height == 203) cKey = 250;

        if (prices.fence.posts_concrete[cKey]) {
            postSku = prices.fence.posts_concrete[cKey].sku;
            postName = prices.fence.posts_concrete[cKey].name;
            postPrice = prices.fence.posts_concrete[cKey].price;
        } else {
            console.error("Missing Concrete Post price for height", height, "key", cKey);
            postName = `Stup za beton (Greška: ${height})`;
        }
    }

    items.push({ sku: postSku, name: postName, value: numPosts, unit: 'kom', price: postPrice });

    // 3. PRIBOR
    // Spojnice
    items.push({
        sku: prices.fence.set_spojnica.sku,
        name: prices.fence.set_spojnica.name,
        value: numPosts * (height >= 173 ? 4 : (height >= 123 ? 3 : 2)), // 2 for <123, 3 for 123-163, 4 for >173
        unit: 'kom',
        price: prices.fence.set_spojnica.price
    });

    if (data.installation === 'parapet' || data.postType === 'plate') {
        items.push({
            sku: prices.fence.anker_vijci.sku,
            name: prices.fence.anker_vijci.name,
            value: numPosts * 4,
            unit: 'kom',
            price: prices.fence.anker_vijci.price
        });
    }

    // 4. MONTAŽA
    if (data.fenceInstallation === 'yes') {
        if (data.installation === 'parapet') {
            items.push({
                sku: prices.fence.montaza_plate.sku,
                name: prices.fence.montaza_plate.name,
                value: length.toFixed(2),
                unit: 'm\'',
                price: prices.fence.montaza_plate.price
            });
        } else {
            items.push({
                sku: prices.fence.montaza_concrete.sku,
                name: prices.fence.montaza_concrete.name,
                value: length.toFixed(2),
                unit: 'm\'',
                price: prices.fence.montaza_concrete.price
            });
        }
    }

    // 5. VRATA
    if (data.gateNeeded === 'yes') {
        const gSize = data.gateSize || '1000'; // Width
        const gFullKey = `1000x${gSize}`; // e.g. 1000x1000

        // Lookup
        const subKey = (data.installation === 'parapet' || data.postType === 'plate') ? 'plate' : 'concrete';

        if (prices.fence.gate_prices[gFullKey] && prices.fence.gate_prices[gFullKey][subKey]) {
            const gData = prices.fence.gate_prices[gFullKey][subKey];
            items.push({
                sku: gData.s, // SKU from user list (e.g. 1034)
                name: `Pješačka vrata 1000x${gSize}mm (${subKey === 'plate' ? 's pločicom' : 'za beton'})`,
                value: 1,
                unit: 'kom',
                price: gData.p
            });
        }
    }

    return items;
}

function displayResults(items) {
    resultsSection.classList.remove('hidden');
    resultsContainer.innerHTML = '';

    // Header Row
    const header = document.createElement('div');
    header.className = 'result-item result-header-row';
    header.innerHTML = `
        <span class="col-name">Materijal</span>
        <span class="col-qty">Količina</span>
        <span class="col-price">Cijena/jed</span>
        <span class="col-total">Ukupno</span>
    `;
    resultsContainer.appendChild(header);

    let grandTotal = 0;

    // Store items for email sending
    window.lastItems = items;

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'result-item';

        const qty = parseFloat(item.value);
        const unitPrice = item.price || 0;
        const totalCost = qty * unitPrice;

        if (unitPrice > 0) grandTotal += totalCost;

        // Formatiranje brojeva (hr-HR lokacija: točka za tisućice, zarez za decimale)
        const fmtPrice = unitPrice > 0 ? unitPrice.toLocaleString('hr-HR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €' : '-';
        const fmtTotal = unitPrice > 0 ? totalCost.toLocaleString('hr-HR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €' : '-';

        div.innerHTML = `
            <span class="result-label col-name">${item.name}</span>
            <span class="result-value col-qty">${item.value} <small>${item.unit}</small></span>
            <span class="result-price col-price">${fmtPrice}</span>
            <span class="result-total col-total">${fmtTotal}</span>
        `;
        resultsContainer.appendChild(div);
    });

    // Grand Total Row
    const totalDiv = document.createElement('div');
    totalDiv.className = 'result-item grand-total';
    const fmtGrandTotal = grandTotal.toLocaleString('hr-HR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Conditional Styling for Fence Module
    if (currentModule === 'fence') {
        const fenceColor = document.getElementById('fence-color').value;
        const colorCode = fenceColor === '6005' ? '#0B3D2E' : '#383E42'; // Green or Anthracite
        totalDiv.style.backgroundColor = colorCode;
        totalDiv.style.color = 'white'; // White text on dark bg

        // Add specific class to handle hover overrides if needed, 
        // but inline style might persist. We can handle hover via 'onmouseenter' / 'onmouseleave' 
        // or effectively by toggling classes. 
        // Simplest: Event listeners here to swap styles.
        totalDiv.addEventListener('mouseenter', () => {
            totalDiv.style.backgroundColor = 'rgba(230, 126, 34, 0.15)'; // Light Orange
            totalDiv.style.color = 'black';
            // Target inner strong tags if necessary, but inheritance usually works for color
            const strongs = totalDiv.querySelectorAll('strong');
            strongs.forEach(s => s.style.color = 'black');
        });
        totalDiv.addEventListener('mouseleave', () => {
            totalDiv.style.backgroundColor = colorCode;
            totalDiv.style.color = 'white';
            const strongs = totalDiv.querySelectorAll('strong');
            strongs.forEach(s => s.style.color = 'white');
        });

        // Initial White Text for child elements
        // We'll handle this in the innerHTML construction or verify after
    }

    totalDiv.innerHTML = `
        <span class="col-name"><strong>SVEUKUPNO:</strong></span>
        <span class="col-qty"></span>
        <span class="col-price"></span>
        <span class="col-total"><strong>${fmtGrandTotal} €</strong></span>
    `;

    if (currentModule === 'fence') {
        // Ensure initial inner text is white
        const strongs = totalDiv.querySelectorAll('strong');
        strongs.forEach(s => s.style.color = 'white');
    }

    resultsContainer.appendChild(totalDiv);

    // Add Payment Note to Frontend Result
    const noteDiv = document.createElement('div');
    noteDiv.className = 'result-note';
    noteDiv.style.marginTop = '20px';
    noteDiv.style.padding = '15px';
    noteDiv.style.backgroundColor = '#fff3e0';
    noteDiv.style.borderLeft = '4px solid #E67E22';
    noteDiv.style.fontSize = '0.9rem';
    noteDiv.style.color = '#444';

    noteDiv.innerHTML = `
        <strong>Uvjeti kupnje:</strong>
        <ul style="margin: 5px 0 10px 20px; padding: 0;">
            <li>Plaćanje: avans - uplatom na žiro račun</li>
            <li>Minimalni iznos kupovine: 200,00 eur</li>
            <li>Sve cijene su sa PDV-om, koji ne smije biti iskazan na računu*</li>
        </ul>
        <div style="font-size: 0.8rem; opacity: 0.8;">
            * Porezni obveznik nije u sustavu PDV-a, temeljem članka 90. Zakona o porezu na dodanu vrijednost
        </div>
    `;
    resultsContainer.appendChild(noteDiv);

    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Export Logic
const pdfBtn = document.getElementById('pdf-btn');
const emailBtn = document.getElementById('email-btn');

/* if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
        const element = document.getElementById('results-section');
        const opt = {
            margin: 10,
            filename: `izracun_${currentModule}_${new Date().toISOString().split('T')[0]}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        // Temporarily hide buttons for clean PDF
        const btns = document.querySelector('.action-buttons');
        btns.style.display = 'none';
 
        html2pdf().set(opt).from(element).save().then(() => {
            btns.style.display = 'flex'; // Restore buttons
        });
    });
} */

const emailBtnSend = document.getElementById('email-btn-send');

if (emailBtnSend) {
    emailBtnSend.addEventListener('click', () => {
        // Collect User Data from the current form
        // Note: IDs are unique because we completely overwrite HTML, so document.getElementById is safe
        const emailInput = document.getElementById('user-email');
        const nameInput = document.getElementById('user-name');
        const phoneInput = document.getElementById('user-phone');

        const email = emailInput ? emailInput.value.trim() : "";
        const name = nameInput ? nameInput.value.trim() : "Kupac";
        const phone = phoneInput ? phoneInput.value.trim() : "";

        if (!email) {
            alert("Molim vas upišite email adresu u formu prije slanja.");
            // Scroll to form if needed/possible, or just let user find it
            const form = document.querySelector('#calc-form');
            if (form) form.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        if (!window.lastItems || window.lastItems.length === 0) {
            alert("Nema stavki za slanje. Molimo napravite izračun prvo.");
            return;
        }

        // Prepare Payload
        // Map JS items to GAS expected structure: {name, qty, unit, price_sell}
        const itemsPayload = window.lastItems.filter(i => i.price > 0).map(i => ({
            sku: i.sku || "",
            name: i.name,
            qty: typeof i.value === 'string' ? parseFloat(i.value) : i.value,
            unit: i.unit,
            price_sell: i.price,
        }));

        const payload = {
            email: email,
            name: name,
            phone: phone,
            _subject: `Upit za ponudu - ${translateModule(currentModule)}`,
            items_json: JSON.stringify(itemsPayload)
        };

        // UI Feedback
        const originalText = emailBtnSend.innerHTML;
        emailBtnSend.innerHTML = "⏳ Šaljem...";
        emailBtnSend.disabled = true;

        // Send to GAS
        // Send to GAS
        const GAS_URL = GOOGLE_SCRIPT_URL;

        fetch(GAS_URL, {
            method: 'POST',
            body: new URLSearchParams(payload)
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    alert("Ponuda je uspješno poslana na vaš email!");
                } else {
                    alert("Došlo je do greške: " + data.error);
                }
            })
            .catch(err => {
                console.error(err);
                alert("Greška u komunikaciji sa serverom.");
            })
            .finally(() => {
                emailBtnSend.innerHTML = originalText;
                emailBtnSend.disabled = false;
            });
    });
}

// Load default
currentModule = 'hydro'; // Fix: Ensure state matches UI
loadModule('hydro');
setTimeout(() => {
    // Ensure options are visible for the default selection
    if (typeof toggleHydroOptions === 'function') toggleHydroOptions();
}, 100);

// PDF Generation Handler (Robust: Creates clean temporary HTML)
setTimeout(() => {
    const pdfBtn = document.getElementById('pdf-btn');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', function () {
            // Check if results exist
            if (!window.lastItems || window.lastItems.length === 0) {
                alert("Prvo napravite izračun!");
                return;
            }

            // Create a clean, temporary print container
            const printContainer = document.createElement('div');
            printContainer.id = 'pdf-print-container';

            // Inline Styles (VISIBLE for debugging/rendering stability)
            printContainer.style.position = 'fixed'; // Changed from absolute
            printContainer.style.left = '0';         // Changed from -9999px
            printContainer.style.top = '0';
            printContainer.style.width = '100%';     // Full width
            printContainer.style.height = '100%';    // Full height
            printContainer.style.overflow = 'auto';  // Scrollable if needed
            printContainer.style.background = 'white';
            printContainer.style.color = 'black';
            printContainer.style.fontFamily = "'Segoe UI', sans-serif";
            printContainer.style.padding = '20mm';
            printContainer.style.zIndex = '99999';   // On top of everything

            // Build HTML Content (Similar to Email Template)
            let rowsHtml = '';
            let total = 0;

            window.lastItems.forEach(item => {
                const lineTotal = item.value * item.price;
                total += lineTotal;
                rowsHtml += `
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 10px; text-align: left;">${item.name}</td>
                        <td style="padding: 10px; text-align: center;">${item.value} ${item.unit}</td>
                        <td style="padding: 10px; text-align: right; white-space: nowrap;">${item.price > 0 ? item.price.toLocaleString('hr-HR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €' : '-'}</td>
                        <td style="padding: 10px; text-align: right; white-space: nowrap; font-weight: bold;">${item.price > 0 ? lineTotal.toLocaleString('hr-HR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €' : '-'}</td>
                    </tr>
                `;
            });

            printContainer.innerHTML = `
                <div style="text-align: center; border-bottom: 4px solid #2C2C54; padding-bottom: 20px; margin-bottom: 30px;">
                    <h1 style="color: #E67E22; font-family: 'Chakra Petch', sans-serif; margin: 0; font-size: 28px; text-transform: uppercase;">2LMF PRO</h1>
                    <p style="margin: 5px 0 0 0; color: #333; font-size: 14px; font-weight: bold;">HIDRO & TERMO IZOLACIJA • FASADE • OGRADE</p>
                </div>

                <div style="margin-bottom: 30px;">
                    <h2 style="color: #E67E22; margin-bottom: 10px; font-size: 18px; border-bottom: 2px solid #ddd; padding-bottom: 5px;">INFORMATIVNA PONUDA</h2>
                    <p style="font-size: 12px; color: #555;">Hvala na vašem interesu. Ovdje je informativni izračun prema vašim parametrima.</p>
                </div>

                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                        <tr style="background-color: #E67E22; color: black;">
                            <th style="padding: 10px; text-align: left;">STAVKA</th>
                            <th style="padding: 10px; text-align: center;">KOL.</th>
                            <th style="padding: 10px; text-align: right;">CIJENA</th>
                            <th style="padding: 10px; text-align: right;">UKUPNO</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>

                <div style="margin-top: 30px; text-align: right;">
                    <div style="display: inline-block; background: #E67E22; color: black; padding: 15px; border: 2px solid #2C2C54; border-radius: 4px;">
                        <span style="display: block; font-size: 10px; text-transform: uppercase; margin-bottom: 5px;">SVEUKUPNI IZNOS</span>
                        <span style="font-size: 20px; font-weight: bold; font-family: 'Chakra Petch', sans-serif;">${total.toLocaleString('hr-HR', { minimumFractionDigits: 2 })} €</span>
                    </div>
                </div>

                <div style="margin-top: 40px; background: #fff3e0; padding: 15px; font-size: 11px; color: #444; border-left: 4px solid #E67E22;">
                    <b>Uvjeti kupnje:</b><br>
                    <ul style="margin-top:5px; padding-left: 20px;">
                        <li>Plaćanje: avans - uplatom na žiro račun</li>
                        <li>Minimalni iznos kupovine: 200,00 eur</li>
                        <li>Sve cijene su sa PDV-om, koji ne smije biti iskazan na računu*</li>
                    </ul>
                    <div style="margin-top: 5px; opacity: 0.8;">* Porezni obveznik nije u sustavu PDV-a, temeljem članka 90. Zakona o porezu na dodanu vrijednost</div>
                </div>

                <div style="margin-top: 50px; text-align: center; font-size: 10px; color: #666; border-top: 1px solid #ddd; padding-top: 20px;">
                    <b>2LMF PRO j.d.o.o.</b> • Orešje 7, 10090 Zagreb • Tel: +385 95 311 5007 • Email: 2lmf.info@gmail.com
                </div>
            `;

            // NATIVE PRINT STRATEGY (Most Robust)
            // 1. Create a new window
            const printWindow = window.open('', '_blank', 'width=1000,height=800');

            if (!printWindow) {
                alert("Molim vas omogućite skočne prozore (popups) za preuzimanje ponude.");
                return;
            }

            // 2. Build the full HTML document for the new window
            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Informativna Ponuda - 2LMF PRO</title>
                    <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700&family=Segoe+UI&display=swap" rel="stylesheet">
                    <style>
                        body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #000; background: #f9f9f9; }
                        .paper { background: white; padding: 40px; max-width: 210mm; margin: 0 auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th { background-color: #E67E22; color: #000; padding: 10px; text-align: left; }
                        td { padding: 10px; border-bottom: 1px solid #eee; }
                        .text-right { text-align: right; }
                        .text-center { text-align: center; }
                        h1 { font-family: 'Chakra Petch', sans-serif; color: #E67E22; margin: 0; }
                        
                        /* Action Bar for User */
                        .action-bar { text-align: center; margin-bottom: 30px; padding: 20px; background: #333; color: white; border-radius: 8px; }
                        .btn-print { background: #E67E22; border: none; padding: 12px 30px; color: black; font-weight: bold; font-size: 16px; cursor: pointer; border-radius: 4px; font-family: 'Chakra Petch', sans-serif; }
                        .btn-print:hover { background: #d35400; }

                        @media print {
                            body { background: white; padding: 0; }
                            .paper { box-shadow: none; padding: 0; margin: 0; max-width: none; }
                            .action-bar { display: none !important; } /* Hide button in PDF */
                            @page { margin: 10mm; }
                            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                        }
                    </style>
                </head>
                <body>
                    
                    <div class="action-bar">
                        <p style="margin: 0 0 10px 0; font-size: 1.2rem; font-weight: bold;">Vaša ponuda je spremna!</p>
                        <button class="btn-print" onclick="window.print()">🖨️ SPREMI KAO PDF / ISPIŠI</button>
                        <p style="margin: 15px 0 0 0; font-size: 0.9rem; color: #ccc;">
                            ℹ️ U prozorčiću koji se otvori, pod <b>"Odredište" (Destination)</b><br>
                            odaberite <b>"Spremi kao PDF"</b> (Save as PDF).
                        </p>
                    </div>

                    <div class="paper">
                        <div style="text-align: center; border-bottom: 4px solid #2C2C54; padding-bottom: 20px; margin-bottom: 30px;">
                            <h1>2LMF PRO</h1>
                            <p style="margin: 5px 0 0 0; color: #333; font-weight: bold;">HIDRO & TERMO IZOLACIJA • FASADE • OGRADE</p>
                        </div>

                        <div style="margin-bottom: 30px;">
                            <h2 style="color: #E67E22; margin-bottom: 10px; border-bottom: 2px solid #ddd; padding-bottom: 5px;">INFORMATIVNA PONUDA</h2>
                            <p style="font-size: 14px; color: #555;">Hvala na vašem interesu. Ovdje je informativni izračun prema vašim parametrima.</p>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>STAVKA</th>
                                    <th class="text-center">KOL.</th>
                                    <th class="text-right">CIJENA</th>
                                    <th class="text-right">UKUPNO</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml}
                            </tbody>
                        </table>

                        <div style="margin-top: 30px; text-align: right;">
                            <div style="display: inline-block; background: #E67E22; color: black; padding: 15px; border: 2px solid #2C2C54; border-radius: 4px;">
                                <span style="display: block; font-size: 12px; text-transform: uppercase;">SVEUKUPNI IZNOS</span>
                                <span style="font-size: 24px; font-weight: bold; font-family: 'Chakra Petch', sans-serif;">${total.toLocaleString('hr-HR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
                            </div>
                        </div>

                        <div style="margin-top: 40px; background: #fff3e0; padding: 15px; font-size: 12px; color: #444; border-left: 4px solid #E67E22;">
                            <b>Uvjeti kupnje:</b><br>
                            <ul style="margin-top:5px; padding-left: 20px;">
                                <li>Plaćanje: avans - uplatom na žiro račun</li>
                                <li>Minimalni iznos kupovine: 200,00 eur</li>
                                <li>Sve cijene su sa PDV-om, koji ne smije biti iskazan na računu*</li>
                            </ul>
                            <div style="margin-top: 5px; opacity: 0.8;">* Porezni obveznik nije u sustavu PDV-a, temeljem članka 90. Zakona o porezu na dodanu vrijednost</div>
                        </div>

                        <div style="margin-top: 50px; text-align: center; font-size: 11px; color: #000; background: #E67E22; padding: 20px; border-top: 4px solid #000;">
                            <b>2LMF PRO j.d.o.o.</b> • Orešje 7, 10090 Zagreb • Tel: +385 95 311 5007 • Email: 2lmf.info@gmail.com<br>
                            OIB: 29766043828 • IBAN: <b>HR312340009111121324</b>
                            <div style="margin-top:5px; opacity: 0.8;">© 2026 2LMF PRO</div>
                        </div>
                    </div>
                    
                </body>
                </html>
            `;

            printWindow.document.write(htmlContent);
            printWindow.document.close();
        });
    }
}, 1000);

// Helper function for Instant Data Capture
// Helper function for Instant Data Capture
function sendInstantData(items, userData) {
    // CORRECT URL (Same as Manual Button)
    const GAS_URL = GOOGLE_SCRIPT_URL;

    // Safety check - we need at least email
    if (!userData.userEmail) return;

    const itemsPayload = items.filter(i => i.price > 0 || i.price === 0).map(i => ({
        sku: i.sku || "",
        name: i.name,
        qty: i.value,
        unit: i.unit,
        price_sell: i.price || 0, price_buy_mpc: i.cost_price || 0,
    }));

    const payload = {
        email: userData.userEmail,
        name: userData.userName || "Kupac",
        phone: userData.userPhone,
        _subject: `Upit za ponudu - ${translateModule(currentModule)}`,
        items_json: JSON.stringify(itemsPayload),
        silent: 'true' // Trigger for backend to skip immediate customer email
    };

    console.log("Sending instant data...", payload);

    fetch(GAS_URL, {
        method: 'POST',
        body: new URLSearchParams(payload)
    }).then(() => console.log("Instant data sent successfully."))
        .catch(e => console.error("Instant send failed", e));
}





// --- GOOGLE SHEETS LIVE PRICING ---
// const GOOGLE_SCRIPT_URL is defined at the top of the file


