import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

export default function Landing() {

    const toolList = [
        {
            id: 1,
            label: "SEO Optimization",
            src: "/seo.png"
        },
        {
            id: 2,
            label: "Google Ads",
            src: "/google-ads.png"
        },
        {
            id: 3,
            label: "Meta Ads",
            src: "/meta-ads.png"
        },
        {
            id: 4,
            label: "Google Cloud",
            src: "/google-cloud.png"
        },
        {
            id: 5,
            label: "AWS",
            src: "/aws.png"
        },
        {
            id: 6,
            label: "Docker",
            src: "/docker.png"
        }
    ]
    return (
        <div className="w-full">
            <div className="w-full flex items-center justify-center h-[720px]">
                <div className="left h-full w-full md:flex items-center justify-center relative z-0 hidden">
                    <div className="image-section w-full h-full">
                        <Image src={"/brnad-landing-image.png"} width={500} height={500} className='w-full flex h-full object-cover' alt='RAYVOID digital agency for SEO and website design' />
                    </div>
                    <div className="grid absolute right-6 max-w-[400px] gap-4 bottom-6">
                        <div className="desc bg-white/10 backdrop-blur-3xl p-3 text-white ">
                            <p>Thoughtful web design, SEO strategy and digital marketing systems built to help businesses grow visibility and revenue online.</p>
                        </div>
                        <div className="notify-button flex gap-2 bg-black  text-[14px] py-1 px-4 items-center text-white justify-between">
                            <p>SEO agency and digital growth partner in Siliguri</p>
                            <Button className={'bg-transparent text-white border-white '} >See services</Button>
                        </div>
                    </div>
                </div>
                <div className="right w-full grid items-center justify-start px-2 md:px-8 gap-8">
                    <div className="main-landing-content  text-4xl font-medium max-w-[500px]  ">
                        <h1 className="heading font-medium">
                            Website <span className='font-aclonica text-primary'>Development</span> , App Development, <span className='font-aclonica text-primary'>SEO &  Digital Marketing</span>   Services in Siliguri
                        </h1>
                    </div>
                    <div className="heading-buttons flex gap-6">
                        <Button className={"py-5 px-3 text-md"}>About <span className='font-aclonica'>Rayvoid</span> </Button>
                        <Button variant='outline' className={"py-5 px-3 text-md"}>Book A Strategy Call</Button>
                    </div>
                    <div className="heading-desck max-w-[420px]">
                        <p>RAYVOID helps businesses in Siliguri and nearby regions grow with custom website development, local SEO, Google Ads, social media marketing and scalable web app solutions.</p>
                    </div>
                    <div className="some-tools flex flex-wrap  gap-2 w-full max-w-[500px]">
                        {
                            toolList?.map((data,index)=>(
                                <div className="tool border w-fit rounded-full flex items-center gap-2 p-2 hover:bg-primary duration-800 cursor-pointer hover:text-white" key={index}>
                                    <Image src={data.src} alt={data.label} width={500} height={500} className='h-6 w-6'/>
                                    <div className="label text-[14px]">
                                        {data.label}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
