import Head from "next/head"
import ReviewForm from "@/components/reviews/review-form"
import AdminLayout from "@/components/layouts/AdminLayout"

export default function NewReviewPage() {
  return (
    <AdminLayout>
      <Head>
        <title>Add New Review</title>
      </Head>
      <div className="space-y-6 p-8">
        <h1 className="text-3xl font-bold tracking-tight">Add New Review</h1>
        <ReviewForm />
      </div>
    </AdminLayout>
  )
}
