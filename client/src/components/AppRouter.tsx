import React from "react";
import { Route, Routes } from "react-router-dom";

import { authRoutes, publicRoutes } from "../routes";

export const AppRouter = () => {
   const isAuth = true;

   return (
      <Routes>
         {isAuth && authRoutes.map(({ element, path }) => <Route path={path} element={element} />)}
         {publicRoutes.map(({ element, path }) => (
            <Route path={path} element={element} />
         ))}
      </Routes>
   );
};
