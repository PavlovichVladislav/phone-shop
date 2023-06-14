import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";

import styles from "./NavBar.module.css";
import { Button } from "react-bootstrap";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE } from "../../utils/constants";
import { setIsAuth, setUser } from "../../redux/slices/userSlice";
import { setCurBrand, setCurType } from "../../redux/slices/shopSlice";

export const NavBar = () => {
   const { _isAuth, user } = useAppSelector((state) => state.user);
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const onExit = () => {
      dispatch(setIsAuth(false));
      dispatch(setUser(null));
      window.localStorage.removeItem('token');
      navigate(LOGIN_ROUTE);
   };

   const onBackToMain = () => {
      dispatch(setCurBrand(null));
      dispatch(setCurType(null));
      navigate('/');
   }

   return (
      <>
         <Navbar bg="dark" variant="dark">
            <Container>
               <div className={styles.navLink} onClick={onBackToMain}>
                  SibDevice
               </div>
               <Nav className="ml-auto">
                  {_isAuth ? (
                     <>
                        <Button variant={"outline-light"} onClick={() => navigate(BASKET_ROUTE)}>
                           Корзина
                        </Button>
                        <Button className="ms-2" variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>
                           Панель администратора
                        </Button>
                        <Button className="ms-2" variant={"outline-light"} onClick={onExit}>
                           Выйти
                        </Button>
                     </>
                  ) : (
                     <>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>
                           Авторизация{" "}
                        </Button>
                     </>
                  )}
               </Nav>
            </Container>
         </Navbar>
      </>
   );
};
