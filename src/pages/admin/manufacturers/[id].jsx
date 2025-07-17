import ManufacturerForm from "@/components/manufacturers/ManufacturerForm";
import axiosInstance from "@/lib/axiosInstance";
import Head from "next/head";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function EditManufacturerPage({ manufacturer }) {
  if (!manufacturer) {
    return <div className="p-8 text-center">Manufacturer not found</div>;
  }

  return (
    <AdminLayout>
      <Head>
        <title>Edit {manufacturer.name}</title>
        <meta name="description" content={`Edit manufacturer: ${manufacturer.name}`} />
      </Head>
      <div className="space-y-6 p-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Manufacturer</h1>
        <ManufacturerForm manufacturer={manufacturer} isEditing />
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ params, req }) {
  const { id } = params;
  try {
    const { data } = await axiosInstance.get(`/manufacturer/${id}`, {
      headers: { cookie: req.headers.cookie || "" },
    });
    return { props: { manufacturer: data } };
  } catch (error) {
    return { notFound: true };
  }
}