import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    location: "",
    budget: "",
    mood: "",
    dietary: "",
    hunger: "",
    other: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", form);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-5xl font-bold mb-6">BUCK</h1>
      <p className="mb-8 text-center max-w-md text-gray-600">
        Budget + Muck = BUCK.<br />
        Find affordable and satisfying food for broke students.
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <label className="block">
          <span className="text-gray-700">Location</span>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="e.g. Toronto"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Budget (in $)</span>
          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            required
            min="1"
            placeholder="e.g. 10"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
      </form>
    </div>
  );
}