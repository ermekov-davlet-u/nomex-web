import { useEffect, useState } from "react";

import { logout } from "../store/slice/authSlice";
import { resetStore } from "../store";


export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(localStorage.getItem("accessToken"))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("accessToken");
      setIsAuthenticated(!!token);
    }, 1000); // Проверка каждую секунду

    return () => clearInterval(interval);
  }, []);

  return { isAuthenticated };
};




export function handleLogout(dispatch, navigate) {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  dispatch(logout());       // сброс authSlice
  dispatch(resetStore());   // сброс ВСЕГО Redux состояния

  navigate("/login");
}