// pages/OrderList.js
import React, { useEffect, useState } from "react";
import {
  IoCheckmarkOutline,
  IoCubeOutline,
  IoNavigateOutline,
  IoHomeOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import "./pages.css";
import { useGetOrdersQuery } from "../store/api/orderApi";
import TutorialModal from "../components/TutorialModal";
import { useTutorial } from "../hooks/useTutorial";
import { getTrackStatus } from "../store/api/deliver";

import OrderFilter from "../components/OrderFilter";
import OrderCard from "../components/OrderCard";
import OrderDetails from "../components/OrderDetails";
import QuestionHint from "../components/QuestionHint";

const orderTabs = [
  { label: "Все", icon: <IoCheckmarkOutline />, status: null },
  { label: "Заказано", icon: <IoCheckmarkOutline />, status: 0 },
  { label: "На складе", icon: <IoCubeOutline />, status: 15 },
  { label: "В пути", icon: <IoNavigateOutline />, status: 16 },
  { label: "Готово", icon: <IoHomeOutline />, status: 18 },
  { label: "Полученные", icon: <IoCheckmarkCircleOutline />, status: 4 },
];

const OrderList = () => {
  const [activeStatus, setActiveStatus] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliverRussia, setDeliverRussia] = useState(null);
  const [filter, setFilter] = useState(false);

  const tutorial = useTutorial("tutorial_shown_orders");

  const { data: orders = [] } = useGetOrdersQuery(activeStatus);

  useEffect(() => {
    if (selectedOrder?.tracking_number) {
      async function fetchTrack() {
        const a = await getTrackStatus(selectedOrder.tracking_number);
        if (a.statuses) setDeliverRussia(a.statuses);
        else {
          setDeliverRussia([]);
        }
      }
      fetchTrack();
    }
  }, [selectedOrder]);

  return (
    <>
      {orders.length || activeStatus != null ? (
        <div className="order">
          <TutorialModal
            isOpen={tutorial.isOpen}
            onClose={tutorial.onClose}
            title="Добро пожаловать в раздел заказов!"
            description="Здесь вы можете просматривать и создавать заказы. Используйте фильтры для поиска."
          />

          <div className="order-list">
            <div className="top-title">
              <p className="form-title">
                Мои заказы{" "}
                <QuestionHint
                  text="Здесь должен быть текст с подсказкой Здесь должен быть текст с подсказкой Здесь должен быть текст с подсказкой"
                  position="right"
                />
              </p>
              <img
                src="filter_menu.png"
                alt=""
                style={{
                  width: "20px",
                  height: "13px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setFilter((state) => !state);
                }}
              />
            </div>
            {filter && (
              <OrderFilter
                orderTabs={orderTabs}
                activeStatus={activeStatus}
                onChange={setActiveStatus}
              />
            )}

            <div className="cards">
              {orders.map((order) => (
                <OrderCard
                  key={order.guid}
                  order={order}
                  onClick={setSelectedOrder}
                />
              ))}
            </div>
          </div>

          <OrderDetails order={selectedOrder} deliverRussia={deliverRussia} />
        </div>
      ) : (
        <div className="no_order">Ваш список заказов пуст ...</div>
      )}
    </>
  );
};

export default OrderList;
