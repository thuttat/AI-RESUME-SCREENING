import React from 'react';
import '../styles/Input.css';

export const Input = ({ label, error, className = '', ...props }) => {
    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}

            <input
                className={`input-field ${error ? 'input-error' : ''} ${className}`}
                {...props}
            />

            {error && <span className="input-error-text">{error}</span>}
        </div>
    );
};