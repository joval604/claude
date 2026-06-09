import React, { useState } from "react";
import "./ExpenseTable.css";

const STATUS_META = {
  Draft:    { emoji: "📝", cls: "draft" },
  Invoiced: { emoji: "📨", cls: "invoiced" },
  Paid:     { emoji: "✅", cls: "paid" },
  Overdue:  { emoji: "⚠️", cls: "overdue" },
};

const fmt = (n) => {
  const num = parseFloat(n);
  return isNaN(num) ? "—" : num.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  const [confirmId, setConfirmId] = useState(null);

  if (!expenses.length) {
    return (
      <div className="empty">
        <span>🌸</span>
        <p>No expenses yet!</p>
        <p className="empty-sub">Add one above to get started ✨</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Description</th>
            <th>Notes</th>
            <th>Invoice Date</th>
            <th>Payment Date</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => {
            const meta = STATUS_META[e["Status"]] || { emoji: "•", cls: "draft" };
            return (
              <tr key={e.id} className="expense-row">
                <td className="td-client">
                  <span className="avatar">{(e["Client Name"] || "?")[0].toUpperCase()}</span>
                  {e["Client Name"] || "—"}
                </td>
                <td className="td-desc">{e["Description"] || "—"}</td>
                <td className="td-notes">{e["Notes"] || "—"}</td>
                <td>{e["Invoice Date"] || "—"}</td>
                <td>{e["Date of Payment"] || "—"}</td>
                <td>
                  <span className={`badge badge-${meta.cls}`}>
                    {meta.emoji} {e["Status"]}
                  </span>
                </td>
                <td className="td-amount">{fmt(e["Amount (USD)"])}</td>
                <td>
                  <div className="action-btns">
                    <button className="btn-edit" onClick={() => onEdit(e)} title="Edit">✏️</button>
                    {confirmId === e.id ? (
                      <>
                        <button className="btn-confirm" onClick={() => { onDelete(e.id); setConfirmId(null); }}>✓</button>
                        <button className="btn-cancel" onClick={() => setConfirmId(null)}>✕</button>
                      </>
                    ) : (
                      <button className="btn-delete" onClick={() => setConfirmId(e.id)} title="Delete">🗑️</button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
