import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ModalWrapper } from "../ModalWrapper";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { IBrand, IFeature, IType } from "../../../models/AppModels";
import { createDevice, fetchBrands, fetchTypes } from "../../../http/deviceApi";
import { setBrands, setTypes } from "../../../redux/slices/deviceSlice";

interface Props {
   onClose: () => void;
   isShow: boolean;
}



export const CreateDevice: React.FC<Props> = ({ isShow, onClose }) => {
   const { types, brands } = useAppSelector((state) => state.device);
   const [features, setFeatures] = useState<IFeature[]>([]);
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [type, setType] = useState<IType>();
   const [brand, setBrand] = useState<IBrand>();
   const [img, setImg] = useState<any>();
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

   const changeFeature = (key: "title" | "description", value: string, id: string) => {
      setFeatures(
         features.map((feature) => (feature.id === id ? { ...feature, [key]: value } : feature))
      );
   };

   const addDevice = () => {
      if (!brand || !type) {
         alert("Необходимо выбрать брэнд и тип");
         return;
      }



      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("img", img);
      formData.append("brandId", `${brand.id}`);
      formData.append("typeId", `${type.id}`);
      formData.append('info', JSON.stringify(features));
      createDevice(formData).then(data => onClose());
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
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setImg(e.target.files ? e.target.files[0] : "");
               }}
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
                        onChange={(e) => changeFeature("title", e.target.value, feature.id)}
                        value={feature.title}
                     />
                  </Col>
                  <Col md={4}>
                     <Form.Control
                        placeholder="Введите описание характеристики"
                        onChange={(e) => changeFeature("description", e.target.value, feature.id)}
                        value={feature.description}
                     />
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
