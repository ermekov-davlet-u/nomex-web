import React, { useState } from "react";
import { FaPlane, FaCube, FaChevronDown, FaChevronUp, FaInfoCircle } from "react-icons/fa";
import { useGetCountriesQuery } from "../store/api/recipientApi";
import { API_BASE_URL } from "../config";
import TextField from "../components/TextField";
import SelectField from "../components/MySelect";
import Button from "../components/Button";
import TutorialModal from "../components/TutorialModal";
import { useTutorial } from "../hooks/useTutorial";
import QuestionHint from "../components/QuestionHint";


const Calculator = () => {
    const [selectedTab, setSelectedTab] = useState("individual");
    const [weight, setWeight] = useState("");
    const [dimensionsEnabled, setDimensionsEnabled] = useState(false);
    const { data: countries, error: countriesError, isLoading: isLoadingCountries } = useGetCountriesQuery();
    const [showToggle, setShowTogle] = useState(true);
    const [dimensions, setDimensions] = useState({ length: "", width: "", height: "" });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState();
    const tutorial = useTutorial("tutorial_shown_calc");

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
        <div className="personal-info-form">
            <TutorialModal
                isOpen={tutorial.isOpen}
                onClose={tutorial.onClose}
                title="8 этап"
                description="Здесь вы можете рассчитать предварительную стоимость доставки"
            />
            <h2 className="form-title">Калькулятор <QuestionHint text="Здесь должен быть текст с подсказкой Здесь должен быть текст с подсказкой Здесь должен быть текст с подсказкой" position="right" /></h2>

            <div className="personal-info_content">
                {isModalVisible && (
                    <SelectField
                        label="Страна"
                        name="selectedCountry"
                        value={selectedCountry?.guid || ""}
                        onChange={(e) => {
                            const selected = countries.find((c) => c.guid === e.target.value);
                            setSelectedCountry(selected || null);
                        }}
                        placeholder="Выберите страну"
                        options={countries.map((country) => ({
                            value: country.guid,
                            label: (
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <img
                                        src={API_BASE_URL + country.flag}
                                        alt={country.country}
                                        style={{ width: "24px", height: "16px", objectFit: "contain" }}
                                    />
                                    <span>{country.country}</span>
                                </div>
                            )
                        }))}
                    />

                )}

                <SelectField
                    label="Тип клиента"
                    name="selectedTab"
                    value={selectedTab}
                    onChange={(e) => handleSelectedTab(e.target.value)}
                    options={[
                        { value: "individual", label: "Физическое лицо" },
                        { value: "company", label: "Компания" },
                    ]}
                    placeholder="Выберите тип"
                    defaultValue=""
                />


                <SelectField
                    label="Страна"
                    name="selectedCountry"
                    value={selectedCountry?.guid || ""}
                    onChange={handleCountrySelect}
                    placeholder="Выберите страну"
                    options={Array.isArray(countries) ? [...countries].map((country) => ({
                        value: country.guid,
                        label: (
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <img
                                    src={API_BASE_URL + country.flag}
                                    alt={country.country}
                                    style={{ width: 24, height: 16, objectFit: "contain" }}
                                />
                                <span>{country.country}</span>
                            </div>
                        ),
                    })) : []}
                />

                <TextField
                    type="number"
                    label="Введите вес (кг)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Вес (кг)"
                />
                <p className="info">Вес округляется до ближайших 100 грамм.</p>

                <div className="dimensions">
                    {["length", "width", "height"].map((dim) => {
                        const label =
                            dim === "length"
                                ? "Длина"
                                : dim === "width"
                                    ? "Ширина"
                                    : "Высота";

                        return (
                            <div className="dimension-box" key={dim}>
                                <TextField
                                    type="number"
                                    label={label}
                                    icon={<FaCube />}
                                    placeholder={label}
                                    value={dimensions[dim]}
                                    onChange={(e) =>
                                        setDimensions({
                                            ...dimensions,
                                            [dim]: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="personal-bottom">
                    <Button onClick={() => { }}>
                        Посчитать
                    </Button>
                </div>
            </div>
        </div>


    );
};

export default Calculator;