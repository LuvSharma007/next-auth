'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const VerifyEmailPage = () => {

    // const router = useRouter()

    const [token , setToken] = useState("")
    const [verified , setVerified] = useState(false)
    const [error,setError] = useState(false)

    const verifiedUseEmail = async ()=>{
        try {
            await axios.post("/api/users/verifyemail",
                {token}
            )
            setVerified(true)
        } catch (error:any) {
            setError(true)
            console.log(error.response.data);
            toast("Error verifing user")
        }finally{
            setError(false)
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")

        // const {query} = router
        // const urlToken:any = query.token
        // setToken(urlToken || "")
    },[])

    useEffect(()=> {
        if(token.length>0){
            verifiedUseEmail()
        }
    },[token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 font-sans'>
        <h1 className='text-4xl mb-10'>Verify Email</h1>
        <h2 className='border-2 rounded p-5'>
            {token ? `${token}` : "No Token"}
        </h2>
        {verified && (
            <div className='mt-10'>
                <h2 className='text-green-600 text-2xl'>
                    You are Verified now !
                    <br/>
                    <p className='text-white mt-5'>
                    Go to Login,
                    <Link href='/login' className='text-blue-400'>Login</Link>
                    </p>
                </h2>
            </div>
        )}
        {error && (
            <div>
                <h2>
                    {error}
                </h2>
            </div>
        )}
    </div>
  )
}

export default VerifyEmailPage