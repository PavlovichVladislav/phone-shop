import { AppRouter } from "./components/AppRouter";
import { useEffect, useState } from "react";
import { check } from "./http/userApi";
import { useAppDispatch } from "./hooks/reduxHooks";
import { setIsAuth, setUser } from "./redux/slices/userSlice";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/NavBar";

function App() {
   const [loading, setLoading] = useState(true);
   const dispatch = useAppDispatch();

   useEffect(() => {
      check()
         .then((user) => {
            dispatch(setUser(user));
            dispatch(setIsAuth(true));
         })
         .catch(() => {
            dispatch(setUser(null));
            dispatch(setIsAuth(false));
         })
         .finally(() => setLoading(false));
   }, []);

   if (loading) {
      return <Spinner animation="grow"/>;
   }

   return (
      <BrowserRouter>
         <NavBar />
         <AppRouter />
      </BrowserRouter>
   );
}

export default App;
