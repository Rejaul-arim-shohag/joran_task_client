import { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import CancelPage from "./Pages/CancelPage"
import CompletedPage from "./Pages/CompletedPage";
import NewPage from "./Pages/NewPage";
import ProgressPage from "./Pages/ProgressPage";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import ForgetPassword from "./Pages/ForgetPassword";
import NotFoundPage from "./Pages/NotFoundPage";
import CreatePage from "./Pages/CreatePage";
import FullScreenLoader from "./components/MasterLayout/FullScreenLoader";
import { getToken } from "./Helper/SessionHelper";
import CreatePasswordPage from "./Pages/AccountRecover/CreatePasswordPage";
import SendOTPPage from "./Pages/AccountRecover/SendOTPPage";
import VerifyOTPPage from "./Pages/AccountRecover/VerifyOTPPage";
import ProductsPage from "./Pages/ProductsPage";

function App() {
  if (getToken()) {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route exact path="/products" element={<ProductsPage />} />
            <Route exact path="/Create" element={<CreatePage />} />
            <Route exact path="/All" element={<NewPage />} />
            <Route exact path="/Progress" element={<ProgressPage />} />
            <Route exact path="/Completed" element={<CompletedPage />} />
            <Route exact path="/Canceled" element={<CancelPage />} />
            <Route exact path="/Profile" element={<ProfilePage />} />
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
            <Route exact path="/Forgetpass" element={<ForgetPassword />} />
            <Route exact path="/SendOTP" element={<SendOTPPage />} />
            <Route exact path="/VerifyOTP" element={<VerifyOTPPage />} />
            <Route exact path="/CreatePassword" element={<CreatePasswordPage />} />
            <Route path="*" element={<NotFoundPage />} /> 
          </Routes>
        </BrowserRouter>
        <FullScreenLoader />
      </Fragment>
    );
  }

}

export default App;
