import React from "react";
import { IFeature } from "../../models/AppModels";
import { Button, Col, Form, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

interface Props {
   features: IFeature[];
   setFeatures: (features: IFeature[]) => void;
}

export const FeatureList: React.FC<Props> = ({ setFeatures, features }) => {
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

   return (
      <>
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
      </>
   );
};
