import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

export default function InstagramSlider({ posts }) {
	return (
		<Swiper
			spaceBetween={12}
			slidesPerView={2}
			loop={true}
			modules={[Autoplay]}
			autoplay={{
				delay: 4000,
			}}
			breakpoints={{
				500: {
					slidesPerView: 2,
					spaceBetween: 16,
				},
				680: {
					slidesPerView: 3,
					spaceBetween: 16,
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 16,
				},
				1200: {
					slidesPerView: 5,
					spaceBetween: 16,
				},
			}}
		>
			{posts.map((post) => (
				<SwiperSlide key={post._id.toString()}>
					<Link
						href={"https://www.instagram.com/"}
						target="_blank"
						className="item relative block rounded-[32px] overflow-hidden"
					>
						<Image
							src={post.media[0].url || "/placeholder.svg"}
							width={300}
							height={300}
							alt={post.caption || "Instagram post"}
							className="h-full w-full duration-500 relative"
						/>
						<div className="icon w-12 h-12 bg-white hover:bg-black duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
							<InstagramLogoIcon
								className="text-black group-hover:text-white"
								size={24}
							/>
						</div>
					</Link>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
