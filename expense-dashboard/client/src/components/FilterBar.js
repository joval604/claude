import React from "react";
import "./FilterBar.css";

const STATUSES = ["All", "Draft", "Invoiced", "Paid", "Overdue"];

export default function FilterBar({ filter, onChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search by client or description..."
          value={filter.search}
          onChange={(e) => onChange({ ...filter, search: e.target.value })}
        />
      </div>
      <div className="filter-pills">
        {STATUSES.map((s) => (
          <button
            key={s}
            className={`pill pill-${s.toLowerCase()} ${filter.status === s ? "active" : ""}`}
            onClick={() => onChange({ ...filter, status: s })}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
