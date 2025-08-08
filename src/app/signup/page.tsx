'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const SignupPage = () => {

  const router = useRouter()

  const [user,setUser] = useState({
    password:"",
    email:"",
    username:""
  })

  const [loading,setLoading] = useState(false)

  const onSignup = async ()=>{
    setLoading(true)
    try {
      const res = await axios.post(`/api/users/signup`, user)
      console.log("Signup success",res.data);  
      router.push('/login')

    } catch (error:any) {
      console.log("Signup failed");
      toast.error(error.message)        
    }finally{
      setLoading(false);
    }
  }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 font-sans'>
      <h1 className='text-4xl mb-5'>Signup</h1>
      <div className='flex flex-col border-2 w-100 h-100 text-2xl text-center items-center justify-evenly rounded-2xl'>
        <label htmlFor='username'>Username:</label>
      <Input type="text" id='username' value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} placeholder='username' className='border-1 rounded w-70' />
      <label htmlFor='username'>Email:</label>
      <Input type="text" id='email' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder='example@gmail.com' className='border-1 rounded w-70'/>
      <label htmlFor='username'>Password:</label>
      <Input type="password" id='password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder='password' className='border-1 rounded w-70' />
      <p className='text-sm'>Account already created , <a href="/login" className='text-blue-500'>Login</a></p>
      </div>
      <Button className='mt-5 w-40'
      onClick={onSignup}
      >
        {loading ? <Spinner/> : "Signup"}
      </Button>
      
    </div>
  )
}

export default SignupPage