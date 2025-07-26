"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios"
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function LoginPage(){

  const router = useRouter()

  const [user,setUser] = useState({
    email:"",
    password:"",
  });

  const [buttonDisabled,setButtonDisabled] = useState(false)
  const [loading , setLoading] = useState(false)

  const onLogin = async ()=>{
    setLoading(true);
    try {
      const userCreated = await axios.post('/api/users/login',user)
      console.log("login succesfully",userCreated.data);
      router.push('/profile')

    } catch (error:any) {
      console.log("Error during login",error);
      toast.error(error.message)
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(user.email.length> 0 && user.password.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true);
    }
  },[user])

  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 font-sans '>
      <h1 className='text-4xl mb-4'>{loading ? "Processing":"Login"}</h1>
      <div className='flex flex-col items-center justify-center gap-2 border-white border-2 w-100 h-100 text-2xl rounded'>

      <label htmlFor="email">Email</label>
      <input
      className='border-1 border-white rounded'
      id='email'
      value={user.email}
      onChange={(e)=>setUser({...user,email:e.target.value})}
      placeholder='email'
      type="text" />

      <label htmlFor="password">password</label>
      <input
      className='border-1 border-white rounded'
      id='password'
      value={user.password}
      onChange={(e)=>setUser({...user,password:e.target.value})}
      placeholder='password'
      type="password" />
           
      </div>
      <button
      className='border-2 bg-white text-black w-25 h-10 mt-4 rounded cursor-pointer'
      onClick={onLogin}
      >
        {buttonDisabled ? "No Login":"Login"}
      </button>
    </div>
  )
}

