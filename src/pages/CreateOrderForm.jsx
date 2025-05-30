import React, { useState } from "react";
import { useCreateOrEditOrderMutation } from "../store/api/orderApi";
import "./order.css"; // Подключаем наш CSS
import { useGetCountriesQuery, useGetCurrenciesQuery, useGetRecipientsQuery, useGetCategoriesQuery } from "../store/api/recipientApi";

const CreateOrderForm = () => {
    const { data: recipients, error: recipientsError, isLoading: isLoadingRecipients } = useGetRecipientsQuery();
    const { data: countries, error: countriesError, isLoading: isLoadingCountries } = useGetCountriesQuery();
    const { data: category, error: categoryError, isLoading: isLoadingCategory } = useGetCategoriesQuery();
    const { data: currency, error: currencyError, isLoading: isLoadingCurrency } = useGetCurrenciesQuery();
    const [form, setForm] = useState({
        trackingNumber: "",
        cost: "",
        storeName: "",
        note: "",
        orderGuid: null,
        selectedCountry: { guid: "" },
        selectedReciever: { guid: "" },
        selectedCurrency: { guid: "" },
        selectedTarif: { guid: "" },
        selectedCategory: { guid: "" },
        invoiceFile: null,
    });

    const [createOrEditOrder, { isLoading }] = useCreateOrEditOrderMutation();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({
                ...prev,
                invoiceFile: {
                    uri: URL.createObjectURL(file),
                    name: file.name,
                    type: file.type,
                    raw: file,
                },
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("tracking_number", form.trackingNumber);
        formData.append("amount", form.cost);
        formData.append("shop", form.storeName);
        formData.append("description", form.note);
        formData.append("order_guid", form.orderGuid);
        formData.append("country_guid", form.selectedCountry.guid);
        formData.append("reciever_guid", form.selectedReciever.guid);
        formData.append("currency_guid", form.selectedCurrency.guid);
        formData.append("tarif_guid", form.selectedTarif.guid);
        formData.append("category_guid", form.selectedCategory.guid);
        if (form.invoiceFile?.raw) {
            formData.append("invoice", form.invoiceFile.raw);
        }

        try {
            await createOrEditOrder(formData).unwrap();
            alert("✅ Заказ успешно создан!");
        } catch (err) {
            console.error(err);
            alert("❌ Ошибка при создании заказа.");
        }
    };

    return (
        <div className="ordform-container">
            <h2 className="ordform-header">📦 Создание заказа</h2>
            <form onSubmit={handleSubmit} className="ordform-space-y-4">
                <div className="ordform-group">
                    <label className="ordform-label">Получатель</label>
                    {isLoadingRecipients ? (
                        <div className="ordform-loading">Загрузка...</div>
                    ) : recipientsError ? (
                        <div className="ordform-error">Ошибка загрузки</div>
                    ) : (
                        <select
                            value={form.selectedReciever.guid}
                            onChange={(e) =>
                                setForm({ ...form, selectedReciever: { guid: e.target.value } })
                            }
                            className="ordform-select"
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
                            value={form.selectedCountry.guid}
                            onChange={(e) =>
                                setForm({ ...form, selectedCountry: { guid: e.target.value } })
                            }
                            className="ordform-select"
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
                <div className="ordform-group">
                    <label className="ordform-label">Валюта</label>
                    {isLoadingCurrency ? (
                        <div className="ordform-loading">Загрузка...</div>
                    ) : currencyError ? (
                        <div className="ordform-error">Ошибка загрузки</div>
                    ) : (
                        <select
                            value={form.selectedCurrency.guid}
                            onChange={(e) =>
                                setForm({ ...form, selectedCurrency: { guid: e.target.value } })
                            }
                            className="ordform-select"
                        >
                            <option value="">Выберите валюту</option>
                            {currency.map((c) => (
                                <option key={c.guid} value={c.guid}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="ordform-group">
                    <label className="ordform-label">Категория</label>
                    {isLoadingCategory ? (
                        <div className="ordform-loading">Загрузка...</div>
                    ) : categoryError ? (
                        <div className="ordform-error">Ошибка загрузки</div>
                    ) : (
                        <select
                            value={form.selectedCategory.guid}
                            onChange={(e) =>
                                setForm({ ...form, selectedCategory: { guid: e.target.value } })
                            }
                            className="ordform-select"
                        >
                            <option value="">Выберите категорию</option>
                            {category.map((c) => (
                                <option key={c.guid} value={c.guid}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="ordform-group">
                    <label className="ordform-label">Трек-номер</label>
                    <input
                        type="text"
                        value={form.trackingNumber}
                        onChange={(e) => setForm({ ...form, trackingNumber: e.target.value })}
                        className="ordform-input"
                        placeholder="1234567890"
                    />
                </div>
                <div className="ordform-group">
                    <label className="ordform-label">Стоимость</label>
                    <input
                        type="number"
                        value={form.cost}
                        onChange={(e) => setForm({ ...form, cost: e.target.value })}
                        className="ordform-input"
                        placeholder="1000"
                    />
                </div>

                <div className="ordform-group">
                    <label className="ordform-label">Магазин</label>
                    <input
                        type="text"
                        value={form.storeName}
                        onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                        className="ordform-input"
                        placeholder="Amazon, eBay..."
                    />
                </div>
                <div className="ordform-group">
                    <label className="ordform-label">Ссылка на товар</label>
                    <input
                        type="text"
                        value={form.her}
                        onChange={(e) => setForm({ ...form, her: e.target.value })}
                        className="ordform-input"
                        placeholder="https:"
                    />
                </div>

                <div className="ordform-group">
                    <label className="ordform-label">Описание</label>
                    <textarea
                        value={form.note}
                        onChange={(e) => setForm({ ...form, note: e.target.value })}
                        className="ordform-textarea"
                        placeholder="Описание заказа"
                    ></textarea>
                </div>

                <div className="ordform-group">
                    <label className="ordform-label">Файл инвойса</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="ordform-file-input"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="ordform-button"
                >
                    {isLoading ? "Отправка..." : "Создать заказ"}
                </button>
            </form>
        </div>
    );
};

export default CreateOrderForm;
