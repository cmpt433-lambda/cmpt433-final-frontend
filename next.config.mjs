/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // <=== enables static exports
  basePath: "/nextjs-github-pages",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
