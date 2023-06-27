import { AppRouter } from "./components/AppRouter";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { BrowserRouter } from "react-router-dom";
import { checkUsersAuth } from "./redux/slices/user/userThunks";
import { Layout } from "./components/Layout";
import { fetchBasketDevices } from "./redux/slices/basket/basketThunks";

function App() {
   const dispatch = useAppDispatch();
   const { user } = useAppSelector((state) => state.user);

   useEffect(() => {
      dispatch(checkUsersAuth());
      //eslint-disable-next-line
   }, []);

   useEffect(() => {
      if (user) dispatch(fetchBasketDevices(user.id));
      //eslint-disable-next-line
   }, [user]);

   return (
      <BrowserRouter>
         <Layout>
            <AppRouter />
         </Layout>
      </BrowserRouter>
   );
}

export default App;
