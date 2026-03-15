import { getHeroSection } from "@/serverActions/heroSection";
import { getWhyChooseUsList } from "@/serverActions/whyChooseUs";
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  ChevronRight,
  Star,
  Briefcase,
  Calendar,
  Building2,
  Globe2,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
export const revalidate = 20;
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const heroSectionData = await getHeroSection();
  const heroSection = heroSectionData.heroSection;
  const whyChooseUsList = await getWhyChooseUsList(); // await getWhyChooseUsList();

  const stats = [
    { icon: Users, label: "Students Enrolled", value: "15,000+" },
    { icon: BookOpen, label: "Courses Available", value: "200+" },
    { icon: Award, label: "Awards Won", value: "50+" },
    { icon: TrendingUp, label: "Placement Rate", value: "95%" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      program: "Computer Science, Class of 2024",
      image:
        "https://images.unsplash.com/photo-1721702754494-fdd7189f946c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NzE4MTM0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      quote:
        "Elite University provided me with the skills and connections I needed to land my dream job at a top tech company. The faculty truly cares about student success.",
    },
    {
      name: "Michael Chen",
      program: "Business Administration, Class of 2023",
      image:
        "https://images.unsplash.com/photo-1728023881214-1d71a7a30a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY29sbGFib3JhdGlvbiUyMHRlYW13b3JrfGVufDF8fHx8MTc3MTgyMjE1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      quote:
        "The hands-on learning approach and real-world projects prepared me for the challenges of the business world. I couldn't have asked for a better education.",
    },
    {
      name: "Emily Rodriguez",
      program: "Medicine, Class of 2025",
      image:
        "https://images.unsplash.com/photo-1758270705518-b61b40527e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY29sbGVnZSUyMHN0dWRlbnRzfGVufDF8fHx8MTc3MTgwODI1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      quote:
        "The clinical rotations and mentorship programs have been invaluable. I feel confident and prepared to make a difference in healthcare.",
    },
  ];

  const campusLife = [
    {
      icon: Users,
      title: "100+ Student Clubs",
      description:
        "Join clubs ranging from robotics to debate, music to entrepreneurship",
    },
    {
      icon: Sparkles,
      title: "Cultural Events",
      description:
        "Annual festivals, concerts, and celebrations from around the world",
    },
    {
      icon: Award,
      title: "Sports & Athletics",
      description: "Compete in 20+ varsity sports and recreational activities",
    },
    {
      icon: Lightbulb,
      title: "Innovation Labs",
      description:
        "Access maker spaces and incubation centers for your startup ideas",
    },
  ];

  const recruiters = [
    { name: "Google", category: "Technology" },
    { name: "Microsoft", category: "Technology" },
    { name: "Goldman Sachs", category: "Finance" },
    { name: "McKinsey & Company", category: "Consulting" },
    { name: "Pfizer", category: "Healthcare" },
    { name: "Tesla", category: "Automotive" },
    { name: "Amazon", category: "E-commerce" },
    { name: "Deloitte", category: "Consulting" },
  ];

  const upcomingEvents = [
    {
      date: "MAR 15",
      title: "Open House 2026",
      description: "Visit campus and meet our faculty and students",
      category: "Campus Event",
    },
    {
      date: "MAR 22",
      title: "Tech Innovation Summit",
      description: "Annual technology conference featuring industry leaders",
      category: "Conference",
    },
    {
      date: "APR 05",
      title: "Spring Career Fair",
      description: "Connect with top employers and explore opportunities",
      category: "Career",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              heroSection && heroSection.bannerImage
                ? `url('${heroSection.bannerImage}')`
                : "url('https://images.unsplash.com/photo-1725701143530-cc52c857d29a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcxNzM2NDA3fDA&ixlib=rb-4.1.0&q=80&w=1080')",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {heroSection ? heroSection.heroTitle : ""}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {heroSection ? heroSection.heroSubtitle : ""}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={"/courses"}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg"
            >
              Explore Courses
              <ChevronRight size={20} />
            </Link>
            <Link
              href={"/contact"}
              className="bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="mx-auto mb-4" size={40} />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* why chosoe us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Elite University?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide an exceptional learning environment that prepares you
              for success in your chosen field
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUsList.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Experience Vibrant Campus Life
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                At Elite University, education extends far beyond the classroom.
                Immerse yourself in a dynamic community with endless
                opportunities for growth, leadership, and fun.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {campusLife.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1759200135568-566eb9ecaa81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBzcG9ydHMlMjBhY3Rpdml0aWVzfGVufDF8fHx8MTc3MTgyMjE1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Campus sports"
                className="rounded-xl object-cover h-48 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1728023881214-1d71a7a30a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY29sbGFib3JhdGlvbiUyMHRlYW13b3JrfGVufDF8fHx8MTc3MTgyMjE1Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Student collaboration"
                className="rounded-xl object-cover h-48 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1602052294200-a8b75e03adfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwcmVzZWFyY2glMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc3MTgyMjE1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Research lab"
                className="rounded-xl object-cover h-48 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1758270703733-3663d99c9dd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYWx1bW5pJTIwc3VjY2Vzc3xlbnwxfHx8fDE3NzE4MjIxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Alumni success"
                className="rounded-xl object-cover h-48 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials Section */}
      {/* <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from students who are shaping their futures at Gate College
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-yellow-400"
                      size={20}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.program}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Top Recruiters Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Briefcase className="text-blue-600" size={32} />
              <h2 className="text-4xl font-bold text-gray-900">
                Our Placement Partners
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our graduates are recruited by leading companies worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {recruiters.map((recruiter, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:border-blue-600 transition-colors flex flex-col items-center justify-center text-center"
              >
                <Building2 className="text-blue-600 mb-3" size={32} />
                <div className="font-bold text-gray-900 mb-1">
                  {recruiter.name}
                </div>
                <div className="text-sm text-gray-600">
                  {recruiter.category}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              <span className="font-bold text-blue-600">500+</span> companies
              visit our campus annually for placements
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="text-blue-600" size={32} />
              <h2 className="text-4xl font-bold text-gray-900">
                Upcoming Events
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay connected with campus activities and opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                  <div className="text-center">
                    <div className="text-3xl font-bold">
                      {event.date.split(" ")[1]}
                    </div>
                    <div className="text-blue-100">
                      {event.date.split(" ")[0]}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {event.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
                    Learn More
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              View All Events
            </button>
          </div>
        </div>
      </section> */}

      {/* Global Presence Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Globe2 className="mx-auto mb-4" size={48} />
            <h2 className="text-4xl font-bold mb-4">
              Global Reach, Local Impact
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Connected with universities and institutions across 50+ countries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Partner Universities</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Exchange Programs</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">30+</div>
              <div className="text-blue-100">Countries Represented</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">2,000+</div>
              <div className="text-blue-100">International Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of students who have already transformed their lives
            at Gate College
          </p>
          <Link
            href={"/contact"}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
