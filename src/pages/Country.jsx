import React, { useState } from "react";
import {
  IoCheckmarkOutline,
  IoCubeOutline,
  IoNavigateOutline,
  IoHomeOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import "./pages.css";
import { useGetOrdersQuery } from "../store/api/orderApi";
import Slider from "../components/Slider";
import { useGetCountriesQuery } from "../store/api/recipientApi";
import { useTutorial } from "../hooks/useTutorial";
import TutorialModal from "../components/TutorialModal";
import QuestionHint from "../components/QuestionHint";


const Country = () => {
  const [activeStatus, setActiveStatus] = useState(0);
  const { data: countries = [], error: countriesError, isLoading: isLoadingCountries } = useGetCountriesQuery();
  const tutorial = useTutorial("tutorial_shown_country");

  return (
    <div className="country">
      <TutorialModal
        isOpen={tutorial.isOpen}
        onClose={tutorial.onClose}
        title="3 этап"
        description="Здесь вы можете посмотреть список актуальных стран с адресом склада в стране нахождения а так же телефонным номером склада"
      />
      <div className="form-title">Добавьте свою информацию <QuestionHint text="Здесь должен быть текст с подсказкой Здесь должен быть текст с подсказкой Здесь должен быть текст с подсказкой" position="right" /></div>
      <div className="country-list">
        {
          countries.map(item => {
            // alert(JSON.stringify(item))
            return <div className="country_card">
              <div className="warehouse-card">
                <div className="warehouse-card-content">
                  <div className="warehouse-card-text">
                    <p>
                      <span className="warehouse-card-label">Адрес в стране:</span>{" "}
                      1626 E Ayre Street в испании
                    </p>
                    <p>Wilmington, Delaware, 19804</p>
                    <p>KG634088</p>
                    <p>
                      <span className="warehouse-card-label">Телефон склада:</span>{" "}
                      +1 3026608398
                    </p>
                  </div>
                  <div className="warehouse-card-flag">
                    <img src={"https://api-onex.ibm.kg" + item.flag} alt="Spain Flag" />
                  </div>
                </div>
              </div>
            </div>
          })
        }
      </div>
    </div>
  );
};

export default Country;
