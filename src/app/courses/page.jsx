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

export default function CoursesPage() {
  const courses = [
    {
      icon: Code,
      category: "Technology",
      title: "Computer Science & Engineering",
      duration: "4 Years",
      students: "2,500+",
      description:
        "Master programming, AI, machine learning, and software development with hands-on projects and industry collaborations.",
      programs: ["B.Tech", "M.Tech", "Ph.D"],
    },
    {
      icon: Briefcase,
      category: "Business",
      title: "Business Administration",
      duration: "2-4 Years",
      students: "3,000+",
      description:
        "Learn business strategy, finance, marketing, and management from industry experts with real-world case studies.",
      programs: ["BBA", "MBA", "Executive MBA"],
    },
    {
      icon: Microscope,
      category: "Science",
      title: "Life Sciences & Biotechnology",
      duration: "3-5 Years",
      students: "1,800+",
      description:
        "Explore biology, genetics, and biotechnology with access to state-of-the-art research facilities.",
      programs: ["B.Sc", "M.Sc", "Ph.D"],
    },
    {
      icon: Palette,
      category: "Arts",
      title: "Design & Creative Arts",
      duration: "3-4 Years",
      students: "1,200+",
      description:
        "Develop your creative skills in graphic design, animation, and digital media with industry-standard tools.",
      programs: ["BFA", "MFA", "Diploma"],
    },
    {
      icon: Heart,
      category: "Healthcare",
      title: "Medicine & Healthcare",
      duration: "5-6 Years",
      students: "1,500+",
      description:
        "Train to become a healthcare professional with clinical rotations and hands-on patient care experience.",
      programs: ["MBBS", "BDS", "Nursing"],
    },
    {
      icon: Scale,
      category: "Law",
      title: "Law & Legal Studies",
      duration: "3-5 Years",
      students: "1,000+",
      description:
        "Study constitutional law, criminal justice, and corporate law with moot court competitions and internships.",
      programs: ["LLB", "LLM", "Integrated BA LLB"],
    },
    {
      icon: Building,
      category: "Engineering",
      title: "Civil & Mechanical Engineering",
      duration: "4 Years",
      students: "2,200+",
      description:
        "Design, build, and innovate in construction, infrastructure, and mechanical systems with practical labs.",
      programs: ["B.Tech", "M.Tech", "Diploma"],
    },
    {
      icon: BookOpen,
      category: "Humanities",
      title: "Arts, Humanities & Social Sciences",
      duration: "3-4 Years",
      students: "1,600+",
      description:
        "Explore history, literature, psychology, and sociology with interdisciplinary learning approaches.",
      programs: ["BA", "MA", "Ph.D"],
    },
  ];

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
      description: "Get personalized attention with low student-to-faculty ratios",
    },
    {
      icon: Briefcase,
      title: "Industry Partnerships",
      description: "Access internships and job placements through our network",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Courses</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover a wide range of programs designed to help you achieve your
            academic and career goals. From undergraduate to doctoral studies, we
            offer comprehensive education across multiple disciplines.
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
                    <course.icon className="text-white" size={28} />
                  </div>
                  <span className="text-blue-600 font-semibold text-sm">
                    {course.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">
                    {course.title}
                  </h3>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{course.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{course.students}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
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
                  </div>

                  <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Learn More
                  </button>
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
            We offer many more specialized programs and certificates. Contact our
            admissions team to explore all available options.
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg">
            Contact Admissions
          </button>
        </div>
      </section>
    </div>
  );
}
