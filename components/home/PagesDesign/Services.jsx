import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export const services = [
        {
            title: "Web Development",
            description: "Get a responsive business website, online store or custom web application built around your goals. We focus on clear user journeys, maintainable code and a strong experience across devices.",
            topic: ["Business Websites", "Custom Web Apps", "E-commerce", "CMS", "Responsive Design"],
            img: "/web-dev.avif",
        },
        {
            title: "Mobile App Development",
            description: "Turn your idea into a useful iOS or Android experience. We build customer-facing apps and tools for teams, with interfaces and features tailored to your workflows.",
            topic: ["iOS & Android Apps", "Delivery Tracking", "Business Management", "Education Apps", "Food Delivery"],
            img: "/mobile-dev.jpg",
        },
        {
            title: "SEO, GEO & AEO",
            description: "Improve how people discover and understand your business in search. Work can include technical and on-page SEO, local search, useful content, and clear information for answer and generative search experiences.",
            topic: ["Technical SEO", "On-Page SEO", "Local SEO", "Content Optimization", "GEO & AEO"],
            img: "/seo.jpg",
        },
        {
            title: "Digital Marketing",
            description: "Plan and manage focused digital campaigns to reach the right audience. Services include campaign strategy and paid search and social advertising, with performance reporting to guide improvements.",
            topic: ["Google Ads", "Meta Ads", "Email Marketing", "Marketing Automation", "Campaign Strategy"],
            img: "/marketing.jpg",
        },
        {
            title: "Social Media Management",
            description: "Keep your brand active and consistent across social channels with practical content planning, publishing support, audience engagement and performance reviews.",
            topic: ["Content Planning", "Social Publishing", "Community Management", "Meta Platforms", "Reporting"],
            img: "/social-media.jpg",
        },
        {
            title: "Digital Product Development",
            description: "Shape and build digital products around real user and business needs, from early product planning and interface design to development and ongoing improvements.",
            topic: ["Product Planning", "UI/UX Design", "MVP Development", "Web Platforms", "Product Improvements"],
            img: "/product.jpg",
        },
    ]

export default function Services() {
    return (
        <div className='w-full flex justify-center items-center '>
            <div className="main w-full justify-center px-2 grid gap-16 mt-12 md:mt-0">
                <div className="service-hero w-full h-screen grid md:grid-cols-2 justify-center items-center ">
                    <div className="left max-w-[500px]">
                        <div className="main-service-head  grid gap-6 max-w-[500px] ">
                            <div className="main-landing-content  text-4xl font-medium  ">
                                <h1 className="heading font-aclonica">
                                    SEO, Website Design & Digital Growth Services for Siliguri Businesses
                                </h1>
                            </div>
                            <div className="heading-buttons flex gap-6">
                                <Button className={"py-5 px-3 text-md"}>Start a Project</Button>
                                <Button variant='outline' className={"py-5 px-3 text-md"}>Book A Call</Button>
                            </div>
                            <p className='text-md text-gray-500'>RAYVOID helps businesses grow online with custom website design, search engine optimization, paid ads, mobile app development and digital marketing systems built for measurable visibility.</p>
                        </div>
                    </div>
                    <div className="right">
                        <Image src={"/service-brnad.jpg"} width={500} height={500} className='w-full flex h-full object-cover' alt="SEO and digital agency services for businesses in Siliguri" />
                    </div>
                </div>
                <div className="main-bottom w-full flex  justify-center ">
                    <div className="main-bottom w-full  justify-center max-w-[1200px]">
                        <div className="heading grid md:grid-cols-2 items-center ">
                            <div className="left text-4xl font-aclonica">
                                <h2>Growth-focused <br /> <span className='px-16 text-primary'>Digital Services</span></h2>
                            </div>
                            <div className="right max-w-[600px] text-gray-500">
                                <p>Based in Siliguri, West Bengal, RAYVOID supports businesses with SEO strategy, website development, app design and performance marketing that improve online visibility, trust and lead generation.</p>
                            </div>
                        </div>
                        <div className="services w-full  justify-center grid md:grid-cols-2 py-10 gap-8 ">
                            {services.map((data) => (
                                <div key={data.title} className="center w-full grid content-start gap-5 max-w-[550px] relative overflow-hidden p-6 ">
                                    <div className="img-section">
                                        <Image src={data.img} width={500} height={300} className="w-full h-80 object-cover " alt={data.title} />
                                    </div>
                                    <div className="title">
                                        <h2 className='text-2xl font-aclonica'>{data.title}</h2>
                                        <p className='mt-2 text-gray-500'>{data.description}</p>
                                    </div>
                                    <ul className="flex flex-wrap gap-2" aria-label={`${data.title} services`}>
                                        {data.topic.map((topic) => (
                                            <li key={topic} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{topic}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}



                        </div>
                        <div className="view-more w-full flex justify-center py-8">
                            <Button variant='outline' className={"py-5 px-3 text-md rounded-full cursor-pointer"}> <span className='ml-4'>Meet Now </span> <div className="icon bg-white text-black p-2 rounded-full"><Image src={"/google-cloud.png"} className='w-5' width={500} height={500} alt="google meet"/></div> </Button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
