import BannerForm from "@/components/banner/BannerForm";
import axiosInstance from "@/lib/axiosInstance";
import Head from "next/head";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function EditBannerPage({ banner }) {
	// If banner is missing, render 404
	if (!banner) {
		return <div className="p-8 text-center">Banner not found</div>;
	}

	return (
		<AdminLayout>
			<Head>
				<title>Edit {banner.name}</title>
				<meta name="description" content={`Edit banner: ${banner.name}`} />
			</Head>
			<div className="space-y-6 p-8">
				<h1 className="text-3xl font-bold tracking-tight">Edit Banner</h1>
				<BannerForm banner={banner} isEditing />
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps({ params, req }) {
	const { id } = params;
	try {
		const { data } = await axiosInstance.get(`/banners/${id}`, {
			headers: { cookie: req.headers.cookie || "" },
		});
		return { props: { banner: data } };
	} catch (error) {
		return { notFound: true };
	}
}
