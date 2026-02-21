import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="w-24 h-24 bg-sky-50 dark:bg-sky-900/20 text-primary rounded-full flex items-center justify-center mb-8 shadow-xs border border-primary/10">
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
            d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
        404
      </h1>
      <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-10 text-lg leading-relaxed">
        We couldn&apos;t find the page you&apos;re looking for. It might have
        been moved or simply doesn&apos;t exist anymore
      </p>
      <Link
        href="/"
        className="px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-full font-bold transition-all shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
