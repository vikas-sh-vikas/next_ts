"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Forgetpassword from "../forgetpassword/page";
import { logOut, logIn } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";
import { Spin, Switch } from 'antd';

type LoginModel = {
  email: string;
  password: string;
};

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setloading] = useState(false);
  const [reset, setReset] = useState(false);
  const defaultValues: LoginModel = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState<LoginModel>(defaultValues);

  const onLogin = async () => {
    if (reset) {
      try {
        setloading(true);
        const response = await axios.post("/api/users/forgetpassword", user);
        toast.success("User Match");
        const id = response.data.data._id;
        router.push("/forgetpassword?id=" + id);
        console.log("response.data.data", response.data.data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setloading(false);
      }
    } else {
      try {
        setloading(true);
        const response = await axios.post("/api/users/login", user);
        console.log("login sucess", response.data);
        // response.cookies.set("token",token,{httpOnly: true});
        toast.success("login success");
        router.push("/dashboard/profile");
        // console.log("login sucess", response.data.data.username);
        const username = response.data.data.username;
        // console.log("Username", username);
        dispatch(logIn(username));
        document.cookie = `username=${username}`;
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setloading(false);
      }
    }
  };

  useEffect(() => {
    if (user?.email.length > 0 && user?.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="min-h-screen bg-indigo-500 flex flex-col items-center justify-center py-2">
      <Spin spinning={loading} size="large">

      <div className="flex flex-col bg-gray-50 items-center justify-center w-max p-20 rounded-3xl shadow-3xl">
        <h1 className="p-8 text-6xl font-family: Menlo font-semibold text-gray-600">
          {reset ? "RESET" : "LOGIN"}
        </h1>
        <label className="p-2 text-gray-800" htmlFor="email">
          Email
        </label>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            id="email"
            type="email"
          />
        </div>
        {!reset ? (
          <>
            <label className="p-2 text-gray-800" htmlFor="password">
              Password
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-1 focus:outline-none focus:border-gray-600 text-black"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
            />
            <Link
              onClick={() => setReset(true)}
              className="text-slate-900 justify-start text-xs text-gray-600 mb-4"
              href={""}
            >
              forget password or reset password
            </Link>
          </>
        ) : (
          <Link
            href={""}
            onClick={() => setReset(false)}
            className="text-slate-900 justify-start text-xs text-gray-600 mb-4"
          >
            Login with password
          </Link>
        )}

        <button
          onClick={onLogin}
          className="transition duration-150 ease-in-out bg-indigo-500  text-white font-bold py-2 px-4 rounded m-4"
        >
          {/* <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            </svg> */}
          {reset ? "Reset" : "Log In"}
        </button>
        <Link className="text-gray-600" href="/signup">
          Visit sign up page
        </Link>
      </div>
      </Spin>
    </div>
  );
}

export default Login;
