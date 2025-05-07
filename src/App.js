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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/OrderList" element={<OrderList />} />
          <Route path="/create-order" element={<CreateOrderForm />} />
          <Route path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
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
