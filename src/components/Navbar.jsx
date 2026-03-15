"use client";
import { GraduationCap, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navbar({ currentPage, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", id: "/" },
    { name: "About Us", id: "about" },
    { name: "Courses", id: "courses" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link className="flex items-center gap-2 cursor-pointer" href={"/"}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Gate College
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`/${item.id}`}
                className={`transition-colors ${
                  currentPage === item.id
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={"/contact"}
             
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed top-16 left-0 right-0 bg-white py-4 border-t z-40 px-5 flex flex-col shadow-md">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.id}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 ${
                  currentPage === item.id
                    ? "text-blue-600 font-semibold bg-blue-50"
                    : "text-gray-700 hover:bg-gray-100 !transition-none"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={"/contact"}
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className="w-full mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
