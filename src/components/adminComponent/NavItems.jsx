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
} from "lucide-react";
import { usePathname } from "next/navigation";
const navItems = [
  { path: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { path: "/admin/homepage", label: "Home Page", icon: Home },
  // { path: "/admin/about", label: "About Us", icon: FileText },
  { path: "/admin/course-content", label: "Course Content", icon: BookOpen },
  { path: "/admin/contactContent", label: "Contact Us", icon: Mail },
];

const NavItems = () => {
    const pathname = usePathname();
  return (
    <nav className="flex-1 p-4 space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon className="size-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItems;
