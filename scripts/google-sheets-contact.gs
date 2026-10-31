/**
 * Perilancers contact form → Google Sheet (+ email notification)
 *
 * Writes every website enquiry as a new row in the "Enquiries" tab of:
 *   https://docs.google.com/spreadsheets/d/1iI6LIcouOzTcnJVJM2Gte8rk1Yg5SoauO1AOuB-izqs
 *
 * Values are matched to columns by HEADER NAME, not position, so each field always lands
 * in the right column, even if you reorder columns or add your own (e.g. "Status", "Notes").
 * Missing headers are created automatically.
 *
 * Setup (about 5 minutes):
 *  1. Open the sheet above → Extensions → Apps Script. Delete any code there and paste this whole file.
 *  2. Replace SECRET below with a long random string (keep it private; it goes in Vercel too).
 *  3. Click Deploy → New deployment → type "Web app".
 *       Execute as: Me        Who has access: Anyone
 *     Click Deploy and approve the permissions (Sheets + send email as you).
 *  4. Copy the Web app URL (ends in /exec). Add these environment variables to the website:
 *       GOOGLE_SHEETS_WEBHOOK_URL = <the /exec URL>
 *       GOOGLE_SHEETS_SECRET      = <the same SECRET as below>
 *  5. Optional: run the `testSetup` function once from the editor to create the tab and headers.
 *
 * If you edit this script later, use Deploy → Manage deployments → Edit → New version,
 * so the same URL keeps working.
 */

const SECRET = "REPLACE-WITH-A-LONG-RANDOM-STRING";

const SHEET_ID = "1iI6LIcouOzTcnJVJM2Gte8rk1Yg5SoauO1AOuB-izqs";
const TAB_NAME = "Enquiries";

// Every new enquiry is also emailed here. Set to "" to turn email notifications off.
const NOTIFY_EMAIL = "work@perilancers.com";

/** Column header → field sent by the website. Order here is the order for new columns. */
const COLUMNS = [
  { header: "Submitted at", key: "submittedAt" },
  { header: "Name", key: "name" },
  { header: "Email", key: "email" },
  { header: "Company", key: "company" },
  { header: "Service", key: "service" },
  { header: "Budget (USD)", key: "budget" },
  { header: "Project details", key: "message" },
  { header: "UTM source", key: "utm_source" },
  { header: "UTM medium", key: "utm_medium" },
  { header: "UTM campaign", key: "utm_campaign" },
  { header: "Referrer", key: "referrer" },
  { header: "Landing page", key: "landing_page" },
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (data.secret !== SECRET) return json({ ok: false, error: "unauthorized" });

    data.submittedAt = new Date();
    const sheet = getSheet();
    appendByHeader(sheet, data);

    if (NOTIFY_EMAIL) sendNotification(data);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Returns the "Enquiries" tab, creating it and its header row if needed. */
function getSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(TAB_NAME);
  if (!sheet) sheet = ss.insertSheet(TAB_NAME);
  ensureHeaders(sheet);
  return sheet;
}

/** Makes sure every expected header exists in row 1; adds any that are missing at the end. */
function ensureHeaders(sheet) {
  const lastCol = sheet.getLastColumn();
  const existing = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(normalize) : [];
  const missing = COLUMNS.filter((c) => existing.indexOf(normalize(c.header)) === -1).map((c) => c.header);
  if (missing.length) {
    // Reuse trailing blank header cells if the first row has gaps at the end
    let start = existing.length;
    while (start > 0 && existing[start - 1] === "") start--;
    sheet.getRange(1, start + 1, 1, missing.length).setValues([missing]);
  }
  const width = sheet.getLastColumn();
  sheet.getRange(1, 1, 1, width).setFontWeight("bold");
  if (sheet.getFrozenRows() < 1) sheet.setFrozenRows(1);
}

/** Writes one row, placing each value under the column whose header matches its field. */
function appendByHeader(sheet, data) {
  const width = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, width).getValues()[0].map(normalize);
  const row = new Array(width).fill("");

  COLUMNS.forEach((c) => {
    const col = headers.indexOf(normalize(c.header));
    if (col === -1) return;
    const value = data[c.key];
    row[col] = value instanceof Date ? value : clean(value);
  });

  const target = sheet.getLastRow() + 1;
  sheet.getRange(target, 1, 1, width).setValues([row]);

  const dateCol = headers.indexOf(normalize("Submitted at"));
  if (dateCol !== -1) sheet.getRange(target, dateCol + 1).setNumberFormat("yyyy-mm-dd hh:mm");
  const msgCol = headers.indexOf(normalize("Project details"));
  if (msgCol !== -1) sheet.getRange(target, msgCol + 1).setWrap(true);
}

function sendNotification(data) {
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: String(data.email || ""),
    subject: "New enquiry: " + data.service + " from " + data.name,
    body: [
      "Name: " + data.name,
      "Email: " + data.email,
      "Company: " + (data.company || "Not provided"),
      "Service: " + data.service,
      "Budget (USD): " + data.budget,
      "",
      "Project details:",
      data.message,
      "",
      "Source: " + [data.utm_source, data.utm_medium, data.utm_campaign].filter(String).join(" / "),
      "Referrer: " + (data.referrer || ""),
      "Landing page: " + (data.landing_page || ""),
      "",
      "All enquiries: https://docs.google.com/spreadsheets/d/" + SHEET_ID,
    ].join("\n"),
  });
}

/** Run once from the Apps Script editor to create the tab and headers (and grant permissions). */
function testSetup() {
  getSheet();
}

function normalize(h) {
  return String(h == null ? "" : h).trim().toLowerCase();
}

/** Stops values like "=IMPORTXML(...)" from being treated as spreadsheet formulas. */
function clean(value) {
  const s = value == null ? "" : String(value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
