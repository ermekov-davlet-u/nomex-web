import React from "react";
import { useGetCountriesQuery } from "../store/api/recipientApi";
import { API_BASE_URL } from "../config";

const AddressList = () => {
    const { data: addresses, isLoading, isError } = useGetCountriesQuery();

    if (isLoading) return <p>Загрузка адресов...</p>;
    if (isError || !addresses) return <p>Ошибка загрузки адресов.</p>;

    return (
        <div style={styles.container}>
            {addresses.map((address) => (
                <div key={address.guid} style={styles.card}>
                    <img
                        src={`${API_BASE_URL}${address.flag}`}
                        alt={address.country}
                        style={styles.flag}
                    />
                    <div style={styles.details}>
                        <div style={styles.addressLine}>{address.address_line}</div>
                        {address.address_line2 && (
                            <div style={styles.subline}>{address.address_line2}</div>
                        )}
                        <div style={styles.subline}>
                            {address.city}, {address.state}, {address.postcode}
                        </div>
                        <div style={styles.meta}>
                            <span>{address.country}</span> •{" "}
                            <span>{address.currency}</span> •{" "}
                            <span>{address.phone}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "20px",
        maxWidth: "700px",
        margin: "0 auto",
    },
    card: {
        display: "flex",
        gap: "16px",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        alignItems: "center",
        cursor: "pointer"
    },
    flag: {
        width: "48px",
        height: "32px",
        borderRadius: "4px",
        objectFit: "cover",
        flexShrink: 0,
    },
    details: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },
    addressLine: {
        fontWeight: 600,
        fontSize: "16px",
        color: "#111",
    },
    subline: {
        fontSize: "14px",
        color: "#555",
    },
    meta: {
        fontSize: "13px",
        color: "#888",
    },
};

export default AddressList;
