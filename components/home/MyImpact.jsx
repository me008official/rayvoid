import Image from 'next/image'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { AlignLeft, ArrowLeftCircle, ArrowRightIcon } from 'lucide-react'
import { Button } from '../ui/button'

export default function MyImpact() {

    const Mybrands = [
        {
            id: 1,
            brand_name: "MoonLight Machinery",
            img_src: "/logo.webp",
            brand_details: "Digital presence and product visibility support for a manufacturing brand serving B2B buyers online."
        },
        {
            id: 2,
            brand_name: "MK Frame Work",
            img_src: "/mkmain.png",
            brand_details: "Modern website and marketing design for a construction and concrete product business focused on trust and lead generation."
        },
        {
            id: 3,
            brand_name: "Node Proxy",
            img_src: "/nodeproxya.png",
            brand_details: "A useful internal project and digital tool built to improve workflow and demonstrate technical capability."
        }
    ]
    const ImpactData = [
        {
            id: 1,
            value: "5+",
            label: "Years helping businesses grow online",
            desc: "Practical web design, SEO and digital marketing strategies for brands ready to improve visibility and customer reach.",
            bg: "bg-black",
        },
        {
            id: 2,
            value: "10+",
            label: "Projects built for stronger digital presence",
            desc: "From business websites to digital tools, each project is designed to be clearer, faster and more conversion-focused.",
            bg: "bg-gray-500/20",
            text:"text-black"
        },
        {
            id: 3,
            value: "3+",
            label: "Non-profit and community-focused digital solutions",
            desc: "Supporting meaningful projects with accessible technology, better communication and stronger online visibility.",
            bg: "bg-primary",
        }
    ]


    return (
        <div className='w-full flex justify-center items-center py-20  text-white px-8 md:px-0'>
            <div className="main-contnet w-full grid sm:grid-cols-2 md:grid-cols-3 max-w-[1200px]">

                {ImpactData?.map((data, index) => (
                    <div key={index} className={`impact-section grid gap-12 p-12 ${data.bg} ${data.text}`}>
                        <div className="value text-6xl font-aclonica">
                            {data.value}
                        </div>
                        <div className="text">
                            <h1 className='text-4xl font-medium'>{data.label}</h1>
                            <p>{data.desc}</p>
                        </div>
       
                    </div>
                ))}

            </div>

        </div>
    )
}
