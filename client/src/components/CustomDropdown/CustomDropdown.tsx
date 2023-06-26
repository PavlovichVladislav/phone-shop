import React from "react";
import { Dropdown } from "react-bootstrap";
import { ICategory } from "../../models/AppModels";

interface Props {
   entities: ICategory[];
   setEntity: (entity: ICategory) => void;
   currentEntity: ICategory | undefined;
   placeholder: string;
}

export const CustomDropdown: React.FC<Props> = ({ entities, setEntity, currentEntity, placeholder }) => {
   return (
      <Dropdown className="mt-3">
         <Dropdown.Toggle variant="success" id="dropdown-basic">
            {currentEntity?.name || placeholder}
         </Dropdown.Toggle>
         <Dropdown.Menu>
            {entities.map((entity) => (
               <Dropdown.Item onClick={() => setEntity(entity)} key={entity.id}>
                  {entity.name}
               </Dropdown.Item>
            ))}
         </Dropdown.Menu>
      </Dropdown>
   );
};
