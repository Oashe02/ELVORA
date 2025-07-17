import Head from "next/head";
import AdminLayout from "@/components/layouts/AdminLayout";
import FeedPostForm from "@/components/feed/feed-post-form";
import axiosInstance from "@/lib/axiosInstance";

export default function EditFeedPostPage({ feedPost }) {
  // If feed post is missing, render 404
  if (!feedPost) {
    return <div className="p-8 text-center">Feed Post not found</div>;
  }

  return (
    <AdminLayout>
      <Head>
        <title>Edit Feed Post</title>
        <meta name="description" content={`Edit feed post: ${feedPost.caption}`} />
      </Head>
      <div className="space-y-6 p-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Feed Post</h1>
        <FeedPostForm post={feedPost} isEditing />
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ params, req }) {
  const { id } = params;

  try {
    const { data } = await axiosInstance.get(`/feed/${id}`, {
      headers: { cookie: req.headers.cookie || "" },
    });

    return {
      props: {
        feedPost: data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
