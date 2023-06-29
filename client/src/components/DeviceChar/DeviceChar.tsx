import React from "react";
import { ListGroup } from "react-bootstrap";
import { IFeature } from "../../models/AppModels";

interface Props {
   chars: IFeature[];
}

export const DeviceChar: React.FC<Props> = ({ chars }) => {
   return (
      <ListGroup>
         <h1>Характеристики</h1>
         {!chars.length && <div>Похоже мы забыли указать характеристики для устройства</div>}
         {chars.map((info) => (
            <ListGroup.Item key={info.id}>
               {info.title}: {info.description}
            </ListGroup.Item>
         ))}
      </ListGroup>
   );
};
