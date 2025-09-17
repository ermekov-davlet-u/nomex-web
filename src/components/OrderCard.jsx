// components/OrderCard.js
import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import { getStatus } from "../utils";
import { getTrackStatus } from "../store/api/deliver";

const OrderCard = ({ order, onClick }) => {

    const [deliverRussia, setDeliverRussia] = useState(null);
    useEffect(() => {
        if (order?.tracking_number) {
            async function fetchTrack() {
                const a = await getTrackStatus(order.tracking_number);
                if (a.statuses) setDeliverRussia(a.statuses);
                else {
                    setDeliverRussia([]);
                }
            }
            fetchTrack();
        }
    }, [order]);

    return (
        <div
            className="order-card"
            onClick={() => onClick(order)}
        >
            <div className="order-card_header">
                <div className="order-card_num">№ {order.tracking_number}</div>
                <div className="order-card_status">{deliverRussia?.at(-1)?.comment_ru || getStatus(order.status).text || "-"}</div>
            </div>

            <div className="order-card_slider">
                <Slider value={getStatus(order.status).percent} />
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
                        <div className="order-card_country_title">{order.country}</div>
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
                            src={"https://api-onex.ibm.kg/files/flags/Flag_of_Russia.png"}
                            alt="flag"
                            className="order-flag"
                        />
                    </div>
                </div>
            </div>

            <div className="order-card_reciever">
                <div className="order-card_reciever_title">Получатель</div>
                <div className="order-card_reciever_fio">{order.recipient}</div>
            </div>
        </div>
    );
};

export default OrderCard;
