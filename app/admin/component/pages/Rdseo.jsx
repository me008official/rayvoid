"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import React, { useState } from 'react'

export default function Rdseo() {
    const [title,setTitle] = useState()
    const [description,setDescription] = useState("")


    const Seo = async ()=>{
        const res = await axios.post("/api/admin/seo",{title,description})

        if(res.status === 200){
            return alert(res.data.message)
        }else{
            return alert(res.data.message)
        }
    }

    return (
        <div className='w-full flex justify-center items-center h-screen'>
            <div className="main-contet w-full flex flex-col max-w-[600px] justify-center gap-4">
                <div className="center-input w-full flex flex-col gap-2  justify-center ">
                    <Input type={"text"} placeholder={"Enter Seo Title"} className={"w-full  border-primary/20"} value={title} onChange={(e)=>setTitle(e.target.value)} />
                    <Input placeholder={"Enter Meta Descripton"} type={"text"} value={description} onChange={(e)=>setDescription(e.target.value)} />
                </div>
                <div className="button w-full flex justify-center">
                    <Button onClick={(e)=>Seo()} className={"w-full"}>Submit</Button>
                </div>
            </div>
        </div>
    )
}
