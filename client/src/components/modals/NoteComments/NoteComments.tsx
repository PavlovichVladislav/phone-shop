import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { ModalWrapper } from "../ModalWrapper";
import { setNoteCommentsVisible } from "../../../redux/slices/modals/modalsSlice";
import { Loader } from "../../Loader";

export const NoteComments = () => {
   const { noteCommentsVisible } = useAppSelector((state) => state.modals);
   const { isSendingComment, sendCommentError } = useAppSelector((state) => state.comments);
   const dispatch = useAppDispatch();

   const onClose = () => {
      dispatch(setNoteCommentsVisible(false));
   };

   console.log(isSendingComment);
   const getModalContent = () => {
      if (isSendingComment) return <Loader />;

      if (sendCommentError) return <div>Ошибка при отправке комментария</div>;

      return <div>Спасибо за отзыв!</div>;
   };

   return (
      <ModalWrapper isShow={noteCommentsVisible} onClose={onClose} title="Отправление отзыва">
         {getModalContent()}
      </ModalWrapper>
   );
};
