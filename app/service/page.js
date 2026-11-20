import Footer from '@/components/home/fixed/Footer'
import Header from '@/components/home/fixed/Header'
import Services, { services } from '@/components/home/PagesDesign/Services'
import React from 'react'

export const metadata = {
  title: 'Web Development, App Development, SEO & Digital Marketing',
  description:
    'Explore RAYVOID services in Siliguri: custom web and mobile app development, SEO, GEO and AEO, digital marketing, social media management and digital products.',
  alternates: {
    canonical: '/service',
  },
  openGraph: {
    title: 'Web Development, App Development, SEO & Digital Marketing | RAYVOID',
    description:
      'Explore RAYVOID services in Siliguri: custom web and mobile app development, SEO, GEO and AEO, digital marketing, social media management and digital products.',
    url: 'https://rayvoid.vercel.app/service',
    images: ['/brnad-landing-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development, App Development, SEO & Digital Marketing | RAYVOID',
    description:
      'Explore RAYVOID services in Siliguri: custom web and mobile app development, SEO, GEO and AEO, digital marketing, social media management and digital products.',
    images: ['/brnad-landing-image.png'],
  },
}

export default function page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'RAYVOID digital services',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: {
          '@id': 'https://rayvoid.vercel.app/#business',
        },
      },
    })),
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Header/>
      <div className=''>
        <Services/>
      </div>
      <Footer/>
    </div>
  )
}
