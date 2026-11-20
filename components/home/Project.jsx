"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import { Heart, UsersCollaboration } from 'lucide-react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel'

export default function Project() {

    const [activedata, setActiveData] = useState("webapp")


    const ProjectOnly = [
        {
            id: 1,
            project_title: "Proffesional Mordern Portfollio For Genzy ",
            project_description: "This portfollio for mordern Genzy style so it's mordern so let's do work for next genration",
            project_img: "/moon-light.PNG"
        },
        {
            id: 2,
            project_title: "Mordern Scholl Management CMS (Student,Techer,Exam,Result)",
            project_description: "This portfollio for mordern Genzy style so it's mordern",
            project_img: "/mk-frame-work.PNG"
        },
        {
            id: 3,
            project_title: "Proffesional Mordern Portfollio ",
            project_description: "This portfollio for mordern Genzy style so it's mordern",
            project_img: "/brnad-landing-image.png"
        },
        {
            id: 4,
            project_title: "Proffesional Mordern Portfollio ",
            project_description: "This portfollio for mordern Genzy style so it's mordern",
            project_img: "/brnad-landing-image.png"
        }
    ]
    const tabData = [
        {
            id: 1,
            label: "Web App",
            value: "webapp"
        },
        {
            id: 2,
            label: "Mobile App",
            value: "mobileapp"
        },
        {
            id: 1,
            label: "UI/UX",
            value: "ui/ux"
        },
    ]

    const handelActive = (data) => {
        setActiveData(data)
    }
    return (
        <div className='w-full flex justify-center items-center py-10 px-8 md:px-0'>
            <div className="main-content w-full max-w-[1200px] ">
                <div className="top-active-tab-bar bg-transparent border border-gray-500/20 p-2 flex gap-4 rounded-sm overflow-x-scroll md:overflow-hidden">
                    {tabData.map((data, index) => (
                        <Button onClick={(e) => handelActive(data.value)} className={`py-6 px-6 text-lg cursor-pointer   ${activedata === data.value ? "bg-primary border border-primary" : "bg-transparent border border-gray-500/20 hover:bg-transparent text-black"}`} key={index}>{data.label}</Button>
                    ))}
                </div>
                <Carousel>
                    <CarouselContent className="w-full ml-0 py-4">
                        {ProjectOnly.map((data) => (
                            <CarouselItem key={data.id} className="w-full basis-full pl-0">


                                <Image src={data.project_img} alt='ff' width={500} height={500} className='w-full aspect-[3/2] object-contain ' />
                                <CardTitle className={" text-2xl md:text-3xl font-aclonica "}>{data.project_title}</CardTitle>
                                <CardDescription className={"text-lg"}>{data.project_description}</CardDescription>

                                {/* <div className="buttons flex w-full justify-between items-center py-2">
                                    <div className="left w-full flex gap-4 items-center">
                                        <button className='text-primary'><Heart size={28} /></button>
                                        <button className='text-primary'><UsersCollaboration size={28} /></button>
                                    </div>
                                    <div className="rigt">
                                        <Button className={"py-5 px-4 text-lg "}>View Site</Button>

                                    </div>
                                </div> */}


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
        </div>
    )
}
