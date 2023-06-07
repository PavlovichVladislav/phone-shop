import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";

import { CreateBrand } from "../../components/modals/CreateBrand";
import { CreateType } from "../../components/modals/CreateType";
import { CreateDevice } from "../../components/modals/CreateDevice";

import styles from "./Admin.module.css";

export const Admin = () => {
   const [brandVisible, setBrandVisible] = useState(false);
   const [typeVisible, setTypeVisible] = useState(false);
   const [deviceVisible, setDeviceVisible] = useState(false);

   return (
      <Container className="d-flex flex-column align-items-center mt-4">
         <Row className={styles.wrapper}>
            <Button variant="warning" className="mt-2" onClick={() => setBrandVisible(true)}>
               Добавить бренд
            </Button>
            <Button
               variant="warning"
               className="mt-2"
               onClick={() => {
                  setTypeVisible(true);
               }}
            >
               Добавить тип
            </Button>
            <Button
               variant="warning"
               className="mt-2"
               onClick={() => {
                  setDeviceVisible(true);
               }}
            >
               Добавить устройство
            </Button>
         </Row>
         <CreateBrand
            isShow={brandVisible}
            onClose={() => {
               setBrandVisible(false);
            }}
         />
         <CreateType
            isShow={typeVisible}
            onClose={() => {
               setTypeVisible(false);
            }}
         />
         <CreateDevice
            isShow={deviceVisible}
            onClose={() => {
               setDeviceVisible(false);
            }}
         />
      </Container>
   );
};
