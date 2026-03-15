import { getUserSession } from "@/serverActions/auth";
import "../globals.css";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
 
  return <>{children}</>;
}
