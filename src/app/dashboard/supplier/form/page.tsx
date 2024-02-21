"use client";

import Header from "@/components/header/header";
import axios from "axios";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type SupplierModel = {
  _id: string;
  supplierName: string;
  gstNo: string;
  address: string;
  contactPerson: string;
  contactDetail: string;
};

function form() {
  const router = useRouter();

  const defaultValues: SupplierModel = {
    _id: "",
    supplierName: "",
    gstNo: "",
    address: "",
    contactPerson: "",
    contactDetail: "",
  };
  const urlparams = new URLSearchParams(location.search);
  const id = urlparams.get("id");
  const [supplier, setSupplier] = useState<SupplierModel>(defaultValues);
  useEffect(() => {
        getSupplierDetailByid()
  }, [id]);
  const getSupplierDetailByid = async () => {
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
      setSupplier({ ...apiData})
    } catch (error: any) {
      console.log(error);
    }
  }
  const onSaveEdit = async () => {
    try {
      console.log(supplier);
      const response = await axios.post(
        "/api/supplier/saveSupplier",
        supplier
      );
      console.log("Save sucess", response.data);
      toast.success("Save success");
      router.push("/dashboard/supplier");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center py-2 bg-slate-50">
        <form className="w-full max-w-lg">
          <h1 className="block uppercase tracking-wide text-center text-gray-700 font-bold mb-8 text-3xl">
            Supplier Detail
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
                value={supplier.supplierName}
                placeholder="Enter Customer Name"
                onChange={(e) =>
                  setSupplier({ ...supplier, supplierName: e.target.value })
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
                value={supplier.gstNo}

                type="text"
                placeholder="Enter GST No."
                onChange={(e) =>
                  setSupplier({ ...supplier, gstNo: e.target.value })
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
                value={supplier.address}

                placeholder="Enter Address"
                onChange={(e) =>
                  setSupplier({ ...supplier, address: e.target.value })
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
                value={supplier.contactPerson}

                placeholder="Enter Name"
                onChange={(e) =>
                  setSupplier({ ...supplier, contactPerson: e.target.value })
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
                value={supplier.contactDetail}
                placeholder="Enter Detail"
                onChange={(e) =>
                  setSupplier({ ...supplier, contactDetail: e.target.value })
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
            onClick={() => router.push("/dashboard/supplier")}
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
