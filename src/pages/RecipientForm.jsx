import React, { useState } from "react";
import { useAddRecipientMutation } from "../store/api/recipientApi"; // Мутация для добавления через Redux или API

const AddRecipientForm = () => {
  const [formData, setFormData] = useState({
    phone: "",
    birth_date: "",
    first_name: "",
    last_name: "",
    address: "",
    client_code: "",
  });

  const [addRecipient, { isLoading }] = useAddRecipientMutation(); // Мутация для создания получателя

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addRecipient(formData).unwrap(); // Вызов API
      alert("Получатель успешно добавлен!");
    } catch (err) {
      console.error(err);
      alert("Ошибка при добавлении получателя.");
    }
  };

  return (
    <div className="add-recipient-form">
      <h2>Добавить получателя</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-rec">
          <label>Имя</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-rec">
          <label>Фамилия</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-rec">
          <label>Телефон</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-rec">
          <label>ID паспорта</label>
          <input
            type="text"
            name="ppt_id"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-rec">
          <label>ИНН</label>
          <input
            type="text"
            name="ppt_inn"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-rec">
          <label>Дата рождения</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-rec">
          <label>Адрес</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-rec">
          <label>Клиентский код</label>
          <input
            type="text"
            name="client_code"
            value={formData.client_code}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Добавить получателя"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipientForm;
