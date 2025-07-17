import CategoryForm from "@/components/categories/CategoryForm";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function NewCategoryPage() {
	return (
		<AdminLayout>
			<div className="space-y-6">
				<h1 className="text-3xl font-bold tracking-tight">Add New Category</h1>
				<CategoryForm />
			</div>
		</AdminLayout>
	);
}
