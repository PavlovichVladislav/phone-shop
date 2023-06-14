import React, { useEffect } from "react";
import { getBasketDevices } from "../../http/basketApi";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { BasketCard } from "../../components/BasketCard";
import { setBasketDevices } from "../../redux/slices/basketSlice";

export const Basket = () => {
   const { devices } = useAppSelector(state => state.basket)
   const { user } = useAppSelector((state) => state.user);
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (user) {
         getBasketDevices(user.id).then(({ devices }) => dispatch(setBasketDevices(devices)));
         return;
      }

      alert("Необходимо авторизоваться");
      navigate("/");
   }, []);

   return (
      <Container className="mt-3">
         {devices.map((device) => (
            <BasketCard key={device.id} device={device} />
         ))}
      </Container>
   );
};
