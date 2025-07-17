// pages/admin/car-models/index.js
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import axiosInstance from "@/lib/axiosInstance";
import { DataTable } from "@/components/ui/data-table";
import StatusSelector from "@/components/announcement/StatusSelector";
import DeleteCarModelButton from "@/components/car-models/DeleteCarModelButton";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function CarModelsPage({
  carModels,
  totalPages,
  currentPage,
  activeTab,
}) {
  const router = useRouter();

  const handleTabChange = (value) => {
    const statusQuery = value !== "all" ? `&status=${value}` : "";
    router.push(`/admin/car-models?page=1${statusQuery}`);
  };

  const handlePageChange = (page) => {
    const status = activeTab !== "all" ? `&status=${activeTab}` : "";
    router.push(`/admin/car-models?page=${page}${status}`);
  };

  return (
    <AdminLayout>
      <Head>
        <title>Car Models</title>
      </Head>
      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Car Models</h1>
          <Link href="/admin/car-models/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Car Model
            </Button>
          </Link>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="unpublished">Unpublished</TabsTrigger>
          </TabsList>

          {["all", "active", "draft", "unpublished"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <DataTable
                data={carModels}
                columns={[
                  {
                    key: "name",
                    label: "Model",
                    render: (model) => (
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-muted overflow-hidden relative">
                          {model.thumbnail && (
                            <img
                              src={model.thumbnail}
                              alt={model.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{model.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {model.make?.name || "No make"}
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "year",
                    label: "Year",
                    render: (model) => <div>{model.year || "N/A"}</div>,
                  },
                  {
                    key: "bodyType",
                    label: "Body Type",
                    render: (model) => <div>{model.bodyType || "N/A"}</div>,
                  },
                  {
                    key: "price",
                    label: "Price",
                    render: (model) => (
                      <div>
                        {model.price ? `$${model.price.toLocaleString()}` : "N/A"}
                      </div>
                    ),
                  },
                  {
                    key: "status",
                    label: "Status",
                    render: (model) => (
                      <StatusSelector
                        itemId={model._id}
                        currentStatus={model.status}
                        onStatusChange={async (id, status) => {
                          try {
                            await axiosInstance.patch(`/model/${id}/status`, {
                              status,
                            });
                            router.replace(router.asPath);
                            return { success: true };
                          } catch {
                            return {
                              success: false,
                              error: "Failed to update status",
                            };
                          }
                        }}
                      />
                    ),
                  },
                  {
                    key: "actions",
                    label: "Actions",
                    render: (model) => (
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/car-models/${model._id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <DeleteCarModelButton 
                          modelId={model._id} 
                          modelName={model.name} 
                        />
                      </div>
                    ),
                  },
                ]}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ query, req }) {
  const page = parseInt(query.page || "1", 10);
  const statusParam = query.status || "all";
  const activeTab = statusParam;

  const params = { page };
  if (statusParam !== "all") params.status = statusParam;

  try {
    const { data } = await axiosInstance.get("/model", {
      params,
      headers: { cookie: req.headers.cookie || "" },
    });
    return {
      props: {
        carModels: data.categories,
        totalPages: data.totalPages,
        currentPage: page,
        activeTab,
      },
    };
  } catch {
    return {
      props: {
        carModels: [],
        totalPages: 1,
        currentPage: page,
        activeTab,
      },
    };
  }
}