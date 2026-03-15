import DeleteModal from "@/components/adminComponent/DeleteModal";
import HeroSectionForm from "@/components/adminComponent/HeroSectionForm";
import WhyChooseUsForm from "@/components/adminComponent/WhyChooseUsForm";
import { getHeroSection } from "@/serverActions/heroSection";
import {
  deleteWhyChooseUs,
  getWhyChooseUsList,
} from "@/serverActions/whyChooseUs";
import { Award, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
export default async function page({ searchParams }) {
  const heroSectionData = await getHeroSection();
  const whyChooseUsList = await getWhyChooseUsList();

  const query = await searchParams;
  console.log(query);

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Home Page Content</h1>
        <p className="text-gray-600">
          Manage your homepage content here. You can update the hero section,
          add new sections, and customize the layout to create an engaging
          experience for your visitors.
        </p>
      </div>

      {/* Hero section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-xl mb-4">Hero Section</h2>

        <HeroSectionForm data={heroSectionData.heroSection} />
      </div>

      {/* whyt chosoe us */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Award className="size-6 text-blue-600" />
            <div>
              <h2 className="font-semibold text-xl">Why Choose Us</h2>
              <p className="text-sm text-gray-600 mt-1">
                {/* {whyChooseUsList.length} item{whyChooseUsList.length !== 1 ? "s" : ""} added */}
              </p>
            </div>
          </div>
          <Link
            href={"?whyChooseUs=add"}
            scroll={false}
            // onClick={() => {
            //   setWhyChooseUsForm({ title: "", description: "" });
            //   setIsAddWhyChooseUsOpen(true);
            // }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="size-4" />
            Add Item
          </Link>
        </div>

        {whyChooseUsList.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="mb-4">No items added yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {whyChooseUsList.map((item, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-lg border border-blue-200 p-4 hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-blue-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-blue-700">{item.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`?whyChooseUs=edit&id=${item._id}`}
                      scroll={false}
                      // onClick={() => {
                      //   setEditingWhyChooseUsIndex(index);
                      //   setWhyChooseUsForm(item);
                      // }}
                      className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-200 rounded-md"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <Link
                      // onClick={() => setDeleteWhyChooseUsIndex(index)}
                      href={`?delete=true&id=${item._id}`}
                      scroll={false}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* modals */}
      {query.whyChooseUs === "add" && <WhyChooseUsForm />}
      {query.whyChooseUs === "edit" && (
        <WhyChooseUsForm
          initialData={whyChooseUsList.find((item) => item._id === query.id)}
          isEditMode={true}
        />
      )}
      {query.delete === "true" && (
        <DeleteModal id={query.id} fn={deleteWhyChooseUs} />
      )}
    </div>
  );
}
