import Head from "next/head";
import AdminLayout from "@/components/layouts/AdminLayout";
import FaqForm from "@/components/faq/FaqForm"; 
import axiosInstance from "@/lib/axiosInstance";

export default function EditFaqPage({ faq }) {
  if (!faq) {
    return <div className="p-8 text-center">FAQ not found</div>;
  }

  return (
    <AdminLayout>
      <Head>
        <title>Edit FAQ</title>
        <meta name="description" content={`Edit FAQ: ${faq.question}`} />
      </Head>
      <div className="space-y-6 p-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit FAQ</h1>
        <FaqForm faq={faq} isEditing />
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ params, req }) {
  const { id } = params;

  try {
    const { data } = await axiosInstance.get(`/faq/${id}`, {
      headers: { cookie: req.headers.cookie || "" },
    });

    return {
      props: {
        faq: data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}