require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const SPREADSHEET_ID = process.env.GOOGLE_DRIVE_FILE_ID;
const LOCAL_CACHE = path.join(__dirname, "expenses_cache.xlsx");

// ── Google Drive auth ─────────────────────────────────────────────────────────
function getDriveClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "credentials.json"),
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  return google.drive({ version: "v3", auth });
}

// ── Download Excel from Drive ─────────────────────────────────────────────────
async function downloadFromDrive() {
  const drive = getDriveClient();
  const dest = fs.createWriteStream(LOCAL_CACHE);
  const res = await drive.files.get(
    { fileId: SPREADSHEET_ID, alt: "media" },
    { responseType: "stream" }
  );
  return new Promise((resolve, reject) => {
    res.data
      .on("end", resolve)
      .on("error", reject)
      .pipe(dest);
  });
}

// ── Upload Excel to Drive ─────────────────────────────────────────────────────
async function uploadToDrive() {
  const drive = getDriveClient();
  await drive.files.update({
    fileId: SPREADSHEET_ID,
    media: {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      body: fs.createReadStream(LOCAL_CACHE),
    },
  });
}

const COLUMNS = [
  "Client Name",
  "Description",
  "Notes",
  "Invoice Date",
  "Date of Payment",
  "Status",
  "Amount (USD)",
];

// ── Read expenses from local cache ────────────────────────────────────────────
function readExpenses() {
  if (!fs.existsSync(LOCAL_CACHE)) return [];
  const wb = XLSX.readFile(LOCAL_CACHE);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });
  return rows.map((row, i) => ({ id: i + 1, ...row }));
}

// ── Write expenses to local cache ─────────────────────────────────────────────
function writeExpenses(expenses) {
  const data = expenses.map(({ id, ...rest }) => rest);
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data, { header: COLUMNS });
  XLSX.utils.book_append_sheet(wb, ws, "Expenses");
  XLSX.writeFile(wb, LOCAL_CACHE);
}

// ── Routes ────────────────────────────────────────────────────────────────────

// Sync from Drive then return all expenses
app.get("/api/expenses", async (req, res) => {
  try {
    if (SPREADSHEET_ID) await downloadFromDrive();
    res.json(readExpenses());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Add new expense
app.post("/api/expenses", async (req, res) => {
  try {
    if (SPREADSHEET_ID) await downloadFromDrive();
    const expenses = readExpenses();
    const newId = expenses.length ? Math.max(...expenses.map((e) => e.id)) + 1 : 1;
    const expense = { id: newId, ...req.body };
    expenses.push(expense);
    writeExpenses(expenses);
    if (SPREADSHEET_ID) await uploadToDrive();
    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Update expense
app.put("/api/expenses/:id", async (req, res) => {
  try {
    if (SPREADSHEET_ID) await downloadFromDrive();
    const expenses = readExpenses();
    const id = parseInt(req.params.id);
    const idx = expenses.findIndex((e) => e.id === id);
    if (idx === -1) return res.status(404).json({ error: "Not found" });
    expenses[idx] = { id, ...req.body };
    writeExpenses(expenses);
    if (SPREADSHEET_ID) await uploadToDrive();
    res.json(expenses[idx]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete expense
app.delete("/api/expenses/:id", async (req, res) => {
  try {
    if (SPREADSHEET_ID) await downloadFromDrive();
    let expenses = readExpenses();
    const id = parseInt(req.params.id);
    expenses = expenses.filter((e) => e.id !== id);
    writeExpenses(expenses);
    if (SPREADSHEET_ID) await uploadToDrive();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`✨ Server running on port ${PORT}`));
