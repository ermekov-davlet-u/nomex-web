import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaBell } from "react-icons/fa";
import "./component.css"; // можно стилизовать отдельно
import { useSelector } from "react-redux"; // если уведомления в Redux
import { handleLogout } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NotificationModal from "./NotificationModal";
import { useGetNotificationsQuery } from "../store/api/notificationsApi";
import TutorialModal from "./TutorialModal";

const Header = ({ setMenu }) => {
  const location = useLocation();
  const [notification, setNotification] = useState(false);
  const [seccesscreate, setSeccessCreate] = useState(false);

  const { data: notifications } = useGetNotificationsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Пример: получить уведомления из Redux
  const hasUnread = true;

  return (
    <>
      <TutorialModal
        isOpen={seccesscreate}
        onClose={() => {
          handleLogout(dispatch, navigate);
        }}
        handleSkip={() => {
          setSeccessCreate((state) => !state);
        }}
        btnTitle={"Выйти"}
        rejectTitle={"Остаться"}
        title="Выход"
        description="Вы действительно хотите выйти?"
      />
      <header className="header">
        <nav className="header__nav">
          <img
            src="menu.png"
            alt=""
            className="burger-menu"
            width={24}
            onClick={() => {
              setMenu((state) => !state);
            }}
          />
        </nav>

        <div className="header_left">
          <input
            type="text"
            className="balance_inp"
            value={"Баланс: 500"}
            readOnly
          />
          <div className="header__icons">
            <li
              to="/notifications"
              onClick={() => setNotification((state) => !state)}
              className="header__icon notification_icon"
            >
              <NotificationModal
                isOpen={notification}
                title={"Мои уведомления"}
                data={notifications}
              />
              <div style={{ position: "relative" }}>
                <FaBell size={24} />
                {!!notifications?.length && (
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
            </li>
            <Link to="/profile" className={"profilepage header__icon"}>
              <FaUserCircle size={24} />
            </Link>
          </div>
          <div className="header_left_btns">
            <div className="header_left_btn">Помощь</div>
            <div
              className="header_left_btn"
              onClick={() => {
                setSeccessCreate((state) => !state);
              }}
            >
              Выйти
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
