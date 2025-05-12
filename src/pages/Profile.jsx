import React from "react";
import { useNavigate } from "react-router-dom";
import { IoPersonOutline, IoKeyOutline, IoPeopleOutline, IoRibbonOutline, IoShieldCheckmarkOutline, IoChevronForwardOutline } from "react-icons/io5";
import { MdStar } from "react-icons/md";

const ProfilePage = () => {
    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <div className="prime-section">
                <div className="prime-header">
                    <MdStar className="prime-icon" />
                    <h2 className="prime-title">Статус Prime</h2>
                </div>
                <p className="prime-dates">01 Apr 2024 — 01 Apr 2025</p>
                <div className="prime-progress">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "10%" }}></div>
                    </div>
                    <p className="progress-text">0 / 100 до следующего уровня</p>
                </div>
            </div>

            <div className="profile-options">
                <ProfileOption icon={<IoPersonOutline />} label="Личная информация" />
                <ProfileOption icon={<IoKeyOutline />} label="Изменить пароль" />
                <ProfileOption icon={<IoPeopleOutline />} label="Купить вместо меня" onClick={() => navigate("/buy-for-me")} />
                <ProfileOption icon={<IoPeopleOutline />} label="Получатели" onClick={() => navigate("/recievers")} />
                <ProfileOption icon={<IoRibbonOutline />} label="Заполнить персональные данные" onClick={() => navigate("/personal-info")} />
                <ProfileOption icon={<IoShieldCheckmarkOutline />} label="Договоры и правила" />
            </div>
        </div>
    );
};

const ProfileOption = ({ icon, label, onClick = () => { } }) => (
    <div className="profile-option" onClick={onClick}>
        <div className="option-content">
            <span className="option-icon">{icon}</span>
            <span className="option-label">{label}</span>
        </div>
        <IoChevronForwardOutline className="chevron-icon" />
    </div>
);

export default ProfilePage;
