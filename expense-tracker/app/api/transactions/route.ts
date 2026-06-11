import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";
import { transactions as mockTransactions } from "../../data/mock";

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json(mockTransactions);
  }

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json(body, { status: 201 });
  }

  const { data, error } = await supabase
    .from("transactions")
    .insert([body])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
