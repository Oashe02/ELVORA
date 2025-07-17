// components/AnnouncementTabs.js
"use client";

import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "../ui/data-table";

export default function AnnouncementTabs({
	activeTab,
	announcements,
	columns,
	currentPage,
	totalPages,
}) {
	const router = useRouter();

	const handlePageChange = (page) => {
		const statusQuery = activeTab !== "all" ? `&status=${activeTab}` : "";
		router.push(`/admin/announcements?page=${page}${statusQuery}`);
	};

	const handleTabChange = (value) => {
		const statusQuery = value !== "all" ? `&status=${value}` : "";
		router.push(`/admin/announcements?page=1${statusQuery}`);
	};

	return (
		<Tabs value={activeTab} onValueChange={handleTabChange}>
			<TabsList>
				<TabsTrigger value="all">All</TabsTrigger>
				<TabsTrigger value="active">Active</TabsTrigger>
				<TabsTrigger value="draft">Draft</TabsTrigger>
				<TabsTrigger value="unpublished">Unpublished</TabsTrigger>
			</TabsList>

			{["all", "active", "draft", "unpublished"].map((tab) => (
				<TabsContent key={tab} value={tab} className="mt-4">
					<DataTable
						data={announcements}
						columns={columns}
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</TabsContent>
			))}
		</Tabs>
	);
}
