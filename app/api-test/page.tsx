"use client";

import { useState, useEffect } from "react";
import { University } from "../_lib/types";

export default function ApiTestPage() {
  const [data, setData] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFromApi() {
      try {
        setLoading(true);
        // Calling our newly created API Route
        const response = await fetch("/api/universities?country=UK");
        const json = await response.json();

        if (json.success) {
          setData(json.data);
        } else {
          setError(json.error || "Failed to fetch");
        }
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchFromApi();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">REST API Live Test</h1>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        This page fetches data from{" "}
        <code className="bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">
          /api/universities?country=UK
        </code>{" "}
        using the <strong>Client-side Fetch API</strong>.
      </p>

      {loading && (
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span>Fetching from Backend API...</span>
        </div>
      )}

      {error && (
        <div className="text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
          Error: {error}
        </div>
      )}

      <div className="grid gap-4 mt-8">
        {data.map((uni) => (
          <div
            key={uni.id}
            className="p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm"
          >
            <h3 className="font-bold text-lg">{uni.name}</h3>
            <p className="text-sm text-gray-500">
              {uni.location} — {uni.country}
            </p>
          </div>
        ))}
      </div>

      {!loading && data.length === 0 && !error && (
        <p>No universities found via API.</p>
      )}
    </div>
  );
}
