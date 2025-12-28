import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Tenth Street Rentals",
  description: "Rental management portal for tenants and admins",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
        <NavBar />

        {/* MAIN PAGE CONTENT */}
        <main className="flex-1">{children}</main>

        {/* FOOTER */}
        <footer className="bg-blue-400 border-t-2 border-yellow-500 py-6">
          <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} 10th Street Rentals · Built by{" "}
              <a
                href="https://github.com/kzim520"
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                Kevin Zimmer
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
