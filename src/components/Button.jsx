import React from "react";

export default function Button({
    onClick,
    children,
    type = "button",
    className = "",
    disabled = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn submit-button ${className}`}
        >
            {children}
        </button>
    );
}
