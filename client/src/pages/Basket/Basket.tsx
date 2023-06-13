import React, { useEffect, useState } from "react";
import { getBasketDevices } from "../../http/basketApi";
import { IDevice } from "../../models/AppModels";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { BasketCard } from "../../components/BasketCard";

export const Basket = () => {
   const [devices, setDevices] = useState<IDevice[]>([]);
   const { user } = useAppSelector((state) => state.user);
   const navigate = useNavigate();

   useEffect(() => {
      if (user) {
         getBasketDevices(user.id).then(({ devices }) => setDevices(devices));
         return;
      }

      alert("Необходимо авторизоваться");
      navigate("/");
   }, []);

   console.log(devices);

   return (
      <Container className="mt-3">
         {devices.map((device) => (
            <BasketCard key={device.id} device={device} />
         ))}
      </Container>
   );
};
