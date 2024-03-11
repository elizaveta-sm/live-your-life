import { createContext, useEffect, useState } from "react";

import Notification from "../components/ui/notification.component";

export const ToastContext = createContext({
    toasts: [],
    setToasts: () => {},
    notification: {},
    setNotification: () => {},
});

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const [notification, setNotification] = useState({});
    
    useEffect(() => {

        if (Object.keys(notification).length !== 0) {
            setToasts([...toasts, notification]);

            setNotification({});
        }

        return;

    }, [notification])

    const value = { 
        toasts, 
        setToasts,
        notification,
        setNotification
    };

    return (
        <ToastContext.Provider value={value}>
            { children }
            <div className="fixed bottom-0 right-0 m-6">
                { toasts.map(toast => (
                    <Notification key={toast.id} message={toast.message} type={toast.type} id={toast.id} />
                )) }
            </div>
        </ToastContext.Provider>
    )
};