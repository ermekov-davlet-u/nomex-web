import React, { useState } from "react";
import "./pages.css"; // Стили для веба
import { useGetStoresListQuery } from "../store/api/storeApi";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import QuestionHint from "../components/QuestionHint";

const Shops = () => {
  const [inputValue, setInputValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Русский",
    flag: "",
  });

  const { data: stores = [], isLoading } = useGetStoresListQuery();

  const handleSearch = () => {
    console.log("Поиск:", inputValue);
  };

  const handleLanguageSelect = (country) => setSelectedCountry(country);

  return (
    <div
      className="personal-info-form"
      style={{
        background: "transparent",
        boxShadow: "none",
        maxWidth: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 317px",
        width: "100%"
      }}
    >
      <div className="shop_left">
        <div className="form-title shops_title">
          Добавьте свою информацию{" "}
          <QuestionHint
            text="Здесь должен быть текст с подсказкой Здесь должен быть текст с подсказкой Здесь должен быть текст с подсказкой"
            position="right"
          />
        </div>
        <div className="store-grid">
          {isLoading ? (
            <p>Загрузка...</p>
          ) : (
            stores.map((store) => (
              <div className="store-card" key={store.id}>
                <div className="store-card_top">
                  <div className="store-card_price">$ 180.70</div>
                  <div className="store-card_status"></div>
                </div>
                <img
                  src={`/shop.png`}
                  alt={store.name}
                  className="store-logo"
                />
                <p className="store-name">{store.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="shop_right">
        <div className="form-title shops_title">Фильтры:</div>
        <TextField label={"Категории:"}></TextField>
        <TextField label={"Страны:"}></TextField>
        <br />
        <Button>Применить</Button>
        <div className="login-form_bottom_text">
          <div
            to={"/register"}
            className="register"
            style={{ fontWeight: 200 }}
          >
            Очистить
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shops;
