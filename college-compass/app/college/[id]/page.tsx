"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

type College = {
  id: number;
  name: string;
  location: string;
  state: string;
  fees: number;
  rating: number;
  placement_percent: number;
  courses: string[];
  description: string;
};

export default function CollegeDetailsPage() {
  const params = useParams();
  const id = params.id;

  const [college, setCollege] = useState<College | null>(null);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/colleges/${id}`);
        setCollege(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) fetchCollege();
  }, [id]);

  if (!college) {
    return <p className="p-10 text-xl">Loading college details...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          {college.name}
        </h1>

        <p className="text-gray-700 text-lg mb-4">
          📍 {college.location}, {college.state}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded">
            <h3 className="font-bold">Fees</h3>
            <p>₹{college.fees}</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded">
            <h3 className="font-bold">Rating</h3>
            <p>⭐ {college.rating}</p>
          </div>

          <div className="bg-green-100 p-4 rounded">
            <h3 className="font-bold">Placement</h3>
            <p>{college.placement_percent}%</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-3">Courses Offered</h2>

        <div className="flex flex-wrap gap-2 mb-6">
          {college.courses.map((course) => (
            <span
              key={course}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded"
            >
              {course}
            </span>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-3">About College</h2>
        <p className="text-gray-700 leading-7">{college.description}</p>

        <a
          href="/"
          className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}