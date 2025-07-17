"use client";
import { usePathname } from "next/navigation";

const useIsProductDetailPage = () => {
  const pathname = usePathname();
  return pathname?.startsWith("/product/");
};

export default useIsProductDetailPage;