import React, { useEffect, useState } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { AlertCircle, Check, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "./ui/badge";
import axiosInstance from "@/lib/axiosInstance";

export default function SyncHistory() {
	const [history, setHistory] = useState([]);
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const res = await axiosInstance.get(`/google-merchant/history`);
				setHistory(res.data.history || []);
			} catch (e) {
				setErr(e.message);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return spinnerCard();
	if (err) return errorCard(err);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Sync History</CardTitle>
				<CardDescription>Recent synchronisations</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{history.length === 0 && (
					<p className="text-center text-muted-foreground">No sync history</p>
				)}
				{history.map((h, i) => (
					<div key={i} className="border rounded p-4 space-y-2">
						<div className="flex justify-between">
							<div className="flex items-center gap-2">
								{h.success ? (
									<Check className="h-5 w-5 text-green-500" />
								) : (
									<AlertCircle className="h-5 w-5 text-red-500" />
								)}
								<span className="font-medium">
									{h.success ? "Successful" : "Failed"} sync
								</span>
							</div>
							<Badge variant={h.source === "auto" ? "outline" : "default"}>
								{h.source === "auto" ? "Automatic" : "Manual"}
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground">
							{formatDistanceToNow(new Date(h.syncDate), { addSuffix: true })}
						</p>
						<div className="grid grid-cols-3 gap-2 text-sm">
							<Stat label="Total" val={h.totalProducts} />
							<Stat label="Successful" val={h.successCount} color="green" />
							<Stat label="Failed" val={h.errorCount} color="red" />
						</div>
						{h.errors?.length > 0 && (
							<details className="text-sm">
								<summary>Errors ({h.errors.length})</summary>
								<ul className="pl-4 list-disc space-y-1">
									{h.errors.slice(0, 3).map((e, idx) => (
										<li key={idx}>
											<span className="font-medium">{e.productId}</span> –{" "}
											{e.message}
										</li>
									))}
									{h.errors.length > 3 && (
										<li>…and {h.errors.length - 3} more</li>
									)}
								</ul>
							</details>
						)}
					</div>
				))}
			</CardContent>
		</Card>
	);
}

/* helpers */
const spinnerCard = () => (
	<Card>
		<CardHeader>
			<CardTitle>Sync History</CardTitle>
		</CardHeader>
		<CardContent className="flex justify-center py-8">
			<RefreshCw className="h-8 w-8 animate-spin text-primary" />
		</CardContent>
	</Card>
);
const errorCard = (msg) => (
	<Card>
		<CardHeader>
			<CardTitle>Sync History</CardTitle>
		</CardHeader>
		<CardContent className="text-red-500 flex items-center gap-2">
			<AlertCircle className="h-5 w-5" />
			{msg}
		</CardContent>
	</Card>
);
const Stat = ({ label, val, color }) => (
	<div>
		<div className="font-medium">{label}</div>
		<div className={color ? `text-${color}-600` : "text-muted-foreground"}>
			{val}
		</div>
	</div>
);
