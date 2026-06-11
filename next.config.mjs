/** @type {import('next').NextConfig} */
import { fileURLToPath } from "node:url";

const turbopackRoot = fileURLToPath(new URL(".", import.meta.url));

const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: turbopackRoot,
  },
};

export default nextConfig;
