import React, { useState } from "react";
import { useCreateOrEditOrderMutation } from "../store/api/orderApi";
import "./order.css"; // Подключаем наш CSS

const CreateOrderForm = () => {
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
