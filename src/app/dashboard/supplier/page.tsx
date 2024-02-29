"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/header/header";
import { useRouter } from "next/navigation";
import Pagination from "@/components/pagination/pagination";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { FaPlus } from "react-icons/fa";

type SupplierModel = {
  _id: string;
  supplierName: string;
  gstNo: string;
  address: string;
  contactPerson: string;
  contactDetail: string;
};
type itemModal = {
  _id?: string;
  itemName: string;
  unit: string;
  description: string;
  hsnCode: string;
  price: string;
};
function index(searchParams: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const router = useRouter();
  const [data, setData] = useState<SupplierModel[]>([]);
  const [modal, setModal] = useState(false);
  const [supplierName, setSupplierName] = useState("");
  const [SupplierId, setSupplierId] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const defaultValues: itemModal = {
    itemName: "",
    unit: "",
    description: "",
    hsnCode: "",
    price: "",
  };
  const validationSchema = yup.object({
    itemName: yup.string().required("customerName is required"),
    unit: yup.string().required("gstNo is required"),
    description: yup.string().required("partyType is required"),
    hsnCode: yup.string().required("country is required"),
    price: yup.string().required("state is required"),
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = useForm<itemModal>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const formValues = getValues();
  useEffect(() => {
    getSupplierdetails(currentPage, pageSize);
  }, [pageSize]);
  console.log("currentPage", currentPage);
  const getSupplierdetails = async (currentPage: number, pageSize: number) => {
    const res = await axios.get("/api/supplier/getSupplier");
    const TotalNoofPages = res.data.data.length;
    setData(res.data.data);
    setTotalRows(TotalNoofPages);
  };
  console.log("SearchParamas", searchParams);
  const editFunction = async (id: string) => {
    console.log("Clicked edit", id);
    router.push("/dashboard/supplier/form?id=" + id);
  };
  const deleteFunction = async (id: string, customerName: string) => {
    const data = {
      id: id,
    };
    toast.success("You did it!");
    console.log("You Didi It");
    await setSupplierName(customerName);
    await setSupplierId(id);
    setModal(!modal);
  };
  const deleteConfirmFunction = async () => {
    const data = {
      id: SupplierId,
    };
    try {
      const response = await axios.post(`/api/customers/deleteCustomer`, data);
      await setModal(!modal);
      getSupplierdetails(currentPage, pageSize);
    } catch (error: any) {
      console.log(error);
      setModal(!modal);
    }
  };
  const onAddClick = async () => {
    router.push("/dashboard/supplier/form");
  };
  const onSubmit: SubmitHandler<itemModal> = async (data) => {
    try {
      console.log("Data",data)
      // const response = await axios.post("/api/customers/savecustomer", data);
      // console.log("Save sucess", response.data);
      // toast.success("Save success");
      // router.push("/dashboard/customer");
    } catch (error: any) {
      console.log("Error", error);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Modal
        title="Item Detail"
        open={isModalOpen}
        footer=""
      >
        {" "}<form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          
          <div>
            <span>Item Name</span>
            <input
              className="w-full text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
              id="customerName"
              type="text"
              placeholder="Enter Item Name"
              {...register("itemName")}
            />
          </div>
          <div>
            <span>Unit</span>
            <input
              className="w-full text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
              id="unit"
              type="text"
              placeholder="Enter Unit"
              {...register("unit")}
            />
          </div>
          <div>
            <span>Description</span>
            <input
              className="w-full text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
              id="description"
              type="text"
              placeholder="Enter Description Name"
              {...register("description")}
            />
          </div>
          <div>
            <span>HSN Code</span>
            <input
              className="w-full text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
              id="hsnCode"
              type="text"
              placeholder="Enter hsnCode Name"
              {...register("hsnCode")}
            />
          </div>
          <div>
            <span>Price</span>
            <input
              className="w-full text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
              id="price"
              type="text"
              placeholder="Enter Price Name"
              {...register("price")}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3"
          type="submit"
          // onClick={handleOk}
          >
            Save
          </button>
          <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-3"
          onClick={handleCancel}>
            Cancel
          </button>
        </div>
        </form>
      </Modal>
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
          <FaPlus onClick={showModal}></FaPlus>
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
              Supplier Name
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
        {data
          ?.slice(
            (currentPage - 1) * pageSize,
            (currentPage - 1) * pageSize + pageSize
          )
          .map((item, idx) => {
            return (
              <tr className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4">
                  {idx + 1 + (currentPage - 1) * pageSize}
                </td>
                <td className="px-6 py-4">{item?.supplierName}</td>
                <td className="px-6 py-4">{item?.gstNo}</td>
                <td className="px-6 py-4">{item?.address}</td>
                <td className="px-6 py-4">{item?.contactPerson}</td>
                <td className="px-6 py-4">{item?.contactDetail}</td>
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
                    onClick={() =>
                      deleteFunction(item?._id, item?.supplierName)
                    }
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
                </td>
              </tr>
            );
          })}
        <tbody></tbody>
      </table>

      <Pagination
        filterRowsCount={totalRows}
        totalRows={totalRows}
        currentPage={currentPage}
        onPageChange={(newPage, newPageSize) => {
          setCurrentPage(newPage);
          setPageSize(newPageSize);
        }}
        fetchdata={(currentPage, pageSize) => {
          setPageSize(pageSize);
          console.log("Pagination Page Size-----<", pageSize),
            getSupplierdetails(currentPage, pageSize);
        }}
        // searchText={searchText || ""}
        itemsPerPage={pageSize}
      />
      <div
        id="deleteModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          modal ? "" : "hidden"
        } fixed bottom-1/2 left-1/2 transform -translate-x-1/2 p-4 z-50`}
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
              Are you sure you want to delete {supplierName}
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
