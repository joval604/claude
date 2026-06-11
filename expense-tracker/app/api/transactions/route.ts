import { NextRequest, NextResponse } from "next/server";
import { getSheets, SHEET_ID, SHEET_TAB } from "../../lib/sheets";
import { transactions as mockTransactions } from "../../data/mock";
import { Transaction } from "../../data/mock";

const HEADERS = ["id", "date", "description", "amount", "type", "category", "productLine"];

function rowToTransaction(row: string[]): Transaction {
  return {
    id: row[0],
    date: row[1],
    description: row[2],
    amount: parseFloat(row[3]),
    type: row[4] as Transaction["type"],
    category: row[5] as Transaction["category"],
    productLine: row[6] as Transaction["productLine"],
  };
}

export async function GET() {
  if (!process.env.GOOGLE_SHEET_ID) {
    return NextResponse.json(mockTransactions);
  }

  const sheets = await getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_TAB}!A2:G`,
  });

  const rows = res.data.values ?? [];
  const transactions = rows
    .filter((r) => r[0])
    .map(rowToTransaction)
    .sort((a, b) => b.date.localeCompare(a.date));

  return NextResponse.json(transactions);
}

export async function POST(req: NextRequest) {
  const t: Transaction = await req.json();

  if (!process.env.GOOGLE_SHEET_ID) {
    return NextResponse.json(t, { status: 201 });
  }

  const sheets = await getSheets();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_TAB}!A:G`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[t.id, t.date, t.description, t.amount, t.type, t.category, t.productLine]],
    },
  });

  // Write headers if sheet is empty
  const check = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_TAB}!A1:G1`,
  });
  if (!check.data.values?.[0]?.[0]) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_TAB}!A1:G1`,
      valueInputOption: "RAW",
      requestBody: { values: [HEADERS] },
    });
  }

  return NextResponse.json(t, { status: 201 });
}
