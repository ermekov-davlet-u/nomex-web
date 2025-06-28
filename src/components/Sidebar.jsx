// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <nav className="sidebar">
            <ul>
                <li>
                    <NavLink to="/home">🏠 Главная</NavLink>
                </li>
                <li>
                    <NavLink to="/orders">📦 Заказы</NavLink>
                </li>
                <li>
                    <NavLink to="/profile">👤 Профиль</NavLink>
                </li>
                <li>
                    <NavLink to="/shops">🛒 Магазины</NavLink>
                </li>
                <li>
                    <NavLink to="/calculator">🧮 Калькулятор</NavLink>
                </li>
                <li>
                    <NavLink to="/address">📍 Адреса</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">📞 Контакты</NavLink>
                </li>
                {/* добавь остальные ссылки по желанию */}
            </ul>
        </nav>
    );
}

export default Sidebar;
