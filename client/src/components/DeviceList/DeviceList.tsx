import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import { DeviceCard } from "../DeiceCard";
import { Col, Row } from "react-bootstrap";

import { ITEMS_IN_PAGE } from "../../utils/constants";
import { getDevices } from "../../redux/slices/shop/shopThunks";
import { Loader } from "../Loader";

export const DeviceList = () => {
   const { devices, curBrandId, curTypeId, isDevicesLoading } = useAppSelector(
      (state) => state.shop
   );
   const [searchParams] = useSearchParams();
   const dispatch = useAppDispatch();
   const page = searchParams.get("page") || 1;

   useEffect(() => {
      dispatch(
         getDevices({ brandId: curBrandId, typeId: curTypeId, limit: ITEMS_IN_PAGE, page: +page })
      );
      // eslint-disable-next-line
   }, [page, curBrandId, curTypeId]);

   if (isDevicesLoading) return <Loader />;

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
