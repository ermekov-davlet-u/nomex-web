// App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";
import { BrowserRouter } from "react-router-dom";
import RegisterForm from "./pages/RegisterForm";
import OrderList from "./pages/Orders";
import CreateOrderForm from "./pages/CreateOrderForm";
import Header from "./components/Header";
import RecipientList from "./pages/Recipient";
import AddRecipientForm from "./pages/RecipientForm";
import ProfilePage from "./pages/Profile";
import BuyForMeForm from "./pages/BuyForMe";
import AddressList from "./pages/Adress";
import Calculator from "./pages/Calculator";
import PersonalInfoDetailWeb from "./pages/Personalnfo";
import Shops from "./pages/Shops";
import ConfirmActivCode from "./pages/ConfirmActivCode";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/orders"
            element={
              <ProtectedRoute>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/confirm-code"
            element={
              <ConfirmActivCode />
            }
          />
          <Route path="/personal-info"
            element={
              <ProtectedRoute>
                <PersonalInfoDetailWeb />
              </ProtectedRoute>
            }
          />
          <Route path="/shops"
            element={
              <ProtectedRoute>
                <Shops />
              </ProtectedRoute>
            }
          />
          <Route path="/calculator"
            element={
              <ProtectedRoute>
                <Calculator />
              </ProtectedRoute>
            }
          />

          <Route path="/address"
            element={
              <ProtectedRoute>
                <AddressList />
              </ProtectedRoute>
            }
          />
          <Route path="/BuyForMeForm"
            element={
              <ProtectedRoute>
                <BuyForMeForm />
              </ProtectedRoute>
            }
          />
          <Route path="/create-order"
            element={
              <ProtectedRoute>
                <CreateOrderForm />
              </ProtectedRoute>
            }
          />
          <Route path="/recipient"
            element={
              <ProtectedRoute>
                <RecipientList />
              </ProtectedRoute>
            }
          />
          <Route path="/create-recipient"
            element={
              <ProtectedRoute>
                <AddRecipientForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
