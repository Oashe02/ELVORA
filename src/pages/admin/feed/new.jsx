import FeedPostForm from "@/components/feed/feed-post-form"; 
import AdminLayout from "@/components/layouts/AdminLayout";

export default function NewFeedPage() {
	return (
		<AdminLayout>
			<div className="space-y-6">
				<h1 className="text-3xl font-bold tracking-tight">Add New Feed</h1>
				<FeedPostForm />
			</div>
		</AdminLayout>
	);
}
