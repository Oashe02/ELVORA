import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DeleteFaqButton } from "@/components/faq/DeleteFaqButton"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/layouts/AdminLayout";
import axiosInstance from "@/lib/axiosInstance";

export default function FaqPage({ faqs, totalPages, currentPage }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const refreshData = () => router.replace(router.asPath);

  const handlePageChange = (page) => {
    router.push(`/admin/faq?page=${page}`);
  };

  const handleTabChange = (value) => {
    router.push(`/admin/faq?page=1${value === "all" ? "" : `&isActive=${value === "active"}`}`);
  };

  const columns = [
    {
      key: "question",
      label: "Question",
      render: (faq) => <div className="max-w-[300px] truncate">{faq.question}</div>,
    },
    {
      key: "answer",
      label: "Answer",
      render: (faq) => <div className="max-w-[300px] truncate">{faq.answer}</div>,
    },
    {
      key: "isActive",
      label: "Active",
      render: (faq) => (faq.isActive ? "Yes" : "No"),
    },
    {
      key: "actions",
      label: "Actions",
      render: (faq) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/faq/${faq._id}`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </Link>
          <DeleteFaqButton faqId={faq._id} faqQuestion={faq.question.substring(0, 20)} />
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Head>
        <title>FAQs</title>
      </Head>
      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">FAQs</h1>
          <Link href="/admin/faq/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add FAQ
            </Button>
          </Link>
        </div>
        <Tabs defaultValue="all" onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <DataTable
                data={faqs}
                columns={columns}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ query, req }) {
  const page = parseInt(query.page || "1", 10);
  const isActiveParam = query.isActive;

  const params = { page };
  if (isActiveParam !== undefined) params.isActive = isActiveParam === "true";

  try {
    const { data } = await axiosInstance.get("/faq", {
      params,
      headers: { cookie: req.headers.cookie || "" },
    });

    return {
      props: {
        faqs: data || [],
        totalPages: data.totalPages || 1,
        currentPage: data.currentPage || page,
      },
    };
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return {
      props: {
        faqs: [],
        totalPages: 1,
        currentPage: page,
      },
    };
  }
}