import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TypeBar } from "../../components/TypeBar";
import { BrandBar } from "../../components/BrandBar";
import { DeviceList } from "../../components/DeviceList";
import { Paging } from "../../components/Pagination";
import { useAppSelector } from "../../hooks/reduxHooks";
import { ITEMS_IN_PAGE } from "../../utils/constants";

export const Shop = () => {
   const { count } = useAppSelector((state) => state.device);

   return (
      <div>
         <Container>
            <Row className="mt-3">
               <Col md={3}>
                  <TypeBar />
               </Col>
               <Col md={9}>
                  <BrandBar />
                  <DeviceList />
                  <Paging count={count} itemsInPage={ITEMS_IN_PAGE}/>
               </Col>
            </Row>
         </Container>
      </div>
   );
};
