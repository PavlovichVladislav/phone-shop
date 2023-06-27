import React, { useState } from "react";
import { ModalWrapper } from "../ModalWrapper";
import { Form } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { sendComment } from "../../../redux/slices/comments/commentThunks";

interface Props {
   onClose: () => void;
   isShow: boolean;
   deviceId: number;
}

export const CreateReview: React.FC<Props> = ({ isShow, onClose, deviceId }) => {
   const [feedBack, setFeedback] = useState("");
   const { user } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();

   const onSendComment = () => {
      if (!user) {
         alert("Не удалось получить информацию о пользователе, попробуйте авторизоваться снова");
         return;
      }

      if (!feedBack) {
         alert("Необходимо что - то написать...");
         return;
      }

      dispatch(
         sendComment({
            comment: feedBack,
            userId: user.id,
            deviceId,
            afterSend: () => {
               setFeedback("");
               onClose();
            },
         })
      );
   };

   return (
      <ModalWrapper
         isShow={isShow}
         onClose={onClose}
         title="Создание отзыва"
         onSubmit={onSendComment}
      >
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
