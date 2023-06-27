import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchBasketDevices } from "../../redux/slices/basket/basketThunks";

import { Container } from "react-bootstrap";
import { BasketCard } from "../../components/BasketCard";
import { Loader } from "../../components/Loader";

export const Basket = () => {
   const { devices, isDevicesLoading } = useAppSelector((state) => state.basket);
   const { user } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (user) {
         dispatch(fetchBasketDevices(user.id));
         return;
      }
      //eslint-disable-next-line
   }, []);

   if (!user) {
      alert("Необходимо авторизоваться");

      return <Navigate to="/" />;
   }

   if (isDevicesLoading) return <Loader />;

   return (
      <Container className="mt-3">
         {devices.map((device) => (
            <BasketCard key={device.id} device={device} />
         ))}
      </Container>
   );
};
