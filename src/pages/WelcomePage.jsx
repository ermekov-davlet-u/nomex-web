// src/pages/WelcomePage.jsx

import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function WelcomePage() {
  return (
    <div className="welcome">
      <div className="welcome_left">
        <div className="welcome_title">
          Добро пожаловать <br /> в <span className="welcome_subtext">IC-SOLUTIONS</span>
        </div>
        <div className="welcome_text">
          Быстрая и надежная <br /> доставка из-за рубежа
        </div>
        <div className="welcome_btns">
          <Link to={"login"}><Button>Войти</Button></Link>
          <Link to={"register"}><Button>Зарегистрироваться</Button></Link>
        </div>
      </div>
      <div className="welcome_right">
        <img src="welcome.png" alt="" />
      </div>
    </div>
  );
}
