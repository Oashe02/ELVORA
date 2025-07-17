import Head from "next/head";
import axiosInstance from "@/lib/axiosInstance";
import CouponForm from "@/components/coupon/CouponForm";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function EditCouponPage({ coupon }) {
	if (!coupon) {
		return <p>Coupon not found.</p>;
	}

	return (
		<AdminLayout>
			<Head>
				<title>Edit Coupon {coupon.code}</title>
				<meta name="description" content={`Edit coupon: ${coupon.code}`} />
			</Head>

			<div className="space-y-6 p-6">
				<h1 className="text-3xl font-bold tracking-tight">
					Edit Coupon {coupon.code}
				</h1>
				<CouponForm coupon={coupon} isEditing={true} />
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps({ params }) {
	const { id } = params;
	try {
		const response = await axiosInstance.get(`/coupons/${id}`);
		return {
			props: { coupon: response.data },
		};
	} catch (error) {
		if (error.response?.status === 404) {
			return { notFound: true };
		}
		return { props: { coupon: null } };
	}
}
