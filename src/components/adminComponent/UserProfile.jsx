"use client";
import { useEffect, useRef, useState } from "react";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { getUserDetail, logoutAdmin } from "@/serverActions/auth";

const UserProfile = ({ userDetails }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef(null);

  const handleLogout = async () => {
    await logoutAdmin();
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsPopoverOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (eventt) => {
      if (popoverRef.current && !popoverRef.current.contains(eventt.target)) {
        setIsPopoverOpen(false);
      }
    };

    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen]);

  return (
    <div className="p-4 border-t border-gray-200 relative" ref={popoverRef}>
      <button
        className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      >
        <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
          A
        </div>
        <div className="text-left">
          <p className="text-sm font-medium capitalize">{userDetails?.name || "Admin User"}</p>
          <p className="text-xs text-gray-500">{userDetails?.email || "admin@platform.com"}</p>
        </div>
      </button>

      {isPopoverOpen && (
        <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            <div className="px-2 py-2">
              <p className="text-sm font-medium capitalize">{userDetails?.name || "Admin User"}</p>
              <p className="text-xs text-gray-500">{userDetails?.email || "admin@platform.com"}</p>
            </div>
            <div className="h-px bg-gray-200 my-2" />
            <Link
              className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors text-left"
              href="/admin/profile"
            >
              <User className="size-4 mr-2" />
              Profile
            </Link>
            {/* <button
                  className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors text-left"
                  onClick={() => handleNavigate("/settings")}
                >
                  <Settings className="size-4 mr-2" />
                  Settings
                </button> */}
            <div className="h-px bg-gray-200 my-2" />
            <button
              className="w-full flex items-center cursor-pointer px-3 py-2 text-sm rounded-md hover:bg-red-50 transition-colors text-left text-red-600 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="size-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
