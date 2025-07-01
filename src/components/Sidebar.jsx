// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <nav className="sidebar">
            <ul>
                {/* <li className="sidebar-li">
                    <NavLink to="/home"> Главная</NavLink>
                </li> */}
                <li className="sidebar-li">
                    <NavLink className="sidebar-elem" to="/orders"> Заказы</NavLink>
                </li>
                <li className="sidebar-li">
                    <NavLink className="sidebar-elem" to="/create-order">Создать заказ</NavLink>
                </li>
                <li className="sidebar-li">
                    <NavLink className="sidebar-elem" to="/country">Страны</NavLink>
                </li>
                <li className="sidebar-li">
                    <NavLink className="sidebar-elem" to="/recipient">Получатели</NavLink>
                </li>
                <li className="sidebar-li">
                    <NavLink className="sidebar-elem" to="/shops"> Магазины</NavLink>
                </li>
                <li className="sidebar-li">
                    <NavLink className="sidebar-elem" to="/BuyForMeForm">Купи вместо меня</NavLink>
                </li>
                <li className="sidebar-li">
                    <NavLink className="sidebar-elem" to="/calculator"> Калькулятор</NavLink>
                </li>
                <li className="sidebar-li">
                    <NavLink className="sidebar-elem" to="/contact"> Контакты</NavLink>
                </li>
                {/* добавь остальные ссылки по желанию */}
            </ul>
        </nav>
    );
}

export default Sidebar;
