import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaBell } from "react-icons/fa";
import "./component.css"; // можно стилизовать отдельно
import { useSelector } from "react-redux"; // если уведомления в Redux

const Header = () => {
  const location = useLocation();

  // Пример: получить уведомления из Redux
  const notifications = useSelector(state => state.notifications?.items || []);
  const hasUnread = true

  return (
    <header className="header">
      <Link to="/home" className="header__left">
        <img src="/logo192.png" alt="Logo" className="header__logo" />
      </Link>
      <nav className="header__nav">
        <Link to="/orders" className={location.pathname === "/orders" ? "active" : ""}>Заказы</Link>
        <Link to="/address" className={location.pathname === "/address" ? "active" : ""}>Страны</Link>
        <Link to="/create-order" className={location.pathname === "/create-order" ? "active" : ""}>Добавить заказ</Link>
        <Link to="/recipient" className={location.pathname === "/recipient" ? "active" : ""}>Получатели</Link>
        <Link to="/BuyForMeForm" className={location.pathname === "/BuyForMeForm" ? "active" : ""}>Купить вместо меня</Link>
        <Link to="/create-recipient" className={location.pathname === "/create-recipient" ? "active" : ""}>Добавить получателя</Link>
        <Link to="/calculator" className={location.pathname === "/calculator" ? "active" : ""}>Калькулятор</Link>
        <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Контакты</Link>
        <Link to="/shops" className={location.pathname === "/shops" ? "active" : ""}>Магазин</Link>
      </nav>

      <div className="header__icons">
        <Link to="/notifications" className="header__icon">
          <div style={{ position: "relative" }}>
            <FaBell size={24} />
            {hasUnread && (
              <span style={{
                position: "absolute",
                top: -4,
                right: -4,
                width: 10,
                height: 10,
                backgroundColor: "#ff7878",
                borderRadius: "50%",
              }}></span>
            )}
          </div>
        </Link>
        <Link to="/profile" className={"profilepage header__icon"}>
          <FaUserCircle size={24} />
        </Link>

      </div>
    </header>
  );
};

export default Header;
