import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import RegisterForm from "./pages/RegisterForm";
import OrderList from "./pages/Orders";
import CreateOrderForm from "./pages/CreateOrderForm";
import RecipientList from "./pages/Recipient";
import AddRecipientForm from "./pages/RecipientForm";
import ProfilePage from "./pages/Profile";
import BuyForMeForm from "./pages/BuyForMe";
import AddressList from "./pages/Adress";
import Calculator from "./pages/Calculator";
import PersonalInfoDetailWeb from "./pages/Personalnfo";
import Shops from "./pages/Shops";
import ConfirmActivCode from "./pages/ConfirmActivCode";
import Home from "./pages/Home";
import ContactsPage from "./pages/ContactsPage";
import ChooseFizUr from "./pages/ChooseFizUr";
import CompanyDetail from "./pages/CompanyDetail";
import Country from "./pages/Country";
import WelcomePage from "./pages/WelcomePage";

import "./App.css";
import ResetPassword from "./pages/ResetPassword";
import { useState } from "react";

function App() {

  const [menu, setMenu] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Welcome page - без лэйаута */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/confirm-code" element={<ConfirmActivCode />} />
          <Route path="/choose-role" element={<ChooseFizUr />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/personal-info"
            element={<PersonalInfoDetailWeb />}
          />
          {/* Все остальные страницы - с лэйаутом */}
          <Route
            path="*"
            element={
              <div className="layout">
                <Sidebar menu={menu} setMenu={setMenu} />
                <main className="content">
                  <Header setMenu={setMenu} />
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/register" element={<RegisterForm />} />

                    <Route
                      path="/orders"
                      element={
                        <ProtectedRoute>
                          <OrderList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/create-order"
                      element={
                        <ProtectedRoute>
                          <CreateOrderForm />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/country"
                      element={
                        <ProtectedRoute>
                          <Country />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <ProfilePage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/company-detail" element={<CompanyDetail />} />
                    <Route path="/contact" element={<ContactsPage />} />
                    <Route
                      path="/shops"
                      element={
                        <ProtectedRoute>
                          <Shops />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/calculator"
                      element={
                        <ProtectedRoute>
                          <Calculator />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/address"
                      element={
                        <ProtectedRoute>
                          <AddressList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/BuyForMeForm"
                      element={
                        <ProtectedRoute>
                          <BuyForMeForm />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/recipient"
                      element={
                        <ProtectedRoute>
                          <RecipientList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/create-recipient"
                      element={
                        <ProtectedRoute>
                          <AddRecipientForm />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
