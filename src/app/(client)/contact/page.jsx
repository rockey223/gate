import ContactForm from "@/components/clientComponent/ContactForm";
import { getContactPage } from "@/serverActions/contactPage";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
export const revalidate = 20;
export default async function ContactPage() {
  const contactPageDetails = await getContactPage();
  console.log(contactPageDetails);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: [
        "123 University Avenue",
        "Education City, ST 12345",
        "United States",
      ],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "Main Office: +1 (555) 123-4567",
        "Admissions: +1 (555) 123-4568",
        "Support: +1 (555) 123-4569",
      ],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "General: info@gatecollege.edu",
        "Admissions: admissions@gatecollege.edu",
        "Support: support@gatecollege.edu",
      ],
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 8:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Closed",
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out to us and we'll get
            back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="text-blue-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Address</h3>

              <p className="text-gray-600 text-sm mb-1">
                {contactPageDetails.address}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Phone className="text-blue-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                Phone Number
              </h3>

              <p className="text-gray-600 text-sm mb-1">
                +977-{contactPageDetails.phoneNumber}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Mail className="text-blue-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Email</h3>

              <p className="text-gray-600 text-sm mb-1">
                {contactPageDetails.email}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <ContactForm />

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-gray-900 mb-2">
                What are the admission requirements?
              </h3>
              <p className="text-gray-600">
                Admission requirements vary by program. Generally, we require
                high school transcripts, standardized test scores, letters of
                recommendation, and a personal statement.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-gray-900 mb-2">
                When is the application deadline?
              </h3>
              <p className="text-gray-600">
                Fall semester applications are due by January 15th. Spring
                semester applications are due by October 1st. We recommend
                applying early.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-gray-900 mb-2">
                Do you offer financial aid?
              </h3>
              <p className="text-gray-600">
                Yes! We offer various scholarships, grants, and loan programs.
                Over 85% of our students receive some form of financial
                assistance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
