import Footer from '@/components/home/fixed/Footer'
import Header from '@/components/home/fixed/Header'
import Landing from '@/components/home/Landing'
import MyImpact from '@/components/home/MyImpact'
import Project from '@/components/home/Project'
import Testimonial from '@/components/home/Testimonial'
import React from 'react'

export const metadata = {
  title: 'SEO Agency, Web Design & Digital Marketing in Siliguri | RAYVOID',
  description:
    'RAYVOID is a Siliguri-based SEO agency and digital marketing company offering website design, web app development, Google Ads, social media marketing and local SEO growth strategies.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SEO Agency, Web Design & Digital Marketing in Siliguri | RAYVOID',
    description:
      'RAYVOID is a Siliguri-based SEO agency and digital marketing company offering website design, web app development, Google Ads, social media marketing and local SEO growth strategies.',
    url: 'https://rayvoid.vercel.app',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Agency, Web Design & Digital Marketing in Siliguri | RAYVOID',
    description:
      'RAYVOID is a Siliguri-based SEO agency and digital marketing company offering website design, web app development, Google Ads, social media marketing and local SEO growth strategies.',
    images: ['/og-image.png'],
  },
}

const faqData = [
  {
    question: 'What services does RAYVOID offer?',
    answer:
      'RAYVOID helps businesses with website design, web app development, SEO strategy, Google Ads, Meta Ads, local search optimization, social media marketing and digital product planning.',
  },
  {
    question: 'Do you work with local businesses in Siliguri?',
    answer:
      'Yes. We support local businesses in Siliguri and nearby areas with digital strategy, brand visibility, lead generation and high-converting online experiences.',
  },
  {
    question: 'How long does a website project take?',
    answer:
      'Most business websites take a few weeks depending on the number of pages, custom features, design revisions and content readiness. We share a clear timeline after discussing your goals.',
  },
  {
    question: 'Can you help improve my search rankings?',
    answer:
      'Yes. We focus on technical SEO, on-page optimization, local SEO, content structure and conversion-focused website improvements that help your business become easier to find online.',
  },
  {
    question: 'Do you also manage paid advertising?',
    answer:
      'Yes. We can plan and manage Google Ads and Meta Ads campaigns to help bring more qualified traffic and leads to your business.',
  },
]

export default function page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\u003c'),
        }}
      />
      <Header />
      <Landing />
      <MyImpact />
      <Project />
      <Testimonial />

      <section id="faq" className="mx-auto w-full max-w-[1200px] px-5 py-20 md:px-0">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Frequently asked questions
          </p>
          <h2 className="text-4xl font-aclonica tracking-[-0.06em] text-neutral-950 sm:text-5xl">
            Everything you need to know
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <details
              key={item.question}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 text-left text-lg font-medium text-neutral-900 sm:p-6 sm:text-xl">
                <span>{item.question}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-base text-neutral-700 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="border-t border-neutral-200 px-5 pb-5 pt-4 text-base leading-7 text-neutral-600 sm:px-6">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
