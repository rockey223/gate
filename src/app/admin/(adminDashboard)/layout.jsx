import "../../globals.css";
import { redirect } from "next/navigation";
import { getUserDetail, getUserSession } from "@/serverActions/auth";
import UserProfile from "@/components/adminComponent/UserProfile";
import NavItems from "@/components/adminComponent/NavItems";

export default async function DashboardLayout({ children }) {
  const user = await getUserSession();

  if (!user) return redirect("/admin/login");

  const userDetails = await getUserDetail();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="font-semibold text-xl">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Content Management</p>
        </div>

        <NavItems />

        <UserProfile userDetails={userDetails} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
