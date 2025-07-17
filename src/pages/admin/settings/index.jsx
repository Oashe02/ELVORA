"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { TaxSettings } from "@/components/settings/TaxSettings";
import { ShippingSettings } from "@/components/settings/ShippingSettings";
import { PaymentSettings } from "@/components/settings/PaymentSettings";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function SettingsPage() {
	const [settings, setSettings] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadSettings() {
			try {
				const { data } = await axiosInstance.get(`/settings`);
				setSettings(data);
			} catch (error) {
				console.error("Failed to load settings:", error);
			} finally {
				setLoading(false);
			}
		}

		loadSettings();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	return (
		<AdminLayout>
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Settings</h1>
					<p className="text-muted-foreground">
						Manage your store settings including taxes, shipping, and general
						configuration.
					</p>
				</div>

				<Tabs defaultValue="general" className="space-y-4">
					<TabsList>
						<TabsTrigger value="general">General</TabsTrigger>
						<TabsTrigger value="tax">Tax</TabsTrigger>
						<TabsTrigger value="shipping">Shipping</TabsTrigger>
						<TabsTrigger value="payment">Payment</TabsTrigger>
					</TabsList>

					<TabsContent value="general" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>General Settings</CardTitle>
								<CardDescription>
									Configure your store's general settings.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<GeneralSettings initialSettings={settings?.general || {}} />
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="tax" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Tax Settings</CardTitle>
								<CardDescription>
									Configure your store's tax settings.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<TaxSettings initialSettings={settings?.tax || {}} />
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="shipping" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Shipping Settings</CardTitle>
								<CardDescription>
									Configure your store's shipping methods and rates.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<ShippingSettings initialSettings={settings?.shipping || {}} />
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="payment" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Payment Settings</CardTitle>
								<CardDescription>
									Configure your store's Payment methods and rates.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<PaymentSettings initialSettings={settings?.payment || {}} />
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</AdminLayout>
	);
}
