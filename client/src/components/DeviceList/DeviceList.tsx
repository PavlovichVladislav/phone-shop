import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchDevices } from "../../http/deviceApi";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setCount, setDeives } from "../../redux/slices/deviceSlice";

import { DeviceCard } from "../DeiceCard";
import { Col, Row } from "react-bootstrap";

import { ITEMS_IN_PAGE } from "../../utils/constants";

export const DeviceList = () => {
   const { devices, curBrandId, curTypeId } = useAppSelector((state) => state.device);
   const [searchParams] = useSearchParams();
   const dispatch = useAppDispatch();
   const page = searchParams.get("page") || 1;

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
