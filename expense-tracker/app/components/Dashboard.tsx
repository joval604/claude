"use client";

import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import PLChart from "./PLChart";
import ExpenseBreakdown from "./ExpenseBreakdown";
import TransactionList from "./TransactionList";
import AddTransactionForm from "./AddTransactionForm";
import EditTransactionForm from "./EditTransactionForm";
import BudgetTracker from "./BudgetTracker";
import { Transaction } from "../data/mock";

function computeStats(txs: Transaction[]) {
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthTx = txs.filter((t) => t.date.startsWith(thisMonth));

  const income = monthTx.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = monthTx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const net = income - expenses;
  const pinIncome = monthTx.filter((t) => t.type === "income" && t.productLine === "pins").reduce((s, t) => s + t.amount, 0);
  const apparelIncome = monthTx.filter((t) => t.type === "income" && t.productLine === "apparel").reduce((s, t) => s + t.amount, 0);

  return { income, expenses, net, pinIncome, apparelIncome };
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  useEffect(() => {
    fetch("/api/transactions")
      .then((r) => r.json())
      .then((data) => setTransactions(Array.isArray(data) ? data : []))
      .catch(() => setTransactions([]))
      .finally(() => setLoading(false));
  }, []);

  const { income, expenses, net, pinIncome, apparelIncome } = computeStats(transactions);

  async function handleAdd(t: Transaction) {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    });
    const saved = await res.json();
    setTransactions((prev) => [saved, ...prev]);
  }

  async function handleEdit(t: Transaction) {
    const res = await fetch(`/api/transactions/${t.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    });
    const saved = await res.json();
    setTransactions((prev) => prev.map((x) => (x.id === t.id ? saved : x)));
    setEditing(null);
  }

  async function handleDelete(id: string) {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
            <p className="text-sm text-gray-500 mt-1">Pins &amp; Apparel</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            + Add Transaction
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard label="Monthly Income" value={`$${income.toFixed(2)}`} positive />
              <StatCard label="Monthly Expenses" value={`$${expenses.toFixed(2)}`} negative />
              <StatCard
                label="Net Profit"
                value={`$${net.toFixed(2)}`}
                positive={net > 0}
                negative={net < 0}
                sub={income > 0 ? `${((net / income) * 100).toFixed(0)}% margin` : undefined}
              />
              <StatCard
                label="By Product"
                value={`$${pinIncome.toFixed(0)} / $${apparelIncome.toFixed(0)}`}
                sub="Pins / Apparel"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <PLChart transactions={transactions} />
              <ExpenseBreakdown transactions={transactions} />
            </div>

            <div className="mb-6">
              <BudgetTracker transactions={transactions} />
            </div>

            <TransactionList
              transactions={transactions}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>

      {showForm && (
        <AddTransactionForm onAdd={handleAdd} onClose={() => setShowForm(false)} />
      )}
      {editing && (
        <EditTransactionForm
          transaction={editing}
          onSave={handleEdit}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
