import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./component.css"; // можно стилизовать отдельно

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__left">
        <img src="/logo192.png" alt="Logo" className="header__logo" />
      </div>
      <nav className="header__nav">
        <Link to="/orders" className={location.pathname === "/orders" ? "active" : ""}>Заказы</Link>
        <Link to="/address" className={location.pathname === "/address" ? "active" : ""}>Страны</Link>
        <Link to="/create-order" className={location.pathname === "/create-order" ? "active" : ""}>Добавить заказ</Link>
        <Link to="/recipient" className={location.pathname === "/recipient" ? "active" : ""}>Получатели</Link>
        <Link to="/BuyForMeForm" className={location.pathname === "/BuyForMeForm" ? "active" : ""}>Купить вместо меня</Link>
        <Link to="/create-recipient" className={location.pathname === "/create-recipient" ? "active" : ""}>Добавить получателя </Link>
      </nav>
      <Link to="/profile" className={location.pathname === "/profilepage" ? "active" : ""} >
        <FaUserCircle size={28} />
      </Link>
    </header>
  );
};

export default Header;
