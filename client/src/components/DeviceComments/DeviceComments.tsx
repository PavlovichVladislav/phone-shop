import React from "react";
import { ListGroup } from "react-bootstrap";
import { useAppSelector } from "../../hooks/reduxHooks";

export const DeviceComments: React.FC = () => {
   const { comments } = useAppSelector(state => state.device)

   return (
      <ListGroup>
         <h1>Комментарии</h1>
         {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>
               Пользователь {comment.userId}: {comment.comment}
            </ListGroup.Item>
         ))}
      </ListGroup>
   );
};
