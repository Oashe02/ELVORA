import Link from "next/link";
import { Package, LogOut } from "lucide-react";
import { useState } from "react";

import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { ChevronDown } from "lucide-react";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";


export default function AdminLayout({ children }) {
	const { user, status, logout } = useAuthStore();
	const router = useRouter();
	console.log({ user, status });

	const navLinks = [
		{ href: "/admin", label: "Dashboard" },
		{ href: "/admin/products", label: "Products" },
		{ href: "/admin/addons-products", label: "AddOn-Products" },
		{ href: "/admin/reviews", label: "Reviews" },
		{ href: "/admin/categories", label: "Categories" },
		{ href: "/admin/addonCategories", label: "AddOn-Categories" },
		{ href: "/admin/orders", label: "Orders" },
		{ href: "/admin/coupons", label: "Coupons" },
		{ href: "/admin/banners", label: "Banners" },
		{ href: "/admin/feed", label: "Feed" },
		{ href: "/admin/faq", label: "FAQ" },
		{ href: "/admin/contacts", label: "Contacts" },
		{ href: "/admin/announcements", label: "Announcements" },
		{ href: "/admin/settings", label: "Settings" },
	  ];
	  
	  const visibleCount = 10;
	  const visibleLinks = navLinks.slice(0, visibleCount);
	  const extraLinks = navLinks.slice(visibleCount);

	if (status === "loading")
		return (
			<div className="flex items-center justify-center min-h-screen">
				Loading...
			</div>
		);
	if (status === "unauthenticated")
		return (
			<div className="flex items-center flex-col justify-center min-h-screen">
				<p className="text-red-500 text-lg mb-4">
					You do not have permission to access this page.
				</p>
				<Link href="/login">
					<Button className="w-48">Login</Button>
				</Link>
			</div>
		);

	if (user.role !== "admin") {
		return (
			<div className="flex items-center flex-col justify-center min-h-screen">
				<p className="text-red-500 text-lg mb-4">
					You do not have permission to access this page.
				</p>
				<Link href="/login">
					<Button className="w-48">Login</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen min-w-full flex-col">
			<header className="sticky top-0 z-10 min-w-full border-b bg-background">
				<div className="container flex flex-col sm:flex-row h-auto sm:h-16 items-start sm:items-center justify-between py-2 sm:py-4">
					<Link
						href="/admin"
						className="flex items-center gap-2 w-full sm:w-48 mb-2 sm:mb-0"
					>
						{/* Replace the src below with your logo URL */}
						<img 
							src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-08T05%3A06%3A25.597Z-elvora.png" 
							alt="Logo" 
							className="h-12 w-auto"
							onError={(e) => {
								e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggODAiIHdpZHRoPSIxMjgiIGhlaWdodD0iODAiPjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iODAiIGZpbGw9IiNlNWU1ZTUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzk5OSI+TG9nbyBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=';
							}}
						/>
					</Link>
					<nav className="flex items-center flex-wrap gap-3 w-full py-2">
  {visibleLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className="text-md font-medium transition-colors hover:text-primary"
    >
      {link.label}
    </Link>
  ))}

  {extraLinks.length > 0 && (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="text-md flex items-center gap-2">
          More <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 space-y-1">
        {extraLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block px-2 py-1 text-sm hover:bg-muted rounded"
          >
            {link.label}
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  )}
</nav>

					<Button
						variant="outline"
						onClick={() => {
							logout();
							router.push("/");
						}}
						className="w-full sm:w-auto mt-2 sm:mt-0"
					>
						<LogOut className="mr-2 h-4 w-4" />
						Logout
					</Button>
				</div>
			</header>
			<main className="flex-1 container mx-auto py-6">{children}</main>
			<footer className="border-t py-4 bg-muted/40">
				<div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
					<p className="text-sm text-muted-foreground">
						&copy; {new Date().getFullYear()} elvora.ae | All rights reserved.
						Designed & Developed by{" "}
						<a
							href="https://www.controlshift.ae/"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium underline"
						>
							Control Shift
						</a>
						.
					</p>
				</div>
			</footer>
		</div>
	);
}
