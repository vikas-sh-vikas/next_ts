import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type FormProps = {
  children?: ReactNode;
};




export default function Decider(props: FormProps) {
  const { children } = props;
  const [isCurrentUrlValid, setIsCurrentUrlValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();



  return (
    <>
      {/* {isCurrentUrlValid === false ? <AlertBox /> : context?.user?.isTempPassword ? <ChangePassword /> : children} */}
      {children}
    </>
  );
}
