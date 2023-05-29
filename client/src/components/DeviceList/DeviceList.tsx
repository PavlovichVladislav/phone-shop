import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { DeviceCard } from "../DeiceCard";
import { Col, Row } from "react-bootstrap";

export const DeviceList = () => {
   const { devices } = useAppSelector((state) => state.device);

   return (
      <Row className="d-flex p-3">
         {devices.map((device) => (
            <Col key={device.id} md={3}>
               <DeviceCard device={device} />
            </Col>
         ))}
      </Row>
   );
};
