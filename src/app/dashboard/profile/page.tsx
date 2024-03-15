"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { FaUser, FaBox, FaFileInvoice,FaBars } from "react-icons/fa";

export default function Profile() {
  const router = useRouter();
  // const username = useAppSelector((state) => state.authReducer.value.username);
  return (
    <div className="grid grid-cols-12">
      <aside
        style={{ height: "90vh" }}
        id="default-sidebar"
        className="hidden col-span-2 h-screen lg:block"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href={"/dashboard/party"}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <FaBox className="text-gray-500 transition duration-7 group-hover:text-gray-900 dark:group-hover:text-white"></FaBox>
                <span className="ms-3">Party/Ledger</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/invoice"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
<FaFileInvoice className="text-gray-500 transition duration-7 group-hover:text-gray-900 dark:group-hover:text-white"></FaFileInvoice>                <span className="flex-1 ms-3 whitespace-nowrap">Invoice</span>
                {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span> */}
              </Link>  
            </li>
            {/* <li>
              <Link
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li> */}
            <li>
              <Link
                href="/dashboard/supplier"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaBars className="text-gray-500 transition duration-7 group-hover:text-gray-900 dark:group-hover:text-white"></FaBars>
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="lg:col-span-10 sm:col-span-12 col-span-12 m-4 grid sm:grid-cols-2 gap-4">
        <div className="bg-indigo-100 hover:bg-indigo-200 rounded-lg shadow flex justify-center items-center flex-col">
          <FaUser className="text-5xl text-gray-600"></FaUser>
          <label className="text-4xl uppercase text-gray-600 my-3 font-bold">
            Customer
          </label>
        </div>
        <div className=" bg-indigo-100 hover:bg-indigo-200 rounded-lg shadow flex justify-center items-center flex-col">
          <FaBox className="text-5xl text-gray-600"></FaBox>
          <label className="text-4xl uppercase text-gray-600 my-3 font-bold">
            Supplier
          </label>
        </div>
        <div className="bg-indigo-100 hover:bg-indigo-200 rounded-lg shadow flex justify-center items-center flex-col">
          <FaFileInvoice className="text-5xl text-gray-600"></FaFileInvoice>
          <label className="text-4xl uppercase text-gray-600 my-3 font-bold">
            Invoice
          </label>
        </div>
        <div className="bg-indigo-100 rounded-lg hover:bg-indigo-200 shadow flex justify-center items-center flex-col">
          <FaUser className="text-5xl text-gray-600"></FaUser>
          <label className="text-4xl uppercase text-gray-600 my-3 font-bold">User</label>
        </div>
      </div>
    </div>
  );
}
