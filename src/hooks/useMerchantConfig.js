import { useEffect, useState } from "react";

export function useMerchantConfig() {
	const [config, setConfig] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchConfig() {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/google-merchant/config`,
				);
				const data = await res.json();
				setConfig(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		fetchConfig();
	}, []);

	return { config, loading, error, setConfig };
}
