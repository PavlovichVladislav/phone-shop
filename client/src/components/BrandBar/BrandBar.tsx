import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";

import { Card, Form } from "react-bootstrap";

import styles from "./Brand.module.css";
import { fetchBrands } from "../../http/deviceApi";
import { setBrands } from "../../redux/slices/deviceSlice";

export const BrandBar = () => {
   const { brands } = useAppSelector((store) => store.device);
   const [searchParams, setSearchParams] = useSearchParams();

   const dispatch = useAppDispatch();

   const currentBrand = searchParams.get("brand");

   const onChooseBrand = (value: string) => {
      searchParams.set("brand", value);
      setSearchParams(searchParams);
   };

   useEffect(() => {
      fetchBrands().then((brands) => dispatch(setBrands(brands)));
   }, []);

   return (
      <Form className="d-flex flex-wrap gap-2">
         {brands.map((brand) => (
            <Card
               key={brand.id}
               className={clsx("p-2", styles.card)}
               onClick={() => onChooseBrand(brand.query)}
               bg={currentBrand === brand.query ? "primary" : ""}
               text={currentBrand === brand.query ? "light" : undefined}
            >
               {brand.name}
            </Card>
         ))}
      </Form>
   );
};
