/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // <=== enables static exports
  basePath: "/cmpt433-final-frontend",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
