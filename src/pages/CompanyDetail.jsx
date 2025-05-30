import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompanyDetail() {
    const [companyName, setCompanyName] = useState("");
    const [inn, setInn] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        console.log("Company Name:", companyName);
        console.log("INN:", inn);
        // navigate("/next-step"); // Раскомментируй, если нужно переходить дальше
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.title}>Сведения о компании</h1>
                <p style={styles.subtitle}>
                    Присоединяйтесь к тысячам пользователей, совершающих покупки в интернете
                </p>

                {/* Название компании */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Название компании (латиницей)</label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Название компании (латиницей)"
                        style={styles.input}
                    />
                </div>

                {/* ИНН */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>ИНН</label>
                    <input
                        type="text"
                        value={inn}
                        onChange={(e) => setInn(e.target.value)}
                        placeholder="ИНН"
                        style={styles.input}
                    />
                </div>

                {/* Кнопка */}
                <button style={styles.button} onClick={handleSubmit}>
                    Продолжить и завершить
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: "#f8f8f8",
        minHeight: "100vh",
        padding: "40px 0",
    },
    content: {
        maxWidth: 500,
        margin: "0 auto",
        padding: "0 20px",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#000000", // черный
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#666666", // серый
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        display: "block",
        marginBottom: 8,
        fontSize: 14,
        color: "#000000", // черный
    },
    input: {
        width: "100%",
        padding: "12px 14px",
        fontSize: 16,
        borderRadius: 8,
        border: "1px solid #cccccc",
        outline: "none",
    },
    button: {
        width: "100%",
        padding: "14px",
        fontSize: 16,
        backgroundColor: "#ff0000", // красный
        color: "#ffffff",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        marginTop: 10,
    },
};
