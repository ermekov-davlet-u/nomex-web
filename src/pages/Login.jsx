// LoginForm.js
import React from "react";
import "./pages.css";
import { useLoginMutation } from "../store/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/slice/authSlice";
import { useDispatch } from "react-redux";
import Button from "../components/Button";

export function LoginForm() {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [errors, setErrors] = React.useState({ email: "", password: "" });
	const [showPassword, setShowPassword] = React.useState(false);
	const [loginUser] = useLoginMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogin = async () => {
		if (errors.email || errors.password || !email || !password) return;


		try {
			const response = await loginUser({ email, password }).unwrap();
			if (response.success) {
				localStorage.setItem("accessToken", response.accessToken);
				localStorage.setItem("refreshToken", response.refreshToken);
				dispatch(login());
				navigate("/orders");
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
				<div className="login-form_bottom">
					<Button onClick={handleLogin}> Войти </Button>
					<div className="login-form_bottom_text">
						У вас ещё нет аккаунта?{" "}
						<Link to={"/register"} className="register">Зарегистрироваться</Link>
					</div>
				</div>
			</div>
			<div className="login-img">
				<img src="/login-img.png" alt="" />
			</div>
		</div>
	);
}


export default LoginForm