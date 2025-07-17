import PageClient from "@/components/PageClient";
import axiosInstance from "@/lib/axiosInstance";
import React from "react";

// ⬇️ Server-side fetch so the first paint has data
export async function getServerSideProps() {
	try {
		const res = await axiosInstance.get(`/google-merchant/config`);
		return { props: { initialConfig: res.data } };
	} catch {
		return { props: { initialConfig: null } };
	}
}

export default function GoogleMerchantPage({ initialConfig }) {
	return <PageClient initialConfig={initialConfig} />;
}
