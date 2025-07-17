// pages/admin/announcements/[id]/edit.js
import Head from "next/head";
import axiosInstance from "@/lib/axiosInstance";
import AnnouncementForm from "@/components/announcement/AnnouncementForm";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function EditAnnouncementPage({ announcement }) {
	if (!announcement) {
		return <div className="p-8 text-center">Announcement not found</div>;
	}

	return (
		<AdminLayout>
			<Head>
				<title>Edit {announcement.name}</title>
				<meta
					name="description"
					content={`Edit announcement: ${announcement.name}`}
				/>
			</Head>
			<div className="space-y-6 p-8">
				<h1 className="text-3xl font-bold tracking-tight">Edit Announcement</h1>
				<AnnouncementForm announcement={announcement} isEditing />
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps(context) {
	const { id } = context.params;

	try {
		const { data } = await axiosInstance.get(`/announcements/${id}`, {
			headers: { cookie: context.req.headers.cookie || "" },
		});
		return { props: { announcement: data } };
	} catch (err) {
		return { props: { announcement: null } };
	}
}
