import React from "react";
import { NavBar } from "../NavBar";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Loader } from "../Loader";

interface Props {
   children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
   const { isLoading } = useAppSelector((state) => state.user);

   return (
      <>
         <NavBar />
         {isLoading ? <Loader /> : children}
      </>
   );
};
