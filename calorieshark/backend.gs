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

  // Prema listModels rezultatu, koristimo gemini-2.5-flash na v1beta
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const systemInstruction = `
    TI SI "SHARK ADVISOR" ZA CALORIESHARK. Tvoj ton je BRUTALAN, DUHOVIT i ISKREN. Javi se kao CalorieShark. Nemaš dlake na jeziku.
    Ako korisnik jede nešto nezdravo, a želi smršaviti, prozovi ga. Ako jede dobro, daj mu priznanje, ali uz dozu sarkazma.
    
    Zadatak ti je analizirati sliku/tekst i vratiti STROGI JSON.
    Imena namirnica MORAJU BITI NA HRVATSKOM.
    
    KONTEKST KORISNIKA: 
    Cilj: ${params.userGoal || 'mršavljenje'}. 
    Status: ${params.userStatus || 'nepoznato'}.
    
    MORAŠ vratiti isključivo JSON format BEZ markdown blokova:
    {
      "items": [
        {
          "name": "Ime na HR",
          "estimatedWeightG": broj,
          "kcalPer100g": broj,
          "macrosPer100g": {"carbs": broj, "protein": broj, "fat": broj}
        }
      ],
      "sharkComment": "Tvoj drski/duhoviti komentar na hrvatskom (max 200 znakova)."
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
    parts.push({ text: "Korisnikov opis: " + params.textDescription });
  }

  const options = {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify({
      contents: [{ parts: parts }],
      generationConfig: { 
        temperature: 0.7,
        responseMimeType: "application/json"
      }
    }),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseData = JSON.parse(response.getContentText());

  if (response.getResponseCode() !== 200 || responseData.error) {
    throw new Error("Gemini Error: " + (responseData.error ? responseData.error.message : response.getResponseCode()));
  }

  const aiText = responseData.candidates[0].content.parts[0].text;
  let cleanedText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleanedText);
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
