import React, { useState } from "react";

import { Button, ButtonGroup, ButtonToolbar, Form } from "react-bootstrap";

import styles from './RateToolbar.module.css';

interface Props {
    onSelectItem: (item: number) => void;  
}

const rates = [1, 2, 3, 4, 5];

export const RateToolbar: React.FC<Props> = ({ onSelectItem }) => {
   const [selectedRate, setSelectedRate] = useState(0);

   return (
      <Form className="d-flex flex-column align-items-center">
         <h3 className={styles.label}>Выберите рэйтинг устройства: </h3>
         <ButtonToolbar aria-label="Toolbar with button groups" className={styles.toolbar}>
            <ButtonGroup className="mr-2" aria-label="First group">
               {rates.map((rate) => {
                  const variant = rate === selectedRate ? "warning" : "outline-warning";

                  return (
                     <Button key={rate} variant={variant} onClick={() => onSelectItem(rate)}>
                        {rate}
                     </Button>
                  );
               })}
            </ButtonGroup>
         </ButtonToolbar>
      </Form>
   );
};
