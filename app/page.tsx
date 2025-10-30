import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black text-center px-6">
      <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-2">
        Welcome to 10th Street Rentals
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 max-w-md mb-6">
        View available properties, book a tour, or apply for a rental.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/apply"
          className="rounded-md bg-blue-600 text-white px-5 py-2 font-medium hover:bg-blue-700 transition"
        >
          Apply for a Rental
        </Link>

        <Link
          href="/applications"
          className="rounded-md border border-blue-600 text-blue-600 px-5 py-2 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
        >
          Admin – View Applications
        </Link>
      </div>
    </main>
  );
}
