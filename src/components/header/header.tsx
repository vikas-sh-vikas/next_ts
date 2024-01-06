// "use client"
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { useAppSelector } from "@/redux/store";

// function Header() {
//   const router = useRouter();
//   // const username = useAppSelector((state) => state.authReducer.value.username);
//   // console.log("Appselector",useAppSelector)

;
  
//   return (
//     <>

//     </>
//   );
// }

// export default Header;


"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboardLayout/dashboardLayout";
import { useAppSelector } from "@/redux/store";
import axios from "axios";
import toast from "react-hot-toast";

export default function Header() {
  const router = useRouter();
  const username = useAppSelector((state) => state.authReducer.value.username);
  const [cookieToken, setCookieToken] = useState("");

  const [data, setData] = useState("");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // const getuserdetails = async () => {
  //   const res = await axios.get("/api/users/user");
  //   setData(res.data.data.username);
  // };

  useEffect(() => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    let token = '';

    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');

      if (name === 'token') {
        token = value;
        break;
      }
    }
    // console.log("coockie",cookies)
    // Set the token to the state
    setCookieToken(token);
  }, []);
  // const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  // let token = "";
  // for (const cookie of cookies) {
  //   const [name, value] = cookie.split("=");

  //   if (name === "token") {
  //     token = value;
  //     break;
  //   }
  // }
  // setCookieToken(cookies?.[0])
  // console.log("TokenValue------>",cookieToken)
  return (
    <div>
            <div className="bg-gray-50 flex flex-row items-center justify-end">
        <h2 className="text-black">{username}</h2>
        <button
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

