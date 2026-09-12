"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
type College = {
  id: number;
  name: string;
  location: string;
  state: string;
  fees: number | null;
  rating: number | string | null;
  placement_percent: number | null;
  courses: string[];
  description: string | null;
};

export default function CollegeDetailsPage() {
  const params = useParams();
  const id = params.id;

  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `/api/colleges/${id}`
        );

        setCollege(response.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load college details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCollege();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-600">
          Loading college details...
        </p>
      </main>
    );
  }

  if (error || !college) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            College Not Found
          </h1>

          <a
            href="/colleges"
            className="bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Back to Colleges
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-8">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

          <a
            href="/colleges"
            className="inline-block mb-6 text-blue-700 font-semibold hover:underline"
          >
            ← Back to Colleges
          </a>

          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
            {college.name}
          </h1>

          <p className="text-lg text-gray-600">
            📍 {college.location}, {college.state}
          </p>

        </div>

        {/* Main Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Fees */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500 mb-2">
              Annual Fees
            </p>

            <h2 className="text-3xl font-bold text-blue-700">
              {college.fees !== null
                ? `₹${college.fees.toLocaleString()}`
                : "Not Available"}
            </h2>
          </div>

          {/* Rating */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500 mb-2">
              Rating
            </p>

            <h2 className="text-3xl font-bold text-yellow-600">
              ⭐{" "}
              {college.rating !== null
                ? Number(college.rating).toFixed(1)
                : "N/A"}
            </h2>
          </div>

          {/* Placement */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500 mb-2">
              Placement
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {college.placement_percent !== null
                ? `${college.placement_percent}%`
                : "N/A"}
            </h2>
          </div>

        </div>

        {/* Courses */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Courses Offered
          </h2>

          <div className="flex flex-wrap gap-3">

            {college.courses && college.courses.length > 0 ? (
              college.courses.map((course) => (
                <span
                  key={course}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold"
                >
                  {course}
                </span>
              ))
            ) : (
              <p className="text-gray-500">
                Course information not available.
              </p>
            )}

          </div>

        </div>

        {/* Description */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            About College
          </h2>

          <p className="text-gray-700 text-lg leading-8">
            {college.description ||
              "Detailed information about this college is currently unavailable."}
          </p>

        </div>

      </div>

    </main>
  );
}