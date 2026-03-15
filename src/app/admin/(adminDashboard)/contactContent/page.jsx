import CotactPageContentForm from "@/components/adminComponent/CotactPageContentForm";
import { getContactPage } from "@/serverActions/contactPage";

export default async function page() {
     const contactDetails = await getContactPage()
    //  console.log(contactDetails.data);
     
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Contact Us Content</h1>
        <p className="text-gray-600">
          Manage contact information and social media links
        </p>
      </div>

      <CotactPageContentForm initialData={contactDetails} />
    </div>
  );
}
