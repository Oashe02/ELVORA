import MakeForm from "@/components/makes/MakeForm";
import axiosInstance from "@/lib/axiosInstance";
import Head from "next/head";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function EditMakePage({ make }) {
  if (!make) {
    return <div className="p-8 text-center">Make not found</div>;
  }

  return (
    <AdminLayout>
      <Head>
        <title>Edit {make.name}</title>
        <meta name="description" content={`Edit make: ${make.name}`} />
      </Head>
      <div className="space-y-6 p-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Make</h1>
        <MakeForm make={make} isEditing />
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ params, req }) {
  const { id } = params;
  try {
    const { data } = await axiosInstance.get(`/make/${id}`, {
      headers: { cookie: req.headers.cookie || "" },
    });
    return { props: { make: data } };
  } catch (error) {
    return { notFound: true };
  }
}