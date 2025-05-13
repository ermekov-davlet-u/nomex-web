import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetCountriesQuery, useGetRecipientsQuery } from "../store/api/recipientApi";
import { useSubmitBuyForMeMutation } from "../store/api/buyForMeApi";
import { FaPlus, FaTrash } from "react-icons/fa";

const BuyForMeForm = () => {
    const [formData, setFormData] = useState({
        reciever_guid: "",
        lists: [
            {
                id: Date.now(),
                name: "",
                link: "",
                price: "",
                amount: "",
                size: "",
                color: "",
                comment: "",
                selectedCurrency: null,
                selectedCountry: null,
                promocode: "",
            },
        ],
        promocode: "",
        comment: "",
        selectedReciever: { guid: "" },
        selectedCountry: { guid: "" },
        invoice_guid: "",
    });

    const [errors, setErrors] = useState({});

    const { data: recipients, error: recipientsError, isLoading: isLoadingRecipients } = useGetRecipientsQuery();
    const { data: countries, error: countriesError, isLoading: isLoadingCountries } = useGetCountriesQuery();
    const [submitBuyForMe, { isLoading: isSubmitting, isError }] = useSubmitBuyForMeMutation();

    const validateForm = () => {
        const errors = {
            reciever_guid: !formData.reciever_guid,
            lists: formData.lists.reduce((acc, item) => {
                const itemErrors = {
                    name: item?.name?.trim() === "",
                    link: item.link.trim() === "",
                    price: item.price === "",
                    amount: item.amount === "",
                    selectedCurrency: !item.selectedCurrency,
                    selectedCountry: !item.selectedCountry,
                };
                if (Object.values(itemErrors).some(Boolean)) {
                    acc[item.id] = itemErrors;
                }
                return acc;
            }, {}),
        };

        setErrors(errors);
        return Object.values(errors).some((e) => e === true);
    };

    const handleSubmit = async (type) => {
        const hasErrors = validateForm();
        if (hasErrors) {
            toast.error("Заполните все обязательные поля!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
            });
            return;
        }

        const items = formData.lists.map((item) => ({
            name: item.name.trim(),
            link: item.link.trim(),
            price: Number(item.price),
            amount: Number(item.amount),
            size: item.size.trim(),
            color: item.color.trim(),
            comment: item.comment.trim(),
            currency_guid: item?.selectedCurrency || null,
            country_guid: item?.selectedCountry || formData.selectedCountry,
            promocode: item?.promocode.trim() || formData.promocode.trim(),
        }));

        const requestData = {
            promocode: formData.promocode.trim(),
            comment: formData.comment.trim(),
            country_guid: formData.selectedCountry || null,
            reciever_guid: formData.reciever_guid || null,
            invoice_guid: formData.invoice_guid,
            type,
            items,
        };

        try {
            const response = await submitBuyForMe(requestData).unwrap();

            if (response.success) {
                toast.success(
                    formData.invoice_guid
                        ? "Купить вместо меня успешно отредактирован!"
                        : "Купить вместо меня успешно создан!",
                    {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                    }
                );
                setFormData({
                    reciever: "",
                    lists: [{
                        id: Date.now(),
                        name: "",
                        link: "",
                        price: "",
                        amount: "",
                        size: "",
                        color: "",
                        comment: "",
                        selectedCurrency: null,
                        selectedCountry: null,
                        promocode: "",
                    }],
                    promocode: "",
                    comment: "",
                    selectedReciever: { guid: "" },
                    selectedCountry: { guid: "" },
                    invoice_guid: "",
                });
            } else {
                toast.error("Не удалось создать Купить вместо меня", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            toast.error("Что-то пошло не так, попробуйте позже", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
            });
            console.error("Ошибка при отправке запроса:", error);
        }
    };

    const handleInputChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleListChange = (id, field, value) => {
        const updatedLists = formData.lists.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
        );
        setFormData({ ...formData, lists: updatedLists });
    };

    const handleAddItem = () => {
        setFormData((prevState) => ({
            ...prevState,
            lists: [
                ...prevState.lists,
                {
                    id: Date.now(),
                    name: "",
                    link: "",
                    price: "",
                    amount: "",
                    size: "",
                    color: "",
                    comment: "",
                    selectedCurrency: null,
                    selectedCountry: null,
                    promocode: "",
                },
            ],
        }));
    };

    const handleDeleteItem = (id) => {
        const updatedLists = formData.lists.filter((item) => item.id !== id);
        setFormData({ ...formData, lists: updatedLists });
    };

    return (
        <div style={styles.container}>

            <div className="ordform-group">
                <label className="ordform-label">Получатель</label>
                {isLoadingRecipients ? (
                    <div className="ordform-loading">Загрузка...</div>
                ) : recipientsError ? (
                    <div className="ordform-error">Ошибка загрузки</div>
                ) : (
                    <select
                        value={formData.selectedReciever}
                        onChange={handleInputChange}
                        className="ordform-select"
                        name="selectedReciever"
                    >
                        <option value="">Выберите получателя</option>
                        {recipients.map((r) => (
                            <option key={r.guid} value={r.guid}>
                                {r.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div className="ordform-group">
                <label className="ordform-label">Страна</label>
                {isLoadingCountries ? (
                    <div className="ordform-loading">Загрузка...</div>
                ) : countriesError ? (
                    <div className="ordform-error">Ошибка загрузки</div>
                ) : (
                    <select
                        value={formData.selectedCountry}
                        onChange={handleInputChange}
                        className="ordform-select"
                        name="selectedCountry"
                    >
                        <option value="">Выберите страну</option>
                        {countries.map((c) => (
                            <option key={c.guid} value={c.guid}>
                                {c.country}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            {formData.lists.map((item, index) => (
                <div key={item.id} style={styles.formGroup}>
                    <label style={styles.label}>Товар {index + 1}</label>
                    <input
                        type="text"
                        placeholder="Название"
                        value={item.name}
                        onChange={(e) => handleListChange(item.id, "name", e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Ссылка"
                        value={item.link}
                        onChange={(e) => handleListChange(item.id, "link", e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Цена"
                        value={item.price}
                        onChange={(e) => handleListChange(item.id, "price", e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Количество"
                        value={item.amount}
                        onChange={(e) => handleListChange(item.id, "amount", e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Размер"
                        value={item.size}
                        onChange={(e) => handleListChange(item.id, "size", e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Цвет"
                        value={item.color}
                        onChange={(e) => handleListChange(item.id, "color", e.target.value)}
                        style={styles.input}
                    />
                    <button
                        onClick={() => handleDeleteItem(item.id)}
                        style={styles.iconButton}
                        title="Удалить товар"
                    >
                        <FaTrash />
                    </button>

                </div>
            ))}

            <div style={styles.buttonGroup}>
                <button
                    style={styles.iconButton}
                    onClick={handleAddItem}
                    title="Добавить товар"
                >
                    <FaPlus />
                </button>
                <button
                    style={styles.submitButton}
                    onClick={() => handleSubmit("buy")}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Загрузка..." : "Отправить"}
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#fff",
        color: "#333",
        borderRadius: "8px",
    },
    formGroup: {
        marginBottom: "20px",
    },
    label: {
        fontSize: "14px",
        fontWeight: "500",
        marginBottom: "5px",
        display: "block",
        color: "#555",
    },
    iconButton: {
        padding: "10px",
        backgroundColor: "#eee",
        color: "#333",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        marginTop: "10px",
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        marginBottom: "5px",
        backgroundColor: "#f9f9f9",
    },
    buttonGroup: {
        textAlign: "center",
    },
    submitButton: {
        padding: "10px 20px",
        backgroundColor: "#f44336",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        width: "100%",
    },
    addButton: {
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "10px",
        width: "calc(50% - 10px)",
    },
    deleteButton: {
        padding: "5px 15px",
        backgroundColor: "#ff5f5f",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginTop: "10px",
        display: "block",
        width: "100%",
    },
    errorText: {
        color: "#ff5f5f",
        fontSize: "14px",
    },
};

export default BuyForMeForm;
