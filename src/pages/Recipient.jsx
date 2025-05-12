import React, { useState, useEffect } from "react";
import { useGetRecipientsQuery } from "../store/api/recipientApi"; // Сделай запросы к API через Redux

const RecipientList = () => {
  const { data: recipients = [], isLoading } = useGetRecipientsQuery(); // Получаем список через Redux или другой API запрос

  return (
    <div className="recipient-list">
      <h2>Список получателей</h2>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="recipient-cards">
          {recipients.map((recipient) => (
            <div key={recipient.guid} className="recipient-card">
              <div className="card-header">
                <h3>{recipient.name}</h3>
              </div>
              <div className="card-body">
                <p>ID паспорта: {recipient.ppt_id}</p>
                <p>ИНН: {recipient.ppt_inn}</p>
                <p>Адрес: {recipient.address}</p>
                <p>Клиентский код: {recipient.client_code}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipientList;
