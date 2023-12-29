"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function VerifyPage() {
    const [token,setToken] = useState("")
    const [isVerified,setIsverified] = useState(false)
    const [error,setError] = useState(false)


    const verifyEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail",{token})
            setIsverified(true)
        } catch (error:any) {
            setError(true);
            console.log(error.response.data)          
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
            setToken(urlToken || '')
    },[])
    useEffect(() => {
        if(token.length > 0){
            verifyEmail();
        }
    },[token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-4xl">Verify Email</h1>
                <h1 className="p-2 bg-orange-500 text-black">{token ? `${token}`: "no token"}</h1>
            {isVerified && (<div>
                    <h2 className="text-2xl">
                        Email Verified
                    </h2>
                <Link href="/login">
                    Login
                </Link>
            </div>)}
            {error && (<div>
                    <h2 className="text-2xl bg-red-500 text black">
                        Error
                    </h2>
            </div>)}
        </div>
    )
}