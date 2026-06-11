"use client";

import { useRef, useState } from "react";

interface ParsedReceipt {
  vendor: string;
  amount: number;
  date: string;
  description: string;
  category: string;
  type: "expense" | "income";
}

interface Props {
  onParsed: (data: ParsedReceipt) => void;
}

export default function ReceiptUploader({ onParsed }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setLoading(true);
    try {
      const form = new FormData();
      form.append("receipt", file);
      const res = await fetch("/api/parse-receipt", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to parse receipt");
      onParsed(data as ParsedReceipt);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="mb-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => !loading && inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl px-4 py-5 text-center transition-colors cursor-pointer select-none ${
          loading
            ? "border-indigo-300 bg-indigo-50 cursor-default"
            : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
        }`}
      >
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-indigo-600 font-medium">Parsing receipt…</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl">🧾</span>
            <p className="text-xs font-medium text-gray-600">
              Upload receipt to auto-fill
            </p>
            <p className="text-xs text-gray-400">Click or drag & drop image</p>
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
