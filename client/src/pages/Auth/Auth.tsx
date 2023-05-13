import React from "react";

import { Button, Card, Container, Form, Row } from "react-bootstrap";

import styles from "./Auth.module.css";
import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REG_ROUTE } from "../../utils/constants";

export const Auth = () => {
   const location = useLocation();
   const isLogin = location.pathname === LOGIN_ROUTE;

   return (
      <div>
         <Container
            className={clsx("d-flex justify-content-center align-items-center", styles.auth)}
         >
            <Card className={clsx("p-5", styles.card)}>
               <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
               <Form className="d-flex flex-column">
                  <Form.Control className="mt-3" placeholder="Введите ваш email..." />
                  <Form.Control className="mt-3" placeholder="Введите ваш пароль..." />
                  <Row className="d-flex justify-content-between ps-3 pe-3">
                     {isLogin ? (
                        <div className="mt-3">
                           Ещё не зарегистрированы? {" "}
                           <NavLink to={REG_ROUTE}>Зарегистрироваться</NavLink>
                        </div>
                     ) : (
                        <div className="mt-3">
                           Есть аккаунт? {" "}
                           <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                        </div>
                     )}
                     <Button className="mt-3" variant="outline-success">
                        {isLogin ? "Войти" : "Регистрация"}
                     </Button>
                  </Row>
               </Form>
            </Card>
         </Container>
      </div>
   );
};
