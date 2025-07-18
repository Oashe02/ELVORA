import "@/styles/globals.css";
import "@/styles/styles.scss";
import "react-phone-input-2/lib/style.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Toaster } from "sonner";
import TopLoader from "nextjs-toploader";
import { useEffect } from "react";
import { useSettingStore } from "@/store/useSettingStore";
import NextApp from "next/app"; // <-- import Next.js App
import { CartProvider, useCart } from "react-use-cart";
import axiosInstance from "@/lib/axiosInstance";
import { Red_Hat_Display } from "next/font/google";
import { useAuthStore } from "@/store/useAuthStore";
import { jwtDecode } from "jwt-decode";

const redHatDisplay = Red_Hat_Display({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-red-hat-display",
  });
export default function App({ Component, pageProps }) {
	const setSetting = useSettingStore((state) => state.setSetting);
	const { setSession } = useAuthStore();
	useEffect(() => {
		if (pageProps.setting) {
			console.log({ setting: pageProps.setting });

			setSetting(pageProps.setting);
		}
	}, [pageProps.setting]);
	useEffect(() => {
		const token = localStorage.getItem("@token");
		console.log({ "token in _app": token });
		if (token) {
			axiosInstance.defaults.headers.common["Authorization"] =
				`Bearer ${token}`;
			setSession({
				user: jwtDecode(token),
			});
		} else {
			setSession();
		}
	}, []);

	return (
		<div className={redHatDisplay.className}>
			<CartProvider>
				<TopLoader />
				<Toaster position="bottom-right" />
				<Component {...pageProps} />
				{/* <MicrosoftClarity /> */}
				<GoogleTagManager gtmId="G-______" />
			</CartProvider>
		</div>
	);
}

App.getInitialProps = async (appContext) => {
	const appProps = await NextApp.getInitialProps(appContext);

	// Fetch setting on the server
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/settings`,
	);
	const setting = await res.json();

	return {
		...appProps,
		pageProps: {
			...appProps.pageProps,
			setting,
		},
	};
};
