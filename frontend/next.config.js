/** @type {import('next').NextConfig} */

const isLocal = process.env.NODE_ENV === "development";

const localImages = {
	remotePatterns: [
		{
			protocol: "http",
			hostname: "127.0.0.1",
			port: "1337",
			pathname: "/uploads/**",
		},
	],
};

const productionImages = {
	remotePatterns: [
		{
			protocol: "https",
			hostname: "**",
			port: "",
			pathname: "/uploads/**",
		},
	],
};

const nextConfig = {
	images: isLocal ? localImages : productionImages,
};

module.exports = nextConfig;
