import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, ListGroup, Row, Spinner } from "react-bootstrap";

import styles from "./Device.module.css";
import clsx from "clsx";
import { IDevice } from "../../models/AppModels";
import { fetchOneDevice } from "../../http/deviceApi";
import { useParams } from "react-router-dom";

export const Device = () => {
   const [device, setDevice] = useState<IDevice | null>(null);
   const { id } = useParams();

   useEffect(() => {
      if (id) {
         fetchOneDevice(+id).then(device => setDevice(device));
      }
   }, [])

   const description = [
      { id: 1, title: "Оперативная память", description: "6 гб" },
      { id: 2, title: "Процессор", description: "a15 bionic" },
      { id: 3, title: "Аккумулятор", description: "4000" },
   ];

   if (!device) return <Spinner/>

   return (
      <div>
         <Container className="mt-5">
            <Row>
               <Col md={4}>
                  <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
               </Col>
               <Col md={4}>
                  <Row className="d-flex flex-column align-items-center">
                     <h2>{device.name}</h2>
                     <div
                        className={clsx(
                           "d-flex align-items-center justify-content-center",
                           styles.star
                        )}
                     >
                        {device.rating}
                     </div>
                  </Row>
               </Col>
               <Col md={4}>
                  <Card
                     className={clsx(
                        "d-flex flex-column align-items-center justify-content-around",
                        styles.card
                     )}
                  >
                     <h3>Цена: {device.price} руб.</h3>
                     <Button variant="warning">Добавить в корзину</Button>
                  </Card>
               </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
               <ListGroup>
                  <h1>Характеристики</h1>
                  {description.map((info) => (
                     <ListGroup.Item key={info.id}>
                        {info.title}: {info.description}
                     </ListGroup.Item>
                  ))}
               </ListGroup>
            </Row>
         </Container>
      </div>
   );
};
