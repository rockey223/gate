import { getUserSession } from "@/serverActions/auth";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }) => {
  const user = await getUserSession();

  if (user) return redirect("/admin/dashboard");

  return <>{children}</>;
};

export default layout;
