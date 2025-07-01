import React, { useState } from "react";
import { useAddRecipientMutation } from "../store/api/recipientApi"; // Мутация для добавления через Redux или API
import TextField from "../components/TextField";
import Button from "../components/Button";

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
    <div className="recipient-list">
      <div className="top-title">
        <p className="form-title">Добавить получателя</p>
        {/* <Button onClick={() => {
          navigate("/create-recipient")
        }}>
          Добавить получателя
        </Button> */}
      </div>
      <form onSubmit={handleSubmit} className="ordform-space">
        <div className="ordform-group">
          <TextField
            label="Имя"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Введите имя"
          />
        </div>

        <div className="ordform-group">
          <TextField
            label="Фамилия"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Введите фамилию"
          />
        </div>

        <div className="ordform-group">
          <TextField
            label="Телефон"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+996..."
          />
        </div>

        <div className="ordform-group">
          <TextField
            label="ID паспорта"
            name="ppt_id"
            value={formData.ppt_id}
            onChange={handleChange}
            placeholder="A1234567"
          />
        </div>

        <div className="ordform-group">
          <TextField
            label="ИНН"
            name="ppt_inn"
            value={formData.ppt_inn}
            onChange={handleChange}
            placeholder="ИНН"
          />
        </div>

        <div className="ordform-group">
          <TextField
            label="Дата рождения"
            name="birth_date"
            type="date"
            value={formData.birth_date}
            onChange={handleChange}
          />
        </div>

        <div className="ordform-group">
          <TextField
            label="Адрес"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Введите адрес"
          />
        </div>

        <div className="ordform-group">
          <TextField
            label="Клиентский код"
            name="client_code"
            value={formData.client_code}
            onChange={handleChange}
            placeholder="ONEX12345"
          />
        </div>
      </form>
      <div className="person-footer">
        <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? "Загрузка..." : "Добавить получателя"}
        </Button>
      </div>
    </div>
  );
};

export default AddRecipientForm;
