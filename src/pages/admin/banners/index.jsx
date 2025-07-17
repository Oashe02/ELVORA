// pages/admin/banners/index.js
import Head from "next/head";
import Link from "next/link";
import { Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import axiosInstance from "@/lib/axiosInstance";
import { DeleteBannerButton } from "@/components/banner/DeleteBannerButton";
import BannerStatusSelector from "@/components/banner/BannerStatusSelector";
import BannerTabsWrapper from "@/components/banner/BannerTabsWrapper";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function BannersPage({
	banners,
	totalPages,
	currentPage,
	activeTab,
}) {
	return (
		<AdminLayout>
			<Head>
				<title>Banners</title>
			</Head>
			<div className="space-y-6 p-8">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold tracking-tight">Banners</h1>
					<Link href="/admin/banners/new">
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							Add Banner
						</Button>
					</Link>
				</div>

				<BannerTabsWrapper activeTab={activeTab}>
					<DataTable
						data={banners}
						columns={[
							{
								key: "name",
								label: "Banner",
								render: (banner) => (
									<div className="flex items-center gap-3">
										<div className="h-10 w-10 rounded-md bg-muted overflow-hidden relative">
											{banner.thumbnail ? (
												<img
													src={banner.thumbnail}
													alt={banner.name}
													className="h-full w-full object-cover"
												/>
											) : (
												<div className="h-full w-full bg-gray-200" />
											)}
										</div>
										<div>
											<div className="font-medium">{banner.name}</div>
											<div className="text-sm text-muted-foreground truncate max-w-[200px]">
												{banner.title}
											</div>
										</div>
									</div>
								),
							},
							{
								key: "url",
								label: "URL",
								render: (banner) => (
									<div className="max-w-[200px] truncate">
										<a
											href={banner.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-500 hover:underline"
										>
											{banner.url}
										</a>
									</div>
								),
							},
							{
								key: "priority",
								label: "Priority",
								render: (banner) => <div>{banner.priority}</div>,
							},
							{
								key: "status",
								label: "Status",
								render: (banner) => (
									<BannerStatusSelector
										bannerId={banner._id}
										currentStatus={banner.status}
									/>
								),
							},
							{
								key: "actions",
								label: "Actions",
								render: (banner) => (
									<div className="flex items-center gap-2">
										<Link href={`/admin/banners/${banner._id}`}>
											<Button variant="outline" size="sm">
												<Edit className="h-4 w-4 mr-1" />
												Edit
											</Button>
										</Link>
										<DeleteBannerButton
											bannerId={banner._id}
											bannerName={banner.name}
										/>
									</div>
								),
							},
						]}
						currentPage={currentPage}
						totalPages={totalPages}
					/>
				</BannerTabsWrapper>
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps({ query, req }) {
	const page = parseInt(query.page || "1", 10);
	const statusParam = query.status || "all";
	const activeTab = statusParam;
	const params = { page };
	if (statusParam !== "all") {
		params.status = statusParam;
	}

	try {
		const { data } = await axiosInstance.get("/banners", {
			params,
			headers: { cookie: req.headers.cookie || "" },
		});

		return {
			props: {
				banners: data.banners,
				totalPages: data.totalPages,
				currentPage: page,
				activeTab,
			},
		};
	} catch (error) {
		return {
			props: {
				banners: [],
				totalPages: 1,
				currentPage: page,
				activeTab,
			},
		};
	}
}
