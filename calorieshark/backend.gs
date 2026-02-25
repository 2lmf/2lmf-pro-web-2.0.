// ==========================================
// CALORIESHARK - GOOGLE APPS SCRIPT BACKEND
// ==========================================

const SHEET_NAME_USERS = "Korisnici";
const SHEET_NAME_LOGS = "Dnevnik Unosa";

// Setup initial sheets if they don't exist
function setupSheets() {
  const ss = SpreadsheetApp.openById("1xTr_ZfsZCpNEqahUwW0TxjFgI-guXPUQfePj-lRV1AI");
  
  // Setup Logs Sheet
  let logSheet = ss.getSheetByName(SHEET_NAME_LOGS);
  if (!logSheet) {
    logSheet = ss.insertSheet(SHEET_NAME_LOGS);
    logSheet.appendRow(["ID", "Timestamp", "Datum", "User Info", "Meal Data (JSON)", "Ukupno Kcal", "Carbs", "Protein", "Fat"]);
    logSheet.setFrozenRows(1);
    logSheet.getRange(1, 1, 1, logSheet.getLastColumn()).setFontWeight("bold");
  }
  
  return "Postavljanje baze uspješno. Možeš nastaviti na sljedeći korak!";
}

// Global Headers for CORS
function buildHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };
}

