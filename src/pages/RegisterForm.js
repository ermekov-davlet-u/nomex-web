import React, { useState } from "react";
import "./pages.css";
import {
  useCheckEmailMutation,
  useRegisterMutation,
} from "../store/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TutorialModal from "../components/TutorialModal";

export function RegisterForm() {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [register, { isLoading, error }] = useRegisterMutation();
  const [checkEmail] = useCheckEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      errors.email ||
      errors.password ||
      errors.confirmPassword ||
      !email ||
      !password ||
      !confirmPassword
    )
      return;

    try {
      const responew = await checkEmail({ email: email }).unwrap();
      if (responew.result == 1) {
        setModal(true);
        return;
      }
      const response = await register({ email, phone, password }).unwrap();
      navigate("/confirm-code", {
        state: {
          email: email,
        },
      });
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
    } else if (value.length < 2) {
      setErrors((prev) => ({ ...prev, password: "Минимум 2 символов" }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Пароли не совпадают",
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const formatted = value.replace(/[^\d+]/g, "").slice(0, 12);
    setPhone(formatted);
    if (!/^\+7\d{10}$/.test(formatted)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Введите номер в формате +7XXXXXXXXXX",
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  return (
    <div className="login">
      <TutorialModal
        isOpen={modal}
        onAccept={() => {
          navigate("/login", {
            state: {
              email: email,
            },
          });
        }}
        onClose={() => setModal(false)}
        title="Такой аккаунт уже существует"
        // description="Хотите сбросить пароль?"
      />
      <div className="login_form">
        <div className="login-form_top"></div>
        <div className="login-form_title">Авторизация</div>
        <div className="login-form_field">
          <div className="login-form_label">email</div>
          <input
            className="login-form_inp"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          ></input>
        </div>
        <br />
        <div className="login-form_field">
          <div className="login-form_label">Номер телефона</div>
          <input
            className="login-form_inp"
            type="tel"
            name="phone"
            placeholder="Телефон (+7XXXXXXXXXX)"
            value={phone}
            onChange={handlePhoneChange}
            required
          ></input>
        </div>
        <br />
        <div className="login-form_field">
          <div className="login-form_label">Пароль</div>
          <input
            className="login-form_inp"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={handlePasswordChange}
            required
          ></input>
          <img src="" alt="" className="login-form_img" />
        </div>
        <br />
        <div className="login-form_field">
          <div className="login-form_label">Повторите пароль</div>
          <input
            className="login-form_inp"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Пароль"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          ></input>
          <img src="" alt="" className="login-form_img" />
        </div>
        <br />
        <div className="login-form_bottom">
          <Button onClick={handleSubmit}> Регистрация </Button>
          <div className="login-form_bottom_text">
            У вас уже есть аккаунт?{" "}
            <Link to={"/login"} className="register">
              Войти
            </Link>
          </div>
        </div>
      </div>
      <div className="login-img">
        <img src="/login-img.png" alt="" />
      </div>
    </div>
  );
}

export default RegisterForm;
