"use client";

import { useState } from "react";
import { Transaction } from "../data/mock";

function exportCSV(rows: Transaction[]) {
  const header = ["id", "date", "description", "amount", "type", "category", "productLine"];
  const lines = [
    header.join(","),
    ...rows.map((t) =>
      [t.id, t.date, `"${t.description.replace(/"/g, '""')}"`, t.amount, t.type, `"${t.category}"`, t.productLine].join(",")
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const productLineColors: Record<string, string> = {
  pins: "bg-indigo-100 text-indigo-700",
  apparel: "bg-emerald-100 text-emerald-700",
  general: "bg-gray-100 text-gray-600",
};

interface Props {
  transactions: Transaction[];
  onDelete?: (id: string) => void;
}

export default function TransactionList({ transactions, onDelete }: Props) {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  const filtered = transactions
    .filter((t) => filter === "all" || t.type === filter)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-700">Recent Transactions</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportCSV(filtered)}
            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Export CSV
          </button>
        <div className="flex gap-1">
          {(["all", "income", "expense"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 text-xs font-medium text-gray-400">Date</th>
              <th className="text-left py-2 text-xs font-medium text-gray-400">Description</th>
              <th className="text-left py-2 text-xs font-medium text-gray-400">Category</th>
              <th className="text-left py-2 text-xs font-medium text-gray-400">Line</th>
              <th className="text-right py-2 text-xs font-medium text-gray-400">Amount</th>
              {onDelete && <th className="py-2" />}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t: Transaction) => (
              <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                <td className="py-2.5 text-gray-500 whitespace-nowrap">{t.date}</td>
                <td className="py-2.5 text-gray-800">{t.description}</td>
                <td className="py-2.5 text-gray-500 text-xs">{t.category}</td>
                <td className="py-2.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${productLineColors[t.productLine]}`}>
                    {t.productLine}
                  </span>
                </td>
                <td className={`py-2.5 text-right font-medium tabular-nums ${
                  t.type === "income" ? "text-emerald-600" : "text-red-500"
                }`}>
                  {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                </td>
                {onDelete && (
                  <td className="py-2.5 pl-2">
                    <button
                      onClick={() => onDelete(t.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all text-base leading-none"
                      aria-label="Delete"
                    >
                      ×
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
