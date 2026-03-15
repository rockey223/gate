import { getAllCourses } from "@/serverActions/course";
import {
  BookOpen,
  Code,
  Briefcase,
  Microscope,
  Palette,
  Heart,
  Scale,
  Building,
  Clock,
  Users,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default async function CoursesPage() {
  const features = [
    {
      icon: GraduationCap,
      title: "Expert Faculty",
      description: "Learn from experienced professors and industry experts",
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Choose from full-time, part-time, and online options",
    },
    {
      icon: Users,
      title: "Small Class Sizes",
      description:
        "Get personalized attention with low student-to-faculty ratios",
    },
    {
      icon: Briefcase,
      title: "Industry Partnerships",
      description: "Access internships and job placements through our network",
    },
  ];

  const { data: courses } = await getAllCourses();


  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Courses</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover a wide range of programs designed to help you achieve your
            academic and career goals. From undergraduate to doctoral studies,
            we offer comprehensive education across multiple disciplines.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-blue-600" size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Our Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from over 200 courses across 8 major disciplines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6">
                  <div className="bg-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <Building className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">
                    {course.title}
                  </h3>
                  <span className="text-blue-600 font-semibold text-sm">
                    {course?.level}
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4 h-30">
                    {course.shortDescription}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-10">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{course.studentsEnrolled}</span>
                    </div>
                  </div>

                  {/* <div className="border-t pt-4">
                    <div className="text-sm text-gray-500 mb-2">
                      Programs Offered:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {course.programs.map((program, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {program}
                        </span>
                      ))}
                    </div>
                  </div> */}

                  <Link href={`/courses/${course.slug}`} className="w-full px-4 mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We offer many more specialized programs and certificates. Contact
            our admissions team to explore all available options.
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg">
            Contact Admissions
          </button>
        </div>
      </section>
    </div>
  );
}
