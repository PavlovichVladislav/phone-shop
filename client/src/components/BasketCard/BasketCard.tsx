import React from "react";
import { IDevice } from "../../models/AppModels";
import { Card } from "react-bootstrap";

import styles from "./BasketCard.module.css";
import clsx from "clsx";

interface Props {
   device: IDevice;
}

export const BasketCard: React.FC<Props> = ({ device }) => {
   const { img, name, price } = device;

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
         </Card.Body>
      </Card>
   );
};
