'use client'
import React from "react";
import Link from "next/link";
import {
  Home,
  FileText,
  BookOpen,
  Mail,
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  User2,
} from "lucide-react";
import { usePathname } from "next/navigation";
const navItems = [
  { path: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { path: "/admin/homepage", label: "Home Page", icon: Home },
  // { path: "/admin/about", label: "About Us", icon: FileText },
  { path: "/admin/course-content", label: "Course Content", icon: BookOpen },
  { path: "/admin/contactContent", label: "Contact Us", icon: Mail },
  { path: "/admin/admins", label: "Admins", icon: User2 },
];

const NavItems = () => {
    const pathname = usePathname();
  return (
    <nav className="flex-1 p-4 space-y-5 lg:space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.path}
            href={item.path}
             className={`group relative flex  items-center lg:gap-3 py-2 max-lg:justify-center lg:px-4 lg:py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
                      <Icon className="size-6 lg:size-5" />

           {/* Normal label for large screens */}
            <span className="hidden lg:inline">{item.label}</span>

            {/* Tooltip for small screens */}
            <span className="absolute left-full ml-3 whitespace-nowrap rounded-md bg-gray-900 text-white text-sm px-2 py-1 opacity-0 translate-x-[-5px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 lg:hidden">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItems;
