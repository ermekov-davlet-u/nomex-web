import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./component.css"; // можно стилизовать отдельно

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__left">
        <img src="/logo.png" alt="Logo" className="header__logo" />
      </div>
      <nav className="header__nav">
        <Link to="/orders" className={location.pathname === "/OrderList" ? "active" : ""}>Заказы</Link>
        <Link to="/create-order" className={location.pathname === "/create-order" ? "active" : ""}>Добавить заказ</Link>
        <Link to="/recipient" className={location.pathname === "/recipient" ? "active" : ""}>Получатели</Link>
        <Link to="/create-recipient" className={location.pathname === "/create-recipient" ? "active" : ""}>Добавить получателя </Link>
        {/* <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link> */}
        {/* <Link to="/register" className={location.pathname === "/register" ? "active" : ""}>Register</Link> */}
      </nav>
      <div className="header__user">
        <FaUserCircle size={28} />
      </div>
    </header>
  );
};

export default Header;
