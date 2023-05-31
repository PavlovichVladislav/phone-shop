import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { DeviceCard } from "../DeiceCard";
import { Col, Row } from "react-bootstrap";
import { fetchDevices } from "../../http/deviceApi";
import { setDeives } from "../../redux/slices/deviceSlice";

export const DeviceList = () => {
   const { devices } = useAppSelector((state) => state.device);
   const dispatch = useAppDispatch();

   useEffect(() => {
      fetchDevices().then(({devices}) => dispatch(setDeives(devices)));
   }, []);

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
