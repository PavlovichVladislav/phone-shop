import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { logUser, regUser } from "../../redux/slices/user/userThunks";

import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { Loader } from "../../components/Loader";

import { LOGIN_ROUTE, REG_ROUTE } from "../../utils/constants";

import styles from "./Auth.module.css";

export const Auth = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { pathname } = useLocation();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const { isLoading } = useAppSelector((state) => state.user);

   const isLogin = pathname === LOGIN_ROUTE;

   const clearForm = () => {
      setEmail("");
      setPassword("");
   };

   const afterAuth = () => {
      navigate("/");
      clearForm();
   };

   const handleBtnClick = () => {
      if (isLogin) {
         dispatch(logUser({ email, password, afterAuth }));
      } else {
         dispatch(regUser({ email, password, afterAuth }));
      }
   };

   useEffect(() => {
      clearForm();
   }, [isLogin]);

   if (isLoading) return <Loader />;

   return (
      <Container className={clsx("d-flex justify-content-center align-items-center", styles.auth)}>
         <Card className={clsx("p-5", styles.card)}>
            <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
            <Form className="d-flex flex-column">
               <Form.Control
                  className="mt-3"
                  placeholder="Введите ваш email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <Form.Control
                  className="mt-3"
                  placeholder="Введите ваш пароль..."
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <Row className="d-flex justify-content-between ps-3 pe-3">
                  {isLogin ? (
                     <div className="mt-3">
                        Ещё не зарегистрированы?{" "}
                        <NavLink to={REG_ROUTE}>Зарегистрироваться</NavLink>
                     </div>
                  ) : (
                     <div className="mt-3">
                        Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                     </div>
                  )}
                  <Button className="mt-3" variant="outline-success" onClick={handleBtnClick}>
                     {isLogin ? "Войти" : "Регистрация"}
                  </Button>
               </Row>
            </Form>
         </Card>
      </Container>
   );
};
