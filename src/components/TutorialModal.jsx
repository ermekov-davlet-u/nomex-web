import React from "react";
import "./TutorialModal.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function TutorialModal({ isOpen, onClose, title, description, link, btnTitle = 'Понятно', onAccept, rejectTitle, handleSkip, children }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleOkClick = () => {
        onClose?.(link);
        if (onAccept) {
            onAccept();
            return;
        }
        if (link) {
            navigate(link);
        }
    };



    return (
        <div className="tutorial-modal-backdrop">
            <div className="tutorial-modal">
                <h2>{title}</h2>
                <p> {children} {description}</p>
                {!!rejectTitle && <p
                    className="tutorial-modal_prop"
                    onClick={handleSkip}
                    style={{ cursor: "pointer", color: "#007bff" }}
                >
                    {rejectTitle}
                </p>
                }
                <Button onClick={handleOkClick}>{btnTitle}</Button>
            </div>
        </div>
    );
}
