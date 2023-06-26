import React from "react";
import { ListGroup } from "react-bootstrap";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Loader } from "../Loader";

export const DeviceComments: React.FC = () => {
   const { comments, isCommentsLoading } = useAppSelector((state) => state.comments);

   if (isCommentsLoading) return <Loader />;

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
