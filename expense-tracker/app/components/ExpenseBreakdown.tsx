"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Transaction } from "../data/mock";

const COLORS = ["#6366f1","#10b981","#f59e0b","#f87171","#3b82f6","#a78bfa","#34d399","#fb923c","#94a3b8"];

interface Props { transactions: Transaction[]; }

export default function ExpenseBreakdown({ transactions }: Props) {
  const expenseMap: Record<string, number> = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
    });

  const data = Object.entries(expenseMap)
    .map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={2}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => (typeof v === "number" ? `$${v.toFixed(2)}` : v)} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
