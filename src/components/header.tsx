import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const [data, setData] = useState("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const getuserdetails = async () => {
    const res = await axios.get("/api/users/user");
    setData(res.data.data.username);
  };
  useEffect(() => {
    getuserdetails();
  }, []);
  return (
    <div className="flex flex-row items-center justify-end">
      <h2>{data}</h2>
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
      >
        Logout
      </button>
    </div>
  );
}

export default Header;
