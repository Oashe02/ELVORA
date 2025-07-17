import { formatPriceOnlyServer, formatPriceServer } from "@/lib/utils";
import { useSettingStore } from "@/store/useSettingStore";

export const ServerPriceDisplay = ({ amount = 0, className = "" }) => {
	const settings = useSettingStore((s) => s.setting);

	const formattedPrice = formatPriceOnlyServer(
		amount,
		settings?.general?.currency,
	);

	return (
		<span className={"flex flex-row items-center gap-1 " + className}>
			<img src="/symbol.webp" className="w-4 h-4" />
			{formattedPrice}
		</span>
	);
};

export default ServerPriceDisplay;
