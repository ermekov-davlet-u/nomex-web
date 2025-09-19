import React from "react";

export default function Button({
    onClick,
    children,
    type = "button",
    className = "",
    disabled = false,
    style,
    ...param
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn submit-button ${className}`}
            style={style}
            {...param}
        >
            {children}
        </button>
    );
}
