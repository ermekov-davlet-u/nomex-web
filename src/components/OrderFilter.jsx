// components/OrderFilter.js
import React from "react";

const OrderFilter = ({ orderTabs, activeStatus, onChange }) => {
    return (
        <div className="filter-row">
            {orderTabs.map((filter) => (
                <button
                    key={filter.label}
                    className={`filter-btn ${activeStatus === filter.status ? "active" : ""}`}
                    onClick={() => onChange(filter.status)}
                >
                    {filter.icon} {filter.label}
                </button>
            ))}
        </div>
    );
};

export default OrderFilter;
