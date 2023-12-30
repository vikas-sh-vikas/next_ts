"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/application/application.module.css";
import axios from "axios";
import Header from "@/components/header";
import Link from "next/link";
import { useRouter } from "next/navigation";
type CustomerModel = {
  _id: string;
  customerName: string;
  gstNo: string;
  address: string;
  contactPerson: string;
  contactDetail: string;
};
function index() {
  const router = useRouter();
  const [data, setData] = useState<CustomerModel[]>([]);

  useEffect(() => {
    getCustomerdetails();
  }, []);
  const getCustomerdetails = async () => {
    const res = await axios.get("/api/customers/getcustomer");
    setData(res.data.data);
  };
  console.log("Data", data);
  const editFunction = async (id: string) => {
    console.log("Clicked edit", id);
    router.push("/application/form?id=" + id);
  };
const onAddClick = async () => {
  router.push("/application/form");
}
  return (
    <div>
      <Header />
      <div className="flex flex-col items-end bg-slate-50">
        <button
          onClick={onAddClick}
          className="bg-blue-500 p-1 border border-gray-300 rounded-lg 
                    m-1 focus:outline-none focus:border-gray-600 "
        >
          {"Add Customer"}
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sr. No.
            </th>
            <th scope="col" className="px-6 py-3">
              Customer Name
            </th>
            <th scope="col" className="px-6 py-3">
              GST No.
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Contact Person
            </th>
            <th scope="col" className="px-6 py-3">
              Contact Detail
            </th>
            <th scope="col" className="px-6 py-3">
              Action asd
            </th>
          </tr>
        </thead>
        {data?.map((item, idx) => {
          return (
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4">{idx + 1}</td>
              <td className="px-6 py-4">{item?.customerName}</td>
              <td className="px-6 py-4">{item?.gstNo}</td>
              <td className="px-6 py-4">{item?.address}</td>
              <td className="px-6 py-4">{item?.contactPerson}</td>
              <td className="px-6 py-4">{item?.contactDetail}</td>
              <td className="px-6 py-4">
                <div onClick={() => editFunction(item?._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                  </svg>
                </div>
              </td>
            </tr>
          );
        })}
        <tbody></tbody>
      </table>
    </div>
  );
}

export default index;
