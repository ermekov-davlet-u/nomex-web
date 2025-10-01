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
import Button from "./Button";
import TutorialModal from "./TutorialModal";
import PaymentModal from "./PaymentModal";

const Header = ({ setMenu }) => {
  const location = useLocation();
  const [amount, setAmount] = useState(0); // начальное значение
  const [notification, setNotification] = useState(false);
  const [seccesscreate, setSeccessCreate] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  const increment = () => setAmount((prev) => prev + 500);
  const decrement = () =>
    setAmount((prev) => (prev - 500 >= 0 ? prev - 500 : 0));

  const handleChange = (e) => {
    const val = parseInt(e.target.value);
    setAmount(isNaN(val) ? 0 : val);
  };

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
      {/* Модалка пополнения */}
      <PaymentModal
        isOpen={openPayment}
        onClose={() => setOpenPayment(false)}
        handleSkip={() => setOpenPayment(false)}
        btnTitle={"Пополнить"}
        rejectTitle={"Отмена"}
        title="Пополнение баланса"
        description=""
      >
        {/* Сюда можно вставить форму */}
        <div className="balance_pament_content">
          <button className="payment_circle_btn" onClick={decrement}>
            -
          </button>
          <input
            type="number"
            className="text-flield"
            placeholder="Сумма"
            value={amount}
            onChange={handleChange}
          />
          <button className="payment_circle_btn" onClick={increment}>
            +
          </button>
        </div>
      </PaymentModal>
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
          {/* <Button
            style={{ height: 36, padding: "1px 2rem", margin: 0 }}
            onClick={() => setOpenPayment(true)}
          >
            Пополнить
          </Button> */}
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
