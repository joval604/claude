import React, { useState } from "react";
import "./ExpenseForm.css";

const STATUSES = ["Draft", "Invoiced", "Paid", "Overdue"];

const empty = {
  "Client Name": "",
  Description: "",
  Notes: "",
  "Invoice Date": "",
  "Date of Payment": "",
  Status: "Draft",
  "Amount (USD)": "",
};

function formatDate(val) {
  const digits = val.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export default function ExpenseForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial ? { ...initial } : { ...empty });
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const dateInput = (key) => (
    <input
      type="text"
      placeholder="mm/dd/yyyy"
      maxLength={10}
      value={form[key]}
      onChange={(e) => set(key, formatDate(e.target.value))}
      className={errors[key] ? "err" : ""}
    />
  );

  const validate = () => {
    const e = {};
    if (!form["Client Name"].trim()) e["Client Name"] = "Required";
    if (!form["Amount (USD)"]) e["Amount (USD)"] = "Required";
    const dateRe = /^\d{2}\/\d{2}\/\d{4}$/;
    if (form["Invoice Date"] && !dateRe.test(form["Invoice Date"])) e["Invoice Date"] = "Use mm/dd/yyyy";
    if (form["Date of Payment"] && !dateRe.test(form["Date of Payment"])) e["Date of Payment"] = "Use mm/dd/yyyy";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const { id, ...data } = form;
    onSave(data);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-icon">🌸</span>
          <h2>{initial ? "Edit Expense" : "New Expense"}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Client Name <span className="req">*</span></label>
              <input
                type="text"
                placeholder="e.g. Acme Corp"
                value={form["Client Name"]}
                onChange={(e) => set("Client Name", e.target.value)}
                className={errors["Client Name"] ? "err" : ""}
              />
              {errors["Client Name"] && <span className="err-msg">🌷 {errors["Client Name"]}</span>}
            </div>
            <div className="form-group">
              <label>Amount (USD) <span className="req">*</span></label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={form["Amount (USD)"]}
                onChange={(e) => set("Amount (USD)", e.target.value)}
                className={errors["Amount (USD)"] ? "err" : ""}
              />
              {errors["Amount (USD)"] && <span className="err-msg">🌷 {errors["Amount (USD)"]}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              placeholder="What was this for?"
              value={form["Description"]}
              onChange={(e) => set("Description", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              placeholder="Any extra details..."
              value={form["Notes"]}
              onChange={(e) => set("Notes", e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Invoice Date</label>
              {dateInput("Invoice Date")}
              {errors["Invoice Date"] && <span className="err-msg">🌷 {errors["Invoice Date"]}</span>}
            </div>
            <div className="form-group">
              <label>Date of Payment</label>
              {dateInput("Date of Payment")}
              {errors["Date of Payment"] && <span className="err-msg">🌷 {errors["Date of Payment"]}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>
            <div className="status-pills">
              {STATUSES.map((s) => (
                <button
                  type="button"
                  key={s}
                  className={`status-pill status-${s.toLowerCase()} ${form["Status"] === s ? "active" : ""}`}
                  onClick={() => set("Status", s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel-form" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">
              {initial ? "💾 Save Changes" : "✨ Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
