import React from "react";
import { Route, Routes } from "react-router-dom";

import { authRoutes, publicRoutes } from "../routes";
import { useAppSelector } from "../hooks/reduxHooks";

export const AppRouter = () => {
   const { _isAuth } = useAppSelector((state) => state.user);

   return (
      <Routes>
         {_isAuth &&
            authRoutes.map(({ element, path }) => (
               <Route path={path} element={element} key={path} />
            ))}
         {publicRoutes.map(({ element, path }) => (
            <Route path={path} element={element} key={path} />
         ))}
      </Routes>
   );
};
