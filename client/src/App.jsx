import { useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [form, setForm] = useState({
    location: "",
    time: "",
    budget: "",
    mood: "",
    dietary: "",
    hunger: "",
    other: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResults(null); // Clear old results

    try {
      const response = await fetch("http://localhost:3001/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log("Yelp AI response:", data);

      setResults(data);
    } catch (err) {
      console.error("Error sending form:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-6">BUCK</h1>
      <p className="mb-8 text-center max-w-md text-gray-600">
        Budget + Muck = BUCK.<br />
        Find affordable and satisfying food for broke students.
      </p>

      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8">
        {/* Left Side: Form + Loading */}
        <div className="w-full md:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow-md w-full space-y-4"
          >
            {/* (All your input fields stay here as-is) */}
            {/* ... */}
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
              <span className="text-gray-700">Time You’re Eating</span>
              <input
                type="datetime-local"
                name="time"
                value={form.time}
                onChange={handleChange}
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

            <label className="block">
              <span className="text-gray-700">Mood</span>
              <input
                type="text"
                name="mood"
                value={form.mood}
                onChange={handleChange}
                placeholder="e.g. chill vibe, study spot, lively"
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Dietary Restrictions</span>
              <input
                type="text"
                name="dietary"
                value={form.dietary}
                onChange={handleChange}
                placeholder="e.g. vegetarian, halal, allergies"
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Hunger Level</span>
              <select
                name="hunger"
                value={form.hunger}
                onChange={handleChange}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select hunger level</option>
                <option value="snack">Snackish</option>
                <option value="hungry">Hungry</option>
                <option value="starving">Starving</option>
              </select>
            </label>

            <label className="block">
              <span className="text-gray-700">Other Info</span>
              <textarea
                name="other"
                value={form.other}
                onChange={handleChange}
                placeholder="Anything else you want to add..."
                rows={3}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              Recommend Me
            </button>
          </form>

          {loading && (
            <div className="mt-4 text-gray-600 text-center">Loading recommendations...</div>
          )}
        </div>

        {/* Right Side: Results */}
        <div className={`w-full md:w-1/2 transition-opacity duration-500 ${results ? 'opacity-100' : 'opacity-0'}`}>
          {results && (
            <div className="w-full">
              <h2 className="text-xl font-semibold mb-4">AI Recommendation Summary</h2>
              <p className="mb-6 text-gray-700">{results.response.text}</p>

              <h2 className="text-lg font-medium mb-2">Top Matches</h2>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {results.entities?.[0]?.businesses?.map((biz) => (
                  <div key={biz.id} className="p-4 border rounded shadow-sm bg-white">
                    {console.log("Image URL for", biz.name, ":", biz.image_url)}
                    <img
                      src={
                        biz.image_url
                          ? biz.image_url.replace("http://", "https://")
                          : "https://via.placeholder.com/400x200?text=No+Image"
                      }
                      alt={biz.name}
                      className="w-full h-48 object-cover rounded mb-2"
                    />

                    <h3 className="text-lg font-semibold">{biz.name}</h3>
                    <p className="text-sm text-gray-600">
                      {biz.location?.address1}, {biz.location?.city}
                    </p>
                    <p className="text-sm text-gray-600">
                      ⭐ {biz.rating} · {biz.review_count} reviews
                    </p>
                    <a
                      href={biz.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline text-sm"
                    >
                      View on Yelp
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}