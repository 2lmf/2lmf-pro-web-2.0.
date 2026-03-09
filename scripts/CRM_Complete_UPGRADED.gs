// --- BUSINESS LOGIC: MATERIAL CONFIGURATION ---
// Ovdje podesite nabavne faktore (u odnosu na MPC) i dobavljače.
const MATERIAL_CONFIG = {
  "XPS": { buy_factor: 0.80, supplier: "RAVA" }, // Margin 25%
  "Kamena vuna": { buy_factor: 0.80, supplier: "RAVA" }, // Margin 25%
  "TPO": { buy_factor: 0.77, supplier: "RAVA" }, // Margin 30%
  "PVC": { buy_factor: 0.80, supplier: "RAVA" },
  "Diamond": { buy_factor: 0.74, supplier: "RAVA" },
  "Ruby": { buy_factor: 0.74, supplier: "RAVA" },
  "Vapor": { buy_factor: 0.74, supplier: "RAVA" },
  "Alu-Termo": { buy_factor: 0.74, supplier: "RAVA" },
  "OSB": { buy_factor: 0.80, supplier: "RAVA" },
  "Insta Stik": { buy_factor: 0.74, supplier: "RAVA" },
  "Ethafoam": { buy_factor: 0.74, supplier: "RAVA" },
  "PE Folija": { buy_factor: 0.70, supplier: "RAVA" },
  "Čepasta": { buy_factor: 0.70, supplier: "RAVA" },
  "Paropropusno": { buy_factor: 0.74, supplier: "RAVA" },
  "EPS": { buy_factor: 0.80, supplier: "RAVA" },
  "Žbuka": { buy_factor: 0.74, supplier: "RAVA" },
  "Uniterm": { buy_factor: 0.74, supplier: "RAVA" },
  "Grund": { buy_factor: 0.74, supplier: "RAVA" },
  "Profil": { buy_factor: 0.74, supplier: "RAVA" },
  "Mrežica": { buy_factor: 0.74, supplier: "RAVA" },
  "2D panel": { buy_factor: 0.77, supplier: "Dobavljač Ograde" },
  "3D panel": { buy_factor: 0.77, supplier: "Dobavljač Ograde" },
  "Stup": { buy_factor: 0.77, supplier: "Dobavljač Ograde" },
  "Pješačka vrata": { buy_factor: 0.77, supplier: "Dobavljač Ograde" },
  "Spojnice": { buy_factor: 0.77, supplier: "Dobavljač Ograde" },
  "Sidreni vijci": { buy_factor: 0.77, supplier: "Dobavljač Ograde" },
  "Aquamat": { buy_factor: 0.77, supplier: "Isomat" },
  "Isoflex": { buy_factor: 0.77, supplier: "Isomat" },
  "AK-20": { buy_factor: 0.77, supplier: "Isomat" },
  "Montaža": { buy_factor: 0.00, supplier: "-" }, 
  "Usluga montaže": { buy_factor: 0.00, supplier: "-" }
};

// ==========================================
// 2LMF PRO - CALCULATOR BACKEND & CRM
// ==========================================

// --- CONFIGURATION ---
var SCRIPT_PROP = PropertiesService.getScriptProperties();

// --- 1. SETUP SYSTEM (Run this once!) ---
function setupCRM() {
  // CONFIG: Existing Sheet ID
  var EXISTING_ID = "1YmRZMeomWxAmfi6rsLN6qKrHrrAeHOnGVbnfsZXP3w4";
  
  // Link to existing sheet
  var ss = SpreadsheetApp.openById(EXISTING_ID);
  
  // Store ID in Script Properties so other functions can find it
  var SCRIPT_PROP = PropertiesService.getScriptProperties();
  SCRIPT_PROP.setProperty("SHEET_ID", EXISTING_ID);
  
  // Setup "Upiti" (Inquiry Log) if not exists
  var sheetLog = ss.getSheetByName("Upiti");
  if (!sheetLog) {
      sheetLog = ss.insertSheet("Upiti");
      sheetLog.appendRow(["Datum", "ID", "Ime", "Email", "Telefon", "Modul", "Iznos (€)", "Boja", "Status", "JSON_Data"]);
      sheetLog.setFrozenRows(1);
      sheetLog.setColumnWidth(10, 50); 
  }
  
  // Setup "Generator" (Offer Maker) if not exists
  var sheetGen = ss.getSheetByName("Generator Ponuda");
  if (!sheetGen) {
      sheetGen = ss.insertSheet("Generator Ponuda");
      setupGeneratorLayout(sheetGen);
  } else {
      // Optional: Refresh layout
      setupGeneratorLayout(sheetGen);
  }
  
  // Setup "Dnevnik knjiženja" if not exists
  var sheetDnevnik = ss.getSheetByName("Dnevnik knjiženja");
  if (!sheetDnevnik) {
      sheetDnevnik = ss.insertSheet("Dnevnik knjiženja");
      sheetDnevnik.appendRow(["Datum", "Vrsta dokumenta", "Stranka", "Opis", "Dokument", "Konto", "Naziv konta", "Duguje", "Potrazuje", "saldo"]);
      sheetDnevnik.getRange("A1:J1").setFontWeight("bold").setBackground("#d9ead3");
      sheetDnevnik.setFrozenRows(1);
  }

  // Set Default Settings if not exists
  if (!SCRIPT_PROP.getProperty("COMPANY_NAME")) SCRIPT_PROP.setProperty("COMPANY_NAME", "TVRTKA D.O.O.");
  if (!SCRIPT_PROP.getProperty("COMPANY_OIB")) SCRIPT_PROP.setProperty("COMPANY_OIB", "12345678901");
  if (!SCRIPT_PROP.getProperty("COMPANY_ADDRESS")) SCRIPT_PROP.setProperty("COMPANY_ADDRESS", "Ulica 1, Zagreb");

  // Setup "Putni nalozi" if not exists
  var sheetPutni = ss.getSheetByName("Putni nalozi");
  if (!sheetPutni) {
      sheetPutni = ss.insertSheet("Putni nalozi");
      sheetPutni.appendRow(["Datum", "Relacija", "Svrha", "Početni km", "Završni km", "Ukupno km", "Iznos (€)", "Vozač", "Vozilo", "Registracija", "Status"]);
      sheetPutni.getRange("A1:K1").setFontWeight("bold").setBackground("#cfe2f3");
      sheetPutni.setFrozenRows(1);
  } else {
      // Proširi kolone ako nedostaju
      var headers = sheetPutni.getRange("A1:K1").getValues()[0];
      if (headers.indexOf("Vozač") === -1) {
          sheetPutni.getRange("H1:K1").setValues([["Vozač", "Vozilo", "Registracija", "Status"]]);
          sheetPutni.getRange("H1:K1").setFontWeight("bold").setBackground("#cfe2f3");
      }
  }

  // Setup "Loko vožnja" if not exists
  var sheetLoko = ss.getSheetByName("Loko vožnja");
  if (!sheetLoko) {
      sheetLoko = ss.insertSheet("Loko vožnja");
      sheetLoko.appendRow(["Mjesec", "Ukupno km", "Iznos (€)", "Vozač", "Vozilo", "Registracija", "Status", "JOPPD Oznaka"]);
      sheetLoko.getRange("A1:H1").setFontWeight("bold").setBackground("#cfe2f3");
      sheetLoko.setFrozenRows(1);
  } else {
      // Proširi kolone ako nedostaju
      var headers = sheetLoko.getRange("A1:H1").getValues()[0];
      if (headers.indexOf("Vozač") === -1) {
          sheetLoko.getRange("D1:H1").setValues([["Vozač", "Vozilo", "Registracija", "Status", "JOPPD Oznaka"]]);
          sheetLoko.getRange("D1:H1").setFontWeight("bold").setBackground("#cfe2f3");
      }
  }

  // Set Folder IDs for AI OCR
  SCRIPT_PROP.setProperty("FOLDER_IN_ID", "1kpBzqrSHVWTaBi8kKIUXknKhRtoUEy5g");
  SCRIPT_PROP.setProperty("FOLDER_OUT_ID", "1N7XfCy5s0XnLrCJaBB2QxhJ3gH6eya_a");

  // Setup "Putni nalozi" if not exists
  var sheetPutni = ss.getSheetByName("Putni nalozi");
  if (!sheetPutni) {
      sheetPutni = ss.insertSheet("Putni nalozi");
      sheetPutni.appendRow(["Datum", "Relacija", "Svrha", "Početni km", "Završni km", "Ukupno km", "Iznos (€)", "Status"]);
      sheetPutni.getRange("A1:H1").setFontWeight("bold").setBackground("#cfe2f3");
      sheetPutni.setFrozenRows(1);
  }

  // Setup "Loko vožnja" if not exists
  var sheetLoko = ss.getSheetByName("Loko vožnja");
  if (!sheetLoko) {
      sheetLoko = ss.insertSheet("Loko vožnja");
      sheetLoko.appendRow(["Mjesec", "Ukupno km", "Iznos (€)", "Status", "JOPPD Oznaka"]);
      sheetLoko.getRange("A1:E1").setFontWeight("bold").setBackground("#cfe2f3");
      sheetLoko.setFrozenRows(1);
  }

  
  console.log("✅ SUSTAV USPJEŠNO POVEZAN SA STAROM TABLICOM!");
  console.log("ID Tablice: " + EXISTING_ID);
  console.log("LINK NA TABLICU: " + ss.getUrl());
}

function setupGeneratorLayout(sheet) {
  sheet.clear();
  // Header Info
  sheet.getRange("A1").setValue("GENERATOR PONUDA").setFontWeight("bold").setFontSize(16);
  sheet.getRange("A3").setValue("Unesi ID Upita (Pretraga):");
  sheet.getRange("B3").setBackground("#FFF2CC").setBorder(true, true, true, true, null, null);
  
  sheet.getRange("A4").setValue("Broj Ponude / Računa:");
  sheet.getRange("B4").setBackground("#D9EAD3").setBorder(true, true, true, true, null, null);
  
  sheet.getRange("D3").setValue("Status:");
  sheet.getRange("E3").setFormula('=VLOOKUP(B3; Upiti!B:H; 7; FALSE)'); // Auto-status check
  
  // Customer Info Block
  sheet.getRange("A5").setValue("Podaci o Kupcu (Učitano)");
  sheet.getRange("A6").setValue("Ime:");
  sheet.getRange("A7").setValue("Email:");
  sheet.getRange("A8").setValue("Tel:");
  sheet.getRange("A9").setValue("Boja:");
  
  // Item Table Header (Moved down by 2)
  sheet.getRange("A10").setValue("Adresa:");
  sheet.getRange("A11").setValue("OIB / PDV ID:");
  
  sheet.getRange("A12:F12").setValues([["RB", "Šifra", "Opis Stavke", "Količina", "Jed. Mj.", "Cijena (€)"]]);
  sheet.getRange("A12:F12").setBackground("#E67E22").setFontColor("black").setFontWeight("bold");
  
  // Instructions & Mobile Controls
  sheet.getRange("H3").setValue("UPRAVLJANJE (MOBITEL):").setFontWeight("bold");
  sheet.getRange("H4").setValue("👇 1. Klikni za Učitavanje");
  sheet.getRange("H5").insertCheckboxes();
  sheet.getRange("H6").setValue("(Status učitavanja)");

  sheet.getRange("H7").setValue("👇 2. Klikni za Slanje Ponude");
  sheet.getRange("H8").insertCheckboxes();
  sheet.getRange("H9").setValue("(Status slanja ponude)");
  
  sheet.getRange("H10").setValue("👇 3. Klikni za Slanje Računa");
  sheet.getRange("H11").insertCheckboxes();
  sheet.getRange("H12").setValue("(Status slanja računa)");
}

