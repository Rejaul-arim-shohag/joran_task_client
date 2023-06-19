import { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NewPage from "./Pages/NewPage";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import NotFoundPage from "./Pages/NotFoundPage";
import CreatePage from "./Pages/CreatePage";
import FullScreenLoader from "./components/MasterLayout/FullScreenLoader";
import { getToken } from "./Helper/SessionHelper";
import ProductsPage from "./Pages/ProductsPage";
import UpdateProduct from "./Pages/UpdateProduct";

function App() {
 
  
  if (getToken()) {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NewPage />} />
            {/* <Route exact path="/products" element={<ProductsPage />} /> */}
            <Route exact path="/Create" element={<CreatePage />} />
            <Route exact path="/All" element={<NewPage />} /> 
            <Route exact path="/update/:product_id" element={<UpdateProduct />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <FullScreenLoader />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Navigate to="/Login" replace={true} />} />
            <Route exact path="/Login" element={<LoginPage />} />
            <Route exact path="/Registration" element={<RegistrationPage />} />
            <Route path="*" element={<NotFoundPage />} /> 
          </Routes>
        </BrowserRouter>
        <FullScreenLoader />
      </Fragment>
    );
  }

}

export default App;
