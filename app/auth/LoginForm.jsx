"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function LoginForm() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsloadin] = useState(false)

    const handelSIgn = async () => {
        if(!email || !password){
            return alert("enter valied details")
        }
        setIsloadin(true)
        const res = await axios.get("/api/auth/login?email=" + email + "&password=" + password)
        if (res.status === 200) {
            setIsloadin(false)
            return router.push("/")
        } else {
            return setIsloadin(false)
        }
    }

    return (
        <div className='w-full flex  justify-center items-center h-screen'>
            <div className="login-content  grid w-full max-w-[600px] gap-4">
                <Input type={"email"} placeholder="Email ID" onChange={(e)=>setEmail(e.target.value)} />
                <Input type={"password"} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                <Button onClick={(e)=>handelSIgn()} disabled={isLoading}>Submit</Button>
            </div>
        </div>
    )
}
