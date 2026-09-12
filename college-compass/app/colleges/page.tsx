"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type CollegeResponse = {
  data: College[];
  pagination: Pagination;
};

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);

  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (state.trim()) {
          params.set("state", state.trim());
        }

        if (location.trim()) {
          params.set("location", location.trim());
        }

        params.set("page", String(page));

        // Show 50 colleges per page
        params.set("limit", "50");

        const response = await fetch(
          `/api/colleges?${params.toString()}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch colleges (${response.status})`
          );
        }

        const result: CollegeResponse = await response.json();

        setColleges(result.data);
        setPagination(result.pagination);
      } catch (err) {
        console.error("College listing error:", err);

        setError(
          "Unable to load colleges. Please try again."
        );

        setColleges([]);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [search, state, location, page]);

  // Reset page when filters/search change
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleStateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(event.target.value);
    setPage(1);
  };

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLocation(event.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setState("");
    setLocation("");
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* PAGE HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-extrabold text-gray-900">
            Explore Colleges
          </h1>

          <p className="text-gray-600 mt-2 text-lg">
            Search and compare colleges across India.
          </p>

        </div>

        {/* FILTER BOX */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Search & Filters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* SEARCH */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search College
              </label>

              <input
                type="text"
                placeholder="Search by college name..."
                value={search}
                onChange={handleSearchChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* STATE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State
              </label>

              <input
                type="text"
                placeholder="e.g. Telangana"
                value={state}
                onChange={handleStateChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* LOCATION */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>

              <input
                type="text"
                placeholder="e.g. Hyderabad"
                value={location}
                onChange={handleLocationChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* CLEAR FILTERS */}
          {(search || state || location) && (
            <button
              onClick={clearFilters}
              className="mt-5 text-blue-600 font-semibold hover:underline"
            >
              Clear all filters
            </button>
          )}

        </div>

        {/* RESULTS COUNT */}
        {!loading && pagination && (
          <div className="mb-5 flex items-center justify-between">

            <p className="text-gray-700 font-medium">
              Showing{" "}
              <span className="font-bold">
                {colleges.length}
              </span>{" "}
              colleges on this page
            </p>

            <p className="text-gray-600">
              Total colleges:{" "}
              <span className="font-bold text-gray-900">
                {pagination.total}
              </span>
            </p>

          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">

            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>

            <p className="text-gray-600 text-lg">
              Loading colleges...
            </p>

          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">

            <p className="text-red-600 text-lg font-semibold mb-4">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Try Again
            </button>

          </div>
        )}

        {/* NO RESULTS */}
        {!loading &&
          !error &&
          colleges.length === 0 && (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No colleges found
              </h2>

              <p className="text-gray-600 mb-5">
                Try changing your search or filters.
              </p>

              <button
                onClick={clearFilters}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Clear Filters
              </button>

            </div>
          )}

        {/* COLLEGE GRID */}
        {!loading &&
          !error &&
          colleges.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {colleges.map((college) => (

                <div
                  key={college.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col"
                >

                  {/* COLLEGE NAME */}
                  <div className="mb-4">

                    <h2 className="text-xl font-bold text-gray-900">
                      {college.name}
                    </h2>

                    <p className="text-gray-600 mt-2">
                      📍 {college.location || "Location not available"}
                    </p>

                    {college.state && (
                      <p className="text-sm text-gray-500 mt-1">
                        {college.state}
                      </p>
                    )}

                  </div>

                  {/* COLLEGE DETAILS */}
                  <div className="space-y-3 mb-5">

                    {/* RATING */}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Rating
                      </span>

                      <span className="font-bold text-yellow-600">
                        ⭐ {college.rating ?? "N/A"}
                      </span>
                    </div>

                    {/* FEES */}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Fees
                      </span>

                      <span className="font-semibold text-gray-900">
                        {college.fees != null
                          ? `₹${college.fees.toLocaleString()}`
                          : "N/A"}
                      </span>
                    </div>

                    {/* PLACEMENT */}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Placement
                      </span>

                      <span className="font-semibold text-green-600">
                        {college.placement_percent != null
                          ? `${college.placement_percent}%`
                          : "N/A"}
                      </span>
                    </div>

                  </div>

                  {/* COURSES */}
                  <div className="mb-6">

                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Courses
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {college.courses &&
                      college.courses.length > 0 ? (
                        college.courses
                          .slice(0, 4)
                          .map((course) => (
                            <span
                              key={course}
                              className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full"
                            >
                              {course}
                            </span>
                          ))
                      ) : (
                        <span className="text-gray-500 text-sm">
                          No courses available
                        </span>
                      )}

                    </div>

                  </div>

                  {/* EXPLORE BUTTON */}
                  <div className="mt-auto">

                    <Link
                      href={`/college/${college.id}`}
                      className="block w-full text-center bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Explore College
                    </Link>

                  </div>

                </div>

              ))}

            </div>
          )}

        {/* PAGINATION */}
        {!loading &&
          !error &&
          pagination &&
          pagination.totalPages > 1 && (

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

              {/* PREVIOUS */}
              <button
                disabled={!pagination.hasPreviousPage}
                onClick={() =>
                  setPage((previousPage) =>
                    Math.max(previousPage - 1, 1)
                  )
                }
                className="px-6 py-3 rounded-lg border border-gray-300 bg-white font-semibold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                ← Previous
              </button>

              {/* PAGE NUMBER */}
              <div className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold">
                Page {pagination.page} of{" "}
                {pagination.totalPages}
              </div>

              {/* NEXT */}
              <button
                disabled={!pagination.hasNextPage}
                onClick={() =>
                  setPage((previousPage) =>
                    previousPage + 1
                  )
                }
                className="px-6 py-3 rounded-lg border border-gray-300 bg-white font-semibold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next →
              </button>

            </div>
          )}

      </div>

    </main>
  );
}