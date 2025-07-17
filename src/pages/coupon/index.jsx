import axiosInstance from "@/lib/axiosInstance";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import CouponCard from "@/components/cards/CouponCard";
import Layout from "@/components/layouts/Layout";



export default function CouponsPage({ coupons, announcements,products, categories }) {
	return (
		<Layout announcements={announcements}  products={products} categories={categories}>
			<SeoWrapper
				title="Latest Coupons - Volvo Parts UAE"
				description="Browse the latest active discount coupons for Volvo spare parts in UAE. Get the best deals on original Volvo products."
				canonicalUrl="https://volvopartsuae.com/coupons"
			>
				<div className="container mx-auto px-4 pt-32 pb-8">
					<h1 className="text-3xl font-bold mb-6">Active Coupons</h1>
					{coupons.length === 0 ? (
						<p>No active coupons at the moment. Please check back later!</p>
					) : (
						<div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
							{coupons.map((coupon) => (
								<CouponCard key={coupon._id} coupon={coupon} />
							))}
						</div>
					)}
				</div>
			</SeoWrapper>
		</Layout>

	);
}




export async function getStaticProps() {
  try {
    const [couponsRes, announcementsRes, productsRes, categoriesRes] = await Promise.all([
      axiosInstance.get("/public/coupons"),
      axiosInstance.get("/announcements"),
      axiosInstance.get("/products?featured=true"),
      axiosInstance.get("/categories?status=active"),
    ]);

    return {
      props: {
        coupons: couponsRes.data?.coupons || [],
        announcements: announcementsRes.data?.announcements || [],
        products: productsRes.data?.products || [],
        categories: categoriesRes.data?.categories || [],
      },
      revalidate: 3600, 
    };
  } catch (error) {
    console.error("Error in getStaticProps:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      stack: error.stack,
    });

    return {
      props: {
        coupons: [],
        announcements: [],
        products: [],
        categories: [],
      },
      revalidate: 3600,
    };
  }
}









