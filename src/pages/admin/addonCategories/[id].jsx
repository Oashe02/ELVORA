import AddOnCategoryForm from "@/components/addoncategories/AddOnCategoryForm";
import axiosInstance from "@/lib/axiosInstance";
import Head from "next/head";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function EditCategoryPage({ AddOnCategory }) {
	if (!AddOnCategory) {
		return <div className="p-8 text-center">AddOn-Category not found</div>;
	}

	return (
		<AdminLayout>
			<Head>
				<title>Edit {AddOnCategory.name}</title>
				<meta name="description" content={`Edit category: ${AddOnCategory.name}`} />
			</Head>
			<div className="space-y-6 p-8">
				<h1 className="text-3xl font-bold tracking-tight">Edit AddOn-Category</h1>
				<AddOnCategoryForm addon={AddOnCategory} isEditing />
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps({ params, req }) {
	const { id } = params;
	try {
		const { data } = await axiosInstance.get(`/addons/${id}`, {
			headers: { cookie: req.headers.cookie || "" },
		});
		return { props: { AddOnCategory: data } };
	} catch (error) {
		return { notFound: true };
	}
}
