"use client";

import Header from "@/components/header/header";
import axios from "axios";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { Table, Input } from "reactstrap";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";

type CustomerModel = {
  invoiceNo: string;
  Date?: string;
  shipTo?: {
    label?: string;
    value?: string;
  };
  billTo?: {
    label?: string;
    value?: string;
  };
  labourCharge?: any;
  freight?: any;
  gstType?: {
    label?: string;
    value?: string;
  };
  igst?: {
    label?: string;
    value?: string;
  };
  sgst?: {
    label?: string;
    value?: string;
  };
  cgst?: {
    label?: string;
    value?: string;
  };
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
  const [invoice, setInvoice] = useState("");
  const [selectOptionShip, setSelectOptionShip] = useState([{}]);

  const defaultValues: CustomerModel = {
    invoiceNo: "",
    Date: "",
    labourCharge: 0,
    freight: 0,
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
    getCustomerdetails();
    if (id) {
      getCustomerDetailByid();
    }
  }, []);
  const gstOptions = [
    {
      label: "5%",
      value: "5",
    },
    {
      label: "12%",
      value: "12",
    },
    {
      label: "18%",
      value: "18",
    },
    {
      label: "28%",
      value: "28",
    },
  ];
  const sgstOptions = [
    {
      label: "2.5%",
      value: "2.5",
    },
    {
      label: "6%",
      value: "6",
    },
    {
      label: "9%",
      value: "9",
    },
    {
      label: "14%",
      value: "14",
    },
  ];
  const getCustomerdetails = async () => {
    // console.log("Reach API");
    try {
      const res = await axios.get("/api/customers/getcustomer");
      const api: any[] = res.data.data;
      const newArray: {}[] = api.map((item: any) => ({
        value: item._id,
        label: item.customerName,
      }));
      // console.log("Option Array", newArray);
      setSelectOptionShip(newArray);
    } catch (error) {
      console.log("Error", error);
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
      shipTo: yup.object({
        label: yup.string(),
        value: yup.string(),
      }),
      billTo: yup.object({
        label: yup.string(),
        value: yup.string(),
      }),
      labourCharge: yup.string(),
      freight: yup.number(),
      igst: yup.object({
        label: yup.string(),
        value: yup.string(),
      }),
      sgst: yup.object({
        label: yup.string(),
        value: yup.string(),
      }),
      cgst: yup.object({
        label: yup.string(),
        value: yup.string(),
      }),
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
    // resolver: yupResolver<CustomerModel>(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "itemList",
  });
  const formValues = getValues();
  const onSubmit: SubmitHandler<CustomerModel> = (data) => {
    console.log("submit_data==========>", data);
  };
  // const country: CountryOption[] = [
  //   { label: "Bangladesh", value: 1 },
  //   { label: "India", value: 2 },
  //   { label: "China", value: 3 },
  //   { label: "Finland", value: 4 }
  // ];
  const country1 = { label: "Bangladesh", value: 1 };
  // console.log("FormGST", formValues.igst);

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
  const subTotalCal = (discount: any, quantity: any, price: any) => {
    const total = (quantity * price * (100 - discount)) / 100;
    totalCal();
    return total;
  };
  const totalCal = () => {
    const arrayObj: any | undefined = formValues?.itemList;
    console.log("arrayObj", arrayObj);

    let totalSubTotal: any = 0;

    for (const currentValue of arrayObj) {
      // Assuming an asynchronous operation here
      // const result = await someAsyncOperation(currentValue);
      totalSubTotal += currentValue.subTotal;
    }
    const total = parseInt((formValues.labourCharge) || 0) + parseInt((formValues?.freight) || 0) + parseInt(totalSubTotal)
    setValue("totalAmount",total)
    
    if(formValues.gstType?.value == "1"){
      const gstPer = 1 + (parseInt(formValues.igst?.value || ""))/100
      console.log("gst%",gstPer)
      const TotalWithGST = total*gstPer;
      setValue("totalAmountGst",TotalWithGST)
    }
    if(formValues.gstType?.value == "2"){
      const gstPer = 1 + (parseInt(formValues.cgst?.value || ""))/100 + (parseInt(formValues.sgst?.value || ""))/100
      const TotalWithGST = total*gstPer;
      setValue("totalAmountGst",TotalWithGST)
    }
    
    // console.log("total", total); 
  };
  // console.log("FormData------>", formValues);
  return (
    <>
      <div className="flex flex-col items-center py-2 bg-slate-50">
        <form className="w-full p-4" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="block uppercase tracking-wide text-center text-gray-700 font-bold mb-8 text-3xl">
            Create Invoice
          </h1>

          <hr className="mb-2"></hr>
          <div className="flex flex-wrap -mx-3 mb-6">
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
                {...register("invoiceNo")}
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
                {...register("Date")}
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
                <th>Discount %</th>
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
                      placeholder="Enter Unit"
                      {...register(`itemList.${index}.unit`)}
                    />
                  </td>
                  <td>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Enter Quantity"
                      // {...register(`itemList.${index}.qty`)}
                      onChange={(e) => {
                        setValue(
                          `itemList.${index}.subTotal`,
                          subTotalCal(
                            formValues.itemList?.[index]?.discount,
                            e.target.value,
                            formValues.itemList?.[index]?.unitPrice
                          ),
                          {
                            shouldValidate: true,
                          }
                        );
                        setValue(
                          `itemList.${index}.qty`,
                          parseInt(e.target.value),
                          {
                            shouldValidate: true,
                          }
                        );
                      }}
                    />
                  </td>

                  <td>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Enter Unit Price"
                      // {...register(`itemList.${index}.unitPrice`)}
                      onChange={(e) => {
                        setValue(
                          `itemList.${index}.subTotal`,
                          subTotalCal(
                            formValues.itemList?.[index]?.discount,
                            formValues.itemList?.[index]?.qty,
                            e.target.value
                          ),
                          {
                            shouldValidate: true,
                          }
                        );
                        setValue(
                          `itemList.${index}.unitPrice`,
                          parseInt(e.target.value),
                          {
                            shouldValidate: true,
                          }
                        );
                      }}
                    />
                    <form action="" method="get"></form>
                  </td>

                  <td>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Discount"
                      // {...register(`itemList.${index}.discount`)}
                      onChange={(e) => {
                        setValue(
                          `itemList.${index}.discount`,
                          parseInt(e.target.value),
                          {
                            shouldValidate: true,
                          }
                        );
                        setValue(
                          `itemList.${index}.subTotal`,
                          subTotalCal(
                            e.target.value,
                            formValues.itemList?.[index]?.qty,
                            formValues.itemList?.[index]?.unitPrice
                          ),
                          {
                            shouldValidate: true,
                          }
                        );
                        // subTotalCal(e.target.value, formValues.itemList?.[index]?.qty, formValues.itemList?.[index]?.unitPrice)
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      // disabled={true}
                      placeholder="Total"
                      // onChange={(e) => {
                      //   console.log(e)
                      // }}
                      value={formValues?.itemList?.[index].subTotal}
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
                className="appearance-none blockgffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffggg w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="number"
                {...register("labourCharge")}
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
                {...register("freight", {
                  valueAsNumber: true, // Treat the value as a number
                })}
                placeholder="Enter Freightl"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                GST
              </label>
              <Select
                isSearchable={true}
                name="supervisorId"
                value={formValues?.gstType}
                options={[
                  {
                    label: "IGST",
                    value: "1",
                  },
                  {
                    label: "CGST/SGST",
                    value: "2",
                  },
                ]}
                onChange={(selected: any) => {
                  setValue("gstType.label", selected.label, {
                    shouldValidate: true,
                  });
                  setValue("gstType.value", selected.value, {});
                }}
              />
            </div>
            {formValues.gstType?.value == "1" ? (
              <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-zip"
                >
                  IGST
                </label>
                <Select
                  isSearchable={true}
                  name="supervisorId"
                  value={formValues?.igst}
                  options={gstOptions}
                  onChange={(selected: any) => {
                    setValue("igst.label", selected.label, {
                      shouldValidate: true,
                    });
                    setValue("igst.value", selected.value, {});
                    setValue("sgst", {});
                    setValue("cgst", {});
                  }}
                />
              </div>
            ) : formValues.gstType?.value == "2" ? (
              <>
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-zip"
                  >
                    CGST
                  </label>
                  <Select
                    isSearchable={true}
                    name="supervisorId"
                    value={formValues?.cgst}
                    options={sgstOptions}
                    onChange={(selected: any) => {
                      setValue("cgst.label", selected.label, {
                        shouldValidate: true,
                      });
                      setValue("cgst.value", selected.value, {});
                      setValue("sgst.label", selected.label, {});
                      setValue("sgst.value", selected.value, {});
                      setValue("igst", {});
                    }}
                  />
                </div>
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-zip"
                  >
                    SGST
                  </label>
                  <Select
                    isSearchable={true}
                    name="supervisorId"
                    value={formValues?.sgst}
                    options={sgstOptions}
                    onChange={(selected: any) => {
                      setValue("sgst.label", selected.label, {
                        shouldValidate: true,
                      });
                      setValue("sgst.value", selected.value, {});
                      setValue("cgst.label", selected.label, {});
                      setValue("cgst.value", selected.value, {});
                      setValue("igst", {});
                    }}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
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
                // value=
                // {
                // ((formValues.itemList?.[index]?.qty as any) || 0) *
                //   ((formValues.itemList?.[index]?.unitPrice as any) ||
                //     0) -
                // ((formValues.itemList?.[index]?.qty as any) || 0) *
                //   ((formValues.itemList?.[index]?.unitPrice as any) ||
                //     0) *
                //   (((formValues.itemList?.[index]?.discount as any) ||
                //     0) /
                //     100)
                // }

                type="number"
                disabled={true}
                {...register("totalAmount")}
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
                {...register("totalAmountGst")}
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
            <button
              onClick={() => router.push("invoice/template")}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4"
            >
              {"View Report"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default form;
