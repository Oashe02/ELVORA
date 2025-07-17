import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import DeleteContactButton from "@/components/contacts/DeleteContactButton";
import axiosInstance from "@/lib/axiosInstance";
import { DataTable } from "@/components/ui/data-table";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function ContactsPage({
	contacts,
	totalPages,
	currentPage,
	activeTab,
	searchQuery,
}) {
	const router = useRouter();

	// ✅ Make search and tab state reactive
	const [localSearch, setLocalSearch] = useState(searchQuery || "");
	const [tabValue, setTabValue] = useState(activeTab || "all");

	useEffect(() => {
		setTabValue(activeTab);
		setLocalSearch(searchQuery);
	}, [activeTab, searchQuery]);

	const handleTabChange = (value) => {
		setTabValue(value);
		const status = value !== "all" ? `&status=${value}` : "";
		const search = localSearch ? `&search=${encodeURIComponent(localSearch)}` : "";
		router.push(`/admin/contacts?page=1${status}${search}`);
	};

	const handlePageChange = (page) => {
		const status = tabValue !== "all" ? `&status=${tabValue}` : "";
		const search = localSearch ? `&search=${encodeURIComponent(localSearch)}` : "";
		router.push(`/admin/contacts?page=${page}${status}${search}`);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		const status = tabValue !== "all" ? `&status=${tabValue}` : "";
		const search = localSearch ? `&search=${encodeURIComponent(localSearch)}` : "";
		router.push(`/admin/contacts?page=1${status}${search}`);
	};

	const formatDate = (iso) =>
		new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(new Date(iso));

	const getStatusBadge = (status) => {
		switch (status) {
			case "new":
				return <Badge variant="success">New</Badge>;
			case "read":
				return <Badge variant="info">Read</Badge>;
			case "replied":
				return <Badge variant="purple">Replied</Badge>;
			default:
				return <Badge>{status}</Badge>;
		}
	};

	const columns = [
		{
			key: "name",
			label: "Name",
			render: (c) => <div className="font-medium">{c.name}</div>,
		},
		{ key: "email", label: "Email", render: (c) => <div>{c.email}</div> },
		{
			key: "message",
			label: "Message",
			render: (c) => <div className="max-w-[300px] truncate">{c.message}</div>,
		},
		{
			key: "date",
			label: "Date",
			render: (c) => <div>{formatDate(c.createdAt)}</div>,
		},
		{ key: "status", label: "Status", render: (c) => getStatusBadge(c.status) },
		{
			key: "actions",
			label: "Actions",
			render: (c) => (
				<div className="flex items-center gap-2">
					<Dialog>
						<DialogTrigger asChild>
							<Button
								variant="outline"
								size="sm"
								className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
							>
								<Eye className="h-4 w-4 mr-1" /> View
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[600px]">
							<DialogHeader>
								<DialogTitle>Contact Message</DialogTitle>
							</DialogHeader>
							<div className="space-y-4 mt-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<div className="text-sm font-medium">Name</div>
										<div>{c.name}</div>
									</div>
									<div>
										<div className="text-sm font-medium">Email</div>
										<div>{c.email}</div>
									</div>
								</div>
								<div>
									<div className="text-sm font-medium">Date</div>
									<div>{formatDate(c.createdAt)}</div>
								</div>
								<div>
									<div className="text-sm font-medium">Status</div>
									<div>{getStatusBadge(c.status)}</div>
								</div>
								<div>
									<div className="text-sm font-medium">Message</div>
									<div className="p-4 bg-gray-50 rounded-md mt-1 whitespace-pre-wrap">
										{c.message}
									</div>
								</div>
								<div className="flex justify-between">
									<Button
										variant="outline"
										onClick={async () => {
											await axiosInstance.patch(`/contact/${c._id}/status`, {
												status: "replied",
											});
											router.replace(router.asPath);
										}}
										className="border-purple-200 text-purple-600 hover:bg-purple-50"
									>
										Mark as Replied
									</Button>
									<a href={`mailto:${c.email}`}>
										<Button className="bg-blue-600 hover:bg-blue-700">
											Reply via Email
										</Button>
									</a>
								</div>
							</div>
						</DialogContent>
					</Dialog>
					<DeleteContactButton contactId={c._id} contactName={c.name} />
				</div>
			),
		},
	];

	return (
		<AdminLayout>
			<Head>
				<title>Contact Messages</title>
			</Head>
			<div className="space-y-6 p-8">
				<h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
				<div className="flex justify-between items-center">
					<Tabs value={tabValue} onValueChange={handleTabChange} className="flex-1">
						<TabsList>
							<TabsTrigger value="all">All</TabsTrigger>
							<TabsTrigger value="new">New</TabsTrigger>
							<TabsTrigger value="read">Read</TabsTrigger>
							<TabsTrigger value="replied">Replied</TabsTrigger>
						</TabsList>
					</Tabs>
					<form onSubmit={handleSearch} className="flex items-center space-x-2">
						<Input
							type="search"
							placeholder="Search contacts..."
							value={localSearch}
							onChange={(e) => setLocalSearch(e.target.value)}
							className="max-w-xs"
						/>
						<Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700">
							<Search className="h-4 w-4 mr-1" /> Search
						</Button>
					</form>
				</div>

				<DataTable
					data={contacts}
					columns={columns}
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps({ query, req }) {
	const page = parseInt(query.page || "1", 10);
	const statusParam = query.status || "all";
	const searchParam = query.search || "";

	const params = { page };
	if (statusParam !== "all") params.status = statusParam;
	if (searchParam) params.search = searchParam;

	try {
		const { data } = await axiosInstance.get("/contact", {
			params,
			headers: { cookie: req.headers.cookie || "" },
		});

		const { contacts, totalPages, currentPage } = data.data;

		return {
			props: {
				contacts,
				totalPages,
				currentPage,
				activeTab: statusParam,
				searchQuery: searchParam,
			},
		};
	} catch {
		return {
			props: {
				contacts: [],
				totalPages: 1,
				currentPage: page,
				activeTab: statusParam,
				searchQuery: searchParam,
			},
		};
	}
}
