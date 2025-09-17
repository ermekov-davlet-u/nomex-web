import React, { useState } from "react";
import { useCreateOrEditOrderMutation } from "../store/api/orderApi";
import "./order.css";
import {
  useGetCountriesQuery,
  useGetCurrenciesQuery,
  useGetRecipientsQuery,
  useGetCategoriesQuery,
} from "../store/api/recipientApi";
import TextField from "../components/TextField";
import SelectField from "../components/MySelect";
import FileUpload from "../components/FileUpload";
import {
  FaFileUpload,
  FaIdCard,
  FaPassport,
  FaUser,
  FaUserShield,
} from "react-icons/fa";
import Button from "../components/Button";
import { useTutorial } from "../hooks/useTutorial";
import TutorialModal from "../components/TutorialModal";
import QuestionHint from "../components/QuestionHint";

const CreateOrderForm = () => {
  const {
    data: recipients,
    error: recipientsError,
    isLoading: isLoadingRecipients,
  } = useGetRecipientsQuery();
  const {
    data: countries,
    error: countriesError,
    isLoading: isLoadingCountries,
  } = useGetCountriesQuery();
  const {
    data: category,
    error: categoryError,
    isLoading: isLoadingCategory,
  } = useGetCategoriesQuery();
  const {
    data: currency,
    error: currencyError,
    isLoading: isLoadingCurrency,
  } = useGetCurrenciesQuery();
  const [seccesscreate, setSeccessCreate] = useState(false);
  const tutorial = useTutorial("create_orders");
  const [form, setForm] = useState({
    trackingNumber: "",
    cost: "",
    storeName: "",
    linkOrder: "",
    note: "",
    orderGuid: null,
    selectedCountry: { guid: "" },
    selectedReciever: { guid: "" },
    selectedCurrency: { guid: "" },
    selectedTarif: { guid: "" },
    selectedCategory: { guid: "" },
    invoiceFile: null,
    firstName: "", // ← добавляем сюда
  });

  const [inputErrors, setInputErrors] = useState({});

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

    // Простейшая валидация для примера
    const errors = {};
    if (!form.firstName) {
      errors.firstName = "Введите имя латиницей";
    }

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    }

    const formData = new FormData();
    formData.append("first_name", form.firstName);
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
      setSeccessCreate((state) => true);
    } catch (err) {
      console.error(err);
      alert("❌ Ошибка при создании заказа.");
    }
  };

  return (
    <div className="ordform-container">
      <TutorialModal
        isOpen={tutorial.isOpen}
        onClose={tutorial.onClose}
        title="2 этап"
        description="Здесь вы можете посмотреть актуальные заказы а так же историю ваших заказов для удобства в навигации рекомендуем вам использовать фильтры."
      />

      <TutorialModal
        isOpen={seccesscreate}
        onClose={() => {
          setSeccessCreate((state) => !state);
        }}
        title="Заказ успешно создан"
        description=""
      >
        <img src="success.png" alt="" />
      </TutorialModal>
      <h2 className="ordform-header">
        Создание заказа{" "}
        <QuestionHint
          text="Здесь должен быть текст с подсказкой Здесь должен быть текст с подсказкой Здесь должен быть текст с подсказкой"
          position="right"
        />
      </h2>
      <form onSubmit={handleSubmit} className="ordform-space">
        <div className="ordform-group">
          <TextField
            label="Имя (латиницей)"
            // icon={<FaUser />}
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            placeholder="Имя"
            error={inputErrors.firstName}
          />
        </div>

        {/* оставляем твои остальные поля */}
        <div className="ordform-group">
          {isLoadingRecipients ? (
            <div className="ordform-loading">Загрузка...</div>
          ) : recipientsError ? (
            <div className="ordform-error">Ошибка загрузки</div>
          ) : (
            <SelectField
              label="Получатель"
              value={form.selectedReciever.guid}
              onChange={(e) =>
                setForm({
                  ...form,
                  selectedReciever: { guid: e.target.value },
                })
              }
              placeholder="Выберите получателя"
              options={recipients.map((r, i) => {
                if (i == 0 && (r.name == " " || !r.name == "")) {
                  return {
                    value: r.guid,
                    label: "Я",
                  };
                }
                return {
                  value: r.guid,
                  label: r.name,
                };
              })}
              defaultValue=""
              error={inputErrors.selectedReciever}
            />
          )}
        </div>

        {/* остальные поля формы (страна, валюта, категория, трек-номер, стоимость, магазин, ссылка, описание, файл) остаются без изменений */}
        <div className="ordform-group">
          {isLoadingCountries ? (
            <div className="ordform-loading">Загрузка...</div>
          ) : countriesError ? (
            <div className="ordform-error">Ошибка загрузки</div>
          ) : (
            <SelectField
              label="Страна"
              value={form.selectedCountry.guid}
              onChange={(e) =>
                setForm({
                  ...form,
                  selectedCountry: { guid: e.target.value },
                })
              }
              placeholder="Выберите страну"
              options={countries.map((c) => ({
                value: c.guid,
                label: c.country,
              }))}
              defaultValue=""
              error={inputErrors?.selectedCountry}
            />
          )}
        </div>

        <div className="ordform-group">
          {isLoadingCurrency ? (
            <div className="ordform-loading">Загрузка...</div>
          ) : currencyError ? (
            <div className="ordform-error">Ошибка загрузки</div>
          ) : (
            <SelectField
              label="Валюта"
              value={form.selectedCurrency.guid}
              onChange={(e) =>
                setForm({
                  ...form,
                  selectedCurrency: { guid: e.target.value },
                })
              }
              placeholder="Выберите валюту"
              options={currency.map((c) => ({
                value: c.guid,
                label: c.name,
              }))}
              defaultValue=""
              error={inputErrors?.selectedCurrency}
            />
          )}
        </div>

        <div className="ordform-group">
          {isLoadingCategory ? (
            <div className="ordform-loading">Загрузка...</div>
          ) : categoryError ? (
            <div className="ordform-error">Ошибка загрузки</div>
          ) : (
            <SelectField
              label="Категория"
              value={form.selectedCategory.guid}
              onChange={(e) =>
                setForm({
                  ...form,
                  selectedCategory: { guid: e.target.value },
                })
              }
              placeholder="Выберите категорию"
              options={category.map((c) => ({
                value: c.guid,
                label: c.name,
              }))}
              defaultValue=""
              error={inputErrors?.selectedCategory}
            />
          )}
        </div>

        <div className="ordform-group">
          <TextField
            label="Трек-номер"
            type="text"
            value={form.trackingNumber}
            onChange={(e) =>
              setForm({ ...form, trackingNumber: e.target.value })
            }
            placeholder="1234567890"
            error={inputErrors?.trackingNumber}
          />
        </div>
        <div className="ordform-group">
          <TextField
            label="Стоимость"
            type="number"
            value={form.cost}
            onChange={(e) => setForm({ ...form, cost: e.target.value })}
            placeholder="1000"
            error={inputErrors?.cost}
          />
        </div>

        <div className="ordform-group">
          <TextField
            label="Магазин"
            type="text"
            value={form.storeName}
            onChange={(e) => setForm({ ...form, storeName: e.target.value })}
            placeholder="Amazon, eBay..."
            error={inputErrors?.storeName}
          />
        </div>

        <div className="ordform-group">
          <TextField
            label="Ссылка на товар"
            type="text"
            value={form.linkOrder}
            onChange={(e) => setForm({ ...form, linkOrder: e.target.value })}
            placeholder="https:"
            error={inputErrors?.linkOrder}
          />
        </div>
        <div className="ordform-group">
          <FileUpload
            label="Файл инвойса"
            icon={<FaFileUpload />}
            error={inputErrors.invoiceFile}
            onChange={handleFileChange}
          />
        </div>
        <div className="ordform-group" style={{ width: "100%" }}>
          <label className="ordform-label">Описание</label>
          <textarea
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="ordform-textarea"
            placeholder="Описание заказа"
          ></textarea>
        </div>
        {/* <div className="ordform-group">
                    <label className="ordform-label">Файл инвойса</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="ordform-file-input"
                    />
                </div> */}
        {/* <button
                    type="submit"
                    disabled={isLoading}
                    className="ordform-button"
                >
                    {isLoading ? "Отправка..." : "Создать заказ"}
                </button> */}
        <div className="personal-bottom">
          <Button type="submit">Сохранить</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrderForm;
