import React from "react";

export default function SelectField({
    label,
    value = "",
    onChange,
    options = [],
    placeholder = "Выберите вариант",
    icon,
    error,
    defaultValue = "",
    name,
}) {
    return (
        <div className={`text-field_form-group ${error ? "error" : ""}`}>
            {label && (
                <label className="text-field_label">
                    {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
                    {label}
                </label>
            )}

            <select
                name={name}
                value={value || defaultValue}
                onChange={onChange}
                className="text-flield"
            >
                {placeholder && (
                    <option value="">{placeholder}</option>
                )}
                {options.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>

            {error && <div className="ordform-error">{error}</div>}
        </div>
    );
}
