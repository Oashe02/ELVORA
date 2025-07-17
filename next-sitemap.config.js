/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: "https://thenuaims.com/",
	generateRobotsTxt: true,
	generateIndexSitemap: false,
	changefreq: "daily",
	priority: 0.7,
	exclude: ["/auth/*", "/dashboard", "/dashboard/*", "/admin", "/admin/*"],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				disallow: ["/auth/", "/dashboard/"],
			},
		],
	},
};
