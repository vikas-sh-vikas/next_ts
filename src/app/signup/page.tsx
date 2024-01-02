"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Sign Up", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("error", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="p-8 text-6xl" >{loading ? "Processing" : "Sign Up"}</h1>
      <label className="p-2" htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg 
        mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label className="p-2" htmlFor="email">
        Email
        </label>
      <input
        className="p-2 border border-gray-300 rounded-lg 
        mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label className="p-2" htmlFor="password">
        Password
        </label>
      <input
        className="p-2 border border-gray-300 rounded-lg 
        mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="text"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignup}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
      >
        {"Sign Up"}
      </button>
      <Link className="text-slate-900" href="/login">Visit login page</Link>
    </div>
  );
}

export default SignUp;
