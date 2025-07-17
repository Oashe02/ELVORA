import axiosInstance from "@/lib/axiosInstance";
import { ProductForm } from "@/components/products/ProductForm";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function EditProductPage({ product }) {
	return (
		<AdminLayout>
			<div className="space-y-6">
				<ProductForm product={product} isEditing />
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps({ params }) {
	try {
		const { data } = await axiosInstance.get(`/products/${params.id}`);
		return { props: { product: data } };
	} catch {
		return { notFound: true };
	}
}
