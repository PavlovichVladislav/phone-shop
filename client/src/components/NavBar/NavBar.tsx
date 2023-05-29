import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./NavBar.module.css";
import { Button } from "react-bootstrap";
import { ADMIN_ROUTE, LOGIN_ROUTE } from "../../utils/constants";
import { setIsAuth } from "../../redux/slices/userSlice";

export const NavBar = () => {
   const { _isAuth, user } = useAppSelector((state) => state.user);
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const onExit = () => {
      dispatch(setIsAuth(false));
      navigate(LOGIN_ROUTE);
   };

   return (
      <>
         <Navbar bg="dark" variant="dark">
            <Container>
               <NavLink className={styles.navLink} to={"/"}>
                  SibDevice
               </NavLink>
               <Nav className="ml-auto">
                  {_isAuth ? (
                     <>
                        <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>
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
