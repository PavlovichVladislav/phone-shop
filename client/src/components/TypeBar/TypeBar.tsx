import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ListGroup } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { setCurType } from "../../redux/slices/shop/shopSlice";
import { ICategory } from "../../models/AppModels";
import { getTypes } from "../../redux/slices/shop/shopThunks";
import { Loader } from "../Loader";

export const TypeBar = () => {
   const { types, isTypesLoading } = useAppSelector((store) => store.shop);
   const [searchParams, setSearchParams] = useSearchParams();

   const dispatch = useAppDispatch();

   const currentType = searchParams.get("type");

   const onChooseType = (type: ICategory) => {
      searchParams.set("type", type.query);
      searchParams.set("page", "1");
      setSearchParams(searchParams);
      dispatch(setCurType(type.id));
   };

   useEffect(() => {
      dispatch(getTypes());
      // eslint-disable-next-line
   }, []);

   if (isTypesLoading) return <Loader />;

   return (
      <ListGroup>
         {types.map((type, i) => (
            <ListGroup.Item
               key={type.id}
               active={currentType === type.query}
               action
               onClick={() => onChooseType(type)}
            >
               {type.name}
            </ListGroup.Item>
         ))}
      </ListGroup>
   );
};
