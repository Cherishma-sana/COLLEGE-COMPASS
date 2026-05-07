export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-8 py-16">

      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl p-12">

        <h1 className="text-6xl font-bold text-center text-blue-700 mb-10">
          About College Compass
        </h1>

        <p className="text-xl text-gray-700 leading-9 text-center max-w-5xl mx-auto mb-14">
          College Compass is a smart college discovery platform that helps
          students explore, compare, and analyze colleges across different
          states and locations. The platform provides detailed information
          about college fees, courses, placements, ratings, and campus details
          to help students make informed career decisions.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="bg-blue-50 p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-700 mb-5">
              🎓 Our Mission
            </h2>

            <p className="text-gray-700 leading-7">
              Our mission is to simplify the college selection process
              for students using modern technology and clean user experience.
            </p>
          </div>

          <div className="bg-green-50 p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-green-700 mb-5">
              🔍 Smart Search
            </h2>

            <p className="text-gray-700 leading-7">
              Search colleges using filters such as state, location,
              fees, courses, placements, and ratings.
            </p>
          </div>

          <div className="bg-yellow-50 p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-yellow-700 mb-5">
              📊 Compare Colleges
            </h2>

            <p className="text-gray-700 leading-7">
              Compare multiple colleges and identify the best institution
              according to career goals and interests.
            </p>
          </div>

          <div className="bg-purple-50 p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-purple-700 mb-5">
              💼 Placement Details
            </h2>

            <p className="text-gray-700 leading-7">
              View placement percentages and career opportunities
              provided by top colleges and universities.
            </p>
          </div>

          <div className="bg-pink-50 p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-pink-700 mb-5">
              📚 Course Information
            </h2>

            <p className="text-gray-700 leading-7">
              Explore available courses such as CSE, ECE, AI,
              MBA, Data Science, and many more.
            </p>
          </div>

          <div className="bg-indigo-50 p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-indigo-700 mb-5">
              🚀 Modern Technology
            </h2>

            <p className="text-gray-700 leading-7">
              Built using Next.js, TypeScript, Tailwind CSS,
              Express.js, PostgreSQL, and REST APIs.
            </p>
          </div>

        </div>

        {/* Extra Section */}
        <div className="mt-20">

          <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
            Why Students Love College Compass
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-gray-100 p-8 rounded-2xl shadow">
              <h3 className="text-2xl font-bold mb-4 text-blue-700">
                ✅ Easy Navigation
              </h3>

              <p className="text-gray-700 leading-7">
                Students can quickly browse and discover colleges
                with an intuitive and responsive interface.
              </p>
            </div>

            <div className="bg-gray-100 p-8 rounded-2xl shadow">
              <h3 className="text-2xl font-bold mb-4 text-green-700">
                ✅ Detailed Insights
              </h3>

              <p className="text-gray-700 leading-7">
                Access complete details about fees, courses,
                placements, and ratings in one place.
              </p>
            </div>

          </div>

        </div>

        {/* Button */}
        <div className="text-center mt-16">

          <a
            href="/"
            className="bg-blue-700 text-white px-8 py-4 rounded-xl text-lg hover:bg-blue-800"
          >
            Back to Home
          </a>

        </div>

      </div>

    </main>
  );
}