// ==========================================
// CALORIESHARK - GOOGLE APPS SCRIPT BACKEND (v8 - 2026 Stable)
// ==========================================

const SHEET_NAME_USERS = "Korisnici";
const SHEET_NAME_LOGS = "Dnevnik Unosa";

function setupSheets() {
  const ss = SpreadsheetApp.openById("1xTr_ZfsZCpNEqahUwW0TxjFgI-guXPUQfePj-lRV1AI");
  let logSheet = ss.getSheetByName(SHEET_NAME_LOGS);
  if (!logSheet) {
    logSheet = ss.insertSheet(SHEET_NAME_LOGS);
    logSheet.appendRow(["ID", "Timestamp", "Datum", "User Info", "Meal Data (JSON)", "Ukupno Kcal", "Carbs", "Protein", "Fat"]);
    logSheet.setFrozenRows(1);
    logSheet.getRange(1, 1, 1, logSheet.getLastColumn()).setFontWeight("bold");
  }
  return "Baza uspješno postavljena!";
}

function buildHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };
}

function doOptions(e) {
  return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.JSON).setHeaders(buildHeaders());
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    if (action === "analyzeMeal" || action === "analyzeImage") {
      // Server-side dnevni limit (ne može se zaobići brisanjem localStorage-a u pregledniku)
      checkQuota_(data.username || "Gost");

      const result = analyzeWithGemini({
        imageBase64: data.imageBase64,
        textDescription: data.textDescription,
        userGoal: data.userGoal,
        userStatus: data.userStatus,
        language: data.language || "hr"
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
// SERVER-SIDE DNEVNI LIMIT AI ANALIZA
// ==========================================
// Prava zaštita zajedničke Gemini kvote - "vision energy" munje u pregledniku
// se zaobiđu brisanjem localStorage-a ili novim usernameom.
const QUOTA_PER_USER_DAY = 40;   // koliko AI analiza jedan korisnik smije dnevno
const QUOTA_GLOBAL_DAY   = 1200; // ukupni dnevni strop za sve korisnike

// Primarni model + lakši fallback ako je primarni preopterećen ("high demand" / 503)
const MODEL_PRIMARY  = "gemini-2.5-flash";
const MODEL_FALLBACK = "gemini-2.5-flash-lite";

function checkQuota_(username) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(5000);
  } catch (e) {
    return; // ne dobijemo lock -> radije pusti zahtjev nego blokiraj korisnika
  }

  try {
    const props = PropertiesService.getScriptProperties();
    const day = Utilities.formatDate(new Date(), "Europe/Zagreb", "yyyy-MM-dd");

    const gKey = "q_g_" + day;
    const gCount = Number(props.getProperty(gKey) || 0);
    if (gCount >= QUOTA_GLOBAL_DAY) {
      throw new Error("QUOTA_GLOBAL: dnevna AI kvota za sve korisnike je potrošena.");
    }

    const uKey = "q_" + day + "_" + String(username).toLowerCase().substring(0, 40);
    const uCount = Number(props.getProperty(uKey) || 0);
    if (uCount >= QUOTA_PER_USER_DAY) {
      throw new Error("QUOTA_USER: potrošen je dnevni limit AI analiza za ovog korisnika.");
    }

    props.setProperty(gKey, String(gCount + 1));
    props.setProperty(uKey, String(uCount + 1));

    if (Math.random() < 0.03) {
      const all = props.getProperties();
      Object.keys(all).forEach(function (k) {
        if (k.indexOf("q_") === 0 && k.indexOf(day) === -1) props.deleteProperty(k);
      });
    }
  } finally {
    lock.releaseLock();
  }
}

function analyzeWithGemini(params) {
  const nameRule = (params.language === "en")
    ? 'Item names (the "name" field) MUST be written in ENGLISH.'
    : 'Imena namirnica (polje "name") MORAJU BITI NA HRVATSKOM.';

  const systemInstruction = `
    TI SI "SHARK ADVISOR" ZA CALORIESHARK. Tvoj ton je BRUTALAN, DUHOVIT i ISKREN. Javi se kao CalorieShark. Nemaš dlake na jeziku.
    Ako korisnik jede nešto nezdravo, a želi smršaviti, prozovi ga. Ako jede dobro, daj mu priznanje, ali uz dozu sarkazma.

    Zadatak ti je analizirati sliku/tekst i vratiti STROGI JSON.
    ${nameRule}

    KONTEKST KORISNIKA:
    Cilj: ${params.userGoal || 'mršavljenje'}.
    Status: ${params.userStatus || 'nepoznato'}.

    PREPOZNAVANJE NEUSPJEHA:
    Ako slika NE sadrži prepoznatljivu hranu ili piće (prazan tanjur, osoba, tekst, dokument, ekran, previše mutna ili tamna slika), vrati TOČNO ovo i ništa drugo:
    {"items": []}

    Za SVAKU stavku OBAVEZNO dodaj polje "confidence" s vrijednošću "high", "medium" ili "low":
    - "high"   = namirnica je jasno prepoznata i procjena gramaže je pouzdana
    - "medium" = namirnica je prepoznata, ali je gramaža gruba procjena
    - "low"    = mutna slika, izmiješana hrana, skriveni sastojci ili čisto nagađanje

    MORAŠ vratiti isključivo JSON format BEZ markdown blokova:
    {
      "items": [
        {
          "name": "Ime na HR",
          "estimatedWeightG": broj,
          "kcalPer100g": broj,
          "confidence": "high" | "medium" | "low",
          "macrosPer100g": {"carbs": broj, "protein": broj, "fat": broj}
        }
      ],
      "sharkComment": "Tvoj drski/duhoviti komentar na hrvatskom (max 200 znakova)."
    }
  `;

  let parts = [{ text: systemInstruction }];

  if (params.imageBase64) {
    const cleanBase64 = params.imageBase64.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
    parts.push({ inlineData: { mimeType: "image/jpeg", data: cleanBase64 } });
  }

  if (params.textDescription) {
    parts.push({ text: "Korisnikov opis: " + params.textDescription });
  }

  const requestBody = {
    contents: [{ parts: parts }],
    generationConfig: {
      temperature: 0.7,
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 0 }
    }
  };

  // 1) primarni model (s "repair" pokušajem ako JSON dođe neispravan)
  // 2) ako je primarni preopterećen ("high demand" / 503), probaj lakši fallback model
  try {
    return runModel_(requestBody, MODEL_PRIMARY);
  } catch (e1) {
    if (String(e1).indexOf("AI_OVERLOAD") !== -1) {
      return runModel_(requestBody, MODEL_FALLBACK);
    }
    throw e1;
  }
}

