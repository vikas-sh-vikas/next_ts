"use client";

import Header from "@/components/header/header";
import axios from "axios";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type CustomerModel = {
  _id: string;
  customerName: string;
  gstNo: string;
  address: string;
  contactPerson: string;
  contactDetail: string;
};

function form() {
  const router = useRouter();

  const defaultValues: CustomerModel = {
    _id: "",
    customerName: "",
    gstNo: "",
    address: "",
    contactPerson: "",
    contactDetail: "",
  };
  const urlparams = new URLSearchParams(location.search);
  const id = urlparams.get("id");
  const [customer, setCustomer] = useState<CustomerModel>(defaultValues);
  useEffect(() => {
        getCustomerDetailByid()
  }, [id]);
  const getCustomerDetailByid = async () => {
    // if(id){
    const data = {
      id: id,
    }
    // }
    try {
      const response = await axios.post(
        `/api/customers/getCustomerById`,data
      );
      const apiData = response.data.data;
      console.log(apiData)
      setCustomer({ ...apiData})
    } catch (error: any) {
      console.log(error);
    }
  }
  const onSaveEdit = async () => {
    try {
      console.log(customer);
      const response = await axios.post(
        "/api/customers/savecustomer",
        customer
      );
      console.log("Save sucess", response.data);
      toast.success("Save success");
      router.push("/application");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  console.log("customer", customer);
  return (
    <>
      <div className="flex flex-col items-center py-2 bg-slate-50">
        <form className="w-full max-w-lg">
          <h1 className="block uppercase tracking-wide text-center text-gray-700 font-bold mb-8 text-3xl">
            Cunstomer Detail
          </h1>

          <hr className="mb-2"></hr>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Customer Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                value={customer.customerName}
                placeholder="Enter Customer Name"
                onChange={(e) =>
                  setCustomer({ ...customer, customerName: e.target.value })
                }
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                GST No.
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                value={customer.gstNo}

                type="text"
                placeholder="Enter GST No."
                onChange={(e) =>
                  setCustomer({ ...customer, gstNo: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                value={customer.address}

                placeholder="Enter Address"
                onChange={(e) =>
                  setCustomer({ ...customer, address: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                Contact Person
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                value={customer.contactPerson}

                placeholder="Enter Name"
                onChange={(e) =>
                  setCustomer({ ...customer, contactPerson: e.target.value })
                }
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Contact Detail
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                value={customer.contactDetail}
                placeholder="Enter Detail"
                onChange={(e) =>
                  setCustomer({ ...customer, contactDetail: e.target.value })
                }
              />
            </div>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <button
            onClick={onSaveEdit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
          >
            {"Submit"}
          </button>
          <button
            onClick={() => router.push("/customer")}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4"
          >
            {"Cancel"}
          </button>
        </div>
      </div>
    </>
  );
}

export default form;
