// LoginForm.js
import React, { useEffect } from "react";
import "./pages.css";
import {
  useForgotPasswordMutation,
  useLoginMutation,
} from "../store/api/authApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../store/slice/authSlice";
import { useDispatch } from "react-redux";
import Button from "../components/Button";

export function LoginForm() {
  const location = useLocation();
  const email1 = location.state?.email || "";
  const [email, setEmail] = React.useState(email1);
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginUser] = useLoginMutation();
  const [forgotPass] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setEmail(email1);
  }, [email1]);
  const handleLogin = async () => {
    if (errors.email || errors.password || !email || !password) return;

    try {
      const response = await loginUser({ email, password }).unwrap();
      if (response.success) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        dispatch(login());
        navigate("/orders");
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "Неверный email или пароль",
          password: "Неверный email или пароль",
        }));
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        email: "Ошибка входа",
      }));
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
    <div className="login">
      <div className="login-left">
        <div className="login_form">
          <div className="login-form_top"></div>
          <div className="login-form_title">Авторизация</div>
          <div
            className={`login-form_field ${errors.email ? "err_field" : ""}`}
          >
            <div className="login-form_label">email</div>
            <input
              className="login-form_inp"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          {errors.email ? <p className="err_text">{errors.email}</p> : <p> </p>}

          <div
            className={`login-form_field ${errors.password ? "err_field" : ""}`}
          >
            <div className="login-form_label">password</div>
            <input
              className="login-form_inp"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <img src="" alt="" className="login-form_img" />
          </div>
          {errors.password && <p className="err_text">{errors.password}</p>}
          <div className="login-form_bottom">
            <Button onClick={handleLogin}> Войти </Button>
            <div className="login-form_bottom_text">
              <p> У вас ещё нет аккаунта? </p>{" "}
              <Link to={"/register"} className="register">
                Зарегистрироваться
              </Link>
            </div>
            {!!email && (
              <div
                className="login-form_bottom_text"
                onClick={async () => {
                  if (!email) {
                    return;
                  }
                  const { data } = await forgotPass({
                    email: email,
                  });
                  if (data.success) {
                    navigate("/confirm-code", {
                      state: {
                        email: email,
                        isResetPassword: true,
                      },
                    });
                  }
                }}
              >
                <li className="register">Забыли пароль?</li>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="login-img">
        <img src="/login-img.png" alt="" />
      </div>
    </div>
  );
}

export default LoginForm;
