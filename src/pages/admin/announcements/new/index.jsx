import AnnouncementForm from "@/components/announcement/AnnouncementForm";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function NewAnnouncementPage() {
	return (
		<AdminLayout>
			<div className="space-y-6">
				<h1 className="text-3xl font-bold tracking-tight">
					Add New Announcement
				</h1>
				<AnnouncementForm />
			</div>
		</AdminLayout>
	);
}
