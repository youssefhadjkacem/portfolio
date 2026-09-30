/** @type {import('next').NextConfig} */
const nextConfig = {
  // Site 100% statique : déployable sur Vercel, Netlify, GitHub Pages…
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
