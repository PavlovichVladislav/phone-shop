import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, ListGroup, Row, Spinner } from "react-bootstrap";

import styles from "./Device.module.css";
import clsx from "clsx";
import { IComment, IDevice } from "../../models/AppModels";
import { fetchOneDevice } from "../../http/deviceApi";
import { useParams } from "react-router-dom";
import { CreateReview } from "../../components/modals/CreateReview";
import { createReview, fetchComments } from "../../http/reviewApi";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RateToolbar } from "../../components/RateToolbar";
import { DeviceComments } from "../../components/DeviceComments";
import { DeviceChar } from "../../components/DeviceChar";
import { RateInfo } from "../../components/RateInfo/RateInfo";
import { setComments, setDevice, setRate } from "../../redux/slices/deviceSlice";

export const Device = () => {
   const [reviewVisible, setReviewVisible] = useState(false);
   const dispatch = useAppDispatch();

   const { id: deviceId, img, price, info } = useAppSelector((state) => state.device.device);
   const { user } = useAppSelector((state) => state.user);
   const { id } = useParams();

   useEffect(() => {
      if (id) {
         fetchOneDevice(+id).then((device) => dispatch(setDevice(device)));
         fetchComments(+id).then((comments) => dispatch(setComments(comments)));
      }
   }, []);

   const sendReview = (selectedRate: number) => {
      if (!selectedRate) {
         alert("Пожалуйста, укажите рейтинг");
         return;
      }

      if (!deviceId) {
         alert("Произошла ошибка: устройство не найдено");
         return;
      }

      if (!user) {
         alert("Чтобы оставить отзыв, необходимо авторизоваться");
         return;
      }

      createReview(selectedRate, user.id, deviceId)
         .then(({ deviceRate }) => {
            dispatch(setRate(deviceRate));
            alert("Спасибо за ваш отзыв!");
         })
         .catch(() => alert("ошибка"));
   };

   if (!deviceId) return <Spinner />;

   return (
      <Container className="mt-5">
         <Row>
            <Col md={4}>
               <Image width={300} height={300} src={process.env.REACT_APP_API_URL + img} />
            </Col>
            <Col md={4}>
               <RateInfo />
            </Col>
            <Col md={4} className="d-flex flex-column align-items-end">
               <Card
                  className={clsx(
                     "d-flex flex-column align-items-center justify-content-around",
                     styles.card
                  )}
               >
                  <h3>Цена: {price} руб.</h3>
                  <RateToolbar onSelectItem={sendReview} />
                  <Button variant="warning">Добавить в корзину</Button>
                  <Button variant="warning" onClick={() => setReviewVisible(true)}>
                     Оставить отзыв
                  </Button>
               </Card>
            </Col>
         </Row>
         <Row className="d-flex flex-column m-3 mt-5">
            <DeviceChar chars={info} />
         </Row>
         <Row className="d-flex flex-column m-3">
            <DeviceComments />
         </Row>
         <CreateReview
            isShow={reviewVisible}
            onClose={() => setReviewVisible(false)}
            deviceId={deviceId}
         />
      </Container>
   );
};
