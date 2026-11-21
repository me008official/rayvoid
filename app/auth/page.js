import LoginForm from './LoginForm'
import Header from '@/components/home/fixed/Header'

export default function page() {
  return (
    <div className='w-full  justify-center items-center'>
      <Header/>
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-12">
        <LoginForm
          appKey={process.env.TRUECALLER_APP_KEY || ""}
          partnerName={process.env.TRUECALLER_APP_NAME || "RAYVOID"}
        />
      </div>
    </div>
  )
}
