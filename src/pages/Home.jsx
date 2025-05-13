import React from "react";
import { Link } from "react-router-dom";
import { FaBox, FaGlobe, FaCalculator, FaShareAlt, FaUser, FaMapMarkerAlt, FaInfoCircle, FaPhone } from "react-icons/fa";
import ProfilePage from "./Profile";

const MainPage = () => {
    return (
        <div className="main-wrapper">
            {/* БАННЕР */}
            <section className="banner">
                <h1>Добро пожаловать в NOMEX</h1>
                <p>Быстрая и надежная доставка из-за рубежа</p>
                <Link to="/create-order" className="banner-btn">📦 Сделать заказ</Link>
            </section>

            {/* КАРТОЧКИ */}
            <section className="features">
                <div className="feature-card">
                    <FaBox className="feature-icon" />
                    <h3>Мои заказы</h3>
                    <Link to="/orders">Перейти</Link>
                </div>
                <div className="feature-card">
                    <FaGlobe className="feature-icon" />
                    <h3>Страны</h3>
                    <Link to="/countries">Открыть</Link>
                </div>
                <div className="feature-card">
                    <FaCalculator className="feature-icon" />
                    <h3>Калькулятор</h3>
                    <Link to="/calculator">Рассчитать</Link>
                </div>
                <div className="feature-card">
                    <FaShareAlt className="feature-icon" />
                    <h3>Соц. сети</h3>
                    <a href="https://t.me/yourtelegram" target="_blank" rel="noreferrer">Подписаться</a>
                </div>
            </section>

            {/* НИЖНЕЕ МЕНЮ */}
            <div style={{maxWidth: "1080px", margin: "0 auto"}}>
                <ProfilePage />
            </div>
            <section className="quick-links">
                <Link to="/profile">
                    <FaUser /> <span>Профиль</span>
                </Link>
                <Link to="/branches">
                    <FaMapMarkerAlt /> <span>Отделения</span>
                </Link>
                <Link to="/about">
                    <FaInfoCircle /> <span>О нас</span>
                </Link>
                <Link to="/contacts">
                    <FaPhone /> <span>Контакты</span>
                </Link>
            </section>

            {/* ФУТЕР */}
            <footer className="footer">
                <p>© 2025 NOMEX — Все права защищены</p>
                <p>Сделано с ❤️ в Кыргызстане</p>
            </footer>
        </div>
    );
};

export default MainPage;
