import React from "react";
import "./StatsBar.css";

const fmt = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function StatsBar({ expenses }) {
  const total = expenses.reduce((s, e) => s + parseFloat(e["Amount (USD)"] || 0), 0);
  const paid = expenses.filter((e) => e["Status"] === "Paid");
  const paidTotal = paid.reduce((s, e) => s + parseFloat(e["Amount (USD)"] || 0), 0);
  const overdue = expenses.filter((e) => e["Status"] === "Overdue").length;
  const unpaid = expenses.filter((e) => e["Status"] === "Invoiced").length;

  const stats = [
    { icon: "💰", label: "Total", value: fmt(total), color: "pink" },
    { icon: "✅", label: "Paid", value: fmt(paidTotal), color: "mint" },
    { icon: "📋", label: "Invoiced", value: unpaid, color: "sky" },
    { icon: "⚠️", label: "Overdue", value: overdue, color: "peach" },
    { icon: "🗂️", label: "All Entries", value: expenses.length, color: "lavender" },
  ];

  return (
    <div className="stats-bar">
      {stats.map((s) => (
        <div key={s.label} className={`stat-card stat-${s.color}`}>
          <span className="stat-icon">{s.icon}</span>
          <div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
