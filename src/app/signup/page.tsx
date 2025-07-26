"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios"
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function SignupPage(){

  const router = useRouter()

  const [user,setUser] = useState({
    email:"",
    password:"",
    username:""
  });

  const [buttonDisabled,setButtonDisabled] = useState(false)
  const [loading , setLoading] = useState(false)

  const onSignup = async ()=>{
    setLoading(true);
    try {
      const userCreated = await axios.post('/api/users/signup',user)
      console.log("signup succesfully",userCreated.data);
      router.push('/login')

    } catch (error:any) {
      console.log("Error during Signup",error);
      toast.error(error.message)
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(user.email.length> 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true);
    }
  },[user])

  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 font-sans'>
      <h1 className='text-4xl mb-4'>{loading ? "Processing":"Signup"}</h1>
      <div className='flex flex-col items-center justify-center gap-2 border-white border-2 w-100 h-100 text-2xl rounded'>
      <label htmlFor="username">Username</label>
      <input
      className='border-1 border-white rounded'
      id='username'
      onChange={(e)=>setUser({...user,username:e.target.value})}
      value={user.username}
      placeholder='username'
      type="text" />

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
      <h1 className='mt-4 '>Already have an account , 
      <Link className='text-bold' href={"/login"}>
        Login
      </Link>
      </h1>
      </div>
      <button
      className='border-2 bg-white text-black w-25 h-10 mt-4 rounded cursor-pointer'
      onClick={onSignup}
      >
        {buttonDisabled ? "No Signup":"Signup"}
      </button>
    </div>
  )
}

