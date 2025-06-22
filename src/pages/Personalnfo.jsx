import React, { useState } from "react";
import {
    FaFileUpload,
    FaIdCard,
    FaPassport,
    FaUser,
    FaUserShield,
} from "react-icons/fa";
import { useSubmitUserDataMutation } from "../store/api/userApi";
import "./pages.css";
import { useLocation } from "react-router-dom";

export default function PersonalInfoDetailWeb() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [inn, setInn] = useState("");
    const [isLocal, setIsLocal] = useState(true);
    const [passportFront, setPassportFront] = useState(null);
    const [passportBack, setPassportBack] = useState(null);
    const [visaScan, setVisaScan] = useState(null);
    const [inputErrors, setInputErrors] = useState({});
    const [submitUserData] = useSubmitUserDataMutation();
    const location = useLocation();
    const email = location.state?.email || "";

    const handleFileChange = (e, setFile) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const handleSubmit = async () => {
        const errors = {};
        if (!firstName) errors.firstName = true;
        if (!lastName) errors.lastName = true;
        if (!idNumber) errors.idNumber = true;
        if (!inn) errors.inn = true;
        if (!passportFront) errors.passportFront = true;
        if (!passportBack) errors.passportBack = true;
        if (!isLocal && !visaScan) errors.visaScan = true;

        setInputErrors(errors);
        if (Object.keys(errors).length > 0) return;

        try {
            await submitUserData({
                firstName,
                lastName,
                idNumber,
                inn,
                passportFront,
                passportBack,
                visaScan,
                isLocal,
                ...(email ? { email } : {})
            }).unwrap();
            alert("Данные успешно отправлены!");
        } catch (err) {
            console.error("Ошибка отправки данных:", err);
            alert("Ошибка при отправке данных");
        }
    };

    return (
        <div className="personal-info-form">
            <h2 className="form-title">Добавьте свою информацию</h2>
            <p className="form-subtitle">
                Присоединяйтесь к тысячам пользователей, совершающих покупки в интернете
            </p>

            <label className="checkbox-label">
                <input
                    type="checkbox"
                    checked={isLocal}
                    onChange={() => setIsLocal(!isLocal)}
                />
                Гражданин Кыргызстана
            </label>

            <div className={`form-group ${inputErrors.firstName ? "error" : ""}`}>
                <label><FaUser /> Имя (латиницей)</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Имя"
                />
            </div>

            <div className={`form-group ${inputErrors.lastName ? "error" : ""}`}>
                <label><FaUser /> Фамилия (латиницей)</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Фамилия"
                />
            </div>

            <div className={`form-group ${inputErrors.idNumber ? "error" : ""}`}>
                <label><FaIdCard /> ID или номер паспорта</label>
                <input
                    type="text"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="ID или номер паспорта"
                />
            </div>

            <div className={`form-group ${inputErrors.inn ? "error" : ""}`}>
                <label><FaUserShield /> ИНН</label>
                <input
                    type="text"
                    value={inn}
                    onChange={(e) => setInn(e.target.value)}
                    placeholder="ИНН"
                />
            </div>

            <div className={`form-group ${inputErrors.passportFront ? "error" : ""}`}>
                <label><FaPassport /> Лицевая сторона паспорта</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setPassportFront)}
                />
            </div>

            <div className={`form-group ${inputErrors.passportBack ? "error" : ""}`}>
                <label><FaPassport /> Обратная сторона паспорта</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setPassportBack)}
                />
            </div>

            {!isLocal && (
                <div className={`form-group ${inputErrors.visaScan ? "error" : ""}`}>
                    <label><FaFileUpload /> Скан Visa</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setVisaScan)}
                    />
                </div>
            )}

            <button onClick={handleSubmit} className="submit-button">
                Продолжить
            </button>
        </div>
    );
}
