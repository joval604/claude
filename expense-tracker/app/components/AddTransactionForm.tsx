"use client";

import { useState } from "react";
import { Transaction, Category } from "../data/mock";

const EXPENSE_CATEGORIES: Category[] = [
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

const INCOME_CATEGORIES = ["Sales - Apparel", "Sales - Pins", "Custom Orders"] as const;

interface Props {
  onAdd: (t: Transaction) => void;
  onClose: () => void;
}

export default function AddTransactionForm({ onAdd, onClose }: Props) {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0]);
  const [productLine, setProductLine] = useState<"pins" | "apparel" | "general">("general");

  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  function handleTypeChange(t: "expense" | "income") {
    setType(t);
    setCategory(t === "expense" ? EXPENSE_CATEGORIES[0] : INCOME_CATEGORIES[0]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim() || !amount || isNaN(parseFloat(amount))) return;
    onAdd({
      id: crypto.randomUUID(),
      date,
      description: description.trim(),
      amount: parseFloat(parseFloat(amount).toFixed(2)),
      type,
      category: category as Transaction["category"],
      productLine,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900">Add Transaction</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            {(["expense", "income"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTypeChange(t)}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  type === t
                    ? t === "expense"
                      ? "bg-red-500 text-white"
                      : "bg-emerald-500 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Amount ($)</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
            <input
              type="text"
              placeholder="e.g. Blank t-shirts (24 units)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Product Line</label>
              <select
                value={productLine}
                onChange={(e) => setProductLine(e.target.value as "pins" | "apparel" | "general")}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <option value="pins">Pins</option>
                <option value="apparel">Apparel</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
