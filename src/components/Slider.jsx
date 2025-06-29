import React, { useEffect, useRef } from "react";

export default function Slider({
    value,
    onChange,
    min = 1,
    max = 100,
    step = 1,
    label = "",
    disabled = false,
    leftText = "",      // ← добавили проп для текста слева
}) {
    const sliderRef = useRef(null);

    useEffect(() => {
        if (sliderRef.current) {
            const percent = ((value - min) / (max - min)) * 100;
            sliderRef.current.style.setProperty("--slider-percent", `${percent}%`);
        }
    }, [value, min, max]);

    return (
        <div className="slider-wrapper">
            {label && <label className="slider-label">{label}</label>}
            {/* <div className="slider-container"> */}
            {/* {leftText && <span className="slider-left-text">{leftText}</span>} */}
            <input
                ref={sliderRef}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                className="slider"
                disabled={disabled}
            />
            {/* <div className="slider-value">{value}</div> */}
            {/* </div> */}
        </div>
    );
}
