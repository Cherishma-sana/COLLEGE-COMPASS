"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-blue-700">
          College Compass
        </h1>

        <div className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-700">
            Home
          </Link>

          <Link href="/colleges" className="text-gray-700 hover:text-blue-700">
            Colleges
          </Link>

          <Link href="/about" className="text-gray-700 hover:text-blue-700">
            About
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-28 px-6">
        <h1 className="text-6xl font-extrabold text-blue-800 mb-6">
          Find Your Dream College
        </h1>

        <p className="text-xl text-gray-700 max-w-2xl mb-10">
          Explore top universities, compare courses, check placements,
          and make smarter career decisions with College Compass.
        </p>

        <div className="flex gap-4">
          <Link
            href="/colleges"
            className="bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-800 transition"
          >
            Explore Colleges
          </Link>

          <Link
            href="/about"
            className="border-2 border-blue-700 text-blue-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-100 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 pb-20">

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-5xl font-bold text-blue-700 mb-3">
            500+
          </h2>

          <p className="text-gray-600 text-lg">
            Colleges Listed
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-5xl font-bold text-green-600 mb-3">
            100+
          </h2>

          <p className="text-gray-600 text-lg">
            Courses Available
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-5xl font-bold text-purple-600 mb-3">
            95%
          </h2>

          <p className="text-gray-600 text-lg">
            Student Satisfaction
          </p>
        </div>

      </section>

      {/* Features */}
      <section className="bg-white py-20 px-10">
        <h2 className="text-4xl font-bold text-center mb-14 text-gray-800">
          Platform Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="bg-blue-50 rounded-2xl p-8 shadow">
            <div className="text-5xl mb-5">🔎</div>

            <h3 className="text-2xl font-bold mb-3">
              Smart Filters
            </h3>

            <p className="text-gray-600">
              Search colleges by state, fees, ratings,
              placements, and available courses.
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 shadow">
            <div className="text-5xl mb-5">📚</div>

            <h3 className="text-2xl font-bold mb-3">
              Detailed Information
            </h3>

            <p className="text-gray-600">
              View detailed college information including
              fees, courses, placements, and descriptions.
            </p>
          </div>

          <div className="bg-purple-50 rounded-2xl p-8 shadow">
            <div className="text-5xl mb-5">⚖️</div>

            <h3 className="text-2xl font-bold mb-3">
              Easy Comparison
            </h3>

            <p className="text-gray-600">
              Compare colleges and choose the best option
              for your career goals.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white text-center py-6">
        <p className="text-lg">
          © 2026 College Compass | All Rights Reserved
        </p>
      </footer>

    </main>
  );
}