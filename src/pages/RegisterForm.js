import React from "react";
import "./pages.css";
import { useRegisterMutation } from "../store/api/authApi";
import { Link, useNavigate } from "react-router-dom";

export function RegisterForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const navigate = useNavigate()
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [errors, setErrors] = React.useState({ email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = React.useState(false);
    const [register, { isLoading, error }] = useRegisterMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            errors.email || errors.phone || errors.password || errors.confirmPassword ||
            !email || !phone || !password || !confirmPassword
        ) return;

        try {
            const response = await register({ email, phone, password }).unwrap();
            navigate("/confirm-code")
            console.log("Успешная регистрация:", response);
            // редирект или логика авторизации
        } catch (err) {
            console.error("Ошибка регистрации:", err);
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
        } else if (value.length < 8) {
            setErrors((prev) => ({ ...prev, password: "Минимум 8 символов" }));
        } else {
            setErrors((prev) => ({ ...prev, password: "" }));
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

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        const formatted = value.replace(/[^\d+]/g, '').slice(0, 12);
        setPhone(formatted);
        if (!/^\+7\d{10}$/.test(formatted)) {
            setErrors((prev) => ({ ...prev, phone: "Введите номер в формате +7XXXXXXXXXX" }));
        } else {
            setErrors((prev) => ({ ...prev, phone: "" }));
        }
    };


    return (
        <div className="login-container">
            <form className="login-form">
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        className="form-group-input"
                        onChange={handleEmailChange}
                        required
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Телефон (+7XXXXXXXXXX)"
                        value={phone}
                        className="form-group-input"
                        onChange={handlePhoneChange}
                        required
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>
                <div className="form-group">
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Пароль"
                            value={password}
                            className="form-group-input"
                            onChange={handlePasswordChange}
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                        >
                            {showPassword ? "Скрыть" : "Показать"}
                        </button>
                    </div>
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Подтвердите пароль"
                        value={confirmPassword}
                        className="form-group-input"
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
                <button type="submit" className="submit-btn" onClick={handleSubmit}>Зарегистрироваться</button>
                <Link to={"/login"}>Войти</Link>
            </form>
        </div>
    );
}

export default RegisterForm;