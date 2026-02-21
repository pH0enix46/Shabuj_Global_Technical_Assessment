"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error natively without interrupting the UX
    console.error("Application Render Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="w-24 h-24 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-full flex items-center justify-center mb-8 shadow-xs border border-rose-500/10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
        Something went wrong.
      </h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-10 text-lg leading-relaxed">
        We encountered an unexpected error while loading this page. Our team has
        been notified.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm">
        <button
          onClick={() => reset()}
          className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold transition-all shadow-xs hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex-1"
        >
          Try Again
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-8 py-3.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-full font-bold transition-all shadow-xs hover:-translate-y-0.5 cursor-pointer flex-1"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
