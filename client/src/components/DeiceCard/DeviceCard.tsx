import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import { IDevice } from "../../models/AppModels";
import clsx from "clsx";

import styles from "./DeviceCard.module.css";
import star from "../../assets/star.png";
import { Link } from "react-router-dom";

interface Props {
   device: IDevice;
}

export const DeviceCard: React.FC<Props> = ({ device }) => {
   const { id, img, name, price, rating } = device;

   return (
      <Card className={clsx("mt-3", styles.card)}>
         <Link to={`/device/${id}`}>
            <Card.Img variant="top" src={process.env.REACT_APP_API_URL + img} className={styles.image} />
         </Link>
         <Card.Body>
            <Card.Title>{name}</Card.Title>
            <div className={clsx("mt-2", styles.info)}>
               <Card.Subtitle className={clsx("text-black-50")}>{price} ₽</Card.Subtitle>
               <div className="rate">
                  <span className={styles.rating}>{rating}/5</span>
                  <Image className={styles.star} src={star} />
               </div>
            </div>
            <Button variant="warning" className={clsx("mt-2", styles.button)}>
               Добавить в корзину
            </Button>
         </Card.Body>
      </Card>
   );
};
