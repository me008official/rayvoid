"use client"
import { Button } from '@/components/ui/button'
import { AlignLeft, MoveRight, IndianRupee, ReceiptText, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

import React, { useEffect, useState } from 'react'

export default function Header() {

    const Hlinks = [
        {
            id: 1,
            src: "/",
            label: "Home"
        },
        {
            id: 2,
            src: "/service",
            label: "Services"
        },
        {
            id: 3,
            src: "/project",
            label: "Project"
        },
        {
            id: 4,
            src: "/about",
            label: "About"
        },
        {
            id: 5,
            src: "/#faq",
            label: "FAQ"
        },
        {
            id: 6,
            src: "/contact",
            label: "Contact"
        }
    ]
    const dropDown = [
        {
            id: 1,
            label: "Product",
            description: "We launched the most advanced product, so if you are interested, please visit."
        },
        {
            id: 2,
            label: "Blog",
            description: "I post my Exprience for any begainer learn Engeniring"
        },
        {
            id: 3,
            label: "Marketing",
            description: "I provide SEO or Google Ads,Meta Ads or many marketing services if intrested so let's do this"
        }
    ]
    const imgDrop = [
        {
            id: 1,
            label: "Pricing",
            icon: IndianRupee,
            src_link: "/",
            text: "text-white",
            bg: "bg-indigo-500"
        },
        {
            id: 2,
            label: "Privacy",
            icon: ReceiptText,
            src_link: "/",
            text: "text-yellow-500",
            bg: "bg-yellow-100 border border-yellow-300"
        },
        {
            id: 3,
            label: "Terms",
            icon: ShieldCheck,
            src_link: "/",
            text: "text-green-500",
            bg: "bg-green-100 border border-green-300"
        }
    ]
    const [active, setActive] = useState(false)
    const handelActive = () => {
        if (active) {
            setActive(false)
        } else {
            setActive(true)
        }
    }

    const [headerActive, setHeaderactive] = useState('/')
    const getPath = async () => {
        const path = await window.location.pathname
        if (path) {
            setHeaderactive(path)
        } else {
            return
        }
    }

    useEffect(() => {
        getPath()
    }, [])

    return (
        <div className="w-full  sticky md:fixed top-0 flex flex-col items-center bg-gray-300/10 backdrop-blur-3xl z-50 overflow-visible px-2 md:px-0">
            <div className="header-main w-full max-w-[1200px] flex justify-between  py-4">
                <div className="left">
                    <div className="brand text-2xl ">
                        <h1 className='font-aclonica'>RAYVOID</h1>
                    </div>
                </div>
                <div className="center flex gap-6 items-center">
                    {Hlinks?.map((data, index) => (
                        <Link className={`hover:text-primary  duration-300 hidden md:flex ${headerActive === data.src ? "text-primary" : "text-foreground"}`} key={index} href={data.src}>{data.label}</Link>
                    ))}
                    <div className="rihgt">
                        <Button onClick={(e) => handelActive()} variant='outline' className={`bg-transparent border-none ${active == true ? "bg-primary text-white hover:bg-primary hover:text-white" : "hover:bg-primary hover:text-white"}`}><AlignLeft /> </Button>
                    </div>
                </div>

            </div>
            <div
                className={`
                    w-full max-w-[1200px]
                    grid transition-[grid-template-rows,opacity,transform]
                    duration-500 ease-in-out 
                    ${active
                        ? "grid-rows-[1fr] opacity-100 "
                        : "grid-rows-[0fr] opacity-0  pointer-events-none"
                    }
                `}
            >
                <div className="overflow-hidden ">
                    <div className="w-full grid md:flex py-8  gap-4 ">
                        <div className="left grid md:flex w-full gap-2">
                            {
                                dropDown?.map((data, index) => (
                                    <Link href={"/"} key={index} className="drop-menu md:drop-shadow-2xl bg-transparent   md:bg-linear-to-l  md:from-[#f16b6ba8] md:to-primary md:text-white md:backdrop-blur-lg p-4 md:hover:bg-primary md:hover:text-secondary duration-500 w-full md:max-w-[300px] rounded-md cursor-pointer">
                                        <div className="heading w-full flex justify-between">
                                            <h2 className="text-lg font-medium ">
                                                {data.label}
                                            </h2>
                                            <MoveRight className='hidden md:flex' />
                                        </div>

                                        <div className="desc font-normal text-white/50 hidden md:flex">
                                            <p>
                                                {data.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            }
                            <Link href={"/price"} className="drop-menu md:drop-shadow-2xl md:hidden bg-transparent   md:bg-linear-to-l  md:from-[#f16b6ba8] md:to-primary md:text-white md:backdrop-blur-lg p-4 md:hover:bg-primary md:hover:text-secondary duration-500 w-full md:max-w-[300px] rounded-md cursor-pointer">
                                <div className="heading w-full flex justify-between">
                                    <h2 className="text-lg font-medium ">
                                        Price
                                    </h2>
                                    <MoveRight className='hidden md:flex' />
                                </div>

                            </Link>
                        </div>
                        <div className="right w-full md:grid max-w-[200px] gap-2 hidden ">
                            {imgDrop?.map((data, index) => {
                                const Maicon = data.icon
                                return (
                                    <div key={index} className={`data-s cursor-pointer md:text-white  duration-500 flex items-center gap-2  md:backdrop-blur-lg p-4   rounded-md font-medium text-[16px] md:bg-linear-to-l md:bg-primary md:from-[#f16b6b]`}>
                                        <div className="icon">
                                            <Maicon size={20} />
                                        </div>
                                        <div className="contnet">
                                            {data.label}
                                        </div>
                                    </div>
                                )
                            })}

                        </div>


                    </div>
                </div>
            </div>


        </div>
    )
}
