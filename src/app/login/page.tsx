'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const LoginPage = () => {

  const router = useRouter()

  const [user,setUser] = useState({
    password:"",
    email:"",
  })

  const [loading,setLoading] = useState(false)

  const onLogin = async ()=>{
    setLoading(true)
    try {
      const res = await axios.post(`/api/users/login`, user)
      console.log("login success",res.data);  
      router.push('/profile')

    } catch (error:any) {
      console.log("login failed");
      toast.error(error.message)        
    }finally{
      setLoading(false);
    }
  }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 font-sans'>
      <h1 className='text-4xl mb-5'>Login</h1>
      <div className='flex flex-col border-2 w-100 h-100 text-2xl text-center items-center justify-evenly rounded-2xl'>   
      <label htmlFor='username'>Email:</label>
      <Input type="text" id='email' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder='example@gmail.com' className='border-1 rounded w-70'/>
      <label htmlFor='username'>Password:</label>
      <Input type="password" id='password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder='password' className='border-1 rounded w-70' />
      <p className='text-sm'>Don't have an account , <a href="/singup" className='text-blue-500'>Singup</a></p>
      </div>
      <Button className='mt-5 w-40'
      onClick={onLogin}
      >
        {loading ? <Spinner/> : "Login"}
      </Button>
      
    </div>
  )
}

export default LoginPage