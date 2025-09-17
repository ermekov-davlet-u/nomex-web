import React from "react";

export default function RecipientCard({
    logo = "",
    first_name = "",
    last_name = '',
    email = "",
    phone = "",
    address = "Республика Татарстан, г. Казань, ул. Галиаскара Камала, д. 41, офис 505а",
    client_code = "",
}) {
    return (
        <div className="recipient-card">
            <div className="recipient-logo">{logo}</div>
            <div className="recipient-name">{first_name} {last_name}</div>

            <div className="recipient-row">
                <span className="recipient-label">email:</span>{" "}
                <span className="recipient-value">{email}</span>
            </div>
            <div className="recipient-row">
                <span className="recipient-label">Тел номер:</span>{" "}
                <span className="recipient-value">{phone}</span>
            </div>
            <div className="recipient-row">
                <span className="recipient-label">Адрес:</span>{" "}
                <span className="recipient-value">{address}</span>
            </div>
            <div className="recipient-row">
                <span className="recipient-label">Клиентский код:</span>{" "}
                <span className="recipient-value">{client_code}</span>
            </div>
        </div>
    );
}
