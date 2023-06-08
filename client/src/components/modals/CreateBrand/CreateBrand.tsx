import React, { useState } from "react";
import { Form } from "react-bootstrap";

import { createBrand } from "../../../http/deviceApi";

import { ModalWrapper } from "../ModalWrapper";

interface Props {
   onClose: () => void;
   isShow: boolean;
}

export const CreateBrand: React.FC<Props> = ({ isShow, onClose }) => {
   const [brandName, setBrandName] = useState("");
   const [queryName, setQueryName] = useState("");

   const addBrand = () => {
      createBrand(brandName, queryName)
         .then(() => {
            setBrandName("");
            setQueryName("");
            onClose();
         })
         .catch(() => alert('Ошибка'));
   };

   return (
      <ModalWrapper isShow={isShow} onClose={onClose} title="Добавление брэнда" onSubmit={addBrand}>
         <Form>
            <Form.Control
               placeholder="Введите название брэнда"
               value={brandName}
               onChange={(e) => setBrandName(e.target.value)}
            />
            <Form.Control
               className="mt-3"
               placeholder="Введите название query параметра"
               value={queryName}
               onChange={(e) => setQueryName(e.target.value)}
            />
         </Form>
      </ModalWrapper>
   );
};
