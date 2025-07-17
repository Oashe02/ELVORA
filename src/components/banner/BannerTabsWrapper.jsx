"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

export default function BannerTabsWrapper({ activeTab, children }) {
	const router = useRouter();

	const handleTabChange = (value) => {
		const statusQuery = value !== "all" ? `&status=${value}` : "";
		router.push(`/admin/banners?page=1${statusQuery}`);
	};

	return (
		<Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
			<TabsList>
				<TabsTrigger value="all">All</TabsTrigger>
				<TabsTrigger value="active">Active</TabsTrigger>
				<TabsTrigger value="draft">Draft</TabsTrigger>
				<TabsTrigger value="unpublished">Unpublished</TabsTrigger>
			</TabsList>
			<TabsContent value={activeTab} className="mt-4">
				{children}
			</TabsContent>
		</Tabs>
	);
}
