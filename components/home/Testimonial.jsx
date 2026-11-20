import React from 'react'
import Image from 'next/image'
import { Quote } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'

export default function Testimonial() {
  const testiData = [
    {
      id: 1,
      label: "Recently i connect With Ray and it's my business chnaging point  ",
      description:
        'Yes recetnly i connect and i work together in my buinsess website and my website Seo and all technical handel Ray and my business sales Improvved high sales',
      avtar: '/logo.webp',
      name: 'Ashitosh Sharma',
      title: 'CEO In Cognetive',
      active: true,
    },
    {
      id: 2,
      label: "Recently i connect With Ray and it's my business chnaging point  ",
      description:
        'Yes recetnly i connect and i work together in my buinsess website and my website Seo and all technical handel Ray and my business sales Improvved high sales',
      avtar: '/logo.webp',
      name: 'Ashitosh Sharma',
      title: 'CEO In Cognetive',
      active: false,
    },
    {
      id: 3,
      label: "Recently i connect With Ray and it's my business chnaging point  ",
      description:
        'Yes recetnly i connect and i work together in my buinsess website and my website Seo and all technical handel Ray and my business sales Improvved high sales',
      avtar: '/logo.webp',
      name: 'Ashitosh Sharma',
      title: 'CEO In Cognetive',
      active: false,
    },
    {
      id: 3,
      label: "Recently i connect With Ray and it's my business chnaging point  ",
      description:
        'Yes recetnly i connect and i work together in my buinsess website and my website Seo and all technical handel Ray and my business sales Improvved high sales',
      avtar: '/logo.webp',
      name: 'Ashitosh Sharma',
      title: 'CEO In Cognetive',
      active: false,
    },
  ]

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="w-full px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-[1200px] gap-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Client stories
            </p>
            <h2
              id="testimonials-heading"
              className="text-4xl font-aclonica tracking-tight sm:text-5xl"
            >
              Good work speaks for itself.
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
              Feedback from clients about working with RAYVOID.
            </p>
          </div>
        </div>

        <Carousel
          opts={{ align: 'start', loop: false }}
          aria-label="Client testimonials"
        >


          <CarouselContent className="pb-2">
            {testiData.map((data, index) => (
              <CarouselItem
                key={data.id}
                className="basis-[88%] sm:basis-1/2 lg:basis-1/3"
              >
                <article
                  className={`group flex  flex-col justify-between overflow-hidden  border p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${data.active
                      ? 'border-neutral-950 bg-neutral-950 text-white shadow-xl shadow-neutral-950/10'
                      : 'border-neutral-200 bg-white text-neutral-950 shadow-sm hover:shadow-lg'
                    }`}
                >
                  <div>
                    <div className="mb-8 flex items-center justify-between">
                      <span
                        className={`grid size-12 place-items-center rounded-2xl ${data.active
                            ? 'bg-white/10 text-white'
                            : 'bg-primary/10 text-primary'
                          }`}
                      >
                        <Quote size={22} aria-hidden="true" />
                      </span>
                      <span
                        className={`text-xs font-medium tracking-[0.16em] ${data.active ? 'text-white/50' : 'text-neutral-400'
                          }`}
                      >
                        0{index + 1} / 0{testiData.length}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold leading-snug sm:text-xl">
                      {data.label.trim()}
                    </h3>
                    <blockquote
                      className={`mt-4 text-sm leading-7 sm:text-base ${data.active ? 'text-white/70' : 'text-neutral-600'
                        }`}
                    >
                      {data.description}
                    </blockquote>
                  </div>

                  <div
                    className={`mt-8 flex items-center gap-3 border-t pt-5 ${data.active ? 'border-white/15' : 'border-neutral-200'
                      }`}
                  >
                    <Image
                      src={data.avtar}
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover"
                      alt=""
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-aclonica">
                        {data.name}
                      </p>
                      <p
                        className={`mt-1 truncate text-xs ${data.active ? 'text-white/55' : 'text-neutral-500'
                          }`}
                      >
                        {data.title}
                      </p>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mb-5 flex justify-end gap-2">
            <CarouselPrevious
              aria-label="Previous testimonial"
              className="static size-11 translate-y-0 rounded-full border-neutral-200 bg-white text-neutral-800 shadow-sm hover:bg-neutral-100"
            />
            <CarouselNext
              aria-label="Next testimonial"
              className="static size-11 translate-y-0 rounded-full border-neutral-200 bg-white text-neutral-800 shadow-sm hover:bg-neutral-100"
            />
          </div>
        </Carousel>

      </div>
    </section>
  )
}
