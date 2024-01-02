"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";




function Forgetpassword() {
  const router = useRouter();
  const [user, setUser] = useState({
    newPassword: "",
    matchPassword: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setloading] = useState(false);
  const [data, setData] = useState({});
  const urlparams = new URLSearchParams(location.search);
  const id = urlparams.get("id");
  const onLogin = async () => {
    if(user.newPassword == user.matchPassword && user.newPassword != "" && user.matchPassword != ""){
      try {
        setloading(true);
        const payload = {
          password: user.newPassword,
          userId: id,
        }
        const response = await axios.post("/api/users/reset", payload);
        console.log("login sucess", response.data);
        toast.success("reset success");
        router.push("/login");
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setloading(false);
      }
    }
    else {
      console.log("Password not matched")
    }
  };
  useEffect(() => {

    if (user.newPassword.length > 0 && user.matchPassword.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="p-8 text-6xl">{loading ? "Loading..." : "Reset Password"}</h1>

      <label className="p-2 " htmlFor="password">New Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg 
        mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.newPassword}
        onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
        placeholder="password"
      />
      <label className="p-2 " htmlFor="password">Repeat Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg 
        mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.matchPassword}
        onChange={(e) => setUser({ ...user, matchPassword: e.target.value })}
        placeholder="password"
      />
      
      <button
        onClick={onLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
      >
        Reset Password
      </button>
      <Link className="text-slate-900" href="/signup">Visit sign up page</Link>  
    </div>
  );
}

export default Forgetpassword;
