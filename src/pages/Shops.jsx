import React, { useState } from "react";
import "./pages.css"; // Стили для веба
import { useGetStoresListQuery } from "../store/api/storeApi";

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
        <div className="shops-container">
            <div className="header">
                <h1>Лучшие магазины</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Поиск..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={handleSearch}>Найти</button>
                </div>
                <button className="country-button" onClick={() => setIsModalVisible(true)}>
                    <img src={selectedCountry.flag} alt="Страна" />
                    <span>{selectedCountry.name}</span>
                </button>
            </div>

            <div className="filter-row">
                {["Фильтры", "Страна", "Категория", "Стоимость"].map((filter) => (
                    <button key={filter} className="filter-btn" onClick={() => setIsModalVisible(true)}>
                        {filter}
                    </button>
                ))}
            </div>

            <div className="store-grid">
                {isLoading ? (
                    <p>Загрузка...</p>
                ) : (
                    stores.map((store) => (
                        <div className="store-card" key={store.id}>
                            <img
                                src={`https://api-onex.ibm.kg${store.flag}`}
                                alt={store.name}
                                className="store-logo"
                            />
                            <p className="store-name">{store.name}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Shops;
