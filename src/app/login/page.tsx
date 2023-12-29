"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setloading] = useState(false);
  const [data, setData] = useState({});

  const onLogin = async () => {
    try {
      setloading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login sucess", response.data);
      toast.success("login success");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading..." : "Login"}</h1>
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg 
        mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg 
        mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg 
        mb-4 focus:outline-none focus:border-gray-600"
      >
        Sign Up
      </button>
      <Link href="/signup">Visit sign up page</Link>
    </div>
  );
}

export default Login;
