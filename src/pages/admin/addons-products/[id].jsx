import axiosInstance from "@/lib/axiosInstance";
import { AddOnProductForm } from "@/components/addons-products/AddOnProductForm";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function EditProductPage({ aadOnProduct }) {
	return (
		<AdminLayout>
			<div className="space-y-6">
				<AddOnProductForm aadOnProduct={aadOnProduct} isEditing />
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps({ params }) {
	try {
		const { data } = await axiosInstance.get(`/addons-product/${params.id}`);
		return { props: { aadOnProduct: data } };
	} catch {
		return { notFound: true };
	}
}
