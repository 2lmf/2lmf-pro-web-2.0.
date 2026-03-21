// ==========================================
// CALORIESHARK - GOOGLE APPS SCRIPT BACKEND (v6 - Diagnostic Mode)
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

    if (action === "listModels") {
      return ContentService.createTextOutput(JSON.stringify({ status: "success", data: listModels() }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "analyzeMeal" || action === "analyzeImage") {
      const result = analyzeWithGemini({
        imageBase64: data.imageBase64,
        textDescription: data.textDescription,
        userGoal: data.userGoal,
        userStatus: data.userStatus
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

function analyzeWithGemini(params) {
  const apiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
  if (!apiKey) throw new Error("Nedostaje GEMINI_API_KEY.");

  const configurations = [
    { ver: "v1beta", model: "gemini-1.5-flash" },
    { ver: "v1",     model: "gemini-1.5-flash" },
    { ver: "v1beta", model: "gemini-1.5-pro" },
    { ver: "v1",     model: "gemini-1.5-pro" },
    { ver: "v1beta", model: "gemini-pro" },
    { ver: "v1",     model: "gemini-pro" }
  ];

  let errors = [];

  for (const config of configurations) {
    try {
      const url = `https://generativelanguage.googleapis.com/${config.ver}/models/${config.model}:generateContent?key=${apiKey}`;
      
      const systemInstruction = `
        TI SI SHARK ADVISOR ZA CALORIESHARK. VRATI ISKLJUČIVO JSON OBJEKT {"items": [], "sharkComment": ""}. 
        NEMA MARKDOWN BLOKOVA.
      `;

      let parts = [{ text: systemInstruction }];
      if (params.imageBase64) {
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: params.imageBase64.replace(/^data:image\/(png|jpeg|webp);base64,/, "")
          }
        });
      }
      if (params.textDescription) parts.push({ text: "Korisnik: " + params.textDescription });

      const options = {
        method: "POST",
        contentType: "application/json",
        payload: JSON.stringify({ contents: [{ parts: parts }], generationConfig: { temperature: 0.7 } }),
        muteHttpExceptions: true
      };

      const response = UrlFetchApp.fetch(url, options);
      const responseCode = response.getResponseCode();
      const responseText = response.getContentText();
      const responseData = JSON.parse(responseText);

      if (responseCode === 200 && !responseData.error) {
        const aiText = responseData.candidates[0].content.parts[0].text;
        const cleanedText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanedText);
      } else {
        errors.push(`${config.model}(${config.ver}): ${responseData.error ? responseData.error.message : responseCode}`);
        continue;
      }
    } catch (e) {
      errors.push(`${config.model}(${config.ver}): ${e.toString()}`);
      continue;
    }
  }

  throw new Error("Svi AI pokušaji su zakazali. Pokreni 'listModels' akciju za dijagnostiku. Greške: " + errors.join(" | "));
}

function listModels() {
  const apiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
  if (!apiKey) return "Greška: Nedostaje API ključ.";
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  return response.getContentText();
}

function saveMealLog(mealData, userInfo, username) {
  const ss = SpreadsheetApp.openById("1xTr_ZfsZCpNEqahUwW0TxjFgI-guXPUQfePj-lRV1AI");
  let logSheet = ss.getSheetByName(SHEET_NAME_LOGS);
  if (!logSheet) {
    logSheet = ss.insertSheet(SHEET_NAME_LOGS);
    logSheet.appendRow(["ID", "Timestamp", "Datum", "User Info", "Meal Data (JSON)", "Ukupno Kcal", "Carbs", "Protein", "Fat"]);
  }
  const timestamp = new Date();
  logSheet.appendRow(["M-"+timestamp.getTime(), timestamp, Utilities.formatDate(timestamp, "Europe/Zagreb", "dd.MM.yyyy"), username || "Gost", JSON.stringify(userInfo), JSON.stringify(mealData.items), (mealData.totals ? mealData.totals.kcal : 0), (mealData.totals ? mealData.totals.carbs : 0), (mealData.totals ? mealData.totals.protein : 0), (mealData.totals ? mealData.totals.fat : 0)]);
  return { status: "success" };
}

function getMealHistory(username) {
  const ss = SpreadsheetApp.openById("1xTr_ZfsZCpNEqahUwW0TxjFgI-guXPUQfePj-lRV1AI");
  const logSheet = ss.getSheetByName(SHEET_NAME_LOGS);
  if (!logSheet) return [];
  const data = logSheet.getDataRange().getValues();
  return data.filter(r => String(r[3]).toLowerCase() === String(username).toLowerCase()).map(r => ({ id: r[0], date: r[2], items: JSON.parse(r[5] || "[]"), totals: { kcal: r[6], carbs: r[7], protein: r[8], fat: r[9] } }));
}

function deleteMealLog(id, username) {
  const ss = SpreadsheetApp.openById("1xTr_ZfsZCpNEqahUwW0TxjFgI-guXPUQfePj-lRV1AI");
  const logSheet = ss.getSheetByName(SHEET_NAME_LOGS);
  const data = logSheet.getDataRange().getValues();
  for (let i = data.length - 1; i >= 1; i--) { if (String(data[i][0]) === String(id)) { logSheet.deleteRow(i + 1); return true; } }
  return false;
}
