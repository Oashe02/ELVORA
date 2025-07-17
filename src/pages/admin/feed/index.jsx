import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DeleteFeedPostButton } from "@/components/feed/delete-feed-post-button";
import { FeedPostStatusSelector } from "@/components/feed/feed-post-status-selector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/layouts/AdminLayout";
import axiosInstance from "@/lib/axiosInstance";

export default function FeedPostsPage({ posts, totalPages, currentPage, activeTab, tag }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const refreshData = () => router.replace(router.asPath);

  const handlePageChange = (page) => {
    const status = activeTab !== "all" ? `&status=${activeTab}` : "";
    const tagParam = tag ? `&tag=${tag}` : "";
    router.push(`/admin/feed?page=${page}${status}${tagParam}`);
  };

  const handleTabChange = (value) => {
    const status = value !== "all" ? `&status=${value}` : "";
    const tagParam = tag ? `&tag=${tag}` : "";
    router.push(`/admin/feed?page=1${status}${tagParam}`);
  };

  const handleStatusChange = () => refreshData();

  const columns = [
    {
      key: "media",
      label: "Media",
      render: (post) => (
        <div className="h-12 w-12 rounded-md bg-muted overflow-hidden relative">
          {post.media?.length > 0 &&
            (post.media[0].type === "image" ? (
              <img
                src={post.media[0].url || "/placeholder.svg"}
                alt="Post media"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
              </div>
            ))}
        </div>
      ),
    },
    {
      key: "caption",
      label: "Caption",
      render: (post) => <div className="max-w-[300px] truncate">{post.caption}</div>,
    },
    {
      key: "tags",
      label: "Tags",
      render: (post) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {post.tags.map((tag, i) => (
            <span key={i} className="bg-muted text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      ),
    },
    // {
    //   key: "likes",
    //   label: "Likes",
    //   render: (post) => <div>{post.likes}</div>,
    // },
    {
      key: "status",
      label: "Status",
      render: (post) => (
        <FeedPostStatusSelector
          postId={post._id}
          currentStatus={post.status}
          onStatusChange={handleStatusChange}
        />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (post) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/feed/${post._id}`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </Link>
          <DeleteFeedPostButton
            postId={post._id}
            postCaption={post.caption.substring(0, 20)}
            onDelete={refreshData}
          />
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Head>
        <title>Feed Posts</title>
      </Head>

      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Feed Posts</h1>
          <Link href="/admin/feed/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Post
            </Button>
          </Link>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <DataTable
                data={posts}
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
  const statusParam = query.status || "all";
  const tag = query.tag || null;
  const params = { page };

  if (statusParam !== "all") params.status = statusParam;
  if (tag) params.tag = tag;

  try {
    const { data } = await axiosInstance.get("/feed", {
      params,
      headers: { cookie: req.headers.cookie || "" },
    });

    return {
      props: {
        posts: data.posts || [],
        totalPages: data.totalPages || 1,
        currentPage: data.currentPage || page,
        activeTab: statusParam,
        tag,
      },
    };
  } catch (error) {
    console.error("Error fetching feed posts:", error);
    return {
      props: {
        posts: [],
        totalPages: 1,
        currentPage: page,
        activeTab: statusParam,
        tag,
      },
    };
  }
}
