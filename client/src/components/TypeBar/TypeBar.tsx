import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ListGroup } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { fetchTypes } from "../../http/deviceApi";
import { setType, setTypes } from "../../redux/slices/deviceSlice";
import { ICategory } from "../../models/AppModels";

export const TypeBar = () => {
   const { types } = useAppSelector((store) => store.device);
   const [searchParams, setSearchParams] = useSearchParams();

   const dispatch = useAppDispatch();

   const currentType = searchParams.get("type");

   const onChooseType = (type: ICategory) => {
      searchParams.set("type", type.query);
      searchParams.set("page", "1");
      setSearchParams(searchParams);
      dispatch(setType(type.id));
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
               onClick={() => onChooseType(type)}
               //    variant="light"
            >
               {type.name}
            </ListGroup.Item>
         ))}
      </ListGroup>
   );
};
