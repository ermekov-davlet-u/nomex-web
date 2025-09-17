import React, { useEffect, useRef, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { useLazyCheckActivationCodeQuery, useResendActivationCodeMutation } from "../store/api/authApi";

export function ConfirmActivCode() {
    const [code, setCode] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const [triggerCheckCode, { isLoading, isError }] = useLazyCheckActivationCodeQuery();
    const [resendCode] = useResendActivationCodeMutation();

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";
    const isResetPassword = location.state?.isResetPassword || false;

    const inputsRef = useRef([]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleInputChange = (value, index) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }

        if (newCode.every((v) => v)) {
            handleCheckCode(newCode.join(""));
        }
    };

    const handleCheckCode = async (enteredCode) => {
        try {
            const data = await triggerCheckCode({ activationCode: enteredCode, email }).unwrap();
            console.log(data);
            if (data.success) {
                navigate(isResetPassword ? "/reset-password" : "/login", {
                    state: {
                        email: email
                    }
                })
            } else {
                setCode(["", "", "", ""]);
                inputsRef.current[0]?.focus();
            }
        } catch (err) {
            setCode(["", "", "", ""]);
            inputsRef.current[0]?.focus();
        }
    };

    const handleResend = async () => {
        try {
            await resendCode({ email }).unwrap();
            setTimer(60);
        } catch (err) {
            console.error("Ошибка отправки кода:", err);
        }
    };

    return (
        <div className="confirm-container">
            <h2 className="title">Введите код подтверждения</h2>
            <p className="subtitle">
                Мы отправили код на <span className="email">{email}</span>
            </p>

            <div className={`code-inputs ${isError ? "shake" : ""}`}>
                {code.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleInputChange(e.target.value, index)}
                        ref={(el) => (inputsRef.current[index] = el)}
                        className="code-box"
                    />
                ))}
            </div>

            {timer > 0 ? (
                <p className="timer">Новый код через 00:{timer < 10 ? `0${timer}` : timer}</p>
            ) : (
                <button onClick={handleResend} className="resend-btn">Отправить код снова</button>
            )}
        </div>
    );
}

export default ConfirmActivCode;
