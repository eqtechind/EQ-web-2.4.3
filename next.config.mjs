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
        }
      ],
    },
  };
  
  export default nextConfig;
  