// Handle CORS Preflight Options
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(buildHeaders());
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    if (action === "analyzeMeal" || action === "analyzeImage") {
      // Šaljemo parametre funkciji (bilo sliku, bilo tekstualni opis)
      const result = analyzeWithGemini({
        imageBase64: data.imageBase64,
        textDescription: data.textDescription
      });
      return ContentService.createTextOutput(JSON.stringify({ status: "success", data: result }))
        .setMimeType(ContentService.MimeType.JSON);
    } 
    
    if (action === "saveMeal") {
      const result = saveMealLog(data.mealData, data.userInfo, data.username);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", ...result }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "deleteMeal") {
      const result = deleteMealLog(data.id, data.username);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", deleted: result }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "getHistory") {
      const result = getMealHistory(data.username);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", data: result }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    throw new Error("Nepoznata akcija: " + action);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ==========================================
// GEMINI API INTEGRACIJA (VISION & TEXT)
// ==========================================
function analyzeWithGemini(params) {
  const apiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
  
  if (!apiKey) {
    throw new Error("Nedostaje GEMINI_API_KEY u Script Properties.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  // Specifičan JSON Prompt prema našem planu iz arhitekture
  const systemInstruction = `
    Ti si stručni nutricionist i asistent za praćenje unosa kalorija po imenu CalorieShark.
    Zadatak ti je analizirati sliku obroka, tekstualni opis obroka, ILI restoranski meni (jelovnik slikan kamerom) i prepoznati sve namirnice i jela.
    Ako korisnik uslika JELOVNIK (restoranski meni) ili tekstualno navede cijelo kompleksno jelo (npr. 'Burger s pomfrijem i cola'), moraš to jelo razbiti na logične komponente (Meso, Pecivo, Krompir, Umak) ili ga tretirati kao gotovo restoransko jelo, dajući najbolju stručnu procjenu prosječne restoranske gramaže za takvu porciju.
    Tvoji odgovori (imena namirnica) MORAJU BITI ISKLJUČIVO NA HRVATSKOM JEZIKU (npr. "Pileća prsa", "Sir", "Kruh"). 
    Ako ne postoji poznata hrvatska riječ, koristi englesku riječ uz kratko objašnjenje u zagradi na hrvatskom.
    MORAŠ vratiti isključivo strogi, validni JSON format, bez markdown blokova i bez dodatnog objašnjavanja.
    Format mora izgledati ovako:
    {
      "items": [
        {
          "name": "Ime namirnice na HRVATSKOM (npr. Pečena pileća prsa s ružmarinom)",
          "estimatedWeightG": broj g (tvoja najbolja procjena mase na slici ILI pretvaranje mase iz poslanog teksta),
          "kcalPer100g": broj kcal,
          "macrosPer100g": {
            "carbs": broj,
            "protein": broj,
            "fat": broj
          }
        }
      ]
    }
  `;

  let parts = [{ text: systemInstruction }];

  if (params.imageBase64) {
    const cleanBase64 = params.imageBase64.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
    parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: cleanBase64
      }
    });
  }

  if (params.textDescription) {
    parts.push({ text: "Korisnikov opis obroka: " + params.textDescription });
  }

  const requestBody = {
    contents: [
      {
        parts: parts
      }
    ],
    generationConfig: {
      temperature: 0.0,
      responseMimeType: "application/json" // Nativno tjera model da vrati JSON
    }
  };

  const options = {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify(requestBody),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseData = JSON.parse(response.getContentText());

  if (response.getResponseCode() !== 200 || responseData.error) {
    throw new Error("Gemini API Error: " + JSON.stringify(responseData.error));
  }

  // Ekstrahiranje JSON odgovora iz Geminija
  const aiText = responseData.candidates[0].content.parts[0].text;
  
  // Gemini će vratiti string koji je čisti JSON
  return JSON.parse(aiText);
}

// ==========================================
// SPREMANJE U GOOGLE SHEETS BAZU
// ==========================================
function saveMealLog(mealData, userInfo, username) {
  const ss = SpreadsheetApp.openById("1xTr_ZfsZCpNEqahUwW0TxjFgI-guXPUQfePj-lRV1AI");
  let logSheet = ss.getSheetByName(SHEET_NAME_LOGS);
  
  if (!logSheet) {
    throw new Error(`Natpis '${SHEET_NAME_LOGS}' nije pronađen u Google Sheetu. Pokreni setupSheets() funkciju prvo.`);
  }

  const timestamp = new Date();
  const datum = Utilities.formatDate(timestamp, Session.getScriptTimeZone() || "Europe/Zagreb", "dd.MM.yyyy");
  const uniqueId = "M-" + timestamp.getTime();
  
  const userIdentifier = username || "Gost";

  // ["ID", "Timestamp", "Datum", "Username", "User Info", "Meal Data (JSON)", "Ukupno Kcal", "Carbs", "Protein", "Fat"]
  logSheet.appendRow([
    uniqueId,
    timestamp,
    datum,
    userIdentifier,
    JSON.stringify(userInfo),
    JSON.stringify(mealData.items),
    parseFloat(mealData.totals.kcal).toFixed(1),
    parseFloat(mealData.totals.carbs).toFixed(1),
    parseFloat(mealData.totals.protein).toFixed(1),
    parseFloat(mealData.totals.fat).toFixed(1)
  ]);

  return { insertedId: uniqueId, timestamp: timestamp };
}

// ==========================================
// DOHVAĆANJE POVIJESTI IZ TABLICE (CLOUD SYNC)
// ==========================================
function getMealHistory(username) {
  if (!username) return [];

  const ss = SpreadsheetApp.openById("1xTr_ZfsZCpNEqahUwW0TxjFgI-guXPUQfePj-lRV1AI");
  const logSheet = ss.getSheetByName(SHEET_NAME_LOGS);
  if (!logSheet) return [];

  const lastRow = logSheet.getLastRow();
  if (lastRow < 2) return []; // Samo header

  // Uzimamo sve podatke u memoriju (brže od čitanja red po red)
  // Stupci: 1:ID, 2:Timestamp, 3:Datum, 4:Username, 5:UserInfo, 6:MealJSON, 7:Kcal, 8:C, 9:P, 10:F
  const data = logSheet.getRange(2, 1, lastRow - 1, 10).getValues();
  
  let userMeals = [];

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const rowUsername = row[3]; // Stupac D
    
    // Usporedi username
    if (String(rowUsername).toLowerCase() === String(username).toLowerCase()) {
      try {
        const timeObj = new Date(row[1]); // Timestamp
        const formattedTime = Utilities.formatDate(timeObj, Session.getScriptTimeZone() || "Europe/Zagreb", "HH:mm");
        const formattedDate = row[2]; // Datum

        userMeals.push({
          id: row[0],
          date: formattedDate,
          time: formattedTime,
          timestamp: timeObj.getTime(),
          items: JSON.parse(row[5]), // Meal Data (JSON)
          totals: {
            kcal: parseFloat(row[6]),
            carbs: parseFloat(row[7]),
            protein: parseFloat(row[8]),
            fat: parseFloat(row[9])
          }
        });
      } catch(e) {
        // Preskoči red ako je JSON korumpiran
        continue;
      }
    }
  }

  // Sortiramo od najnovijeg prema najstarijem
  userMeals.sort((a, b) => b.timestamp - a.timestamp);
  
  return userMeals;
}

// ==========================================
// BRISANJE OBROKA IZ BAZE
// ==========================================
function deleteMealLog(id, username) {
  if (!id || !username) return false;

  const ss = SpreadsheetApp.openById("1xTr_ZfsZCpNEqahUwW0TxjFgI-guXPUQfePj-lRV1AI");
  const logSheet = ss.getSheetByName(SHEET_NAME_LOGS);
  if (!logSheet) return false;

  const data = logSheet.getDataRange().getValues();
  
  // Idemo od zadnjeg prema prvom (jer je obrok najvjerojatnije pri dnu)
  for (let i = data.length - 1; i >= 1; i--) {
    const rowId = data[i][0]; // Stupac A (ID)
    const rowUser = data[i][3]; // Stupac D (Username)

    if (rowId === id && String(rowUser).toLowerCase() === String(username).toLowerCase()) {
      logSheet.deleteRow(i + 1); // +1 jer array kreće od 0, a redovi u Sheetu od 1
      return true;
    }
  }
  
  return false;
}
