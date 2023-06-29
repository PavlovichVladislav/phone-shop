import React from "react";

import { Button, Modal } from "react-bootstrap";

interface Props {
   onClose: () => void;
   onSubmit?: (...args: any[]) => void;
   children: React.ReactNode;
   isShow: boolean;
   title: string;
}

export const ModalWrapper: React.FC<Props> = ({ onClose, children, isShow, title, onSubmit }) => {
   return (
      <Modal
         show={isShow}
         onHide={onClose}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
         scrollable
      >
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
         </Modal.Header>
         <Modal.Body>{children}</Modal.Body>
         <Modal.Footer>
            <Button onClick={onClose} variant="warning">
               Закрыть
            </Button>
            {onSubmit && (
               <Button onClick={onSubmit} variant="warning">
                  Отправить
               </Button>
            )}
         </Modal.Footer>
      </Modal>
   );
};
