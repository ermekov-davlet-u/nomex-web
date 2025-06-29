import React, { useState, useEffect } from "react";
import { useGetRecipientsQuery } from "../store/api/recipientApi"; // Сделай запросы к API через Redux
import RecipientCard from "../components/RecipientCard";

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
            <RecipientCard />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipientList;
