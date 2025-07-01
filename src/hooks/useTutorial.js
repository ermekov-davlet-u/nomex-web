import { useEffect, useState } from "react";

export function useTutorial(storageKey) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const wasShown = localStorage.getItem(storageKey);
        if (!wasShown) {
            setShow(true);
        }
    }, [storageKey]);

    const handleClose = () => {
        localStorage.setItem(storageKey, "true");
        setShow(false);
    };

    return {
        isOpen: show,
        onClose: handleClose,
    };
}
