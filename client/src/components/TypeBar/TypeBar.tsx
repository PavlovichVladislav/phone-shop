import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ListGroup } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { fetchTypes } from "../../http/deviceApi";
import { setTypes } from "../../redux/slices/deviceSlice";

export const TypeBar = () => {
   const { types } = useAppSelector((store) => store.device);
   const [searchParams, setSearchParams] = useSearchParams();

   const dispatch = useAppDispatch();

   const currentType = searchParams.get("type");

   const onChooseType = (value: string) => {
      searchParams.set("type", value);
      setSearchParams(searchParams);
   };

   useEffect(() => {
      fetchTypes().then((types) => dispatch(setTypes(types)));
   }, []);

   return (
      <ListGroup>
         {types.map((type, i) => (
            <ListGroup.Item
               key={type.id}
               active={currentType === type.query}
               action
               onClick={() => onChooseType(type.query)}
               //    variant="light"
            >
               {type.name}
            </ListGroup.Item>
         ))}
      </ListGroup>
   );
};
