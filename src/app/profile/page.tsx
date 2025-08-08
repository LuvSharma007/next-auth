'use client'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const router = useRouter()
  const [data, setData] = useState("nothing")

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me")
      toast.success("Data fetched successfully")
      
      console.log(res.data.data);
      setData(res.data.data._id)
      
    } catch (error) {
      console.error("Error fetching user data", error)
      toast.error("Error fetching user data")
    }
  }

  const logout = async () => {
    try {
      const res = await axios.post('/api/users/logout')
      if (res.data.message === "Logout Successfully") {
        toast.success("Logout Successful")
        router.push("/login")
      }
    } catch (error:any) {
      console.error(error)
      toast.error(error.message || "Logout failed")
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <h2 className='text-white'>
        {data !== "nothing" ? (
          <Link href={`/profile/${data}`}>{data}</Link>
        ) : "Nothing"}
      </h2>
      <hr />
      <Button onClick={getUserDetails} className='w-60 mt-10'>
        Get User Data
      </Button>
      <Button onClick={logout} variant="destructive" className='mt-5'>
        Logout
      </Button>
    </div>
  )
}

export default ProfilePage
