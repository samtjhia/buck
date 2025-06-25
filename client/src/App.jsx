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
      <p className="mb-2 text-center max-w-md text-gray-600">
        <strong>Budget + Muck = BUCK.</strong><br />
        Find affordable, AI-powered food recs for people on a budget.
      </p>

      <div className="relative group mb-8">
        <span className="text-sm text-indigo-600 underline cursor-pointer">
          What makes BUCK different?
        </span>
        <div className="absolute z-10 hidden group-hover:block bg-white border border-gray-300 rounded p-4 text-sm text-gray-800 shadow-xl w-80 mt-2 left-1/2 -translate-x-1/2">
          BUCK is powered by AI! It actually reads what you write and makes sense of your vibe.
          <br /><br />
          Unlike regular search apps, BUCK figures out what you need based on more than just price or ratings. Whether you're:
          <ul className="list-disc list-inside mt-2">
            <li>Racing between classes and need something fast</li>
            <li>Looking for a place where your whole group can sit</li>
            <li>Trying to avoid allergens or stick to halal/vegan food</li>
            <li>Or just craving a chill, cozy vibe for studying</li>
          </ul>
          ...you can just <strong>write that stuff down</strong>, and BUCK will handle it.
          <br /><br />
          In the <strong>“Other Info”</strong> box, you can mention things like:
          <ul className="list-disc list-inside mt-2">
            <li>“There are 8 of us, we need lots of seating”</li>
            <li>“Looking for a quick bite before my 2PM class”</li>
            <li>“Need lactose-free bubble tea”</li>
            <li>“Asian food only. Something soupy.”</li>
            <li>“Need food that fills me up for cheap”</li>
          </ul>
          <strong>The more specific or real you are, the better BUCK gets.</strong>
        </div>
      </div>

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
              <span className="text-gray-700">Location (required)</span>
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
              <span className="text-gray-700">Budget (in $) (required)</span>
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
              <div className="mb-6 text-gray-700 space-y-2">
                {results.response.text
                  .split("\n") // Split at newlines
                  .filter((line) => line.trim() !== "")
                  .map((line, i) => {
                    // Bold **text** conversion
                    const formattedLine = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
                    return (
                      <p
                        key={i}
                        className="leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formattedLine }}
                      />
                    );
                  })}
              </div>

              <h2 className="text-lg font-medium mb-2">Top Matches</h2>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {results.businesses?.map((biz) => (
                  <div key={biz.id} className="flex items-start gap-4 p-4 border rounded shadow-sm bg-white">
                    <img
                      src={biz.image_url || "https://via.placeholder.com/150"}
                      alt={biz.name}
                      className="w-32 h-32 object-cover rounded"
                    />

                    <div className="flex flex-col justify-between">
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