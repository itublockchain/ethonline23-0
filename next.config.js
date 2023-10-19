/** @type {import('next').NextConfig} */
let nextConfig = {}

nextConfig = {
	...nextConfig,
	webpack: (config) => {
		return config
	},
}

module.exports = nextConfig
