// pages/admin/car-models/[id].js
import CarModelForm from "@/components/car-models/CarModelForm";
import axiosInstance from "@/lib/axiosInstance";
import Head from "next/head";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function EditCarModelPage({ carModel }) {
  if (!carModel) {
    return <div className="p-8 text-center">Car model not found</div>;
  }

  return (
    <AdminLayout>
      <Head>
        <title>Edit {carModel.name}</title>
        <meta name="description" content={`Edit car model: ${carModel.name}`} />
      </Head>
      <div className="space-y-6 p-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Car Model</h1>
        <CarModelForm carModel={carModel} isEditing />
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ params, req }) {
  const { id } = params;
  try {
    const { data } = await axiosInstance.get(`/model/${id}`, {
      headers: { cookie: req.headers.cookie || "" },
    });
    return { props: { carModel: data } };
  } catch (error) {
    return { notFound: true };
  }
}