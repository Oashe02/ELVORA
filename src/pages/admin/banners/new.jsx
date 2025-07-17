import BannerForm from "@/components/banner/BannerForm";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function NewBannerPage() {
	return (
		<AdminLayout>
			<div className="space-y-6">
				<h1 className="text-3xl font-bold tracking-tight">Add New Banner</h1>
				<BannerForm />
			</div>
		</AdminLayout>
	);
}
