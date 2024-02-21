"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import DashboardLayout from "@/components/dashboardLayout/dashboardLayout";
import { useAppSelector } from "@/redux/store";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { UserOutlined } from '@ant-design/icons';

import { Avatar, Space } from 'antd';

export default function Header() {
  const router = useRouter();
  // const username = useAppSelector((state) => state.authReducer.value.username);
  const [username, setUsername] = useState("");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success");
      router.push("/login");
      document.cookie =
        "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUsername("");
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  // let x =document.cookie
  useEffect(() => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    let Username = "";
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "username") {
        Username = value;
        break;
      }
    }
    setUsername(Username)
  },[])
  return (
    <div >
      <div className="bg-gray-50 flex flex-row items-center justify-end">
      <Avatar size="large" icon={<UserOutlined />} />
        <span className="text-gray-900 hover:bg-gray-100 cursor-default px-4">{username}</span>
        <button
          onClick={logout}
          className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
        >
          Logout
        </button>
        <Link
          href={"/dashboard/profile"}
          className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
