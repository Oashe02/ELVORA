import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta
					name="google-site-verification"
					content="OjzsFzfdBTMR_OvUFA8AyQrTEkjK5_nZ7-mW5RSn2hQ"
				/>
				  {/* Google Fonts: Red Hat Display */}
				  <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
			</Head>
			<body className="antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
