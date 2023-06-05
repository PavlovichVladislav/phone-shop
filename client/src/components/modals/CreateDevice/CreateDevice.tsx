import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ModalWrapper } from "../ModalWrapper";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { IBrand, IType } from "../../../models/AppModels";
import { createDevice, fetchBrands, fetchTypes } from "../../../http/deviceApi";
import { setBrands, setTypes } from "../../../redux/slices/deviceSlice";

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
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [type, setType] = useState<IType>();
   const [brand, setBrand] = useState<IBrand>();
   const [img, setImg] = useState();
   const dispatch = useAppDispatch();

   useEffect(() => {
      fetchBrands().then((brands) => dispatch(setBrands(brands)));
      fetchTypes().then((types) => dispatch(setTypes(types)));
   }, []);

   const addFeature = () => {
      setFeatures([...features, { id: uuidv4(), title: "", description: "" }]);
   };

   const removeFeature = (id: string) => {
      setFeatures(features.filter((feature) => feature.id !== id));
   };

   const changeInfo = (key: "title" | "description", value: string, id: string) => {
      setFeatures(
         features.map((feature) => (feature.id === id ? { ...feature, [key]: value } : feature))
      );
   };

   const addDevice = () => {
      console.log(features);
   };

   return (
      <ModalWrapper
         isShow={isShow}
         onClose={onClose}
         title="Добавление устройства"
         onSubmit={addDevice}
      >
         <Form>
            <Form.Control
               placeholder="Введите имя устройства"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <Dropdown className="mt-3">
               <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {type?.name || "Выберите тип устройства"}
               </Dropdown.Toggle>
               <Dropdown.Menu>
                  {types.map((type) => (
                     <Dropdown.Item onClick={() => setType(type)} key={type.id}>
                        {type.name}
                     </Dropdown.Item>
                  ))}
               </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-3">
               <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {brand?.name || "Выберите брэнд устройства"}
               </Dropdown.Toggle>
               <Dropdown.Menu>
                  {brands.map((brand) => (
                     <Dropdown.Item onClick={() => setBrand(brand)} key={brand.id}>
                        {brand.name}
                     </Dropdown.Item>
                  ))}
               </Dropdown.Menu>
            </Dropdown>
            <Form.Control
               placeholder="Введите стоимость устройства"
               className="mt-3"
               value={price}
               onChange={(e) => setPrice(e.target.value)}
               type="number"
            />
            <Form.Control
               type="file"
               className="mt-3"
               value={img}
               // onChange={(e) => setImg(e.target.value)}
            />
            <hr />
            <Button variant="success" onClick={addFeature}>
               Добавить новое свойство
            </Button>
            {features.map((feature) => (
               <Row className="mt-3" key={feature.id}>
                  <Col md={4}>
                     <Form.Control
                        placeholder="Введите название характеристики"
                        onChange={(e) => changeInfo("title", e.target.value, feature.id)}
                        value={feature.title}
                     />
                  </Col>
                  <Col md={4}>
                     <Form.Control
                        placeholder="Введите описание характеристики"
                        onChange={(e) => changeInfo("description", e.target.value, feature.id)}
                        value={feature.description}
                     />
                  </Col>
                  <Col md={4}>
                     <Button variant="danger" onClick={() => removeFeature(feature.id)} >
                        Удалить характеристику
                     </Button>
                  </Col>
               </Row>
            ))}
         </Form>
      </ModalWrapper>
   );
};
