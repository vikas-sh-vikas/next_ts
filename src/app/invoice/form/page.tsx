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
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Select from "react-select";



type CustomerModel = {
  invoiceNo: string;
  Date?: string;
  shipTo?:{
    label?: string;
    value?: string;
  },
  billTo?:{
    label?: string;
    value?: string;
  },
  labourCharge?: string;
  freight?: number;
  igst?: number;
  sgst?: number;
  cgst?: number;
  totalAmount?: number;
  totalAmountGst?: number;
  itemList?: {
    _id?: string;
    description?: string;
    qty?: number;
    unit?: string;
    unitPrice?: number;
    discount?: number;
    subTotal?: number;
  }[];
};

function form() {
  const router = useRouter();
  // const { register, setValue } = useForm();
  const [invoice, setInvoice] = useState("")
  const [selectOptionShip, setSelectOptionShip] = useState([{}])

  const defaultValues: CustomerModel = {
    invoiceNo: "",
    Date: "",
    shipTo: {
      label: "Select",
      value: "",
    },
    billTo: {
      label: "Select",
      value: "",
    },
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
    getCustomerdetails()
    if(id){
      getCustomerDetailByid();
    }
  }, []);
  const getCustomerdetails = async () => {
    console.log("Reach API")
    try {
      const res = await axios.get("/api/customers/getcustomer");
      const api:any[] = res.data.data
      const newArray: {}[] = api.map((item: any) => ({
        value: item._id,
        label: item.customerName
    }));
    console.log("Option Array",newArray)
    setSelectOptionShip(newArray)
    } catch (error) {
      console.log("Error", error)
    }
  };
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
  const schema = yup
  .object({
    invoiceNo: yup.string().required("Required"),
    Date: yup.string(),
    shipTo: 
    yup.object({
      label: yup.string(),
      value: yup.string(),
    }),
    billTo: 
    yup.object({
      label: yup.string(),
      value: yup.string(),
    }),
    labourCharge: yup.string(),
    freight: yup.number(),
    igst: yup.number(),
    sgst: yup.number(),
    cgst: yup.number(),
    totalAmount: yup.number(),
    totalAmountGst: yup.number(),
    itemList: yup.array().of(
      yup.object({
        _id: yup.string(),
        description: yup.string(),
        qty: yup.number(),
        unit: yup.string(),
        unitPrice: yup.number(),
        discount: yup.number(),
        subTotal: yup.number(),
      })
    ),
  })
  .required();
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
    resolver: yupResolver<CustomerModel>(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "itemList",
  });
  const formValues = getValues();
  const onSubmit: SubmitHandler<CustomerModel> = (data) => 
  {console.log("submit_data==========>", data)
  }
  // const country: CountryOption[] = [
  //   { label: "Bangladesh", value: 1 },
  //   { label: "India", value: 2 },
  //   { label: "China", value: 3 },
  //   { label: "Finland", value: 4 }
  // ];
  const country1 =
    { label: "Bangladesh", value: 1 }

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
  console.log("FormData------>",formValues)
  return (
    <>
      <div className="flex flex-col items-center py-2 bg-slate-50">
        <form className="w-full p-4" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="block uppercase tracking-wide text-center text-gray-700 font-bold mb-8 text-3xl">
            Create Invoice
          </h1>

          <hr className="mb-2"></hr>
          <div className="flex flex-wrap -mx-3 mb-6" >
            <div className="w-full md:w-1/12 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Invoice No.
              </label>
              <input
                //error={errors.invoiceNo?.message}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Enter Invoice Number"
                {...register('invoiceNo')}
              />
              <p>{errors.invoiceNo?.message}</p>
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
                {...register('Date')}
                placeholder="Enter Date"
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
              <Select
                isSearchable={true}
                name="supervisorId"
                value={formValues?.shipTo}
                options={selectOptionShip}
                onChange={(selected: any) => {
                setValue("shipTo.label", selected.label, {
                    // shouldValidate: true,
                });
                setValue("shipTo.value", selected.value, {
                    // shouldValidate: true,
                });
              }}
                // value={country.find((c) => c.value === field.value)}
                // onChange={(val) => field.onChange(val.value)}
                // defaultValue={country.find((c) => c.value === countryValue?.value)}
              />
              <p>{errors.invoiceNo?.message}</p>  
              {/* </Select> */}
            </div>
            <div className="w-full w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Bill To
              </label>
              <Select
                isSearchable={true}

                name="supervisorId"
                value={formValues?.billTo}
                options={selectOptionShip}
                onChange={(selected: any) => {
                setValue("billTo.label", selected.label, {
                    // shouldValidate: true,
                });
                setValue("billTo.value", selected.value, {
                    // shouldValidate: true,
                });
              }}
                // value={country.find((c) => c.value === field.value)}
                // onChange={(val) => field.onChange(val.value)}
                // defaultValue={country.find((c) => c.value === countryValue?.value)}
              />
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
                    {...register(`itemList.${index}.description`)}

                      placeholder="Enter Description"
                    />
                  </td>
                  <td>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Enter Qty"
                      {...register(`itemList.${index}.unit`)}

                    />
                  </td>
                  <td>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Enter Quantity"
                    {...register(`itemList.${index}.qty`)}
                    onChange={(e)=>{
                      setValue(`itemList.${index}.qty`,parseInt(e.target.value),{
                        shouldValidate: true,
                      })
                    }}
                    />
                  </td>

                  <td>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Enter Unit Price"
                      {...register(`itemList.${index}.unitPrice`)}
                      onChange={(e)=>{
                        setValue(`itemList.${index}.unitPrice`,parseInt(e.target.value),{
                          shouldValidate: true,
                        })
                      }}
                    />
                  </td>

                  <td>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Discount"
                      {...register(`itemList.${index}.discount`)}
                      onChange={(e)=>{
                        setValue(`itemList.${index}.discount`,parseInt(e.target.value),{
                          shouldValidate: true,
                        })
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
                      value={(formValues.itemList?.[index]?.qty as any)*(formValues.itemList?.[index]?.unitPrice as any)}
                      {...register(`itemList.${index}.subTotal`)}
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
                {...register('labourCharge')}
                placeholder="Enter Labour Charge"
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
                type="number"
                {...register('freight')}
                placeholder="Enter Freightl"
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
                type="number"
                {...register('igst')}
                placeholder="Enter IGST"
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
                type="number"
                {...register('sgst')}
                placeholder="Enter SGST"
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
                type="number"
                {...register('cgst')}
                placeholder="Enter CGST"
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
                type="number"
                disabled={true}
                {...register('totalAmount')}
                placeholder="Amount"
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
                type="number"
                disabled={true}
                {...register('totalAmountGst')}
                placeholder="Total Amount"
              />
            </div>
          </div>
        <div className="flex items-center justify-center">
          <button
            // onClick={onSaveEdit}
            type="submit"
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
        </form>
      </div>
      
    </>
  );
}

export default form;
