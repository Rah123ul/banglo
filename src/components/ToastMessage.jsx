import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const ToastMessage = ({ message, show }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!isVisible && !show) return null;

    const style = {
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: `translateX(-50%) translateY(${show ? '0' : '20px'})`,
        backgroundColor: '#be3a34',
        color: '#f2cc8f',
        padding: '12px 24px',
        borderRadius: '30px',
        fontSize: '14px',
        fontWeight: '600',
        boxShadow: '0 4px 15px rgba(190, 58, 52, 0.4)',
        opacity: show ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 10001,
        fontFamily: 'Inter, sans-serif',
        pointerEvents: 'none',
    };

    return ReactDOM.createPortal(
        <div style={style} role="alert" aria-live="polite">
            {message}
        </div>,
        document.body
    );
};

export default ToastMessage;
