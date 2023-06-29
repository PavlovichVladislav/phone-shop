import React from "react";

import { Button, ButtonGroup, ButtonToolbar, Form } from "react-bootstrap";

import styles from "./RateToolbar.module.css";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Loader } from "../Loader";

interface Props {
   onSelectItem: (item: number) => void;
}

const rates = [1, 2, 3, 4, 5];

export const RateToolbar: React.FC<Props> = ({ onSelectItem }) => {
   const { rateError, isSendRateLoading } = useAppSelector((state) => state.device);

   if (isSendRateLoading) return <Loader />;

   return (
      <Form className="d-flex flex-column align-items-center">
         <h3 className={styles.label}>Выберите рэйтинг устройства: </h3>
         <ButtonToolbar aria-label="Toolbar with button groups" className={styles.toolbar}>
            <ButtonGroup className="mr-2" aria-label="First group">
               {rates.map((rate) => {
                  return (
                     <Button
                        key={rate}
                        variant="outline-warning"
                        onClick={() => onSelectItem(rate)}
                     >
                        {rate}
                     </Button>
                  );
               })}
            </ButtonGroup>
         </ButtonToolbar>
         {rateError && <div className={styles.error}>{rateError}</div>}
      </Form>
   );
};
