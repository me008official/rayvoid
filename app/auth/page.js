import React from 'react'
import LoginForm from './LoginForm'
import Header from '@/components/home/fixed/Header'

export default function page() {
  return (
    <div className='w-full  justify-center items-center'>
      <Header/>
      <LoginForm/>
    </div>
  )
}
