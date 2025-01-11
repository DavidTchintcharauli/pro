/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "./dist",
  images: {
    domains: ['cdn.dummyjson.com', "http://www.w3.org/2000/svg", 'coma-demo.myshopify.com'], // Add the external domain here
  },
};

export default nextConfig;
