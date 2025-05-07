import { useEffect, useState } from "react";

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
