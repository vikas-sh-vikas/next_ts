"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/header/header";
import { useRouter } from "next/navigation";
import { FaPlus, FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import Pagination from "@/components/pagination/pagination";
type CustomerModel = {
  _id: string;
  customerName: string;
  gstNo: string;
  address: string;
  contactPerson: string;
  contactDetail: string;
};
function Index() {
  const router = useRouter();
  const [data, setData] = useState<CustomerModel[]>([]);
  const [modal, setModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    getCustomerdetails();
  }, []);
  const getCustomerdetails = async () => {
    try {
      const res = await axios.get("/api/customers/getcustomer");
      const TotalNoofPages = res.data.data.length;
      setData(res.data.data);
      console.log("TotalNumberofPages", TotalNoofPages);
      setTotalRows(TotalNoofPages);
    } catch (error) {
      console.log("Error", error);
    }
  };
  // console.log("Data", data);
  const editFunction = async (id: string) => {
    router.push(`/dashboard/party/form/${id}`);
  };
  const deleteFunction = async (id: string, customerName: string) => {
    const data = {
      id: id,
    };
    await setCustomerName(customerName);
    await setCustomerId(id);
    setModal(!modal);
  };
  const deleteConfirmFunction = async () => {
    const data = {
      id: customerId,
    };
    try {
      const response = await axios.post(`/api/customers/deleteCustomer`, data);
      await setModal(!modal);
      getCustomerdetails();
    } catch (error: any) {
      console.log(error);
      setModal(!modal);
    }
  };
  const onAddClick = async () => {
    router.push("/dashboard/party/form");
  };
  return (
    <div className="bg-white">
      <div className="p-4 flex flex-row justify-end items-center">
        <input
          className="appearance-none block bg-gray-100 text-gray-700 border border-gray-200 rounded  p-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder="Search..."
        ></input>
        <button className="bg-indigo-500 mx-2">
        <FaSearch className="m-2 text-lg text-white cursor-pointer"></FaSearch>
        </button>
        <button className="font-bold flex bg-indigo-500 mx-2">
          <span className="m-2 text-white" >
            Add
            </span>
        <FaPlus className="my-auto mx-2 text-lg text-white cursor-pointer" onClick={onAddClick}></FaPlus>
        </button>
      </div>
      <hr />
      <div style={{ height: "78vh" }}>
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
                Action
              </th>
            </tr>
          </thead>
          {data?.map((item, idx) => {
            return (
              <tr key={item._id} className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4">{idx + 1}</td>
                <td className="px-6 py-4">{item?.customerName}</td>
                <td className="px-6 py-4">{item?.gstNo}</td>
                <td className="px-6 py-4">{item?.address}</td>
                <td className="px-6 py-4">{item?.contactPerson}</td>
                <td className="px-6 py-4">{item?.contactDetail}</td>
                <td className="px-6 py-4 flex flex-row">
                  <FaEdit className="mr-3 text-lg text-black cursor-pointer" onClick={() => editFunction(item?._id)}>
                    
                  </FaEdit>
                  <FaTrash className="text-lg text-red-700 cursor-pointer"
                    onClick={() =>
                      deleteFunction(item?._id, item?.customerName)
                    }
                  ></FaTrash>
                </td>
              </tr>
            );
          })}
          <tbody></tbody>
        </table>
        <div>
          {/* {!isLoading && ( */}
          <Pagination
            filterRowsCount={totalRows}
            totalRows={totalRows}
            currentPage={1}
            // onPageChange={setCurrentPage}
            fetchdata={(newPage, newPageSize, searchText) =>
              getCustomerdetails()
            }
            // searchText={searchText || ""}
            itemsPerPage={10}
          />
          {/* )} */}
        </div>
      </div>
      {/* Delete Modla */}
      <div
        id="deleteModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          modal ? "" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <button
              onClick={() => {
                setModal(false);
              }}
              type="button"
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="deleteModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <svg
              className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <p className="mb-4 text-gray-500 dark:text-gray-300">
              Are you sure you want to delete {customerName}
            </p>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => {
                  setModal(false);
                }}
                data-modal-toggle="deleteModal"
                type="button"
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
              <button
                type="submit"
                onClick={() => {
                  deleteConfirmFunction();
                }}
                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                {"Yes, I'm sure"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
