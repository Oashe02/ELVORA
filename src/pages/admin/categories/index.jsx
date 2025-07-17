// pages/admin/categories/index.js
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import axiosInstance from "@/lib/axiosInstance";
import { DataTable } from "@/components/ui/data-table";
import StatusSelector from "@/components/announcement/StatusSelector";
import DeleteCategoryButton from "@/components/categories/DeleteCategoryButton";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function CategoriesPage({
	categories,
	totalPages,
	currentPage,
	activeTab,
}) {
	const router = useRouter();

	const handleTabChange = (value) => {
		const statusQuery = value !== "all" ? `&status=${value}` : "";
		router.push(`/admin/categories?page=1${statusQuery}`);
	};

	const handlePageChange = (page) => {
		const status = activeTab !== "all" ? `&status=${activeTab}` : "";
		router.push(`/admin/categories?page=${page}${status}`);
	};

	return (
		<AdminLayout>
			<Head>
				<title>Categories</title>
			</Head>
			<div className="space-y-6 p-8">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold tracking-tight">Categories</h1>
					<Link href="/admin/categories/new">
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							Add Category
						</Button>
					</Link>
				</div>

				<Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
					<TabsList>
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="active">Active</TabsTrigger>
						<TabsTrigger value="draft">Draft</TabsTrigger>
						<TabsTrigger value="unpublished">Unpublished</TabsTrigger>
					</TabsList>

					{["all", "active", "draft", "unpublished"].map((tab) => (
						<TabsContent key={tab} value={tab} className="mt-4">
							<DataTable
								data={categories}
								columns={[
									{
										key: "name",
										label: "Category",
										render: (cat) => (
											<div className="flex items-center gap-3">
												<div className="h-10 w-10 rounded-md bg-muted overflow-hidden relative">
													{cat.thumbnail && (
														<img
															src={cat.thumbnail}
															alt={cat.name}
															className="h-full w-full object-cover"
														/>
													)}
												</div>
												<div>
													<div className="font-medium">{cat.name}</div>
													<div className="text-sm text-muted-foreground truncate max-w-[200px]">
														{cat.shortDescription}
													</div>
												</div>
											</div>
										),
									},
									{
										key: "priority",
										label: "Priority",
										render: (cat) => <div>{cat.priority}</div>,
									},
									{
										key: "status",
										label: "Status",
										render: (cat) => (
											<StatusSelector
												itemId={cat._id}
												currentStatus={cat.status}
												onStatusChange={async (id, status) => {
													try {
														await axiosInstance.patch(
															`/categories/${id}/status`,
															{ status },
														);
														router.replace(router.asPath);
														return { success: true };
													} catch {
														return {
															success: false,
															error: "Failed to update status",
														};
													}
												}}
												onStatusChangeComplete={() =>
													router.replace(router.asPath)
												}
											/>
										),
									},
									{
										key: "actions",
										label: "Actions",
										render: (cat) => (
											<div className="flex items-center gap-2">
												<Link href={`/admin/categories/${cat._id}`}>
													{" "}
													{/* note: use _id */}
													<Button variant="outline" size="sm">
														<Edit className="h-4 w-4 mr-1" />
														Edit
													</Button>
												</Link>
												<DeleteCategoryButton
													categoryId={cat._id}
													categoryName={cat.name}
												/>
											</div>
										),
									},
								]}
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps({ query, req }) {
	const page = parseInt(query.page || "1", 10);
	const statusParam = query.status || "all";
	const activeTab = statusParam;

	const params = { page };
	if (statusParam !== "all") params.status = statusParam;

	try {
		const { data } = await axiosInstance.get("/categories", {
			params,
			headers: { cookie: req.headers.cookie || "" },
		});
		return {
			props: {
				categories: data.categories,
				totalPages: data.totalPages,
				currentPage: page,
				activeTab,
			},
		};
	} catch {
		return {
			props: {
				categories: [],
				totalPages: 1,
				currentPage: page,
				activeTab,
			},
		};
	}
}
