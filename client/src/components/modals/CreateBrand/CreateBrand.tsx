import React from "react";

import { ModalWrapper } from "../ModalWrapper";
import { Form } from "react-bootstrap";

interface Props {
   onClose: () => void;
   isShow: boolean;
}

export const CreateBrand: React.FC<Props> = ({ isShow, onClose }) => {
   return (
      <ModalWrapper isShow={isShow} onClose={onClose} title="Добавление брэнда">
         <Form>
            <Form.Control placeholder="Введите название брэнда" />
         </Form>
      </ModalWrapper>
   );
};
