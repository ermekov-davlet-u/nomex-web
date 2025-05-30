import React from "react";

const ContactsPage = () => {
    return (
        <div className="contacts-container">
            <div className="contacts-wrapper">
                <h2 className="contacts-title">Свяжитесь с нами</h2>
                <p className="contacts-subtitle">
                    Заполните форму ниже — и мы свяжемся с вами как можно скорее.
                </p>

                <form className="contacts-form">
                    <div className="contacts-row">
                        <div className="contacts-field">
                            <label htmlFor="name">Ваше имя</label>
                            <input type="text" id="name" placeholder="Иван Иванов" />
                        </div>
                        <div className="contacts-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="example@mail.com" />
                        </div>
                    </div>

                    <div className="contacts-field">
                        <label htmlFor="message">Сообщение</label>
                        <textarea id="message" rows="5" placeholder="Введите сообщение..." />
                    </div>

                    <button type="submit" className="contacts-button">Отправить</button>
                </form>

                <div className="contacts-info">
                    <h3>Контактные данные</h3>
                    <p><strong>Телефон:</strong> +996 (500) 123-456</p>
                    <p><strong>Email:</strong> support@example.com</p>
                    <p><strong>Адрес:</strong> г. Бишкек, ул. Исанова 32</p>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;
