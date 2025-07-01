import React, { useState, useEffect } from "react";
import { useGetRecipientsQuery } from "../store/api/recipientApi"; // Сделай запросы к API через Redux
import RecipientCard from "../components/RecipientCard";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const RecipientList = () => {
  const { data: recipients = [], isLoading } = useGetRecipientsQuery(); // Получаем список через Redux или другой API запрос
  const navigate = useNavigate()
  return (
    <div className="recipient-list">
      <div className="top-title">
        <p className="form-title">Список получателей</p>
        <Button onClick={() => {
          navigate("/create-recipient")
        }}>
          Добавить получателя
        </Button>
      </div>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="recipient-cards">
          {recipients.map((recipient) => (
            <RecipientCard {...recipient} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipientList;
