import React from "react";

import { ModalWrapper } from "../ModalWrapper";
import { Form } from "react-bootstrap";

interface Props {
   onClose: () => void;
   isShow: boolean;
}

export const CreateType: React.FC<Props> = ({ isShow, onClose }) => {
   return (
      <ModalWrapper isShow={isShow} onClose={onClose} title="Добавление типа">
         <Form>
            <Form.Control placeholder="Введите название типа" />
         </Form>
      </ModalWrapper>
   );
};
