import React from "react";
import { IBasketDevice } from "../../models/AppModels";
import { Button, Card } from "react-bootstrap";

import styles from "./BasketCard.module.css";
import clsx from "clsx";
import { deleteBasketDevice } from "../../http/basketApi";
import { removeBasketDevice } from "../../redux/slices/basketSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";

interface Props {
   device: IBasketDevice;
}

export const BasketCard: React.FC<Props> = ({ device }) => {
   const { img, name, price, basketDeviceId } = device;
   const dispatch = useAppDispatch();

   const onDeleteDevice = () => {
      dispatch(removeBasketDevice(basketDeviceId));
      deleteBasketDevice(basketDeviceId);
   };

   return (
      <Card className="mt-3">
         <Card.Body className={clsx("d-flex flex-row align-items-center", styles.card)}>
            <Card.Img
               variant="top"
               className={styles.img}
               src={process.env.REACT_APP_API_URL + img}
            />
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle>{price} ₽</Card.Subtitle>
            <Button variant="warning" onClick={onDeleteDevice}>
               Убрать из корзины
            </Button>
         </Card.Body>
      </Card>
   );
};
