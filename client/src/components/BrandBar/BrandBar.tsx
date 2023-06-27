import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";

import { setCurBrand } from "../../redux/slices/shop/shopSlice";
import { getBrands } from "../../redux/slices/shop/shopThunks";

import { Card, Form } from "react-bootstrap";

import { ICategory } from "../../models/AppModels";

import styles from "./Brand.module.css";
import { Loader } from "../Loader";

export const BrandBar = () => {
   const { brands, isBrandsLoading } = useAppSelector((store) => store.shop);
   const [searchParams, setSearchParams] = useSearchParams();
   const dispatch = useAppDispatch();
   const currentBrand = searchParams.get("brand");

   const onChooseBrand = (brand: ICategory) => {
      searchParams.set("brand", brand.query);
      searchParams.set("page", "1");
      setSearchParams(searchParams);
      dispatch(setCurBrand(brand.id));
   };

   useEffect(() => {
      dispatch(getBrands());
      // eslint-disable-next-line
   }, []);

   if (isBrandsLoading) return <Loader />;

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
