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
  // next dev does not fall through to public/*/index.html for App Router paths,
  // so map /eurekaai to the static design-canvas entry. Ignored by `output: 'export'`.
  async rewrites() {
    return [
      { source: '/eurekaai', destination: '/eurekaai/index.html' },
      { source: '/eurekaai/', destination: '/eurekaai/index.html' },
    ]
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
