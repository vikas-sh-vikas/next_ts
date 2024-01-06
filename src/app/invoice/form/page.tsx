"use client";

import Header from "@/components/header/header";
import axios from "axios";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { Table,Input } from "reactstrap";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

type CustomerModel = {
  invoiceNo: string;
  Date: string;
  labourCharge: string;
  freight: number;
  igst: number;
  sgst: number;
  cgst: number;
  totalAmount: number;
  totalAmountGst: number;
  itemList?: {
    _id: string;
    description: string;
    qty: number;
    unit: string;
    unitPrice: number;
    discount: number;
    subTotal: number;
  }[];
};

function form() {
  const router = useRouter();
  // const { register, setValue } = useForm();
  const [invoice, setInvoice] = useState("")
  const defaultValues: CustomerModel = {
    invoiceNo: "",
    Date: "",
    labourCharge: "",
    freight: 0,
    igst: 0,
    sgst: 0,
    cgst: 0,
    totalAmount: 0,
    totalAmountGst: 0,
    itemList: [
      {
        _id: "",
        description: "",
        qty: 0,
        unit: "",
        unitPrice: 0,
        discount: 0,
        subTotal: 0,
      },
    ],
  };
  const urlparams = new URLSearchParams(location.search);
  const id = urlparams.get("id");
  const [customer, setCustomer] = useState<CustomerModel>(defaultValues);
  useEffect(() => {
    getCustomerDetailByid();
  }, [id]);
  const getCustomerDetailByid = async () => {
    // if(id){
    const data = {
      id: id,
    };
    // }
    try {
      const response = await axios.post(`/api/customers/getCustomerById`, data);
      const apiData = response.data.data;
      // console.log(apiData);
      setCustomer({ ...apiData });
    } catch (error: any) {
      console.log(error);
    }
  };
  const [formData, setFormData] = useState<CustomerModel>(defaultValues);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CustomerModel>({
    mode: "all",
    defaultValues: formData,
    // resolver: yupResolver<CustomerModel>(validationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "itemList",
  });
  const formValues = getValues();

  const onSaveEdit = async () => {
    try {
      const payload = {
        data: {
          invoicename: invoice,
          array: {
            ...formValues,
          },
        },
      };
      console.log("Payload-------->", payload);
      // console.log(customer);
      // const response = await axios.post(
      //   "/api/customers/savecustomer",
      //   customer
      // );
      // console.log("Save sucess", response.data);
      // toast.success("Save success");
      // router.push("/customer");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  // console.log("customer", customer);
  console.log("field Array", fields);
  console.log("field FormValues", formValues);

  return (
    <>
      <div className="flex flex-col items-center py-2 bg-slate-50">
        <form className="w-full p-4">
          <h1 className="block uppercase tracking-wide text-center text-gray-700 font-bold mb-8 text-3xl">
            Create Invoice
          </h1>

          <hr className="mb-2"></hr>
          <div className="flex flex-wrap -mx-3 mb-6" onSubmit={handleSubmit(onSaveEdit)}>
            <div className="w-full md:w-1/12 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Invoice No.
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                name="invoiceNo"
                value={formValues?.invoiceNo}
                placeholder="Enter Customer Name"
                onChange={(selected) =>
                  setValue("invoiceNo", selected.target.value, {
                    shouldValidate: true,
                  })
                }
              />
            </div>
            <div className="w-full md:w-10/12 px-3"></div>
            <div className="w-full md:w-1/12 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Date
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                name="Date"
                //value={formData.Date}
                placeholder="Enter Customer Name"
                onChange={(selected) => setValue("Date", selected.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Ship To
              </label>
              <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>
                  Really long option that will likely overlap the chevron
                </option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div className="w-full w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Bill To
              </label>
              <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>
                  Really long option that will likely overlap the chevron
                </option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>
          <Table className="table-sm table table-bordered" responsive>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Description</th>
                <th>Unit</th>
                <th>Qty.</th>
                <th>Unit Price</th>
                <th>Discount</th>
                <th>Total</th>
                <th style={{ textAlign: "center" }}>Action</th>
                <th>
                  <FaPlus
                    onClick={() =>
                      append({
                        _id: "",
                        description: "",
                        qty: 0,
                        unit: "",
                        unitPrice: 0,
                        discount: 0,
                        subTotal: 0,
                      })
                    }
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      name={`itemList.${index}.description`}
                      //value={formValues.itemList?.[index]?.description}
                      placeholder="Enter Description"
                      onChange={(e) => {
                        setValue(
                          `itemList.${index}.description`,
                          e.target.value
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Enter Quantity"
                      name={`itemList.${index}.qty`}
                      //value={formValues.itemList?.[index]?.qty}
                      onChange={(e) => {
                        setValue(
                          `itemList.${index}.qty`,
                          parseInt(e.target.value)
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Enter Unit"
                      name={`itemList.${index}.unit`}
                      //value={formValues.itemList?.[index]?.unit}
                      onChange={(e) => {
                        setValue(`itemList.${index}.unit`, e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Enter Unit Price"
                      name={`itemList.${index}.unitPrice`}
                      //value={formValues.itemList?.[index]?.unitPrice}
                      onChange={(e) => {
                        setValue(
                          `itemList.${index}.unitPrice`,
                          parseInt(e.target.value)
                        );
                      }}
                    />
                  </td>

                  <td>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Discount"
                      name={`itemList.${index}.discount`}
                      //value={formValues.itemList?.[index]?.discount}
                      onChange={(e) => {
                        setValue(
                          `itemList.${index}.discount`,
                          parseInt(e.target.value)
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      disabled={true}
                      placeholder="Total"
                      name={`itemList.${index}.subTotal`}
                      //value={formValues.itemList?.[index]?.subTotal}
                      onChange={(e) => {
                        setValue(
                          `itemList.${index}.subTotal`,
                          parseInt(e.target.value)
                        );
                      }}
                    />
                  </td>
                  <td>
                    <FaTrash onClick={() => remove(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                Laboar Charges
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                name="labourCharge"
                //value={formData.labourCharge}
                placeholder="Enter Name"
                onChange={(selected) =>
                  setValue("labourCharge", selected.target.value)
                }
              />
            </div>
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Freight
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                name="freight"
                //value={formData.freight}
                placeholder="Enter Detail"
                onChange={(selected) =>
                  setValue("freight", parseInt(selected.target.value))
                }
              />
            </div>
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                IGST
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                name="igst"
                //value={formData.igst}
                placeholder="Enter Detail"
                onChange={(selected) =>
                  setValue("igst", parseInt(selected.target.value))
                }
              />
            </div>
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                SGST
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                //value={formData.sgst}
                name="sgst"
                placeholder="Enter Detail"
                onChange={(selected) =>
                  setValue("sgst", parseInt(selected.target.value))
                }
              />
            </div>
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                CGST
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                name="cgst"
                //value={formData.cgst}
                placeholder="Enter Detail"
                onChange={(selected) =>
                  setValue("cgst", parseInt(selected.target.value))
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Total Amount
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                name="totalAmount"
                disabled={true}
                //value={formData.totalAmount}
                placeholder="Enter Detail"
                onChange={(selected) =>
                  setValue("totalAmount", parseInt(selected.target.value))
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Total Amount With GST
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                name="totalAmountGst"
                disabled={true}
                placeholder="Enter Detail"
                onChange={(selected) =>
                  setValue("totalAmountGst", parseInt(selected.target.value))
                }
              />
            </div>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <button
            onClick={onSaveEdit}
            //type="submit"
            // buttonClassNames="saveButton"
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
