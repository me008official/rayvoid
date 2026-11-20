"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

export default function Rdseo() {
    return (
        <div className='w-full flex justify-center items-center h-screen'>
            <div className="main-contet w-full flex flex-col max-w-[600px] justify-center gap-4">
                <div className="center-input w-full flex  justify-center">
                    <Input type={"text"} placeholder={"Enter Seo Title"} className={"w-full  border-primary/20"} />
                </div>
                <div className="button w-full flex justify-center">
                    <Button className={"w-full"}>Submit</Button>
                </div>
            </div>
        </div>
    )
}
