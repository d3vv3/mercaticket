/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      hostname: "prod-mercadona.imgix.net",
    }],
  }
};

export default nextConfig;
