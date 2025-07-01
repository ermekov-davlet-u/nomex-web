import React, { useState } from "react";

export default function FileUpload({
    label = "Файл",
    icon = null,
    error = false,
    onChange = () => { },
}) {
    const [fileName, setFileName] = useState("");

    const handleChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : "");
        onChange(e);
    };

    return (
        <div className={`form-group ${error ? "error" : ""}`}>
            {label && (
                <label className="invoice-label">
                    {icon} {label}
                </label>
            )}
            <div className="file-input-container">
                <input
                    type="file"
                    id={label.replace(/\s+/g, "-").toLowerCase()}
                    className="file-input"
                    onChange={handleChange}
                />
                <label
                    htmlFor={label.replace(/\s+/g, "-").toLowerCase()}
                    className="file-button"
                >
                    Выберите файл
                </label>
            </div>
            <div className="file-name">
                {fileName || "Файл не выбран"}
            </div>
        </div>
    );
}
