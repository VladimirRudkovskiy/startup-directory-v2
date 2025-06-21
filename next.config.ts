import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
	dangerouslyAllowSVG: true,
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '*',
    },
  ],
},
	experimental: {
		ppr: 'incremental',
		after: true,
	},
	devIndicators: {
		buildActivity: true,
		buildActivityPosition:'bottom-right'
	},
};

export default nextConfig;
