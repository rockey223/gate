import { getUserSession } from '@/serverActions/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const page =async () => {
     const user = await getUserSession();
console.log("user",user);

  if (!user) return redirect("/admin/login");
  if (user) return redirect("/admin/dashboard");
  return (
    <div>page</div>
  )
}

export default page