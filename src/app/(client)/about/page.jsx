import { Target, Eye, Award, Users, BookOpen, Globe } from "lucide-react";
export const dynamic = "force-dynamic";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for the highest standards in teaching, research, and student support.",
    },
    {
      icon: Users,
      title: "Diversity",
      description:
        "We celebrate diverse perspectives and create an inclusive learning environment.",
    },
    {
      icon: BookOpen,
      title: "Innovation",
      description:
        "We encourage creative thinking and embrace new approaches to education.",
    },
    {
      icon: Globe,
      title: "Global Outlook",
      description:
        "We prepare students to thrive in an interconnected, global society.",
    },
  ];

  const milestones = [
    { year: "1950", event: "University Founded" },
    { year: "1975", event: "First Graduate Program Launched" },
    { year: "1990", event: "International Partnerships Established" },
    { year: "2005", event: "Research Center of Excellence Accredited" },
    { year: "2015", event: "Expanded Campus with Modern Facilities" },
    { year: "2026", event: "15,000+ Active Students" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1758270705518-b61b40527e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY29sbGVnZSUyMHN0dWRlbnRzfGVufDF8fHx8MTc3MTgwODI1Mnww&ixlib=rb-4.1.0&q=80&w=1080')",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl font-bold mb-4">About Gate College</h1>
          <p className="text-xl">
            Transforming lives through education since 1950
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-8 rounded-xl">
              <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide accessible, high-quality education that empowers
                students to achieve their full potential and make meaningful
                contributions to society. We are committed to fostering critical
                thinking, creativity, and lifelong learning.
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-xl">
              <div className="bg-purple-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Eye className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be a globally recognized institution of excellence that shapes
                future leaders, drives innovation, and creates positive change in
                communities worldwide. We aspire to be at the forefront of
                educational transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape our academic
              community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="text-blue-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Over 75 years of educational excellence and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl"
              >
                <div className="text-blue-600 font-bold text-4xl mb-2">
                  {milestone.year}
                </div>
                <div className="text-gray-900 font-semibold text-lg">
                  {milestone.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Award className="mx-auto mb-4" size={48} />
            <h2 className="text-4xl font-bold mb-4">
              Recognized for Excellence
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Gate College has been consistently ranked among the top
              institutions nationally and internationally for academic quality,
              research output, and student satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">Top 50</div>
              <div className="text-blue-100">National University Ranking</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Student Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">$50M+</div>
              <div className="text-blue-100">Annual Research Funding</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}