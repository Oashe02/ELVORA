import AddOnCategoryForm from "@/components/addoncategories/AddOnCategoryForm";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function NewCategoryPage() {
	return (
		<AdminLayout>
			<div className="space-y-6">
				<h1 className="text-3xl font-bold tracking-tight">Add New AddOn-Category</h1>
				<AddOnCategoryForm />
			</div>
		</AdminLayout>
	);
}