// --- 2. WEB APP HANDLER ---
function doGet(e) {
  // 1. Check for API actions (e.g., from Web Kalkulator)
  if (e.parameter.action === 'get_prices') {
    var pricing = getLatestPricing();
    // Return flat prices object as expected by kalkulator.js
    return ContentService.createTextOutput(JSON.stringify(pricing.prices))
        .setMimeType(ContentService.MimeType.JSON);
  }

  // 2. Default: Show HTML UI for Sheet Admin
  var pricing = getLatestPricing();
  var tmpl = HtmlService.createTemplateFromFile('Index');
  tmpl.livePricing = JSON.stringify(pricing); // Inject into template
  
  return tmpl.evaluate()
      .setTitle('2LMF PRO | Kalkulator')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getLatestPricing() {
  var ss = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("SHEET_ID") || "1YmRZMeomWxAmfi6rsLN6qKrHrrAeHOnGVbnfsZXP3w4");
  var sheet = ss.getSheetByName("CJENIK");
  var result = { prices: {}, catalog: [] };
  
  if (sheet) {
    var data = sheet.getDataRange().getValues();
    // Preuzimamo zaglavlje da lociramo kolone ako se promijene, ali pretpostavljamo standard:
    // A=SKU, B=Naziv, C=VPC, D=Nabavna MPC, E=Prodajna MPC, F=JM
    for (var i = 1; i < data.length; i++) {
      var sku = String(data[i][0] || "").trim();
      var name = String(data[i][1] || "").trim();
      var mpc = parseFloat(data[i][4]); // Column E: Prodajna MPC
      var unit = String(data[i][9] || "kom").trim(); // Column J: Jedinica mjere
      
      if (sku && !isNaN(mpc)) {
        result.prices[sku] = mpc;
        result.catalog.push({
          sku: sku,
          name: name,
          unit: unit,
          price: mpc
        });
      }
    }
  }
  return result;
}

function doPostManual(payload) {
  // When called via google.script.run, we want a plain object return, not ContentOutput
  return processInquiry(payload); 
}

function manualTriggerPermissions() {
  var sheetId = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  var ss = SpreadsheetApp.openById(sheetId);
  var testMail = Session.getActiveUser().getEmail();
  
  MailApp.sendEmail(testMail, "2LMF: Provjera dozvola", "Slanje maila radi! Provjeravam tablicu: " + ss.getName());
  
  // Test PDF generation to trigger those permissions too
  var blob = HtmlService.createHtmlOutput("<h1>PDF Test</h1>").getAs('application/pdf');
  MailApp.sendEmail({
    to: testMail,
    subject: "2LMF: Test PDF",
    body: "U privitku je testni PDF. Ako ga vidiš, sve dozvole su aktivne!",
    attachments: [blob]
  });
  console.log("✅ Dozvole su aktivne!");
}

