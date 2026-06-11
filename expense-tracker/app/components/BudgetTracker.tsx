"use client";

import { useState } from "react";
import { Transaction } from "../data/mock";

const DEFAULT_BUDGETS: Record<string, number> = {
  "Materials - Blanks": 400,
  "Materials - Pins": 200,
  "Printing Supplies": 150,
  "Packaging": 80,
  "Shipping": 100,
  "Equipment": 200,
  "Software & Tools": 100,
  "Marketing": 150,
  "Overhead": 100,
};

interface Props {
  transactions: Transaction[];
}

export default function BudgetTracker({ transactions }: Props) {
  const [budgets, setBudgets] = useState<Record<string, number>>(DEFAULT_BUDGETS);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthExpenses = transactions.filter(
    (t) => t.type === "expense" && t.date.startsWith(thisMonth)
  );

  const spent: Record<string, number> = {};
  monthExpenses.forEach((t) => {
    spent[t.category] = (spent[t.category] || 0) + t.amount;
  });

  function startEdit(cat: string) {
    setEditing(cat);
    setDraft(String(budgets[cat] ?? ""));
  }

  function commitEdit(cat: string) {
    const val = parseFloat(draft);
    if (!isNaN(val) && val > 0) setBudgets((b) => ({ ...b, [cat]: val }));
    setEditing(null);
  }

  const rows = Object.entries(budgets).map(([cat, limit]) => {
    const used = spent[cat] || 0;
    const pct = Math.min((used / limit) * 100, 100);
    const over = used > limit;
    return { cat, limit, used, pct, over };
  });

  const totalBudget = rows.reduce((s, r) => s + r.limit, 0);
  const totalSpent = rows.reduce((s, r) => s + r.used, 0);
  const totalOver = totalSpent > totalBudget;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-700">Monthly Budget</h2>
        <div className="text-xs text-gray-500">
          <span className={totalOver ? "text-red-500 font-medium" : "text-gray-700 font-medium"}>
            ${totalSpent.toFixed(0)}
          </span>
          {" / "}${totalBudget.toFixed(0)}
        </div>
      </div>

      <div className="space-y-3">
        {rows.map(({ cat, limit, used, pct, over }) => (
          <div key={cat}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600 truncate max-w-[140px]">{cat}</span>
              <div className="flex items-center gap-1.5 text-xs">
                <span className={over ? "text-red-500 font-medium" : "text-gray-500"}>
                  ${used.toFixed(0)}
                </span>
                <span className="text-gray-300">/</span>
                {editing === cat ? (
                  <input
                    autoFocus
                    type="number"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onBlur={() => commitEdit(cat)}
                    onKeyDown={(e) => e.key === "Enter" && commitEdit(cat)}
                    className="w-16 text-right border border-indigo-300 rounded px-1 py-0 text-xs focus:outline-none"
                  />
                ) : (
                  <button
                    onClick={() => startEdit(cat)}
                    className="text-gray-400 hover:text-indigo-500 transition-colors"
                    title="Click to edit budget"
                  >
                    ${limit}
                  </button>
                )}
              </div>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  over ? "bg-red-400" : pct > 80 ? "bg-amber-400" : "bg-emerald-400"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-gray-400">Click a budget amount to edit it.</p>
    </div>
  );
}
