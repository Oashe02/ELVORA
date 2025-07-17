import React, { useState } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function AttributeMapping({ config, onSave }) {
	const [mapping, setMapping] = useState(config.attributeMapping || {});
	const [saving, setSaving] = useState(false);

	const onChange = (k, v) => setMapping((m) => ({ ...m, [k]: v }));

	const submit = async (e) => {
		e.preventDefault();
		setSaving(true);
		try {
			await onSave(mapping);
			toast.success("Mapping saved");
		} catch (e) {
			toast.error(e.message || "Save failed");
		} finally {
			setSaving(false);
		}
	};

	const field = (id, label, hint) => (
		<div>
			<Label htmlFor={id}>{label}</Label>
			<Input
				id={id}
				value={mapping[id] || ""}
				onChange={(e) => onChange(id, e.target.value)}
				placeholder={hint}
			/>
		</div>
	);

	return (
		<Card as="form" onSubmit={submit}>
			<CardHeader>
				<CardTitle>Attribute Mapping</CardTitle>
				<CardDescription>Map store fields to Google attributes</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6 md:grid-cols-2">
					{field("id", "Product ID", "_id")}
					{field("title", "Title", "name")}
					{field("description", "Description", "description")}
					{field("link", "Link", "slug")}
					{field("imageLink", "Image", "thumbnail")}
					{field("availability", "Availability", "stock")}
					{field("price", "Price", "price")}
					{field("brand", "Brand", "brand")}
					{field("gtin", "GTIN", "barcode")}
					{field("mpn", "MPN", "sku")}
					{field("condition", "Condition", "new")}
					{field("googleProductCategory", "Google Category", "")}
				</div>
				<Button className="mt-6" disabled={saving}>
					{saving ? "Saving…" : "Save"}
				</Button>
			</CardContent>
		</Card>
	);
}
