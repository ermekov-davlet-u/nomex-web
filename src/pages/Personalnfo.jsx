import React, { useState } from "react";
import {
    FaFileUpload,
    FaIdCard,
    FaPassport,
    FaUser,
    FaUserShield,
} from "react-icons/fa";
import { useSubmitUserDataMutation } from "../store/api/userApi";
import { useLocation } from "react-router-dom";
import TextField from "../components/TextField";
import "./pages.css";
import Button from "../components/Button";
import Slider from "../components/Slider";

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

            <div className="personal-info_content">
                <TextField
                    label="Имя (латиницей)"
                    // icon={<FaUser />}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Имя"
                    error={inputErrors.firstName}
                />

                <TextField
                    label="Фамилия (латиницей)"
                    // icon={<FaUser />}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Фамилия"
                    error={inputErrors.lastName}
                />

                <TextField
                    label="ID или номер паспорта"
                    // icon={<FaIdCard />}
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="ID или номер паспорта"
                    error={inputErrors.idNumber}
                />

                <TextField
                    label="ИНН"
                    // icon={<FaUserShield />}
                    value={inn}
                    onChange={(e) => setInn(e.target.value)}
                    placeholder="ИНН"
                    error={inputErrors.inn}
                />

                <TextField
                    label="Лицевая сторона паспорта"
                    // icon={<FaPassport />}
                    type="file"
                    onChange={(e) => handleFileChange(e, setPassportFront)}
                    error={inputErrors.passportFront}
                    accept="image/*"
                />

                <TextField
                    label="Обратная сторона паспорта"
                    // icon={<FaPassport />}
                    type="file"
                    onChange={(e) => handleFileChange(e, setPassportBack)}
                    error={inputErrors.passportBack}
                    accept="image/*"
                />

                {!isLocal && (
                    <TextField
                        label="Скан Visa"
                        icon={<FaFileUpload />}
                        type="file"
                        onChange={(e) => handleFileChange(e, setVisaScan)}
                        error={inputErrors.visaScan}
                        accept="image/*"
                    />
                )}
            </div>

            <div className="personal-bottom">
                <Button onClick={handleSubmit}>
                    Продолжить
                </Button>
            </div>

            <div className="person-footer">
                <Slider
                    label="Выберите значение:"
                    value={35}
                    onChange={(e) => { }}
                    min={1}
                    max={100}
                    leftText="дБ"
                />
            </div>
        </div>
    );
}
