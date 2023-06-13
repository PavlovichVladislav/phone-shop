import React, { useState } from "react";
import { ModalWrapper } from "../ModalWrapper";
import { Form } from "react-bootstrap";

import { createComment, fetchComments } from "../../../http/reviewApi";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { setComments } from "../../../redux/slices/deviceSlice";

interface Props {
   onClose: () => void;
   isShow: boolean;
   deviceId: number;
}

export const CreateReview: React.FC<Props> = ({ isShow, onClose, deviceId }) => {
   const [feedBack, setFeedback] = useState("");
   const { user } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();

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
            fetchComments(deviceId).then((comments) => dispatch(setComments(comments)));
            onClose();
         })
         .catch(() => {
            alert(() => {
               "Произошла ошибка";
            });
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
