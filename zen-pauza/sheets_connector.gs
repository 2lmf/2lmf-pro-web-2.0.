/**
 * ZEN PAUZA - Google Sheets Connector
 * 
 * Svrha: Prima podatke o navikama iz aplikacije i sprema ih u Sheet.
 * Upute: 
 * 1. Otvori svoj Google Sheet.
 * 2. Extensions -> Apps Script.
 * 3. Zalijepi ovaj kod.
 * 4. Deploy -> New Deployment -> Web App (Set "Execute as: Me" and "Who has access: Anyone").
 * 5. Kopiraj URL i zalijepi ga u app.js pod 'SHEETS_URL'.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UserLog") || 
                SpreadsheetApp.getActiveSpreadsheet().insertSheet("UserLog");
    
    // Headers if empty
    if (sheet.getLastRow() == 0) {
      sheet.appendRow(["Timestamp", "UserEmail", "HabitID", "Action"]);
    }
    
    sheet.appendRow([
      new Date(),
      data.email || "Anonymous",
      data.habitId,
      data.action
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
