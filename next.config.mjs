/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "framerusercontent.com",
        },
        {
          protocol:"https",
          hostname:"framer.com"
        },
        {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      ],
      
    },
  };

  

export default nextConfig;
  

  