/** @type {import('next').NextConfig} */
// Static-export build for the /test-variant preview is gated behind an env var,
// so a normal `next dev` / `next build` is unaffected.
const staticBasePath = process.env.STATIC_BASE_PATH

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  ...(staticBasePath
    ? {
        output: 'export',
        basePath: staticBasePath,
        assetPrefix: staticBasePath,
        trailingSlash: true,
      }
    : {}),
}

export default nextConfig
