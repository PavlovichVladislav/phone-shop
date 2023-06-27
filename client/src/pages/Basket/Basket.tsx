import React from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../hooks/reduxHooks";

import { Container } from "react-bootstrap";
import { BasketCard } from "../../components/BasketCard";
import { Loader } from "../../components/Loader";

export const Basket = () => {
   const { devices, isDevicesLoading } = useAppSelector((state) => state.basket);
   const { user } = useAppSelector((state) => state.user);

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
