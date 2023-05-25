import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ModalWrapper } from "../ModalWrapper";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import { useAppSelector } from "../../../hooks/reduxHooks";

interface Props {
   onClose: () => void;
   isShow: boolean;
}

interface Feature {
   id: string;
   title: string;
   description: string;
}

export const CreateDevice: React.FC<Props> = ({ isShow, onClose }) => {
   const { types, brands } = useAppSelector((state) => state.device);
   const [features, setFeatures] = useState<Feature[]>([]);

   const addFeature = () => {
      setFeatures([...features, { id: uuidv4(), title: "", description: "" }]);
   };

   const removeFeature = (id: string) => {
      setFeatures(features.filter((feature) => feature.id !== id));
   };

   return (
      <ModalWrapper isShow={isShow} onClose={onClose} title="Добавление устройства">
         <Form>
            <Form.Control placeholder="Введите имя устройства" />
            <Dropdown className="mt-3">
               <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Выберите тип устройства
               </Dropdown.Toggle>
               <Dropdown.Menu>
                  {types.map((type) => (
                     <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                  ))}
               </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-3">
               <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Выберите брэнд устройства
               </Dropdown.Toggle>
               <Dropdown.Menu>
                  {brands.map((brand) => (
                     <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
                  ))}
               </Dropdown.Menu>
            </Dropdown>
            <Form.Control placeholder="Введите стоимость устройства" className="mt-3" />
            <Form.Control type="file" className="mt-3" />
            <hr />
            <Button variant="success" onClick={addFeature}>
               Добавить новое свойство
            </Button>
            {features.map((feature) => (
               <Row className="mt-3" key={feature.id}>
                  <Col md={4}>
                     <Form.Control placeholder="Введите название характеристики" />
                  </Col>
                  <Col md={4}>
                     <Form.Control placeholder="Введите описание характеристики" />
                  </Col>
                  <Col md={4}>
                     <Button variant="danger" onClick={() => removeFeature(feature.id)}>
                        Удалить характеристику
                     </Button>
                  </Col>
               </Row>
            ))}
         </Form>
      </ModalWrapper>
   );
};
