import React from "react";
import "./TutorialModal.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useMarkAsReadMutation } from "../store/api/notificationsApi";

export default function NotificationModal({ isOpen, onClose, title, description, link, data }) {
    const navigate = useNavigate();
    const [isReadnotify] = useMarkAsReadMutation();

    if (!isOpen) return null;

    const handleOkClick = () => {
        onClose?.(link);
        if (link) {
            navigate(link);
        }
    };

    const handleSkip = () => {
        navigate("/orders");
    };

    return (
        <div className="notification-modal">
            <p className="notification_title">{title}</p>
            <div className="notification_conent">

                {data.map((item) => {
                    return <div className="notification_item" key={item.guid}>
                        <div className="notification_item_title">{item.title}</div>
                        <div className="notification_item_text">{item.message_text}</div>
                        <button className="notification_item_btn" onClick={() => {
                            isReadnotify({
                                guid: item.guid,
                                is_read: 1
                            })
                        }}>
                            Подробнее
                        </button>
                    </div>
                })}
            </div>

            {/* <p
                    className="tutorial-modal_prop"
                    onClick={handleSkip}
                    style={{ cursor: "pointer", color: "#007bff" }}
                >
                    Пропустить
                </p> */}
            {/* <Button onClick={handleOkClick}>Понятно</Button> */}
        </div>
    );
}
