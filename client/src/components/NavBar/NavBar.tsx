import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useAppSelector } from "../../hooks/reduxHooks";
import { NavLink } from "react-router-dom";

import styles from "./NavBar.module.css";
import { Button } from "react-bootstrap";

export const NavBar = () => {
   const { _isAuth, user } = useAppSelector((state) => state.user);

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
                        <Button variant={"outline-light"}>Панель администратора</Button>
                        <Button className="ml-2" variant={"outline-light"} >Выйти</Button>
                     </>
                  ) : (
                     <>
                        <Button variant={"outline-light"}>Авторизация </Button>
                     </>
                  )}
               </Nav>
            </Container>
         </Navbar>
      </>
   );
};
