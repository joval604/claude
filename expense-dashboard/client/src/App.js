import React, { useState, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseForm from "./components/ExpenseForm";
import StatsBar from "./components/StatsBar";
import FilterBar from "./components/FilterBar";
import "./App.css";

const API = "/api/expenses";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filter, setFilter] = useState({ status: "All", search: "" });

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      const data = await res.json();
      setExpenses(data);
    } catch {
      toast.error("Couldn't load expenses 😢");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchExpenses(); }, [fetchExpenses]);

  const handleSave = async (formData) => {
    try {
      if (editingExpense) {
        const res = await fetch(`${API}/${editingExpense.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const updated = await res.json();
        setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
        toast.success("Updated! ✨");
      } else {
        const res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const created = await res.json();
        setExpenses((prev) => [...prev, created]);
        toast.success("Added! 🌸");
      }
      setShowForm(false);
      setEditingExpense(null);
    } catch {
      toast.error("Oops, something went wrong 😿");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      toast.success("Deleted! 🗑️");
    } catch {
      toast.error("Couldn't delete 😿");
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const filteredExpenses = expenses.filter((e) => {
    const matchStatus = filter.status === "All" || e["Status"] === filter.status;
    const q = filter.search.toLowerCase();
    const matchSearch =
      !q ||
      (e["Client Name"] || "").toLowerCase().includes(q) ||
      (e["Description"] || "").toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="app">
      <Toaster
        toastOptions={{
          style: {
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            borderRadius: "14px",
            background: "#fff0f6",
            color: "#5a4a6a",
            border: "2px solid #ffb7d5",
          },
        }}
      />

      {/* Header */}
      <header className="header">
        <div className="header-left">
          <span className="header-icon">🌸</span>
          <div>
            <h1 className="header-title">Expense Tracker</h1>
            <p className="header-sub">your cute money manager ✨</p>
          </div>
        </div>
        <div className="header-right">
          <button className="btn-refresh" onClick={fetchExpenses} title="Sync with Excel">
            🔄 Sync
          </button>
          <button
            className="btn-add"
            onClick={() => { setEditingExpense(null); setShowForm(true); }}
          >
            + Add Expense
          </button>
        </div>
      </header>

      {/* Stats */}
      <StatsBar expenses={expenses} />

      {/* Filters */}
      <FilterBar filter={filter} onChange={setFilter} />

      {/* Table */}
      <main className="main">
        {loading ? (
          <div className="loading">
            <span className="loading-spin">🌸</span>
            <p>Loading your expenses...</p>
          </div>
        ) : (
          <ExpenseTable
            expenses={filteredExpenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      {/* Form modal */}
      {showForm && (
        <ExpenseForm
          initial={editingExpense}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingExpense(null); }}
        />
      )}
    </div>
  );
}
