"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "../data/mock";

interface Props {
  transactions: Transaction[];
}

function buildMonthlyData(txs: Transaction[]) {
  const map: Record<string, { month: string; income: number; expenses: number }> = {};

  txs.forEach((t) => {
    const key = t.date.slice(0, 7); // "YYYY-MM"
    if (!map[key]) {
      const [year, month] = key.split("-");
      const label = new Date(Number(year), Number(month) - 1).toLocaleString("default", { month: "short" });
      map[key] = { month: label, income: 0, expenses: 0 };
    }
    if (t.type === "income") map[key].income += t.amount;
    else map[key].expenses += t.amount;
  });

  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([, v]) => ({
      ...v,
      income: parseFloat(v.income.toFixed(2)),
      expenses: parseFloat(v.expenses.toFixed(2)),
    }));
}

export default function PLChart({ transactions }: Props) {
  const data = buildMonthlyData(transactions);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Monthly P&L</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => (typeof v === "number" ? `$${v.toFixed(2)}` : v)} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="income" name="Income" fill="#10b981" radius={[3, 3, 0, 0]} />
          <Bar dataKey="expenses" name="Expenses" fill="#f87171" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
