import React, { useState } from "react";

import { ModalWrapper } from "../ModalWrapper";
import { Form } from "react-bootstrap";
import { createType } from "../../../http/deviceApi";

interface Props {
   onClose: () => void;
   isShow: boolean;
}

export const CreateType: React.FC<Props> = ({ isShow, onClose }) => {
   const [typeName, setTypeName] = useState("");
   const [queryName, setQueryName] = useState("");

   const addType = () => {
      createType(typeName, queryName)
         .then(() => {
            setTypeName("");
            setQueryName("");
            alert('Тип создан');
            onClose();
         })
         .catch(() => alert("ошибка"));
   };

   return (
      <ModalWrapper isShow={isShow} onClose={onClose} title="Добавление типа" onSubmit={addType}>
         <Form>
            <Form.Control
               placeholder="Введите название типа"
               value={typeName}
               onChange={(e) => setTypeName(e.target.value)}
            />
         </Form>
         <Form.Control
            className="mt-3"
            placeholder="Введите название query параметра"
            value={queryName}
            onChange={(e) => setQueryName(e.target.value)}
         />
      </ModalWrapper>
   );
};
