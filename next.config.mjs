/** @type {import('next').NextConfig} */
// The site ships as a static export, so `next build` always emits ./out.
// Opt out with STATIC_EXPORT=0 (e.g. when a server runtime is needed).
//   STATIC_BASE_PATH=/sub-dir → static export under a base path (preview variants)
const staticBasePath = process.env.STATIC_BASE_PATH
const staticExport = process.env.STATIC_EXPORT !== '0'

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
