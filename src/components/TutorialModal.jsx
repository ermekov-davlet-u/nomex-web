import React from "react";
import "./TutorialModal.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function TutorialModal({ isOpen, onClose, title, description, link = "/create-order" }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleOkClick = () => {
        onClose?.(link);
        navigate();
    };

    const handleSkip = () => {
        navigate("/orders");
    };

    return (
        <div className="tutorial-modal-backdrop">
            <div className="tutorial-modal">
                <h2>{title}</h2>
                <p>{description}</p>
                <p
                    className="tutorial-modal_prop"
                    onClick={handleSkip}
                    style={{ cursor: "pointer", color: "#007bff" }}
                >
                    Пропустить
                </p>
                <Button onClick={handleOkClick}>Понятно</Button>
            </div>
        </div>
    );
}
