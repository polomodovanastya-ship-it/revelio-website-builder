import type { Metadata } from 'next'

/**
 * Site-wide OpenGraph share image (lives in /public).
 *
 * The Twitter image is set once globally in app/layout.tsx and is inherited by
 * every page. The OG image, however, has to be repeated per page: a page-level
 * `openGraph` block *replaces* the root layout's `openGraph` (Next.js does not
 * deep-merge it), which silently drops the inherited `images`. Routing all page
 * metadata through `pageMetadata()` keeps the OG image on every page — current
 * and future.
 */
export const OG_IMAGES = [{ url: '/og-cover.png', width: 1200, height: 630 }]

type PageMetadataInput = {
  /** Page <title>. Plain strings get the " — Ревелио" template from the root layout. */
  title: Metadata['title']
  description: string
  /** Canonical path, e.g. '/consulting'. Also used as the og:url. */
  path: string
  /** og:title. Defaults to `${title} — Ревелио` when `title` is a plain string. */
  ogTitle?: string
  /** og:description. Defaults to `description`. */
  ogDescription?: string
  /**
   * Per-page share image path (in /public), e.g. '/og-ai-evaluation.png'.
   * Defaults to the site-wide `/og-cover.png`. When set, also overrides the
   * inherited twitter:image so both previews use the page-specific image.
   */
  ogImage?: string
}

/**
 * Builds page metadata with the shared OG image baked in, so every page gets a
 * link-preview image. Use this instead of hand-writing an `openGraph` block.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  ogImage,
}: PageMetadataInput): Metadata {
  const resolvedOgTitle =
    ogTitle ?? (typeof title === 'string' ? `${title} — Ревелио` : undefined)

  const images = ogImage
    ? [{ url: ogImage, width: 1200, height: 630 }]
    : OG_IMAGES

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...(resolvedOgTitle ? { title: resolvedOgTitle } : {}),
      description: ogDescription ?? description,
      type: 'website',
      url: path,
      images,
    },
    // A page-level `twitter` block replaces the root layout's, so re-declare the
    // card type. Only set when overriding the image; otherwise inherit the root.
    ...(ogImage
      ? { twitter: { card: 'summary_large_image' as const, images: [ogImage] } }
      : {}),
  }
}
