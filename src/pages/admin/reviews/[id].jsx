import Head from "next/head"
import AdminLayout from "@/components/layouts/AdminLayout"
import ReviewForm from "@/components/reviews/review-form"

export default function EditReviewPage({ reviewId }) {
  return (
    <AdminLayout>
      <Head>
        <title>Edit Review</title>
      </Head>
      <div className="space-y-6 p-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Review</h1>
        <ReviewForm reviewId={reviewId} />
      </div>
    </AdminLayout>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params

  return {
    props: {
      reviewId: id,
    },
  }
}
