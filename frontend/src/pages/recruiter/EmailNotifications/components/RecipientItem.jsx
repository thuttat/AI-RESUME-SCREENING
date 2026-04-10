import { MailCheck } from 'lucide-react';
import React from "react";

export default function RecipientItem({ data, checked, onToggle }) {
    return (
        <label className="recipient-item">
            <input
                type="checkbox"
                checked={checked}
                onChange={onToggle}
                className="recipient-checkbox"
            />

            <div className="recipient-info">
                <p className="r-name">{data.name}</p>
                <p className="r-email">{data.email}</p>
            </div>

            {data.hasSentEmail && (
                <div title="Email has already sent to this candidate" className="mailcheck-icon">
                    <MailCheck size={18} />
                </div>
            )}
        </label>
    );
}