"use client";

import { useEffect, useState } from "react";

type College = {
  id: number;
  name: string;
  location: string;
  state: string;
  fees: number | null;
  rating: number | string | null;
  placement_percent: number | null;
  courses: string[];
};

export default function ComparePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selected, setSelected] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/colleges?limit=50"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch colleges");
        }

        const result = await response.json();

        setColleges(result.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load colleges.");
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const handleSelect = (college: College) => {
    const alreadySelected = selected.some(
      (item) => item.id === college.id
    );

    if (alreadySelected) {
      setSelected(
        selected.filter((item) => item.id !== college.id)
      );
      return;
    }

    if (selected.length >= 3) {
      alert("You can compare a maximum of 3 colleges.");
      return;
    }

    setSelected([...selected, college]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">

          <h1 className="text-5xl font-extrabold text-blue-800 mb-4">
            Compare Colleges
          </h1>

          <p className="text-lg text-gray-600">
            Select up to 3 colleges and compare them side by side.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              Loading colleges...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-16">
            <p className="text-xl text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* College Selection */}
        {!loading && !error && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Select Colleges
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {colleges.map((college) => {
                const isSelected = selected.some(
                  (item) => item.id === college.id
                );

                return (
                  <button
                    key={college.id}
                    onClick={() => handleSelect(college)}
                    className={`text-left p-5 rounded-2xl border-2 transition ${
                      isSelected
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-blue-400"
                    }`}
                  >

                    <div className="flex items-center justify-between mb-2">

                      <h3 className="font-bold text-lg text-gray-800">
                        {college.name}
                      </h3>

                      {isSelected && (
                        <span className="text-blue-700 font-bold">
                          ✓
                        </span>
                      )}

                    </div>

                    <p className="text-gray-600 text-sm">
                      📍 {college.location}, {college.state}
                    </p>

                  </button>
                );
              })}

            </div>

            <p className="text-gray-600 mt-6">
              Selected:{" "}
              <span className="font-bold text-blue-700">
                {selected.length}/3
              </span>
            </p>

          </div>
        )}

        {/* Comparison */}
        {selected.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 overflow-x-auto">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Comparison
            </h2>

            <table className="w-full min-w-[700px] border-collapse">

              <thead>
                <tr className="border-b-2 border-gray-200">

                  <th className="text-left p-4 text-gray-700">
                    Feature
                  </th>

                  {selected.map((college) => (
                    <th
                      key={college.id}
                      className="text-left p-4 text-blue-700 text-lg"
                    >
                      {college.name}
                    </th>
                  ))}

                </tr>
              </thead>

              <tbody>

                {/* Location */}
                <tr className="border-b border-gray-200">

                  <td className="p-4 font-semibold text-gray-700">
                    Location
                  </td>

                  {selected.map((college) => (
                    <td
                      key={college.id}
                      className="p-4 text-gray-600"
                    >
                      {college.location}, {college.state}
                    </td>
                  ))}

                </tr>

                {/* Fees */}
                <tr className="border-b border-gray-200">

                  <td className="p-4 font-semibold text-gray-700">
                    Annual Fees
                  </td>

                  {selected.map((college) => (
                    <td
                      key={college.id}
                      className="p-4 text-gray-600"
                    >
                      {college.fees !== null
                        ? `₹${college.fees.toLocaleString()}`
                        : "N/A"}
                    </td>
                  ))}

                </tr>

                {/* Rating */}
                <tr className="border-b border-gray-200">

                  <td className="p-4 font-semibold text-gray-700">
                    Rating
                  </td>

                  {selected.map((college) => (
                    <td
                      key={college.id}
                      className="p-4 text-gray-600"
                    >
                      ⭐{" "}
                      {college.rating !== null
                        ? Number(college.rating).toFixed(1)
                        : "N/A"}
                    </td>
                  ))}

                </tr>

                {/* Placement */}
                <tr className="border-b border-gray-200">

                  <td className="p-4 font-semibold text-gray-700">
                    Placement
                  </td>

                  {selected.map((college) => (
                    <td
                      key={college.id}
                      className="p-4 text-gray-600"
                    >
                      {college.placement_percent !== null
                        ? `${college.placement_percent}%`
                        : "N/A"}
                    </td>
                  ))}

                </tr>

                {/* Courses */}
                <tr>

                  <td className="p-4 font-semibold text-gray-700 align-top">
                    Courses
                  </td>

                  {selected.map((college) => (
                    <td
                      key={college.id}
                      className="p-4 text-gray-600 align-top"
                    >
                      <div className="flex flex-wrap gap-2">

                        {college.courses?.map((course) => (
                          <span
                            key={course}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                          >
                            {course}
                          </span>
                        ))}

                      </div>
                    </td>
                  ))}

                </tr>

              </tbody>

            </table>

          </div>
        )}

        {/* Empty comparison */}
        {!loading && !error && selected.length === 0 && (
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

            <p className="text-gray-600 text-lg">
              Select at least one college above to start comparing.
            </p>

          </div>
        )}

      </div>

    </main>
  );
}