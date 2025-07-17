import { useEffect, useState } from "react";
import CouponForm from "@/components/coupon/CouponForm";
import axiosInstance from "@/lib/axiosInstance";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function NewCouponPage() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [productsRes, categoriesRes] = await Promise.all([
					axiosInstance.get("/products", { params: { status: "active" } }),
					axiosInstance.get("/categories", { params: { status: "active" } }),
				]);

				setProducts(productsRes.data.products || []);
				setCategories(categoriesRes.data.categories || []);
			} catch (err) {
				console.error("Error fetching data:", err);
				setError("Failed to load data.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<AdminLayout>
			<div className="space-y-6">
				<h1 className="text-3xl font-bold tracking-tight">Add New Coupon</h1>
				<CouponForm products={products} categories={categories} />
			</div>
		</AdminLayout>
	);
}
