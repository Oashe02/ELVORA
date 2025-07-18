import { formatPriceOnlyServer, formatPriceServer } from "@/lib/utils";
import { useSettingStore } from "@/store/useSettingStore";

export const ServerPriceDisplay = ({ amount = 0, className = "" }) => {
	const settings = useSettingStore((s) => s.setting);

	const formattedPrice = formatPriceOnlyServer(
		amount,
		settings?.general?.currency,
	);

	return (
		<span className={"flex flex-row items-center gap-2 " + className}>
			<img src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T10%3A08%3A10.947Z-Vector%20Smart%20Object%20copy%207.png" className="w-4 h-4" />
			{formattedPrice}
		</span>
	);
};

export default ServerPriceDisplay;
