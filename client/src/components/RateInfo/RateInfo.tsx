import React from "react";
import { Row } from "react-bootstrap";

import styles from "./RateInfo.module.css";
import { useAppSelector } from "../../hooks/reduxHooks";
import clsx from "clsx";

export const RateInfo = () => {
   const { name, rating } = useAppSelector((state) => state.device.device);

   return (
      <Row className="d-flex flex-column align-items-center">
         <h2 className={styles.name}>{name}</h2>
         <div className={clsx("d-flex align-items-center justify-content-center", styles.star)}>
            {rating}
         </div>
      </Row>
   );
};
