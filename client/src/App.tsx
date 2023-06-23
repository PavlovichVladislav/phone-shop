import { AppRouter } from "./components/AppRouter";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/reduxHooks";
import { BrowserRouter } from "react-router-dom";
import { checkUsersAuth } from "./redux/slices/user/userThunks";
import { Layout } from "./components/Layout";

function App() {
   const dispatch = useAppDispatch();
   
   useEffect(() => {
      dispatch(checkUsersAuth());
   }, []);

   return (
      <BrowserRouter>
         <Layout>
            <AppRouter />
         </Layout>
      </BrowserRouter>
   );
}

export default App;
