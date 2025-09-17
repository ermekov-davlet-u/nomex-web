// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

function Sidebar({
    menu,
    setMenu
}) {
    return (
        <nav className="sidebar" style={menu ? {
            width: "calc(100% - 90px)",
            display: "block",
            zIndex: 99
        } : {}} onClick={() => {
            setMenu(false)
        }}>
            <ul className="sidebar-ul">
                <li style={{ borderRadius: "20px" }}>
                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            `sidebar-li ${isActive ? "sidebar-li_active" : ""}`
                        }
                    >
                        <img src="/lk.png" className="sideber_img" alt="" />
                        <span className="sidebar-elem">Заказы</span>
                    </NavLink>
                </li>
                <li style={{ borderRadius: "20px" }}>
                    <NavLink
                        to="/create-order"
                        className={({ isActive }) =>
                            `sidebar-li ${isActive ? "sidebar-li_active" : ""}`
                        }
                    >
                        <img src="/addord.png" className="sideber_img" alt="" />
                        <span className="sidebar-elem">Создать заказ</span>
                    </NavLink>
                </li>
                <li style={{ borderRadius: "20px" }}>
                    <NavLink
                        to="/country"
                        className={({ isActive }) =>
                            `sidebar-li ${isActive ? "sidebar-li_active" : ""}`
                        }
                    >
                        <img src="/country.png" className="sideber_img" alt="" />
                        <span className="sidebar-elem">Страны</span>
                    </NavLink>
                </li>
                <li style={{ borderRadius: "20px" }}>
                    <NavLink
                        to="/recipient"
                        className={({ isActive }) =>
                            `sidebar-li ${isActive ? "sidebar-li_active" : ""}`
                        }
                    >
                        <img src="/addRec.png" className="sideber_img" alt="" />
                        <span className="sidebar-elem">Получатели</span>
                    </NavLink>
                </li>
                <li style={{ borderRadius: "20px" }}>
                    <NavLink
                        to="/shops"
                        className={({ isActive }) =>
                            `sidebar-li ${isActive ? "sidebar-li_active" : ""}`
                        }
                    >
                        <img src="/shops.png" className="sideber_img" alt="" />
                        <span className="sidebar-elem">Магазины</span>
                    </NavLink>
                </li>
                <li style={{ borderRadius: "20px" }}>
                    <NavLink
                        to="/BuyForMeForm"
                        className={({ isActive }) =>
                            `sidebar-li ${isActive ? "sidebar-li_active" : ""}`
                        }
                    >
                        <img src="/buyfor.png" className="sideber_img" alt="" />
                        <span className="sidebar-elem">Купи вместо меня</span>
                    </NavLink>
                </li>
                <li style={{ borderRadius: "20px" }}>
                    <NavLink
                        to="/calculator"
                        className={({ isActive }) =>
                            `sidebar-li ${isActive ? "sidebar-li_active" : ""}`
                        }
                    >
                        <img src="/calc.png" className="sideber_img" alt="" />
                        <span className="sidebar-elem">Калькулятор</span>
                    </NavLink>
                </li>
                <li style={{ borderRadius: "20px" }}>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `sidebar-li ${isActive ? "sidebar-li_active" : ""}`
                        }
                    >
                        <img src="/contact.png" className="sideber_img" alt="" />
                        <span className="sidebar-elem">Контакты</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;
