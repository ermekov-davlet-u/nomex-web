import React from "react";

export default function TextField({
    type = "text",
    label,
    value,
    onChange,
    placeholder,
    icon,
    error,
    accept,
    name
}) {
    return (
        <div className={`text-field_form-group ${error ? "error_text" : ""}`}>
            {label && (
                <label className="text-field_label">
                    {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
                    {label}
                </label>
            )}

            {type === "file" ? (
                <input
                    type="file"
                    accept={accept}
                    onChange={onChange}
                />
            ) : (
                <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="text-flield"
                />
            )}
        </div>
    );
}
