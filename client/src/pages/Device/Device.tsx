import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, ListGroup, Row, Spinner } from "react-bootstrap";

import styles from "./Device.module.css";
import clsx from "clsx";
import { IComment, IDevice } from "../../models/AppModels";
import { fetchOneDevice } from "../../http/deviceApi";
import { useParams } from "react-router-dom";
import { CreateReview } from "../../components/modals/CreateReview";
import { createReview, fetchComments } from "../../http/reviewApi";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RateToolbar } from "../../components/RateToolbar";
import { DeviceComments } from "../../components/DeviceComments";

const rates = [1, 2, 3, 4, 5];

export const Device = () => {
   const [device, setDevice] = useState<IDevice | null>(null);
   const [reviewVisible, setReviewVisible] = useState(false);
   const [comments, setComments] = useState<IComment[]>([]);
   const { user } = useAppSelector((state) => state.user);
   const { id } = useParams();
   const [rate, setRate] = useState<number | null>(null);

   useEffect(() => {
      if (id) {
         fetchOneDevice(+id).then((device) => setDevice(device));
         fetchComments(+id).then((comments) => setComments(comments));
      }
   }, []);

   const sendReview = (selectedRate: number) => {
      if (!selectedRate) {
         alert("Пожалуйста, укажите рейтинг");
         return;
      }

      if (!device) {
         alert("Произошла ошибка: устройство не найдено");
         return;
      }

      if (!user) {
         alert("Произошла ошибка: пользователь не найден");
         return;
      }

      createReview(selectedRate, user.id, device.id)
         .then(({ deviceRate }) => {
            setRate(deviceRate);
            alert("Спасибо за ваш отзыв!");
         })
         .catch(() => alert("ошибка"));
   };

   const loadComments = () => {
      if (id) {
         fetchComments(+id).then((comments) => setComments(comments));
      }
   };

   if (!device) return <Spinner />;

   return (
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
                     {rate || device.rating}
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
                  <RateToolbar items={rates} onSelectItem={sendReview} />
                  <Button variant="warning">Добавить в корзину</Button>
                  <Button variant="warning" onClick={() => setReviewVisible(true)}>
                     Оставить отзыв
                  </Button>
               </Card>
            </Col>
         </Row>
         <Row className="d-flex flex-column m-3">
            <ListGroup>
               <h1>Характеристики</h1>
               {device.info.map((info) => (
                  <ListGroup.Item key={info.id}>
                     {info.title}: {info.description}
                  </ListGroup.Item>
               ))}
            </ListGroup>
         </Row>
         <Row className="d-flex flex-column m-3">
            <DeviceComments comments={comments} />
         </Row>
         <CreateReview
            isShow={reviewVisible}
            onClose={() => setReviewVisible(false)}
            deviceId={device.id}
            onSubmit={loadComments}
         />
      </Container>
   );
};
