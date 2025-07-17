import CategoryForm from "@/components/categories/CategoryForm";
import axiosInstance from "@/lib/axiosInstance";
import Head from "next/head";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function EditCategoryPage({ category }) {
	if (!category) {
		return <div className="p-8 text-center">Category not found</div>;
	}

	return (
		<AdminLayout>
			<Head>
				<title>Edit {category.name}</title>
				<meta name="description" content={`Edit category: ${category.name}`} />
			</Head>
			<div className="space-y-6 p-8">
				<h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
				<CategoryForm category={category} isEditing />
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps({ params, req }) {
	const { id } = params;
	try {
		const { data } = await axiosInstance.get(`/categories/${id}`, {
			headers: { cookie: req.headers.cookie || "" },
		});
		return { props: { category: data } };
	} catch (error) {
		return { notFound: true };
	}
}
