import { db } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ApplicationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const application = await db.application.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!application) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Application Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            Sorry, no application exists with that ID.
          </p>
          <Link
            href="/applications"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            ← Back to list
          </Link>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(application.createdAt).toLocaleString();

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/applications"
          className="text-blue-600 hover:text-blue-700 underline text-sm"
        >
          ← Back to all applications
        </Link>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            application.status === "APPROVED"
              ? "bg-green-100 text-green-800"
              : application.status === "DENIED"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {application.status}
        </span>
      </div>

      <header>
        <h1 className="text-3xl font-bold text-gray-900">
          Application Details
        </h1>
        <p className="text-gray-500 mt-1">Submitted on {formattedDate}</p>
      </header>

      {/* Applicant Info */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
          Applicant Information
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
          <p>
            <span className="font-medium">Name:</span>{" "}
            {application.user?.name || "—"}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {application.user?.email || "—"}
          </p>
        </div>
      </section>

      {/* Property Info */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
          Property Details
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
          <p>
            <span className="font-medium">Property Name:</span>{" "}
            {application.propertyName}
          </p>
          <p>
            <span className="font-medium">Submitted:</span> {formattedDate}
          </p>
        </div>
      </section>

      {/* Raw Form Data */}
      <section className="bg-gray-50 border border-gray-200 rounded-xl shadow-inner p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Application JSON Data
        </h2>
        <pre className="bg-white border rounded-lg text-sm text-gray-800 p-4 overflow-x-auto">
          {JSON.stringify(application.dataJson, null, 2)}
        </pre>
      </section>
    </main>
  );
}
