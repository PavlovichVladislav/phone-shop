import React, { useState } from "react";
import { ModalWrapper } from "../ModalWrapper";
import { Form } from "react-bootstrap";

import { createComment } from "../../../http/reviewApi";
import { useAppSelector } from "../../../hooks/reduxHooks";

interface Props {
   onClose: () => void;
   isShow: boolean;
   deviceId: number;
   onSubmit: () => void;
}

export const CreateReview: React.FC<Props> = ({ isShow, onClose, deviceId, onSubmit }) => {
   const [feedBack, setFeedback] = useState("");

   const { user } = useAppSelector((state) => state.user);

   const sendComment = () => {
      if (!user) {
         alert("Не удалось получить информацию о пользователе, попробуйте перезайти");
         return;
      }

      if (!feedBack) {
         alert("Необходимо что - то написать...");
         return;
      }

      createComment(feedBack, user.id, deviceId)
         .then(() => {
            onSubmit();
            onClose();
         })
         .catch(() => {
            alert(() => {
               'Произошла ошибка'
            })
         })
         .finally(() => {
            setFeedback("");
         });
   };

   return (
      <ModalWrapper
         isShow={isShow}
         onClose={onClose}
         title="Создание отзыва"
         onSubmit={sendComment}
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
