import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import clsx from "clsx";

import { useAppDispatch } from "../../hooks/reduxHooks";
import {
   decBasketDeviceThunk,
   incBasketDeviceThunk,
   removeBasketDevice,
} from "../../redux/slices/basket/basketThunks";

import { IBasketDevice } from "../../models/AppModels";

import styles from "./BasketCard.module.css";

interface Props {
   device: IBasketDevice;
}

export const BasketCard: React.FC<Props> = ({ device }) => {
   const { img, name, price, basketDeviceId, count } = device;
   const dispatch = useAppDispatch();

   const onDeleteDevice = () => {
      dispatch(removeBasketDevice({ basketDeviceId }));
   };

   const onIncDevice = () => {
      dispatch(incBasketDeviceThunk({ basketDeviceId }));
   };

   const onDecDevice = () => {
      dispatch(decBasketDeviceThunk({ basketDeviceId }));
   };

   return (
      <Card className="mt-3">
         <Card.Body className={clsx("d-flex flex-row justify-content-between", styles.card)}>
            <Form className={clsx("d-flex flex-row align-items-center cardRight", styles.cardLeft)}>
               <Card.Img
                  variant="top"
                  className={styles.img}
                  src={process.env.REACT_APP_API_URL + img}
               />
               <Card.Title className={styles.title}>{name}</Card.Title>
               <Card.Subtitle>{price * count} ₽</Card.Subtitle>
            </Form>
            <Form
               className={clsx("d-flex flex-row align-items-center cardRight", styles.cardRight)}
            >
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
