"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSavedColleges, removeSavedCollege } from "../../lib/api";

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

type SavedCollege = {
  id: number;
  collegeId: number;
  createdAt: string;
  college: College;
};

export default function SavedCollegesPage() {
  const router = useRouter();

  const [savedColleges, setSavedColleges] = useState<SavedCollege[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSavedColleges = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const data = await getSavedColleges(token);
        setSavedColleges(data);
      } catch (error: any) {
        console.error(error);

        if (error?.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
          return;
        }

        setError("Unable to load saved colleges.");
      } finally {
        setLoading(false);
      }
    };

    loadSavedColleges();
  }, [router]);

  const handleRemove = async (collegeId: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      await removeSavedCollege(token, collegeId);

      setSavedColleges((current) =>
        current.filter(
          (item) => item.collegeId !== collegeId
        )
      );
    } catch (error) {
      console.error(error);
      alert("Unable to remove college.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-600">
          Loading saved colleges...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <button
            onClick={() => router.push("/colleges")}
            className="text-blue-700 font-semibold hover:underline mb-4"
          >
            ← Back to Colleges
          </button>

          <h1 className="text-4xl font-extrabold text-gray-900">
            Saved Colleges
          </h1>

          <p className="mt-2 text-gray-600">
            Colleges you have saved for later.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {savedColleges.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <div className="text-5xl mb-4">♡</div>

            <h2 className="text-2xl font-bold text-gray-800">
              No saved colleges yet
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              Explore colleges and save the ones you like.
            </p>

            <button
              onClick={() => router.push("/colleges")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
            >
              Explore Colleges
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {savedColleges.map((item) => {
              const college = item.college;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h2 className="text-xl font-bold text-blue-700">
                    {college.name}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    📍 {college.location}, {college.state}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-5">

                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">
                        Fees
                      </p>
                      <p className="font-bold text-gray-800">
                        {college.fees !== null
                          ? `₹${college.fees.toLocaleString()}`
                          : "N/A"}
                      </p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">
                        Rating
                      </p>
                      <p className="font-bold text-gray-800">
                        ⭐{" "}
                        {college.rating !== null
                          ? Number(college.rating).toFixed(1)
                          : "N/A"}
                      </p>
                    </div>

                  </div>

                  <div className="mt-5 flex gap-3">

                    <button
                      onClick={() =>
                        router.push(`/college/${college.id}`)
                      }
                      className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() =>
                        handleRemove(college.id)
                      }
                      className="px-4 py-3 rounded-xl border border-red-300 text-red-600 font-semibold hover:bg-red-50"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}