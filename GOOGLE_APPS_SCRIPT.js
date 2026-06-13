// ==========================================
// GOOGLE APPS SCRIPT WEBHOOK FOR MAGIZH 2026
// ==========================================
// 1. Go to Google Sheets, create a new spreadsheet.
// 2. Click Extensions > Apps Script.
// 3. Paste this entire code, replacing any existing code.
// 4. Click Deploy > New Deployment.
// 5. Select "Web app".
//    - Execute as: "Me"
//    - Who has access: "Anyone"
// 6. Copy the generated Web App URL and paste it into your AI Studio Secrets
//    as VITE_GOOGLE_SHEETS_WEBHOOK_URL

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    const teamName = data.teamName || "Solo";
    const college = data.college || "Unknown";
    const members = data.members || [];
    
    // Add headers if sheet is completely empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", 
        "Team Name", 
        "College", 
        "Member Index", 
        "Name", 
        "Roll No. / ID",
        "Email", 
        "Phone", 
        "Event", 
        "Dietary Pref"
      ]);
      // Make headers bold
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold");
    }
    
    // Insert a row for each team member
    members.forEach((member, index) => {
      sheet.appendRow([
        new Date().toISOString(),
        teamName,
        college,
        (index + 1).toString(),
        member.name || "",
        member.institutionalId || "",
        member.email || "",
        member.phone || "",
        member.eventChoice || "",
        member.dietary || ""
      ]);
    });
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "message": "Registered " + members.length + " members" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handling CORS preflight requests
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON);
}
