"use client";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  positive?: boolean;
  negative?: boolean;
}

export default function StatCard({ label, value, sub, positive, negative }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p
        className={`text-2xl font-bold ${
          positive ? "text-emerald-600" : negative ? "text-red-500" : "text-gray-900"
        }`}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}
