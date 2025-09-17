import React, { useState, useEffect } from "react";
import { useGetRecipientsQuery } from "../store/api/recipientApi"; // Сделай запросы к API через Redux
import RecipientCard from "../components/RecipientCard";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useTutorial } from "../hooks/useTutorial";
import TutorialModal from "../components/TutorialModal";
import QuestionHint from "../components/QuestionHint";

const RecipientList = () => {
  const { data: recipients = [], isLoading } = useGetRecipientsQuery(); // Получаем список через Redux или другой API запрос
  const navigate = useNavigate()
  const tutorial = useTutorial("tutorial_shown_recipient_form");
  return (
    <div className="recipient-list">
      <TutorialModal
        isOpen={tutorial.isOpen}
        onClose={tutorial.onClose}
        title="5 этап"
        description="Здесь вы можете ознакомиться со своим списком получателей"
      />
      <div className="top-title">
        <p className="form-title">Список получателей <QuestionHint text="Здесь должен быть текст с подсказкой Здесь должен быть текст с подсказкой Здесь должен быть текст с подсказкой" position="right" /></p>
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
