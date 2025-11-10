import { db } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic"; // always fetch fresh data

export default async function ApplicationsPage() {
  // Fetch applications and related users from the DB
  const applications = await db.application.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  // Render them
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applications yet.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm text-gray-700">
                <th className="p-3 border-b">Applicant</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Property</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 text-sm">
                  <td className="p-3 border-b">
                    <Link
                      href={`/applications/${app.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {app.user?.name || "—"}
                    </Link>
                  </td>
                  <td className="p-3 border-b">{app.user?.email}</td>
                  <td className="p-3 border-b">{app.propertyName}</td>
                  <td className="p-3 border-b">{app.status}</td>
                  <td className="p-3 border-b">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
