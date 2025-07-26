"use client"
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


export default function profilePage() {

  const router = useRouter()
  const [data,setData] = useState("nothing")
  

  const getUserDetails = async ()=>{
  try {
    const res = await axios.post("/api/users/me")
    console.log(res.data);
    setData(res.data.data._id)
  } catch (error:any){
    console.log("Error getting user",error);
    toast.error(error.message);
  }
}


  const Logout = async ()=>{
    try {
      await axios.post('/api/users/logout')
      toast.success("Logout success")
      router.push("/login");
    } catch (error:any) {
      console.log(error.message);
    } 
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 font-sans'>
      <h1>
        Profile Page
      </h1>
        <hr />
        <h2>
          {data === "nothing"? "No Data":<Link href=
          {`/profile/${data}`}>
          {data}
          <hr />
          </Link>}
          </h2>
          <button onClick={Logout}
          className='border-2 bg-white text-black w-25 h-10 mt-4 rounded cursor-pointer'
          >
          Logout
          </button>
          <button onClick={getUserDetails}
          className='border-2 bg-white text-black w-40 h-10 mt-4 rounded cursor-pointer'
          >
          Get User Data
          </button>
    </div>
  )
}
