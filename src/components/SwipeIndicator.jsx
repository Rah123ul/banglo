import React from 'react';
import ReactDOM from 'react-dom';

const SwipeIndicator = ({ active, side, progress }) => {
    if (!active && progress === 0) return null;

    const style = {
        position: 'fixed',
        top: 0,
        [side === 'left' ? 'left' : 'right']: 0,
        width: '4px',
        height: '100%',
        backgroundColor: '#be3a34',
        boxShadow: `0 0 15px 2px #be3a34`,
        opacity: progress,
        transform: `scaleX(${0.5 + progress * 0.5})`,
        transition: active ? 'none' : 'opacity 0.3s ease-out, transform 0.3s ease-out',
        zIndex: 10000,
        pointerEvents: 'none',
    };

    return ReactDOM.createPortal(
        <div style={style} />,
        document.body
    );
};

export default SwipeIndicator;
