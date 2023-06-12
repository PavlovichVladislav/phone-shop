import React, { useState } from "react";

import { Button, ButtonGroup, ButtonToolbar, Form } from "react-bootstrap";

import styles from './RateToolbar.module.css';

interface Props {
    items: number[];
    onSelectItem: (item: number) => void;  
}

export const RateToolbar: React.FC<Props> = ({ items, onSelectItem }) => {
   const [selectedRate, setSelectedRate] = useState(0);

   return (
      <Form className="d-flex flex-column align-items-center">
         <h3 className={styles.label}>Выберите рэйтинг устройства: </h3>
         <ButtonToolbar aria-label="Toolbar with button groups" className={styles.toolbar}>
            <ButtonGroup className="mr-2" aria-label="First group">
               {items.map((item) => {
                  const variant = item === selectedRate ? "warning" : "outline-warning";

                  return (
                     <Button key={item} variant={variant} onClick={() => onSelectItem(item)}>
                        {item}
                     </Button>
                  );
               })}
            </ButtonGroup>
         </ButtonToolbar>
      </Form>
   );
};
