// auth/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null); // null = неавторизован
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			setUser({ token }); // или декодируй через jwtDecode(token)
		}
	}, []);

	const login = (token) => {
		localStorage.setItem("accessToken", token);
		setUser({ token });
		navigate("/");
	};

	const logout = () => {
		localStorage.removeItem("accessToken");
		setUser(null);
		navigate("/login");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
