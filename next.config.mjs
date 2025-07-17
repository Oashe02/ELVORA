/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		loader: 'default', // Use Next.js default image loader
		unoptimized: true, // Disable built-in image optimization
		domains: ["d33609liqwio9r.cloudfront.net", "images.pexels.com",'ik.imagekit.io','mypubblicbucket.s3.ap-south-1.amazonaws.com'],
	},
	transpilePackages: ["crypto-js"],
};

export default nextConfig;
