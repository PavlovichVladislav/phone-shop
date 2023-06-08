import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";

import { fetchBrands } from "../../http/deviceApi";
import { setBrand, setBrands } from "../../redux/slices/deviceSlice";

import { Card, Form } from "react-bootstrap";

import { ICategory } from "../../models/AppModels";

import styles from "./Brand.module.css";

export const BrandBar = () => {
   const { brands } = useAppSelector((store) => store.device);
   const [searchParams, setSearchParams] = useSearchParams();
   const dispatch = useAppDispatch();
   const currentBrand = searchParams.get("brand");

   const onChooseBrand = (brand: ICategory) => {
      searchParams.set("brand", brand.query);
      searchParams.set("page", "1");
      setSearchParams(searchParams);
      dispatch(setBrand(brand.id));
   };

   useEffect(() => {
      fetchBrands().then((brands) => dispatch(setBrands(brands)));
   }, []);

   return (
      <Form className="d-flex flex-wrap gap-2 ps-3">
         {brands.map((brand) => (
            <Card
               key={brand.id}
               className={clsx("p-2", styles.card)}
               onClick={() => onChooseBrand(brand)}
               bg={currentBrand === brand.query ? "primary" : ""}
               text={currentBrand === brand.query ? "light" : undefined}
            >
               {brand.name}
            </Card>
         ))}
      </Form>
   );
};
