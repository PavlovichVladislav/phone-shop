import React from "react";
import { ListGroup } from "react-bootstrap";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Loader } from "../Loader";

export const DeviceComments: React.FC = () => {
   const { comments, isCommentsLoading, commentsError } = useAppSelector((state) => state.comments);

   if (isCommentsLoading) return <Loader />;

   if (commentsError) return <div>{commentsError}</div>;

   return (
      <ListGroup>
         <h1>Комментарии</h1>
         {!comments.length && <div>Комментариев ещё нет, будьте первым!</div>}
         {comments.length > 0 &&
            comments.map((comment) => (
               <ListGroup.Item key={comment.id}>
                  Пользователь {comment.userId}: {comment.comment}
               </ListGroup.Item>
            ))}
      </ListGroup>
   );
};
