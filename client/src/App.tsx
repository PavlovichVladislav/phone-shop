import { AppRouter } from "./components/AppRouter";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { checkUsersAuth } from "./redux/slices/user/userThunks";
import { Loader } from "./components/Loader";

function App() {
   const dispatch = useAppDispatch();
   const { isLoading } = useAppSelector((state) => state.user);

   useEffect(() => {
      dispatch(checkUsersAuth());
   }, []);

   if (isLoading) {
      return <Loader/>;
   }

   return (
      <BrowserRouter>
         <NavBar />
         <AppRouter />
      </BrowserRouter>
   );
}

export default App;
