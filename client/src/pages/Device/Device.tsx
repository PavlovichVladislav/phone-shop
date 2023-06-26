import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getOneDevice, makeReview } from "../../redux/slices/device/deviceThunks";
import { getComments } from "../../redux/slices/comments/commentThunks";

import { RateToolbar } from "../../components/RateToolbar";
import { DeviceComments } from "../../components/DeviceComments";
import { DeviceChar } from "../../components/DeviceChar";
import { RateInfo } from "../../components/RateInfo/RateInfo";
import { CreateReview } from "../../components/modals/CreateReview";
import { Loader } from "../../components/Loader";

import styles from "./Device.module.css";

export const Device = () => {
   const [reviewVisible, setReviewVisible] = useState(false);
   const dispatch = useAppDispatch();

   const { id: deviceId, img, price, info } = useAppSelector((state) => state.device.device);
   const { isDeviceLoading } = useAppSelector((state) => state.device);
   const { user } = useAppSelector((state) => state.user);
   const { id } = useParams();

   useEffect(() => {
      if (id) {
         dispatch(getOneDevice(+id));
         dispatch(getComments(+id));
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

      dispatch(
         makeReview({
            rate: selectedRate,
            userId: user.id,
            deviceId,
            afterSend: () => alert("Спасибо за ваш отзыв!"),
         })
      );
   };

   if (isDeviceLoading) return <Loader />;

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
