import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { DeviceCard } from "../DeiceCard";
import { Col, Row } from "react-bootstrap";
import { fetchDevices } from "../../http/deviceApi";
import { setCount, setDeives } from "../../redux/slices/deviceSlice";
import { useSearchParams } from "react-router-dom";
import { ITEMS_IN_PAGE } from "../../utils/constants";

export const DeviceList = () => {
   const { devices, curBrandId, curTypeId } = useAppSelector((state) => state.device);
   const dispatch = useAppDispatch();
   const [searchParams] = useSearchParams();

   const page = searchParams.get('page') || 1;

   useEffect(() => {
      fetchDevices(curBrandId, curTypeId, ITEMS_IN_PAGE, +page).then(({ devices, count }) => {
         dispatch(setDeives(devices));
         dispatch(setCount(count));
      });
   }, [page, curBrandId, curTypeId]);

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
