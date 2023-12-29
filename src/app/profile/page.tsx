"use client"

import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';


function Profile() {
  const router = useRouter()
  const [data, setData] = useState("");
  const logout = async () =>{
    try {
      await axios.get('/api/users/logout')
      toast.success("Logout Success")
      router.push('/login')
    }  
    catch(err:any){
      toast.error(err.message)
    } 
  }

  const getuserdetails = async () => {
    const res = await axios.get("/api/users/user");
    // console.log(res.data);
    setData(res.data.data.username);
  };
  useEffect(() => {
    getuserdetails();
  }, []);
console.log("DataFromToken",data)

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p className='text-4xl'>Profile Page
        </p>
        <hr></hr>
        <button onClick={logout} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Logout
        </button>
    </div>
  )
}

export default Profile
