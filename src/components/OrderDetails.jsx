// components/OrderDetails.js
import React from "react";
import Slider from "./Slider";
import { getStatus } from "../utils";

const OrderDetails = ({ order, deliverRussia }) => {
    if (!order) {
        return <div className="order_content">Выберите заказ...</div>;
    }

    return (
        <div className="order_content">
            <div className="order_content_header">
                <div className="order_content_num">
                    Номер заказа: {order.tracking_number || "-"}
                </div>

                <div className="actual_status">
                    <div className="actual_status_right">
                        <div className="actual_status_right_text">Прогресс перевозки</div>
                        <Slider value={getStatus(order.status).percent} />
                        <div className="actual_status_right_bottom">
                            <div>0%</div>
                            <div>{getStatus(order.status).percent || 0}%</div>
                            <div>100%</div>
                        </div>
                    </div>
                    <div className="actual_status_left">
                        <div className="actual_status_left_title">Актуальный статус:</div>
                        <div className="actual_status_left_status">
                            {deliverRussia?.at(-1)?.comment_ru || getStatus(order.status).text || "-"}
                        </div>
                        <div className="actual_status_left_date">{order.date || "-"}</div>
                    </div>
                </div>

                <div className="order_content_delivery">
                    <div className="order_content_delivery_elem">
                        <div className="order_content_delivery_title">Дата заказа:</div>
                        <div className="order_content_delivery_date">{order.date || "-"}</div>
                    </div>
                    <div className="order_content_delivery_elem">
                        <div className="order_content_delivery_title">
                            Ожидаемая дата прибытия:
                        </div>
                        <div className="order_content_delivery_date">
                            {order.estimated_date || "-"}
                        </div>
                    </div>
                </div>

                <div className="order_content_option">
                    <div className="order_content_option_elem">
                        <div className="order_content_option_elem_title">Категория:</div>
                        <div className="order_content_option_elem_text">
                            {order.category || "-"}
                        </div>
                    </div>
                    <div className="order_content_option_elem">
                        <div className="order_content_option_elem_title">Магазин:</div>
                        <div className="order_content_option_elem_text">
                            {order.shop || "-"}
                        </div>
                    </div>
                    <div className="order_content_option_elem">
                        <div className="order_content_option_elem_title">Страна:</div>
                        <div className="order_content_option_elem_text">
                            {order.country || "-"}
                        </div>
                    </div>
                    <div className="order_content_option_elem">
                        <div className="order_content_option_elem_title">Сумма:</div>
                        <div className="order_content_option_elem_text">
                            {order.amount ? `${order.amount} ${order.currency}` : "-"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
