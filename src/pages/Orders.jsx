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

const orderTabs = [
  { label: "Заказано", icon: <IoCheckmarkOutline />, status: 0 },
  { label: "На складе", icon: <IoCubeOutline />, status: 15 },
  { label: "В пути", icon: <IoNavigateOutline />, status: 16 },
  { label: "Готово", icon: <IoHomeOutline />, status: 18 },
  { label: "Полученные", icon: <IoCheckmarkCircleOutline />, status: 4 },
];

const OrderList = () => {
  const [activeStatus, setActiveStatus] = useState(0);
  const { data: orders = [] } = useGetOrdersQuery(activeStatus);
  const filteredOrders = orders.filter(
    (order) => order.status === activeStatus
  );

  return (
    <div className="order">
      <div className="order-list">
        <div className="cards">
          {[...filteredOrders, ...filteredOrders].map((order) => (
            <div key={order.guid} className="order-card">
              <div className="order-card_header	">
                <div className="order-card_num">№ {order.tracking_number}</div>

                <div className="order-card_status">в пути</div>
              </div>
              <div className="order-card_slider">
                <Slider value={15} />
              </div>

              <div className="order-card_country">
                <div className="order-card_country_from">
                  <div className="order-card_country_flag">
                    <img
                      src={"https://api-onex.ibm.kg" + order.flag}
                      alt="flag"
                      className="order-flag"
                    />
                  </div>
                  <div className="order-card_country_text">
                    <div className="order-card_country_title">
                      {order.country}
                    </div>
                    <div className="order-card_country_date">{order.date}</div>
                  </div>
                </div>
                <div className="order-card_country_to">
                  <div className="order-card_country_text">
                    <div className="order-card_country_title">Россия</div>
                    <div className="order-card_country_date">{order.date}</div>
                  </div>
                  <div className="order-card_country_flag">
                    <img
                      src={"https://api-onex.ibm.kg" + order.flag}
                      alt="flag"
                      className="order-flag"
                    />
                  </div>
                </div>
              </div>
              <div className="order-card_reciever">
                <div className="order-card_reciever_title">Получатель</div>
                <div className="order-card_reciever_fio">Эрмеков Давлет</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="order_content">
        <div className="order_content_header">
          <div className="order_content_num">Номер заказа: 1986654848</div>
          <div className="actual_status">
            <div className="actual_status_right">
              <div className="actual_status_right_text">
                Прогресс перевозки
              </div>
              <Slider />
              <div className="actual_status_right_bottom">
                <div className="actual_status_right_bottom_start">0%</div>
                <div className="actual_status_right_bottom_actual">35%</div>
                <div className="actual_status_right_bottom_start">100%</div>
              </div>
            </div>
            <div className="actual_status_left">
              <div className="actual_status_left_title">
                Актуальный статус:
              </div>
              <div className="actual_status_left_status">
                Принят пунктом выдачи
              </div>
              <div className="actual_status_left_date">
                19.05.2024
              </div>
            </div>
          </div>
          <div className="order_content_delivery">
            <div className="order_content_delivery_elem">
              <div className="order_content_delivery_title">
                Дата заказа:
              </div>
              <div className="order_content_delivery_date">
                19.05.2024
              </div>
            </div>
            <div className="order_content_delivery_elem">
              <div className="order_content_delivery_title">
                Ожидаемая дата прибытия:
              </div>
              <div className="order_content_delivery_date">
                25.05.2024
              </div>
            </div>
          </div>
          <div className="order_content_option">
            <div className="order_content_option_elem">
              <div className="order_content_option_elem_title">Категория:</div>
              <div className="order_content_option_elem_text">Медицина</div>
            </div>
            <div className="order_content_option_elem">
              <div className="order_content_option_elem_title">Магазин:</div>
              <div className="order_content_option_elem_text">Amazon</div>
            </div>
            <div className="order_content_option_elem">
              <div className="order_content_option_elem_title">Страна:</div>
              <div className="order_content_option_elem_text">Корея</div>
            </div>
            <div className="order_content_option_elem">
              <div className="order_content_option_elem_title">Сумма:</div>
              <div className="order_content_option_elem_text">24523452344 RUB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
