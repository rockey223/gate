import { Save, Camera } from "lucide-react";
import ProfileDetailsForm from "@/components/adminComponent/ProfileDetailsForm";
import ProfilePasswordForm from "@/components/adminComponent/ProfilePasswordForm";
import { getUserDetail } from "@/serverActions/auth";

export default async function page() {
  const user = await getUserDetail();

  // const handleSave = () => {
  //   toast.success("Profile updated successfully!");
  // };

  // const handleAvatarChange = () => {
  //   toast.info("Avatar upload coming soon!");
  // };

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Profile Settings</h1>
        <p className="text-gray-600">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-start gap-6 mb-8">
          <div className="relative">
            <div className="size-24 rounded-full bg-blue-600 text-white text-2xl flex items-center justify-center font-medium">
              {user.name.charAt(0)}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-xl mb-1">{user.name}</h2>
            <p className="text-gray-600 mb-2">{user.role}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <ProfileDetailsForm user={user} />
      </div>

      <ProfilePasswordForm />
    </div>
  );
}
