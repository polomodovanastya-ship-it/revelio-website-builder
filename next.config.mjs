/** @type {import('next').NextConfig} */
// Static export is gated behind env vars so a normal `next dev` / `next build`
// is unaffected:
//   STATIC_EXPORT=1           → static export at the site root (prod deploy)
//   STATIC_BASE_PATH=/sub-dir → static export under a base path (preview variants)
const staticBasePath = process.env.STATIC_BASE_PATH
const staticExport = process.env.STATIC_EXPORT === '1' || !!staticBasePath

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  ...(staticExport
    ? {
        output: 'export',
        trailingSlash: true,
        ...(staticBasePath
          ? { basePath: staticBasePath, assetPrefix: staticBasePath }
          : {}),
      }
    : {}),
}

export default nextConfig
