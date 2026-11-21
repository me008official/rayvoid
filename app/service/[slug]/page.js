import Footer from "@/components/home/fixed/Footer"
import Header from "@/components/home/fixed/Header"
import pool from "@/db/db"
import Link from "next/link"
import { cache } from "react"
import { notFound } from "next/navigation"
import Project from "@/components/home/Project"
import Services from "@/components/home/PagesDesign/Services"

const siteUrl = "https://rayvoid.vercel.app"

const getServiceBySlug = cache(async (slug) => {
  const [rows] = await pool.query(
    "SELECT title, slug, description FROM seo WHERE slug = ? LIMIT 1",
    [slug]
  )

  return rows[0] || null
})

export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const canonical = `/service/${encodeURIComponent(service.slug)}`
  const title = service.title || "RAYVOID Service"
  const description = service.description || ""

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title: `${title} | RAYVOID`,
      description,
      url: `${siteUrl}${canonical}`,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | RAYVOID`,
      description,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function ServicePage({ params }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const title = service.title || "RAYVOID Service"
  const description = service.description || ""
  const canonical = `${siteUrl}/service/${encodeURIComponent(service.slug)}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: "en-IN",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        mainEntity: {
          "@id": `${canonical}#service`,
        },
        breadcrumb: {
          "@id": `${canonical}#breadcrumb`,
        },
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: title,
        description,
        url: canonical,
        provider: {
          "@id": `${siteUrl}/#business`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${siteUrl}/service`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: canonical,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main className="mx-auto w-full max-w-[1200px]   py-20">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
          <Link href="/">Home</Link>
          {" / "}
          <Link href="/service">Services</Link>
          {" / "}
          <span aria-current="page">{title}</span>
        </nav>
        <article>
          <h1 className="mb-6 text-4xl font-aclonica">{title}</h1>
          <p className="max-w-3xl whitespace-pre-line text-lg leading-8 text-gray-600">
            {description}
          </p>
        </article>
        <Services/>
      </main>
      
      <Footer />
    </>
  )
}
