"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/header/header";
import { useRouter } from "next/navigation";
import Pagination from "@/components/pagination/pagination";
type CustomerModel = {
  _id: string;
  invoiceNo: number;
  date?: string;
  shipTo?: string
  shipToName?: string
  billTo?: string
  billToName?: string
  labourCharge?: number;
  freight?: number;
  gstType?: number;
  igst?: number;
  sgst?: number;
  cgst?: number;
  totalAmount?: number;
  totalAmountGst?: number;
};
function index() {
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
    const res = await axios.get("/api/invoice/getInvoice");
    const TotalNoofPages = (res.data.data).length;
    setData(res.data.data);
    console.log("TotalNumberofPages", TotalNoofPages)
    setTotalRows(TotalNoofPages)
  };
  // console.log("Data", data);
  const editFunction = async (id: string) => {
    console.log("Clicked edit", id);
    router.push("/invoice/form?id=" + id);
  };
  const deleteFunction = async (id: string, customerName: string) => {
    const data = {
      id: id,
    };
    await setCustomerName(customerName)
    await setCustomerId(id)
    setModal(!modal)
  };
  const deleteConfirmFunction = async () => {
    const data = {
      id: customerId,
    };
    try {
      const response = await axios.post(`/api/invoice/deleteInvoice`, data);
      await setModal(!modal)
      getCustomerdetails();
    } catch (error: any) {
      console.log(error);
      setModal(!modal)
    }
  };
  const onAddClick = async () => {
    router.push("/invoice/form");
  };
  return (
    <div>
      <div className="p-4 flex flex-row justify-end items-center bg-slate-50">
        <input
          className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded  p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder="Search..."
        ></input>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3">
          Search
        </button>
        <div className="p-3 text-black cursor-pointer">
          <svg
            onClick={onAddClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <hr />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sr. No.
            </th>
            <th scope="col" className="px-6 py-3">
              Bill To
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Invoice No.
            </th>
            <th scope="col" className="px-6 py-3">
              Total Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Contact Detail
            </th>
          </tr>
        </thead>
        {data?.map((item, idx) => {
          return (
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4">{idx + 1}</td>
              <td className="px-6 py-4">{item?.billToName}</td>
              <td className="px-6 py-4">{item?.date}</td>
              <td className="px-6 py-4">{item?.invoiceNo}</td>
              <td className="px-6 py-4">{item?.totalAmount}</td>
              <td className="px-6 py-4 flex flex-row">
                <div
                  className="text-black cursor-pointer"
                  onClick={() => editFunction(item?._id)}
                >
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

                <button
                  onClick={() => deleteFunction(item?._id, item?.billToName as any)}
                  id="deleteButton"
                  data-modal-target="deleteModal"
                  data-modal-toggle="deleteModal"
                  className="text-red-700 pl-2"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                {/* <div
                  className="pl-2 text-red-700 cursor-pointer"
                  onClick={() => deleteFunction(item?._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div> */}
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
            fetchdata={(newPage, newPageSize, searchText) => getCustomerdetails()}
            // searchText={searchText || ""}
            itemsPerPage={10}
          />
        {/* )} */}
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
              onClick={() => {setModal(false)}}
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
                 onClick={()=>{setModal(false)}}
                data-modal-toggle="deleteModal"
                type="button"
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
              <button
                type="submit"
                onClick={()=>{deleteConfirmFunction()}}
                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
