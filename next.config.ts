import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin workspace root to this project so a sibling lockfile higher
    // up the tree doesn't get auto-detected.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
