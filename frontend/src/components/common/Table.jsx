import React from 'react';
import '../styles/Table.css';

export const Table = ({ children, className = '' }) => {
    return (
        <div className="table-wrapper">
            <table className={`table ${className}`}>
                {children}
            </table>
        </div>
    );
};

export const TableHeader = ({ children }) => {
    return <thead className="table-header">{children}</thead>;
};

export const TableBody = ({ children }) => {
    return <tbody className="table-body">{children}</tbody>;
};

export const TableRow = ({ children, className = '' }) => {
    return (
        <tr className={`table-row ${className}`}>
            {children}
        </tr>
    );
};

export const TableHead = ({ children, className = '' }) => {
    return (
        <th className={`table-head ${className}`}>
            {children}
        </th>
    );
};

export const TableCell = ({ children, className = '' }) => {
    return (
        <td className={`table-cell ${className}`}>
            {children}
        </td>
    );
};