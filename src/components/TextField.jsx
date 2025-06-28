import React from "react";

export default function TextField({
    type = "text",
    label,
    value,
    onChange,
    placeholder,
    icon,
    error,
    accept
}) {
    return (
        <div className={`text-field_form-group ${error ? "error" : ""}`}>
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
