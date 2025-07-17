import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import axiosInstance from "@/lib/axiosInstance";
import { DataTable } from "@/components/ui/data-table";
import StatusSelector from "@/components/announcement/StatusSelector";
import DeleteManufacturerButton from "@/components/manufacturers/DeleteManufacturerButton";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function ManufacturersPage({
  manufacturers,
  totalPages,
  currentPage,
  activeTab,
}) {
  const router = useRouter();

  const handleTabChange = (value) => {
    const statusQuery = value !== "all" ? `&status=${value}` : "";
    router.push(`/admin/manufacturers?page=1${statusQuery}`);
  };

  const handlePageChange = (page) => {
    const status = activeTab !== "all" ? `&status=${activeTab}` : "";
    router.push(`/admin/manufacturers?page=${page}${status}`);
  };

  return (
    <AdminLayout>
      <Head>
        <title>Manufacturers</title>
      </Head>
      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Manufacturers</h1>
          <Link href="/admin/manufacturers/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Manufacturer
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
                data={manufacturers}
                columns={[
                  {
                    key: "name",
                    label: "Manufacturer",
                    render: (manufacturer) => (
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-muted overflow-hidden relative">
                          {manufacturer.thumbnail && (
                            <img
                              src={manufacturer.thumbnail}
                              alt={manufacturer.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{manufacturer.name}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {manufacturer.shortDescription}
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "priority",
                    label: "Priority",
                    render: (manufacturer) => <div>{manufacturer.priority}</div>,
                  },
                  {
                    key: "industry",
                    label: "Industry",
                    render: (manufacturer) => <div>{manufacturer.industry || "N/A"}</div>,
                  },
                  {
                    key: "rating",
                    label: "Rating",
                    render: (manufacturer) => (
                      <div>{manufacturer.rating?.average || 0} ({manufacturer.rating?.count || 0})</div>
                    ),
                  },
                  {
                    key: "status",
                    label: "Status",
                    render: (manufacturer) => (
                      <StatusSelector
                        itemId={manufacturer._id}
                        currentStatus={manufacturer.status}
                        onStatusChange={async (id, status) => {
                          try {
                            await axiosInstance.patch(`/manufacturer/${id}/status`, {
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
                        onStatusChangeComplete={() => router.replace(router.asPath)}
                      />
                    ),
                  },
                  {
                    key: "actions",
                    label: "Actions",
                    render: (manufacturer) => (
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/manufacturers/${manufacturer._id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <DeleteManufacturerButton
                          manufacturerId={manufacturer._id}
                          manufacturerName={manufacturer.name}
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
    const { data } = await axiosInstance.get("/manufacturer", {
      params,
      headers: { cookie: req.headers.cookie || "" },
    });
    return {
      props: {
        manufacturers: data.categories,
        totalPages: data.totalPages,
        currentPage: page,
        activeTab,
      },
    };
  } catch {
    return {
      props: {
        manufacturers: [],
        totalPages: 1,
        currentPage: page,
        activeTab,
      },
    };
  }
}