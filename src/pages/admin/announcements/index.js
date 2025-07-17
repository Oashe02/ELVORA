// pages/admin/announcements/index.js
import Link from "next/link";
import { Edit, Plus } from "lucide-react";
import AnnouncementTabs from "@/components/announcement/AnnouncementTabs";
import StatusSelector from "@/components/announcement/StatusSelector";
import DeleteAnnouncementButton from "@/components/announcement/DeleteButton";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function AnnouncementsPage({
	announcements,
	currentPage,
	totalPages,
	activeTab,
	error,
}) {
	if (error) {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
					<Link href="/admin/announcements/new">
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							Add Announcement
						</Button>
					</Link>
				</div>
				<div className="text-center py-8 text-red-500">{error}</div>
			</div>
		);
	}

	return (
		<AdminLayout>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
					<Link href="/admin/announcements/new">
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							Add Announcement
						</Button>
					</Link>
				</div>

				<AnnouncementTabs
					activeTab={activeTab}
					announcements={announcements}
					columns={[
						{
							key: "name",
							label: "Announcement",
							render: (ann) => (
								<div>
									<div className="font-medium">{ann.name}</div>
									<div className="text-sm text-muted-foreground truncate max-w-[300px]">
										{ann.title}
									</div>
								</div>
							),
						},
						{
							key: "url",
							label: "URL",
							render: (ann) => (
								<div className="max-w-[200px] truncate">
									<a
										href={ann.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-500 hover:underline"
									>
										{ann.url}
									</a>
								</div>
							),
						},
						{
							key: "priority",
							label: "Priority",
							render: (ann) => <div>{ann.priority}</div>,
						},
						{
							key: "status",
							label: "Status",
							render: (ann) => (
								<StatusSelector
									itemId={ann._id}
									currentStatus={ann.status}
									onStatusChange={async (newStatus) => {
										await axiosInstance.patch(
											`/announcements/${ann._id}/status`,
											{ status: newStatus },
										);
										window.location.reload();
									}}
								/>
							),
						},
						{
							key: "actions",
							label: "Actions",
							render: (ann) => (
								<div className="flex items-center gap-2">
									<Link href={`/admin/announcements/${ann._id}`}>
										<Button variant="outline" size="sm">
											<Edit className="h-4 w-4 mr-1" />
											Edit
										</Button>
									</Link>
									<DeleteAnnouncementButton
										announcementId={ann._id}
										announcementName={ann.name}
										onDelete={async () => {
											await axiosInstance.delete(`/announcements/${ann._id}`);
											window.location.reload();
										}}
									/>
								</div>
							),
						},
					]}
					currentPage={currentPage}
					totalPages={totalPages}
				/>
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps(context) {
	const { page = "1", status = "all" } = context.query;
	const currentPage = parseInt(page, 10);
	const filterStatus = status !== "all" ? status : undefined;

	try {
		const { data } = await axiosInstance.get("/announcements", {
			params: { page: currentPage, status: filterStatus },
			headers: { cookie: context.req.headers.cookie || "" },
		});

		return {
			props: {
				announcements: data.announcements,
				totalPages: data.totalPages,
				currentPage,
				activeTab: status,
			},
		};
	} catch (err) {
		console.log(err);

		return {
			props: {
				error: "Failed to load announcements",
			},
		};
	}
}
