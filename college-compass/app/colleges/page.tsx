"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type College = {
  id: number;
  name: string;
  location: string;
  state: string;
  rating: number;
};

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchColleges();
  }, [search, state, location]);

  const fetchColleges = async () => {
    const res = await axios.get("http://localhost:5000/api/colleges", {
      params: { search, state, location },
    });
    setColleges(res.data);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-extrabold text-blue-700">
            College Compass
          </h1>

          <div className="flex gap-4">
            <a href="/" className="px-5 py-3 bg-blue-700 text-white rounded-xl">
              Home
            </a>
            <a href="/about" className="px-5 py-3 bg-green-600 text-white rounded-xl">
              About
            </a>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="border rounded-xl px-4 py-3"
            placeholder="Search college..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded-xl px-4 py-3"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">All States</option>
            <option value="Telangana">Telangana</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Karnataka">Karnataka</option>
          </select>

          <select
            className="border rounded-xl px-4 py-3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Vijayawada">Vijayawada</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colleges.map((college) => (
            <div
              key={college.id}
              className="bg-white rounded-3xl shadow-lg p-7 hover:scale-105 transition"
            >
              <h2 className="text-3xl font-bold text-blue-700 mb-4">
                {college.name}
              </h2>

              <p className="text-gray-700 mb-3">
                📍 {college.location}, {college.state}
              </p>

              <p className="text-lg font-semibold mb-6">
                ⭐ Rating: {college.rating}
              </p>

              <a
                href={`/college/${college.id}`}
                className="inline-block bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800"
              >
                View Details
              </a>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}