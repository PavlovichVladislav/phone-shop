import React from "react";
import { ListGroup } from "react-bootstrap";
import { IComment } from "../../models/AppModels";

interface Props {
   comments: IComment[];
}

export const DeviceComments: React.FC<Props> = ({ comments }) => {
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
