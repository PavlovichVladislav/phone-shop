import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { createDevice } from "../../../http/deviceApi";
import { getBrands, getTypes } from "../../../redux/slices/shop/shopThunks";

import { ModalWrapper } from "../ModalWrapper";
import { FeatureList } from "../../FeatureList";
import { CustomDropdown } from "../../CustomDropdown";

import { ICategory, IFeature } from "../../../models/AppModels";

interface Props {
   onClose: () => void;
   isShow: boolean;
}

export const CreateDevice: React.FC<Props> = ({ isShow, onClose }) => {
   const { types, brands } = useAppSelector((state) => state.shop);
   const [features, setFeatures] = useState<IFeature[]>([]);

   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [type, setType] = useState<ICategory>();
   const [brand, setBrand] = useState<ICategory>();
   const [img, setImg] = useState<any>();

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getBrands());
      dispatch(getTypes());
      //eslint-disable-next-line
   }, []);

   const addDevice = () => {
      if (!brand || !type) {
         alert("Необходимо выбрать брэнд и тип");
         return;
      }

      if (!img) {
         alert("Необходимо выбрать изображение");
         return;
      }

      if (!name || !price) {
         alert("Необходимо указать стоимость и название");
         return;
      }

      createDevice({
         brnadId: `${brand.id}`,
         features,
         img,
         name,
         price,
         typeId: `${type.id}`,
      })
         .then(() => {
            onClose();
            alert("устройство создано");
         })
         .catch(() => alert("ошибка"));
   };

   return (
      <ModalWrapper
         isShow={isShow}
         onClose={onClose}
         title="Добавление устройства"
         onSubmit={addDevice}
      >
         <Form>
            <Form.Control
               placeholder="Введите имя устройства"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <CustomDropdown
               currentEntity={type}
               entities={types}
               setEntity={(entity: ICategory) => setType(entity)}
               placeholder="Выберите тип устройства"
            />
            <CustomDropdown
               currentEntity={brand}
               entities={brands}
               setEntity={(entity: ICategory) => setBrand(entity)}
               placeholder="Выберите бренд устройства"
            />
            <Form.Control
               placeholder="Введите стоимость устройства"
               className="mt-3"
               value={price}
               onChange={(e) => setPrice(e.target.value)}
               type="number"
            />
            <Form.Control
               type="file"
               className="mt-3"
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setImg(e.target.files ? e.target.files[0] : "");
               }}
            />
            <hr />
            <FeatureList
               features={features}
               setFeatures={(features: IFeature[]) => setFeatures(features)}
            />
         </Form>
      </ModalWrapper>
   );
};
