"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { Table, Input } from "reactstrap";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.css";

type CustomerModel = {
  invoiceNo?: number;
  date?: string;
  shipTo?: {
    label?: string;
    value?: string;
  };
  billTo?: {
    label?: string;
    value?: number;
  };
  labourCharge?: number;
  freight?: number;
  gstType?: {
    label?: string;
    value?: number | undefined;
  };
  igst?: {
    label?: string;
    value?: number | undefined;
  };
  sgst?: {
    label?: string;
    value?: number | undefined;
  };
  cgst?: {
    label?: string;
    value?: number | undefined;
  };
  totalAmount?: number;
  totalAmountGst?: number;
  itemList?: {
    // _id?: string;
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
  const [selectOptionShip, setSelectOptionShip] = useState([{}]);
  const defaultValues: CustomerModel = {
    // invoiceNo: 0,
    date: "",
    labourCharge: 0,
    freight: 0,
    totalAmount: 0,
    totalAmountGst: 0,
    itemList: [
      {
        description: "",
        qty: 0,
        unit: "",
        unitPrice: 0,
        discount: 0,
        subTotal: 0,
      },
    ],
  };
  const [formData, setFormData] = useState<CustomerModel>(defaultValues);

  const urlparams = new URLSearchParams(location.search);
  const id = urlparams.get("id");
  const html2pdf = require("html2pdf.js");
  useEffect(() => {
    getCustomerdetails();
    if (id) {
      getInvoiceDetailByid();
    }
  }, [id]);
  const gstOptions = [
    {
      label: "5%",
      value: 5,
    },
    {
      label: "12%",
      value: 12,
    },
    {
      label: "18%",
      value: 18,
    },
    {
      label: "28%",
      value: 28,
    },
  ];
  const gstType = [
    {
      label: "IGST",
      value: 1,
    },
    {
      label: "CGST/SGST",
      value: 2,
    },
  ];
  const sgstOptions = [
    {
      label: "2.5%",
      value: 2.5,
    },
    {
      label: "6%",
      value: 6,
    },
    {
      label: "9%",
      value: 9,
    },
    {
      label: "14%",
      value: 14,
    },
  ];
  const downloadPDF = async () => {
    let html: any = await fetch(`/template/invoiceReport.html`);
    html = await html.text();
    const item = formValues?.itemList;
    html = html
      .toString()
      .replace(
        "@Name@",
        (formValues?.itemList || []).map(
          (item, index) =>
            `<tr key={index}>
          <td>${index + 1}</td>
          <td>
            ${item.description}
          </td>
          <td>
            ${item.unit}
          </td>
          <td>
            ${item.qty}
          </td>
          <td>
            ${item.unitPrice}
          </td>
          <td>
            ${item.discount}
          </td>
          <td>
            ${item.subTotal}
          </td>
        </tr>`
        )
      )
      .replace("@invoiceNo@", formValues?.invoiceNo)
      .replace("@date@", formValues?.date)
      .replace("@shipTo@", formValues?.shipTo?.label)
      .replace("@billTo@", formValues?.billTo?.label)
      .replace("@labourCharge@", formValues?.labourCharge)
      .replace("@freight@", formValues?.freight)
      .replace("@gstType@", formValues?.gstType?.label)
      .replace("@igstper@", formValues?.igst?.label)
      .replace("@cgstper@", formValues?.cgst?.label)
      .replace("@sgstper@", formValues?.sgst?.label)
      .replace("@total@", formValues?.totalAmount)
      .replace("@totalGst@", formValues?.totalAmountGst);

    console.log(html);
    const opt = {
      margin: [20, 20, 20, 20],
      zoom: "100%",
      filename: "test.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        dpi: 192,
        scale: 4,
        letterRendering: true,
        useCORS: true,
        scrollY: 0,
      },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };
    console.log("html", html);
    html2pdf()
      .set(opt)
      .from(html)
      .toPdf()
      .get("pdf")
      .output("dataurlnewwindow");
  };
  const getCustomerdetails = async () => {
    try {
      const res = await axios.get("/api/customers/getcustomer");
      const api: any[] = res.data.data;
      const newArray: {}[] = api.map((item: any) => ({
        value: item._id,
        label: item.customerName,
      }));
      setSelectOptionShip(newArray);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const getInvoiceDetailByid = async () => {
    const data = {
      id: id,
    };
    // }
    try {
      const response = await axios.post(`/api/invoice/getInvoiceById`, data);
      const apiData: any = response.data.data;
      // console.log("Invoice Number in Edit", apiData);
      // setValue("invoiceNo",apiData.invoiceNo);;
      const gstTypeFilter: any = gstType.filter(
        (gstType) => gstType.value === apiData.gstType
      );
      const igstFilter: any = gstOptions.filter(
        (gstType) => gstType.value === apiData.igst
      );
      const sgstTypeFilter: any = sgstOptions.filter(
        (gstType) => gstType.value === apiData.sgst
      );
      const cgstTypeFilter: any = sgstOptions.filter(
        (gstType) => gstType.value === apiData.cgst
      );
      console.log("igstType ----- > ", sgstTypeFilter);
      reset({
        ...apiData,
        shipTo: { label: apiData.shipToName, value: apiData.shipTo },
        billTo: { label: apiData.shipToName, value: apiData.shipTo },
        gstType: {
          label: gstTypeFilter[0].label,
          value: gstTypeFilter[0].value,
        },
        igst:
          apiData.gstType == 1
            ? {
                label: igstFilter[0].label,
                value: igstFilter[0].value,
              }
            : igstFilter,
        cgst:
          apiData.gstType == 2
            ? {
                label: sgstTypeFilter[0].label,
                value: sgstTypeFilter[0].value,
              }
            : cgstTypeFilter,
        sgst:
          apiData.gstType == 2
            ? {
                label: cgstTypeFilter[0].label,
                value: cgstTypeFilter[0].value,
              }
            : sgstTypeFilter,
      });
      try {
        const response = await axios.post(
          `/api/invoice/getInvoiceMaterialById`,
          data
        );
        const apiData: any = response.data.data;
        // console.log("DataMaterial", apiData);
        setValue("itemList", apiData);
        // reset({
        //   ...formValues, // keep existing form data
        //   itemList: apiData, // update itemList with new data
        // });
      } catch (error: any) {
        console.log(error);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const schema = yup
    .object({
      invoiceNo: yup.number().required("Required"),
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
  const onSubmit: SubmitHandler<CustomerModel> = async (data) => {
    const {
      itemList,
      shipTo,
      billTo,
      igst,
      gstType,
      sgst,
      cgst,
      ...formvaluesFilter
    } = data;
    const payloadWithGst = {
      ...formvaluesFilter,
      // id ? _id : id,
      gstType: data.gstType?.value,
      igst: data.gstType?.value == 1 ? data.igst?.value : 0,
      sgst: data.gstType?.value == 2 ? data.sgst?.value : 0,
      cgst: data.gstType?.value == 2 ? data.cgst?.value : 0,
      billTo: data.billTo?.value,
      billToName: data.billTo?.label,
      shipTo: data.shipTo?.value,
      shipToName: data.shipTo?.label,
    };
    try {
      const payload = payloadWithGst;
      const response = await axios.post("/api/invoice/saveInvoice", payload);
      // console.log("Save sucess", response.data);
      const obj: any = formValues.itemList;
      const invoiceId = response.data.id;
      const updatedData = obj.map((item: any) => ({ ...item, invoiceId }));
      console.log("Update After Edit", updatedData);
      const payload2 = updatedData;
      // if(invoiceId){

      try {
        const response = await axios.post(
          "/api/invoice/saveInvoiceMaterial",
          payload2
        );
        console.log("Save sucess", response.data);

        toast.success("Save success");
        // router.push("/invoice");
      } catch (error: any) {
        toast.error(error.message);
      }
      // }

      // toast.success("Save success");
      router.push("/invoice");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const subTotalCal = (discount: any, quantity: any, price: any) => {
    const total = (quantity * price * (100 - discount)) / 100;
    setTimeout(() => {
      totalCal();
    }, 1000);
    return total;
  };
  const totalCal = (
    labourCharge?: any,
    freight?: any,
    igst?: any,
    sgst?: any
  ) => {
    const arrayObj: any | undefined = formValues?.itemList;
    console.log("arrayObj", arrayObj);

    let totalSubTotal: number = 0;

    for (const currentValue of arrayObj) {
      totalSubTotal += parseInt(currentValue.subTotal);
    }
    const total: any =
      parseFloat(labourCharge ? labourCharge : formValues?.labourCharge || 0) +
      parseFloat(freight ? freight : formValues?.freight || 0) +
      totalSubTotal;
    setValue("totalAmount", parseInt(total));
    if (formValues.gstType?.value == 1) {
      const gstPer =
        1 + parseFloat(igst ? igst : formValues.igst?.value || "") / 100;
      const TotalWithGST: any = total * gstPer;
      setValue("totalAmountGst", parseInt(TotalWithGST));
    }
    if (formValues.gstType?.value == 2) {
      console.log("Reach in cgst", formValues.cgst?.value);
      const gstPer =
        1 +
        parseFloat(sgst ? sgst : formValues.cgst?.value || "") / 100 +
        parseFloat(sgst ? sgst : formValues.sgst?.value || "") / 100;
      const TotalWithGST: any = total * gstPer;
      setValue("totalAmountGst", parseInt(TotalWithGST));
    }
  };
  console.log("formValues", formValues);
  return (
    <>
      <div>
        <h1 className="block uppercase tracking-wide text-center text-gray-700 font-bold mb-8 text-3xl">
          Create Invoice
        </h1>
        <hr className="mb-2"></hr>
        <form className="w-full p-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="row flex flax-wrap mx-3 mb-6 justify-between">
            <div className="col-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Invoice No.
              </label>
              <input
                //error={errors.invoiceNo?.message}
                className="text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
                id="grid-first-name"
                type="text"
                value={formValues.invoiceNo}
                placeholder="Enter Invoice Number"
                onChange={(e) => {
                  setValue("invoiceNo", parseInt(e.target.value));
                }}
                // {...register("invoiceNo")}
              />
              <p>{errors.invoiceNo?.message}</p>
            </div>
            <div className="col-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Date
              </label>
              <input
                className="text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
                type="date"
                {...register("date")}
                placeholder="Enter Date"
              />
            </div>
          </div>
          <hr className="mb-2"></hr>

          <div className="row flex flex-wrap mx-3 mb-6">
            <div className="col-6">
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
              />
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
                htmlFor="grid-password"
              >
                Address
              </label>
              <input
                className="w-100 text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
                type="text"
                placeholder="Enter Date"
              />
            </div>
            <div className="col-6">
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
              />
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
                htmlFor="grid-password"
              >
                Address
              </label>
              <input
                className="w-100 text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
                type="text"
                placeholder="Enter Date"
              />
            </div>
          </div>
          <div className="mx-6 mb-6">
            <Table
              className="table-lg table table-bordered bg-white mb-6"
              responsive
            >
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Description</th>
                  <th>Unit</th>
                  <th>Qty.</th>
                  <th>Unit Price</th>
                  <th>Discount %</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((item, index) => (
                  <tr key={index}>
                    <td className="pt-3">{index + 1}</td>

                    <td>
                      <input
                        className="w-100 text-gray-700 border-0 rounded py-2 px-2 mb-3 focus:outline-none"
                        type="text"
                        value={formValues.itemList?.[index]?.description}
                        onChange={(e) => {
                          setValue(
                            `itemList.${index}.description`,
                            e.target.value,
                            {
                              shouldValidate: true,
                            }
                          );
                        }}
                        placeholder="Enter Description"
                      />
                    </td>
                    <td>
                      <input
                        value={formValues.itemList?.[index]?.unit}
                        onChange={(e) => {
                          setValue(`itemList.${index}.unit`, e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        className="w-100 text-gray-700 border-0 rounded py-2 px-2 mb-3 focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        placeholder="Enter Unit"
                        //{...register(`itemList.${index}.unit`)}
                      />
                    </td>
                    <td>
                      <input
                        className="w-100 text-gray-700 border-0 rounded py-2 px-2 mb-3 focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        placeholder="Enter Quantity"
                        value={formValues.itemList?.[index]?.qty || ""}
                        onChange={(e) => {
                          // Parse the entered value as an integer
                          const enteredQty = parseInt(e.target.value);

                          // Limit the value to 100
                          const limitedQty =
                            enteredQty > 100 ? 100 : enteredQty;
                          console.log("Value")
                          setValue(
                            `itemList.${index}.subTotal`,
                            subTotalCal(
                              formValues.itemList?.[index]?.discount,
                              limitedQty,
                              formValues.itemList?.[index]?.unitPrice
                            ),
                            {
                              shouldValidate: true,
                            }
                          );
                          setValue(
                            `itemList.${index}.qty`,
                            limitedQty,
                            {
                              shouldValidate: true,
                            }
                          );
                        }}
                      />
                    </td>
                    <td>
                      <input
                        className="w-100 text-gray-700 border-0 rounded py-2 px-2 mb-3 focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        placeholder="Enter Unit Price"
                        value={formValues.itemList?.[index]?.unitPrice || ""}
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
                        className="w-100 text-gray-700 border-0 rounded py-2 px-2 mb-3 focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        placeholder="Discount"
                        value={formValues.itemList?.[index]?.discount || ""}
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
                        }}
                      />
                    </td>
                    <td>
                      <input
                        className="w-100 text-gray-700 border-0 rounded py-2 px-2 mb-3 focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        placeholder="Total"
                        value={formValues?.itemList?.[index].subTotal || ""}
                        {...register(`itemList.${index}.subTotal`)}
                      />
                    </td>
                    <td className="flex pt-3">
                      {index > 0 && <FaTrash onClick={() => remove(index)} />}
                      <FaPlus
                        onClick={() =>
                          append({
                            description: "",
                            qty: 0,
                            unit: "",
                            unitPrice: 0,
                            discount: 0,
                            subTotal: 0,
                          })
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="row flex flex-wrap mx-3 mb-6">
            <div className="w-full col-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                Laboar Charges
              </label>
              <input
                value={formValues.labourCharge}
                className="w-100 text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
                id="grid-city"
                type="number"
                onChange={(e) => {
                  setValue("labourCharge", parseInt(e.target.value), {
                    shouldValidate: true,
                  });
                  totalCal(e.target.value);
                }}
                placeholder="Enter Labour Charge"
              />
            </div>
            <div className="w-full col-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Freight
              </label>
              <input
                value={formValues.freight}
                className="w-100 text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
                id="grid-zip"
                type="number"
                onChange={(e) => {
                  setValue("freight", parseInt(e.target.value), {
                    shouldValidate: true,
                  });
                  totalCal(0, e.target.value);
                }}
                placeholder="Enter Freightl"
              />
            </div>
          </div>
          <div className="row flex flex-wrap mx-3 mb-6">
            <div className="w-full col-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                GST Type
              </label>
              <Select
                isSearchable={true}
                name="supervisorId"
                value={formValues?.gstType}
                options={gstType}
                onChange={(selected: any) => {
                  setValue("gstType.label", selected.label, {
                    shouldValidate: true,
                  });
                  setValue("gstType.value", parseInt(selected.value), {});
                }}
              />
            </div>
            {formValues.gstType?.value == 1 ? (
              <div className="w-full col-3">
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
                    setValue("igst.value", parseInt(selected.value), {});
                    totalCal(0, 0, selected.value);
                    setValue("sgst", {});
                    setValue("cgst", {});
                  }}
                />
              </div>
            ) : formValues.gstType?.value == 2 ? (
              <>
                <div className="w-full col-3">
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
                      totalCal(0, 0, 0, selected.value);
                      setValue("cgst.value", parseInt(selected.value), {});
                      setValue("sgst.label", selected.label, {});
                      setValue("sgst.value", parseInt(selected.value), {});
                      setValue("igst", {});
                    }}
                  />
                </div>
                <div className="w-full col-3">
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
                      totalCal(0, 0, 0, selected.value);
                      setValue("sgst.value", parseInt(selected.value), {});
                      setValue("cgst.label", selected.label, {});
                      setValue("cgst.value", parseInt(selected.value), {});
                      setValue("igst", {});
                    }}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="row w-full flex flex-wrap mx-3 mb-6">
            <div className="w-full col-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Total Amount
              </label>
              <input
                className="w-100 text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
                id="grid-zip"
                type="number"
                disabled={true}
                {...register("totalAmount")}
                placeholder="Amount"
              />
            </div>
          </div>
          <div className="row flex flex-wrap mx-3 mb-6">
            <div className="w-full col-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Total Amount With GST
              </label>
              <input
                className="w-100 text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
                id="grid-zip"
                type="number"
                disabled={true}
                value={formValues?.totalAmountGst}
                {...register("totalAmountGst")}
                placeholder="Total Amount"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
            >
              {"Submit"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/invoice")}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4"
            >
              {"Cancel"}
            </button>
            <button
              type="button"
              onClick={() => downloadPDF()}
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