function doPost(e) {
  var result = processInquiry(e.parameter);
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function processInquiry(params) {
  try {
    // --- 1. PRAĆENJE PRVOG KLIKA U KALKULATORU ---
    if (params.action === 'log_interaction') {
      var sheetId = SCRIPT_PROP.getProperty("SHEET_ID");
      if (sheetId) {
        var ss = SpreadsheetApp.openById(sheetId);
        var sheetInterakcije = ss.getSheetByName("Interakcije");
        if (!sheetInterakcije) {
          sheetInterakcije = ss.insertSheet("Interakcije");
          sheetInterakcije.appendRow(["Vrijeme", "Modul", "Izvor"]);
        }
        sheetInterakcije.appendRow([params.timestamp || new Date(), params.module, params.source]);
      }
      return { result: 'success' };
    }
    // ---------------------------------------------

    var name = params.name || params.userName || "Kupac";
    var email = params.email || params.userEmail;
    var phone = params.phone || params.userPhone || "-";
    var subject = params._subject || params.subject || "Upit";
    var type = params.type || (subject.indexOf("vodič") !== -1 ? "guide" : "calculator");
    
    var inquiryId;
    
    if (subject.indexOf("vodič") !== -1) {
      // RENTSHARK GUIDE FLOW
      inquiryId = getNextSequenceId("g");
      var lossValue = params.lossValue || "0 €";
      
      // 1. Send Guide to Customer
      var customerHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #E67E22;">Vaš RentShark Plan Uštede je spreman! 🦈</h2>
          <p>Poštovani/a <b>${name}</b>,</p>
          <p>Hvala što ste koristili naš kalkulator. Na temelju vaših podataka, izračunali smo da godišnje portali uzimaju oko <b>${lossValue}</b> vašeg truda.</p>
          <p>U prilogu i na linku ispod nalazi se detaljan vodič kako tu brojku svesti na nulu uz automatizaciju i direktni booking.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://2lmf-pro.hr/sharkbook-pdf/sharkbook_vodic.pdf" 
               style="background: #E67E22; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
               PREUZMI PDF VODIČ (2.5 MB)
            </a>
          </div>
          <p>Za sva pitanja oko implementacije, stojimo na raspolaganju.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #888;">2LMF PRO & SharpShark Digital<br>Web: 2lmf-pro.hr | Mob: +385 95 311 5007</p>
        </div>
      `;

      MailApp.sendEmail({
        to: email,
        subject: "📥 Vaš RentShark Vodič (Plan Uštede)",
        htmlBody: customerHtml,
        name: "2LMF PRO | RentShark"
      });

      // 2. Notify Admin
      var adminHtml = `<h3>Novi zahtjev za VODIČ (${inquiryId})</h3>
                       <p><b>Ime:</b> ${name}</p>
                       <p><b>Email:</b> ${email}</p>
                       <p><b>Izračunata ušteda:</b> ${lossValue}</p>
                       <p><b>Izvor:</b> ${params.source || "Kalkulator Uštede"}</p>`;
                       
      MailApp.sendEmail({
        to: "info@2lmf-pro.hr", 
        subject: "📈 ZAHTJEV ZA VODIČ: " + name + " (" + inquiryId + ")",
        htmlBody: adminHtml
      });

      // 3. Log to CRM
      logToCRM(inquiryId, name, email, phone, "RentShark Vodič", 0, "PDF", "NOVO", "Ušteda: " + lossValue);

    } else if (type === 'contact') {
      // CONTACT FORM FLOW
      inquiryId = getNextSequenceId("k");
      var message = params.message || "-";
      subject = "📧 [KONTAKT] " + name;
      
      // Notify Admin
      var adminHtml = `<h3>Novi kontakt upit (${inquiryId})</h3>
                       <p><b>Ime:</b> ${name}</p>
                       <p><b>Email:</b> ${email}</p>
                       <p><b>Telefon:</b> ${phone}</p>
                       <p><b>Poruka:</b><br>${message.replace(/\n/g, '<br>')}</p>`;
                       
      MailApp.sendEmail({
        to: "info@2lmf-pro.hr", 
        subject: "📩 NOVI KONTAKT UPIT: " + name + " (" + inquiryId + ")",
        htmlBody: adminHtml
      });
      
      // Log to CRM
      logToCRM(inquiryId, name, email, phone, "Kontakt Forma", 0, "-", "NOVO", message);
      
    } else {
      // CALCULATOR FLOW (Existing logic)
      var itemsJson = params.items_json || "[]";
      var items = JSON.parse(itemsJson);
      
      // Normalize items
      items = items.map(function(it) {
        if (it.price !== undefined && it.price_sell === undefined) {
          it.price_sell = it.price;
        }
        return it;
      });

      inquiryId = getNextSequenceId("u");
      items = enrichItemsWithCosts(items);
      
      var isHidro = String(subject || "").toUpperCase().indexOf("HIDRO") !== -1;
      var customerHtml = generateHtml(items, name, true, inquiryId, params.color || "Sustav", isHidro, subject);
      
      var pdfBlob = null;
      try {
        pdfBlob = HtmlService.createHtmlOutput(customerHtml)
                        .setTitle("Ponuda " + inquiryId)
                        .getAs('application/pdf');
        pdfBlob.setName("Ponuda_" + inquiryId + ".pdf");
      } catch (pdfErr) {
        console.error("PDF Fail: " + pdfErr);
      }

      var customerMailOptions = {
        to: email,
        subject: subject,
        htmlBody: customerHtml,
        name: "2LMF PRO"
      };
      if (pdfBlob) customerMailOptions.attachments = [pdfBlob];

      if (params.type !== 'silent' && params.silent !== 'true') {
          MailApp.sendEmail(customerMailOptions);
      }
      
      var adminHtml = generateAdminHtml(items, name, email, phone, subject, customerHtml, params.location);
      var adminMailOptions = {
        to: "info@2lmf-pro.hr", 
        subject: "🔔 NOVI UPIT: " + name + " (" + inquiryId + ")",
        htmlBody: adminHtml
      };
      if (pdfBlob) adminMailOptions.attachments = [pdfBlob];
      
      MailApp.sendEmail(adminMailOptions);
      
      var total = items.reduce((sum, i) => sum + ((parseFloat(i.qty) || 0) * (parseFloat(i.price_sell) || 0)), 0);
      logToCRM(inquiryId, name, email, phone, subject, total, params.color || "", "NOVO", JSON.stringify(items));
    }
    
    return { result: 'success', id: inquiryId };
    
  } catch(error) {
    console.error("Inquiry CRASH: " + error);
    return { result: 'error', error: error.toString() };
  }
}

function logToCRM(id, name, email, phone, subject, amount, color, status, rawData) {
  try {
    var sheetId = SCRIPT_PROP.getProperty("SHEET_ID");
    if (!sheetId) return;
    var ss = SpreadsheetApp.openById(sheetId);
    var sheetLog = ss.getSheetByName("Upiti");
    if (sheetLog) {
      sheetLog.appendRow([new Date(), id, name, email, phone, subject, amount, color, status, rawData]);
    }
  } catch (err) {
    console.error("CRM Log failed: " + err);
  }
}

// --- ACCOUNTING: DNEVNIK KNJIŽENJA ---
function recordDnevnikEntry(date, vrstaDokumenta, stranka, opis, dokument, entries) {
  try {
    var sheetId = SCRIPT_PROP.getProperty("SHEET_ID");
    if (!sheetId) return;
    var ss = SpreadsheetApp.openById(sheetId);
    var sheetDnevnik = ss.getSheetByName("Dnevnik knjiženja");
    if (!sheetDnevnik) return;
    
    // entries should be an array of objects: {konto, nazivKonta, duguje, potrazuje}
    entries.forEach(function(entry) {
        var formatDuguje = entry.duguje || 0;
        var formatPotrazuje = entry.potrazuje || 0;
        var saldoFormula = '=INDIRECT("H"&ROW()) - INDIRECT("I"&ROW())';
        
        // Append row: ["Datum", "Vrsta dokumenta", "Stranka", "Opis", "Dokument", "Konto", "Naziv konta", "Duguje", "Potrazuje", "saldo"]
        sheetDnevnik.appendRow([
            date, 
            vrstaDokumenta, 
            stranka, 
            opis, 
            dokument, 
            entry.konto, 
            entry.nazivKonta, 
            formatDuguje, 
            formatPotrazuje,
            "" // Formula will go here or just leave empty and set formula next
        ]);
        
        var lastRow = sheetDnevnik.getLastRow();
        sheetDnevnik.getRange(lastRow, 10).setFormula(saldoFormula);
    });
  } catch(err) {
    console.error("Dnevnik Log failed: " + err);
  }
}

// --- 3. GOOGLE SHEETS MENU & MOBILE TRIGGERS ---

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  
  // 1. CRM MENU
  ui.createMenu('2LMF CRM')
      .addItem('📥 Učitaj podatke (Desktop)', 'importInquiry')
      .addItem('✉️ Pošalji Ponudu (Desktop)', 'sendCustomOffer')
      .addItem('📄 Pošalji Račun (Desktop)', 'sendCustomInvoice')
      .addSeparator()
      .addItem('🔢 Admin: Resetiraj Brojač', 'menuResetCounter')
      .addSeparator()
      .addItem('📱 Instaliraj za Mobitel', 'setupMobileTriggers')
      .addToUi();
      
  // 2. ADMIN SYNC MENU
  ui.createMenu('2LMF ADMIN')
      .addItem('Uputstva za sinkronizaciju', 'showSyncInstructions')
      .addSeparator()
      .addItem('🚀 Ažuriraj cijene na webu', 'syncPricesToWeb')
      .addSeparator()
      .addItem('➕ Dodaj označeno iz Cjenika u Ponudu', 'addItemsFromCjenik')
      .addSeparator()
      .addItem('🤖 Pokreni AI skeniranje (URA)', 'processNewInvoices')
      .addSeparator()
      .addItem('💳 Plati označenu URA-u (Dnevnik)', 'paySelectedUra')
      .addSeparator()
      .addItem('🚗 Obračunaj Putne Naloge (0.50€)', 'calculateTravelTrips')
      .addItem('📥 Pošalji Putne na AI Skeniranje', 'syncTravelToAiFolder')
      .addSeparator()
      .addItem('🏙️ Obračunaj Loko Vožnju (0.50€)', 'calculateLokoTrips')
      .addItem('📥 Pošalji Loko na AI Skeniranje', 'syncLokoToAiFolder')
      .addSeparator()
      .addItem('🤖 Pokreni AI skeniranje (SVI DOKUMENTI)', 'processNewInvoices')
      .addSeparator()
      .addItem('⚙️ Postavke Tvrtke', 'showCompanySettingsDialog')
      .addToUi();
}

function menuResetCounter() {
    var ui = SpreadsheetApp.getUi();
    var result = ui.prompt(
      'Reset Brojača',
      'Unesi broj od kojeg želiš da krene sljedeći upit (npr. 0 da krene od 1, ili 1000 da krene od 1001):',
      ui.ButtonSet.OK_CANCEL);

    if (result.getSelectedButton() == ui.Button.OK) {
        var num = parseInt(result.getResponseText());
        if (!isNaN(num)) {
             PropertiesService.getScriptProperties().setProperty('LAST_ID_SEQ', num.toString());
             ui.alert('Brojač postavljen na: ' + num + '. Sljedeći upit će biti: u' + pad(num+1, 5));
        } else {
             ui.alert('Greška: Nije unesen broj.');
        }
    }
}

function setupMobileTriggers() {
  // Delete existing triggers first
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
  // Create new Installable Trigger for Edit
  ScriptApp.newTrigger('handleMobileEdit')
      .forSpreadsheet(SpreadsheetApp.getActive())
      .onEdit()
      .create();
  
  // DRAW UI (CHECKBOXES) AUTOMATICALLY
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Generator Ponuda");
  sheet.getRange("H3").setValue("UPRAVLJANJE (MOBITEL):").setFontWeight("bold");
  sheet.getRange("H4").setValue("👇 1. Klikni za Učitavanje");
  sheet.getRange("H5").insertCheckboxes();
  sheet.getRange("H5").setValue(false); // Default unchecked
  sheet.getRange("H6").setValue("(Status učitavanja)");

  sheet.getRange("H7").setValue("👇 2. Klikni za Ponudu");
  sheet.getRange("H8").insertCheckboxes();
  sheet.getRange("H9").setValue("(Status slanja ponude)");
  
  sheet.getRange("H10").setValue("👇 3. Klikni za Račun");
  sheet.getRange("H11").insertCheckboxes();
  sheet.getRange("H12").setValue("(Status slanja računa)");
  
  // 2. CJENIK SETUP (MOBILE TRIGGER)
  var sheetCjenik = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CJENIK");
  if (sheetCjenik) {
    sheetCjenik.getRange("I1").setValue("DODAJ U PONUDU:");
    sheetCjenik.getRange("I2").insertCheckboxes();
    sheetCjenik.getRange("I2").setValue(false);
    sheetCjenik.getRange("I3").setValue("(Status prijenosa)");
  }
      
  Browser.msgBox("✅ SPREMNO ZA MOBITEL! Kvačice su u 'Generator Ponuda' (H5, H8) i 'CJENIK' (I2).");
}

function showCompanySettingsDialog() {
  var ui = SpreadsheetApp.getUi();
  var name = SCRIPT_PROP.getProperty("COMPANY_NAME") || "";
  var oib = SCRIPT_PROP.getProperty("COMPANY_OIB") || "";
  var address = SCRIPT_PROP.getProperty("COMPANY_ADDRESS") || "";
  
  var html = `
    <div style="font-family: sans-serif; padding: 20px;">
      <h3>Postavke Tvrtke</h3>
      <p>Ovi podaci će se pojavljivati u zaglavlju putnih naloga.</p>
      <label>Naziv Tvrtke:</label><br>
      <input type="text" id="name" value="${name}" style="width:100%; margin-bottom:10px;"><br>
      <label>OIB:</label><br>
      <input type="text" id="oib" value="${oib}" style="width:100%; margin-bottom:10px;"><br>
      <label>Adresa:</label><br>
      <input type="text" id="address" value="${address}" style="width:100%; margin-bottom:20px;"><br>
      <button onclick="save()" style="background:#E67E22; color:white; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">Spremi</button>
    </div>
    <script>
      function save() {
        var data = {
          name: document.getElementById('name').value,
          oib: document.getElementById('oib').value,
          address: document.getElementById('address').value
        };
        google.script.run.withSuccessHandler(() => google.script.host.close()).saveCompanySettings(data);
      }
    </script>
  `;
  
  var output = HtmlService.createHtmlOutput(html).setWidth(400).setHeight(350);
  ui.showModalDialog(output, "Postavke Tvrtke");
}

function saveCompanySettings(data) {
  SCRIPT_PROP.setProperty("COMPANY_NAME", data.name);
  SCRIPT_PROP.setProperty("COMPANY_OIB", data.oib);
  SCRIPT_PROP.setProperty("COMPANY_ADDRESS", data.address);
  SpreadsheetApp.getActiveSpreadsheet().toast("Postavke spremljene!", "Sistem");
}

function handleMobileEdit(e) {
  var range = e.range;
  var sheet = range.getSheet();
  
  // Allow work only on specific sheets
  var sheetName = sheet.getName();
  if (sheetName !== "Generator Ponuda" && sheetName !== "CJENIK" && sheetName !== "Upiti") return;
  
  var row = range.getRow();
  var col = range.getColumn();
  var val = range.getValue();
  
  // 1. LOAD DATA (H5)
  if (row === 5 && col === 8 && val === true) {
    sheet.getRange("H6").setValue("⏳ Učitavam...");
    importInquiry();
    range.setValue(false); // Uncheck
    sheet.getRange("H6").setValue("✅ Učitano!");
  }
  
  // 2. SEND OFFER (H8)
  if (row === 8 && col === 8 && val === true) {
    sheet.getRange("H9").setValue("⏳ Šaljem...");
    var success = sendCustomOffer(true); // true = mobile mode (no alerts)
    range.setValue(false); // Uncheck
    if (success) sheet.getRange("H9").setValue("✅ Ponuda Poslana!");
    else sheet.getRange("H9").setValue("❌ Prekinuto");
  }

  // 3. SEND INVOICE (H11)
  if (row === 11 && col === 8 && val === true) {
    sheet.getRange("H12").setValue("⏳ Šaljem Račun...");
    var success = sendCustomInvoice(true); // true = mobile mode
    range.setValue(false); // Uncheck
    if (success) sheet.getRange("H12").setValue("✅ Račun Poslan!");
    else sheet.getRange("H12").setValue("❌ Prekinuto");
  }

  // 4. SHARKPRO - ADD FROM CJENIK (I2)
  if (sheet.getName() === "CJENIK") {
     if (row === 2 && col === 9 && val === true) {
       sheet.getRange("I3").setValue("⏳ Prebacujem...");
       addItemsFromCjenik(true); // true = silent/mobile mode
       range.setValue(false); // Uncheck
       sheet.getRange("I3").setValue("✅ Prebačeno!");
     }
  }

  // 5. ACCOUNTING - IZVOD GENERATOR (Upiti sheet, Status column I = 9)
  if (sheetName === "Upiti") {
    if (col === 9 && String(val).toUpperCase() === "PLAĆENO") {
       var pId = String(sheet.getRange(row, 2).getValue());
       var pName = String(sheet.getRange(row, 3).getValue());
       var pAmount = parseFloat(sheet.getRange(row, 7).getValue()) || 0;
       
       recordDnevnikEntry(
         new Date(),
         "IZVOD",
         pName,
         "Plaćanje računa za " + pName + " ("+pId+")",
         "Izvod",
         [
           { konto: "1000", nazivKonta: "Žiro račun", duguje: pAmount, potrazuje: 0 },
           { konto: "1200", nazivKonta: "Kupci u zemlji", duguje: 0, potrazuje: pAmount }
         ]
       );
       
       // Change status so it doesn't trigger again accidentally on another edit
       range.setValue("PLAĆENO (KNJIŽENO)");
       
       // Show notification
       SpreadsheetApp.getActiveSpreadsheet().toast("Izvod uspješno proknjižen za " + pName, "Računovodstvo", 5);
    }
  }
}


function importInquiry() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetGen = ss.getSheetByName("Generator Ponuda");
  var sheetLog = ss.getSheetByName("Upiti");
  
  var idRaw = sheetGen.getRange("B3").getValue().toString().trim();
  if (!idRaw) { setStatus("Greška: Unesite ID!"); return; }
  
  // --- ROBUST ID NORMALIZATION ---
  // Goal: Convert inputs like "1", "u1", "U 1", "u00001" -> "u00001"
  // Legacy inputs like "UPIT-5377" -> start with "UPIT-", preserve them.
  
  var id = idRaw;
  var lower = idRaw.toLowerCase().replace(/\s/g, ''); // Remove spaces
  
  if (lower.startsWith("upit-")) {
      // It's a legacy ID, allow it (maybe user wants to load old one)
      id = "UPIT-" + lower.replace("upit-", ""); // Normalize casing if needed
  } else if (lower.startsWith("u")) {
      // Like "u1" or "u00001"
      var numPart = parseInt(lower.substring(1));
      if (!isNaN(numPart)) {
          id = "u" + pad(numPart, 5);
      }
  } else {
      // Just a number? "1", "55"
      var numPart = parseInt(lower);
      if (!isNaN(numPart)) {
          id = "u" + pad(numPart, 5);
      }
  }

  // Update cell with formatted ID so user sees what is being searched
  sheetGen.getRange("B3").setValue(id);
  
  // Find ID in Log
  var data = sheetLog.getDataRange().getValues();
  var rowData = null;
  
  for (var i = 1; i < data.length; i++) {
    // Exact match or Case-Insensitive match
    // data[i][1] (The ID Column)
    if (String(data[i][1]).toLowerCase() == id.toLowerCase()) {
      rowData = data[i];
      break;
    }
  }
  
  if (!rowData) { setStatus("Nije pronađeno (" + id + ")!"); return; }
  
  // Populate Customer Data
  sheetGen.getRange("B6").setValue(rowData[2]); // Name
  sheetGen.getRange("B7").setValue(rowData[3]); // Email
  sheetGen.getRange("B8").setValue(rowData[4]); // Phone
  sheetGen.getRange("B4").setValue(id);         // Set default Document ID to Inquiry ID
  sheetGen.getRange("B9").setValue(rowData[7]); // Color (Column H)
  
  // Parse JSON Items
  var items = JSON.parse(rowData[9]); // Adjusted index (Column J)
  
  // Clear old items
  sheetGen.getRange("A13:F50").clearContent();
  
  // Write new items
  var output = [];
  items.forEach((it, idx) => {
    var sku = it.sku || ""; 
    output.push([idx + 1, sku, it.name, it.qty, it.unit, it.price_sell]);
  });
  
  if (output.length > 0) {
    sheetGen.getRange(13, 1, output.length, 6).setValues(output);
  }
  
  setStatus("Podaci učitani za " + id);
}

function sendCustomOffer(isMobile) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetGen = ss.getSheetByName("Generator Ponuda");
  var sheetLog = ss.getSheetByName("Upiti");
  
  // Skip alert on mobile
  if (!isMobile) {
    var ui = SpreadsheetApp.getUi();
    var response = ui.alert('Slanje Ponude', 'Sigurno?', ui.ButtonSet.YES_NO);
    if (response == ui.Button.NO) return false;
  }
  
  // Read Data
  var inquiryId = sheetGen.getRange("B4").getValue(); // Use printed ID field
  var name = sheetGen.getRange("B6").getValue();
  var email = sheetGen.getRange("B7").getValue();
  var color = sheetGen.getRange("B9").getValue();
  var address = sheetGen.getRange("B10").getValue();
  var oib = sheetGen.getRange("B11").getValue();
  
  if(!email) { setStatus("Greška: Nema emaila!"); return false; }
  
  var itemsData = sheetGen.getRange(13, 1, Math.max(1, sheetGen.getLastRow() - 12), 6).getValues();
  
  var items = [];
  var totalAmount = 0;
  
  for (var i = 0; i < itemsData.length; i++) {
    var row = itemsData[i];
    if (!row[2]) continue; // Skip empty name
    
    items.push({
      sku: row[1],
      name: row[2],
      qty: parseFloat(row[3]),
      unit: row[4],
      price_sell: parseFloat(row[5]),
      line_total: parseFloat(row[3]) * parseFloat(row[5])
    });
  }
  
  // Generate PDF Content (Using same formatted function)
  // Determine if it's a Hidroizolacija offer based on the inquiry ID or other criteria
  // For now, let's assume if the color field contains "HIDRO" it's a hidro offer.
  // A more robust solution might involve a dedicated field or parsing the items.
  var isHidro = String(color || "").toUpperCase().indexOf("HIDRO") !== -1;
  var htmlBody = generateHtml(items, name, false, inquiryId, color, isHidro, "Službena Ponuda - 2LMF PRO", address, oib);
  
  // PDF GENERATION
  var pdfBlob = HtmlService.createHtmlOutput(htmlBody).setTitle("Ponuda").getAs('application/pdf');
  pdfBlob.setName("Ponuda_" + inquiryId + ".pdf");
  
  // SAVE TO DRIVE
  savePdfToDrive(pdfBlob, "Ponude za plaćanje");

  // SEND EMAIL
  MailApp.sendEmail({
    to: email,
    subject: "Službena Ponuda - 2LMF PRO",
    htmlBody: htmlBody,
    attachments: [pdfBlob],
    name: "2LMF PRO"
  });
  
  // Update Status in Log
  var id = sheetGen.getRange("B3").getValue();
  var data = sheetLog.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] == id) {
      sheetLog.getRange(i + 1, 8).setValue("POSLANO");
      break;
    }
  }
  
  if (!isMobile) Browser.msgBox("Poslano na: " + email);
  return true;
}

function sendCustomInvoice(isMobile) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetGen = ss.getSheetByName("Generator Ponuda");
  var sheetLog = ss.getSheetByName("Upiti");
  
  if (!isMobile) {
    var ui = SpreadsheetApp.getUi();
    var response = ui.alert('Slanje Računa', 'Generiraj račun (neprofiskaliziran)?', ui.ButtonSet.YES_NO);
    if (response == ui.Button.NO) return false;
  }
  
  var name = sheetGen.getRange("B6").getValue();
  var email = sheetGen.getRange("B7").getValue();
  var color = sheetGen.getRange("B9").getValue();
  var address = sheetGen.getRange("B10").getValue();
  var oib = sheetGen.getRange("B11").getValue();
  var docId = sheetGen.getRange("B4").getValue();
  var inquiryId = sheetGen.getRange("B3").getValue(); // For CRM logging
  
  if(!email) { setStatus("Greška: Nema emaila!"); return false; }
  
  var itemsData = sheetGen.getRange(13, 1, Math.max(1, sheetGen.getLastRow() - 12), 6).getValues();
  var items = [];
  for (var i = 0; i < itemsData.length; i++) {
    var row = itemsData[i];
    if (!row[2]) continue;
    items.push({
      sku: row[1], name: row[2], qty: parseFloat(row[3]), unit: row[4],
      price_sell: parseFloat(row[5]),
      line_total: parseFloat(row[3]) * parseFloat(row[5])
    });
  }
  
  var isHidro = String(color || "").toUpperCase().indexOf("HIDRO") !== -1;
  var htmlBody = generateHtml(items, name, false, docId, color, isHidro, "Račun br. "+docId + " - 2LMF PRO", address, oib);
  
  var pdfBlob = HtmlService.createHtmlOutput(htmlBody).setTitle("Racun").getAs('application/pdf');
  pdfBlob.setName("Racun_" + docId + ".pdf");
  
  // SAVE TO DRIVE
  var pdfDriveUrl = savePdfToDrive(pdfBlob, "Izlazni računi");

  MailApp.sendEmail({
    to: email,
    subject: "Račun br. " + docId + " - 2LMF PRO",
    htmlBody: htmlBody,
    attachments: [pdfBlob],
    name: "2LMF PRO"
  });
  
  var data = sheetLog.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] == inquiryId) {
      sheetLog.getRange(i + 1, 8).setValue("RAČUN POSLAN");
      break;
    }
  }

  // --- ACCOUNTING: LOG IRA ---
  var totalAmount = items.reduce((sum, item) => sum + (item.line_total || ((parseFloat(item.qty) || 0) * (parseFloat(item.price_sell) || 0))), 0);
  
  // Formatiramo link za knjigovodstvo ako ga imamo
  var dokLink = pdfDriveUrl ? '=HYPERLINK("' + pdfDriveUrl + '"; "' + docId + '")' : docId;
  var formattedDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd.MM.yyyy., HH:mm");

  recordDnevnikEntry(
    formattedDate, 
    "IRA", 
    name, 
    "Izdavanje računa po upitu " + inquiryId, 
    dokLink, 
    [
      { konto: "1200", nazivKonta: "Kupci u zemlji", duguje: totalAmount, potrazuje: 0 },
      { konto: "7500", nazivKonta: "Prihodi od prodaje roba i usluga", duguje: 0, potrazuje: totalAmount }
    ]
  );
  
  // --- ACCOUNTING: LOG IZVOD (Auto-paid as Advance) ---
  recordDnevnikEntry(
    formattedDate, 
    "IZVOD", 
    name, 
    "Avansna uplata kupca po računu " + inquiryId, 
    dokLink, 
    [
      { konto: "1000", nazivKonta: "Žiro račun", duguje: totalAmount, potrazuje: 0 },
      { konto: "1200", nazivKonta: "Kupci u zemlji", duguje: 0, potrazuje: totalAmount }
    ]
  );
  
  if (!isMobile) Browser.msgBox("Račun poslan na: " + email);
  return true;
}

function setStatus(msg) {
   // Helper to show errors without blocking mobile
   try { SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Generator Ponuda").getRange("H9").setValue(msg); } catch(e){}
   console.log(msg);
}

// --- UPGRADED HELPER: HTML GENERATOR (Shared) ---
function generateHtml(items, name, isAutoReply, inquiryId, color, isHidro, subject, address, oib) {
    name = String(name || "Kupac"); // Sanitize to string to prevent substring error
    var rawTotal = 0;
    items.forEach(i => {
         var q = parseFloat(i.qty) || 0;
         var p = parseFloat(i.price_sell) || 0;
         if(i.line_total) rawTotal += i.line_total;
         else rawTotal += (q * p);
    });

  // --- HUB3 QR FORMAT (HRVHUB30) ---
  var amountCents = (Math.round(rawTotal * 100)).toString();
  var paddedAmount = ("000000000000000" + amountCents).substr(-15);
  
  var qrContent = "HRVHUB30\nEUR\n" + paddedAmount + "\n" + name.substring(0,30) + "\n-\n-\n2LMF PRO j.d.o.o.\nOrešje 7\n10090 Zagreb\nHR3123400091111213241\nHR00\n" + String(inquiryId || "Upit").substring(0, 22) + "\nOTHR\nUplata po ponudi";

  // --- BASE64 QR FOR PDF RELIABILITY ---
  var qrDataUri = "";
  if (!isAutoReply) {
    try {
      var qrUrl = "https://quickchart.io/qr?size=250&text=" + encodeURIComponent(qrContent);
      var qrBlob = UrlFetchApp.fetch(qrUrl).getBlob();
      qrDataUri = "data:image/png;base64," + Utilities.base64Encode(qrBlob.getBytes());
    } catch(e) {
      console.log("QR Fetch failed: " + e);
    }
  }

  var primaryColor = "#E67E22"; // Default Ograde (Orange)
  var subjectUpper = String(subject || "").toUpperCase();
  if (subjectUpper.indexOf("HIDRO") !== -1) primaryColor = "#007bff"; // Blue
  else if (subjectUpper.indexOf("TERMO") !== -1) primaryColor = "#e74c3c"; // Red/Orange for Thermal
  else if (subjectUpper.indexOf("FASADA") !== -1) primaryColor = "#27ae60"; // Green for Facades

  var darkColor = "#000000"; 
  var lightGray = "#f8f9fa";

  var title = isAutoReply ? "INFORMATIVNA PONUDA" : "PONUDA ZA PLAĆANJE";
  var isInvoice = subjectUpper.indexOf("RAČUN") !== -1;
  if (isInvoice) title = "RAČUN";

  // Use simple fonts for PDF and email reliability
  var fontStack = "'Segoe UI', Roboto, Arial, sans-serif";
  
  // Formatiranje bloka za kupca
  var kupacHtml = "<b>" + name + "</b>";
  if (address) kupacHtml += "<br>" + address;
  if (oib) kupacHtml += "<br>OIB: " + oib;

  var html = "<!DOCTYPE html><html><head>" +
             "<link href='https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Montserrat:wght@800&family=Inter:wght@400;600;700&display=swap' rel='stylesheet'>" +
             "<style>" +
             "body { margin:0; padding:0; background-color: " + (isAutoReply ? "#fff" : "#f8f9fa") + "; font-family: 'Inter', " + fontStack + "; }" +
             ".page-wrapper { }" +
             ".container { max-width: 650px; margin: 0 auto; background: #ffffff; width: 100%; box-sizing: border-box; }" +
             ".header { background: " + primaryColor + "; padding: 25px; text-align: center; border-bottom: 5px solid " + darkColor + "; }" +
             ".logo-text { font-family: 'Montserrat', sans-serif; font-size: 38px; font-weight: 800; letter-spacing: 2px; color: " + darkColor + "; margin:0; text-transform: uppercase; }" +
             ".sub-header { font-size: 10px; color: " + darkColor + "; margin-top: 5px; opacity: 0.9; letter-spacing: 1px; font-weight: bold; }" +
             ".content { padding: 40px; }" +
             ".title { color: " + primaryColor + "; font-size: 22px; margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px; font-weight: bold; }" +
             ".table-wrapper { width: 100%; border-collapse: collapse; margin-bottom: 30px; }" +
             ".th { background: " + primaryColor + "; color: " + darkColor + "; padding: 12px; font-size: 11px; font-weight: bold; text-align: left; border: 1px solid " + darkColor + "; text-transform: uppercase; }" +
             ".td { padding: 12px; border: 1px solid #ddd; font-size: 13px; color: #333; }" +
             ".td-num { text-align: right; font-weight: 600; white-space: nowrap; }" +
             ".total-block { background: " + primaryColor + "; color: " + darkColor + "; padding: 20px; text-align: right; border: 2px solid " + darkColor + "; }" +
             ".total-value { font-size: 24px; font-weight: bold; color: " + darkColor + "; }" +
             ".footer { background: " + primaryColor + "; color: " + darkColor + "; padding: 15px 20px; font-size: 9px; text-align: center; line-height: 1.4; border-top: 3px solid " + darkColor + "; }" +
             ".note { background: #fff8f0; border-left: 4px solid " + primaryColor + "; padding: 20px; font-size: 12px; margin-top: 30px; line-height: 1.6; }" +
             ".qr-box { margin-top: 30px; text-align: center; border: 1px solid #eee; padding: 20px; border-radius: 10px; }" +
             
             // PDF SPECIFIC OVERRIDES
             "@media print { " +
               "html, body { height: 100%; margin: 0 !important; padding: 0 !important; overflow: hidden; display: flex; flex-direction: column; }" +
               ".page-wrapper { height: 100vh; display: flex; flex-direction: column; flex: 1; }" +
               ".container { flex: 1; display: flex; flex-direction: column; width: 100%; max-width: none; }" +
               ".content { flex: 1; }" +
               ".header { background: #fff !important; border-bottom: 2px solid #333 !important; } " +
               ".th { background: #eee !important; color: #000 !important; } " +
               ".total-block { background: #fff !important; border: 2px solid #333 !important; } " +
               ".footer { background: #fff !important; border-top: 2px solid #333 !important; position: relative; bottom: 0; width: 100%; box-sizing: border-box; margin-top: auto; flex-shrink: 0; } " +
             "} " + 
             "</style></head><body><div class='page-wrapper'>" +
             // --- NEW INV24 STYLE HEADER ---
             "<table width='100%' cellpadding='0' cellspacing='0' border='0' style='margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 20px;'>" +
             "<tr>" +
             "<td style='vertical-align: top;'>" +
             // LOGO - ORBITRON STYLE
             "<div style='font-family: \"Orbitron\", sans-serif; font-size: 32px; font-weight: 900; color: #000; letter-spacing: 3px;'>" +
             "2LMF <span style='color: " + primaryColor + ";'>PRO</span>" +
             "</div>" +
             "<div style='font-size: 10px; color: #666; margin-top: 5px; text-transform: uppercase; letter-spacing: 1px;'>HIDRO & TERMO IZOLACIJA • FASADE • OGRADE</div>" +
             "</td>" +
             "<td style='text-align: right; vertical-align: top; font-size: 11px; color: #333; line-height: 1.5;'>" +
             "<b>2LMF PRO j.d.o.o.</b><br>" +
             "Orešje 7, 10090 Zagreb<br>" +
             "OIB: 41356727940<br>" +
             "Telefon: +385 (0) 91 111 2132<br>" +
             "Email: info@2lmf-pro.hr" +
             "</td>" +
             "</tr>" +
             "</table>" +
             // --- CUSTOMER & METADATA BLOCK ---
             "<table width='100%' cellpadding='0' cellspacing='0' border='0' style='margin-bottom: 30px;'>" +
             "<tr>" +
             "<td style='vertical-align: top; width: 60%;'>" +
             "<div style='font-size: 11px; color: #888; margin-bottom: 5px; text-transform: uppercase; font-weight: bold;'>Kupac:</div>" +
             "<div style='font-size: 14px; color: #000; line-height: 1.4;'>" + kupacHtml + "</div>" +
             "</td>" +
             "<td style='text-align: right; vertical-align: top; font-size: 12px; color: #333; line-height: 1.6;'>" +
             "Datum i vrijeme izdavanja:<br><b>" + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd.MM.yyyy., HH:mm") + "</b><br>" +
             "Mjesto izdavanja: <b>Zagreb</b>" +
             "</td>" +
             "</tr>" +
             "</table>" +

             // --- CENTERED TITLE ---
             "<div style='text-align: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 10px;'>" +
             "<h1 style='font-size: 26px; font-weight: 800; color: #000; margin: 0; text-transform: uppercase;'>" + title + " br. " + inquiryId + "</h1>" +
             "</div>" +

             "<div class='content'>" +
              (color ? 
                "<div style='margin-bottom:25px; display:flex; align-items:center; background:#f9f9f9; padding:15px; border-radius:8px; border:1px solid #eee;'>" +
                "<div style='width:35px; height:35px; background:" + primaryColor + "; border-radius:6px; margin-right:15px; border:2px solid #fff; box-shadow:0 1px 3px rgba(0,0,0,0.1);'></div>" +
                "<div>" +
                "<div style='font-size:10px; color:#888; text-transform:uppercase; letter-spacing:1px;'>" + (isHidro ? "Konfiguracija sustava" : "Odabrana opcija") + "</div>" +
                "<div style='font-size:15px; font-weight:bold; color:#333;'>" + (isHidro ? color : (isNaN(parseInt(color)) ? color : ("RAL " + color))) + "</div>" +
                "</div>" +
                "</div>" : "") +
             "<table class='table-wrapper'><thead><tr class='tr-h'><th class='th' style='width:40%'>STAVKA</th><th class='th' style='text-align:center;'>JED. CIJENA</th><th class='th' style='text-align:center;'>KOL.</th><th class='th' style='text-align:right;'>UKUPNO</th></tr></thead><tbody>";

    items.forEach(function(item) {
        var lineTotal = 0; if (item.line_total) lineTotal = item.line_total; else lineTotal = (parseFloat(item.qty) || 0) * (parseFloat(item.price_sell) || 0);
        var unitPrice = parseFloat(item.price_sell) || 0;
        var qtyFormatted = (parseFloat(item.qty) || 0).toLocaleString('hr-HR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        html += "<tr><td class='td'>" + item.name + "</td><td class='td' style='text-align:center; white-space:nowrap;'>" + unitPrice.toLocaleString('hr-HR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " €</td><td class='td' style='text-align:center; white-space:nowrap;'>" + qtyFormatted + " " + (item.unit || "kom") + "</td><td class='td td-num'>" + lineTotal.toLocaleString('hr-HR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " €</td></tr>";
    });

    html += "</tbody></table>" +
            "<div class='total-block'><div style='font-size:11px; font-weight:bold; margin-bottom:5px; color:" + darkColor + ";'>SVEUKUPNI IZNOS (MPC)</div>" +
            "<div class='total-value'>" + rawTotal.toLocaleString('hr-HR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " €</div></div>" +
            "<div style='font-size:11px; text-align:right; margin-top:5px; color:#555;'>Porezni obveznik nije u sustavu PDV-a, temeljem članka 90. Zakona o porezu na dodanu vrijednost.</div>";
            
    if (!isInvoice) {
        html += "<div class='note'><b>Uvjeti kupnje:</b><br><ul style='margin-top:5px; padding-left:20px; margin-bottom:10px;'><li>Plaćanje: avans - uplatom na žiro račun</li><li>Minimalni iznos kupovine: 200,00 eur</li><li>Sve cijene su sa PDV-om*</li></ul></div>";
    }

    // QR Code logic: Using Base64 URI for PDF stability
    if (!isAutoReply && qrDataUri && !isInvoice) {
        html += "<div class='qr-box'><img src='" + qrDataUri + "' style='width:150px;'>" +
                "<div style='margin-top:10px; font-size:11px; color:#666; font-weight:bold;'>SKENIRAJ I PLATI (HUB3 STANDARD)</div></div>";
    }

    html += "</div></div><div class='footer'>" +
            "Operater / Dokument izdao: Jelena Praštalo, OIB: 41356727940 | Način plaćanja: transakcijski račun<br>" +
            "Članovi uprave: Jelena Praštalo, OIB: 41356727940 | Temeljni kapital: 1,00 eur, uplaćen u cijelosti<br>" +
            "Sud: Upisano u Sudski registar Trgovačkog suda u Zagrebu pod brojem 081477933<br><br>" +
            "Privredna banka Zagreb d.d. | Radnička cesta 50, 10000 Zagreb, Hrvatska<br>" +
            "Broj bankovnog računa: IBAN: <b>HR3123400091111213241</b>" +
            "</div></div></body></html>";
    return html;
}

// --- HELPER: ENRICH ITEMS WITH COSTS (Backend Logic) ---
function enrichItemsWithCosts(items) {
  var sheetId = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  if (!sheetId) return items; // Fallback
  
  var ss = SpreadsheetApp.openById(sheetId);
  var sheet = ss.getSheetByName("CJENIK");
  if (!sheet) return items; // Fallback if sheet missing
  
  // 1. Build Price list (Array for search + Map for direct lookup)
  var sheetItems = [];
  var priceMap = {};
  
  if (sheet) {
      // COL A = SKU (Šifra)
      // COL B = Name (Naziv)
      // COL C = Nabavna BEZ PDV (Cost VPC) -> For Supplier
      // COL D = Nabavna SA PDV (Cost MPC) -> For Profit calc
      
      var lastRow = sheet.getLastRow();
      if (lastRow > 1) {
          var data = sheet.getRange(2, 1, lastRow - 1, 4).getValues(); // Get cols A,B,C,D
          
          for (var i = 0; i < data.length; i++) {
              var rowSku = String(data[i][0] || "").trim().toLowerCase();
              var rowName = String(data[i][1] || "");
              
              var rowCostVPC = parseFloat(data[i][2]); // Col C
              if (isNaN(rowCostVPC)) rowCostVPC = 0;

              var rowCostMPC = parseFloat(data[i][3]); // Col D
              if (isNaN(rowCostMPC)) rowCostMPC = 0;
              
              var priceObj = {
                  sku: rowSku,
                  name: rowName, 
                  cost_vpc: rowCostVPC,
                  cost_mpc: rowCostMPC,
                  supplier: "Skladište" 
              };
              
              sheetItems.push(priceObj);
              if (rowSku) priceMap[rowSku] = priceObj;
          }
      }
  }

  // 2. Map Items
  return items.map(function(item) {
    var itemSku = String(item.sku || "").trim().toLowerCase(); 
    var matchedData = null;
    
    // A. Try Exact SKU Match
    if (itemSku && priceMap[itemSku]) {
        matchedData = priceMap[itemSku];
    }
    
    // Apply Data
    if (matchedData) {
        item.price_buy_vpc = matchedData.cost_vpc;
        item.price_buy_mpc = matchedData.cost_mpc; 
        item.supplier = matchedData.supplier;
        if (!item.sku && matchedData.sku) item.sku = matchedData.sku.toUpperCase(); 
    } else {
        item.price_buy_vpc = 0;
        item.price_buy_mpc = 0;
        item.supplier = "Nepoznato";
    }

    // Profit = Sell Price (MPC) - Buy Price (MPC)
    item.profit = item.price_sell - item.price_buy_mpc;
    return item;
  });
}

function generateAdminHtml(items, name, email, phone, subject, customerHtml, location) {
  var totalProfit = 0;
  items.forEach(function(it){ totalProfit += it.qty * it.profit; });

  var html = "<style>" +
             "@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700&family=Barlow:wght@400;600&display=swap');" +
             "h2 { font-family: 'Chakra Petch', sans-serif; }" +
             "</style>" +
             "<div style='font-family: Arial, sans-serif; color: #333;'>" +
             "<h2 style='color: #000000;'>📊 Novi upit (Interni pregled)</h2>" +
             "<p><b>Kupac:</b> " + name + " (" + email + ") | <b>Tel:</b> " + phone + (location ? " | <b>Lokacija:</b> " + location : "") + "</p>" +
             
             "<hr style='border: 0; border-top: 2px solid #eee; margin: 20px 0;'>" +
             "<h3>👀 Prikaz za Kupca</h3>" + 
             (customerHtml || "<i>Nema prikaza (greška?)</i>") + 
             "<hr style='border: 0; border-top: 2px solid #eee; margin: 20px 0;'>" +

             "<h3>💰 Analiza Zarade (Sve cijene su s PDV-om)</h3>" +
             "<table style='width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 30px;'>" +
             "<tr style='background-color: #E67E22; color: #000000;'><th style='padding:8px;text-align:left;'>Artikl</th><th style='padding:8px;'>KOL.</th><th style='padding:8px;text-align:right;'>MPC / kom</th><th style='padding:8px;text-align:right;'>MPC Ukupno</th><th style='padding:8px;text-align:right;background:#2ecc71;color:black;'>Nabavna / kom</th><th style='padding:8px;text-align:right;background:#2ecc71;color:black;'>Nabavna Ukupno</th><th style='padding:8px;text-align:right;background:#d35400;color:white;'>ZARADA</th></tr>";

  items.forEach(function(it) {
    var u = it.unit || "";
    html += "<tr>" +
            "<td style='padding:8px;border:1px solid #ddd;'>" + it.name + "</td>" +
            "<td style='padding:8px;border:1px solid #ddd;text-align:center;'>" + it.qty + " " + u + "</td>" +
            "<td style='padding:8px;border:1px solid #ddd;text-align:right;'>" + it.price_sell.toLocaleString('hr-HR',{minimumFractionDigits:2, maximumFractionDigits:2}) + " €</td>" +
            "<td style='padding:8px;border:1px solid #ddd;text-align:right;'>" + (it.qty * it.price_sell).toLocaleString('hr-HR',{minimumFractionDigits:2, maximumFractionDigits:2}) + " €</td>" +
            "<td style='padding:8px;border:1px solid #ddd;text-align:right;'>" + it.price_buy_mpc.toLocaleString('hr-HR',{minimumFractionDigits:2, maximumFractionDigits:2}) + " €</td>" +
            "<td style='padding:8px;border:1px solid #ddd;text-align:right;'>" + (it.qty * it.price_buy_mpc).toLocaleString('hr-HR',{minimumFractionDigits:2, maximumFractionDigits:2}) + " €</td>" +
            "<td style='padding:8px;border:1px solid #ddd;text-align:right;font-weight:bold;'>" + (it.qty * it.profit).toLocaleString('hr-HR',{minimumFractionDigits:2, maximumFractionDigits:2}) + " €</td>" +
            "</tr>";
  });

  html += "<tr style='font-weight:bold;background:#eee;'><td colspan='6' style='padding:8px;text-align:right;'>UKUPNO ZARADA:</td><td style='padding:8px;text-align:right;color:#d35400;font-size:16px;'>" + totalProfit.toLocaleString('hr-HR',{minimumFractionDigits:2, maximumFractionDigits:2}) + " €</td></tr></table>" +

             "<h3>📦 Lista za Dobavljača (Nabavne cijene BEZ PDV-a)</h3>" +
             "<table style='width: 100%; border-collapse: collapse; font-size: 13px;'>" +
             "<tr style='background-color: #000000; color: #E67E22;'><th style='padding:8px;text-align:left;'>Artikl</th><th style='padding:8px;'>Količina</th><th style='padding:8px;text-align:right;'>Nabavna VPC / kom (bez PDV)</th><th style='padding:8px;text-align:center;'>Provjera</th></tr>";

  items.forEach(function(it) {
    var u = it.unit || "";
    var vpcFmt = it.price_buy_vpc > 0 ? it.price_buy_vpc.toLocaleString('hr-HR',{minimumFractionDigits:2, maximumFractionDigits:2}) + " €" : "-";
    html += "<tr><td style='padding:8px;border:1px solid #ddd;'>" + it.name + "</td><td style='padding:8px;border:1px solid #ddd;text-align:center;'>" + it.qty + " " + u + "</td><td style='padding:8px;border:1px solid #ddd;text-align:right;'>" + vpcFmt + "</td><td style='padding:8px;border:1px solid #ddd;text-align:center;'>[ ]</td></tr>";
  });

  html += "</table></div>";
  return html;
}

function calculateTotal(items, field) {
  var t = 0; items.forEach(function(it){ t += it.qty * it[field]; }); return t;
}

// --- FOLLOW UP & TRIGGER LOGIC (KEEP AS IS) ---
function processFollowUpQueue() {
  var props = PropertiesService.getScriptProperties();
  var queueJSON = props.getProperty("FOLLOW_UP_QUEUE");
  var queue = queueJSON ? JSON.parse(queueJSON) : [];
  var now = new Date().getTime();
  var newQueue = [];
  for (var i = 0; i < queue.length; i++) {
    var item = queue[i];
    if (now - item.timestamp > 86400000) { sendFeedbackEmail(item.email, item.name); } 
    else { newQueue.push(item); }
  }
  props.setProperty("FOLLOW_UP_QUEUE", JSON.stringify(newQueue));
  ensureTrigger();
}

function queueFollowUp(email, name) {
  var props = PropertiesService.getScriptProperties();
  var queueJSON = props.getProperty("FOLLOW_UP_QUEUE");
  var queue = queueJSON ? JSON.parse(queueJSON) : [];
  queue.push({ email: email, name: name, timestamp: new Date().getTime() });
  props.setProperty("FOLLOW_UP_QUEUE", JSON.stringify(queue));
  ensureTrigger();
}

function sendFeedbackEmail(email, name) {
  var body = "Poštovani,\n\nnedavno ste napravili informativni izračun za ogradu na našem kalkulatoru.\n\nVjerujem da ste primili ponudu " + (name ? ("(" + name + ") ") : "") + "na mail, pa me zanima odgovara li vam okvirna cijena?\n\n⚠️ Budući da se stanje lagera i dostupnost robe brzo mijenja, ovaj izračun (i trenutne cijene) možemo garantirati narednih 24 sata.\n\n✔️ Ako imate bilo kakvih pitanja u vezi materijala, montaže ili želite da Vam napravimo službenu ponudu s podacima za uplatu, samo odgovorite na ovaj mail s: 'MOŽE PONUDA'.\n\nLijep pozdrav,\n2LMF Tim";
  MailApp.sendEmail({ to: email, subject: "Jeste li uspjeli pogledati ponudu? ⏳ - 2LMF PRO", body: body });
}

function ensureTrigger() {
  if (ScriptApp.getProjectTriggers().length === 0) {
    ScriptApp.newTrigger('processFollowUpQueue').timeBased().everyHours(1).create();
  }
}

function autoReplyFollowUp() { processFollowUpQueue(); }

// --- HELPER: SEQUENTIAL ID GENERATOR ---
function getNextSequenceId(prefix) {
  prefix = prefix || "u"; 
  var lock = LockService.getScriptLock();
  try { lock.waitLock(10000); } catch (e) { return prefix + Math.floor(Math.random() * 100000); }
  
  var userProp = PropertiesService.getScriptProperties();
  var propKey = (prefix === "k") ? 'LAST_SEQ_K' : 'LAST_SEQ_U';
  
  // Migration logic: if LAST_ID_SEQ exists and we are doing 'u', inherit it
  if (prefix === "u" && !userProp.getProperty('LAST_SEQ_U') && userProp.getProperty('LAST_ID_SEQ')) {
     userProp.setProperty('LAST_SEQ_U', userProp.getProperty('LAST_ID_SEQ'));
  }
  
  var lastId = Number(userProp.getProperty(propKey)) || 0;
  var nextId = lastId + 1;
  userProp.setProperty(propKey, nextId.toString());
  lock.releaseLock();
  
  return prefix + pad(nextId, 5);
}

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
}

// --- ADMIN SYNC MENU ---
function showSyncInstructions() {
  var html = HtmlService.createHtmlOutput('<h3>Upute za GH_TOKEN:</h3><ol><li>Settings > Script Properties</li><li>Property: <b>GH_TOKEN</b></li><li>Value: (Vaš GitHub Token)</li></ol>').setWidth(400).setHeight(250);
  SpreadsheetApp.getUi().showModalDialog(html, 'Postavke Sinkronizacije');
}

function syncPricesToWeb() {
  var ui = SpreadsheetApp.getUi(); 
  var SCRIPT_PROP = PropertiesService.getScriptProperties(); 
  var token = SCRIPT_PROP.getProperty("GH_TOKEN");
  
  if (!token) { 
    ui.alert("Greška: Niste postavili GH_TOKEN u Script Properties."); 
    return; 
  }
  
  // Configizable via Script Properties, with defaults
  var owner = SCRIPT_PROP.getProperty("GH_OWNER") || "2lmf";
  var repo = SCRIPT_PROP.getProperty("GH_REPO") || "2lmf-pro-web-2.0.";
  var path = SCRIPT_PROP.getProperty("GH_PATH") || "scripts/items_data.js";
  var branch = SCRIPT_PROP.getProperty("GH_BRANCH") || "master";

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet(); 
    var sheet = ss.getSheetByName("CJENIK");
    if (!sheet) { ui.alert("Greška: List 'CJENIK' nije pronađen."); return; }
    
    var data = sheet.getDataRange().getValues(); 
    var priceMap = {};
    for (var i = 1; i < data.length; i++) { 
      var sku = String(data[i][0]).trim(); 
      if (sku) priceMap[sku] = data[i][4]; 
    }
    
    var fileData = getGitHubFile(owner, repo, path, branch, token);
    var currentContent = Utilities.newBlob(Utilities.base64Decode(fileData.content)).getDataAsString();
    var updatedContent = updatePricesInJS(currentContent, priceMap);
    
    if (updatedContent === currentContent) { 
      ui.alert("Cijene su već usklađene s webom."); 
      return; 
    }
    
    updateGitHubFile(owner, repo, path, branch, updatedContent, fileData.sha, "Sync prices from Sheet", token);
    ui.alert("✅ USPJEH! Cijene su ažurirane na GitHubu (" + branch + ").");
    
  } catch (e) { 
    ui.alert("Greška pri sinkronizaciji:\n" + e.message + "\n\nProvjerite GH_TOKEN i putanju: " + owner + "/" + repo + "/" + path); 
    console.error("Sync Error: " + e.message);
  }
}

function updatePricesInJS(content, priceMap) {
  var newContent = content;
  for (var sku in priceMap) {
    var newPrice = priceMap[sku];
    var regex1 = new RegExp('(price:\\s*)\\d+\\.?\\d*(\\s*,\\s*sku:\\s*[\'"]' + sku + '[\'"])', 'g');
    newContent = newContent.replace(regex1, '$1' + newPrice + '$2');
    var regex2 = new RegExp('(sku:\\s*[\'"]' + sku + '[\'"][^{}]*price:\\s*)\\d+\\.?\\d*', 'g');
    newContent = newContent.replace(regex2, '$1' + newPrice);
    var regex3 = new RegExp('(p:\\s*)\\d+\\.?\\d*(\\s*,\\s*s:\\s*[\'"]' + sku + '[\'"])', 'g');
    newContent = newContent.replace(regex3, '$1' + newPrice + '$2');
    var regex4 = new RegExp('(s:\\s*[\'"]' + sku + '[\'"][^{}]*p:\\s*)\\d+\\.?\\d*', 'g');
    newContent = newContent.replace(regex4, '$1' + newPrice);
  }
  return newContent;
}

function getGitHubFile(owner, repo, path, branch, token) {
  var url = "https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + path + "?ref=" + branch;
  try {
    var res = UrlFetchApp.fetch(url, { 
      "headers": { "Authorization": "token " + token },
      "muteHttpExceptions": true 
    });
    
    var code = res.getResponseCode();
    if (code !== 200) {
      var err = JSON.parse(res.getContentText());
      throw new Error("GitHub API Error (" + code + "): " + (err.message || "Nepoznata greška") + 
                      "\nProvjerite putanju: " + owner + "/" + repo + "/" + path + " na grani '" + branch + "'");
    }
    
    return JSON.parse(res.getContentText());
  } catch (e) {
    throw e;
  }
}

function updateGitHubFile(owner, repo, path, branch, content, sha, message, token) {
  var url = "https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + path;
  var payload = { "message": message, "content": Utilities.base64Encode(content), "sha": sha, "branch": branch };
  UrlFetchApp.fetch(url, { "method": "put", "headers": { "Authorization": "token " + token }, "contentType": "application/json", "payload": JSON.stringify(payload) });
}

function addItemsFromCjenik() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var sheetCjenik = ss.getSheetByName("CJENIK"); 
  var sheetGen = ss.getSheetByName("Generator Ponuda");
  
  if (!sheetCjenik || !sheetGen) return;

  var data = sheetCjenik.getDataRange().getValues();
  var itemsToAdd = [];
  var rowsToClear = [];
  
  for (var i = 1; i < data.length; i++) {
    var val = data[i][6]; // Stupac G (indeks 6)
    var qty = 0;
    var isCheckbox = (val === true || val === false);
    
    if (val === true || String(val).toUpperCase() === "TRUE" || String(val).toUpperCase() === "DA") {
      qty = 1;
    } else if (!isNaN(parseFloat(val)) && parseFloat(val) > 0 && !isCheckbox) {
      qty = parseFloat(val);
    }
    
    if (qty > 0) {
      itemsToAdd.push(["", data[i][0], data[i][1], qty, "kom", data[i][4]]);
      rowsToClear.push({ row: i + 1, isCheckbox: isCheckbox });
    }
  }
  
  if (itemsToAdd.length > 0) {
    var lastGenRow = sheetGen.getLastRow();
    var startRow = Math.max(13, lastGenRow + 1); // Zaglavlje na redu 12, startamo ispod
    
    sheetGen.getRange(startRow, 1, itemsToAdd.length, 6).setValues(itemsToAdd);
    
    // Obriši/Odznači u Cjeniku
    rowsToClear.forEach(function(r) {
       var cell = sheetCjenik.getRange(r.row, 7); // Stupac G
       if (r.isCheckbox) {
          try { cell.uncheck(); } catch(e) { cell.setValue(false); }
       } else {
          cell.clearContent();
       }
    });
    
    SpreadsheetApp.getUi().alert("✅ Uspješno prebačeno " + itemsToAdd.length + " stavaka u Ponudu!");
  } else {
    SpreadsheetApp.getUi().alert("ℹ️ Niste označili niti jednu stavku u stupcu G (količina ili kvačica).");
  }
}

// --- 4. AI INVOICE OCR PROCESSING ---

function processNewInvoices() {
  var folderInId = SCRIPT_PROP.getProperty("FOLDER_IN_ID") || "1kpBzqrSHVWTaBi8kKIUXknKhRtoUEy5g";
  var folderOutId = SCRIPT_PROP.getProperty("FOLDER_OUT_ID") || "1N7XfCy5s0XnLrCJaBB2QxhJ3gH6eya_a";
  
  var folderIn;
  var folderOut;
  try {
    folderIn = DriveApp.getFolderById(folderInId);
    folderOut = DriveApp.getFolderById(folderOutId);
  } catch(e) {
    if(SpreadsheetApp.getUi) SpreadsheetApp.getUi().alert("Greška: Nije pronađen Google Drive folder. Provjerite ID.");
    return;
  }
  
  // We process a max number of files to prevent timeout
  var files = folderIn.getFiles();
  var count = 0;
  
  while (files.hasNext() && count < 10) {
    var file = files.next();
    
    // 1. OCR Extract Text via Google Drive API
    var text = null;
    try {
        var token = ScriptApp.getOAuthToken();
        var copyUrl = "https://www.googleapis.com/drive/v3/files/" + file.getId() + "/copy";
        var options = {
          method: "POST",
          headers: {"Authorization": "Bearer " + token},
          contentType: "application/json",
          payload: JSON.stringify({ mimeType: "application/vnd.google-apps.document" }),
          muteHttpExceptions: true
        };
        var copyRes = UrlFetchApp.fetch(copyUrl, options);
        if (copyRes.getResponseCode() == 200) {
          var docId = JSON.parse(copyRes.getContentText()).id;
          var doc = DocumentApp.openById(docId);
          text = doc.getBody().getText();
          DriveApp.getFileById(docId).setTrashed(true);
        }
    } catch(ocrErr) {
       console.log("OCR Error: " + ocrErr);
    }
    
    if (!text || text.trim().length < 5) {
      console.log("Preskačem " + file.getName() + " jer nema prepoznatog teksta.");
      file.moveTo(folderOut); // Move even if failed
      continue;
    }
    
    // 2. OpenAI Parse
    var data = null;
    try {
        var apiKey = PropertiesService.getScriptProperties().getProperty("OPENAI_API_KEY");
        if (!apiKey) {
           if(SpreadsheetApp.getUi) SpreadsheetApp.getUi().alert("Greška: Nije postavljen OPENAI_API_KEY u Script Properties.");
           return;
        }
        var url = "https://api.openai.com/v1/chat/completions";
        var prompt = "Pročitaj tekst ovog računa ili putnog naloga/loko vožnje i izvuci podatke u JSON formatu.\n" +
                     "- Ako je račun: dobavljac (naziv), iznos (float), datum (DD.MM.YYYY), vrsta_troska ('Gorivo', 'Ured', 'Marketing', itd.)\n" +
                     "- Ako je Putni nalog/Loko vožnja: dobavljac bi trebao biti 'Karlo (Zaposlenik)', vrsta_troska: 'Putni trošak', iznos: (ukupno za isplatu), opis: (relacija ili mjesec)\n\n" +
                     "Tekst dokumenta:\n" + text;
                     
        var payload = {
          model: "gpt-4o-mini",
          response_format: { "type": "json_object" },
          messages: [
            { role: "system", content: "Ti si stručni porezni savjetnik. Vraćaš isključivo čisti JSON sukladno uputama. Nemoj vraćati nikakav drugi tekst, samo JSON." },
            { role: "user", content: prompt }
          ],
          temperature: 0.1
        };
        
        var res = UrlFetchApp.fetch(url, {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + apiKey,
            "Content-Type": "application/json"
          },
          payload: JSON.stringify(payload),
          muteHttpExceptions: true
        });
        
        if (res.getResponseCode() == 200) {
           var json = JSON.parse(res.getContentText());
           data = JSON.parse(json.choices[0].message.content);
        } else {
           console.log("OpenAI Error: " + res.getContentText());
        }
    } catch(aiErr) {
        console.log("AI Parsing Error: " + aiErr);
    }
    
    if (!data) {
      console.log("OpenAI nije uspio parsirati " + file.getName());
      continue; // leave it in IN folder so user can check
    }
    
    // 3. Log to Dnevnik
    var fileUrl = file.getUrl();
    var datum = data.datum || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd.MM.yyyy");
    var iznos = parseFloat(data.iznos) || 0;
    var dobavljac = data.dobavljac || "Nepoznati dobavljač";
    var opis = "Ulazni račun: " + (data.vrsta_troska || "Trošak") + " (AI Obrada)";
    var dokumentLink = '=HYPERLINK("' + fileUrl + '"; "🔎 Otvori račun")';
    
    recordDnevnikEntry(
         datum,
         "URA",
         dobavljac,
         opis,
         dokumentLink, 
         [
           { konto: "4100", nazivKonta: "Troškovi (" + (data.vrsta_troska || "Razno") + ")", duguje: iznos, potrazuje: 0 },
           { konto: "2200", nazivKonta: "Dobavljači u zemlji", duguje: 0, potrazuje: iznos }
         ]
    );
    
    // 4. Move File to OUT
    file.moveTo(folderOut);
    count++;
  }
  
  if(SpreadsheetApp.getUi) {
      if (count > 0) {
        SpreadsheetApp.getUi().alert("✅ Uspješno proknjiženo " + count + " novih URA računa!");
      } else {
        SpreadsheetApp.getUi().alert("ℹ️ Nema novih računa u mapi za knjiženje.");
      }
  }
}

// --- 5. AUTOMATSKO PLAĆANJE URA (IZVOD) ---
function paySelectedUra() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  
  if (sheet.getName() !== "Dnevnik knjiženja") {
    SpreadsheetApp.getUi().alert("Greška: Ovu radnju možete pokrenuti samo dok ste u tabu 'Dnevnik knjiženja'.");
    return;
  }
  
  var cell = sheet.getActiveCell();
  var row = cell.getRow();
  
  if (row < 2) {
    SpreadsheetApp.getUi().alert("Molimo označite redak unutar kojeg je račun.");
    return;
  }
  
  var vrstaDokumenta = String(sheet.getRange(row, 2).getValue()).toUpperCase();
  if (vrstaDokumenta !== "URA") {
     SpreadsheetApp.getUi().alert("Možete platiti samo račune koji imaju oznaku 'URA' (Ulazni račun).");
     return;
  }
  
  var stranka = sheet.getRange(row, 3).getValue();
  var konto = String(sheet.getRange(row, 6).getValue());
  var potrazuje = parseFloat(sheet.getRange(row, 9).getValue()); // Očekujemo da konto 2200 Potražuje
  
  // Provjera jesmo li označili pravi "Dobavljači" red od te URE
  if (konto !== "2200" || potrazuje <= 0) {
      SpreadsheetApp.getUi().alert("Molimo označite onaj red URA-e u kojem Konto 2200 (Dobavljači) POTRAŽUJE novac kako bismo znali iznos za uplatu.");
      return;
  }
  
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert('Plaćanje URA-e', 'Želite li proknjižiti IZVOD (Plaćanje) u iznosu od ' + potrazuje.toFixed(2) + ' € za dobavljača "' + stranka + '"?', ui.ButtonSet.YES_NO);
  
  if (response == ui.Button.YES) {
      var datumPlacanja = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd.MM.yyyy");
      recordDnevnikEntry(
         datumPlacanja,
         "IZVOD",
         stranka,
         "Plaćanje dobavljaču (" + stranka + ")",
         "Izvod (Auto)", 
         [
           { konto: "2200", nazivKonta: "Dobavljači u zemlji", duguje: potrazuje, potrazuje: 0 },
           { konto: "1000", nazivKonta: "Žiro račun", duguje: 0, potrazuje: potrazuje }
         ]
      );
      
      // Vizualna potvrda: bojimo red u zeleno da se zna da je riješeno
      sheet.getRange(row, 1, 1, 10).setBackground("#d9ead3"); 
      ui.alert("✅ Izvod uspješno proknjižen na dno Dnevnika!");
  }
}

// --- 6. DRIVE AUTO-SAVE HELPER ---
function savePdfToDrive(pdfBlob, folderName) {
  try {
    var parentName = "2LMF Računovodstvo";
    var rootFolders = DriveApp.getFoldersByName(parentName);
    var targetParent;
    if (rootFolders.hasNext()) {
      targetParent = rootFolders.next();
    } else {
      targetParent = DriveApp.getRootFolder();
    }
    
    var folders = targetParent.getFoldersByName(folderName);
    var folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = targetParent.createFolder(folderName);
    }
    var file = folder.createFile(pdfBlob);
    return file.getUrl();
  } catch (err) {
    console.log("Nemoguće spremiti PDF na Drive: " + err);
    return "";
  }
}

// --- TRAVEL & JOPPD MODULE ---

function calculateTravelTrips() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Putni nalozi");
  if (!sheet) return;
  
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    var startKm = parseFloat(data[i][3]);
    var endKm = parseFloat(data[i][4]);
    
    if (!isNaN(startKm) && !isNaN(endKm)) {
      var totalKm = endKm - startKm;
      var amount = totalKm * 0.50;
      sheet.getRange(i + 1, 6).setValue(totalKm);
      sheet.getRange(i + 1, 7).setValue(amount);
    }
  }
  SpreadsheetApp.getUi().alert("✅ Putni troškovi obračunati (0.50 €/km)!");
}

function showJoppdDialog() {
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt("Generiraj JOPPD", "Unesite mjesec i godinu (npr. 03.2024):", ui.ButtonSet.OK_CANCEL);
  if (result.getSelectedButton() == ui.Button.OK) {
    var period = result.getResponseText();
    var xml = generateJOPPDXml(period);
    
    var html = HtmlService.createHtmlOutput("<p>Vaš JOPPD XML je spreman. Kopirajte tekst ispod:</p><textarea style=\"width:100%;height:300px;\">" + xml + "</textarea>")
               .setWidth(500).setHeight(400);
    ui.showModalDialog(html, "JOPPD XML Generator");
  }
}

function generateJOPPDXml(period) {
  var today = Utilities.formatDate(new Date(), "GMT+1", "yyyy-MM-dd");
  var oibFirme = "12345678901"; 
  
  var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
  xml += "<JOPPD>\n";
  xml += "  <StranicaA>\n";
  xml += "    <DatumIzvjesca>" + today + "</DatumIzvjesca>\n";
  xml += "    <OIB>" + oibFirme + "</OIB>\n";
  xml += "    <OznakaIzvjesca>" + period.replace(".", "") + "011</OznakaIzvjesca>\n";
  xml += "  </StranicaA>\n";
  xml += "  <StranicaB>\n";
  xml += "    <Podatak>\n";
  xml += "      <RedniBroj>1</RedniBroj>\n";
  xml += "      <OznakaPrimitka>0001</OznakaPrimitka>\n";
  xml += "      <Iznos>1295.45</Iznos>\n";
  xml += "    </Podatak>\n";
  xml += "  </StranicaB>\n";
  xml += "</JOPPD>";
  
  return xml;
}
function calculateLokoTrips() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Loko vožnja");
  if (!sheet) return;
  
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    var km = parseFloat(data[i][1]); // Kolona B: Ukupno km
    
    if (!isNaN(km)) {
      var amount = km * 0.50;
      sheet.getRange(i + 1, 3).setValue(amount); // Kolona C: Iznos
    }
  }
  SpreadsheetApp.getUi().alert("✅ Loko vožnja obračunata (0.50 €/km)!");
}

function syncTravelToAiFolder() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Putni nalozi");
  var folderId = SCRIPT_PROP.getProperty("FOLDER_IN_ID") || "1kpBzqrSHVWTaBi8kKIUXknKhRtoUEy5g";
  if (!sheet) return;
  
  var data = sheet.getDataRange().getValues();
  var count = 0;
  for (var i = 1; i < data.length; i++) {
    var status = data[i][10]; // Kolona K (vratio sam na K u setupu)
    if (status !== "KNJIŽENO" && status !== "POSLANO NA OCR") {
      var dateVal = (data[i][0] instanceof Date) ? data[i][0] : new Date(data[i][0]);
      if (isNaN(dateVal.getTime())) continue; // Skip if invalid date
      
      var rowData = {
        datum: Utilities.formatDate(dateVal, "GMT+1", "dd.MM.yyyy"),
        relacija: data[i][1],
        svrha: data[i][2],
        km: data[i][5],
        iznos: data[i][6],
        vozac: data[i][7],
        vozilo: data[i][8],
        registracija: data[i][9]
      };
      
      var html = generateProfessionalHtml("PUTNI NALOG", rowData);
      var blob = HtmlService.createHtmlOutput(html).getAs("application/pdf");
      blob.setName("Putni_Nalog_" + rowData.relacija.replace(/\s/g,"_") + "_" + rowData.datum + ".pdf");
      
      DriveApp.getFolderById(folderId).createFile(blob);
      sheet.getRange(i + 1, 11).setValue("POSLANO NA OCR");
      count++;
    }
  }
  if (count > 0) SpreadsheetApp.getUi().alert("✅ " + count + " naloga poslano u 'ULAZ'.");
  else SpreadsheetApp.getUi().alert("ℹ️ Nema novih naloga.");
}

function syncLokoToAiFolder() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Loko vožnja");
  var folderId = SCRIPT_PROP.getProperty("FOLDER_IN_ID") || "1kpBzqrSHVWTaBi8kKIUXknKhRtoUEy5g";
  if (!sheet) return;
  
  var data = sheet.getDataRange().getValues();
  var count = 0;
  for (var i = 1; i < data.length; i++) {
    var status = data[i][6]; // Kolona G
    if (status !== "KNJIŽENO" && status !== "POSLANO NA OCR") {
      var mjesecRaw = data[i][0].toString();
      var currentYear = new Date().getFullYear();
      var mjesecFormat = mjesecRaw.includes("/") || mjesecRaw.includes(".") ? mjesecRaw : mjesecRaw + "/" + currentYear;
      
      var rowData = {
        mjesec: mjesecFormat,
        km: data[i][1],
        iznos: data[i][2],
        vozac: data[i][3],
        vozilo: data[i][4],
        registracija: data[i][5]
      };
      
      var html = generateProfessionalHtml("LOKO VOŽNJA", rowData);
      var blob = HtmlService.createHtmlOutput(html).getAs("application/pdf");
      blob.setName("Loko_Voznja_" + rowData.mjesec + ".pdf");
      
      DriveApp.getFolderById(folderId).createFile(blob);
      sheet.getRange(i + 1, 7).setValue("POSLANO NA OCR");
      count++;
    }
  }
  if (count > 0) SpreadsheetApp.getUi().alert("✅ " + count + " mjesečnih evidencija loko vožnje poslano u 'ULAZ'.");
  else SpreadsheetApp.getUi().alert("ℹ️ Nema novih loko vožnji.");
}

function generateProfessionalHtml(type, data) {
  var compName = SCRIPT_PROP.getProperty("COMPANY_NAME") || "TVRTKA D.O.O.";
  var compOib = SCRIPT_PROP.getProperty("COMPANY_OIB") || "12345678901";
  var compAddr = SCRIPT_PROP.getProperty("COMPANY_ADDRESS") || "Ulica 1, Zagreb";
  
  var today = Utilities.formatDate(new Date(), "GMT+1", "dd.MM.yyyy");
  
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 10px;">
      <table style="width: 100%; margin-bottom: 40px; border-bottom: 2px solid #E67E22; padding-bottom: 10px;">
        <tr>
          <td>
            <b style="font-size: 18px; color: #E67E22;">${compName}</b><br>
            OIB: ${compOib}<br>
            Adresa: ${compAddr}
          </td>
          <td style="text-align: right; vertical-align: top;">
            <span style="font-size: 14px; color: #888;">Datum dokumenta: ${today}</span>
          </td>
        </tr>
      </table>
      
      <h1 style="text-align: center; color: #E67E22; margin-bottom: 30px; border: 1px solid #E67E22; padding: 10px;">${type}</h1>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; background: #fafafa; width: 30%;"><b>VOZAČ:</b></td>
          <td style="padding: 10px; border: 1px solid #eee;">${data.vozac || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; background: #fafafa;"><b>VOZILO:</b></td>
          <td style="padding: 10px; border: 1px solid #eee;">${data.vozilo || "-"} (${data.registracija || "-"})</td>
        </tr>
      </table>

      <div style="margin-bottom: 30px;">
        <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">DETALJI PUTOVANJA:</h3>
        <p><b>${data.datum ? "Datum:" : "Period/mjesec:"}</b> ${data.datum || data.mjesec || "-"}</p>
        <p><b>Relacija:</b> ${data.relacija || "Loko vožnja (prema evidenciji)"}</p>
        <p><b>Svrha:</b> ${data.svrha || "Službeni sastanci / poslovi"}</p>
        <p><b>Prijeđeni kilometri:</b> ${data.km || "0"} km</p>
      </div>

      <div style="margin-top: 40px; text-align: right; font-size: 20px;">
        <b>UKUPNO ZA ISPLATU: <span style="color: #E67E22;">${data.iznos || "0.00"} EUR</span></b>
      </div>

      <div style="margin-top: 80px;">
        <table style="width: 100%;">
          <tr>
            <td style="width: 50%; text-align: center;">
              <hr style="width: 150px; border: 0; border-top: 1px solid #000; margin-bottom: 5px;">
              Potpis vozača
            </td>
            <td style="width: 50%; text-align: center;">
              <hr style="width: 150px; border: 0; border-top: 1px solid #000; margin-bottom: 5px;">
              Potpis i pečat poslodavca
            </td>
          </tr>
        </table>
      </div>
    </div>
  `;
}

