import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaBell } from "react-icons/fa";
import "./component.css"; // можно стилизовать отдельно
import { useSelector } from "react-redux"; // если уведомления в Redux

const Header = () => {
  const location = useLocation();

  // Пример: получить уведомления из Redux
  const notifications = useSelector(
    (state) => state.notifications?.items || []
  );
  const hasUnread = true;

  return (
    <header className="header">
      <nav className="header__nav"> </nav>

      <div className="header_left">
        <div className="header__icons">
          <Link to="/notifications" className="header__icon">
            <div style={{ position: "relative" }}>
              <FaBell size={24} />
              {hasUnread && (
                <span
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    width: 10,
                    height: 10,
                    backgroundColor: "#ff7878",
                    borderRadius: "50%",
                  }}
                ></span>
              )}
            </div>
          </Link>
          <Link to="/profile" className={"profilepage header__icon"}>
            <FaUserCircle size={24} />
          </Link>
        </div>
        <div className="header_left_btns">
          <div className="header_left_btn">Помощь</div>
          <div className="header_left_btn">Выйти</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