// Poziv jednog modela + jedan "repair" pokušaj ako JSON dođe neispravan
function runModel_(requestBody, model) {
  try {
    return callGemini_(requestBody, model);
  } catch (e) {
    if (String(e).indexOf("AI_BADJSON") === -1) throw e;
    var parts = requestBody.contents[0].parts;
    var hasReminder = parts.some(function (p) { return p.text && p.text.indexOf("PODSJETNIK:") === 0; });
    if (!hasReminder) {
      parts.push({ text: "PODSJETNIK: Vrati ISKLJUČIVO čisti, validan JSON objekt kako je opisano. Bez markdowna, bez komentara, bez ičega izvan JSON-a." });
    }
    return callGemini_(requestBody, model);
  }
}

// Jedan poziv na Gemini s internim retryjem na PROLAZNE greške (503/500/overload) + robusna obrada
function callGemini_(requestBody, model) {
  const apiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
  if (!apiKey) throw new Error("Nedostaje GEMINI_API_KEY.");

  model = model || MODEL_PRIMARY;
  const url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + apiKey;

  const backoffs = [0, 1200, 2500, 4500]; // ms pauze prije svakog pokušaja
  let lastErr = null;

  for (let attempt = 0; attempt < backoffs.length; attempt++) {
    if (backoffs[attempt]) Utilities.sleep(backoffs[attempt]);

    const response = UrlFetchApp.fetch(url, {
      method: "POST",
      contentType: "application/json",
      payload: JSON.stringify(requestBody),
      muteHttpExceptions: true
    });

    const code = response.getResponseCode();
    const raw = response.getContentText();

    let responseData;
    try {
      responseData = JSON.parse(raw);
    } catch (e) {
      lastErr = new Error("AI_OVERLOAD: neispravan/prazan odgovor servera (HTTP " + code + ")");
      continue; // često prolazno -> probaj opet
    }

    if (code === 200 && !responseData.error) {
      return extractGeminiJson_(responseData);
    }

    const errMsg = responseData.error ? (responseData.error.message || "") : ("HTTP " + code);

    // Prolazne greške (Googleov kapacitet) -> ponovi
    if (code === 503 || code === 500 || /overload|unavailable|try again|internal error/i.test(errMsg)) {
      lastErr = new Error("AI_OVERLOAD: " + errMsg);
      continue;
    }

    // Kvota / rate limit -> nema smisla odmah ponavljati
    if (code === 429) throw new Error("QUOTA_GEMINI: Gemini kvota/limit trenutno potrošen.");

    // Ostalo (npr. 400 loš zahtjev) -> odustani odmah
    throw new Error("Gemini Error: " + errMsg);
  }

  throw lastErr || new Error("AI_OVERLOAD: Gemini nedostupan nakon više pokušaja.");
}

