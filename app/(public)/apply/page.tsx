"use client";
import { useState } from "react";

export default function ApplyPage() {
  const [form, setForm] = useState({ name: "", email: "", propertyName: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) setStatus(`✅ Submitted! ID: ${data.applicationId}`);
    else setStatus(`❌ ${data.error || "Something went wrong"}`);
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Rental Application</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="border rounded p-2"
          placeholder="Your Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="border rounded p-2"
          placeholder="Your Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="border rounded p-2"
          placeholder="Property Name"
          name="propertyName"
          value={form.propertyName}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}
    </main>
  );
}
