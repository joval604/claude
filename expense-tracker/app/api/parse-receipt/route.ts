import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

const EXPENSE_CATEGORIES = [
  "Materials - Blanks",
  "Materials - Pins",
  "Printing Supplies",
  "Packaging",
  "Shipping",
  "Equipment",
  "Software & Tools",
  "Marketing",
  "Overhead",
];

const INCOME_CATEGORIES = ["Sales - Apparel", "Sales - Pins", "Custom Orders"];

const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("receipt") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  const mediaType = (file.type || "image/jpeg") as
    | "image/jpeg"
    | "image/png"
    | "image/gif"
    | "image/webp";

  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 1024,
    thinking: { type: "adaptive" },
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: mediaType, data: base64 },
          },
          {
            type: "text",
            text: `Extract the following fields from this receipt and return ONLY valid JSON with no additional text:
{
  "vendor": "store or vendor name",
  "amount": 0.00,
  "date": "YYYY-MM-DD",
  "description": "brief description of what was purchased",
  "category": "one of the categories listed below",
  "type": "expense or income"
}

Available categories: ${ALL_CATEGORIES.join(", ")}

Rules:
- amount must be a number (total paid, not subtotal)
- date must be YYYY-MM-DD format; if year is unclear use ${new Date().getFullYear()}
- pick the most appropriate category from the list
- if it looks like a sale/revenue, use type "income"; otherwise "expense"
- description should be concise (under 60 chars)`,
          },
        ],
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    return NextResponse.json({ error: "No response from Claude" }, { status: 500 });
  }

  try {
    const json = JSON.parse(textBlock.text.trim());
    return NextResponse.json(json);
  } catch {
    // Try to extract JSON from the response if it has extra text
    const match = textBlock.text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return NextResponse.json(JSON.parse(match[0]));
      } catch {
        // fall through
      }
    }
    return NextResponse.json(
      { error: "Failed to parse Claude response", raw: textBlock.text },
      { status: 500 }
    );
  }
}
