import React from "react";
import { IBasketDevice } from "../../models/AppModels";
import { Button, Card, Form, Row } from "react-bootstrap";

import styles from "./BasketCard.module.css";
import clsx from "clsx";
import { decBasketDevice, deleteBasketDevice, incBasketDevice } from "../../http/basketApi";
import {
   decrBasketDevice,
   incrBasketDevice,
   removeBasketDevice,
} from "../../redux/slices/basketSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";

interface Props {
   device: IBasketDevice;
}

export const BasketCard: React.FC<Props> = ({ device }) => {
   const { img, name, price, basketDeviceId, count } = device;
   const dispatch = useAppDispatch();

   const onDeleteDevice = () => {
      dispatch(removeBasketDevice(basketDeviceId));
      deleteBasketDevice(basketDeviceId);
   };

   const onIncDevice = () => {
      dispatch(incrBasketDevice(basketDeviceId));
      incBasketDevice(basketDeviceId);
   };

   const onDecDevice = () => {
      dispatch(decrBasketDevice(basketDeviceId));
      decBasketDevice(basketDeviceId);
   };

   return (
      <Card className="mt-3">
         <Card.Body className={clsx("d-flex flex-row justify-content-between", styles.card)}>
            <Form className={clsx('d-flex flex-row align-items-center cardRight', styles.cardLeft)}>
               <Card.Img
                  variant="top"
                  className={styles.img}
                  src={process.env.REACT_APP_API_URL + img}
               />
               <Card.Title className={styles.title}>{name}</Card.Title>
               <Card.Subtitle>{price * count} ₽</Card.Subtitle>
            </Form>
            <Form className={clsx('d-flex flex-row align-items-center cardRight', styles.cardRight)}>
               <div>Количество: {count}</div>
               <Button variant="warning" onClick={onIncDevice}>
                  +
               </Button>
               <Button disabled={count <= 1} variant="warning" onClick={onDecDevice}>
                  -
               </Button>
               <Button variant="warning" onClick={onDeleteDevice}>
                  Убрать из корзины
               </Button>
            </Form>
         </Card.Body>
      </Card>
   );
};
