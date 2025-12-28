import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">
      {/* Background Image */}
      <Image
        src="/background5.jpg"
        alt="City skyline"
        fill
        priority
        className="object-cover -z-10"
      />

      {/* Foreground content */}
      <h1 className="text-3xl font-semibold text-yellow-400 mb-2 drop-shadow-lg">
        Welcome to Tenth Street Rentals
      </h1>
      <p className="text-zinc-100 max-w-md mb-6 drop-shadow-md">
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
          className="rounded-md border border-white text-white px-5 py-2 font-medium hover:bg-white/10 transition"
        >
          Admin – View Applications
        </Link>
      </div>
    </main>
  );
}
