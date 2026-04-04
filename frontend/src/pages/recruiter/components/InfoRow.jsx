import React from 'react';

const InfoRow = ({ label, value }) => {
    return (
        <div className="info-row">
            <span className="info-label text-muted">{label}:</span>
            <span className="info-value">{value}</span>
        </div>
    );
};

export default InfoRow;