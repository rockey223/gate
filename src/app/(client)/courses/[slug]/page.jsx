import { getCourseBySlug } from "@/serverActions/course";
import {
  ArrowLeft,
  Calendar,
  Users,
  BookOpen,
  Award,
  Briefcase,
  Clock,
  CheckCircle,
  GraduationCap,
  DollarSign,
} from "lucide-react";
import React from "react";

const page = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);
  const { data: course } = await getCourseBySlug(slug);
  console.log(course);

  const curriculum = [
    {
      semester: "Semester 1",
      courses: [
        "Introduction to Programming",
        "Mathematics for Computing",
        "Computer Systems Fundamentals",
        "Professional Skills Development",
      ],
    },
    {
      semester: "Semester 2",
      courses: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Web Development Fundamentals",
        "Software Engineering Principles",
      ],
    },
    {
      semester: "Semester 3-4",
      courses: [
        "Advanced Programming Concepts",
        "Mobile Application Development",
        "Artificial Intelligence & Machine Learning",
        "Capstone Project",
      ],
    },
  ];

  const careerPaths = [
    "Software Developer",
    "Data Scientist",
    "Web Developer",
    "Mobile App Developer",
    "AI/ML Engineer",
    "Database Administrator",
    "Systems Analyst",
    "Cloud Architect",
  ];

  const admissionRequirements = [
    "High School Diploma or equivalent",
    "Minimum GPA of 3.0",
    "SAT/ACT scores (optional for some programs)",
    "Letters of recommendation",
    "Personal statement",
    "Interview (for select programs)",
  ];

  const facilities = [
    "State-of-the-art computer labs with latest hardware",
    "24/7 access to development environments",
    "Innovation and maker spaces",
    "Dedicated research laboratories",
    "Industry-standard software licenses",
    "Collaborative learning spaces",
  ];
  return (
    <>
      <div>
        {/* Back Button & Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              //   onClick={() => onNavigate("courses")}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to All Courses
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-blue-500 text-white px-4 py-1 rounded-full text-sm mb-4">
                  {course?.level}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {course.title}
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  {course.shortDescription}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-700/50 rounded-lg p-4">
                    <Clock className="mb-2" size={24} />
                    <div className="text-sm text-blue-200">Duration</div>
                    <div className="font-bold">{course.duration}</div>
                  </div>
                  <div className="bg-blue-700/50 rounded-lg p-4">
                    <Users className="mb-2" size={24} />
                    <div className="text-sm text-blue-200">
                      Students Enrolled
                    </div>
                    <div className="font-bold">{course.studentsEnrolled}</div>
                  </div>
                </div>
              </div>

              {/* <div className="bg-white text-gray-900 rounded-xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Programs Offered</h3>

                <button className="w-full mt-6 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Apply Now
                </button>
              </div> */}
            </div>
          </div>
        </section>

        {/* Key Features */}
        {course.whyChooseThis.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Why Choose This Program?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {course.whyChooseThis.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                      <Briefcase className="text-blue-600" size={28} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Curriculum */}
        {course.syllabus.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Course Curriculum
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  A comprehensive curriculum designed to prepare you for success
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {course.syllabus.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="text-blue-600" size={24} />
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {item.course.map((course, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle
                            className="text-blue-600 flex-shrink-0 mt-0.5"
                            size={18}
                          />
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Career Paths */}
        {(course.facilities.length > 0 ||
          course.careerOportunities.length > 0) && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {course.careerOportunities.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Career Opportunities
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                      Graduates from this program are equipped for diverse and
                      high-demand career paths across multiple industries.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {course.careerOportunities.map((path, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3"
                        >
                          <Briefcase
                            className="text-blue-600 flex-shrink-0"
                            size={20}
                          />
                          <span className="font-semibold text-gray-900">
                            {path}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {course.facilities.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Facilities & Resources
                    </h2>
                    <div className="bg-white rounded-xl p-8 shadow-lg">
                      <ul className="space-y-4">
                        {course.facilities.map((facility, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle
                              className="text-green-600 flex-shrink-0 mt-1"
                              size={20}
                            />
                            <span className="text-gray-700">{facility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Admission Requirements */}
        {course.admissionRequirements.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Admission Requirements
                </h2>
                <p className="text-lg text-gray-600">
                  What you need to apply for this program
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {course.admissionRequirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}

        {/* CTA Section */}
      </div>
    </>
  );
};

export default page;
