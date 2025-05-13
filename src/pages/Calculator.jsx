import React, { useState } from "react";
import { FaPlane, FaCube, FaChevronDown, FaChevronUp, FaInfoCircle } from "react-icons/fa";
import { useGetCountriesQuery } from "../store/api/recipientApi";
import { API_BASE_URL } from "../config";


const Calculator = () => {
    const [selectedTab, setSelectedTab] = useState("individual");
    const [weight, setWeight] = useState("");
    const [dimensionsEnabled, setDimensionsEnabled] = useState(false);
    const { data: countries, error: countriesError, isLoading: isLoadingCountries } = useGetCountriesQuery();
    const [showToggle, setShowTogle] = useState(true);
    const [dimensions, setDimensions] = useState({ length: "", width: "", height: "" });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState();

    const handleSelectedTab = (key) => {
        setSelectedTab(key);
        setDimensionsEnabled(key === "company");
        setShowTogle(key === "individual");
    };

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsModalVisible(false);
    };

    return (
        <div className="calculator">
            {isModalVisible && (
                <div className="modal-backdrop" onClick={() => setIsModalVisible(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Выберите страну</h3>
                        {countries.map((country, index) => (
                            <div key={index} className="country-option" onClick={() => handleCountrySelect(country)}>
                                <img src={API_BASE_URL + country?.flag} alt={country.name} className="flag" />
                                <span>{country.country}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="tabs">
                <button
                    className={`tab ${selectedTab === "individual" ? "active" : ""}`}
                    onClick={() => handleSelectedTab("individual")}
                >
                    Физическое лицо
                </button>
                <button
                    className={`tab ${selectedTab === "company" ? "active" : ""}`}
                    onClick={() => handleSelectedTab("company")}
                >
                    Компания
                </button>
            </div>

            <div className="delivery-box">
                <div className="row space-between">
                    <div className="country-select" onClick={() => setIsModalVisible(true)}>
                        <img src={API_BASE_URL + selectedCountry?.flag} alt="flag" className="flag" />
                        {isModalVisible ? <FaChevronUp /> : <FaChevronDown />}
                    </div>

                    <div className="input-inline">
                        <FaPlane />
                        <span>Авиа</span>
                    </div>
                </div>

                <p className="info">1 кг = 900 SOM | 4 - 9 рабочих дней</p>

                <label>Введите вес (кг)</label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Вес (кг)"
                />
            </div>

            <div className="row space-between align-center toggle-container">
                <label>Введите размеры (см)</label>
                {showToggle && (
                    <input
                        type="checkbox"
                        checked={dimensionsEnabled}
                        onChange={(e) => setDimensionsEnabled(e.target.checked)}
                    />
                )}
            </div>

            {dimensionsEnabled && (
                <div className="dimensions">
                    {["length", "width", "height"].map((dim) => (
                        <div className="dimension-box" key={dim}>
                            <div className="label-icon">
                                <FaCube />
                                <span>{dim === "length" ? "Длина" : dim === "width" ? "Ширина" : "Высота"}</span>
                            </div>
                            <input
                                type="number"
                                placeholder={dim === "length" ? "Длина" : dim === "width" ? "Ширина" : "Высота"}
                                value={dimensions[dim]}
                                onChange={(e) => setDimensions({ ...dimensions, [dim]: e.target.value })}
                            />
                        </div>
                    ))}
                </div>
            )}

            <div className="price-box">
                <span>Стоимость доставки</span>
                <strong>0 SOM</strong>
            </div>

            <div className="info-box">
                <FaInfoCircle />
                <p>Вес округляется до ближайших 100 грамм.</p>
            </div>
        </div>
    );
};

export default Calculator;