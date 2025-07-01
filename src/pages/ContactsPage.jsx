import React from "react";
import TextField from "../components/TextField";

const ContactsPage = () => {
    return (


        <div className="personal-info-form">
            <div className="form-title">Добавьте свою информацию</div>
            <div className="recipient-row" style={{ paddingTop: "45px" }}>
                <span className="recipient-label">Телефон:</span>{" "}
                <span className="recipient-value">{"passportId"}</span>
            </div>
            <div className="recipient-row">
                <span className="recipient-label">Email:</span>{" "}
                <span className="recipient-value">{"passportId"}</span>
            </div>
            <div className="recipient-row">
                <span className="recipient-label">Адрес:</span>{" "}
                <span className="recipient-value">{"passportId"}</span>
            </div>

            <div className="top-title" style={{ paddingTop: "45px" }}>
                <div className="form-title">Свяжитесь с нами</div>
                <p className="contact-subtitle">
                    Заполните форму ниже — и мы свяжемся с вами как можно скорее.
                </p>
            </div>
            <div className="contact-bottom">
                <div className="contact-bottom_left">
                    <TextField
                        label="Ваше имя"
                        // icon={<FaUser />}
                        onChange={(e) => { }}
                        placeholder="Имя"
                    />
                    <TextField
                        label="Email"
                        // icon={<FaUser />}
                        onChange={(e) => { }}
                        placeholder="Имя"
                    />
                </div>
                <div className="contact-bottom_right">
                    <div className="ordform-group" style={{ width: "calc(100% - 24px)" }}>
                        <label className="ordform-label">Описание</label>
                        <textarea
                            className="ordform-textarea"
                            placeholder="Описание заказа"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;
