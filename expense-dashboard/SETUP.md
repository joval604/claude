# ✨ Expense Dashboard Setup

## Prerequisites
- Node.js 18+
- A Google Drive `.xlsx` file for your expenses

## 1. Google Drive API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project → Enable **Google Drive API**
3. Create a **Service Account** → Download `credentials.json`
4. Place `credentials.json` in the `server/` folder
5. Share your Excel file in Google Drive with the service account email (give it **Editor** access)
6. Copy the file ID from the Google Drive URL:
   `https://drive.google.com/file/d/FILE_ID_HERE/view`

## 2. Configure the Server

```bash
cd server
cp .env.example .env
# Edit .env and paste your Google Drive file ID
```

## 3. Install & Run

```bash
# From the expense-dashboard root:
npm run install:all
npm run dev
```

Dashboard opens at **http://localhost:3000** · API runs at **http://localhost:4000**

## Two-Way Sync

- **Dashboard → Excel**: Every add/edit/delete automatically updates the Excel file in Drive
- **Excel → Dashboard**: Click the **🔄 Sync** button to pull the latest from Drive

## Excel Column Order

The Excel file must use these exact headers (row 1):

| Client Name | Description | Notes | Invoice Date | Date of Payment | Status | Amount (USD) |
|---|---|---|---|---|---|---|

Dates must be in `mm/dd/yyyy` format. Status must be one of: `Draft`, `Invoiced`, `Paid`, `Overdue`.