// Sigurno izvuci JSON iz Gemini odgovora (hvata safety-block, prazan candidate, thought-dijelove, markdown omot)
function extractGeminiJson_(responseData) {
  if (responseData.promptFeedback && responseData.promptFeedback.blockReason) {
    throw new Error("AI_BLOCKED: " + responseData.promptFeedback.blockReason);
  }

  const cand = responseData.candidates && responseData.candidates[0];
  if (!cand) throw new Error("AI_EMPTY: nema kandidata u odgovoru");

  if (cand.finishReason === "SAFETY" || cand.finishReason === "RECITATION" || cand.finishReason === "PROHIBITED_CONTENT") {
    throw new Error("AI_BLOCKED: " + cand.finishReason);
  }

  const allParts = (cand.content && cand.content.parts) || [];
  const realParts = allParts.filter(function (p) { return !p.thought && p.text; });

  let text = "";
  if (realParts.length) {
    text = realParts.map(function (p) { return p.text; }).join("");
  } else if (allParts.length && allParts[0].text) {
    text = allParts[0].text;
  }

  text = String(text).replace(/```json/gi, "").replace(/```/g, "").trim();
  if (!text) throw new Error("AI_EMPTY: prazan tekst u odgovoru");

  try {
    return JSON.parse(text);
  } catch (e) {
    const s = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (s !== -1 && end !== -1 && end > s) {
      try {
        return JSON.parse(text.substring(s, end + 1));
      } catch (e2) { /* padamo na grešku ispod */ }
    }
    throw new Error("AI_BADJSON: " + text.substring(0, 120));
  }
}

function saveMealLog(mealData, userInfo, username) {
  const ss = SpreadsheetApp.openById("1xTr_ZfsZCpNEqahUwW0TxjFgI-guXPUQfePj-lRV1AI");
  let logSheet = ss.getSheetByName(SHEET_NAME_LOGS);
  const timestamp = new Date();
  logSheet.appendRow([
    "M-"+timestamp.getTime(),
    timestamp,
    Utilities.formatDate(timestamp, "Europe/Zagreb", "dd.MM.yyyy"),
    username || "Gost",
    userInfo.email || "",
    JSON.stringify(userInfo),
    JSON.stringify(mealData.items),
    parseFloat(mealData.totals.kcal).toFixed(1), 
    parseFloat(mealData.totals.carbs).toFixed(1),
    parseFloat(mealData.totals.protein).toFixed(1), 
    parseFloat(mealData.totals.fat).toFixed(1)
  ]);
  return { status: "success" };
}

function getMealHistory(username) {
  const ss = SpreadsheetApp.openById("1xTr_ZfsZCpNEqahUwW0TxjFgI-guXPUQfePj-lRV1AI");
  const logSheet = ss.getSheetByName(SHEET_NAME_LOGS);
  if (!logSheet) return [];
  const data = logSheet.getDataRange().getValues();
  return data.filter(r => String(r[3]).toLowerCase() === String(username).toLowerCase()).map(r => ({
    id: r[0], date: r[2], items: JSON.parse(r[5] || "[]"),
    totals: { kcal: r[6], carbs: r[7], protein: r[8], fat: r[9] }
  }));
}

function deleteMealLog(id, username) {
  const ss = SpreadsheetApp.openById("1xTr_ZfsZCpNEqahUwW0TxjFgI-guXPUQfePj-lRV1AI");
  const logSheet = ss.getSheetByName(SHEET_NAME_LOGS);
  const data = logSheet.getDataRange().getValues();
  for (let i = data.length - 1; i >= 1; i--) {
    if (String(data[i][0]) === String(id)) {
      logSheet.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}
