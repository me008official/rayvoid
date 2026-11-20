"use client"
import { Button } from '@/components/ui/button'
import { AppWindow, GalleryHorizontal, PerfumeBottleIcon, Podcast, User2, WholeWord, Workflow } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Header() {
    const [headActive, setHeadactive] = useState("Overview")
    const pathname = usePathname()
    const segment = pathname.split("/").filter(Boolean)
    // console.log(segment[1])
    const Links = [
        {
            id: 1,
            label: "Overview",
            value: "admin",
            src: "/admin",
            icon: GalleryHorizontal
        },
        {
            id: 2,
            label: "Hero",
            value: "hero",
            src: "/hero",
            icon: AppWindow,
        },
        {
            id: 3,
            label: "Project",
            value: "project",
            src: "/project",
            icon: Workflow,
        },
        {
            id: 4,
            label: "Testimonial",
            value: "testimonial",
            src: "/testimonial",
            icon: User2,
        },
        {
            id: 5,
            label: "Blog",
            value: "blog",
            src: "/blog",
            icon: Podcast,
        },
        {
            id: 6,
            label: "Seo",
            value: "rdseo",
            src: "/admin/rdseo",
            icon: WholeWord,
        }
    ]
    const handelActive = (value) => {
        setHeadactive(value)
    }


    useEffect(() => {
        if (segment[1]) {
            setHeadactive(segment[1])
            // console.log(segment[1])
        }
    }, [])

    return (
        <div className='w-full sticky top-0 flex justify-center items-center border border-b'>
            <div className="main-content w-full flex justify-between p-2 items-center">
                <div className="brand text-2xl">
                    <h1>Rtech C-Panel</h1>
                </div>
                <div className="links flex gap-4">
                    {Links?.map((data, index) => {
                        const Icons = data?.icon
                        return <Link href={data?.src} onClick={(e) => handelActive(data?.value)} key={index} className={`text-md w-full flex items-center gap-2 px-3 py-2 text-primary rounded-sm border border-primary ${data.value === headActive ? "bg-primary text-white" : "bg-transparent text-primary hover:bg-primary hover:text-white"}`}><Icons size={15} />{data?.label}</Link>
                    })}
                </div>
                <div className="admin-avtar">
                    <div className="avtar">
                        <Image src={"/logo.webp"} width={500} height={500} alt='admin avtar' className='w-10 h-10 rounded-full bg-primary ' />
                    </div>
                </div>
            </div>
        </div>
    )
}
