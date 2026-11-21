import pool from "@/db/db"

const siteUrl = 'https://rayvoid.vercel.app'

export const revalidate = 3600

export default async function sitemap() {
  const staticUrls = [
    {
      url: siteUrl,
    },
    {
      url: `${siteUrl}/service`,
    },
  ]

  try {
    const [services] = await pool.query(
      `SELECT slug, date FROM seo WHERE slug IS NOT NULL AND slug != ''`
    )

    const serviceUrls = services.map((service) => {
      const entry = {
        url: `${siteUrl}/service/${encodeURIComponent(service.slug)}`,
      }

      return entry
    })

    return [...staticUrls, ...serviceUrls]
  } catch (error) {
    console.error('Failed to generate service sitemap URLs:', error)
    return staticUrls
  }
}
