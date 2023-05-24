import React from "react";
import { Button, Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";

import styles from "./Device.module.css";
import clsx from "clsx";

export const Device = () => {
   const device = {
      id: 1,
      name: 'Apple iPhone 14 Plus SIM 256 ГБ "тёмная ночь"',
      price: 99960,
      img: "https://static.re-store.ru/upload/resize_cache/iblock/24f/560_280_140cd750bba9870f18aada2478b24840a/24f5d50a9566b7ce082e806f73aca7a2.jpeg",
      rating: 5,
   };

   const description = [
      { id: 1, title: "Оперативная память", description: "6 гб" },
      { id: 2, title: "Процессор", description: "a15 bionic" },
      { id: 3, title: "Аккумулятор", description: "4000" },
   ];

   return (
      <div>
         <Container className="mt-5">
            <Row>
               <Col md={4}>
                  <Image width={300} height={300} src={device.img} />
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
