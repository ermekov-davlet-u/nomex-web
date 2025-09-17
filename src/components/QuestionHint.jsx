import React from "react";

const QuestionHint = ({
    text = "Подсказка",
    position = "top",         // "top" | "right" | "bottom" | "left"
    size = 20,               // px
    className = "",
    title = "Подробнее",     // title для доступности (скринридеры)
}) => {
    return (
        <span
            className={`qhint ${position} ${className}`}
            style={{ ["--qhint-size"]: `${size}px` }}
        >
            <div
                type="button"
                className="qhint__btn"
                aria-label={text}
            >
                ?
            </div>
            <span className="qhint__bubble" role="tooltip">
                {text}
            </span>
        </span>
    );
};

export default QuestionHint;
