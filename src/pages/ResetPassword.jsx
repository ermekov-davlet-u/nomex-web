// ResetPassword.js
import React, { useEffect, useState } from "react";
import "./pages.css";
import { useResetPasswordMutation, useLoginMutation } from "../store/api/authApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../store/slice/authSlice";
import { useDispatch } from "react-redux";
import Button from "../components/Button";

export function ResetPassword() {
	const location = useLocation();
	const email1 = location.state?.email || "";
	const [email, setEmail] = React.useState(email1);
	const [password, setPassword] = React.useState("");
	const [errors, setErrors] = React.useState({ email: "", password: "" });
	const [showPassword, setShowPassword] = React.useState(false);

	const [confirmPassword, setConfirmPassword] = useState("");
	const [resetPassword] = useResetPasswordMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		setEmail(email1)
	}, [email1])
	const handleLogin = async () => {
		if (errors.email || errors.password || !email || !password || (confirmPassword != password)) return;
		try {
			const response = await resetPassword({ email, password }).unwrap();
			alert("Ваш пароль успешно обновлен!")
			if (response.success) {
				navigate("/login");
			}
		} catch (err) {
			console.error("Ошибка входа:", err);
		}
	};

	const handleEmailChange = (e) => {
		const value = e.target.value;
		setEmail(value);
		if (!value) {
			setErrors((prev) => ({ ...prev, email: "Email обязателен" }));
		} else if (!/\S+@\S+\.\S+/.test(value)) {
			setErrors((prev) => ({ ...prev, email: "Неправильный формат email" }));
		} else {
			setErrors((prev) => ({ ...prev, email: "" }));
		}
	};

	const handleConfirmPasswordChange = (e) => {
		const value = e.target.value;
		setConfirmPassword(value);
		if (value !== password) {
			setErrors((prev) => ({ ...prev, confirmPassword: "Пароли не совпадают" }));
		} else {
			setErrors((prev) => ({ ...prev, confirmPassword: "" }));
		}
	};

	const handlePasswordChange = (e) => {
		const value = e.target.value;
		setPassword(value);
		if (!value) {
			setErrors((prev) => ({ ...prev, password: "Пароль обязателен" }));
		} else if (value.length <= 2) {
			setErrors((prev) => ({ ...prev, password: "Минимум 2 символов" }));
		} else {
			setErrors((prev) => ({ ...prev, password: "" }));
		}
	};

	return (
		// <div className="login-container">
		// 	<form className="login-form">
		// 		<div className="form-group">
		// 			<input
		// 				type="email"
		// 				name="email"
		// 				placeholder="Email"
		// 				value={email}
		// 				className="form-group-input"
		// 				onChange={handleEmailChange}
		// 				required
		// 			/>
		// 			{errors.email && <span className="error">{errors.email}</span>}
		// 		</div>
		// 		<div className="form-group">
		// 			<div className="password-input-wrapper">
		// 				<input
		// 					
		// 				/>
		// 				<button
		// 					type="button"
		// 					className="toggle-password"
		// 					onClick={() => setShowPassword(!showPassword)}
		// 					aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
		// 				>
		// 					{showPassword ? "Скрыть" : "Показать"}
		// 				</button>
		// 			</div>
		// 			{errors.password && <span className="error">{errors.password}</span>}
		// 		</div>
		// 		<button type="button" className="submit-btn" onClick={handleLogin}>Войти</button>
		// 		<Link to={"/register"}>Зарегистрироваться</Link>
		// 	</form>
		// </div>

		<div className="login">
			<div className="login_form">
				<div className="login-form_top"></div>
				<div className="login-form_title">Авторизация</div>
				<div className="login-form_field">
					<div className="login-form_label">email</div>
					<input className="login-form_inp" type="email"
						name="email"
						placeholder="Email"
						value={email}
						onChange={handleEmailChange}
						required></input>
				</div>
				<div className="login-form_field">
					<div className="login-form_label">password</div>
					<input className="login-form_inp" type={showPassword ? "text" : "password"}
						name="password"
						placeholder="Пароль"
						value={password}
						onChange={handlePasswordChange}
						required></input>
					<img src="" alt="" className="login-form_img" />
				</div>
				<div className="login-form_field">
					<div className="login-form_label">Повторите пароль</div>
					<input className="login-form_inp" type={showPassword ? "text" : "password"}
						name="password"
						placeholder="Пароль"
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
						required></input>
					<img src="" alt="" className="login-form_img" />
				</div>
				<div className="login-form_bottom">
					<Button onClick={handleLogin}> Сбросить </Button>

				</div>
			</div>
			<div className="login-img">
				<img src="/login-img.png" alt="" />
			</div>
		</div>
	);
}


export default ResetPassword