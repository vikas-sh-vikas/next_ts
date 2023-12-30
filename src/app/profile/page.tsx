"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import DashboardLayout from "@/components/layout/layout";

export default function Profile() {
  const router = useRouter();

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-cyan-600">
        <h1>Profile</h1>
        <hr />
        <p className="text-4xl">Profile Page</p>
        <hr></hr>
      </div>
    </div>
  );
}

// export default Profile;
Profile.getLayout = DashboardLayout;