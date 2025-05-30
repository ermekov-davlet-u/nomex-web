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
	const filteredOrders = orders.filter((order) => order.status === activeStatus);

	return (
		<div className="order-list">
			<div className="tabs">
				{orderTabs.map((tab) => (
					<button
						key={tab.status}
						className={`tab ${tab.status === activeStatus ? "active" : ""}`}
						onClick={() => setActiveStatus(tab.status)}
					>
						{tab.icon}
						<span>{tab.label}</span>
					</button>
				))}
			</div>

			<div className="cards">
				{filteredOrders.map((order) => (
					<div key={order.guid} className="order-card">
						<div className="order-card-header">
							{order.flag && (
								<img src={"https://api-onex.ibm.kg" + order.flag} alt="flag" className="order-flag" />
							)}
							<div className="tracking-number">{order.tracking_number}</div>
						</div>
						<div className="order-info">
							<div className="info-row">
								<span className="label">Сумма:</span>
								<span className="value">{order.amount} {order.currency}</span>
							</div>
							<div className="info-row">
								<span className="label">Категория:</span>
								<span className="value">{order.category?.trim()}</span>
							</div>
							<div className="info-row">
								<span className="label">Магазин:</span>
								<span className="value">{order.shop}</span>
							</div>
							<div className="info-row">
								<span className="label">Страна:</span>
								<span className="value">{order.country}</span>
							</div>
							<div className="info-row">
								<span className="label">Дата:</span>
								<span className="value">{order.date}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrderList;
