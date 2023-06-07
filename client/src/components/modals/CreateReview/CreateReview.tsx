import React, { useState } from "react";
import { ModalWrapper } from "../ModalWrapper";
import { Button, ButtonGroup, ButtonToolbar, Form, Row } from "react-bootstrap";

import styles from "./CreateReview.module.css";

interface Props {
   onClose: () => void;
   isShow: boolean;
}

const rates = [1, 2, 3, 4, 5];

export const CreateReview: React.FC<Props> = ({ isShow, onClose }) => {
   const [feedBack, setFeedback] = useState("");
   const [selectedRate, setSelectedRate] = useState(0);

   const sendReview = () => {
      if (!selectedRate) {
         alert("Пожалуйста, укажите рейтинг");
      }
   };

   return (
      <ModalWrapper isShow={isShow} onClose={onClose} title="Создание отзыва" onSubmit={sendReview}>
         <Form className="d-flex flex-row">
            <h3>Выберите рэйтинг устройства: </h3>
            <ButtonToolbar aria-label="Toolbar with button groups" className={styles.toolbar}>
               <ButtonGroup className="mr-2" aria-label="First group">
                  {rates.map((rate) => {
                     const variant = rate === selectedRate ? "warning" : "outline-warning";

                     return (
                        <Button key={rate} variant={variant} onClick={() => setSelectedRate(rate)}>
                           {rate}
                        </Button>
                     );
                  })}
               </ButtonGroup>
            </ButtonToolbar>
         </Form>
         <Form>
            <Form.Control
               className="mt-3"
               placeholder="Комментарий"
               value={feedBack}
               onChange={(e) => setFeedback(e.target.value)}
            />
         </Form>
      </ModalWrapper>
   );
};
