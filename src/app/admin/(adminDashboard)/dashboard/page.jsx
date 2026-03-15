import { Home, FileText, BookOpen, Mail } from "lucide-react";
import Link from "next/link";


const sections = [
  {
    path: "/admin/home",
    title: "Home Page",
    description: "Manage hero section, features, and homepage content",
    icon: Home,
    color: "bg-blue-500",
  },
  {
    path: "/admin/about",
    title: "About Us",
    description: "Edit company information, mission, vision, and team details",
    icon: FileText,
    color: "bg-green-500",
  },
  {
    path: "/admin/courses",
    title: "Course Content",
    description: "Add, edit, and manage course listings and details",
    icon: BookOpen,
    color: "bg-purple-500",
  },
  {
    path: "/admin/contact",
    title: "Contact Us",
    description: "Update contact information and social media links",
    icon: Mail,
    color: "bg-orange-500",
  },
];

export default function page() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Content Management Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your admin dashboard. Select a section below to manage your website content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.path} href={section.path}>
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className={`${section.color} p-3 rounded-lg text-white`}>
                    <Icon className="size-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{section.title}</h3>
                    <p className="text-gray-600 text-sm">{section.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      
    </div>
  );
}