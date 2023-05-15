import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { ListGroup } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export const TypeBar = () => {
   const { types } = useAppSelector((store) => store.device);
   const [searchParams, setSearchParams] = useSearchParams();

   const currentType = searchParams.get("type");

   return (
      <ListGroup className="mt-3">
         {types.map((type, i) => (
            <ListGroup.Item
               key={type.id}
               active={currentType === type.query}
               action
               onClick={() => setSearchParams({ type: type.query })}
            //    variant="light"
            >
               {type.name}
            </ListGroup.Item>
         ))}
      </ListGroup>
   );
};
