import React, { useState } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card"; // adjust barrel
import { Link2, CheckCircle, Unlink } from "lucide-react";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import axiosInstance from "@/lib/axiosInstance";

export default function MerchantConfig({ config, onSave, onUnlink }) {
	const [form, setForm] = useState({
		merchantId: config.merchantId || "",
		isConnected: config.isConnected || false,
		autoSync: config.autoSync || false,
		syncFrequency: config.syncFrequency || "daily",
		syncTime: config.syncTime || "00:00",
		defaultCurrency: config.defaultShipping?.currency || "USD",
		defaultCountry: config.defaultCountry || "US",
		defaultLanguage: config.defaultLanguage || "en",
		domain: config.domain || "",
		defaultShipping: {
			service: config.defaultShipping?.service || "Standard Shipping",
			price: config.defaultShipping?.price || 0,
			currency: config.defaultShipping?.currency || "USD",
		},
		defaultTax: {
			rate: config.defaultTax?.rate || 0,
			country: config.defaultCountry || "US",
			region: config.defaultTax?.region || "",
		},
	});
	const [busy, setBusy] = useState({
		save: false,
		connect: false,
		unlink: false,
	});

	const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

	const submit = async (e) => {
		e.preventDefault();
		try {
			setBusy((b) => ({ ...b, save: true }));
			await onSave(form);
			toast.success("Settings saved");
		} catch (err) {
			toast.error(err.message || "Save failed");
		} finally {
			setBusy((b) => ({ ...b, save: false }));
		}
	};

	const connect = async () => {
		if (!form.merchantId) return toast.error("Merchant ID required");
		try {
			setBusy((b) => ({ ...b, connect: true }));
			await onSave({ merchantId: form.merchantId, isConnected: true });
			const { data } = await axiosInstance.get("/google-merchant/auth/url");
			console.log({ data });
			const { url } = data;
			if (url) window.location.href = url;
		} catch (err) {
			toast.error(err.message);
		} finally {
			setBusy((b) => ({ ...b, connect: false }));
		}
	};

	return (
		<Card>
			<form onSubmit={submit}>
				<CardHeader>
					<CardTitle>Google Merchant Settings</CardTitle>
					<CardDescription>Connect and configure defaults …</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* IDs */}
					<div className="grid gap-4 md:grid-cols-2">
						<div>
							<Label htmlFor="merchantId">Merchant ID</Label>
							<Input
								id="merchantId"
								required
								value={form.merchantId}
								onChange={(e) => update("merchantId", e.target.value)}
							/>
						</div>
						<div>
							<Label htmlFor="domain">Domain</Label>
							<Input
								id="domain"
								value={form.domain}
								onChange={(e) => update("domain", e.target.value)}
								placeholder="e.g. example.com"
							/>
						</div>
					</div>

					{/* Defaults */}
					<div className="grid gap-4 md:grid-cols-3">
						<SelectField
							id="country"
							label="Country"
							value={form.defaultCountry}
							onChange={(v) => update("defaultCountry", v)}
							opts={["AE", "IN", "US", "CA", "GB", "AU", "DE", "FR"]}
						/>
						<SelectField
							id="lang"
							label="Language"
							value={form.defaultLanguage}
							onChange={(v) => update("defaultLanguage", v)}
							opts={["en", "ar", "hi", "fr", "de", "es"]}
						/>
					</div>

					{/* Shipping */}
					<div className="space-y-4">
						<h3 className="font-medium">Default Shipping</h3>
						<div className="grid gap-4 md:grid-cols-3">
							<div>
								<Label htmlFor="shipping-service">Service</Label>
								<Input
									id="shipping-service"
									value={form.defaultShipping.service}
									onChange={(e) =>
										update("defaultShipping", {
											...form.defaultShipping,
											service: e.target.value,
										})
									}
								/>
							</div>
							<div>
								<Label htmlFor="shipping-price">Price</Label>
								<Input
									id="shipping-price"
									type="number"
									min="0"
									step="0.01"
									value={form.defaultShipping.price}
									onChange={(e) =>
										update("defaultShipping", {
											...form.defaultShipping,
											price: parseFloat(e.target.value),
										})
									}
								/>
							</div>
							<div>
								<SelectField
									id="shipping-currency"
									label="Currency"
									value={form.defaultShipping.currency}
									onChange={(v) =>
										update("defaultShipping", {
											...form.defaultShipping,
											currency: v,
										})
									}
									opts={["AED", "INR", "USD", "EUR", "GBP", "CAD", "AUD"]}
								/>
							</div>
						</div>
					</div>

					{/* Tax */}
					<div className="space-y-4">
						<h3 className="font-medium">Default Tax</h3>
						<div className="grid gap-4 md:grid-cols-3">
							<div>
								<Label htmlFor="tax-rate">Rate (%)</Label>
								<Input
									id="tax-rate"
									type="number"
									min="0"
									max="100"
									step="0.01"
									value={form.defaultTax.rate}
									onChange={(e) =>
										update("defaultTax", {
											...form.defaultTax,
											rate: parseFloat(e.target.value),
										})
									}
								/>
							</div>
							{/* <div>
								<Label htmlFor="tax-country">Country</Label>
								<Input
									id="tax-country"
									value={form.defaultTax.country}
									onChange={(e) =>
										update("defaultTax", {
											...form.defaultTax,
											country: e.target.value,
										})
									}
								/>
							</div> */}
							<div>
								<Label htmlFor="tax-region">Region</Label>
								<Input
									id="tax-region"
									value={form.defaultTax.region}
									onChange={(e) =>
										update("defaultTax", {
											...form.defaultTax,
											region: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>

					{/* Auto-sync toggle */}
					<div className="flex items-center space-x-3">
						<Switch
							id="auto"
							checked={form.autoSync}
							onCheckedChange={(v) => update("autoSync", v)}
						/>
						<Label htmlFor="auto">Enable automatic sync</Label>
					</div>
					{form.autoSync && (
						<div className="grid gap-4 md:grid-cols-2 pl-6 border-l">
							<SelectField
								id="freq"
								label="Frequency"
								value={form.syncFrequency}
								onChange={(v) => update("syncFrequency", v)}
								opts={[
									{ v: "daily", t: "Daily" },
									{ v: "weekly", t: "Weekly" },
									{ v: "monthly", t: "Monthly" },
								]}
							/>
							<div>
								<Label htmlFor="time">Time</Label>
								<Input
									id="time"
									type="time"
									value={form.syncTime}
									onChange={(e) => update("syncTime", e.target.value)}
								/>
							</div>
						</div>
					)}
				</CardContent>

				<CardFooter className="flex justify-between gap-2">
					{!config.isConnected ? (
						<Button
							type="button"
							variant="outline"
							onClick={connect}
							disabled={busy.connect}
						>
							<Link2 className="mr-2 h-4 w-4" />
							{busy.connect ? "Connecting…" : "Connect"}
						</Button>
					) : (
						<>
							<Button variant="outline" disabled className="bg-green-50">
								<CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
								Connected
							</Button>
							<Button
								variant="outline"
								className="text-red-500"
								disabled={busy.unlink}
								onClick={() => {
									setBusy((b) => ({ ...b, unlink: true }));
									onUnlink?.().finally(() =>
										setBusy((b) => ({ ...b, unlink: false })),
									);
								}}
							>
								<Unlink className="mr-2 h-4 w-4" />
								{busy.unlink ? "Disconnecting…" : "Disconnect"}
							</Button>
						</>
					)}

					<Button type="submit">{busy.save ? "Saving…" : "Save"}</Button>
				</CardFooter>
			</form>
		</Card>
	);
}

/* ---------- tiny helper component for select -------------------------- */
function SelectField({ id, label, value, onChange, opts }) {
	return (
		<div>
			<Label htmlFor={id}>{label}</Label>
			<Select value={value} onValueChange={onChange}>
				<SelectTrigger id={id}>
					<SelectValue placeholder={`Select ${label.toLowerCase()}`} />
				</SelectTrigger>
				<SelectContent>
					{(opts || []).map((o) =>
						typeof o === "string" ? (
							<SelectItem key={o} value={o}>
								{o}
							</SelectItem>
						) : (
							<SelectItem key={o.v} value={o.v}>
								{o.t}
							</SelectItem>
						),
					)}
				</SelectContent>
			</Select>
		</div>
	);
}
