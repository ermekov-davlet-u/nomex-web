import React from "react";

export default function RecipientCard({
    logo = "LOGO",
    name = "Давлет Эрмеков",
    passportId = "12341564781",
    inn = "12165498495",
    address = "Республика Татарстан, г. Казань, ул. Галиаскара Камала, д. 41, офис 505а",
    clientCode = "12165498495",
}) {
    return (
        <div className="recipient-card">
            <div className="recipient-logo">{logo}</div>
            <div className="recipient-name">{name}</div>

            <div className="recipient-row">
                <span className="recipient-label">ID паспорта:</span>{" "}
                <span className="recipient-value">{passportId}</span>
            </div>
            <div className="recipient-row">
                <span className="recipient-label">ИНН:</span>{" "}
                <span className="recipient-value">{inn}</span>
            </div>
            <div className="recipient-row">
                <span className="recipient-label">Адрес:</span>{" "}
                <span className="recipient-value">{address}</span>
            </div>
            <div className="recipient-row">
                <span className="recipient-label">Клиентский код:</span>{" "}
                <span className="recipient-value">{clientCode}</span>
            </div>
        </div>
    );
}
