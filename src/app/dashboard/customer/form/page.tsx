"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Select from "react-select";
import { Option } from "antd/es/mentions";

type Option = {
  label:string;
  value:string;
}[]
type CustomerModel = {
  customerName: string;
  gstNo: string;
  partyType: string;
  country: string;
  state: string;
  district: string;
  street: string;
  pincode?: string;
  contactPerson: string;
  contactDetail?: string;
};

function form() {
  const router = useRouter();
  const [countryOptions, setCountryOption] = useState<Option>([
      {"label": "Afghanistan", "value": "AF"},
      {"label": "Albania", "value": "AL"},
      {"label": "Algeria", "value": "DZ"},
      {"label": "Andorra", "value": "AD"},
      {"label": "Angola", "value": "AO"}
  ])
  const [selectCountry, setSelectCountry] = useState<Option>()

  const defaultValues: CustomerModel = {
    customerName: "",
    gstNo: "",
    partyType: "",
    country: "",
    state: "",
    district: "",
    street: "",
    contactPerson: ""
  };

  const validationSchema = yup.object({
    customerName: yup.string().required("customerName is required"),
    gstNo: yup.string().required("gstNo is required"),
    partyType: yup.string().required("partyType is required"),
    country: yup.string().required("country is required"),
    state: yup.string().required("state is required"),
    district: yup.string().required("district is required"),
    street: yup.string().required("street is required"),
    // contactDetail: yup.string().required("contactDetail is required"),
    contactPerson: yup.string().required("contactPerson is required"),
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CustomerModel>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const formValues = getValues();

  const urlparams = new URLSearchParams(location.search);
  const id = urlparams.get("id");
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
      // console.log("EditData",apiData.country);
      const select = countryOptions.filter(person => person.value == apiData.country); 
      // console.log("FilterData",olderThan25);
      setSelectCountry(select);
      reset({
        ...apiData,
      });
      // setCustomer({ ...apiData });
    } catch (error: any) {
      console.log(error);
    }
  };
  const onSubmit: SubmitHandler<CustomerModel> = async (data) => {
    try {
      console.log("Data",data)
      const response = await axios.post("/api/customers/savecustomer", data);
      console.log("Save sucess", response.data);
      toast.success("Save success");
      router.push("/dashboard/customer");
    } catch (error: any) {
      console.log("Error", error);
      toast.error(error.message);
    }
  };
  console.log("Formvalues",selectCountry)
  return (
    <>
      <div>
        <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="block uppercase tracking-wide text-center text-gray-700 font-bold mb-8 text-3xl">
            Party Detail
          </h1>
          <hr className="mb-4"></hr>
          <div className="grid grid-cols-3 gap-4 p-4">
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Customer Name
              </label>
              <input
                className="w-full text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
                id="customerName"
                type="text"
                placeholder="Enter Customer Name"
                {...register("customerName")}
              />
            </div>
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                GST No.
              </label>
              <input
                className="w-full text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
                id="gstNo"
                {...register("gstNo")}
                type="text"
                placeholder="Enter GST No."
              />
            </div>
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Party Type
              </label>
              <Select
                isSearchable={true}
                name="partyType"
                // value={formValues?.partyType}
                options={[
                  {
                    value: '1',
                    label: 'Customer',
                  },
                  {
                    value: '2',
                    label: 'Supplier',
                  }
                ]}
                onChange={(selected: any) => {
                  // setValue("partyType", selected.label, {
                  //   // shouldValidate: true,
                  // });
                  setValue("partyType", selected.value, {
                    // shouldValidate: true,
                  });
                }}
              />
            </div>
          </div>
          <hr className="mb-4"></hr>
          {/* <span
            className=" p-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Address
          </span> */}

          <div className="grid grid-cols-3 gap-4  p-4">
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Country
              </label>
              <Select
                isSearchable={true}
                name="country"
                value={selectCountry}
                options={countryOptions}
                onChange={(selected: any) => {
                  setSelectCountry(selected)
                  // setValue("countryName", selected.label, {
                  //   // shouldValidate: true,
                  // });
                  setValue("country", selected.value, {
                    // shouldValidate: true,
                  });
                }}
              />
            </div>
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                State
              </label>
              <Select
                isSearchable={true}
                name="state"
                // value={formValues?.partyType}
                options={[
                  {
                    value: '1',
                    label: 'Customer',
                  },
                  {
                    value: '2',
                    label: 'Supplier',
                  }
                ]}
                onChange={(selected: any) => {
                  // setValue("state", selected.label, {
                  //   // shouldValidate: true,
                  // });
                  setValue("state", selected.value, {
                    shouldValidate: true,
                  });
                }}
              />
            </div>
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                District
              </label>
              <Select
                isSearchable={true}
                name="district"
                // value={formValues?.partyType}
                options={[
                  {
                    value: '1',
                    label: 'Customer',
                  },
                  {
                    value: '2',
                    label: 'Supplier',
                  }
                ]}
                onChange={(selected: any) => {
                  // setValue("district", selected.label, {
                  //   // shouldValidate: true,
                  // });
                  setValue("district", selected.value, {
                    // shouldValidate: true,
                  });
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4  p-4">
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Street/Colony
              </label>
              <input
                className="w-full text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
                id="address"
                type="text"
                {...register("street")}
                placeholder="Enter Address"
              />
            </div>
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Pincode
              </label>
              <input
                className="w-full text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
                id="address"
                type="text"
                {...register("pincode")}
                placeholder="Enter Address"
              />
            </div>
          </div>

          <hr className="mb-4"></hr>

          <div className="grid grid-cols-2 gap-4  p-4">
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Contact Person
              </label>
              <input
                className="w-full text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
                id="contactPerson"
                type="text"
                {...register("contactPerson")}
                placeholder="Enter Name"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Contact Detail
              </label>
              <input
                className="w-full text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 focus:outline-none"
                id="contactDetail"
                type="text"
                placeholder="Enter Detail"
                {...register("contactDetail")}
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
              onClick={() => router.push("/dashboard/customer")}
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
