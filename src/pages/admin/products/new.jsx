import AdminLayout from "@/components/layouts/AdminLayout";
import { ProductForm } from "@/components/products/ProductForm";

export default function NewProductPage() {
	return (
		<AdminLayout>
			<div className="space-y-6">
				{/* <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1> */}
				<ProductForm />
			</div>
		</AdminLayout>
	);
}
