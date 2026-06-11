import { NextRequest, NextResponse } from "next/server";
import { getSheets, SHEET_ID, SHEET_TAB } from "../../../lib/sheets";
import { Transaction } from "../../../data/mock";

async function findRow(sheets: Awaited<ReturnType<typeof getSheets>>, id: string): Promise<number | null> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_TAB}!A:A`,
  });
  const rows = res.data.values ?? [];
  const idx = rows.findIndex((r) => r[0] === id);
  return idx === -1 ? null : idx + 1; // 1-based row number
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const t: Transaction = await req.json();

  if (!process.env.GOOGLE_SHEET_ID) {
    return NextResponse.json(t);
  }

  const sheets = await getSheets();
  const row = await findRow(sheets, id);
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_TAB}!A${row}:G${row}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[t.id, t.date, t.description, t.amount, t.type, t.category, t.productLine]],
    },
  });

  return NextResponse.json(t);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!process.env.GOOGLE_SHEET_ID) {
    return NextResponse.json({ id });
  }

  const sheets = await getSheets();
  const row = await findRow(sheets, id);
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Get spreadsheet ID for the sheet tab
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const sheetMeta = meta.data.sheets?.find((s) => s.properties?.title === SHEET_TAB);
  const sheetId = sheetMeta?.properties?.sheetId ?? 0;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId,
              dimension: "ROWS",
              startIndex: row - 1,
              endIndex: row,
            },
          },
        },
      ],
    },
  });

  return NextResponse.json({ id });
}
