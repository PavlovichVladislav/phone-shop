import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setIsAuth, setUser } from "../../redux/slices/user/userSlice";
import { setCurBrand, setCurType } from "../../redux/slices/shop/shopSlice";

import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, REG_ROUTE } from "../../utils/constants";

import styles from "./NavBar.module.css";

export const NavBar = () => {
   const { _isAuth } = useAppSelector((state) => state.user);
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
                        <Button variant={"outline-light"} className="ms-2" onClick={() => navigate(REG_ROUTE)}>
                           Регистрация{" "}
                        </Button>
                     </>
                  )}
               </Nav>
            </Container>
         </Navbar>
      </>
   );
};
