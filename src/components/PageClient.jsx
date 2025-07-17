import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "sonner"; // ← Sonner
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // adjust import barrel if needed
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

import MerchantConfig from "./MerchantConfig";
import axiosInstance from "@/lib/axiosInstance";
import AttributeMapping from "./AttributeMapping";
import SyncHistory from "./SyncHistory";

export default function PageClient({ initialConfig }) {
	const router = useRouter();
	const [loading, setLoading] = useState(!initialConfig);
	const [config, setConfig] = useState(initialConfig);
	const [err, setErr] = useState(null);

	/* --------------------------------------------------------- */
	/* Query-string feedback from Google OAuth redirect           */
	/* --------------------------------------------------------- */
	useEffect(() => {
		const { error, success } = router.query;
		if (error) toast.error(decodeURIComponent(error));
		if (success === "true")
			toast.success("Connected to Google Merchant Center");
	}, [router.query]);

	/* --------------------------------------------------------- */
	/* If we arrived without SSR data (e.g. client navigation)   */
	/* --------------------------------------------------------- */
	useEffect(() => {
		if (config) return;
		(async () => {
			try {
				const { data } = await axiosInstance.get("/google-merchant/config");
				setConfig(data);
			} catch (e) {
				setErr(e.message);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	/* ------------ thin helpers shared with child components ---*/
	const saveConfig = async (partial) => {
		console.log("Saving config", partial);
		const { data } = await axiosInstance.post(
			"/google-merchant/config",
			partial,
		);
		setConfig(data);
		return data;
	};

	const postSync = async (method = "POST") => {
		if (method === "POST") {
			await axiosInstance.get("/google-merchant/sync", { source: "manual" });
		} else {
			await axiosInstance.delete("/google-merchant/sync", {
				data: { source: "manual" },
			});
		}
		await refreshConfig();
	};

	const refreshConfig = async () => {
		const { data } = await axiosInstance.get("/google-merchant/config");
		setConfig(data);
	};

	/* --------------------------------------------------------- */

	if (loading)
		return (
			<div className="flex h-64 items-center justify-center">
				<div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
			</div>
		);

	if (!config)
		return (
			<Alert variant="destructive">
				<AlertTitle>Configuration Error</AlertTitle>
				<AlertDescription>
					{err || "Unable to load Google Merchant configuration"}
				</AlertDescription>
			</Alert>
		);

	return (
		<div className="space-y-6">
			{/* header */}
			<div className="space-y-1">
				<Button variant="ghost" size="sm" asChild>
					<Link href="/admin">← Back to Dashboard</Link>
				</Button>
				<h1 className="text-2xl font-bold">
					Google Merchant Center Integration
				</h1>
				<p className="text-muted-foreground">
					Configure and manage your Google Merchant Center integration to sync
					products
				</p>
			</div>

			<Separator />

			{/* quick actions */}
			<div className="space-y-4">
				<Button className="w-full" onClick={() => postSync("POST")}>
					Sync Now
				</Button>
				<Button
					variant="destructive"
					className="w-full"
					onClick={() => postSync("DELETE")}
				>
					Delete Products
				</Button>
			</div>

			{/* tabs */}
			<Tabs defaultValue="config" className="space-y-6">
				<TabsList>
					<TabsTrigger value="config">Configuration</TabsTrigger>
					<TabsTrigger value="mapping">Attribute Mapping</TabsTrigger>
					<TabsTrigger value="history">Sync History</TabsTrigger>
				</TabsList>

				<TabsContent value="config">
					<MerchantConfig
						config={config}
						onSave={saveConfig}
						onUnlink={async () => {
							await axiosInstance.delete("/google-merchant/auth");
							toast.success("Disconnected");
							refreshConfig();
						}}
					/>
				</TabsContent>

				<TabsContent value="mapping">
					<AttributeMapping
						config={config}
						onSave={(m) => saveConfig({ attributeMapping: m })}
					/>
				</TabsContent>

				<TabsContent value="history">
					<SyncHistory />
				</TabsContent>
			</Tabs>
		</div>
	);
}
