"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type College = {
  id: number;
  name: string;
  location: string | null;
  fees: number | null;
  rating: string | number | null;
  placement_percent: number | null;
  courses: string[];
  description: string | null;
  state: string | null;
};

export default function CollegeDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;

  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchCollege = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/colleges/${id}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to load college (${response.status})`);
        }

        const data = await response.json();

        setCollege(data);
      } catch (err) {
        console.error("College details error:", err);

        setError("Unable to load college details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (!college) {
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("/api/saved-colleges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          collegeId: college.id,
        }),
      });

      const data = await response.json();

      if (response.status === 409) {
        setSaved(true);
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to save college");
      }

      setSaved(true);
    } catch (err) {
      console.error("Save error:", err);
      alert("Unable to save college.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async () => {
    const token = localStorage.getItem("token");

    if (!token || !college) {
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `/api/saved-colleges/${college.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove college");
      }

      setSaved(false);
    } catch (err) {
      console.error("Remove error:", err);
      alert("Unable to remove college.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">
          Loading college details...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-3">
            Error
          </h1>

          <p className="text-gray-700 mb-5">
            {error}
          </p>

          <button
            onClick={() => router.push("/colleges")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Back to Colleges
          </button>
        </div>
      </main>
    );
  }

  if (!college) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">
          College not found.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => router.push("/colleges")}
          className="mb-6 text-blue-600 font-semibold hover:underline"
        >
          ← Back to Colleges
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {college.name}
              </h1>

              <p className="text-lg text-gray-600">
                📍 {college.location || "Location not available"}
              </p>

              {college.state && (
                <p className="text-gray-500 mt-1">
                  {college.state}
                </p>
              )}
            </div>

            <div>
              {saved ? (
                <button
                  onClick={handleRemove}
                  disabled={saving}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50"
                >
                  {saving ? "Removing..." : "❤️ Remove Saved"}
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "❤️ Save College"}
                </button>
              )}
            </div>

          </div>

          <hr className="my-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-blue-50 rounded-xl p-5">
              <p className="text-gray-600 mb-1">
                Rating
              </p>

              <p className="text-3xl font-bold text-blue-700">
                ⭐ {college.rating ?? "N/A"}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-5">
              <p className="text-gray-600 mb-1">
                Fees
              </p>

              <p className="text-2xl font-bold text-green-700">
                {college.fees
                  ? `₹${college.fees.toLocaleString()}`
                  : "N/A"}
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-5">
              <p className="text-gray-600 mb-1">
                Placement
              </p>

              <p className="text-3xl font-bold text-purple-700">
                {college.placement_percent != null
                  ? `${college.placement_percent}%`
                  : "N/A"}
              </p>
            </div>

          </div>

          <div className="mt-8">

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              About
            </h2>

            <p className="text-gray-700 leading-7">
              {college.description ||
                "No description available for this college."}
            </p>

          </div>

          <div className="mt-8">

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Courses
            </h2>

            <div className="flex flex-wrap gap-3">

              {college.courses?.length > 0 ? (
                college.courses.map((course) => (
                  <span
                    key={course}
                    className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-full text-gray-700 font-medium"
                  >
                    {course}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">
                  No courses available.
                </p>
              )}

            </div>

          </div>

        </div>
      </div>
    </main>
  );
}