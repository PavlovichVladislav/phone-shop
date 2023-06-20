import { Admin } from "./pages/Admin";
import { Auth } from "./pages/Auth";
import { Basket } from "./pages/Basket";
import { Device } from "./pages/Device";
import { NotFound } from "./pages/NotFound";
import { Shop } from "./pages/Shop";

import {
   ADMIN_ROUTE,
   BASKET_ROUTE,
   DEVICE_ROUTE,
   LOGIN_ROUTE,
   REG_ROUTE,
   SHOP_ROUTE,
} from "./utils/constants";

export const authRoutes = [
   {
      path: ADMIN_ROUTE,
      element: <Admin />,
   },
   {
      path: BASKET_ROUTE,
      element: <Basket />,
   },
];

export const notAuthRoutes = [
    {
       path: LOGIN_ROUTE,
       element: <Auth />,
    },
    {
       path: REG_ROUTE,
       element: <Auth />,
    },
 ];

export const publicRoutes = [
   {
      path: SHOP_ROUTE,
      element: <Shop />,
   },
   {
      path: DEVICE_ROUTE + "/:id",
      element: <Device />,
   },
   {
      path: "*",
      element: <NotFound />,
   },
];


